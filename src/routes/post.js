const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
    const { status, category, showDeleted } = req.query;
    try {
        let posts = Post.getAll(); // Tüm gönderileri çek

        if (status === 'published') {
            posts = posts.whereNotNull('published_at');
        } else if (status === 'draft') {
            posts = posts.whereNull('published_at');
        }

        if (category) {
            posts = posts.where('category_id', category);
        }

        if (showDeleted === 'true') {
            // Silinmiş olanlar dahil tüm gönderileri getir
        } else if (showDeleted === 'onlyDeleted') {
            posts = posts.whereNotNull('deleted_at');
        } else {
            posts = posts.whereNull('deleted_at');
        }

        const result = await posts; // Sonuçları bekleyip döndür
        res.json(result);
    } catch (error) {
        console.error("Hata Detayı:", error); // Hatayı konsola yazdır
        res.status(400).json({ message: 'Hata oldu, tekrar deneyin.' });
    }
});

module.exports = router;
