let detallesFactura = [];

function cargarFacturas() {
    fetch('http://localhost/crud_facturacion/backend/controllers/FacturaController.php?action=getFacturas')
        .then(response => response.json())
        .then(data => {
            detallesFactura = structuredClone(data);
            const tabla = document.getElementById('tabla-facturas').getElementsByTagName('tbody')[0];

            tabla.innerHTML = '';
            data.forEach(factura => {

                let color_estado = 'bg-success';
                if (factura.estado == 'anulada') {
                    color_estado = 'bg-danger';
                }

                let fila = `<tr>
                    <td>${factura.id}</td>
                    <td>${factura.cliente}</td>
                    <td>${factura.fecha}</td>
                    <td>$${factura.total}</td>
                    <td><span class="badge ${color_estado}">${factura.estado}</span></td>
                    <td>
                        <button class="btn btn-info" onclick="verDetalle(${factura.id})">Ver Detalle</button>
                        <button class="btn btn-danger" onclick="anularFactura(${factura.id})">Anular</button>
                    </td>
                </tr>`;
                tabla.innerHTML += fila;
            });
        });
}

function cargarClientes() {
    fetch('http://localhost/crud_facturacion/backend/controllers/FacturaController.php?action=getClientes')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('cliente');
            data.forEach(cliente => {
                let option = `<option value="${cliente.id}">${cliente.nombre}</option>`;
                select.innerHTML += option;
            });
        });
}

function cargarProductos() {
    fetch('http://localhost/crud_facturacion/backend/controllers/FacturaController.php?action=getProductos')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('productos');
            data.forEach(producto => {
                let option = `<option value="${producto.id}" data-precio="${producto.precio}">${producto.nombre} - $${producto.precio}</option>`;
                select.innerHTML += option;
            });
        });
}

document.getElementById('formFactura').addEventListener('submit', (e) => {
    e.preventDefault();
    const producto_id = document.getElementById('productos').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio_unitario = document.getElementById('productos').selectedOptions[0].dataset.precio;
    const subtotal = cantidad * precio_unitario;

    detallesFactura.push({ producto_id, cantidad, precio_unitario, subtotal });

    const tabla = document.getElementById('tabla-detalles').getElementsByTagName('tbody')[0];
    let fila = `<tr>
        <td>${document.getElementById('productos').selectedOptions[0].text}</td>
        <td>${cantidad}</td>
        <td>$${precio_unitario}</td>
        <td>$${subtotal}</td>
    </tr>`;
    tabla.innerHTML += fila;
});

function guardarFactura() {
    const cliente_id = document.getElementById('cliente').value;
    const total = detallesFactura.reduce((sum, detalle) => sum + detalle.subtotal, 0);

    fetch('http://localhost/crud_facturacion/backend/controllers/FacturaController.php?action=createFactura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id, total, detalles: detallesFactura })
    })
    .then(response => response.json())
    .then(data => {
        alert('Factura creada con ID: ' + data.id);
        cargarFacturas();
        detallesFactura = [];
        document.getElementById('tabla-detalles').getElementsByTagName('tbody')[0].innerHTML = '';
    });
}

function verDetalle(factura_id) {
    fetch(`http://localhost/crud_facturacion/backend/controllers/FacturaController.php?action=getDetalleFactura&id=${factura_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Mostrar los productos
            const tbody = document.getElementById('detalle-productos');
            tbody.innerHTML = ''; // Limpiar contenido anterior
            data.forEach(item => {
                let fila = `<tr>
                    <td>${item.producto}</td>
                    <td>${item.cantidad}</td>
                    <td>$${item.precio_unitario}</td>
                    <td>$${item.subtotal}</td>
                </tr>`;
                tbody.innerHTML += fila;
            });

            const { cliente, fecha, total, estado } = detallesFactura.find(factura => factura.id == factura_id);

            // Mostrar el encabezado de la factura
            document.getElementById('detalle-id').textContent = factura_id;
            document.getElementById('detalle-cliente').textContent = cliente;
            document.getElementById('detalle-fecha').textContent = fecha;
            document.getElementById('detalle-total').textContent = `$${total}`;
            document.getElementById('detalle-estado').textContent = estado;


            // Abrir el modal
            const modal = new bootstrap.Modal(document.getElementById('modalDetalleFactura'));
            modal.show();
        })
        .catch(error => console.error('Error cargando el detalle de la factura:', error));
}

function anularFactura(factura_id) {
    fetch(`http://localhost/crud_facturacion/backend/controllers/FacturaController.php?action=anularFactura&id=${factura_id}`)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            cargarFacturas();
        });
}

function abrirModal() {
    const modal = new bootstrap.Modal(document.getElementById('modalFactura'));
    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
    cargarProductos();
    cargarFacturas();
});