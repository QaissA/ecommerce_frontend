import { useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/signin");
    }
  return (
    <div className="flex justify-between items-center px-2 py-3 bg-tranparent">
        <div className="logo">
            <span>here gonna be logo</span>
        </div>
        <div className="gap-1 flex justify-between items-center">
            <ModeToggle />
            <Button variant="secondary"  onClick={handleNavigation}>Sign In</Button>
        </div>
    </div>
  )
}

export default Navbar