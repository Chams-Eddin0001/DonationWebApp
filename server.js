import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/charityimpact';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schema & Model
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === adminUsername && password === adminPassword) {
        const token = jwt.sign({ username: adminUsername }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.get('/api/admin/messages', authenticateToken, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Cause Schema & Model
const CauseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    raised_amount: { type: Number, default: 0 },
    goal_amount: { type: Number, required: true },
    image_url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Cause = mongoose.model('Cause', CauseSchema);

// Cause Routes
app.get('/api/causes', async (req, res) => {
    try {
        const causes = await Cause.find().sort({ createdAt: -1 });
        res.json(causes);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/causes', authenticateToken, async (req, res) => {
    try {
        const newCause = new Cause(req.body);
        await newCause.save();
        res.status(201).json(newCause);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create cause' });
    }
});

app.put('/api/causes/:id', authenticateToken, async (req, res) => {
    try {
        const updatedCause = await Cause.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCause);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cause' });
    }
});

app.delete('/api/causes/:id', authenticateToken, async (req, res) => {
    try {
        await Cause.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cause deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete cause' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({ message: 'Message sent successfully!', contact: newContact });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Server error, please try again later.' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
