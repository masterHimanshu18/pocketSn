import express from 'express';
import { MongoClient } from 'mongodb';
import config from './config.js';
import joi from 'joi';
import multer from 'multer';
import path from 'path'; // Use import instead of require
import fs from 'fs'; // Use import instead of require

const upload = multer({ dest: './uploads' });
const client = new MongoClient(config.db_url);
const router = express.Router();

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string(),
    role: joi.required()
});

const productInsertSchema = joi.object({
    name: joi.string().required(),
    category: joi.string().required(),
    stock: joi.number().required(),
    price: joi.string().required(),
});

async function connectToDB() {
    if (!client.isConnected) {
        await client.connect();
    }
    return client.db(config.dbName);
}

// define API Routes

router.get('/', (req, res) => {
    res.send('Aaao bhai ye API ka home Route hai');
});

// for getting all data
router.get('/api/data', async (req, res) => {
    try {
        const db = await connectToDB();
        const collection = db.collection('user');
        const response = await collection.find({}).toArray();
        res.json(response);
    } catch (err) {
        console.log('Error Fetching Data', err);
        res.status(500).json({ error: 'Failed to fetch from Database', details: err.message });
    }
});

// for login
router.post('/api/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const { email, password, role } = req.body;

    try {
        const db = await connectToDB();
        const collection = db.collection('user');
        const user = await collection.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ error: 'User not found or incorrect credentials' });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// insert product
router.post('/api/insertProduct', upload.single('image'), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("File Info:", req.file);

        const { name, price, category, stock } = req.body;
        const { error } = productInsertSchema.validate({ name, price, category, stock });

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const db = await connectToDB();
        const collection = db.collection('product');

        let imagePath = '';
        if (req.file) {
            const extension = path.extname(req.file.originalname);
            const newFileName = `${req.file.filename}${extension}`;
            const newFilePath = path.join(req.file.destination, newFileName);

            // Rename the file to include the extension
            fs.renameSync(req.file.path, newFilePath);

            imagePath = newFilePath;
        }

        const product = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            category,
            photo: imagePath,
        };

        const result = await collection.insertOne(product);
        res.status(201).json({ message: 'Product inserted successfully', result });
    } catch (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ error: 'Failed to insert product' });
    }
});

export default router;
