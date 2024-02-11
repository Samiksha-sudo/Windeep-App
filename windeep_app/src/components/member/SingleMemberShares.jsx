import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import Button from "@mui/material/Button";
import {
  Paper,
  TablePagination  ,
  TextField,
  Grid,
  Alert
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import image1 from "../../assets/images/photoImage.jpg";
import styles from "./BasicInfo.module.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function SingleMembershares({ CURRENT_USER, USER_TYPES }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const columns = [
    { id: "date", label: "Date", minWidth: 170 },
    {
      id: "monthly_contribution",
      label: "Monthly Contribution",
      minWidth: 100,
    },
    { id: "total_contribution", label: "Total Contribution", minWidth: 100 },
    { id: "bonus", label: "Bonus", minWidth: 100 },
    { id: "remarks", label: "Remarks", minWidth: 100 },
    { id: "updatedBy", label: "Updated By", minWidth: 100 },
    { id: "adminRemarks", label: "Admin Remarks", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const [data, setData] = useState([]);
  const mystyles = {
    helperText: {
      color: "red", // Apply red color to the helper text
    },
  };

  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    date: new Date(), // Initialize date with current date
    member_id: "",
    share_id: "",
    monthly_contribution: "",
    total_contribution: "",
    bonus: "",
    remarks: "",
    admin_remarks: "",
  });
  const [errors, setErrors] = useState({
    errdate: "",
    errmonthlyContribution: "",
    errtotalContribution:"",
    submit_error: ""
});

  const [totalShares, setTotalShares] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false); // New state variable

  useEffect(() => {
    const limit = rowsPerPage;
    const offset = page * rowsPerPage;
  
    fetch("http://localhost:9000/member/shares", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        limit: limit,
        offset: offset
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setData(result.payload[0].result);
        setTotalCount(result.payload[0].count)
        setErrors({ ...errors, submit_error: "" })
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id, page, rowsPerPage]);
  

  const handleEdit = (row) => {
    setFormData({
      id: row.id,
      date: row.start_date,
      member_id: row.member_id,
      monthly_contribution: row.monthly_contribution,
      total_contribution: row.total_contribution,
      bonus: row.bonus,
      remarks: row.remarks,
      admin_remarks: row.admin_remarks,
    });

    // Open the form for editing
    setIsGridOpen(true);
    setShowSubmitButton(false);
    setShowEditButton(true);
  };

  const handleEditShares = async () => {

    formData.member_id = data[0].member_id;
    formData.update_by = "Pradeep Khengare";

    const limit = rowsPerPage;
    const offset = page * rowsPerPage;

    await fetch("http://localhost:9000/member/shares/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {

        // Optionally, you can reset the form fields after successful insertion
        setFormData({
          id: "",
          date: new Date(),
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

      

    await fetch("http://localhost:9000/member/shares", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        limit: limit,
        offset: offset
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setData(result.payload[0].result);
        setTotalCount(result.payload[0].count);
        setErrors({ ...errors, submit_error: "" })
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    setIsGridOpen(false);
    await fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        setErrors({ ...errors, submit_error: "" });
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const handleDelete = async (row) => {
    formData.member_id = data[0].member_id;
    formData.update_by = "Pradeep Khengare";
  
    const limit = rowsPerPage;
    const offset = page * rowsPerPage;
  
    await fetch("http://localhost:9000/member/shares/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: row.id,
        member_id: data[0].member_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally, you can reset the form fields after successful deletion
        setFormData({
          id: "",
          date: new Date(),
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });
  
        // Check if all data has been deleted
        if (data.length === 0) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  
    // Fetch data again to update the table
    await fetch("http://localhost:9000/member/shares", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        limit: limit,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setData(result.payload[0].result);
        setTotalCount(result.payload[0].count);
        setErrors({ ...errors, submit_error: "" });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  
    // Fetch total monthly contribution again
    await fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  
    setIsGridOpen(false);
  };


  const handleAddShares = async () => {
    formData.update_by = "Pradeep Khengare";
    formData.created_by = "Pradeep Khengare";
    formData.member_id = id;

    const limit = rowsPerPage;
    const offset = page * rowsPerPage;

    if(formData.monthly_contribution != "" && formData.total_contribution != ""){
      await fetch("http://localhost:9000/member/shares/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
  
          // Optionally, you can reset the form fields after successful insertion
          setFormData({
            id: "",
            date: new Date(),
            member_id: "",
            share_id: "",
            monthly_contribution: "",
            total_contribution: "",
            bonus: "",
            remarks: "",
            admin_remarks: "",
          });
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
        setIsGridOpen(false);
        setErrors({ ...errors, submit_error: "" })
      } else{
        setIsGridOpen(true);
        setErrors({ ...errors, submit_error: "Enter Monthly Contribution and Total Contribution" });
    }
  
      await fetch("http://localhost:9000/member/shares", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          limit: limit,
          offset: offset
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Set the data received from the API to the state
          setData(result.payload[0].result);
          setTotalCount(result.payload[0].count);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    


    // Send the form data to the server


    ;
    await fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const generateActionButtons = (row) => (
    <>
      <IconButton color="error" onClick={() => handleDelete(row)}>
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary" onClick={() => handleEdit(row)}>
        <EditIcon />
      </IconButton>
    </>
  );

  const handleInputChange = (e) => {

    const { name, value } = e.target;
        let error = "";
        switch (name) {

            case "monthly_contribution":
                error = value.length > 0 ? "" : "Please Enter monthly Contribution";
                setErrors({ ...errors, errmonthlyContribution: error });
                break;

            case "total_contribution":
                error =  value.length > 0 ? "" : "Please Enter total Contribution";
                setErrors({ ...errors, errtotalContribution: error });
                break;

            default:
                break;
        }


    if (e && e.target) {
      // Handle changes from regular text fields
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (e) {
      // Handle changes from date picker
      setFormData((prevData) => ({
        ...prevData,
        date: e, // Assuming the date picker provides the date object directly
      }));
    }
  };

  const handleAddClick = async() => {
    setIsGridOpen(!isGridOpen);
    setShowSubmitButton(true);
    setShowEditButton(false);
    
    try {

      
        const response = await fetch("http://localhost:9000/member/shares/totalContribution", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        
        if (!result || !result.payload || !Array.isArray(result.payload) || !result.payload[0].result || !Array.isArray(result.payload[0].result) || result.payload[0].result.length === 0) {
          throw new Error('Invalid response data format');
        }
    
        const { monthly_contribution, totalContribution } = result.payload[0].result[0];
    
        setFormData({
          id: "",
          date: new Date(),
          member_id: "",
          monthly_contribution: monthly_contribution,
          total_contribution: totalContribution,
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });


      }

     catch (error) {
      console.error("API Error:", error);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/member/shares/totalData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id
          }),
        });
        const result = await response.json();
        console.log("API Response in totalData:", result.payload[0].result);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
  
    if (
      data.length > 0 &&
      data[0]?.member_details &&
      data[0].member_details.length > 0
    ) {
      fetchData();
  
      const firstRecord = data[0].member_details[0];
      console.log("firstRecord", firstRecord);
      setFormData({
        id: data[0].id,
        date: firstRecord.date,
        monthly_contribution: firstRecord.monthly_contribution,
        share_id: firstRecord.share_id,
        total_contribution: totalContributionData(
          data[0].monthly_contribution,
          data[0].member_details
        ),
        bonus: firstRecord.bonus,
        remarks: firstRecord.remarks,
        admin_remarks: firstRecord.admin_remarks,
      });
    }
  
    fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        setErrors({ ...errors, submit_error: "" });
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);
  

  const totalContributionData = (monthly_contribution, data) => {
    if (data.length === 0) {
      return monthly_contribution;
    }

    var totalMonthlyContribution = data.reduce(
      (total, entry) => total + parseInt(entry.monthly_contribution || 0, 10),
      0
    );

    // Update the second entry's monthly contribution
    totalMonthlyContribution = parseInt(totalMonthlyContribution);
    monthly_contribution = parseInt(monthly_contribution);

    return (totalMonthlyContribution + monthly_contribution).toString();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", padding: "1%" }}>
        {CURRENT_USER != "Normal User" ? (
          <Button variant="contained" sx={{ my: 2 }} onClick={handleAddClick}>
            Add
          </Button>
        ) : (
          ""
        )}
        <Button variant="outlined" sx={{ m: 2 }}>
          Total Shares{" "}
        </Button>{" "}
        :
        <Button variant="contained" sx={{ m: 2 }} >
          {" "}
          {totalShares}{" "}
        </Button>
        <br />
        {errors.submit_error.length !== 0 && (
                        <Alert severity="error">{errors.submit_error}</Alert>
                    )}
        {isGridOpen && (
          
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 1 }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date"
                    onChange={handleInputChange}
                    name="date"
                    placeholder="Select Date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                helperText={errors.errmonthlyContribution}
                name="monthly_contribution"
                value={formData.monthly_contribution}
                onChange={handleInputChange}
                label="Monthly Contribution"
                placeholder="Monthly Contribution"
                sx={{ marginLeft: "8px" }}
                className={styles.errorText}
                InputProps={{
                  classes: {
                    helperText: mystyles.helperText, // Apply custom style to helper text
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                helperText={errors.errtotalContribution}
                name="total_contribution"
                value={formData.total_contribution}
                onChange={handleInputChange}
                label="Total Contribution"
                placeholder="Total Contribution"
                sx={{ marginLeft: "8px" }}
                className={styles.errorText}
                InputProps={{
                  classes: {
                    helperText: mystyles.helperText, // Apply custom style to helper text
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                name="bonus"
                value={formData.bonus}
                onChange={handleInputChange}
                label="Bonus"
                placeholder="Bonus"
                sx={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                label="Remarks"
                placeholder="Remarks"
                sx={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                name="admin_remarks"
                value={formData.admin_remarks}
                onChange={handleInputChange}
                label="Admin Remarks"
                placeholder="Admin Remarks"
                sx={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <Button
                sx={{
                  ml: 2,
                }}
                variant="outlined"
                color="success"
                onClick={handleAddShares}
                style={{ display: showSubmitButton ? "inline-block" : "none" }}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                color="success"
                onClick={handleEditShares}
                style={{ display: showEditButton ? "inline-block" : "none" }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        )}
        <table class="table table-bordered">
          <thead>
            <tr>
              {columns.map((ele) => (
                <th key={ele.label}>{ele.label} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((fle) => (
                <>
                  <tr key={fle.date} style={{ cursor: "pointer" }}>
                    <td>{fle.start_date}</td>
                    <td>{fle.monthly_contribution}</td>
                    <td>{fle.total_contribution}</td>
                    <td>{fle.bonus}</td>
                    <td>{fle.remarks}</td>
                    <td>{fle.updated_by}</td>
                    <td>{fle.admin_remarks}</td>
                    <td>{generateActionButtons(fle)}</td>
                  </tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        {data.length &&         <TablePagination
      component="div"
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />}

      </Paper>
    </>
  );
}