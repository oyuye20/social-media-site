import Api from "@/utils/axios.ts";
import {PostTypes} from "@/types/user.ts";

export const getPosts = async() => {
    return await Api.get<PostTypes[]>('api/v1/post').then((res)=>{
        return res.data
    })
}

export const getPostByID = (id:string) => {
    const idParams: number = +id;

    return Api.get<PostTypes[]>(`api/v1/post/${idParams}`).then((res)=>{
        return res.data[0];
    })
}

export const  getPostByUser = (id: string) => {
    const idParams: number = +id;

    return Api.get<PostTypes[]>(`api/v1/post/user/${idParams}`).then((res)=>{
        return res.data;
    })
}


export const likePost = (id:number) => {
    return Api.post('/api/v1/post/like', {id: id}).then(()=>{

    }).catch((err)=>{
        console.log(err.data);
    })
}

export const createPosts = (async(dataForm:PostTypes)=> {
    const formData = new FormData();
    formData.append('image', dataForm.image![0] ?? '');
    formData.append('post_description', dataForm.post_description);

    await Api.post('api/v1/post/create', formData
        ,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
        /* reset() */
        console.log(res.data);
    }).catch((err)=>{
        console.log(err);
    })
})

// export const updatePost = (id:number, data:PostTypes) => {
//
// }

export const deletePost = async(id:string) => {
    return await Api.delete(`/api/v1/post/delete/${id}`).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
}

