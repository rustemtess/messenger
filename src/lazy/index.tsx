import { Socket } from 'socket.io-client'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// List pages
const Home = lazy(() => import('pages/Home'))
const Messages = lazy(() => import('pages/Messages'))

interface ISocket {
    socket: Socket
}

const Index = ({socket}: ISocket) => {

    return (
        <Suspense fallback='Page load'>
            <Router>
                <Routes>
                    <Route path='/' element={ <Home socket={socket} /> } />
                    <Route path='/im' element={ <Messages socket={socket} /> } />
                </Routes>
            </Router>
        </Suspense>
    )

}

export default Index