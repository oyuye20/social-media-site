import { motion } from "framer-motion"
import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import logo2 from '../assets/images/0048_Movie.png'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { isModalPostOpen } from "../store/modalToggle";
import { RootState } from '../store/store';
import { createComment, getPostByID, deletePost, 
getUserInfo, likePost } from "../utils/axiosRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { CommentTypes, PostParams } from "../types/user";
import { useNavigate, useParams } from "react-router-dom";

const ModalPost = (() => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const form = useForm<CommentTypes>();

    const { register, handleSubmit, reset} = form;
    const { id } = useParams<PostParams>();
        
    /* FOR OPENING AND CLOSING MODAL OF POSTS */
    /* const PostID = useSelector((state:RootState) => state.postModal.postID); */


    /* FETCH POSTS BY ID */
    const fetchPostID = useQuery({
        queryKey: ["postId", id],
        queryFn: ()=> getPostByID(id!),
    })

    /* FETCH USER INFO AND COMPARE IF A USER ALREADY LIKED A POST */
    const getUser = useQuery({
        queryKey: ["users"],
        queryFn: getUserInfo
    })

    /* WHEN USER LIKES A COMMENT AND UPDATE LIKE COUNT 
    AND STATUS OF LIKE BUTTON */
    const likePostMutation = useMutation({
        mutationFn: likePost,
        onSettled: ()=> queryClient.invalidateQueries({queryKey: ["postId"]})
    })

    /* PASS THE ARGUMENT OF POST ID TO 
    PERFORM POST OPERATION */
    const likePosts = ((id:number) => {
        likePostMutation.mutate(id);
    })

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ["posts"]}),
            navigate('/');
        }
    })

    /* CREATE A NEW COMMENT */
    const createCommentMutation = useMutation({
        mutationFn: createComment,
        onSuccess: ()=>{reset();}
    })

    const onDeletePost = ((id:number)=> {
        deletePostMutation.mutate(id);
    })
    
    const onSubmit = ((data: CommentTypes) => {
        createCommentMutation.mutate(data);
    })


    
    

    const [dropdown, setDropdown] = useState(false);
    const [loading, setLoading] = useState(false)
    const [pageCount, setPage] = useState(5)
    const items = [];


    /* LOAD MORE COMMENTS */
    const loadMore  = (() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setPage(pageCount + 5)        
        }, 2000); 
    })

    for (let i = 0; i < pageCount; i++) {
        items.push(<div  key={i}>Item {i + 1}</div>);
    }

    {/* bg-[rgba(10,10,10,0.5)]  */}

    /* initial={{opacity: 0, scale: 0,}} animate={{opacity: 1, scale:1}} 
    transition={{ ease: "easeOut"}}  exit={{ opacity: 0, scale:0 }} */ 


    /* WAIT FETCHING OF DATA BEFORE OPENING A MODAL */
    if(fetchPostID.isFetched){
        return(
            <>
                <div className="w-full min-h-dvh absolute z-20 grid">
                    <div className={`grid h-full rounded-xl ${fetchPostID.data.image ? `grid-cols-3` : `grid-cols-1`}`}>

                        {/* IMAGE SECTION AND HIDE THIS IF NO IMAGE ATTACHED */}
                        {fetchPostID.data?.image != null && (
                            <div className="col-span-2 flex items-center p-5 justify-center bg-[#1C273D]">
                                <div className="border-4 h-full object-fill ">
                                    <img src={"http://localhost:8000/image/" + fetchPostID.data?.image} 
                                    alt="post" className='object-center'/>
                                </div>           
                            </div>
                        )}
        
                        {/* CAPTION, COMMENT AND TOTAL OF LIKES SECTION */}
                        <div className="flex flex-col gap-3 p-3 relative  bg-[#1C273D]">
                            {/* USER INFO SECTION */}
                            <div className="NAME flex p-3 gap-3">        
                                <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                                    <img src={logo} alt="" className='object-cover w-full h-full'/>
                                </div>
                                
                                <div className="flex flex-col px-2">
                                    <span className='text-white font-bold text-xl hover:underline 
                                    underline-offset-2 cursor-pointer'>{fetchPostID.data?.name}</span>
                                    <span className='text-white text-md font-bold'>10 hours ago</span>
                                </div>
        
                                <div className="flex flex-col">
                                    <button type='button' className='p-1 text-white font-bold
                                    bg-[#5e81c6] rounded-lg w-[100px] hover:bg-[#c3d7ff] 
                                    hover:text-black'>Follow</button>
                                </div>
        
                                <div className="absolute right-0 me-3 flex gap-5">
        
                                    <div className="relative">
                                        {getUser.data?.id === fetchPostID.data.UserID && (
                                            <button className="icon-[solar--menu-dots-bold] text-3xl text-white 
                                            hover:text-red-500 cursor-pointer" onClick={()=> setDropdown(!dropdown)}></button>
                                        )}
                                        
    
                                        {dropdown && (
                                            <div className="bg-white w-[250px] absolute right-0 flex flex-col p-3
                                            rounded-lg gap-4">
                                                <div className="flex items-center w-full cursor-pointer p-2 hover:bg-blue-300 rounded-lg">
                                                    <span className="icon-[mdi--pencil] text-3xl text-[#3D3D3D]"></span>
                                                    <button type="button" className='font-bold text-[#3D3D3D]'>Edit Post</button>
                                                </div>
                                                
                                                

                                                <button onClick={()=> onDeletePost(fetchPostID.data.PostID)} 
                                                className="flex items-center w-full cursor-pointer hover:bg-blue-300 p-2 rounded-lg">
                                                    <span className="icon-[mdi--trash] text-3xl text-[#3D3D3D]"></span>
                                                    <span className='font-bold text-[#3D3D3D]'>Delete Post</span>
                                                </button>
                                            </div>
                                        )}
                    
                                    </div>
        
                                    <button type="button" className="icon-[bitcoin-icons--cross-filled] text-3xl 
                                    text-white hover:text-red-500" /* onClick={()=> dispatch(isModalPostOpen(PostID))} */></button>     
                                </div>
                                
                            </div>  
        
                            {/* CAPTION SECTION */}
                            <div className="CAPTION flex p-3 gap-3">
                                <span className="span font-medium text-white">
                                    {fetchPostID.data?.description}
                                </span>
                            </div>

                         
        
                            {/* TOTAL LIKE AND COMMENT SECTION */}
                            <div className="flex gap-3 p-3">
                                <div className="flex items-center gap-1">
                                    <button type="button" onClick={()=> likePosts(fetchPostID.data.PostID)}  
                                    className="text-white icon-[ph--heart-fill] text-3xl 
                                    hover:text-red-500 hover:cursor-pointer"></button>

                                    <span className='font-bold text-white'>
                                    {fetchPostID.data?.total_likes}</span>                     
                                </div>
        
                                <div className="flex items-center">
                                    <span className="icon-[ic--round-message] text-3xl text-white"></span> 
                                    <span className='font-bold text-white'>{fetchPostID.data?.total_comment}</span>                     
                                </div>                                 
                            </div>
        
                            {/* COMMENT SECTION */}
                            <div className="flex flex-col gap-5 allcomments p-3  
                            border-[#0C1629] border-y-2 overflow-y-scroll h-[500px]">
                                
                                <button type="button" className="flex items-center text-white gap-2 hover:text-red-500">
                                    <span className='font-bold'>Sort By</span>
                                    <span className="icon-[ph--arrow-down] text-xl"></span>
                                </button>
        
                                {(() => {
                                const items = [];
                                for (let i = 0; i < pageCount; i++) {
                                    items.push(
                                        <div className="flex flex-col gap-2"  key={i}>
        
                                            <div className="flex gap-2">
                                                <div className="div">
                                                    <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                                                        <img src={logo2} alt="" className='object-cover w-full h-full'/>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-[#111d2f] rounded-lg p-4"> 
                                                    <span className='font-bold text-xl text-white'>Maki</span>
        
                                                    <div className="span font-medium text-white">Lorem ipsum, dolor sit amet 
                                                    consectetur adipisicing elit. Quisquam, iste totam culpa repellat reiciendis
                                                    magni suscipit libero modi quo aliquam, id vel sapiente rerum, 
                                                    odio cupiditate ad odit optio mollitia.</div>                                  
                                                </div>
                                            </div>
                                            
                                            <div className="timestamp">
                                                <span className='text-md text-white'>11 mins ago</span>
                                            </div>                        
                                        </div> 
                                    );
                                }
                                    return items;
                                })()}
                                
                                <button type="button" className="flex text-white font-medium cursor-pointer items-center gap-1
                                hover:text-red-500 text-lg" onClick={()=>loadMore()} disabled={loading}>
                                    {loading? <span className="icon-[gg--spinner] animate-spin"></span> : ""}    
                                    {loading ? "Loading..." : "Load new comments"}
                                </button>  
        
                            </div>
        
                            {/* CREATE A COMMENT SECTION */}
                            <div className="comments flex gap-3 w-full">
                                <div className="image">
                                    <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                                        <img src={logo} alt="" className='object-cover w-full h-full'/>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="flex relative items-center w-full justify-end">
                                    <input type="hidden" {...register("post_id")} value={fetchPostID.data.PostID} />
                                                                        
                                    <button type="submit" className="icon-[uil--message] text-4xl 
                                    text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>

                                    <input type="text" className='border-2 border-[#CDCDCD] p-3 w-full
                                    focus:outline-[#838383] rounded-lg text-[#505050]' 
                                    placeholder='Add new comment..' {...register("comment")}/>
                                </form>                        
                            </div>
                        </div>
        
                    </div>
                </div>
            </>
        )
    }
    return(
        <>
            <div className="w-full min-h-dvh absolute z-20 grid
                bg-[#1C273D]">
                Hi
            </div>
        </>
    )   
    

})

export default ModalPost