export interface UserInfo {
    id: number,
    email: string,
    name: string

    user_info: {
        id: number,
        birthday: string,
        contact_number:string,
        followers: number,
        image: string,
    }
}

export interface LoginValues {
    email: string,
    password: string,
}

export interface PostTypes {
    id: number,
    user_id: number,
    description: string,
    image: string,
    total_likes: number,
    total_comment: number,
    created_at: string,
}

export interface CommentTypes{
    id: number,
    user_id: number,
    post_id: number,
    comment: string,
    create_at: string,
}
