import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormControl, NavDropdown } from 'react-bootstrap'
import { MdAccountBox, MdAccountCircle } from 'react-icons/md'
import { BiLogIn, BiLogOut, BiUserPlus } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Calculator from './Calculator.jsx'
import Modal from 'react-bootstrap/Modal';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
export default function Navbaar({CURRENT_USER,USER_TYPES}) {

    console.log("USER_TYPES IN navbar",USER_TYPES);

    let token = localStorage.getItem('_token')


    console.log("token",localStorage.getItem('_token'))

    return (
        <div>
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "black" }}>
          <div className="container-fluid">
                        <Link className="navbar-brand font-weight-bold" to="/" style={{ fontSize: "1.6rem" }}>Win<span style={{ color: "red" }}>Deep</span></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">

                                <li className="nav-item ">
                                <AuthorizedElement CURRENT_USER={CURRENT_USER} allowedUserTypes={[USER_TYPES.ADMIN_USER]}><NavLink className="nav-link" activclassname="active_navbar" to="/">Home</NavLink></AuthorizedElement>
                                </li>
                                {token !==null? 
                                <>
                                    <li className="nav-item ml-3">
                                    <AuthorizedElement CURRENT_USER={CURRENT_USER} allowedUserTypes={[USER_TYPES.ADMIN_USER]}><NavLink className="nav-link" activclassname="active_navbar" to="/member">Member</NavLink></AuthorizedElement>
                                    </li>
                                    <li className="nav-item ml-3">
                                    <AuthorizedElement  CURRENT_USER={CURRENT_USER} allowedUserTypes={[USER_TYPES.ADMIN_USER]}><NavLink className="nav-link" activclassname="active_navbar" to="/add">Add</NavLink></AuthorizedElement>
                                    </li>
                                    </>
                                :""}
                               
                            </ul>
                        </div>

                       
                        {token ==null?
                        
                            <NavDropdown title={<MdAccountBox style={{ backgroundColor: 'white', color: 'black', width: '30px', height: '27px' }} />} id="navbarScrollingDropdown" style={{ marginLeft: '1vw', width: '50px', height: '40px', backgroundColor: "white", borderRadius: '5px' }}>
                                <NavDropdown.Item ><Link to="/member/login" style={{ color: "black", textDecoration: "none" }} ><MdAccountCircle /> Member Login</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/admin/login" style={{ color: "black", textDecoration: "none" }} ><MdAccountCircle />&nbsp;&nbsp; Admin Login</Link></NavDropdown.Item>
                            </NavDropdown>
                        :
                        <NavDropdown title={<MdAccountBox style={{ backgroundColor: 'white', color: 'black', width: '30px', height: '27px' }} />} id="navbarScrollingDropdown" style={{ marginLeft: '1vw', width: '50px', height: '40px', backgroundColor: "white", borderRadius: '5px' }}>
                        <NavDropdown.Item ><Link to="/logout" style={{ color: "black", textDecoration: "none" }} ><MdAccountCircle /> Logout</Link></NavDropdown.Item>
                    </NavDropdown>
                        }

                    </div>
                </nav>
            </div>
        </div>
    )
}

function AuthorizedElement({ CURRENT_USER, children, allowedUserTypes }) {
    const isUserAuthorized = allowedUserTypes.includes(CURRENT_USER);
  
    if (isUserAuthorized) {
      return <>{children}</>;
    } 
  } 
