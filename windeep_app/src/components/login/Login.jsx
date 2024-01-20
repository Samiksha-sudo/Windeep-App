import React,{useState}   from 'react'
import image1 from '../../assets/images/IMG-20231211-WA0019.jpg';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import './Login.css';

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
        adminId: "",
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
  
            case "adminId":
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
        if (USER === "Admin User") {
            try {
                const response = await fetch('http://localhost:5000/admin/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: registerCredentials.email,
                        password: registerCredentials.password,
                    }),
                });
    
                const data = await response.json();

                console.log("datatattatat",data)
    
                if (response.ok) {
                    Swal.fire({
                            icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    // Admin logged in successfully, you can navigate or perform other actions here
                    console.log(data.message);
                    navigate('/');
                } else {
                    // Handle login error
                    Swal.fire({
                        icon: 'error',
                        title: data.error,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error in admin login:', error);
            }
        }
    };
    
    
    return (
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
                                    onBlur={handler}
                                    placeholder='Member Id' />
                                    <br/>
                                    <br/>

                                <input className='mt-4 input'
                                    type="password"
                                    name="password"
                                    onBlur={handler}
                                    placeholder='Password' />
                                    </>
                                    :                               
                                    <>
                                    <input
                                        className='mt-4 input'
                                        type="text"
                                        name="email"
                                        onBlur={handler}
                                        placeholder='Email'
                                    />

                                    <br/>
                                    <br/>

                                <input className='mt-4 input'
                                    type="password"
                                    name="password"
                                    onBlur={handler}
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
        
    )
}
