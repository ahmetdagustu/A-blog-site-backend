const knex = require('./knex')

const Category = {
    getAll: () => {
        return knex('categories').whereNull('deleted_at')
    },

    getById: (id) => {
        return knex('categories').where({id}).first()
    },

    create: (category) => {
        return knex ('categories').insert(category).returning('*')
    },
    update: (id, category) => {
        return knex ('categories').where({id}).update(category).returning('*')
    },

    delete: (id) => {
        return knex ('categories').where({id}).update({deleted_at:new Date()})
    }
}
module.exports = Category