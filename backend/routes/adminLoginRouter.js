// adminLoginRouter.js
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'  
const saltRounds = 10 
const jwtSecret = "windeepApp" 
const adminLoginRouter = express.Router();

import { sequelize, QueryTypes } from '../config/connection.js';

adminLoginRouter.post("/", async (req, res) => {
    try {
        let hashbcrypt = false;
        console.log("request body in login", req.body);
        let query1 = `SELECT admin_id, email, password FROM admin_details WHERE is_deleted = 0 and email = "${req.body.email}";`;
        let result1 = await sequelize.query(query1, { type: QueryTypes.SELECT });
        
        console.log("result line 16-->", JSON.stringify(result1));
        
        let loginSuccess = false;

        result1.forEach(ele => {
            hashbcrypt = bcrypt.compareSync(req.body.password, ele.password);
            if (hashbcrypt) {
                ele.isAdmin = true;
                console.log(ele)
                const token = encryptData(ele);
                console.log("token", token)
                res.json({ payload: [{ admin_id: ele.admin_id, token }], message: "Admin Logged In successfully", error: "" });
                loginSuccess = true; // Set the flag to true
            }
        });
        
        // Send response outside the loop
        if (!loginSuccess && result1.length < 0) {
            res.status(401).json({ payload: [{ admin_id: null }], message: "", error: "Invalid email or password" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

adminLoginRouter.post("/member", async (req, res) => {
    try {
        let hashbcrypt = false;
        console.log("request body in login", req.body);
        let query1 = `SELECT  member_id, password FROM member_details WHERE is_deleted = 0 and member_id = "${req.body.memberId}";`;
        let result1 = await sequelize.query(query1, { type: QueryTypes.SELECT });
        
        console.log("result line 16-->", JSON.stringify(result1));
        
        let loginSuccess = false;

        result1.forEach(ele => {
            hashbcrypt = bcrypt.compareSync(req.body.password, ele.password);
            if (hashbcrypt) {
                ele.isAdmin = false;
                console.log(ele)
                const token = encryptData(ele);
                console.log("token", token)
                res.json({ payload: [{ member_id: ele.member_id, token }], message: "Admin Logged In successfully", error: "" });
                loginSuccess = true; // Set the flag to true
            }
        });
        
        // Send response outside the loop
        if (!loginSuccess && result1.length < 0) {
            res.status(401).json({ payload: [{ member_id: null }], message: "", error: "Invalid email or password" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

adminLoginRouter.get("/home", async (req, res) => {
    try {
        console.log("request body in login", req.body);
        let query = `SELECT * FROM member_details;`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Admin Logged In successfully",error:"" });
        } else {
            res.status(401).json({payload:[{ admin_id: null}],message:"", error: "Invalid email or password" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

adminLoginRouter.get("/member/login", async (req, res) => {
    try {
        console.log("request body in login", req.body);
        let query = `SELECT * FROM member_details;`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Admin Logged In successfully",error:"" });
        } else {
            res.status(401).json({payload:[{ admin_id: null}],message:"", error: "Invalid email or password" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


const encryptData = (data) => {
    
    let pay={
        ...data
    }
    const token= jwt.sign(pay, jwtSecret,{expiresIn:"12h"});
    return token;
}

export default adminLoginRouter;
