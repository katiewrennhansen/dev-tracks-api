

function makeResourcesArray(){
    return [
        {
            id: 11,
            name: "Thinkful",
            type: "Bootcamp",
            status: "In Progress",
            ur: "https://www.thinkful.com/learn/",
            description: "This articles summarizes the importance of Design Systems in a complex application",
            date_completed: null,
            user_id: null
        },
        {
            id: 13,
            name: "Devs @ RTP",
            type: "Meetup",
            status: "Completed",
            url: "https://www.meetup.com",
            description: "This articles summarizes the importance of Design Systems in a complex application",
            date_completed: "2019-06-10T04:00:00.000Z",
            user_id: null
        },
        {
            id: 14,
            name: "New Resource",
            type: "project",
            status: "In Progress",
            url: "projects.com",
            description: "place to find projects",
            date_completed: "2019-11-12T05:00:00.000Z",
            user_id: null
        },
    ]
}

function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        dev_tracks_resources`
    )
}

function seedTables(db, resources){
    return db
        .into('dev_tracks_resources')
        .insert([resources])
}


module.exports = {
    makeResourcesArray,
    cleanTables,
    seedTables
}