import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";



export default function Logout() {
  const navigate = useNavigate();


  useEffect(() => {
    console.log("in useEffect")
    localStorage.removeItem('_token');
    navigate("/")
  }, [])


  return (
    <>
          
    </>
  );
}
