const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json()); // manejo de datos en formato JSON
app.use(express.urlencoded({ extended: true })); // procesa los datos del cuerpo de la solicitud 
                                                // y los convierte en un objeto que se almacena en req.body

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


// GET /usuarios: Obtiene la lista de todos los usuarios.
// es el objeto en formato json para poder trabajar con esos datos
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// POST /usuarios: Crea un nuevo usuario.
// asignando una id diferente a la de los ya creados
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };

    usuarios.push(nuevoUsuario);
    res.redirect('/usuarios');
});

// GET /usuarios/:nombre: Obtiene un usuario por nombre.
/* Con req.params accederás al objeto que devuelve el parametro añadido. 
Si añades el 'comodín' en tu código verás el string. */
app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre === nombre);

    if (!usuario) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
        res.json(usuario);
    }
});

// PUT /usuarios/:nombre: Actualiza la información de un usuario por nombre.
// Método .findIndex() --> 
app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre; 
    const usuarioActualizado = usuarios.findIndex(usuario => usuario.nombre === nombre);

    if (usuarioActualizado === -1) {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
        usuarios[usuarioActualizado].edad = req.body.edad;
        usuarios[usuarioActualizado].lugarProcedencia = req.body.lugarProcedencia;
        res.json(usuarios[usuarioActualizado]);
    }
});

// DELETE /usuarios/:nombre: Elimina un usuario por nombre.
// Método .filter() --> crea nuevo listado que no incluye al usuario borrado.
app.delete('/usuarios/:nombre', (req, res) => {
    const borrarUsuario = req.params.nombre;
    usuarios = usuarios.filter(usuario => usuario.nombre !== borrarUsuario);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});