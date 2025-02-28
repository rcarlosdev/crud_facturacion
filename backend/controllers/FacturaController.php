<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../config/database.php';
require '../models/FacturaModel.php';
require '../models/ClienteModel.php';
require '../models/ProductoModel.php';

header('Content-Type: application/json');

$facturaModel = new FacturaModel($pdo);
$clienteModel = new ClienteModel($pdo);
$productoModel = new ProductoModel($pdo);

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'getFacturas':
        echo json_encode($facturaModel->getAllFacturas());
        break;

    case 'getClientes':
        echo json_encode($clienteModel->getAllClientes());
        break;

    case 'getProductos':
        echo json_encode($productoModel->getAllProductos());
        break;

    case 'createFactura':
        $data = json_decode(file_get_contents('php://input'), true);
        $cliente_id = $data['cliente_id'];
        $detalles = $data['detalles'];
        $total = array_reduce($detalles, function ($sum, $detalle) {
            return $sum + ($detalle['cantidad'] * $detalle['precio_unitario']);
        }, 0);

        try {
            $factura_id = $facturaModel->createFactura($cliente_id, $total, $detalles);
            echo json_encode(['id' => $factura_id]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'getDetalleFactura':
        $factura_id = $_GET['id'] ?? null;
        if ($factura_id) {
            echo json_encode($facturaModel->getDetalleFactura($factura_id));
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID de factura no proporcionado']);
        }
        break;

    case 'anularFactura':
        $factura_id = $_GET['id'] ?? null;
        if ($factura_id) {
            $facturaModel->anularFactura($factura_id);
            echo json_encode(['message' => 'Factura anulada correctamente']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID de factura no proporcionado']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Acción no válida']);
        break;
}
?>