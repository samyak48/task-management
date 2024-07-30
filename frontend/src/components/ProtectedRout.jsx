import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRout({ children, role }) {
    const user = useSelector(state => state.user.user)
    if (!user) {
        return <Navigate to="/" />;
    }
    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }
    return children
}
export default ProtectedRout