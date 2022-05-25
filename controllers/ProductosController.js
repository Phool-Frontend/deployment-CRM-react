const Productos = require('../models/Productos');

const fs = require('fs');
const multer = require('multer');
const shortid = require('shortid');


const configuracionMulter = {
    limits:{filesize : 100000},
    storage: filesStorage = multer.diskStorage({
        destination: (req,file,next) => {
            next(null, __dirname+'../../uploads/');
        },
        filename:(req,file,next) => {
            const extension = file.mimetype.split('/')[1];
            next(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,next){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            //el formato es valido
            next(null,true);
        }else{
            //el formato no es valido
            next(new Error('Formato no valido'),false);
        }
    }
}

//pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

//sube un archivo
exports.subirArchivo = (req,res,next) =>{
    upload(req,res,function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next();
    })
}

//agrega nuevos productos
exports.nuevoProducto = async (req,res,next) =>{
    const producto = new Productos(req.body);

    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje :'Se agrego un nuevo producto'});
    } catch (error) {
        console.log(error);
    }
}

// muestra todos los productos
exports.mostrarProductos = async (req,res,next) =>{
    try {
        const productos = await Productos.find({});
        console.log(productos);
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
}

//muestra un producto en especifico por su id
exports.mostrarProducto = async (req,res,next) =>{

   
    const producto = await Productos.findById(req.params.idProducto);
    

    if(!producto){
        res.json({mensaje:'Ese producto no existe'});
        return next();
    }

    //mostrar el producto
    res.json(producto);
}

//actualizar un producto via id
exports.actualizarProducto =async (req,res,next) =>{
    try {

        
        //construir nuevo producto
        let nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findByIdAndUpdate({_id:
            req.params.idProducto},nuevoProducto,{
            new: true,
        });

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//elimina un producto via ID
exports.eliminarProducto = async(req,res,next) => {
    try {
        const producto = await Productos.findOneAndDelete({ _id:req.params.idProducto});

        if(producto.imagen){
            const imagenAnterioPath = __dirname + `../../uploads/${producto.imagen}`;
            // Eliminar archivo con filesystem
            fs.unlink( imagenAnterioPath, (error) => {
                
                if(error) {
                    console.log(error);
                }
                return;
            });
            
        }

        res.json({ producto , mensaje:'Producto Eliminado'});
 
    }catch(error){
        res.json({ mensaje:'No existe ese Producto'});
        console.log(error);
        next();
    }
}

exports.buscarProducto = async(req,res,next) =>{
    try {
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query,'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}