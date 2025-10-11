const BaseController = require('./base.controller');

class UserController extends BaseController {
  constructor(model, options = {}) {
    super(model, options, 'users'); // 👈 chỉ cần truyền resource "users"

    // Gọi các route cần thiết
    this.list([this.checkLogin]); // GET /users
    this.create([this.checkLogin, this.validateCreate]); // POST /users
    this.getOne([this.checkLogin]); // GET /users/:id (middleware mặc định)
    this.update([this.checkLogin]); // PUT /users/:id
    this.delete([this.checkLogin]); // DELETE /users/:id

    // Route tùy chỉnh
    this.route('get', '/users/me', [this.checkLogin], this.getProfile);
  }

  // middleware riêng cho tạo user
  validateCreate(req, res, next) {
    if (!req.body.email) return res.status(400).json({ error: 'Email required' });
    next();
  }

  // Route tùy chỉnh
  getProfile(req, res) {
    res.json({ id: '123', name: 'Demo User' });
  }
}

module.exports = UserController;
