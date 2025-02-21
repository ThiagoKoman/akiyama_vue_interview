// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const estudanteController = require('./controllers/estudanteController');
const materiaController = require('./controllers/materiaController');
const provaController = require('./controllers/provaController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco
sequelize.sync()
    .then(() => console.log('Banco de dados conectado'))
    .catch(err => console.log('Erro ao conectar ao banco:', err));

// Rotas para estudantes
app.post('/estudantes', estudanteController.createEstudante);
app.get('/estudantes', estudanteController.getEstudantes);
app.put('/estudantes/:id', estudanteController.updateEstudante);
app.delete('/estudantes/:id', estudanteController.deleteEstudante);

// Rotas para matérias
app.post('/materias', materiaController.createMateria);
app.get('/materias', materiaController.getMaterias);
app.delete('/materias/:id', materiaController.deleteMateria);

// Rotas para provas
app.post('/provas', provaController.createProva);
app.get('/provas', provaController.getProvas);
app.put('/provas/:id', provaController.updateProva);
app.delete('/provas/:id', provaController.deleteProva);
app.get('/provas/:id', provaController.getProvasAluno);
app.post('/provas/:id/nota', provaController.setProvasAluno);



app.listen(3000, () => console.log('Servidor rodando na porta 3000'));