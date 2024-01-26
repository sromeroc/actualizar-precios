const express = require('express');
const fileUpload = require('express-fileupload');
const obtener = require('./obtener');
const actualizar = require('./actualizar');

const app = express();

// Habilita la carga de archivos
app.use(fileUpload());

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));
app.use(express.static('.'));

// Ruta para descargar el archivo Excel
app.get('/descargar', (req, res) => {
  obtener()
    .then(() => {
      res.download('productos.xlsx');
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

// Ruta para cargar y actualizar el archivo Excel
app.post('/actualizar', (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No se cargó ningún archivo.');
  }

  // Guarda el archivo cargado
  let file = req.files.file;
  file.mv('productos.xlsx', error => {
    if (error) {
      return res.status(500).send(error.message);
    }

    // Actualiza los productos
    actualizar()
      .then(() => {
        res.send('Productos actualizados con éxito.');
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
  });
});

app.listen(3000, () => {
  console.log('Aplicación escuchando en el puerto 3000.');
});
