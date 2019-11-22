const ResourcesService = {
    getAllResources(knex){
        return knex.select('*').from('dev_tracks_resources')
    },
    getResourceById(knex, id){
        return knex
            .from('dev_tracks_resources')
            .select('*')
            .where({ id })
            .first()
    },
    postResource(knex, newResource){
        return knex
            .insert(newResource)
            .into('dev_tracks_resources')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    updateResource(knex, id, updateResource){
        return knex('dev_tracks_resources')
            .where({ id })
            .update(updateResource)
    },
    deleteResource(knex, id){
        return knex('dev_tracks_resources')
            .where({ id })
            .delete()
    }
}

module.exports = ResourcesService;