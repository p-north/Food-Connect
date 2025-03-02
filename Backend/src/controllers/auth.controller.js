import bcrypt from "bcryptjs";
import crypto from "crypto";
import client from "../database/connectDB.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../utils/email.js";

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

    const user = await client.query(query, values);

    
    // get the userID
    const user_ID = await client.query(
        'SELECT id FROM users WHERE verification_token = $1;',
        [verificationToken]  // Pass as a parameter to prevent SQL injection
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
async function verifyEmail() {}
async function handleLogin() {}
async function handleLogout() {}
async function forgotPassword() {}
async function resetPassword() {}
async function checkAuth() {}

export {
  handleLogout,
  verifyEmail,
  handleLogin,
  handleSignUp,
  forgotPassword,
  resetPassword,
  checkAuth,
};
