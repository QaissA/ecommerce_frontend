import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import SigninForm from "./components/signin-form";

const Signin = () => {
    const navigate = useNavigate();
    const handleNavigation = (page: string) => {
        navigate(page);
    }
    return (
        <div className="flex flex-row h-[100vh]">
            <div className="w-2/3 p-4 flex justify-center items-center flex-col">
                <div className="w-[30%] flex justify-center py-5">
                    <img src="/logoipsum-288.svg" alt="" />
                </div>
                <SigninForm />
                <div className="mt-3">
                    <span>you do have an account?</span>
                    <Button onClick={() => handleNavigation('/login')} variant='link'>Login</Button>
                </div>
            </div>
            <div className="w-1/3 relative">
                HERE SCEME 3D
                <Button variant="default" className="absolute bottom-0 top-3/4 left-2/4" onClick={() => handleNavigation("/")}>Go back Home</Button>
            </div>
        </div>
    )
}

export default Signin