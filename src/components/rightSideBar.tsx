import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';

const RightSideBar = (() => {
    return(
        <div className="xl:w-[400px] fixed right-0 h-full p-5 w-[300px]">
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
    )
})

export default RightSideBar