const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://otavitto:otavio123@users.eolt7.mongodb.net/?retryWrites=true&w=majority&appName=users');
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
