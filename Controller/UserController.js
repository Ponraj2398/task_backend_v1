const express = require('express');
const router = express.Router();
const User = require('../Model/UserModel')
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register/add', async (req, res) => {
    try 
    {
        const { phone, name, password } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ phone, name, password: password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });      
    } 
    catch (error)
    {
        res.status(500).json({ error: 'Registration Failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(401).json({ error: 'Authentication Failed' });
        }
        // const passwordMatch = await bcrypt.compare(password, user.password);
        if (password != user.password) {
            return res.status(401).json({ error: 'Authentication Failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'this-can-be-any-random-key', {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login Failed' });
    }
});

module.exports = router;