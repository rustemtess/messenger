import {
    Title,
    User
} from './style'

interface IUsers {
    users: string[],
    isTyping: string
}

const Index = ({users, isTyping}: IUsers) => {

    const getUsers = () => {
        return users.map((user) => {
            if(isTyping === user) return <User>{user} typing...</User>
            else return <User>{user}</User>
        })
    }

    return (
        <>
            <Title>Online uses</Title>
            { getUsers() }
        </>
    )

}

export default Index