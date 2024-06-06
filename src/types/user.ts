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


export interface PostTypes {
    PostID: number,
    name: string,
    description: string,
    image?: string,
    total_likes: number,
    total_comment: number,
    created_at: Date,
    LikePostUserID: number,
    LikePostID: number,
    UserID: number,
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
