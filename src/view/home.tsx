import ModalPost from '../modal/modalPost';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import NewsFeed from '../components/feed';
import LeftSideBar from '../components/leftSideBar';
import ModalCreatePost from '../modal/modalCreatePost';

import { AnimatePresence } from "framer-motion"
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Home = (() => {
    const isModalOpen = useSelector((state:RootState) => state.postModal.modalPost);
    const isModalCreatePostOpen = useSelector((state:RootState) => state.postModal.createModalPost);
    const disableScroll = useSelector((state:RootState)=> state.postModal.disableScroll)
    return(
        <>
            <AnimatePresence>{isModalCreatePostOpen && (<ModalCreatePost/>)}</AnimatePresence>
            

            <AnimatePresence>{isModalOpen && (<ModalPost/>)}</AnimatePresence>
            <NavBar />

            <main style={{position: disableScroll ? "relative" : "fixed"}} 
            className="min-h-0 bg-[#1C273D] flex w-full pt-[65px]">
                {/* SIDEBAR */}
                <SideBar />

                {/* MAIN CONTENT */}
                <NewsFeed/>

                {/* RIGHT SIDEBAR */}
                <LeftSideBar />          
            </main>
        </>
    )
})

export default Home;