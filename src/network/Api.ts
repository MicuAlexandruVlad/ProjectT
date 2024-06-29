import axios from "axios"
import constants from "../utils/Constants"
import User, { UnregisteredUser } from "../data/models/User"
import { Post, UnuploadedPost } from "../data/models/Post"
import UserPostsResponse from "../data/models/api/UserPostsResponse"
import APIObjectParser from "../utils/APIObjectParser"

const TAG = 'Api:'
export default class Api {
    private static DEV_URL = 'http://192.168.0.200:3000'
    private static BASE_URL = this.DEV_URL
    private static REGISTER = `${this.BASE_URL}/user/register`
    private static LOGIN = `${this.BASE_URL}/user/login`
    private static COMPLETE_PROFILE = `${this.BASE_URL}/user/complete-profile`
    private static UPDATE_PROFILE = `${this.BASE_URL}/user/update-profile`
    private static CREATE_POST = `${this.BASE_URL}/post/create`
    private static GET_USER_POSTS = `${this.BASE_URL}/post/get-user-posts`

    static async register(user: UnregisteredUser): Promise<User> {
        return new Promise((resolve, reject) => {
            axios.post(this.REGISTER, user, {
                timeout: constants.API_TIMEOUT
            }).then(response => {
                const data = response.data
                const user: User = {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    username: data.username,
                    followers: 0,
                    following: 0,
                    posts: 0
                }

                console.log(TAG, 'register: response ->', response)
                
                resolve(user)
            }).catch(error => {
                console.log(TAG, 'register: error ->', error)
                
                reject(error)
            })
        })
    }

    static async login(email: string, password: string): Promise<{ token: string, user: User }> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.LOGIN}?email=${email}&password=${password}`, {
                timeout: constants.API_TIMEOUT
            }).then(response => {
                const data = response.data
                const user: User = {
                    id: data.user.id,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    username: data.user.username,
                    followers: data.user.followers,
                    following: data.user.following,
                    posts: data.user.posts
                }
                
                resolve({
                    token: data.token,
                    user
                })
            }).catch(error => {
                console.log(TAG, 'login: error ->', error)
                
                reject(error)
            })
        })
    }

    static async updateUser (user: User, jwt: string) {
        return new Promise<void>((resolve, reject) => {
            axios.post(this.UPDATE_PROFILE, user, {
                headers: { Authorization: `Bearer ${jwt}` },
                timeout: constants.API_TIMEOUT
            }).then(response => {
                console.log(TAG, 'updateUser: response ->', response)
                
                resolve()
            }).catch(error => {
                console.log(TAG, 'updateUser: error ->', error)
                
                reject(error)
            })
        })
    }

    static async createPost(unuploadedPost: UnuploadedPost, jwt: string) {
        return new Promise<Post>((resolve, reject) => {
            axios.post(this.CREATE_POST, unuploadedPost, {
                headers: { Authorization: `Bearer ${jwt}` },
                timeout: constants.API_TIMEOUT
            }).then(response => {
                console.log(TAG, 'createPost: response ->', response)
                
                resolve(response.data)
            }).catch(error => {
                console.log(TAG, 'createPost: error ->', error)
                
                reject(error)
            })
        })
    }

    static async getUserPosts(userId: number, jwt: string) {
        return new Promise<Post[]>((resolve, reject) => {
            axios.get<UserPostsResponse>(`${this.GET_USER_POSTS}?userId=${userId}`, {
                timeout: constants.API_TIMEOUT,
                headers: { Authorization: `Bearer ${jwt}` }
            }).then(response => {
                console.log(TAG, 'getUserPosts: response ->', response)

                resolve(APIObjectParser.userPostResponseToPost(response.data))
            }).catch(error => {
                console.log(TAG, 'getUserPosts: error ->', error)
                
                reject(error)
            })
        })
    }
}
