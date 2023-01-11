const crypto = require('crypto')
const server = require('http').createServer()
//const { Server } = require('socket.io')

const PORT = 4000
const io = require('socket.io')(server, {
    origin: '*'
})

server.listen(PORT, () => {
    console.log(`Server ready. Port: ${PORT}`)
})

const users = []

const sendAll = (type, data) => {
    users.map(user => {
        user.socket.emit(type, data)
    })
}

const disconnect = (id) => {
    const userID = users.find(user => user.socket.id === id)
    if(userID !== undefined){
        const existsUser = users.indexOf(userID)
        users.splice(existsUser, 1);
    }
}

const getOnlineUsers = () => {
    const arr = []
    users.map((user) => {
        arr.push(user.name)
    })
    return arr
}

const exitsUserID = (id) => {
    return (users.find(user => user.socket.id === id) === undefined) ? false : true
}

function uuidv4() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  

const getInfo = (id) => {
    return users.find(user => user.socket.id === id)
}

try {
    io.on('connection', (socket) => {
        console.log("Hello", socket.id)

        socket.on("connectChat", (data) => {
            users.push({
                name: data.name.trim(),
                uuid: uuidv4(),
                socket: socket
            })
            socket.emit('response', {
                name: getInfo(socket.id).name,
                uuid: getInfo(socket.id).uuid
            })
            sendAll('responseOnline', {
                auth: true,
                users: getOnlineUsers()    
            })
            sendAll('messages', {
                name: getInfo(socket.id).name,
                join: true
            })
        })

        socket.on('getUsers', (data) => {
            socket.emit('responseOnline', {
                auth: true,
                users: getOnlineUsers()    
            })
        })

        socket.on('send', (data) => {
            console.log(data)
            sendAll('messages', {
                name: getInfo(socket.id).name,
                uuid: getInfo(socket.id).uuid,
                message: data
            })
        })

        socket.on('typing', (data) => {
            sendAll('isTyping', data);
        })

        socket.on('disconnect', () => {
            if(exitsUserID(socket.id))
                sendAll('messages', {
                    name: getInfo(socket.id)?.name,
                    leave: true
                })
                sendAll('responseOnline', {
                    auth: true,
                    users: getOnlineUsers()    
                })
            disconnect(socket.id)
        })

    })
    console.log('Server started...')
}catch(e) {
    console.log(e)
}