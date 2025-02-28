-- Active: 1740762001397@@127.0.0.1@3306
CREATE DATABASE facturacion;
USE facturacion;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(15)
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    fecha DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('activa', 'anulada') DEFAULT 'activa',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE detalle_factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    factura_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (factura_id) REFERENCES facturas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO clientes (nombre, email, telefono) VALUES
('Juan Pérez', 'juan.perez@example.com', '1234567890'),
('María Gómez', 'maria.gomez@example.com', '0987654321'),
('Carlos López', 'carlos.lopez@example.com', '5555555555');

INSERT INTO productos (nombre, precio, stock) VALUES
('Laptop HP', 1200.00, 10),
('Teclado Inalámbrico', 50.00, 25),
('Mouse Gamer', 30.00, 30),
('Monitor 24"', 200.00, 15),
('Impresora Laser', 150.00, 8);

INSERT INTO facturas (cliente_id, fecha, total, estado) VALUES
(1, '2023-10-01', 1250.00, 'activa'),
(2, '2023-10-02', 230.00, 'activa'),
(3, '2023-10-03', 180.00, 'anulada');

INSERT INTO detalle_factura (factura_id, producto_id, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 1200.00, 1200.00),  
(1, 2, 1, 50.00, 50.00),       
(2, 3, 2, 30.00, 60.00),       
(2, 4, 1, 200.00, 200.00),     
(3, 5, 1, 150.00, 150.00);     