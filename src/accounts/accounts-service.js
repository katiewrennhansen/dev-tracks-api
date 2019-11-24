const AccountsService = {
    getAllAccounts(knex){
        return knex.select('*').from('user_accounts')
    },
    getAccountById(knex, id){
        return knex
            .from('user_accounts')
            .select('*')
            .where({ id })
            .first()
    },
    postAccount(knex, newAccount){
        return knex
            .insert(newAccount)
            .into('user_accounts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    updateAccount(knex, id, updateAccount){
        return knex('user_accounts')
            .where({ id })
            .update(updateAccount)
    },
    deleteAccount(knex, id){
        return knex('user_accounts')
            .where({ id })
            .delete()
    }
}

module.exports = AccountsService;