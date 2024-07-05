import { UserPreview } from "../User"

export default interface SearchResponse {
    message: string
    users: UserPreview[]
}
