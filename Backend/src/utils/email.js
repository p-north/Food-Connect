import dotenv from "dotenv";
import axios from "axios";
import sgMail from "@sendgrid/mail";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
} from "./emailTemplate.js";

dotenv.config();
const API_KEY = process.env.SENDGRID_KEY
sgMail.setApiKey(API_KEY);

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const msg = {
      to: recipient, // Change to your recipient
      from: "foodconnect-app@outlook.com", // Change to your verified sender
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };
    // send the email
    sgMail.send(msg).then(() => {
      console.log("Email sent");
    });
  } catch (error) {
    console.error("Error sending verification", error);
    throw new Error(`Error sending verification email: ${error}`);

  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}];
  try {
    const msg = {
      to: recipient, // Change to your recipient
      from: "foodconnect-app@outlook.com", // Change to your verified sender
      subject: "Welcome to FoodConnect - Let's Fight Food Waste Together!",
      html: WELCOME_TEMPLATE.replace(
        "{name}",
        name
      ),
    };
    // send the email
    sgMail.send(msg).then(() => {
      console.log("Email sent");
    });
    
  } catch (error) {
    console.error("Error sending verification", error);
    throw new Error(`Error sending verification email: ${error}`);

    
  }
};
 
