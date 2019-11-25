const bcrypt = require('bcryptjs')

const UsersService = {
    getAllUsers(knex){
        return knex.select('*').from('dev_tracks_users')
    },
    getUserById(knex, id){
        return knex('dev_tracks_users')
            .where({ id })
            .first()
    },
    addUser(knex, newUser){
        return knex
            .insert(newUser)
            .into('dev_tracks_users')
            .returning('*')
            .then(([user]) => user)
    },
    deleteUser(knex, id){
        return knex('dev_tracks_users')
            .where({ id })
            .delete()
    },
    updateUser(knex, id, updatedContent){
        return knex('dev_tracks_users')
            .where({ id })
            .update(updatedContent)
    },
    hashPassword(password){
        return bcrypt.hash(password, 12)
    },
    hasUser(knex, user_name){
        return knex('dev_tracks_users')
            .where({ user_name })
            .first()
            .then(user => !!user)
    }

}

module.exports = UsersService;