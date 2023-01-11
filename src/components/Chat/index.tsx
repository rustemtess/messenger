import {
    ChatBlock, ChatBlockMessage, Message, MessageJoinOrLeave
} from './style'
import { useEffect, useLayoutEffect, useRef } from 'react'

interface IMessages {
    messages: object[],
    typing: string
}

interface IMessage {
    name: string,
    message: string,
    left: boolean,
    join?: boolean,
    leave?: boolean
}

const Chat = ({messages, typing}: IMessages) => {

    const messagesColumnRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        console.log(messagesColumnRef.current)
        if(messagesColumnRef.current){
            messagesColumnRef.current.scrollIntoView(false)
        }
    }, [messages])

    return (
        <ChatBlock ref={messagesColumnRef}>
            
            { // @ts-ignore
            messages.map( (msg: IMessage) => {
                
                if(msg.join)
                    return <MessageJoinOrLeave><span>{msg.name}</span> присоединился к чату</MessageJoinOrLeave>
                if(msg.leave)
                    return <MessageJoinOrLeave><span>{msg.name}</span> отключился от чата</MessageJoinOrLeave>

                return (
                    <ChatBlockMessage left={msg.left}>
                        <Message left={msg.left} key={msg.message.length}><span>{msg.name}</span>{msg.message}</Message>
                    </ChatBlockMessage>
                )
            }) }
        </ChatBlock>
    )

}

export default Chat