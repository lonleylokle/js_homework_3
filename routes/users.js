const {getUsers, getUser, addUser, deleteUser, updateUser, getUserGames, addUserGame, addUserPlayTime, deleteUserGame } = require('../controllers/users')

// User schema
const User = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        games: { type: 'array' }
    },
}

// Options for get all Users
const getUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                Users: User,
            },
        },
    },
    handler: getUsers,
}

const getUserOpts = {
    schema: {
        response: {
            200: User,
        },
    },
    handler: getUser,
}

const postUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['username'],
            properties: {
                username: { type: 'string' },
                games: { type: 'array' }
            },
        },
        response: {
            201: User,
        },
    },
    handler: addUser,
}

const deleteUserOpts = {
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
    handler: deleteUser,
}

const updateUserOpts = {
    schema: {
        response: {
            200: User,
        },
    },
    handler: updateUser,
}

const getUserGamesOpts = {
    schema: {
        response: {
            200: {
                type: 'array'
            },
        },
    },
    handler: getUserGames,
}

const postUserGameOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['game'],
            properties: {
                game: { type: 'string' }
            },
        },
        response: {
            201: User,
        },
    },
    handler: addUserGame,
}

const postUserPlayTimeOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['playTime'],
            properties: {
                playTime: { type: 'string' }
            },
        },
        response: {
            201: User,
        },
    },
    handler: addUserPlayTime,
}

const deleteUserGameOpts = {
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
    handler: deleteUserGame,
}

function UserRoutes (fastify, options, done) {
    // Get all Users
    fastify.get('/users', getUsersOpts)
    
    // Get single User
    fastify.get('/users/:id', getUserOpts)

    // Add User
    fastify.post('/users', postUserOpts)

    // Delete User
    fastify.delete('/users/:id', deleteUserOpts)

    // Update User
    fastify.put('/users/:id', updateUserOpts)

    // Get User games
    fastify.get('/users/:id/games', getUserGamesOpts)

    // Add User Game
    fastify.post('/users/:id/games', postUserGameOpts)

    // Add User PlayTime
    fastify.post('/users/:id/games/:gameid', postUserPlayTimeOpts)
    
    // Delete User Game
    fastify.delete('/users/:id/games/:gameid', deleteUserGameOpts)

    done()
}

module.exports = UserRoutes
