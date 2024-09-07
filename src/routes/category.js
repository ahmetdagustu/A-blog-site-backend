const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Tüm kategorileri getirme ve filtreleme işlemleri
router.get('/', async (req, res) => {
    const { showDeleted, onlyDeleted } = req.query;
    try {
        let categories;

        if (showDeleted === 'true') {
            // Silinmiş olanlar dahil tüm kategorileri getir
            categories = await Category.getAllWithDeleted();
        } else if (onlyDeleted === 'true') {
            // Sadece silinmiş olanları getir
            categories = await Category.getOnlyDeleted();
        } else {
            // Varsayılan: Sadece silinmemiş olanları getir
            categories = await Category.getAll();
        }

        res.json(categories);
    } catch (error) {
        console.error("Hata Detayı:", error); 
        res.status(400).json({ message: 'Sunucu yatıyor' });
    }
});

// ID'ye göre kategori getirme
router.get('/:id', async (req, res) => {
    try {
       const category = await Category.getById(req.params.id);
       if (!category) {
        return res.status(404).json({ message:'Kayıt kaybolmuş' })
       }
       res.json(category);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Hata oldu tekrar deneyiniz' });
    }
});

// Yeni kategori oluşturma
router.post("/", async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Hata oldu tekrar deneyiniz' });
    }
});

// Kategori güncelleme
router.patch('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.update(req.params.id, req.body);
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Kayıt kayıplarda' });
        }
        res.json(updatedCategory);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Hata var!' });
    }
});

// Kategori silme (soft delete)
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.delete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Kayıt kayıplarda' });
        }
        res.json(deletedCategory);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Hata var!' });
    }
});

module.exports = router;
