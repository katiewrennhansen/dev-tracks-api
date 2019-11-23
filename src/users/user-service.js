const UsersService = {
    getUserName(knex, user_name){
        return knex('dev_tracks_users')
            .where({ user_name })
            .first()
    },
    addUser(knex, newUser){
        return knex
            .insert(newUser)
            .into('dev_tracks_users')
            .returning('*')
            .then(([user]) => user)
    }
}

module.exports = UsersService;