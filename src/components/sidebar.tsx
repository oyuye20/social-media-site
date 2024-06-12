const SideBar = (() => {
    return (
    <>
        <div className="xl:flex flex-col gap-6 w-[300px] fixed h-full px-5 mt-3 bg-[#020817] z-10 hidden">
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
    </>
    )
})

export default SideBar