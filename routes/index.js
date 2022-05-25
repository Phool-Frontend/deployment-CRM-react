const express=require('express');
const router  = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//middle para proteger las rutas
const auth = require('../middleware/auth');


module.exports = function(){
    
    //Agrega nuevos clientes via POST
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente
    );

    //obtener todos los clientes
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes
    );

    //muestra un cliente en especifico
    router.get('/clientes/:idCliente',
        auth,
        clienteController.mostrarCliente
    );

    //actualizar cliente
    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente
    );
    
    //eliminar cliente
    router.delete('/clientes/:idCliente',
        auth,
        clienteController.eliminarCliente
    );

    /** PRODUCTOS **/
    //nuevos productos
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //muestrar todos los productos
    router.get('/productos',
        auth,
        productosController.mostrarProductos
    );

    //muestra un producto
    router.get('/productos/:idProducto',
        auth,
        productosController.mostrarProducto
    );

    //actualizar productos
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //eliminar productos
    router.delete('/productos/:idProducto',
        auth,
        productosController.eliminarProducto
    );

    //Busqueda de productos
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProducto
    );


    /** PEDIDOS **/
    //agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario',
        auth,
        pedidosController.nuevoPedido
    );

    //mostrar todos los pedidos
    router.get('/pedidos',
        auth,
        pedidosController.mostrarPedidos
    );

    //mostrar un pedido por su id
    router.post('/pedidos/:idPedido',
        auth,
        pedidosController.mostrarPedido
    );

    //actualizar pedidos
    router.put('/pedidos/:idPedido',
        auth,
        pedidosController.actualizarPedido
    );

    //elimina un pedido
    router.delete('/pedidos/:idPedido',
        auth,
        pedidosController.eliminarPedido
    );

    // Usuarios
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );


    router.post('/iniciar-sesion',
        //Este no tiene auth ya que aqui se creara al ingresar
        usuariosController.autenticarUsuario
    );


    return router;
}