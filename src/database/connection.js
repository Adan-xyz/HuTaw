const mongoose = require('mongoose');
const dotenv = require('dotenv'); dotenv.config();

const connect = () => {
	try { mongoose.connect(process.env.DB).then(() => {
		console.log('Database connected...');
	});
					
		} catch (error) {
		console.error('Error connecting to database:', error);
  }
}

module.exports = { connect };