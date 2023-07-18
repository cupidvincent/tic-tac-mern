import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';
import gameRoutes from './routes/gameRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

connectDB();

const logRequests = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // Call next() to proceed to the next middleware or route handler
};

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(logRequests);

app.use('/api/game',gameRoutes);

if(process.env.TO === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else { 
  app.get('/', (req, res) => res.send('Server is Ready'))
}

// location / {
//   proxy_pass http://localhost:5000;
//   proxy_http_version 1.1;
//   proxy_set_header Upgrade $http_upgrade;
//   proxy_set_header Connection 'upgrade';
//   proxy_set_header Host $host;
//   proxy_cache_bypass $http_upgrade;
// }
app.use(notFound);
app.use(errorHandler);

app.listen(
    port,
    () => console.log(`Server started on PORT: ${port}`)
)