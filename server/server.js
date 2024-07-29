const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Ruta básica para probar el servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});