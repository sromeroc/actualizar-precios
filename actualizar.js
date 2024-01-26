const axios = require('axios');
const ExcelJS = require('exceljs');

// Configura tus credenciales de BigCommerce
const config = {
  headers: {
    'X-Auth-Token': process.env.BC_AUTH_TOKEN || 'qjfht88mfo6pklv99xeseq4b1n8tro0',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

// Función para leer el archivo Excel y actualizar los productos en BigCommerce
async function actualizar(apiUrl, credentials) {
  try {
    let workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('productos.xlsx');
    let worksheet = workbook.getWorksheet('Productos');

    await worksheet.eachRow(async (row, rowNumber) => {
      if (rowNumber !== 1) {
        let productId = row.getCell(1).value;
        let newPrice = row.getCell(5).value;
        if (newPrice) {
          await updateProduct(productId, newPrice, apiUrl, credentials);
        }
      }
    });

    console.log('Productos actualizados con éxito.');
  } catch (error) {
    console.error('Error al actualizar productos:', error.message);
    throw error;
  }
}

// Función para actualizar un producto en BigCommerce
async function updateProduct(productId, newPrice, apiUrl, credentials) {
  try {
    let productData = {
      price: newPrice
    };

    await axios.put(`${apiUrl || 'https://api.bigcommerce.com/stores/w88t8bxrb1/v3/catalog/products'}/${productId}`, productData, {
      ...config,
      headers: {
        ...config.headers,
        'X-Auth-Token': credentials || config.headers['X-Auth-Token']
      }
    });

    console.log(`Producto ${productId} actualizado con éxito.`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

module.exports = actualizar;
