export interface UserInfo {
    id: number,
    email: string,
    name: string

    user_info: {
        id: number,
        birthday: string,
        contact_number:string,
        followers: number,
        image?: string,
    }
}

export type PostParams  = {
    id: string 
}

export interface LoginValues {
    email: string,
    password: string,
}

export interface Users_liked {
    like_id: number,
    user_liked_id: number,
    users_liked: string
}


export interface Comments {
    comment_id: number,
    user_id_comment: number,
    commenter: string,
    comment: string,
    comment_date_posted: Date
}

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


export interface ApiResponse {
    posts: PostTypes[];
}

export interface PostTypeByID {
    name: string
}

export interface CommentTypes{
    id: number,
    user_id: number,
    post_id: number,
    comment: string,
    created_at: Date,
}
