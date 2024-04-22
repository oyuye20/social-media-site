import { useState } from 'react';
import logo from '../assets/images/Sakurasou no Pet na Kanojo - 18 - Large 28.jpg';
import { useDispatch } from 'react-redux';
import { isModalCreatePostOpen } from '../store/modalToggle';
import { motion } from "framer-motion"

const ModalCreatePost = (()=> {

    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const imagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileImage = event.target.files;

        if(fileImage && fileImage.length > 0){
            setImageFile(fileImage[0])
        }else{
            setImageFile(null)
        }
    }


    return(
    <>
        <div className="bg-[rgba(10,10,10,0.5)] w-full min-h-dvh absolute z-20 p-10 flex
        justify-center items-center">
            <motion.div initial={{opacity: 0, scale: 0,}} animate={{opacity: 1, scale:1}} 
            transition={{ ease: "easeOut"}}  exit={{ opacity: 0, scale:0 }} 
            className="w-[500px] bg-[#1C273D] flex flex-col">

                <div className="flex items-center justify-center p-3">    
                    <div className="flex justify-center w-full ">
                        <span className="text-white text-2xl font-bold ">Create Post</span>
                    </div>
                    
                    <button className="icon-[bitcoin-icons--cross-filled] text-3xl 
                    text-white hover:text-red-500" onClick={()=> dispatch(isModalCreatePostOpen())}></button> 
                </div>
                

                <div className="p-4 flex flex-col gap-3">

                    <div className="flex items-center gap-2 py-3">
                        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                            <img src={logo} alt="" className='object-cover w-full h-full'/>
                        </div>
                        <div className="name">
                            <span className='text-white text-xl'>Mashiro Shiina</span>
                        </div>
                    </div>

                    <div className="description border-2 border-[#0C1629] rounded-lg">
                        <textarea name="" id="" className='w-full bg-transparent p-2 outline-none
                        text-white resize-none h-[100px]' placeholder='Write Something......'>
                        </textarea>
                    </div>

                    {imageFile && (
                        <div className="border-2 border-[#0C1629] w-full max-h-[500px] overflow-y-auto rounded-lg">
                            <img src={imageFile === null ? "" : URL.createObjectURL(imageFile)} alt="" 
                            className='object-contain w-full'/>
                        </div>
                    )}
                    
                    

                    

                    <input type="file" className=' text-white' onChange={imagePreview}/>

                    <button type='button' className='bg-[#5e81c6] p-2 rounded-lg 
                    text-white font-bold'>Post</button>
                </div>

            </motion.div>
        </div>
    </>
    )
    
})

export default ModalCreatePost;