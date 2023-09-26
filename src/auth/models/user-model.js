'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.addHook('beforeCreate', async (user) => {
    //catch errors so app doesnt break
    try {
        user.password = await bcrypt.hash(user.password, 10);
    } catch (e) {
        console.error('Error hashing password', e);
    }
});

User.prototype.authenticate = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (e) {
        console.error('Error comparing passwords', e);
    }
};

module.exports = User