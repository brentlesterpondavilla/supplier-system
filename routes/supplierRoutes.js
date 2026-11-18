const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// 1. GET: Read all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers', { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 2. POST: Create supplier
router.post('/add', async (req, res) => {
  try {
    const { name, contactPerson, phone, email, address } = req.body;
    const newSupplier = new Supplier({ name, contactPerson, phone, email, address });
    await newSupplier.save();
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sa pag-save ng supplier');
  }
});

// 3. GET: Show Edit Form
router.get('/edit/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send('Supplier not found');
    res.render('edit-supplier', { supplier });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 4. PUT: Update supplier
router.put('/edit/:id', async (req, res) => {
  try {
    const { name, contactPerson, phone, email, address } = req.body;
    await Supplier.findByIdAndUpdate(req.params.id, { name, contactPerson, phone, email, address });
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sa pag-update ng supplier');
  }
});

// 5. DELETE: Delete supplier
router.delete('/delete/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sa pagbura ng supplier');
  }
});

module.exports = router;