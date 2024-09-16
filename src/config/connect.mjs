import express from 'express';
import cors from 'cors';
import config from './config.js'; // Ensure this path is correct
import routes from './router.js'; // Ensure this path is correct

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json()); // Parse JSON bodies

// Use the routes
app.use('/', routes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});
