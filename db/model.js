const { db, Model } = require('./connection')
const { DataTypes } = require('sequelize')


class User extends Model { }
User.init({

    firstname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isadmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, { sequelize: db, modelName: 'user', allowNull: false })

class Flights extends Model { }
Flights.init({
    flightid: {
        type: DataTypes.STRING,

        allowNull: false,
        primaryKey: true

    },
    to: {
        type: DataTypes.STRING,
        defaultValue: "DELHI"
    },
    from: {
        type: DataTypes.STRING,
        defaultValue: "CHENNAI"
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    availableCount: {
        type: DataTypes.INTEGER,
        defaultValue: 60
    }
}, { sequelize: db, modelName: 'flights', allowNull: false })

class Bookings extends Model { }
Bookings.init({
    pnr:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    flightid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: db, modelName: 'bookings', allowNull: false })


module.exports = { User, Flights, Bookings, db }