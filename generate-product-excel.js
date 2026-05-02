const fs = require('fs');
const { products } = require('./src/data/products.js');

// Generate CSV content
let csvContent = 'Product ID,Product Name,Chinese Name,Image Link,Video Link,Price (RM),Category\n';

products.forEach(product => {
  const id = product.id || '';
  const name = (product.name || '').replace(/"/g, '""'); // Escape quotes
  const nameChinese = (product.nameChinese || '').replace(/"/g, '""');
  const image = product.image || '';
  const video = product.video || '';
  const price = product.price || '';
  const category = product.category || '';

  csvContent += `"${id}","${name}","${nameChinese}","${image}","${video}","${price}","${category}"\n`;
});

// Write to CSV file
fs.writeFileSync('BMFireworks_Products.csv', csvContent, 'utf-8');

console.log(`✅ Excel/CSV generated successfully!`);
console.log(`📄 File: BMFireworks_Products.csv`);
console.log(`📊 Total products: ${products.length}`);
