const ProjectsService = {
    getAllProjects(knex){
        return knex.select('*').from('user_projects')
    },
    getProjectById(knex, id){
        return knex
            .from('user_projects')
            .select('*')
            .where({ id })
            .first()
    },
    postProject(knex, newAccount){
        return knex
            .insert(newAccount)
            .into('user_projects')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    updateProject(knex, id, updateAccount){
        return knex('user_projects')
            .where({ id })
            .update(updateAccount)
    },
    deleteProject(knex, id){
        return knex('user_projects')
            .where({ id })
            .delete()
    }
}

module.exports = ProjectsService;