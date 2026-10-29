//import {pooldb} from "../config/dataBase.js";
const pooldb = require('../config/dataBase.js');
const libroControler = {

	index: async(req,res)=>{	//Listar todos los libros
		try{
			const[registros] = await pooldb.query('Select * from libros');
			res.json(registros);
		} catch (error){
			res.status(204).json({mensaje:'No se pudo'});
		}
	},

	show: async(req,res)=>{
		try{
			console.log(req.params.id);
			const[resultado] = await pooldb.execute('Select * from libros WHERE id = ?',[req.params.id]);
			console.log(resultado);
			if(!resultado){
				res.status(404).json({mensaje:'No se pudo'+ error.message});
			};
			res.json(resultado);
		} catch (error){
			res.status(204).json({mensaje:'No se pudo'});
		}
	},

	store: async (req,res)=>{
		try{
			console.log(req.body);
		const[resultado] = await pooldb.execute('INSERT INTO libros (titulo,autor,precio) VALUES (?,?,?)',[req.body.titulo,req.body.autor,req.body.precio]);
			if(resultado.affectedRows){
				res.status(400).json({mensaje:'No se pudo crear el libro'+ error.message});
			};
			res.json({mensaje: 'Libro creado con exito', id: resultado.insertId});
		} catch (error){
			res.status(204).json({mensaje:'No se pudo'+ error.message});
		}
	},

	update: async(req,res)=>{
		try{
		const[resultado] = await pooldb.execute('UPDATE libros SET titulo =?,autor = ?,precio = ? WHERE id = ?',[req.body.titulo,req.body.autor,req.body.precio, req.params.id]);
			if(resultado.affectedRows){
				res.status(400).json({mensaje:'No se pudo actualizar el libro'+ error.message});
			};
			res.json({mensaje: 'Libro actualizado con exito', id: resultado.insertId});
		} catch (error){
			res.status(204).json({mensaje:'No se pudo'+ error.message});
		}
	},

	partialUpdate: (req,res)=>{
	res.send("RESTfull actualizar un dato emn concreto");
	},

	destroy: async (req,res)=>{
		try{
		const[resultado] = await pooldb.execute('DELETE FROM libros WHERE id = ?',[req.params.id]);
			if(resultado.affectedRows){
				res.status(400).json({mensaje:'No se pudo ELIMINAR el libro'+ error.message});
			};
			res.json({mensaje: 'Libro ELIMINADO con exito', id: resultado.insertId});
		} catch (error){
			res.status(204).json({mensaje:'No se pudo'+ error.message});
		}
	},



};

module.exports = libroControler;