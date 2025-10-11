const express = require('express');

class BaseController {
    constructor(model, options = {}, resourceName) {
        this.model = model;
        this.router = express.Router();
        this.resource = resourceName;
    }

    // Hàm dùng để đăng ký route (với middleware)
    route(method, path, middlewares = [], handler) {
        // middlewares chạy trước, handler chạy sau
        const chain = Array.isArray(middlewares) ? [...middlewares, handler] : [middlewares, handler];
        this.router[method](path, ...chain);
    }

    // CRUD mặc định
    list(middlewares = []) {
        this.route('get', `/${this.resource}`, middlewares, this.getAll);
    }

    create(middlewares = []) {
        this.route('post', `/${this.resource}`, middlewares, this.createItem);
    }

    getOne(middlewares = []) {
        this.route('get', `/${this.resource}/:id`, middlewares, this.getById);
    }

    update(middlewares = []) {
        this.route('put', `/${this.resource}/:id`, middlewares, this.updateItem);
    }

    delete(middlewares = []) {
        this.route('delete', `/${this.resource}/:id`, middlewares, this.deleteItem);
    }

    // Các hàm xử lý logic
    getAll = async (req, res) => {
        try {
            const items = await this.model.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    getById = async (req, res) => {
        try {
            const item = await this.model.findById(req.params.id);
            if (!item) return res.status(404).json({ error: 'Not found' });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    createItem = async (req, res) => {
        try {
            const newItem = new this.model(req.body);
            await newItem.save();
            res.status(201).json(newItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    updateItem = async (req, res) => {
        try {
            const item = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!item) return res.status(404).json({ error: 'Not found' });
            res.json(item);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    deleteItem = async (req, res) => {
        try {
            const item = await this.model.findByIdAndDelete(req.params.id);
            if (!item) return res.status(404).json({ error: 'Not found' });
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    // middlewares chung 

    // + Kiểm tra login dùng chung
    checkLogin = async(req, res, next) => {
        console.log('Kiểm tra login ở đây');
        next()
    }

    // + Kiểm tra role dùng chung
    checkRole = async(req, res, next) => {
        console.log("Check role");
        next()
    }

}

module.exports = BaseController;
