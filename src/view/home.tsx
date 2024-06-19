import ModalPost from '../modal/modalPost';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import NewsFeed from '../components/feed';
import RightSideBar from '../components/rightSideBar.tsx';
import ModalCreatePost from '../modal/modalCreatePost';
import { AnimatePresence } from "framer-motion"
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import pusher from '../utils/pusher';
import { useEffect } from 'react';

const Home = (() => {
    const isModalOpen = useSelector((state:RootState) => state.postModal.modalPost);
    const isModalCreatePostOpen = useSelector((state:RootState) => state.postModal.createModalPost);
    const disableScroll = useSelector((state:RootState)=> state.postModal.disableScroll);


    useEffect(()=> {
        const channel = pusher.subscribe('channel-name');

        channel.bind('new-channel-name', (e:string)=>{
            alert(JSON.stringify(e));
        });

        return () => {
            channel.unbind('new-channel-name');
            pusher.unsubscribe('channel-name');
        };
    }, [])


    return(
        <>
            {/*<AnimatePresence>{isModalCreatePostOpen && (<ModalCreatePost/>)}</AnimatePresence>*/}
            {/*<AnimatePresence>{isModalOpen && (<ModalPost/>)}</AnimatePresence>*/}
            <NavBar />

            <main style={{position: disableScroll ? "relative" : "fixed"}} 
            className="min-h-0 bg-[#020817] flex w-full pt-[65px] ">
                {/* SIDEBAR */}
                <SideBar />

                {/* MAIN CONTENT */}
                <NewsFeed/>

                {/* RIGHT SIDEBAR */}
                <RightSideBar />
            </main>
        </>
    )
})

export default Home;