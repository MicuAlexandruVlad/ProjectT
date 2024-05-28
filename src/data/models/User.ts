
export default interface User {
    id: number
    firstName: string
    lastName: string
    email: string
}

export interface UnregisteredUser {
    email: string
    password: string
    firstName: string
    lastName: string
}
