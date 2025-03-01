const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { validateRegister, validateLogin } = require('../validators/authValidator');

// Register a new user
const register = async (req, res) => {
    const { firstName, lastName, email, password, phone, registerNumber, batch } = req.body;

    // Validate the request body
    const { error } = validateRegister(req.body);
    if (error) {
        return res.status(400).json({
            errors: error.details.map((err) => ({
                message: err.message,
                field: err.context.key,
            })),
        });
    }

    try {
        // Check if email, regNo, or phone already exists
        const duplicateQuery = `
            SELECT * FROM users WHERE email = ? OR regNo = ? OR phone = ?
        `;
        db.query(duplicateQuery, [email, registerNumber, phone], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                const existingFields = results.map(user => {
                    if (user.email === email) return 'email';
                    if (user.regNo === registerNumber) return 'register number';
                    if (user.phone === phone) return 'phone';
                });
                return res.status(400).json({ 
                    message: `Duplicate entries for: ${existingFields.join(', ')}` 
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database
            const insertQuery = `
                INSERT INTO users (firstName, lastName, email, password, phone, regNo, batch)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(insertQuery, [firstName, lastName, email, hashedPassword, phone, registerNumber, batch], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login an existing user
const login = (req, res) => {
    const { identifier, password } = req.body;

    console.log(identifier, password);

    // Validate the request body
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).json({
            errors: error.details.map((err) => ({
                message: err.message,
                field: err.context.key,
            })),
        });
    }

    try {
        // Query to check if user exists by email, regNo, or phone
        const query = `
            SELECT * FROM users
            WHERE email = ? OR regNo = ? OR phone = ?
        `;
        db.query(query, [identifier, identifier, identifier], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(401).json({ message: 'Invalid identifier or password' });

            const user = results[0];

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid identifier or password' });

            // Generate JWT token
            const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

            res.status(200).json({ message: 'Login successful', type : user.roll , canteenId : user.canteenId, token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
