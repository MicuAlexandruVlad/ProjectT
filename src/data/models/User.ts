
export default interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    username: string
    followers: number
    following: number
    posts: number
}

export interface UnregisteredUser {
    email: string
    password: string
    firstName: string
    lastName: string
    username: string
}
