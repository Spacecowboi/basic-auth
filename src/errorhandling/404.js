'use strict';

module.exports = (req, res, next) => {
    res.status(404).send({ error: 'Not Found', message: 'The droid you are looking for does not exist' });
};