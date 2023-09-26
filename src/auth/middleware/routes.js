'use strict';

const express = require('express');
const router = express.router();
const User = require('../models/user-model');
const basicAuth = require('./basic')

router.post('./signup', async (req, res) => {
    try{
        const record = await User.create(req.body);
        res.status(201).json(record);
    } catch (e) {
        res.status(403).send('Error Creating User');
    }
});

router.post('/signin', basicAuth, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;