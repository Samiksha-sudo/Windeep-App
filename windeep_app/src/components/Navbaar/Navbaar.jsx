import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl } from 'react-bootstrap';
import { MdAccountBox, MdAccountCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { getStoreState, setStoreState } from '../../store/shared';
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Navbaar() {
    let token = localStorage.getItem('_token');
    console.log("token", localStorage.getItem('_token'));
    // const UserToken = getStoreState("loggedInUserReducer");
    const UserToken = useSelector((state) => state.loggedInUserReducer);
    const logout = () => {
      setStoreState("USER_LOGOUT",{})
      localStorage.removeItem('_token');
    }

    return (
      <div>
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-dark " style={{ background: '#000000' }}>
            <div className="container-fluid">
              <Link className="navbar-brand font-weight-bold" to="/" style={{ fontSize: "1.6rem" }}>
                Win<span style={{ color: "red" }}>Deep</span>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
  
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" activclassname="active_navbar" to="/">
                      Home
                    </NavLink>
                  </li>
                  {UserToken.isUserLoggedIn ? (
                    <>
                      {UserToken.isAdmin && 
                      <>
                        <li className="nav-item ml-3">
                          <NavLink className="nav-link" activclassname="active_navbar" to="/member">
                            Member
                          </NavLink>
                        </li>
                        <li className="nav-item ml-3">
                          <NavLink className="nav-link" activclassname="active_navbar" to="/add">
                            Add
                          </NavLink>
                        </li>
                      </>
                      }
                      <li className="nav-item ml-auto">
                        <NavLink className="nav-link" activclassname="active_navbar" to="/" onClick={()=>logout()}>
                          Logout
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item ml-3">
                        <NavLink className="nav-link" activclassname="active_navbar" to="/member/login">
                          Member Login
                        </NavLink>
                      </li>
                      <li className="nav-item ml-3">
                        <NavLink className="nav-link" activclassname="active_navbar" to="/admin/login">
                          Admin Login
                        </NavLink>
                      </li>
                      <li className="nav-item ml-3">
                        <NavLink className="nav-link" activclassname="active_navbar" to="/add">
                          Member SignUp
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
