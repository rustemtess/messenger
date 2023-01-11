import { 
    Main, 
    Logo,
    Input,
    Button
} from 'assets/style/main'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'

interface ISocket {
    socket: Socket
}

const Index = ({socket}: ISocket) => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [auth, setAuth] = useState(false)

    interface IData {
        uuid: string,
        name: string
    }

    useEffect(() => {
        socket.on("response", (data: IData) => {
            console.log(data)
            localStorage.setItem('u', data.uuid)
            localStorage.setItem('n', data.name)
            setAuth(true)
        })
    }, [socket])

    if(auth){
        console.log(auth)
        navigate('/im')
    }

    const next = () => {
        socket.emit("connectChat", {
            name: name
        })
    }

    return (
        <>
            <Main column>
                <Logo style={
                    {
                        'marginTop': '12%'
                    }
                }>Messenger</Logo>
                <Input onChange={(e) => setName(e.target.value)} type='text' placeholder='Введите имя' />
                <Button onClick={ () => next() }>Подключиться</Button>
            </Main>
        </>
    )

}

export default Index