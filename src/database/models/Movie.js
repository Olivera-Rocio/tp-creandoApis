module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false,
            validate : {
                notNull :{
                    msg : 'El title no puede ser null'
                },
                notEmpty :{
                    msg : 'El titulo es requerido'
                }
            }
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false,
            validate : {
                notNull :{
                    msg : 'El rating no puede ser null'
                },
                notEmpty :{
                    msg : 'El rating es requerido'
                },
                isDecimal :{
                    msg : 'El rating debe ser un valor entre 0 y 99,9'
                },
                max : {
                    args : 99.9,
                    msg : 'Maximo permitido : 99,9'
                }
            }
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false,
            validate : {
                notNull :{
                    msg : 'El awards no puede ser null'
                },
                notEmpty :{
                    msg : 'Los premios son requeridos'
                }
            }
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false,
            validate : {
                notNull :{
                    msg : 'El release_date no puede ser null'
                },
                notEmpty :{
                    msg : 'La fecha de estreno es requerida'
                },
                isDate :{
                    msg : 'La fecha debe tener un formato valido'
                }
            }
        },
        length: dataTypes.BIGINT(10),
        genre_id: dataTypes.BIGINT(10)
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: 'movies'
    }
    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = function (models) {
        Movie.belongsTo(models.Genre, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "genre",
            foreignKey: "genre_id"
        })

        Movie.belongsToMany(models.Actor, { // models.Actor -> Actors es el valor de alias en actor.js
            as: "actors",
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }

    return Movie
};