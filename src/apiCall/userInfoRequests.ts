import Api from "@/utils/axios.ts";
import {UserInfo} from "@/types/user.ts";

export const getUserInfo = async() => {
    return await Api.get<UserInfo>('api/v1/user').then((res)=>{
        return res.data
    })
}

export const getUserInfoByID = async(id: string) => {
    return await Api.get<UserInfo>(`api/v1/profile/${id}`).then((res)=>{
        return res.data
    })
}
