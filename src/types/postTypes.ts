import {Comments, Users_liked} from "./user.ts";

export interface PostTypes {
    post_id: number,
    post_author: string,
    post_author_id: number,
    post_description: string,
    total_likes: number,
    total_comments: number,
    image: string,
    date_posted: Date,

    users_liked: Array<Users_liked>
    comments: Array<Comments>
}