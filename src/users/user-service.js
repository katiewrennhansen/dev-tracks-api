const UsersService = {
    getUserName(knex, user_name){
        return knex('dev_tracks_users')
            .where({ user_name })
            .first()
    },
}

module.exports = UsersService;