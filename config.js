require("dotenv").config();

const DB_URI = process.env.DB_URI;
//  DB_URI =
//   "mongodb+srv://uudemy626_db_user:vAPUlnIRd9rRZXLX@cluster0.wtfohvy.mongodb.net/?appName=Cluster0";


// const API = "http://localhost:3000/api";

const API = process.env.API;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;



module.exports = {
  DB_URI,

  API,

  CLOUDINARY_CLOUD_NAME,

  CLOUDINARY_API_KEY,

  CLOUDINARY_API_SECRET,

  GOOGLE_CLIENT_ID,

  GOOGLE_CLIENT_SECRET,

  NEXTAUTH_SECRET,

  RAZORPAY_KEY_ID,

  RAZORPAY_KEY_SECRET,

  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,

  GMAIL_USER,
  GMAIL_APP_PASS,


  GOOGLE_API_KEY,
};

//sb-drhne26200129@personal.example.com

