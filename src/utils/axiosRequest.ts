import Api from "./axios";
import { CommentTypes, PostTypeByID, PostTypes, UserInfo, ApiResponse } from "../types/user";
import { useQuery } from "@tanstack/react-query";



export const getUserInfo = async() => {
    return await Api.get<UserInfo>('api/v1/user').then((res)=>{
        return res.data
    })
}




/* POST FUNCTION SECTION */
export const searchPost = async(query: string) => {
    
}

export const getPosts = async() => {
    return await Api.get<PostTypes[]>('api/v1/post').then((res)=>{
        return res.data
    })
}

export const getPostByID = (id:string) => {
    const idParams: number = +id;

    return Api.get(`api/v1/post/${idParams}`).then((res)=>{   
        console.log(res.data);
        
        return res.data[0];
    })
}

export const createPosts = (async(dataForm:PostTypes)=> {
    const formData = new FormData();
    formData.append('image', dataForm.image![0] ?? '');
    formData.append('description', dataForm.description);

    await Api.post('api/v1/post/create', formData 
    ,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
        /* reset() */
        console.log(res.data);
    }).catch((err)=>{
        console.log(err.data);
    })
})

export const updatePost = (id:number, data:PostTypes) => {

}

export const deletePost = async(id:number) => {
    return await Api.delete(`/api/v1/post/delete/${id}`).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}

export const likePost = (id:number) => {
    return Api.post('/api/v1/post/like', {id: id}).then(()=>{
        
    }).catch((err)=>{
        console.log(err.data);
    })
}

/* END OF POST FUNCTION SECTION */

export const createComment = async(data:CommentTypes) => {
    await Api.post('api/v1/comment/create', data).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    })
}

export const getCommentsByID = async() => {
    return await Api.get<CommentTypes>('api/v1/comment').then((res)=>{
        return res.data
    })
}

export const getComments = async() => {
    return await Api.get<CommentTypes>('api/v1/comment').then((res)=>{
        return res.data
    })
}





