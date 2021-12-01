const { v4:uuidv4 } = require('uuid')
let users = require('../users')
let gamesdb = require('../games')

const getUsers = (req, reply) => {
    reply.send(users)
}

const getUser = (req, reply) => {
    const {id} = req.params
    const user = users.find(user => user.id === id)
    reply.send(user)
}

const addUser = (req, reply) => {
    const {username} = req.body
    const {games} = req.body

    const user = {
        id: uuidv4(),
        username: username,
        games: games
    }

    users = [...users, user]

    reply.code(201).send({id: user.id})
}

const deleteUser = (req, reply) => {
    const {id} = req.params

    users = users.filter(user => user.id !== id)

    reply.send({message: `User ${id} has been removed`})
}

const updateUser = (req, reply) => {
    const {id} = req.params
    const {username} = req.body
    const {games} = req.body

    users = users.map(user => (user.id === id ? {id, username, games} : user))

    user = users.find((user) => user.id === id)

    reply.code(200).send(user)
}

const getUserGames = (req, reply) => {
    const {id} = req.params
    
    userGames = users.find(item => item.id === id).games
    userGamesRez = userGames.filter(item => item.hide !== true)
    
    reply.code(201).send(userGamesRez)
}

const addUserGame = (req, reply) => {
    const {id} = req.params
    const {game} = req.body

    userGames = users.find(item => item.id === id).games
    userGame = userGames.find(item => item.game === game)
    if(!userGame) {
        userGames.push({game: game})
        reply.code(200).send({id: id})
    }
    else {
        if(userGame.hide === true){
            userGame.hide = false
            reply.code(200).send({id: id})
        }
        else {
            reply.code(200).send({message: `User alredy has ${game}`})
        }
    }
}

const addUserPlayTime = (req, reply) => {
    const {id} = req.params
    const {gameid} = req.params
    const {playTime} = req.body

    userGames = users.find(item => item.id === id).games
    gametitle = gamesdb.find(item => item.id === gameid).title
    userGame = userGames.find(item => item.game === gametitle)

    if(userGame) {
        userGame.playTime = +userGame.playTime + +playTime
        reply.code(200).send({
            game: {
                id: gameid,
                playTime: userGame.playTime
            }
        })
    }
    else {
        reply.code(200).send({message: `User ${id} has not ${gametitle}`})
    }

}

const deleteUserGame = (req, reply) => {
    const {id} = req.params
    const {gameid} = req.params

    userGames = users.find(item => item.id === id).games
    gametitle = gamesdb.find(item => item.id === gameid).title
    userGame = userGames.find(item => item.game === gametitle)
    userGame.hide = true

    reply.code(201).send({id: gameid})
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getUserGames,
    addUserGame,
    addUserPlayTime,
    deleteUserGame
}