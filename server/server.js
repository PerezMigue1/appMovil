const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Datos de ejemplo (simulando una base de datos)
const usuarios = [
    {
        email: "erick26gfboo@gmail.com",
        password: "$2b$10$gFW0oZTmmJCeVmGo9XqIyOTeGbsA2McSXhmaMVqdISQvYrZYnXekO", // Contraseña encriptada
    },
];

// Endpoint para iniciar sesión
app.post('/usuarios/singIn', (req, res) => {
    const { email, password } = req.body;

    // Buscar el usuario en la "base de datos"
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario) {
        return res.status(401).json({ message: 'Correo electrónico no registrado' });
    }

    // Simular verificación de contraseña (en un caso real, usarías bcrypt)
    if (usuario.password !== password) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo está bien, devolver éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso', userEmail: email });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 