const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado a BD'))

//Importar Rutas
const appointmentRouter = require('./routes/appointment');
const userRouter = require('./routes/user');
const scheduleRouter = require('./routes/schedule');
const subCategoryRouter = require('./routes/subCategory');
const categoryRouter = require('./routes/category');
const businessRouter = require('./routes/business');

//Middleware
app.use(cors());
app.use(express.json())
app.use('/appointment', appointmentRouter);
app.use('/user', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/subCategory', subCategoryRouter);
app.use('/category', categoryRouter);
app.use('/business', businessRouter);

//Rutas
app.get('/', (req, res) => {
    res.send('HOME');
})

//Start
app.listen((process.env.PORT || 3000), function () {
    console.log('Servidor iniciado en el puerto ' + (process.env.PORT || 3000));
});

