import style from 'styled-components'

export const SenderBlock = style.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2em;
    margin-top: 1.5em;
    gap: 0.5em;
`

export const Messages = style.div`
    height: 100%;
    width: 100%;
    max-width: 800px;
    max-height: 100%;
    overflow-y: auto;
`