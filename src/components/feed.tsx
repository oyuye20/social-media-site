import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import logo2 from '../assets/images/0048_Movie.png'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { isModalCreatePostOpen, isModalPostOpen } from '../store/modalToggle';

/* interface ModalProps {
    toggleModal: ()=> void;
} */

const NewsFeed = (() => {
    const [hoverProfile, setHoverProfile] = useState(false);
    const [isLiked, setLike] = useState(false);
    const dispatch = useDispatch();

    return (
    <div className="xl:ms-[300px] xl:me-[400px] h-full pt-5 me-[300px] pb-5">
        <div className="flex flex-col gap-7 px-4">
            <div className="bg-white p-4 rounded-lg">
                <input type="text" className="border-2 border-[#CDCDCD] p-2 rounded-lg w-full"
                placeholder="Post something......" readOnly onClick={()=> dispatch(isModalCreatePostOpen())}/>
            </div>

            <div className="bg-white rounded-lg gap-3 flex flex-col ">
                <div className="p-4 flex flex-col gap-4">
                    {/* AUTHOR OF POST INFO */}
                    <div className="title flex gap-4 items-center">
                        <div className="div relative">
                            <div className="h-[50px] w-[50px] rounded-full overflow-hidden cursor-pointer"
                            onMouseEnter={()=> setHoverProfile(!hoverProfile)} 
                            onMouseLeave={()=> setHoverProfile(!hoverProfile)}>
                                <img src={logo} alt="" className='object-cover w-full h-full'/>                        
                            </div>
                        </div>

                        <div className="flex gap-2 w-full">
                            <div className="flex flex-col relative">
                                <span className='text-[#3D3D3D] font-bold text-lg hover:underline 
                                underline-offset-4 cursor-pointer' onMouseEnter={()=> setHoverProfile(!hoverProfile)} 
                                onMouseLeave={()=> setHoverProfile(!hoverProfile)}>hahatdog</span>

                                <span className='text-[#3D3D3D] text-md font-medium'>10 hours ago</span>

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



                    {/* POST */}
                    <div className="overflow-hidden flex justify-center bg-gray-600 rounded-lg">
                        <img src={logo2} alt="" className=' cursor-pointer object-cover' onClick={()=> dispatch(isModalPostOpen())}/>                     
                    </div>
                    
                    {/* NUMBER OF LIKED POST */}
                    <div className="flex gap-4 p-3">
                        <div className="flex items-center gap-1">
                            <span onClick={()=> setLike(prevCheck => !prevCheck)} style={{color: isLiked ? "red": "black"}} 
                            className="icon-[ph--heart-fill] text-3xl hover:text-red-500 hover:cursor-pointer"></span> 
                            <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                        </div>

                        <div className="flex items-center">
                            <span className="icon-[ic--round-message] text-3xl"></span> 
                            <span className='font-bold text-[#3D3D3D]'>1500</span>                     
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
                    <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                    <div className="flex relative items-center w-full justify-end">
                        <button className="icon-[uil--message] text-4xl text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>
                        <input type="text" className='border-2 border-[#CDCDCD] p-3 w-full
                        focus:outline-[#838383] rounded-lg text-[#505050]' placeholder='Add new comment..'/>
                    </div>
                            
                </div>                      
            </div>
        </div>               
    </div>
    )
  
})

export default NewsFeed