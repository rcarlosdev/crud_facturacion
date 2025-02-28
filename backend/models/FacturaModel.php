<?php
class FacturaModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllFacturas() {
        $stmt = $this->pdo->query("
            SELECT f.id, f.fecha, f.total, f.estado, c.nombre AS cliente 
            FROM facturas f 
            INNER JOIN clientes c ON f.cliente_id = c.id
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createFactura($cliente_id, $total, $detalles) {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("INSERT INTO facturas (cliente_id, fecha, total) VALUES (:cliente_id, NOW(), :total)");
            $stmt->execute(['cliente_id' => $cliente_id, 'total' => $total]);
            $factura_id = $this->pdo->lastInsertId();

            foreach ($detalles as $detalle) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO detalle_factura (factura_id, producto_id, cantidad, precio_unitario, subtotal)
                    VALUES (:factura_id, :producto_id, :cantidad, :precio_unitario, :subtotal)
                ");
                $stmt->execute([
                    'factura_id' => $factura_id,
                    'producto_id' => $detalle['producto_id'],
                    'cantidad' => $detalle['cantidad'],
                    'precio_unitario' => $detalle['precio_unitario'],
                    'subtotal' => $detalle['subtotal']
                ]);
            }

            $this->pdo->commit();
            return $factura_id;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    public function getDetalleFactura($factura_id) {
        $stmt = $this->pdo->prepare("
            SELECT df.id, p.nombre AS producto, df.cantidad, df.precio_unitario, df.subtotal 
            FROM detalle_factura df 
            INNER JOIN productos p ON df.producto_id = p.id 
            WHERE df.factura_id = :factura_id
        ");
        $stmt->execute(['factura_id' => $factura_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function anularFactura($factura_id) {
        $stmt = $this->pdo->prepare("UPDATE facturas SET estado = 'anulada' WHERE id = :id");
        $stmt->execute(['id' => $factura_id]);
    }
}
?>