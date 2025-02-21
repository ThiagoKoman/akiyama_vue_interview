const Estudante = require('../models/estudante');
const Prova = require('../models/prova');

exports.createEstudante = async (req, res) => {
    try {
        const estudante = await Estudante.create(req.body);
        res.status(201).json(estudante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getEstudantes = async (req, res) => {
    try {
        const estudantes = await Estudante.findAll();

        const estudantesComMedia = await Promise.all(estudantes.map(async (estudante) => {
            const provas = await Prova.findAll({
                where: { id_estudante: estudante.id }
            });
            const totalNotas = provas.reduce((soma, prova) => soma + (Number(prova.nota) || 0), 0);
            const media = provas.length > 0 ? (totalNotas / provas.length).toFixed(2) : null;

            return {
                id: estudante.id,
                nome: estudante.nome,
                email: estudante.email,
                media: media 
            };
        }));

        res.status(200).json(estudantesComMedia);
    } catch (error) {
        console.error('Erro ao buscar estudantes:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateEstudante = async (req, res) => {
    try {
        const estudante = await Estudante.findByPk(req.params.id);
        if (!estudante) {
            return res.status(404).json({ error: 'Estudante não encontrado' });
        }
        await estudante.update(req.body);
        res.status(200).json(estudante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEstudante = async (req, res) => {
    try {
        const estudante = await Estudante.findByPk(req.params.id);
        if (!estudante) {
            return res.status(404).json({ error: 'Estudante não encontrado' });
        }
        await estudante.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
