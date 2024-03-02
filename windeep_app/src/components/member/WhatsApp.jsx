import React, { useEffect, useState } from 'react'
import styles from "./BasicInfo.module.css";
import { TablePagination,Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
// import {memberDetails} from "../../utils/database/data"
import { useSelector } from 'react-redux';
import image2 from  "../../assets/images/Vanilla-1.4s-280px.gif"
// ./assets/images/Vanilla-1.4s-280px.gif
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import EditIcon from "@mui/icons-material/Edit";
export default function WhatsApp() {
    const columns = [
        { id: "mobile", label: "Mobile", minWidth: 170 },
        
        { id: "notification", label: "Notification", minWidth: 100 },
      ];

    return (
        <>
 <Button variant='contained' sx={{ margin: "2%"}}>Notifications</Button>
<Paper sx={{ width: "80%", padding: "1%", margin: "auto" }}>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    {columns.map((ele) => (
                      <th key={ele.label}>{ele.label} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* {viewRequests.Pending.length > 0 ? (
                    viewRequests.Pending.map((fle) => ( */}
                      <tr  style={{ cursor: "pointer" }}>
                        <td>data</td>
                        <td>data</td>

                      </tr>
                    {/* ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length}>No data available</td>
                    </tr>
                  )} */}
                </tbody>
              </table>
          </Paper>
         </>  
    )
} 



