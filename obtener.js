const axios = require('axios');
const ExcelJS = require('exceljs');

// Configura tus credenciales de BigCommerce
const config = {
  headers: {
    'X-Auth-Token': 'qjfht88mfo6pklv99xeseq4b1n8tro0',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

// Función para obtener los productos de BigCommerce y generar un archivo Excel
async function obtener() {
  try {
    const response = await axios.get('https://api.bigcommerce.com/stores/w88t8bxrb1/v3/catalog/products', config);
    const products = response.data.data;
    await generateExcel(products);
    console.log('Productos obtenidos y archivo Excel generado con éxito.');
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    throw error; // Re-lanza el error para que pueda ser manejado en el nivel superior
  }
}

// Función para generar un archivo Excel con los productos
async function generateExcel(products) {
  try {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet('Productos');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 32 },
      { header: 'Precio', key: 'price', width: 15 },
      { header: 'Peso', key: 'weight', width: 15 },
      { header: 'Nuevo Precio', key: 'new_price', width: 15 }
    ];

    products.forEach(product => {
      // Añade un campo 'new_price' en blanco a cada producto
      product.new_price = '';
      worksheet.addRow(product);
    });

    await workbook.xlsx.writeFile('productos.xlsx');
    console.log('Archivo Excel generado con éxito.');
  } catch (error) {
    console.error('Error al generar archivo Excel:', error.message);
    throw error;
  }
}

module.exports = obtener;
