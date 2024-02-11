import express from "express";
import registerModel from "../db/RegisterSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import bcrypt from "bcrypt";
import { sequelize, QueryTypes } from '../config/connection.js';

const saltRounds = 10;
const jwtSecret = "windeepApp";
const memberRoutes = express.Router();
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your email",
    pass: "your password",
  },
});

const DIR = "../frontend/public/images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "user" + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
memberRoutes.post("/registerMember", async (req, res) => {
    let passwordHash = "";
    console.log("---------------------------------------->",req.body)
    // Hash the password with the generated salt
    await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          console.error('Error generating hash:', err);
        } else {
            passwordHash = hash
            console.log('Generated hash:', passwordHash);
          
        }
      });
    console.log("password",passwordHash)
    console.log("request body in member", req.body);
    let query = `SELECT count(member_id) as count FROM member_details where aadhar_card = "${req.body.aadharCard}";`;
    let result = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log("query line 51", JSON.stringify(query));
    console.log("result line 52-->", JSON.stringify(result));
    if (result[0].count == 0) {
      let query = `SELECT count(pan_card) as count FROM member_details where pan_card = "${req.body.panCard}";`;
      let result = await sequelize.query(query, { type: QueryTypes.SELECT });
      console.log("query line 58", JSON.stringify(query));
      console.log("result line 59-->", JSON.stringify(result));
      if (result[0].count == 0) {
        let query = `SELECT count(account_number) as count FROM member_details where account_number = "${req.body.accountNumber}";`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 63", JSON.stringify(query));
        console.log("result line 64-->", JSON.stringify(result));
        if (result[0].count == 0) {
            const newMemberId = await getNewMemberId();
            let insertQuery = `INSERT INTO windeep_finance.member_details (member_id, name, email, password, contact_no, aadhar_card, pan_card, ifsc_code, account_number, bank_address) VALUES ('${newMemberId}', '${req.body.fullName}', '${req.body.email}', '${passwordHash}', '${req.body.mobile}', '${req.body.aadharCard}', '${req.body.panCard}', '${req.body.ifsc}', '${req.body.accountNumber}', '${req.body.bankAddress}');`;
            let insertResult = await sequelize.query(insertQuery, { type: QueryTypes.INSERT });
            console.log("query line 78", JSON.stringify(insertQuery));
            console.log("result line 79-->", JSON.stringify(insertResult));

            let data = {
                email:req.body.email,
                password:passwordHash,
                memberId: newMemberId,
                isAdmin:false
            }

            const token = encryptData(data);
                console.log("token", token)
  
            res.json({ err: 1, msg: "Member registered successfully", memberId: newMemberId,token });
        } else {
          res.json({ err: 0, msg: "Account Number already exist" });
        }
      } else {
        res.json({ err: 0, msg: "Pan Number already exist" });
      }
    } else {
      res.json({ err: 0, msg: "Aadhar Number already exist" });
    }
  
});
memberRoutes.post("/forgetservice", (req, res) => {
  // check if email exsist in db
  registerModel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Something went wrong in checking data" });
    } else if (data == null) {
      res.json({ err: 1, msg: "User not found" });
    } else {
      // if email exsist create otp and send mail
      let otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      let mailOptions = {
        from: "kadsamiksha347@gmail.com",
        to: req.body.email,
        subject: " Password reset",
        html: `<!DOCTYPE html>
                <html>
                <head>
                <style>
                .ot{
                    color:red;
                    font-weight: bold;
                }
                .n{
                    font-weight: bold;
                    font-size: 20px;
                }
                .ot1{
                    font-weight: bold;
                    color:red;
                    font-size: 25px;
                }
                </style>
                </head>
                <body>
                <h1>Neo<span class="ot1">STORE</span></h1>
                <hr/>
                Hello <span class="n"> ${
                  data.firstname + " " + data.lastname
                } </span>,
                <div>A password reset for your account was requested.</div>
               <div> Your OTP for Neo<span class="ot">STORE</span> password reset is <span class="ot1">${otp}</span> </div>
               <div>Note that this OTP is valid for 24 hours. After the time limit has expired, you will have to resubmit the request for a password reset.</div> <br/>
               <div>If you did not make this request, please Contact Us. </div>
                </body>
    </html>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json({ err: 0, otp: otp });
    }
  });
});
memberRoutes.post("/emailSubscribeService", (req, res) => {
  // sending email

  let mailOptions = {
    from: "kadsamiksha347@gmail.com",
    to: req.body.email,
    subject: "Subscription",
    text: "Thankyou for Subscribing!!!!!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json({ err: 0, msg: "Email Send successfully" });
});
memberRoutes.post("/resetService", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  registerModel.updateOne(
    { email: req.body.email },
    { $set: { password: req.body.password } },
    (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Something went wrong in checking data" });
      } else {
        res.json({ err: 0, msg: "Password updated successfully!!" });
      }
    }
  );
});
memberRoutes.post("/changePaswordService", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  registerModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: req.body.password } },
    { new: true },
    (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Something went wrong in checking data" });
      } else {
        const token = encryptData(data);
        res.json({
          err: 0,
          msg: "Password updated successfully!!",
          token: token,
        });
      }
    }
  );
});
memberRoutes.post("/validate", (req, res) => {
  let hashbcrypt = false;
  registerModel.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // checks if email exsist in db checks bcrypted password and pass token in localstorage
      data.map((ele) => {
        if (ele.email === req.body.email) {
          hashbcrypt = bcrypt.compareSync(req.body.password, ele.password);
          if (hashbcrypt) {
            const token = encryptData(ele);
            res.json({ err: 0, msg: "Login Success", token: token });
          }
        }
      });
      // if(pass does not match )
      if (!hashbcrypt) {
        res.json({ err: 1, msg: "Email or Password does not Match" });
      }
    }
  });
});
memberRoutes.post("/profileeditService", (req, res) => {
  registerModel.findOneAndUpdate(
    { email: req.body.originalEmail },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        mobile: req.body.mobile,
        email: req.body.email,
      },
    },
    { new: true },
    (err, data) => {
      if (err) throw err;
      else {
        const token = encryptData(data);
        res.json({ err: 0, msg: "Address added", token: token, values: data });
      }
    }
  );
});

memberRoutes.post("/addAddressService", (req, res) => {
  // let useremail = req.params.email
  registerModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { addresses: req.body.data } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const token = encryptData(data);
        res.json({ err: 0, msg: "Address added", token: token });
      }
    }
  );
});
memberRoutes.post(
  "/profilePicService",
  upload.single("profileImg"),
  (req, res) => {
    registerModel.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          profilepic: req.file.filename,
        },
      },
      { new: true },
      (err, data) => {
        if (err) throw err;
        else {
          const token = encryptData(data);
          res.json({
            err: 0,
            msg: "Profile Pic Updated",
            token: token,
            values: data,
          });
        }
      }
    );
  }
);
memberRoutes.post("/cartSaveService", (req, res) => {
  console.log(req.body, "line 218");
  registerModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { cart: req.body.data } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        const token = encryptData(data);
        res.json({ err: 0, msg: "cart added", token: token });
      }
    }
  );
});

const encryptData = (data) => {
  let pay = {
    ...data._doc,
  };
  const token = jwt.sign(pay, jwtSecret, { expiresIn: 360000 });
  return token;
};

const getNewMemberId = async () => {
    // Retrieve the last member ID from the database
    const lastMemberIdQuery = "SELECT member_id FROM member_details ORDER BY member_id DESC LIMIT 1;";
    const lastMemberIdResult = await sequelize.query(lastMemberIdQuery, { type: QueryTypes.SELECT });
  
    if (lastMemberIdResult.length > 0) {
      // Extract the numeric part of the last member ID
      const lastIdNumericPart = parseInt(lastMemberIdResult[0].member_id.replace("MEMB", ""), 10);
  
      // Increment the numeric part and format it back to the member ID format
      const newNumericPart = lastIdNumericPart + 1;
      const newMemberId = `MEMB${newNumericPart.toString().padStart(5, "0")}WD`;
  
      return newMemberId;
    } else {
      // If there are no existing members, start with the initial member ID
      return "MEMB00001WD";
    }
  };

export default memberRoutes;
