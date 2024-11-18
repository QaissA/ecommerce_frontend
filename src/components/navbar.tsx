import { useNavigate } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/login");
    }
    return (
        <div className="flex justify-between items-center px-2 py-3 bg-tranparent">
            <div className="logo ml-3">
                <img src="/logoipsum-288.svg" alt="" />
            </div>
            <div className="gap-1 flex justify-between items-center mr-3">
                <ModeToggle />
                <Button variant="default" onClick={handleNavigation}>login</Button>
            </div>
        </div>
    )
}

export default Navbar