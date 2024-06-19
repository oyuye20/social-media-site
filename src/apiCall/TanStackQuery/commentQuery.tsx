import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createComment, getCommentsByID} from "@/apiCall/commentRequests.ts";

const useCommentQuery  = () => {
    const queryClient = useQueryClient();

    const CreateCommentMutation = useMutation({
        mutationFn: createComment,
        onSuccess: ()=> queryClient.invalidateQueries({queryKey: ["postId"]}),
    })

    return {
        CreateCommentMutation,
    }
}

const FetchCommentByPost = (id: string) => {
    return useQuery({
        queryKey: ["commentByID", id],
        queryFn: ()=> getCommentsByID(id),
    })
}

export { useCommentQuery, FetchCommentByPost };