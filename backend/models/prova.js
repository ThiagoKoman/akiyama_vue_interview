const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Estudante = require('./estudante');
const Materia = require('./materia');

const Prova = sequelize.define('Prova', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nota: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Prova.belongsTo(Estudante, { 
    foreignKey: 'id_estudante',
    onDelete: 'CASCADE'  
});
Prova.belongsTo(Materia, { 
    foreignKey: 'id_matéria',
    onDelete: 'CASCADE' 
});

module.exports = Prova;
