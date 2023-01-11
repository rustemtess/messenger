import style from 'styled-components'

interface IChatBlockMessage {
    left: boolean
}

export const ChatBlock = style.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0 20px;
    overflow-y: auto;
`

export const ChatBlockMessage = style.div<IChatBlockMessage>`
    width: 100%;
    display: flex;
    justify-content: ${ props => props.left ? 'flex-start' : 'flex-end' };
`

export const Message = style.p<IChatBlockMessage>`
    background: ${ props => props.left ? 'rgb(39,39,39)' : 'rgba(49,140,231, 1)' };
    text-align: ${ props => props.left ? 'left' : 'right' };
    width: 360px;
    max-width: fit-content;
    padding: 10px 20px;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    word-wrap: break-word;
    span {
        font-size: 13px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
    }
`

export const MessageJoinOrLeave = style.div`
    color: rgba(255,255,255,0.8);
    text-align: center;
    padding: 10px 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    span {
        color: white;
        font-weight: 500;
    }
`