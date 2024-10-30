const express = require('express');
const User = require('./models/User'); 
const routes = express.Router();
const List = require('./models/List');

routes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (user) {
        return res.status(200).json(user);
    }

    return res.status(401).json({ message: 'Credenciais inválidas' });
});

routes.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ name, email, password });
    
    try {
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    }
});

routes.get('/test/users', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});

routes.post('/createList', async (req, res) => {
    const { name, items, userId } = req.body;

    try {
        const newList = new List({ name, items, userId });
        await newList.save();
        return res.status(201).json(newList);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar a lista' });
    }
});

routes.get('/getLists/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const lists = await List.find({ userId });
        return res.status(200).json(lists);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter listas' });
    }
});

routes.delete('/deleteList/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedList = await List.findByIdAndDelete(id);
        if (!deletedList) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
        return res.status(200).json({ message: 'Lista excluída com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao excluir a lista' });
    }
});

module.exports = routes;
