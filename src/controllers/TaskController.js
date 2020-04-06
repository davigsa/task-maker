const connection = require('../database/connection');
const { parseStringInArray } = require('../utils/functions');

module.exports = {
    async store(req, res) {
        const { title, description, tag } = req.body;

        try {
            await connection('tasks').insert({
                title,
                description,
                tag
            })
            
            return res.status(200).json({ return: "Your task has been created succefully! :)"})
         } catch(err) {
             console.log(err)
            return res.status(400).json({ return: "Sorry, we could not undertand. :("})
         }
    },

    async index(req, res) {
        try {
            const tasks = await connection('tasks').select('*');

            return res.status(200).json(tasks)
        } catch(err) {
            console.log(err)
            return res.status(400).json({ return: "We could list our tasks right now" })
        }
    },

    async remove(req, res){
        const { id } = req.params;

        try{
            await connection('tasks')
                .where('id', id)
                .select('*')
                .first()
                .delete()

            return res.status(200).json({ return: "Your task has been deleted succefully"});
        } catch(err) {
            console.log(err)
            return res.status(400).json({ return: "we can not delete your task, please try again."});
        }
    }
};