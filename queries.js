const pool = require("./dbConfig");

// Función para ejecutar una consulta SQL
async function consultaUsuarios() {
    // Obtenemos una conexión de la pool
    const client = await pool.connect();
    try {       
        // Ejecutamos la consulta SQL
        const result = await client.query("SELECT * FROM usuarios");
        // Mostramos los resultados
        return result.rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
    } finally {
        // Liberamos la conexión
        client.release();
    }
}
// Función para ejecutar una consulta SQL
async function consultaTransferencias() {
    // Obtenemos una conexión de la pool
    const client = await pool.connect();
    try {       
        // Ejecutamos la consulta SQL
        const result = await client.query("SELECT * FROM transferencias");
        // Mostramos los resultados
        return result.rows;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
    } finally {
        // Liberamos la conexión
        client.release();
    }
}

// Función para insertar un usuario
const agregarUsuario = async (usuario) => {
    const client = await pool.connect();
    const text =
        "INSERT INTO usuarios(nombre, balance) VALUES($1, $2)";
    const values = [usuario.nombre , usuario.balance];
    try {
        const response = await client.query(text, values);
        console.log("Usuario agregado");
        console.log(response, values)
    } catch (error) {
        console.error("Error agregando usuario:", error);
    } finally {
        client.release();
    }
};

//Funcion para editar usuarios
const editarUsuario = async (nombre, balance, id) => {
    const client = await pool.connect();
    const text =
        "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3";
    const values = [nombre, balance, id];
    try {
        const res = await client.query(text, values);
        console.log("Balance del usuario actualizado");
    } catch (err) {
        console.error("Error actualizando usuario : ", err);
    } finally {
        client.release();
    }
};

// Función para eliminar Usuario
const eliminarUsuario = async (id) => {
    const client = await pool.connect();
    const text = "DELETE FROM usuarios WHERE id = $1";
    const values = [id];
    try {
        const response = await client.query(text, values);
        console.log("Usuario eliminado ");
    } catch (error) {
        console.error("Error eliminando usuario:", error);
    } finally {
        client.release();
    }
};

//Funcion para transferir a un usuario 
const transferenciaUsuario = async (emisor, receptor, monto) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // Descontar el monto del emisor
        const descontarQuery = "UPDATE usuarios SET balance = balance - $1 WHERE nombre = $2";
        await client.query(descontarQuery, [monto, emisor]);

        // Acreditar el monto al receptor
        const acreditarQuery = "UPDATE usuarios SET balance = balance + $1 WHERE nombre = $2";
        await client.query(acreditarQuery, [monto, receptor]);

        await client.query("COMMIT");
        console.log("Transferencia realizada exitosamente");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error realizando la transferencia: ", err);
    } finally {
        client.release();
    }
};
module.exports = {
    consultaUsuarios,
    consultaTransferencias,
    agregarUsuario,
    eliminarUsuario,
    editarUsuario,
    transferenciaUsuario
};