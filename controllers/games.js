const { v4:uuidv4 } = require('uuid')
let games = require('../games')

const getGames = (req, reply) => {
    reply.send(games)
}

const getGame = (req, reply) => {
    const {id} = req.params
    const game = games.find(game => game.id === id)
    reply.send(game)
}

const addGame = (req, reply) => {
    const {title} = req.body
    const {description} = req.body
    const {ageRating} = req.body
    const {images} = req.body

    const game = {
        id: uuidv4(),
        title: title,
        description: description,
        ageRating: ageRating,
        images: images
    }

    games = [...games, game]

    reply.code(201).send({id: game.id})
}

const deleteGame = (req, reply) => {
    const {id} = req.params

    games = games.filter(game => game.id !== id)

    reply.send({message: `Game ${id} has been removed`})
}

const updateGame = (req, reply) => {
    const {id} = req.params
    const {title} = req.body
    const {description} = req.body
    const {ageRating} = req.body
    const {images} = req.body

    games = games.map(game => (game.id === id ? {id, title, description, ageRating, images} : game))

    game = games.find((game) => game.id === id)

    reply.send(game)
}

module.exports = {
    getGames,
    getGame,
    addGame,
    deleteGame,
    updateGame
}