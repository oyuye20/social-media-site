import {Comments, CommentTypes} from "@/types/user.ts";
import Api from "@/utils/axios.ts";

export const createComment = async(data:CommentTypes) => {
    await Api.post('api/v1/comment/create', data).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
}

export const getCommentsByID = async(postID: string) => {
    return await Api.get<Comments[]>(`api/v1/comment/${postID}`).then((res)=>{
        // console.log(res.data);
        return res.data
    })
}

export const getComments = async() => {
    return await Api.get<CommentTypes>('api/v1/comment').then((res)=>{
        console.log(res.data);
        return res.data
    })
}
