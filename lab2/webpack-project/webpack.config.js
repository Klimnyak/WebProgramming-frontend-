const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');

// Знаходимо всі HTML файли в папці src/pages
const htmlPages = fs.readdirSync(path.resolve(__dirname, './src/pages')).filter(file => file.endsWith('.html'));

// Створюємо HtmlWebpackPlugin для кожної HTML-сторінки
const htmlPlugins = htmlPages.map(page => {
  return new HtmlWebpackPlugin({
    filename: page, // Ім'я вихідного файлу
    template: path.resolve(__dirname, `./src/pages/${page}`), // Шлях до файлу в src/pages
  });
});

module.exports = {
  mode: 'development', // або 'production'
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(), // Очищення dist перед кожною збіркою
    ...htmlPlugins, // Динамічне створення HtmlWebpackPlugin для кожної сторінки
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000, // Можеш змінити порт на інший
  },
};



