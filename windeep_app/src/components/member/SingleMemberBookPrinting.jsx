import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import Button from "@mui/material/Button";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import image1 from "../../assets/images/photoImage.jpg";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function SingleMembershares({ CURRENT_USER, USER_TYPES }) {
  const navigate = useNavigate();
  console.log("CURRENT_USER", CURRENT_USER);
  const location = useLocation();
  const { id } = useParams();

  console.log(id);

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

  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    date: "",
    member_id: "",
    share_id: "",
    monthly_contribution: "",
    total_contribution: "",
    bonus: "",
    remarks: "",
    admin_remarks: "",
  });

  const [totalShares, setTotalShares] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false); // New state variable

  useEffect(() => {
    // Make the API request when the component mounts
    fetch("http://localhost:5000/member/shares", {
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
        console.log("API Response:", result.payload[0].result);
        // Set the data received from the API to the state
        setData(result.payload[0].result);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);

  const handleEdit = (row) => {
    console.log("in edit data", row.member_id);
    console.log("in edit", formData);

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
    console.log("in edit data", data[0].member_id);
    console.log("in edit", formData);
    formData.member_id = data[0].member_id;
    formData.update_by = "Pradeep Khengare";

    await fetch("http://localhost:5000/member/shares/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data inserted successfully:", data);

        // Optionally, you can reset the form fields after successful insertion
        setFormData({
          id: "",
          date: "",
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });

        // Reload the page after successful submission
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

    await fetch("http://localhost:5000/member/shares", {
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
        console.log("API Response:", result.payload[0].result);
        // Set the data received from the API to the state
        setData(result.payload[0].result);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    setIsGridOpen(false);
    setTotalShares(totalshares());
  };

  const handleDelete = async (row) => {
    console.log("in edit data", data[0].member_id);
    console.log("in edit", formData);
    formData.member_id = data[0].member_id;
    formData.update_by = "Pradeep Khengare";

    await fetch("http://localhost:5000/member/shares/delete", {
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
        console.log("Data inserted successfully:", data);

        // Optionally, you can reset the form fields after successful insertion
        setFormData({
          id: "",
          date: "",
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });

        // Reload the page after successful submission
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

    await fetch("http://localhost:5000/member/shares", {
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
        console.log("API Response:", result.payload[0].result);
        // Set the data received from the API to the state
        setData(result.payload[0].result);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    setIsGridOpen(false);
    setTotalShares(totalshares());
  };

  const totalshares = () => {
    let totalMonthlyContribution = 0;
    let totalBonus = 0;

    console.log("data", data);

    // Check if data is available and not empty
    if (data && data.length > 0) {
      // Iterate through the data
      data.map((entry) => {
        totalMonthlyContribution += parseInt(entry.monthly_contribution) || 0; // Parse or default to 0
        totalBonus += parseInt(entry.bonus) || 0; // Parse or default to 0
      });

      // Output the results
      console.log("Total Monthly Contribution:", totalMonthlyContribution);
      console.log("Total Bonus:", totalBonus);

      // Calculate and return the grand total
      const grandTotal = totalMonthlyContribution + totalBonus;
      console.log("Grand Total:", grandTotal);
      return grandTotal;
    }

    return 0; // Return 0 if data is empty
  };

  const handleAddShares = async () => {
    formData.update_by = "Pradeep Khengare";
    formData.created_by = "Pradeep Khengare";
    formData.member_id = id;

    console.log("--------------------->", formData);

    // Send the form data to the server
    await fetch("http://localhost:5000/member/shares/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data inserted successfully:", data);

        // Optionally, you can reset the form fields after successful insertion
        setFormData({
          id: "",
          date: "",
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });

        // Reload the page after successful submission
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

    await fetch("http://localhost:5000/member/shares", {
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
        console.log("API Response:", result.payload[0].result);
        // Set the data received from the API to the state
        setData(result.payload[0].result);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
    setIsGridOpen(false);
    setTotalShares(totalshares());
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
        date: e.format("MM-DD-YYYY"), // Adjust the format as needed
      }));
    }
  };

  const handleAddClick = () => {
    setIsGridOpen(!isGridOpen);
    setShowSubmitButton(true);
    setShowEditButton(false);
    fetch("http://localhost:5000/member/shares/totalContribution", {
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
        console.log(
          "API Response handleAddClickhandleAddClickhandleAddClickhandleAddClickhandleAddClick:",
          result.payload[0].result
        );
        setFormData({
          id: "",
          date: "",
          member_id: "",
          monthly_contribution:
            result.payload[0].result[0].monthly_contribution,
          total_contribution: result.payload[0].result[0].totalContribution,
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };
  useEffect(() => {
    // Set initial values from the first record in the data array
    if (
      data.length > 0 &&
      data[0]?.member_details &&
      data[0].member_details.length > 0
    ) {
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

    setTotalShares(totalshares());
  }, [data]);

  const totalContributionData = (monthly_contribution, data) => {
    console.log("data ----->", data);
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
        <Button variant="contained" sx={{ m: 2 }} onClick={() => totalshares()}>
          {" "}
          {totalshares()}{" "}
        </Button>
        <br />
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
                name="monthly_contribution"
                value={formData.monthly_contribution}
                onChange={handleInputChange}
                label="Monthly Contribution"
                placeholder="Monthly Contribution"
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
                name="total_contribution"
                value={formData.total_contribution}
                onChange={handleInputChange}
                label="Total Contribution"
                placeholder="Total Contribution"
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
            {console.log("data in jsx", data)}
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
      </Paper>
    </>
  );
}
