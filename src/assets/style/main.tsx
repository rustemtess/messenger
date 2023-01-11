import style from 'styled-components'

interface IMain {
    column: boolean
}

export const Wrapper = style.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: rgb(15,15,15);
`

export const Content = style.div`
    width: 100%;
    max-width: 1700px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 1 auto;
`

export const Main = style.main<IMain>`
    height: 100%;
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    flex-direction: ${ props => props.column ? 'column' : 'row' }
`

export const Logo = style.h1`
    color: white;
    margin-top: 1%;
    font-size: 40px;
    margin-bottom: 0.6em;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
`

export const Input = style.input`
    background: rgb(39,39,39);
    border: none;
    border-radius: 15px;
    text-align: center;
    padding: 15px 30px;
    width: 40%;
    color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    transition: .3s;
    :hover, :focus {
        box-shadow: 0 0 0 5px rgba(39,39,39, 0.4);
    }
`

export const Button = style.button`
    background: rgb(49,140,231);
    border: none;
    border-radius: 15px;
    text-align: center;
    padding: 15px 0;
    width: 43.6%;
    color: white;
    font-size: 16px;
    transition: .3s;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    :hover, :focus {
        box-shadow: 0 0 0 5px rgba(49,140,231, 0.4);
    }
`