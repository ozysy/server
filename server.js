import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();


// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = process.env.PORT || 8080;

// http получает запрос
app.get('/', (req, res) => {
    res.status(201).json("home GET Request");
});

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/build')));

// api routes
app.use('/api', router)

// Catch-all handler to serve React's index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// start server только, когда мы подключены
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Не возможно подключиться к серверу', error)
    }
}).catch(error => {
    console.log("Не та база данных!", error);
})