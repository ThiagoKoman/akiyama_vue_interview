const Materia = require('../models/materia');

exports.createMateria = async (req, res) => {
    try {
        const materia = await Materia.create(req.body);
        res.status(201).json(materia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll();
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMateria = async (req, res) => {
    try {
        const materia = await Materia.findByPk(req.params.id);
        if (!materia) {
            return res.status(404).json({ error: 'Materia não encontrada' });
        }
        await materia.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

