import { Navigate, useParams } from "react-router-dom";

const Menu = () => {
    const { id } = useParams();
    // Redirect to OutletDetails as menu is embedded there for now
    return <Navigate to={`/student/outlets/${id}`} replace />;
};

export default Menu;
