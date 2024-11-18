import Scene from "@/components/scene"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import LoginForm from "./components/loginForm"

const Login = () => {
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
        <LoginForm />
        <div className="mt-3">
          <span>you don't have an accont?</span>
          <Button onClick={() => handleNavigation("/sigin")} variant="link" >Signin</Button>
        </div>
      </div>
      <div className="w-1/3 relative">
        <Scene />
        <Button variant="default" className="absolute bottom-0 top-3/4 left-2/4" onClick={() => handleNavigation("/")}>Go back to Home</Button>
      </div>
    </div>
  )
}

export default Login