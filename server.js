const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

//Import funciones BD
const {
    consultaUsuarios,
    consultaTransferencias,
    agregarUsuario,
    eliminarUsuario,
    editarUsuario,   
    transferenciaUsuario,
} = require('./queries');


// Middleware para trabajar con JSON
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Ruta index
app.get("/", async (req,res) => {
    res.sendFile(__dirname + "/index.html");
});



//Ruta para agregar usuario
app.post("/usuario", async (req, res) => {   
    try {
         //Recibiendo datos desde el html
        const { nombre, balance } = req.body;
        //Llamando a funcion de la base  de datos
        await agregarUsuario({nombre, balance});

        res.status(200).json({ message: "Usuairo agregado con éxito" });
    } catch (error) {
        console.error("Error al agregar al usuario", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});

//Ruta para editar usuario
app.put("/usuario" , async (req, res) => {
    try {
         //Recibiendo datos desde el html
        const {  nombre, balance, id } = req.body;       
        //Llamando a funcion de la base  de datos
        await editarUsuario(nombre, balance, id);

        res.json({ message: 'Usuario editado con exito.'});
    } catch (error) {
        console.error('Error editando usuario', error);
        res.status(500).json({ error: 'Error editando usuario', error });
    } 
});

//Ruta para eliminar usuario
app.delete("/usuario", async (req, res) => {
    try {
        //recibiendo ID desde el html
        const { id } = req.query;      
        //Llamando a funcion de la base  de datos
        await eliminarUsuario(id);      
        
        res.json({ message: 'Usuario eliminada.' })
    } catch (error) {
        console.error('Error eliminando el usuario', error);        
    }
});

//Ruta para recibir todas los transferencias en formato JSON
app.get("/transferencias", async (req, res) => {

    try {
        //Funcion consulta a la base  de datos
        const transferencias = await consultaTransferencias();
        //Almacenar transferencias como JSON        
        res.json(transferencias);
    } catch (error) {
        res.status(500).send("Error al obtener las transferencias");
    }   
});

//Ruta para recibir todas los usuarios en formato JSON
app.get("/usuarios", async (req, res) => {

    try {
        //Funcion consulta a la base  de datos
        const usuarios = await consultaUsuarios();
        //Almacenar usuarios como JSON
        res.json(usuarios);
    } catch (error) {
        res.status(500).send("Error al obtener los usuarios");
    }   
});

//Ruta para hacer transferencias
app.post("/transferencia", async (req, res) => {   
    try {
         //Recibiendo datos desde el html
        const { emisor, receptor, monto } = req.body;
        //Llamando a funcion de la base  de datos
        await transferenciaUsuario({emisor, receptor, monto});        
    } catch (error) {
        console.error("Error al agregar al usuario", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});

//Ruta error
app.get("*", async (req, res) => {
    res.send("Aqui no hay nada");
});

//Funcion para ejecutar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});