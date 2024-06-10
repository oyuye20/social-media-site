import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import logo2 from '../assets/images/0048_Movie.png'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { isModalCreatePostOpen, isModalPostOpen } from '../store/modalToggle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts, getUserInfo, likePost } from '../utils/axiosRequest';
import { useForm } from "react-hook-form"
import { CommentTypes } from '../types/user';
import { Link } from 'react-router-dom';

const NewsFeed = (() => {
    const queryClient = useQueryClient();
    
    const form = useForm<CommentTypes>();
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;


    /* FETCH POSTS DATA */
    const posts = useQuery({
        queryKey: ["post"],
        queryFn: getPosts
    })

    /* FETCH USER INFO */
    const getUser = useQuery({
        queryKey: ["users"],
        queryFn: getUserInfo
    })


    /*  */
    const likePostMutation = useMutation({
        mutationFn: likePost,
        onSettled: ()=> queryClient.invalidateQueries({queryKey: ["post"]})
    })

    const likePosts = ((id:number) => {
        likePostMutation.mutate(id);
    })


    const [hoverProfile, setHoverProfile] = useState(false);
    
    const dispatch = useDispatch();
    
    const openModal  = () => {
        dispatch(isModalCreatePostOpen());
    }


    return (
    <div className="xl:ms-[300px] 
    xl:me-[400px] min-h-dvh pt-5 me-[300px] 
    pb-5  bg-[#1C273D] w-full">

        <div className="flex flex-col gap-7 px-4">
            <div className="bg-white p-4 rounded-lg">
                <input type="text" className="border-2 
                border-[#CDCDCD] p-2 rounded-lg w-full"
                placeholder="Post something......" readOnly 
                onClick={()=> openModal()}/>
            </div>

            {posts.data?.length === 0 ? <p className='font-bold 
            text-white text-2xl text-center'>Empty Post Create a new one</p> 
            :posts.data?.map((post, index) => (
                <div key={index} className="bg-white rounded-lg 
                gap-3 flex flex-col">
                    <div className="p-4 flex flex-col gap-4">

                        {/* AUTHOR OF POST INFO */}
                        <div className="title flex gap-4 items-center">
                            <div className="div relative">
                                <div className="h-[50px] w-[50px] 
                                rounded-full overflow-hidden cursor-pointer"
                                onMouseEnter={()=> setHoverProfile(!hoverProfile)} 
                                onMouseLeave={()=> setHoverProfile(!hoverProfile)}>
                                
                                <img src={logo} alt="" className='object-cover w-full h-full'/>                        
                                </div>
                            </div>

                            <div className="flex gap-2 w-full">
                                <div className="flex flex-col relative">
                                    <span className='text-[#3D3D3D] font-bold text-lg hover:underline 
                                    underline-offset-4 cursor-pointer'/*  onMouseEnter={()=> setHoverProfile(!hoverProfile)} 
                                    onMouseLeave={()=> setHoverProfile(!hoverProfile)} */>{post.post_author}</span>

                                    <span className='text-[#3D3D3D] text-md font-medium'>{post.date_posted.toString()}</span>

                                    {hoverProfile && (
                                        <div className="w-[250px] absolute left-[100px] p-3
                                        flex flex-col gap-5 bg-[#1C273D] rounded-lg">

                                            <div className="flex w-full gap-3">
                                                <div className="div">
                                                    <div className="h-[60px] w-[60px] rounded-full overflow-hidden">
                                                        <img src={logo} alt="" className='object-cover w-full h-full'/>
                                                    </div>
                                                </div>
                                                
                                            <div className="div w-full flex flex-col gap-1">
                                                <span className='text-white font-bold text-lg hover:underline 
                                                underline-offset-4 cursor-pointer'>hahatdog</span>

                                                <div className="flex items-center gap-2">
                                                    <span className="icon-[ic--sharp-people] text-white text-2xl"></span>
                                                    <span className='text-white text-md font-bold'>300K Followers</span>
                                                </div>                                             
                                            </div>

                                            </div>

                                            <div className="flex justify-center gap-4">
                                                <button type='button' className='p-1 text-white font-bold
                                                bg-[#5e81c6] rounded-lg w-[100px]'>Message</button>

                                                <button type='button' className='p-1 font-bold
                                                bg-white rounded-lg w-[100px]'>Follow</button>
                                            </div>

                                            
                                        </div>
                                    )}

                                </div>
                                
                                <button type='button' className='p-1 text-white font-bold 
                                bg-[#769DEA] rounded-lg w-[100px] h-1/4'>Follow</button>
                            </div>

                        </div>

                        <div className="s">
                            <p className='text-lg text-[#3D3D3D]'>{post.post_description}</p>
                        </div>
                        
                        {/* POST */}
                        <Link to={`/post/${post.post_id}`} className="overflow-hidden flex 
                        justify-center bg-gray-600 rounded-lg">
                            <img src={"http://localhost:8000/image/"
                            + post.image} alt="" 
                            className='cursor-pointer object-cover' 
                            /* onClick={()=> dispatch(isModalPostOpen(post.PostID))} *//>                     
                        </Link>
                    
                        
                        {/* NUMBER OF LIKED POST */}
                        <div className="flex gap-4 p-3">

                             
                            {/* CHANGE FONT COLOR WHEN USER LIKES THE POSTS */}            
                            {(post.users_liked.length === 0) &&(
                                <div className='flex items-center gap-1 font-bold '>
                                    <button disabled={likePostMutation.isPending} 
                                    type='button' onClick={()=> likePosts(post.post_id)} 
                                    className="icon-[ph--heart-fill] text-3xl 
                                    hover:text-red-500 hover:cursor-pointer 
                                    border-2 border-black"></button>

                                    {post.total_likes ? post.total_likes : "Like this post"}
                                </div>
                            )}                  


                            {post.users_liked.map((l) => {
                            return (
                                <div key={l.like_id}>
                                    <div style={{color: l.user_liked_id ===  getUser.data?.id ?  "red": "black"}}
                                    className="flex items-center gap-1 font-bold">
                                        <button  disabled={likePostMutation.isPending} 
                                        type='button' onClick={()=> likePosts(post.post_id)} 
                                        className="icon-[ph--heart-fill] text-3xl 
                                        hover:text-red-500 hover:cursor-pointer"></button>
                                
                                        {post.total_likes ? post.total_likes : "Like this post"}        
                                    </div>
                                </div>
                            )})}

                          
                            <div className="flex items-center gap-1">
                                <span className="icon-[ic--round-message] text-3xl"></span> 
                                <span className='font-bold text-[#3D3D3D]'>
                                {post.total_comments ? post.total_comments : "No Comments yet"}</span>                     
                            </div>
                        </div>
                    </div>
                    
                    {/* COMMENTS ON POSTS */}
                    <div className="comments p-3 flex gap-3 border-y-2 border-[#CDCDCD]">
                        <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                        <div className="flex flex-col gap-2 ">
                            <span className='font-bold text-2xl text-[#3D3D3D]'>Maki</span>

                            <div className="span font-medium text-[#3D3D3D]">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Quisquam, iste totam culpa repellat reiciendis magni suscipit libero modi quo aliquam, id vel sapiente rerum, 
                            odio cupiditate ad odit optio mollitia.</div>
                        </div>
                    </div>


                    <button className='font-bold text-[#3D3D3D] px-4 cursor-pointer flex'>
                    Load more comments</button>

                    {/* ADD NEW COMMENT */}
                    <div className="comments p-3 flex gap-3 w-full">
                        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                            <img src={logo2} alt="" className='object-cover w-full h-full'/>
                        </div>


                        <Link to={`/post/${post.post_id}`} 
                        className="flex relative items-center w-full justify-end">
                            <button type="submit" className="icon-[uil--message] text-4xl 
                            text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>

                            <input type="readonly" className='border-2 border-[#CDCDCD] p-3 w-full
                            focus:outline-[#838383] rounded-lg text-[#505050]' 
                            placeholder='Add new comment..' readOnly/>
                        </Link>

                        
                        {/* <div onClick={()=> dispatch(isModalPostOpen(post.PostID))} 
                        className="flex relative items-center w-full justify-end">
                            <button type="submit" className="icon-[uil--message] text-4xl 
                            text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>

                            <input type="readonly" className='border-2 border-[#CDCDCD] p-3 w-full
                            focus:outline-[#838383] rounded-lg text-[#505050]' 
                            placeholder='Add new comment..' readOnly/>
                        </div> */}

                        {/* <form onSubmit={handleSubmit(submitComment)} className="flex relative items-center w-full justify-end">
                            <button type="submit" className="icon-[uil--message] text-4xl text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>
                            <input type="text" {...register("comment")} className='border-2 border-[#CDCDCD] p-3 w-full
                            focus:outline-[#838383] rounded-lg text-[#505050]' placeholder='Add new comment..'
                            name={`name${index}`} onChange={handleChange}/>
                        </form> */}
                                
                    </div>                      
                </div>))
            }

            {/* POSTS */}
            
            {/* END OF POSTS */}

        </div>               
    </div>
    )
  
})

export default NewsFeed