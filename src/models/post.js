const knex = require('./knex'); // knex dosyasının doğru bağlandığından emin olun

const Post = {
    getAll: () => {
        return knex('posts').whereNull('deleted_at'); // Silinmemiş tüm gönderileri getir
    },

    getById: (id) => {
        return knex('posts').where({id}).first(); // Belirtilen ID'ye sahip gönderiyi getir
    },

    create: (post) => {
        return knex('posts').insert(post).returning('*'); // Yeni bir gönderi oluştur
    },

    update: (id, post) => {
        return knex('posts').where({id}).update(post).returning('*'); // Gönderiyi güncelle
    },

    delete: (id) => {
        return knex('posts').where({id}).update({deleted_at: new Date()}); // Gönderiyi soft delete yap
    }
}

module.exports = Post;
