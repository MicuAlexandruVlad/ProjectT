
export default interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    username: string
}

export interface UnregisteredUser {
    email: string
    password: string
    firstName: string
    lastName: string
    username: string
}
