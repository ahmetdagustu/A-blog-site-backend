const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// Yorum ekleme
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Yorum eklenemedi.' });
    }
});

// Yorumları listeleme
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.getAll();
        res.json(comments);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Yorumlar listelenemedi.' });
    }
});

// Yorum güncelleme
router.patch('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.params.id, req.body);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Yorum bulunamadı' });
        }
        res.json(updatedComment);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Yorum güncellenemedi.' });
    }
});

// Yorum silme
router.delete('/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.delete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Yorum bulunamadı' });
        }
        res.json(deletedComment);
    } catch (error) {
        console.error("Hata Detayı:", error);
        res.status(400).json({ message: 'Yorum silinemedi.' });
    }
});

module.exports = router;
