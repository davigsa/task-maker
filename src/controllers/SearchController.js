const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const { tag } = req.body; 

        try{
            const tasks = await connection('tasks')
                .where('tag', tag)
                .select('*')

            return res.status(200).json({ tasks });

        } catch(err) {
            return res.status(400).json({ return: "sorry, we can not understand what you searching for"});
        }
    }
}