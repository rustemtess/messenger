import { io, Socket } from 'socket.io-client'

const socket: Socket = io("http://localhost:4000", {
    autoConnect: false,
    transports: ['websocket', 'polling', 'flashsocket']
})

export default socket