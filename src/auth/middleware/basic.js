'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { User } = require('../../auth/models/user-model');

module.exports = async (req, res, next) => {
    let basicHeaderparts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    try {
        const user = await User.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            req.user = user;
            next();
        } else {
            throw new Error('Invalid User');
        }
    } catch (error) {
        next(error);
    }
};