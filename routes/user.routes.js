const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const mongoose = require('mongoose');

// Ví dụ một route
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả users
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, phone, role, avatar, address, bio} = req.body;
    const userId = new mongoose.Types.ObjectId(req.params.id);

    if(!userId){
      return res.status(404).json({ error: 'UserId not found 1' });
    }

    const updatedData = { 
      name, 
      email, 
      phone, 
      role, 
      avatar, 
      address, 
      bio 
    };
    console.log('Updating user with ID:', updatedData);
    console.log('Updating user with ID:', userId);

    const query = { _id: userId };

    const user = await User.findByIdAndUpdate(query, updatedData, { new: true });
    

    console.log('Updated user:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found 2' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;