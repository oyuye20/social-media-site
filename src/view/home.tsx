
/* import postPic from '../src/assets/images/11447733.jpg'
import logo2 from '../src/assets/images/0048_Movie.png'
import post2 from '../src/assets/images/434677819_1221258789084254_5754619137726087324_n.jpg' */
import { useState } from 'react';
import { AnimatePresence } from "framer-motion"

import ModalPost from '../modal/modalPost';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import NewsFeed from '../components/feed';
import LeftSideBar from '../components/leftSideBar';
import Api from "../utils/axios";
import { UserInfo } from '../types/user';

const Home: React.FC = (() => {

    const [modal, setModal] = useState<boolean>(false);
    

    Api.get<UserInfo>('api/user').then((res)=>{
        console.log(res.data);
    }).catch((err)=>{
        console.log(err);
        
    })

    /* DISABLE BODY SCROLL OF OPENING MODAL */
    const [disableScroll, setDisableScroll] = useState(false);

    /* TOGGLE MODAL */
    const toggleModal = () => {   
        setDisableScroll(!disableScroll)
        setModal(prevState => !prevState)
    }

    return(
        <>
        
        <AnimatePresence>
            <ModalPost isOpen={modal} onClose={toggleModal} />          
        </AnimatePresence>

        <NavBar />

        <main style={{position: disableScroll ? "fixed" : "relative"}} className="min-h-0 bg-[#1C273D] flex w-full pt-[65px]">

            
            {/* SIDEBAR */}
            <SideBar />
            {/* MAIN CONTENT */}
            <NewsFeed toggleModal={toggleModal}/>


            {/* RIGHT SIDEBAR */}
            <LeftSideBar />
            
        </main>
        </>
    )
})

export default Home;