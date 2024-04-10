import logo from '../src/assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import postPic from '../src/assets/images/11447733.jpg'
import logo2 from '../src/assets/images/0048_Movie.png'
import post2 from '../src/assets/images/434677819_1221258789084254_5754619137726087324_n.jpg'
import { useState } from 'react';
import { motion } from "framer-motion"

const Home = (() => {

    const [modal, setModal] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const [hoverProfile, setHoverProfile] = useState(false);


    /* DISABLE BODY SCROLL OF OPENING MODAL */
    const [disableScroll, setDisableScroll] = useState(false);

    /* DISABLE BUTTON WHEN FETCHING DATA */
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


    /* TOGGLE MODAL */
    const toggleModal = (() => {
        setDisableScroll(!disableScroll)
        setModal(!modal)
    })

    /* ANIMATION */

    const variants = {
        
    }


    for (let i = 0; i < pageCount; i++) {
        items.push(<div  key={i}>Item {i + 1}</div>);
    }

    return(
        <>
        {modal && (
        <motion.div className="bg-[rgba(10,10,10,0.5)] w-full min-h-dvh absolute z-20 grid p-10">
            <div className="grid grid-cols-3 bg-[#1C273D] w-full h-full rounded-xl ">


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

                            

                            <button onClick={toggleModal} className="icon-[bitcoin-icons--cross-filled] text-3xl 
                            text-white hover:text-red-500"></button>     
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

            </div>
        </motion.div>
        )}


        <nav className="w-full bg-[#3F5175] p-3 px-6 flex items-center justify-between fixed top-0
        z-10">
            <div className="flex items-center gap-3">
                <span className="text-2xl icon-[uil--message] text-white"></span>
                <h1 className="text-white font-bold text-2xl">Social Site</h1>
            </div>

            <div className="search relative flex items-center ">
                <span className="icon-[ooui--search] text-xl text-[#9A9A9A] absolute mx-1 opacity-50"></span>
                <input type="text" className="outline-none w-[300px] rounded-lg text-lg text-center p-1"
                placeholder="Search something...."/>
            </div>

            <div className="flex items-center gap-3">

                {/* NOTIFICATION */}
                <div className="relative cursor-pointer">
                    <span className="icon-[jam--bell-f] text-4xl text-white"></span>

                    <div className="h-[20px] w-[20px] rounded-full bg-red-500 flex justify-center items-center absolute
                    top-0 right-0">
                            <span className='text-white font-bold'>1</span>                        
                    </div>
                </div>

                <div className="relative cursor-pointer">
                    <span className="icon-[iconoir--message-solid] text-4xl text-white"></span>

                    <div className="h-[20px] w-[20px] rounded-full bg-red-500 flex justify-center items-center absolute
                    top-0 right-0">
                            <span className='text-white font-bold'>1</span>                        
                    </div>
                </div>


                <div className="relative">
                    <div className="h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer"
                    onClick={(()=> setDropdown(!dropdown))}>
                        <img src={logo} alt="" className='object-cover w-full h-full'/>             
                    </div>

                    {dropdown && (
                        <div className="bg-white w-[250px] absolute right-0 flex flex-col p-3 rounded-lg gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-[40px] w-[40px] rounded-full overflow-hidden cursor-pointer">
                                    <img src={logo} alt="" className='object-cover w-full h-full'/>             
                                </div>

                                <span className="text-lg font-bold">Mashiro Shiina</span>

                            </div>

                            <div className="div">
                                <div className="flex justify-between w-full cursor-pointer p-2 hover:bg-blue-300 rounded-lg gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="icon-[mdi--pencil] text-3xl text-[#3D3D3D]"></span>
                                        <span className='font-bold text-[#3D3D3D]'>Your Profile</span>           
                                    </div>

                                    <span className="icon-[ic--round-play-arrow] text-3xl text-[#3D3D3D]"></span>                          
                                </div>

                                <div className="flex justify-between w-full cursor-pointer p-2 hover:bg-blue-300 rounded-lg gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="icon-[ph--gear-fill] text-3xl text-[#3D3D3D]"></span>
                                        <span className='font-bold text-[#3D3D3D]'>Settings</span>           
                                    </div>

                                    <span className="icon-[ic--round-play-arrow] text-3xl text-[#3D3D3D]"></span>                          
                                </div>

                                <div className="flex justify-between w-full cursor-pointer p-2 hover:bg-blue-300 rounded-lg gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="icon-[majesticons--door-exit] text-3xl text-[#3D3D3D]"></span>
                                        <span className='font-bold text-[#3D3D3D]'>Logout</span>           
                                    </div>

                                    <span className="icon-[ic--round-play-arrow] text-3xl text-[#3D3D3D]"></span>                          
                                </div>
                
                            </div>              
                        </div> 
                    )}


                     

                </div>


             
                
            </div>       
        </nav>

        {/* px-12 pt-24  */}

        <main style={{position: disableScroll ? "fixed" : "relative"}} className="min-h-0 bg-[#1C273D] flex w-full pt-[65px]">
            <div className="xl:flex flex-col gap-6 w-[300px] fixed h-full px-5 pt-5 border-2 bg-[#1C273D] z-10 hidden">
                <a className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                    bg-[#6177A4]">
                        <span className="icon-[iconamoon--home-fill] text-2xl text-white"></span>
                        <span className="text-white text-2xl font-bold">Feed</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[mdi--message] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Messages</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[healthicons--market-stall] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Marketplace</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[carbon--video-filled] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Videos</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[bi--people-fill] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Groups</span>
                </a>
            </div>

            <div className="xl:ms-[300px] xl:me-[400px] h-full pt-5 border-2 border-green-500 me-[300px]">
                <div className="flex flex-col gap-7 px-4">

                    <div className="bg-white p-4 rounded-lg">
                        <input type="text" className="border-2 border-[#CDCDCD] p-2 rounded-lg w-full"
                        placeholder="Post something......"/>
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
                                <img src={logo2} alt="" className=' cursor-pointer object-cover' onClick={toggleModal}/>
                            </div>
                            
                            {/* NUMBER OF LIKED POST */}
                            <div className="flex gap-4 p-3">
                                <div className="flex items-center gap-1">
                                    <span className="icon-[ph--heart-fill] text-3xl hover:text-red-500 hover:cursor-pointer"></span> 
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


                        <button onClick={()=> toggleModal()} className='font-bold text-[#3D3D3D] px-4 cursor-pointer flex'>
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

                    <div className="bg-white rounded-lg gap-3 flex flex-col">
                        <div className="p-4 flex flex-col gap-4">
                            <div className="title flex gap-4 items-center">
                                <img src={logo} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                                <div className="flex gap-3 ">

                                    <div className="flex flex-col">
                                        <span className='text-[#3D3D3D] font-bold text-xl'>hahatdog</span>
                                        <span className='text-[#3D3D3D] text-md font-bold'>10 hours ago</span>
                                    </div>
                                    

                                    <button type='button' className='p-1 text-white font-bold 
                                    bg-[#769DEA] rounded-lg w-[100px] h-1/4'>Follow</button>
                                </div>

                            </div>

                            <img src={postPic} alt="" className='rounded-lg cursor-pointer'/>

                            <div className="flex gap-4 p-3">
                                <div className="flex items-center gap-1">
                                    <span className="icon-[ph--heart-fill] text-3xl hover:text-red-500 hover:cursor-pointer"></span> 
                                    <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                                </div>

                                <div className="flex items-center">
                                    <span className="icon-[ic--round-message] text-3xl"></span> 
                                    <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                                </div>
                            </div>
                        </div>
                        
                        <div className="comments p-3 flex gap-3 border-y-2 border-[#CDCDCD]">
                            <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                            <div className="flex flex-col gap-2 ">
                                <span className='font-bold text-2xl text-[#3D3D3D]'>Maki</span>

                                <div className="span font-medium text-[#3D3D3D]">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Quisquam, iste totam culpa repellat reiciendis magni suscipit libero modi quo aliquam, id vel sapiente rerum, 
                                odio cupiditate ad odit optio mollitia.</div>
                            </div>
                        </div>

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

            <div className="xl:w-[400px] fixed right-0 h-full border-2 p-5 w-[300px]">
     
                <div className="rounded-lg bg-white flex flex-col p-7 gap-5">
                    <h1 className='font-bold text-[#3D3D3D] text-xl'>People who you may know</h1>

                    <div className="flex gap-4 justify-between xl:flex-nowrap flex-wrap ">
                        <div className="flex gap-3 w-full">
                            <div className="h-[50px] w-[50px] rounded-full overflow-hidden cursor-pointer">
                                <img src={logo} alt="" className='object-cover w-full h-full'/>                        
                            </div>

                            <div className="flex flex-col">
                                <span className='font-bold text-[#3D3D3D]'>Hahatdog</span>
                                <span className='font-bold text-[#3D3D3D]'>50k Followers</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col w-full xl:items-start items-center">
                            <button type='button' className='p-1 text-white font-bold 
                             bg-[#769DEA] rounded-lg w-[100px]'>Follow</button>
                        </div>
                    </div>

                </div>


            </div>


            
            
                {/* <div className="flex flex-col gap-5 border-2 border-green-500 relative">
                    
                    <div className="border-2 border-red-500">
                <a className="flex items-center gap-2 p-2 rounded-lg
                bg-[#6177A4]">
                    <span className="icon-[iconamoon--home-fill] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Feed</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[mdi--message] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Messages</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[healthicons--market-stall] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Marketplace</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[carbon--video-filled] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Videos</span>
                </a>

                <a className="flex items-center gap-2 p-2 rounded-lg">
                    <span className="icon-[bi--people-fill] text-2xl text-white"></span>
                    <span className="text-white text-2xl font-bold">Groups</span>
                </a>
                    </div>
                    

                </div> */}

                {/* MAIN CONTENT */}
                {/* <div className="col-span-3 flex flex-col gap-7 pt-24 px-10">
                    <div className="bg-white p-4 rounded-lg">
                        <input type="text" className="border-2 border-[#CDCDCD] p-2 rounded-lg w-full"
                        placeholder="Post something......"/>
                    </div>

                    <div className="bg-white rounded-lg gap-3 flex flex-col">
                        <div className="p-4 flex flex-col gap-4">
                            <div className="title flex gap-4 items-center">
                                <img src={logo} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                                <div className="flex gap-3 ">

                                    <div className="flex flex-col">
                                        <span className='text-[#3D3D3D] font-bold text-xl'>hahatdog</span>
                                        <span className='text-[#3D3D3D] text-md font-bold'>10 hours ago</span>
                                    </div>
                                    

                                    <button type='button' className='p-1 text-white font-bold 
                                    bg-[#769DEA] rounded-lg w-[100px] h-1/4'>Follow</button>
                                </div>

                            </div>

                            <img src={postPic} alt="" className='rounded-lg'/>

                            <div className="flex gap-4 p-3">
                                <div className="flex items-center gap-1">
                                    <span className="icon-[ph--heart-fill] text-3xl hover:text-red-500 hover:cursor-pointer"></span> 
                                    <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                                </div>

                                <div className="flex items-center">
                                    <span className="icon-[ic--round-message] text-3xl"></span> 
                                    <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                                </div>
                            </div>
                        </div>
                        
                        <div className="comments p-3 flex gap-3 border-y-2 border-[#CDCDCD]">
                            <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                            <div className="flex flex-col gap-2 ">
                                <span className='font-bold text-2xl text-[#3D3D3D]'>Maki</span>

                                <div className="span font-medium text-[#3D3D3D]">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Quisquam, iste totam culpa repellat reiciendis magni suscipit libero modi quo aliquam, id vel sapiente rerum, 
                                odio cupiditate ad odit optio mollitia.</div>
                            </div>
                        </div>

                        <div className="comments p-3 flex gap-3 w-full">
                            <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                            <div className="flex relative items-center w-full justify-end">
                                <button className="icon-[uil--message] text-4xl text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>
                                <input type="text" className='border-2 border-[#CDCDCD] p-3 w-full
                                focus:outline-[#838383] rounded-lg text-[#505050]' placeholder='Add new comment..'/>
                            </div>
                                    
                        </div>                      
                    </div>

                    <div className="bg-white rounded-lg gap-3 flex flex-col">
                        <div className="p-4 flex flex-col gap-4">
                            <div className="title flex gap-4 items-center">
                                <img src={logo} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                                <div className="flex gap-3 ">

                                    <div className="flex flex-col">
                                        <span className='text-[#3D3D3D] font-bold text-xl'>hahatdog</span>
                                        <span className='text-[#3D3D3D] text-md font-bold'>10 hours ago</span>
                                    </div>
                                    

                                    <button type='button' className='p-1 text-white font-bold 
                                    bg-[#769DEA] rounded-lg w-[100px] h-1/4'>Follow</button>
                                </div>

                            </div>

                            <img src={postPic} alt="" className='rounded-lg'/>

                            <div className="flex gap-4 p-3">
                                <div className="flex items-center gap-1">
                                    <span className="icon-[ph--heart-fill] text-3xl hover:text-red-500 hover:cursor-pointer"></span> 
                                    <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                                </div>

                                <div className="flex items-center">
                                    <span className="icon-[ic--round-message] text-3xl"></span> 
                                    <span className='font-bold text-[#3D3D3D]'>1500</span>                     
                                </div>
                            </div>
                        </div>
                        
                        <div className="comments p-3 flex gap-3 border-y-2 border-[#CDCDCD]">
                            <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                            <div className="flex flex-col gap-2 ">
                                <span className='font-bold text-2xl text-[#3D3D3D]'>Maki</span>

                                <div className="span font-medium text-[#3D3D3D]">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Quisquam, iste totam culpa repellat reiciendis magni suscipit libero modi quo aliquam, id vel sapiente rerum, 
                                odio cupiditate ad odit optio mollitia.</div>
                            </div>
                        </div>

                        <div className="comments p-3 flex gap-3 w-full">
                            <img src={logo2} alt="" className='rounded-[50%] w-[50px] h-[50px] shadow-lg'/>

                            <div className="flex relative items-center w-full justify-end">
                                <button className="icon-[uil--message] text-4xl text-[#CDCDCD] absolute mx-2 hover:bg-red-500"></button>
                                <input type="text" className='border-2 border-[#CDCDCD] p-3 w-full
                                focus:outline-[#838383] rounded-lg text-[#505050]' placeholder='Add new comment..'/>
                            </div>
                                    
                        </div>                      
                    </div>


                </div> */}

                {/* <div className="border-2 border-red-500">
                    A
                </div> */}
            

        </main>
            



        </>
    )
})

export default Home;