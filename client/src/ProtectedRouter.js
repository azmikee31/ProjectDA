import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// public
function ProtectedRouter() {
  const { useInfo } = useSelector((state) => state.userLogin);

  return useInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}

// admin router protection
function AdminProtectedRouter() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token && userInfo?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/*" />
  );
}

export { ProtectedRouter, AdminProtectedRouter };
