import React,{useState} from 'react'

import Swal from 'sweetalert2'

export default function Footer() {
    const [stateemail, setemail] = useState('')

    return (
        <>
            <div className=' text-white pt-4' style={{backgroundColor:"black"}}>
                <div className='container'>
                    <div className='d-flex justify-content-around row text-center'>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <h5>About Company</h5>
                            <ul style={{listStyle:"none"}} className='mt-3'>
                                <li>NeoSOFT Technologies is here at your quick and easy service for shopping.</li>
                            </ul>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <h5 className=''>Contact Information</h5>
                            <ul style={{listStyle:"none"}} className='mt-3'>
                                <li>Email: contact@neosofttech.com</li>
                                <li>Phone: +91 0000000000</li>
                                <li>MUMBAI, INDIA</li>
                            </ul>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <h5>Information</h5>
                            <ul style={{listStyle:"none"}} className='mt-3'>
                                <li><a href='images/terms.pdf' target='_blank'>Terms and Conditions</a></li>
                                <li>Guarantee and Return Policy</li>
                                <li>Contact Us</li>
                                <li>Privacy Policy</li>
                                <li> <a href="https://maps.google.com/?cid=3558002934033666227&entry=gps" target="_blank">Locate Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='text-white text-center'>© 2022 NeoSOFT Technologies All rights reserved | Designed By <span className='font-weight-bold'>Samiksha kad</span></div>
                </div>
            </div>
        </>
    )
}
