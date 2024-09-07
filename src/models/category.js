const knex = require('./knex')

const Category = {
    // Silinmemiş kategorileri getir
    getAll: () => {
        return knex('categories').whereNull('deleted_at');
    },

    // ID'ye göre kategori getir
    getById: (id) => {
        return knex('categories').where({ id }).first();
    },

    // Yeni kategori oluştur
    create: (category) => {
        return knex('categories').insert(category).returning('*');
    },

    // ID'ye göre kategori güncelle
    update: (id, category) => {
        return knex('categories').where({ id }).update(category).returning('*');
    },

    // Soft delete ile kategori sil
    delete: (id) => {
        return knex('categories').where({ id }).update({ deleted_at: new Date() });
    },

    // Tüm kategorileri getir (silinmiş olanlar dahil)
    getAllWithDeleted: () => {
        return knex('categories'); // Tüm kategoriler
    },

    // Sadece silinmiş kategorileri getir
    getOnlyDeleted: () => {
        return knex('categories').whereNotNull('deleted_at'); // Silinmiş kategoriler
    }
}

module.exports = Category;
