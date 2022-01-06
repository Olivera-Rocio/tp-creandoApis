const db = require('../../database/models');
const moment = require('moment');

const throwError = (res, error) => {
    console.log(error)
    return res.status(error.status).json({
        meta: {
            status: error.status || 500
        },
        data: error.message
    })
}

const NaNError = id => {  
    if (isNaN(id)) {
        let error = new Error('ID incorrecto');
        error.status = 422;
        throw error
    }
}

module.exports = {
    list: async (req, res) => {
        try {
            let movies = await db.Movie.findAll();
            let respuesta = {
                meta: {
                    status: 200,
                    total: movies.length,
                    link: 'api/movies'
                },
                data: movies
            }
            return res.status(200).json(respuesta)

        } catch (error) {
            throwError(res,error)
        }
    },
    detail: async (req, res) => {
        try {

            NaNError(req.params.id)

            let movie = await db.Movie.findByPk(req.params.id);

            if (!movie) {
                let error = new Error('ID inexistente');
                error.status = 404;
                throw error
            }

            let respuesta = {
                meta: {
                    status: 200,
                    link: 'api/movies/' + req.params.id
                },
                data: movie
            }
            return res.status(200).json(respuesta)

        } catch (error) {
            throwError(res,error)
        }
    },
    create: async (req, res) => {
        try {
            req.body.release_date ? req.body.release_date = moment(req.body.release_date).format('DD-MMM-YYYY') : null

            let movie = await db.Movie.create({
                ...req.body
            })
            let respuesta = {
                meta: {
                    status: 201,
                    link: 'api/movies/' + movie.id,
                    msg: 'Pelicula creada'
                },
                data: movie
            }
            return res.status(201).json(respuesta)

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                meta: {
                    status: 400
                },
                data: error.errors.map(error => error.message)
            })
        }
    },
    update: async (req, res) => {
        try {

            NaNError(req.params.id)

            let result = await db.Movie.update(
                {
                    ...req.body
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )

            let respuesta;
            if (result[0] === 1) {
                respuesta = {
                    meta: {
                        status: 201,
                        msg: 'Pelicula actualizada'
                    },
                    data: result
                }
                return res.status(201).json(respuesta)

            } else {
                respuesta = {
                    meta: {
                        status: 204,
                        msg: 'La pelicula no se actualizo'
                    }
                }
                return res.status(204).json(respuesta)

            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                meta: {
                    status: 400
                },
                data: error.errors.map(error => error.message)
            })
        }
    },
    destroy: async (req, res) => {
        try {

            NaNError(req.params.id)

            let result = await db.Movie.destroy({
                where: {
                    id: req.params.id
                }
            })

            let respuesta;
            if (result === 1) {
                respuesta = {
                    meta: {
                        status: 201,
                        msg: 'Pelicula eliminada'
                    },
                    data: result
                }
                return res.status(201).json(respuesta)

            } else {
                respuesta = {
                    meta: {
                        status: 204,
                        msg: 'La pelicula no se elimino'
                    }
                }
                return res.status(204).json(respuesta)

            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                meta: {
                    status: 400
                },
                data: error.errors.map(error => error.message)
            })
        }
    }
}