const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories); // Başarıyla elde edilen veriyi döndür
    } catch (error) {
        console.error("Hata Detayı:", error); // Hatayı consola yazdıralım
        res.status(400).json({ message: 'Sunucu yatıyor' });
    }
});

module.exports = router;
