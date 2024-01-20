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
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
export default function Navbaar({CURRENT_USER,USER_TYPES}) {

    const [login, setlogin] = useState(false)
    const [state, setState] = useState({})
    const [searchKey, setsearchKey] = useState('');
    console.log("USER_TYPES IN navbar",USER_TYPES);

    const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  const handleCalculatorClick = () => {
    setShowCalculatorModal(true);
  };

  const handleCloseCalculatorModal = () => {
    setShowCalculatorModal(false);
  };

    return (
        <div>

        </div>
    )
}

function AuthorizedElement({ CURRENT_USER, children, allowedUserTypes }) {
    const isUserAuthorized = allowedUserTypes.includes(CURRENT_USER);
  
    if (isUserAuthorized) {
      return <>{children}</>;
    } 
  } 
