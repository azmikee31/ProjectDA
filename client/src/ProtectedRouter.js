import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {convertObject} from './Redux/Actions/helper'

// public
function ProtectedRouter() {
  const {userInfo} = useSelector((state) => state.userLogin);
  const checkData = convertObject(userInfo)
  return checkData?.token? <Outlet /> : <Navigate to="/login" />
}

// admin router protection
function AdminProtectedRouter() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const checkData = convertObject(userInfo)
  return checkData?.token && checkData.isAdmin? <Outlet />: <Navigate to="/"/>
}

export { ProtectedRouter, AdminProtectedRouter };
