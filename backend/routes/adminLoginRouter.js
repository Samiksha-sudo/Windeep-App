// adminLoginRouter.js
import express from 'express';

const adminLoginRouter = express.Router();

import { sequelize, QueryTypes } from '../config/connection.js';

adminLoginRouter.post("/", async (req, res) => {
    try {
        console.log("request body in login", req.body);
        let query = `SELECT admin_id FROM admin_details where email = "${req.body.email}" and password = "${req.body.password}";`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ admin_id: result[0].admin_id}],message:"Admin Logged In successfully",error:"" });
        } else {
            res.status(401).json({payload:[{ admin_id: null}],message:"", error: "Invalid email or password" });
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

export default adminLoginRouter;
