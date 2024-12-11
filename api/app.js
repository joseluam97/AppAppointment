const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io'); // Importar Socket.IO
const http = require('http'); // Crear un servidor HTTP

const list_events = require("./constant/list_events");

require('dotenv').config();

// Conexión a MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log('Conectado a BD');

    // Configurar Change Stream en la colección 'appointments'
    const appointmentsCollection = db.collection('appointments');
    const changeStream = appointmentsCollection.watch();

    changeStream.on('change', (change) => {
        console.log('Cambio detectado:', change);

        // Emitir evento según el tipo de operación
        if (change.operationType === 'insert') {
            io.emit(list_events.EVENT_POST_APPOINTMENT, {
                type: 'insert',
                document: change.fullDocument
            });
        } else if (change.operationType === 'update') {
            io.emit(list_events.EVENT_PUT_APPOINTMENT, {
                type: 'update',
                documentKey: change.documentKey,
                updatedFields: change.updateDescription.updatedFields
            });
        } else if (change.operationType === 'delete') {
            io.emit(list_events.EVENT_DELETE_APPOINTMENT, {
                type: 'delete',
                documentKey: change.documentKey
            });
        }
    });
});

// Crear un servidor HTTP para usarlo con Socket.IO
const server = http.createServer(app);

// Configurar Socket.IO con el servidor HTTP
const io = new Server(server, {
    cors: {
        origin: "*", // Asegúrate de permitir orígenes según tus necesidades
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Importar Rutas
const appointmentRouter = require('./routes/appointment');
const userRouter = require('./routes/user');
const scheduleRouter = require('./routes/schedule');
const subCategoryRouter = require('./routes/subCategory');
const categoryRouter = require('./routes/category');
const businessRouter = require('./routes/business');

// Usar Rutas
app.use('/appointment', appointmentRouter);
app.use('/user', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/subCategory', subCategoryRouter);
app.use('/category', categoryRouter);
app.use('/business', businessRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('HOME');
});

// Configurar eventos de WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Enviar un mensaje al cliente tras la conexión
    socket.emit('serverMessage', '¡Bienvenido al servidor!');

    // Evento personalizado: recibir mensajes
    socket.on('sendMessage', (data) => {
        console.log('Mensaje recibido:', data);
        // Emitir mensaje a todos los clientes conectados
        io.emit('newMessage', data);
    });

    // Simular un mensaje periódico desde el servidor
    setInterval(() => {
        const message = `Mensaje desde el servidor a las ${new Date().toLocaleTimeString()}`;
        socket.emit('serverMessage', message);
    }, 10000); // Cada 10 segundos

    // Desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
