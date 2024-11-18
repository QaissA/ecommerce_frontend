import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token, navigate])
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard