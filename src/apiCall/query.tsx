import { useQuery } from '@tanstack/react-query';
import {getUserInfo} from "@/apiCall/userInfoRequests.ts";


export const GetUserQuery = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserInfo
    })
}

