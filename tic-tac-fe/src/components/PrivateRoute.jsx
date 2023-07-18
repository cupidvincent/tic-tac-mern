import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {

    const { gameInfo } = useSelector((state) => state.auth)
    return gameInfo ? <Outlet/> : <Navigate to={'/'} replace />
}
