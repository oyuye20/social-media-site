import { motion } from "framer-motion"
import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import logo2 from '../assets/images/0048_Movie.png'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { isModalPostOpen } from "../store/modalToggle";


/* interface ModalProps {
    isOpen: boolean;
    onClose: ()=> void;
} */


const ModalPost = (() => {
    const dispatch = useDispatch();
   
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


    return(
        <div className="bg-[rgba(10,10,10,0.5)] w-full min-h-dvh absolute z-20 grid p-10">
            <motion.div initial={{opacity: 0, scale: 0,}} animate={{opacity: 1, scale:1}} 
            transition={{ ease: "easeOut"}}  exit={{ opacity: 0, scale:0 }} 
            className="grid grid-cols-3 bg-[#1C273D] w-full h-full rounded-xl ">

                <div className="col-span-2 flex items-center p-5 border-2">
                    <div className="border-2 h-full object-fill justify-center">
                        <img src={logo} alt="post" className='object-center'/>
                    </div>           
                </div>

                <div className="flex flex-col gap-3 p-3 relative">
                    <div className="NAME flex p-3 gap-3">

                        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                            <img src={logo} alt="" className='object-cover w-full h-full'/>
                        </div>
                        

                        <div className="flex flex-col px-2">
                            <span className='text-white font-bold text-xl hover:underline underline-offset-2 cursor-pointer'>hahatdog</span>
                            <span className='text-white text-md font-bold'>10 hours ago</span>
                        </div>

                        <div className="flex flex-col">
                            <button type='button' className='p-1 text-white font-bold
                            bg-[#5e81c6] rounded-lg w-[100px] hover:bg-[#c3d7ff] hover:text-black'>Follow</button>
                        </div>

                        <div className="absolute right-0 me-3 flex gap-5">

                            <div className="relative">
                                <button className="icon-[solar--menu-dots-bold] text-3xl text-white 
                                hover:text-red-500 cursor-pointer" onClick={()=> setDropdown(!dropdown)}></button>

                                {dropdown && (
                                    <div className="bg-white w-[250px] absolute right-0 flex flex-col p-3
                                    rounded-lg gap-4">
                                        <div className="flex items-center w-full cursor-pointer p-2 hover:bg-blue-300 rounded-lg">
                                            <span className="icon-[mdi--pencil] text-3xl text-[#3D3D3D]"></span>
                                            <span className='font-bold text-[#3D3D3D]'>Edit Post</span>
                                        </div>
    
                                        <div className="flex items-center w-full cursor-pointer hover:bg-blue-300 p-2 rounded-lg">
                                            <span className="icon-[mdi--trash] text-3xl text-[#3D3D3D]"></span>
                                            <span className='font-bold text-[#3D3D3D]'>Delete Post</span>
                                        </div>
                                    </div>
                                )}
            
                            </div>

                            

                            <button className="icon-[bitcoin-icons--cross-filled] text-3xl 
                            text-white hover:text-red-500" onClick={()=> dispatch(isModalPostOpen())}></button>     
                        </div>
                        
                    </div>  

                    <div className="CAPTION flex p-3 gap-3">
                        <span className="span font-medium text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Quisquam, iste totam culpa repellat reiciendis magni suscipit libero modi quo aliquam, id vel sapiente rerum, 
                        odio cupiditate ad odit optio mollitia.</span>
                    </div>

                    <div className="flex gap-3 p-3">

                        <div className="flex items-center gap-1">
                            <span className="text-white icon-[ph--heart-fill] text-3xl hover:text-red-500 hover:cursor-pointer"></span> 
                            <span className='font-bold text-white'>1500</span>                     
                        </div>

                        <div className="flex items-center">
                            <span className="icon-[ic--round-message] text-3xl text-white"></span> 
                            <span className='font-bold text-white'>1500</span>                     
                        </div>                        

                        
                    </div>

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

                    <div className="comments flex gap-3 w-full">
                        <div className="image">
                            <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                                <img src={logo} alt="" className='object-cover w-full h-full'/>
                            </div>
                        </div>
                        
                        <div className="flex relative items-center w-full justify-end">
                            <button className="icon-[uil--message] text-4xl text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>
                            <input type="text" className='border-2 border-[#CDCDCD] p-3 w-full
                            focus:outline-[#838383] rounded-lg text-[#505050]' placeholder='Add new comment..'/>
                        </div>                        
                    </div>

                </div>

            </motion.div>
        </div>
    )

})

export default ModalPost