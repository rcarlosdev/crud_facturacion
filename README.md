# Sistema de Facturación

Este es un sistema básico de facturación desarrollado con **PHP** (backend), **MySQL** (base de datos), y **HTML/CSS/JavaScript** (frontend). El sistema permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre facturas, clientes y productos.

---

## Requisitos

1. **XAMPP**: Para ejecutar el servidor Apache y MySQL.
2. **Navegador Web**: Para acceder a la aplicación.
3. **Editor de Código**: Como Visual Studio Code, Sublime Text, etc.

---

## Configuración del Proyecto

### 1. Clonar o Descargar el Proyecto

- Clona este repositorio o descárgalo como archivo ZIP.
- Coloca la carpeta del proyecto en la raíz del servidor web de XAMPP (por ejemplo, `C:\xampp\htdocs\crud_facturacion`).

---

### 2. Configurar XAMPP

1. **Iniciar XAMPP:**
   - Abre el panel de control de XAMPP.
   - Inicia los servicios **Apache** y **MySQL**.

2. **Acceder a phpMyAdmin:**
   - Abre tu navegador y ve a `http://localhost/phpmyadmin`.
   - Crea una nueva base de datos llamada `facturacion`.

3. **Importar la Estructura de la Base de Datos:**
   - En phpMyAdmin, selecciona la base de datos `facturacion`.
   - Ve a la pestaña **Importar**.
   - Selecciona el archivo SQL proporcionado (`facturacion.sql`) y haz clic en **Continuar**.

---

### 3. Configurar el Backend

1. **Base de Datos:**
   - Asegúrate de que el archivo `backend/config/database.php` tenga las credenciales correctas de MySQL. Por defecto, son:

     ```php
     $host = 'localhost';
     $dbname = 'facturacion';
     $username = 'root';
     $password = '';
     ```

2. **Servidor Backend:**
   - El backend está diseñado para ejecutarse en `http://localhost/crud_facturacion/backend/`.
   - Asegúrate de que los archivos PHP estén en la carpeta correcta (`htdocs/crud_facturacion/backend`).

---

### 4. Configurar el Frontend

1. **Acceder al Frontend:**
   - Abre tu navegador y ve a `http://localhost/crud_facturacion/frontend/index.html`.

2. **Conexión con el Backend:**
   - El frontend hace solicitudes al backend mediante `fetch`. Asegúrate de que las URLs en `main.js` sean correctas (por ejemplo, `http://localhost/crud_facturacion/backend/controllers/FacturaController.php`).

---

## Uso de la Aplicación

### 1. Listado de Facturas

- Al abrir la aplicación, verás un listado de facturas.
- Cada fila muestra el ID, cliente, fecha, total y estado de la factura.
- Puedes hacer clic en **Ver Detalle** para ver los productos asociados a la factura.
- Puedes hacer clic en **Anular** para cambiar el estado de la factura a "anulada".

---

### 2. Crear una Nueva Factura

1. Haz clic en el botón **Crear Factura**.
2. Selecciona un cliente y un producto.
3. Ingresa la cantidad del producto.
4. Haz clic en **Agregar Producto** para añadirlo a la factura.
5. Repite los pasos 2-4 para agregar más productos.
6. Haz clic en **Guardar Factura** para guardar la factura en la base de datos.

---

### 3. Ver Detalle de una Factura

- Haz clic en **Ver Detalle** en cualquier factura del listado.
- Se abrirá un modal que muestra:
  - **Encabezado de la Factura:** ID, cliente, fecha, total y estado.
  - **Productos:** Lista de productos con cantidad, precio unitario y subtotal.

---

### 4. Anular una Factura

- Haz clic en **Anular** en cualquier factura del listado.
- El estado de la factura cambiará a "anulada".

---

## Estructura del Proyecto

```
    /facturacion
│
├── /backend
│ ├── /config
│ │ └── database.php # Configuración de la base de datos
│ ├── /controllers
│ │ └── FacturaController.php # Controlador de facturas
│ ├── /models
│ │ ├── FacturaModel.php # Modelo de facturas
│ │ ├── ClienteModel.php # Modelo de clientes
│ │ └── ProductoModel.php # Modelo de productos
│ └── index.php # Punto de entrada del backend
│
├── /frontend
│ ├── /css
│ │ └── styles.css # Estilos CSS
│ ├── /js
│ │ └── main.js # Lógica JavaScript
│ └── index.html # Vista principal
│
└── README.md # Documentación del proyecto
```
