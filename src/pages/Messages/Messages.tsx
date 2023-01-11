import { 
    Main,
    Logo,
    Input,
    Button
} from 'assets/style/main'
import { Socket } from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import {
    SenderBlock,
    Messages
} from './style'
import Chat from 'components/Chat'
import { useNavigate } from 'react-router-dom'
import Online from 'components/Online'

interface ISocket {
    socket: Socket
}

const myName = localStorage.getItem('n');
const myUUID = localStorage.getItem('u');

if(myName === null || myName === '' || myUUID === null || myUUID === '')
    document.location.href = '/'

const Index = ( { socket }: ISocket ) => {

    const navigate = useNavigate()

    interface IData {
        name: string,
        uuid: string,
        message: string,
        left?: boolean
    }

    const [messages, setMessages] = useState<object[]>([])
    const [users, setUsers] = useState<string[]>([])
    const [isTyping, setTyping] = useState('')

    const checkUsers = (name: string, uuid: string) => {
        return (name === myName && uuid === myUUID) ? true : false;
    }

    interface IDataOnline {
        auth: boolean,
        users: string[]
    }

    useEffect(() => {
        socket.emit('getUsers', null)
    })

    useEffect(() => {
        return () => {
            socket.on('messages',(data: IData) => {
                let newData = data;
                newData.left = true
                if(checkUsers(data.name, data.uuid))
                    newData.left = false
                setMessages(myArr => [...myArr, newData])
            })
            socket.on('isTyping', (data: string) => {
                setTyping(data)
                setTimeout(() => {
                    setTyping('')
                }, 2000)
            })
            socket.on('responseOnline', (data: IDataOnline) => {
                setUsers(data.users)
            })
            socket.on('disconnect', () => {
                document.location.href = '/'
            })
        }
    }, [socket])

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        socket.emit('send', message)
        setMessage('')
        const a = document.getElementById("message") as HTMLInputElement
        a.value = ""
        setTyping('')
    }

    const writeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const quit = () => {
        localStorage.removeItem('n')
        localStorage.removeItem('u')
        navigate('/')
    }

    const handleTyping = () => {
        socket.emit('typing', localStorage.getItem('n'))
    }

    return (
        <>
            <Main column>
                <Online users={users} isTyping={isTyping} />
            </Main>
            <Main column>
                <Logo>Messenger</Logo>
                <Messages>
                    <Chat messages={messages} typing={isTyping} />            
                </Messages>
                <SenderBlock>
                    <Input id='message' onKeyDown={handleTyping} onKeyPress={(e) => {
                        if(e.code === 'Enter') sendMessage()
                    }} onChange={writeMessage} type='text' placeholder='Сообщение' />
                    <Button onClick={() => sendMessage()}>Отправить</Button>
                </SenderBlock>
            </Main>
            
        </>
    )

}

export default Index