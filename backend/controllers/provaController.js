const Prova = require('../models/prova');
const Estudante = require('../models/estudante');
const Materia = require('../models/materia');

exports.createProva = async (req, res) => {
    try {
        const prova = await Prova.create(req.body);
        res.status(201).json(prova);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProvas = async (req, res) => {
    try {
        const provas = await Prova.findAll();
        res.status(200).json(provas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProva = async (req, res) => {
    try {
        const prova = await Prova.findByPk(req.params.id);
        if (!prova) {
            return res.status(404).json({ error: 'Prova não encontrada' });
        }
        await prova.update(req.body);
        res.status(200).json(prova);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProva = async (req, res) => {
    try {
        const prova = await Prova.findByPk(req.params.id);
        if (!prova) {
            return res.status(404).json({ error: 'Prova não encontrada' });
        }
        await prova.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProvasAluno = async (req, res) => {
    try {
        const estudanteId = req.params.id;

        const estudante = await Estudante.findOne({
            where: { id: estudanteId }
        });

        if (!estudante) {
            return res.status(404).json({ error: "Estudante não encontrado." });
        }

        const provas = await Prova.findAll({
            where: { id_estudante: estudanteId }
        });

        const materias = await Materia.findAll();

        const provasMap = provas.reduce((map, prova) => {
            map[prova.id_matéria] = prova.nota; 
            return map;
        }, {});

        const resultado = materias.map(materia => {
            const nota = provasMap.hasOwnProperty(materia.id) ? provasMap[materia.id] : -1;
            return {
                id: materia.id,
                nome: materia.nome,
                nota: nota
            };
        });

        res.status(200).json({
            materias: resultado,
            estudante
        });

    } catch (error) {
        console.error('Erro ao buscar provas do aluno:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.setProvasAluno = async (req, res) => {
    try {
        const estudanteId = req.params.id; 
        const { id_matéria, nota } = req.body;

        if (typeof id_matéria === 'undefined' || typeof nota === 'undefined') {
            return res.status(400).json({ error: 'id_matéria e nota são obrigatórios.' });
        }

        let prova = await Prova.findOne({
            where: { id_estudante: estudanteId, id_matéria: id_matéria }
        });

        if (!prova) {
            prova = await Prova.create({
                id_estudante: estudanteId,
                id_matéria: id_matéria,
                nota: nota
            });
            return res.status(201).json({ message: 'Prova criada com sucesso!', prova });
        }

        prova.nota = nota;
        await prova.save();

        res.status(200).json({
            message: 'Nota atualizada com sucesso!',
            prova
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
