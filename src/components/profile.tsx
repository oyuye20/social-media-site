import Navbar from "@/components/navbar.tsx";
import {Link, useParams} from "react-router-dom";
import logo3 from '../assets/images/0048_Movie.png'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import logo from "@/assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg";
import {Button} from "@/components/ui/button.tsx";
import logo2 from "@/assets/images/0048_Movie.png";
import {Input} from "@/components/ui/input.tsx";

import { GetUserByID } from "@/apiCall/TanStackQuery/userQuery.tsx";
import { FetchPostByUser } from "@/apiCall/TanStackQuery/postQuery.tsx";

const Profile = () =>{
    const { id } = useParams<string>();
    const userInfoByID = GetUserByID(id!);
    const postByUser = FetchPostByUser(id!);

    // SHORTEN VARIABLE FOR READABILITY
    const u = userInfoByID;
    const up = postByUser;

    return(
        <>
            <Navbar/>
            <div className="bg-[#020817] flex flex-col px-20 gap-4">
                <header className="mt-16 border-2 ">

                    <div className="bg-blue-950">

                        <div className="relative flex">
                            <div className="w-full flex overflow-clip h-[450px]">
                                <img src={logo3} alt="cover pic" className="object-cover
                                w-full rounded-b-lg" />
                            </div>

                            <div className="w-full absolute h-full flex
                            justify-center items-end mt-6">
                                <div className="h-[300px] w-[300px] flex">
                                    <img src={logo} alt="profile pic"
                                     className="object-cover rounded-full border-4
                                     border-blue-950"/>
                                </div>
                            </div>

                        </div>


                        <div className="flex flex-col items-center
                        mt-6 gap-4 p-4">
                            <h1 className="text-4xl text-white
                            font-bold">
                                {u.data?.name}
                            </h1>

                            <h1 className="text-xl text-white">
                                300K Followers
                            </h1>

                        </div>

                    </div>
                </header>

                <main className="w-[1000px] py-5 flex flex-col gap-4">
                    {up.data?.map((up, i) => (

                        <div className="bg-[#121e3b] rounded-lg
                        gap-3 flex flex-col" key={i}>

                                {/* AUTHOR ON POST AND NUMBER OF COMMENTS*/}
                                <div className="p-4 flex flex-col gap-4">

                                    {/* AUTHOR OF POST INFO */}
                                    <div className="title flex gap-4 items-center">
                                        <Avatar>
                                            <AvatarImage src={logo} alt="profile pic"/>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        {/*text-white*/}

                                        <div className="flex gap-2 w-full">
                                            <div className="flex flex-col">
                                                <p className='text-white font-bold text-lg hover:underline
                                                    underline-offset-4 cursor-pointer'>{up.post_author}</p>

                                                <span className='text-white text-md
                                                font-medium'>2020-10-20</span>

                                            </div>
                                            <Button variant="default" size="default">Follow</Button>
                                        </div>

                                    </div>

                                    <div className="s">
                                        <p className='text-lg text-white'>
                                            {up.post_description}
                                        </p>
                                    </div>

                                    {/* POST */}
                                    <Link to={`/post/${up.post_id}`} className="overflow-hidden flex
                                justify-center bg-gray-600 rounded-lg">
                                        <img src={logo3} alt=""
                                             className='cursor-pointer object-cover'
                                            /* onClick={()=> dispatch(isModalPostOpen(post.PostID))} *//>
                                    </Link>


                                    {/* NUMBER OF LIKED POST */}
                                    <div className="flex gap-4 p-3">


                                        {/* CHANGE FONT COLOR WHEN USER LIKES THE POSTS */}

                                        <div>
                                            <div

                                                className="flex items-center gap-1 font-bold">
                                                <button
                                                    type='button'
                                                    className="icon-[ph--heart-fill] text-3xl
                                    hover:text-red-500 hover:cursor-pointer"></button>

                                                1
                                            </div>
                                        </div>


                                        <div className="flex items-center gap-2 text-white">
                                            <span className="icon-[ic--round-message] text-3xl"></span>
                                            <span className='font-bold text-white'>
                                        {/*{post.total_comments ? post.total_comments : "No Comments yet"}*/}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* COMMENTS ON POSTS */}
                                <div className="comments p-3 flex gap-3 border-y-[1.5px] border-white">
                                    <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                                    <div className="flex flex-col gap-2 ">
                                        <span className='font-bold text-xl text-white'>Maki</span>

                                        <div className="text-white">Lorem ipsum, dolor sit amet consectetur
                                            adipisicing elit. Quisquam, iste totam culpa repellat reiciendis magni
                                            zsuscipit libero modi quo aliquam, id vel sapiente rerum,
                                            odio cupiditate ad odit optio mollitia.
                                        </div>
                                    </div>
                                </div>

                                <button className='font-bold text-white px-4 cursor-pointer flex'>
                                    Load more comments
                                </button>

                                {/* ADD NEW COMMENT */}
                                <div className="comments p-3 flex gap-3 w-full">
                                    {/*<div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                                    <img src={logo2} alt="" className='object-cover w-full h-full'/>
                                </div>*/}
                                    <Avatar>
                                        <AvatarImage src={logo} alt="profile pic"/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <Link to={`/post/`}
                                          className="flex relative items-center w-full justify-end">
                                        {/*<button type="submit" className="icon-[uil--message] text-4xl
                                    text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>*/}
                                        {/*<input type="readonly" className='border-2 border-[#CDCDCD] p-3 w-full
                                    focus:outline-[#838383] rounded-lg text-[#505050]'
                                    placeholder='Add new comment..' readOnly/>*/}
                                        <Input type="text" placeholder="Add new comment"/>
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
                        </div>

                    ))}


                </main>

            </div>


        </>
    )
}

export default Profile;