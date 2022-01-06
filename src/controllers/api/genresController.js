const db = require('../../database/models');


module.exports={
    list: async (req,res) => {
        try {
            let genres = await db.Genre.findAll();
            let respuesta = {
                meta : {
                    status : 200,
                    total : genres.length,
                    link : 'api/genres'
                },
                data: genres
            }
            return res.status(200).json(respuesta)

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                meta : {
                    status : 500,
                    total : genres.length,
                    link : 'api/genres'
                },
                data: genres
            })
        }
    },
    detail: async (req,res) => {
        try {
            let genre = await db.Genre.findByPk(req.params.id);
            let respuesta = {
                meta : {
                    status : 200,
                    link : 'api/genres/' + req.params.id
                },
                data: genre
            }
            return res.status(200).json(respuesta)

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                meta : {
                    status : 500,
                    total : genres.length,
                    link : 'api/genres'
                },
                data: genres
            })
        }
    }
}