'use strict';

module.exports = (err, req, res, next) => {
    res.status(500).send({ error: 'Internal Server Error', message: 'An unexpected droid has occurred' });
};