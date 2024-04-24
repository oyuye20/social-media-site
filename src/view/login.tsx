import { useForm} from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import Api from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../types/user";


const Login = (()=> {
    const navigate = useNavigate();
    const form = useForm<LoginValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const [isLoading, setLoading] = useState<boolean>(false);

    const onSubmit = async(formData: LoginValues) => {
        setLoading(true);

        Api.get('sanctum/csrf-cookie').then(async()=>{
            await Api.post('api/v1/auth/login',formData).then(()=>{             
                setLoading(false);
                navigate('/home')
            }).catch((err)=> {
                console.log(err);
            })
        })             
    }

    
    return(
        <>
            <div className="bg-[#112D4E] flex justify-center items-center p-5 min-h-dvh">
                <div className="div bg-white w-[1000px] grid md:grid-cols-2 rounded-lg">

                    <div className="bg-[#3F72AF] w-full rounded-s-lg">
                        
                    </div>

                    {/* LOGIN */}
                    <div className="bg-[#DBE2EF] p-12 md:rounded-e-lg rounded-lg">        
                        <form onSubmit={handleSubmit(onSubmit)} className="form flex flex-col gap-10" noValidate>

                            <div className="title">
                                <span className="title font-bold text-4xl flex justify-center p-3">Login</span>
                            </div>

                            <div className="input flex flex-col gap-3 w-full">
                                <label htmlFor="" className="text-xl">Username</label>
                                <input type="text" id="username" className="border-2 
                                border-[#111111] bg-transparent text-lg p-2 rounded-xl"
                                {...register("email", {required: {value: true, message:"Email Required"}})}/>
                                <p className="text-red-500 font-bold">{errors.email?.message}</p>
                            </div>
                            

                            <div className="input flex flex-col gap-3 w-full">
                                <label htmlFor="" className="text-xl">Password</label>
                                <input type="password" id="" className="border-2 border-[#111111] bg-transparent 
                                text-lg p-2 rounded-xl" {...register("password", {required: {value: true, message:"Password Required"}})}/>

                                <p className="text-red-500 font-bold">{errors.password?.message}</p>
                                {/* <a href="#" className="text-md">Forgot Password?</a> */}
                            </div>
                            
                    
                            <div className="button flex flex-col w-full gap-2 items-center">
                                <button type="submit" disabled={isLoading} className="bg-[#112D4E] p-3 text-xl
                                text-white rounded-xl w-full hover:bg-[#528cce] flex justify-center items-center gap-2">
                                    {isLoading && <span className="icon-[gg--spinner] animate-spin"></span>}                           
                                    <span>Login</span>                                           
                                </button>
                                <span className="font-bold">New user? <a href="#" className="underline underline-offset-1">Create an Account</a></span>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <DevTool control={control} />
        </>
    )
})

export default Login