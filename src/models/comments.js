const knex = require('./knex'); // Knex bağlantısını alıyoruz

const Comment = {
    getAll: () => {
        return knex('comments').whereNull('deleted_at'); // Yorumların soft delete olmamış olanlarını getir
    },

    getById: (id) => {
        return knex('comments').where({ id }).first(); // Belirtilen ID'ye göre bir yorum getir
    },

    create: (comment) => {
        return knex('comments').insert(comment).returning('*'); // Yeni bir yorum oluştur
    },

    update: (id, comment) => {
        return knex('comments').where({ id }).update(comment).returning('*'); // Yorum güncelle
    },

    delete: (id) => {
        return knex('comments').where({ id }).update({ deleted_at: new Date() }); // Yorum soft delete yap
    }
};

module.exports = Comment;
