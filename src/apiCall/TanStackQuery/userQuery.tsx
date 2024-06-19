import {useQuery} from "@tanstack/react-query";
import {getUserInfo, getUserInfoByID} from "@/apiCall/userInfoRequests.ts";

export const GetUserQuery = (() => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserInfo
    })
})

export const GetUserByID = (id: string) => {
    return useQuery({
        queryKey: ["profileID"],
        queryFn: ()=> getUserInfoByID(id)
    })
}