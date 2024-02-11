import React,{useState}   from 'react'
import image1 from '../../assets/images/IMG-20231211-WA0019.jpg';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import {jwtDecode} from 'jwt-decode';
import './Login.css';
import { AdminLogin,MemberLogin } from '../../config/LoginService'
import { setStoreState } from '../../store/shared';
export default function Login({USER}) { 
    console.log("user",USER);
    const navigate = useNavigate();

    const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

      const [errors, setErrors] = useState({
        errmemberId: "",
        erradminId:"",
        errpassword:"",
    });
    const [registerCredentials, setRegisterCredentials] = useState({
        memberId: "",
        email: "",
        password: "",
    });

      const handler = (event) => {
        const { name, value } = event.target;
        let error = "";
        switch (name) {
            case "memberId":
                error = regForName.test(value) ? "" : "Invalid MemberId";
                setErrors({ ...errors, errmemberId: error });
                break;
  
            case "email":
                error = regForName.test(value) ? "" : "Invalid AdminId";
                setErrors({ ...errors, processingFee: error });
                break;
  
            case "password":
                error = regForpassword.test(value) ? "" : "Invalid Password";
                setErrors({ ...errors, errAmountDisbursed: error });
                break;
  
            default:
                break;
        }
        setRegisterCredentials({ ...registerCredentials, [name]: value });
    };

    const handleLoginClick = async () => {
        try {
            console.log("in login",registerCredentials,USER)
           
                if (USER === "Admin User") {
                    if (registerCredentials.email !== '' && registerCredentials.password !== '') {
                        console.log("aaa")
                        AdminLogin({
                            email: registerCredentials.email,
                            password: registerCredentials.password,
                        })
                        .then(res=>{
                            console.log("datatattatat------------------->",res)
                            let decode = jwtDecode(res.data.payload[0].token)
                            setStoreState("USER_LOGIN",decode)
                            localStorage.setItem("_token", res.data.payload[0].token);
                            console.log("decode",decode)
                            navigate("/home")
                          
                        }). catch (error=> {
                            console.log("error in catch",error)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Email or Password does not match!',
                            })
                        })

                    }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email or Password does not match!',
                    })
                }
                }
                else{
                    if (registerCredentials.memberId !== '' && registerCredentials.password !== '') {
                        MemberLogin({
                            memberId: registerCredentials.memberId,
                            password: registerCredentials.password,
                        })
                        .then(res=>{
                                localStorage.setItem("_token", res.data.payload[0].token);
                                let decode = jwtDecode(res.data.payload[0].token)
                                console.log("datatattatat",decode)
                                navigate("/")
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Email or Password does not match!',
                        })
                    }
                }
            
        } catch (error) {
            console.error('Error in admin login:', error);
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          handleLoginClick();
        }
      };
    
    return (
        <>
      
        <div style={{backgroundColor:"white"}}>
    

            <div className="container mt-5">
                <div className="row login_box mb-5">

                    <div className=" col_box">
                        <img src="https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="..." />
                    </div>
                    <div className="col" >

                        <div className='container-fluid col_box'>
                            <div >
                            <img src={image1} className="col_box_2 mt-5" alt="logo"  />
                                <h2 className="heading_login mt-5 ">Login</h2>
                                <span className="mt-4 span mr-5">॥ संहतिःकार्यसाधीका ॥ सहाय समसुखदु:ख: ||</span> 
                                <div className="separator mt-4">
                                    <div class="line"></div>
                                    <div class="line"></div>
                                </div>
                                {
                                    USER == "Normal User" ? <>
                                    <input className='mt-4 input'
                                    type="text"
                                    name="memberId"
                                    value={registerCredentials.memberId}
                                    onChange={handler}
                                    onKeyPress={handleKeyPress}
                                    placeholder='Member Id' />
                                    <br/>
                                    <br/>

                                <input className='mt-4 input'
                                    type="password"
                                    name="password"
                                    value={registerCredentials.password}
                                    onChange={handler}
                                    onKeyPress={handleKeyPress}
                                    placeholder='Password' />
                                    </>
                                    :                               
                                    <>
                                    <input
                                        className='mt-4 input'
                                        type="text"
                                        name="email"
                                        value={registerCredentials.email}
                                        onChange={handler}
                                        onKeyPress={handleKeyPress}
                                        placeholder='Email'
                                    />

                                    <br/>
                                    <br/>

                                <input className='mt-4 input'
                                    type="password"
                                    name="password"
                                    value={registerCredentials.password}
                                    onChange={handler}
                                    onKeyPress={handleKeyPress}
                                    placeholder='Password' />

                                </>
                                }
                          

                                <br />
                                <br />

                                <button className='login_btn'  onClick={() => handleLoginClick()}>Login</button>


                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
       
    </>
    )
}
