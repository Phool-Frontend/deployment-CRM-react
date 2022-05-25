const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async (req,res,next) =>{
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje:'Se agrego un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra todos los pedidos
exports.mostrarPedidos = async (req,res,next) =>{
    

    try{
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra un pedido por su ID
exports.mostrarPedido = async (req,res,next) =>{
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path:'pedido.producto',
        model:'Productos'
    });

    if(!pedido){
        res.json({mensaje:'Ese pedido no existe'});
        return next();
    }

    //mostrar el pedido
    res.json(pedido);
    
}

//actualizar el pedido via ID
exports.actualizarPedido = async(req,res,next) =>{


    try {
        let pedido = await Pedidos.findByIdAndUpdate({_id : req.params.idPedido},req.body,{
            new:true
        })
        .populate('cliente')
        .populate({
            path:'pedido.producto',
            model:'Productos'
        });

        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

//elimina un pedido por su ID
exports.eliminarPedido = async(req,res,next) => {
    try {
        await Pedidos.findOneAndDelete({ _id:req.params.idPedido});
        res.json({mensaje:'El Pedido se ha Eliminado'});
 
    }catch(error){
        console.log(error);
        next();
    }
}