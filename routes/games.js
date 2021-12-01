const {getGames, getGame, addGame, deleteGame, updateGame } = require('../controllers/games')

// Game schema
const Game = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        ageRating: { type: 'string' },
        images: { type: 'array' }
    },
}

// Options for get all Games
const getGamesOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                Games: Game,
            },
        },
    },
    handler: getGames,
}

const getGameOpts = {
    schema: {
        response: {
            200: Game,
        },
    },
    handler: getGame,
}

const postGameOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'description', 'ageRating', 'images'],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                ageRating: { type: 'string' },
                images: { type: 'array' }
            },
        },
        response: {
            201: Game,
        },
    },
    handler: addGame,
}

const deleteGameOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            },
        },
    },
    handler: deleteGame,
}

const updateGameOpts = {
    schema: {
        response: {
            200: Game,
        },
    },
    handler: updateGame,
}

function GameRoutes (fastify, options, done) {
    // Get all Games
    fastify.get('/games', getGamesOpts)
    
    // Get single Game
    fastify.get('/games/:id', getGameOpts)

    // Add Game
    fastify.post('/games', postGameOpts)

    // Delete Game
    fastify.delete('/games/:id', deleteGameOpts)

    // Update Game
    fastify.put('/games/:id', updateGameOpts)

    done()
}

module.exports = GameRoutes
