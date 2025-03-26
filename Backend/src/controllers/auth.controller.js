import bcrypt from "bcryptjs";
import crypto from "crypto";
import client from "../database/connectDB.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/email.js";

async function handleSignUp(req, res) {
  const { email, password, name, accountType } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required!");
    }

    const userAlreadyExists = await client.query(
      `SELECT email FROM users WHERE email = $1;`,
      [email]
    );
    if (userAlreadyExists.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash the password
    // 12345=> $JBIC%iucbiq99

    const hashedPassword = await bcrypt.hash(password, 10);
    // generate a random token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // create a new user into the database
    const query = `
  INSERT INTO users (email, password, name, type_of_account, verification_token, verification_token_expires_at) 
  VALUES ($1, $2, $3, $4, $5, $6) 
  RETURNING *;
`;

    const values = [
      email,
      hashedPassword,
      name,
      accountType,
      verificationToken,
      new Date(Date.now() + 24 * 60 * 60 * 1000), // Convert to proper timestamp format
    ];

    // insert the values
    await client.query(query, values);

    // get the userID
    const user_ID = await client.query(
      "SELECT id FROM users WHERE verification_token = $1;",
      [verificationToken] // Pass as a parameter to prevent SQL injection
    );

    //jwt token
    generateTokenAndSetCookie(res, user_ID);

    // send a verification email with 6 digit code
    sendVerificationEmail(email, verificationToken);
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
async function verifyEmail(req, res) {
  const { code } = req.body;
  try {
    const user = await client.query(
      `SELECT * FROM users WHERE verification_token = $1 AND verification_token_expires_at > $2;`,
      [code, new Date()]
    );

    if (user.rowCount === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    const user_id = user.rows[0].id;
    const user_email = user.rows[0].email;
    const user_name = user.rows[0].name;

    // change the database
    // set is verified to true, verification token to null, token expires at to null
    // this indicates user is fully verified
    await client.query(
      `UPDATE users SET is_verified = $1, verification_token = $2, verification_token_expires_at = $3 WHERE users.id = $4`,
      [true, null, null, user_id]
    );

    await sendWelcomeEmail(user_email, user_name);

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    // validate user credentials
    const user = await client.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid Credentials or User does not exist.",
      });
    }

    const dbPassword = user.rows[0].password;
    const userID = user.rows[0].id;

    const isPasswordValid = await bcrypt.compare(password, dbPassword);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(res, userID);

    // set the last login to current date
    await client.query(`UPDATE users SET last_login = $1 WHERE id = $2;`, [
      new Date(),
      userID,
    ]);

    res.status(200).json({
      message: "Logged in successfully",
      accType: user.rows[0].type_of_account,
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(400).json({ success: false, message: error.message });
  }
}
async function handleLogout(req, res) {
  // clear the cookies
  res.clearCookie("token");
  res.status(200).json({ sucess: true, message: "Logged out successfully" });
}
async function checkAuth(req, res) {
  try {
    // use the decoded ID in the middleware
    const uID = req.userID;
    // validate user credentials
    const user = await client.query(`SELECT * FROM users WHERE id = $1;`, [
      uID,
    ]);

    if (user.rowCount === 0) {
      return res
        .status(400)
        .json({ sucess: false, message: "User does not exist." });
    }

    res.status(200).json({
      success: true,

    });


  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message});
  }
}
// async function forgotPassword(req, res) {
//   const {email} = req.body;

//   try {
//      // validate user credentials
//      const user = await client.query(
//       `SELECT * FROM users WHERE email = $1;`,
//       [email]
//     );

//     if(user.rowCount === 0){
//       return res.status(400).json({sucess: false, message: "User not found"});

//     }

//     // generate a reset token
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

//     // update the database
//     await client.query(`UPDATE users SET reset_password_token = $1, reset_password_expires_at = $2 WHERE email = $3;`, [resetToken, resetTokenExpiresAt, email]);

//     // send the email

//   } catch (error) {

//   }
// }
// async function resetPassword() {}

export { handleLogout, verifyEmail, handleLogin, handleSignUp, checkAuth };
