import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPostByID, getPostByUser, getPosts, likePost} from "@/apiCall/postRequests..ts";

const PostMutation = () => {
    const queryClient = useQueryClient();

    const likePostMutation = useMutation({
        mutationFn: likePost,
        onSettled: ()=> queryClient.invalidateQueries({queryKey: ["post"]})
    })

    return {
        likePostMutation
    }
}



const FetchPostByID = (id:string) => {
    return useQuery({
        queryKey: ["postId", id],
        queryFn: ()=> getPostByID(id!),
    })
}

const FetchPostsQuery = () => {
    return useQuery({
        queryKey: ["post"],
        queryFn: getPosts
    })
}

const FetchPostByUser = (id:string) => {
    return useQuery({
        queryKey: ["userPosts", id],
        queryFn: ()=> getPostByUser(id!),
    })
}

export { FetchPostByID,FetchPostsQuery,FetchPostByUser,PostMutation }


