import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import { useState } from 'react';
import Api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../utils/axiosRequest';

const NavBar = (() => {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ["user"],
        refetchOnWindowFocus: false,
        queryFn: getUserInfo
    })

    function logout(){
        Api.post('api/v1/logout').then(()=>{
            navigate('/login')
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [dropdown, setDropdown] = useState(false);
    return (
        <>
        <nav className="w-full bg-[#3F5175] p-3 px-6 flex items-center justify-between fixed top-0
        z-10">
            <div className="flex items-center gap-3">
                <span className="text-2xl icon-[uil--message] text-white"></span>
                <h1 className="text-white font-bold text-2xl">Social Site</h1>
            </div>

            <div className="search relative flex items-center ">
                {/* <span className="icon-[ooui--search] text-xl text-[#9A9A9A] absolute mx-1 opacity-50"></span> */}
                <input type="text" className="outline-none w-[450px] rounded-lg text-lg px-4 py-2"
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

                                <span className="text-lg font-bold">{data?.name}</span>

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

                                <button type="button" onClick={logout} className="flex 
                                justify-between w-full cursor-pointer p-2 hover:bg-blue-300 
                                rounded-lg gap-2" >
                                    <div className="flex items-center gap-2">
                                        <span className="icon-[majesticons--door-exit] text-3xl text-[#3D3D3D]"></span>
                                        <span  className='font-bold text-[#3D3D3D]'>Logout</span>           
                                    </div>

                                    <span className="icon-[ic--round-play-arrow] text-3xl text-[#3D3D3D]"></span>                          
                                </button>
                
                            </div>              
                        </div> 
                    )}

                </div>         
            </div>       
        </nav>
        </>
    )
})

export default NavBar