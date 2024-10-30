const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const Nid = require("./models/nidModel"); // Import the Nid model
const userModel = require("./models/userModel"); // Import the user model
const bloodRequestRoutes = require("./routes/bloodRequests"); // Import the route

// dot config
dotenv.config();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://blood-bank-management-system-e1vmac1nq-nuradnans-projects.vercel.app",
// ];

const allowedOrigins = [
  "https://blood-bank-management-system-drab.vercel.app",
  "https://blood-bank-management-system-e1vmac1nq-nuradnans-projects.vercel.app",
];

// MongoDB connection
connectDB()
  .then(() => {
    console.log("Database connected successfully".green);
  })
  .catch(() => {
    console.error("Database connection failed".red);
  });

// REST object
const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If you're using cookies
  })
);
app.use(morgan("dev"));

// Routes
// Use the route
app.use("/api/v1/blood-requests", bloodRequestRoutes);

// Test route
app.use("/api/v1/test", require("./routes/testRouts"));

// Register route
app.use("/api/v1/auth", require("./routes/authRoutes"));

// Inventory route
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

// Analytics route
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));

// Admin route
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Donor details route
app.use("/api/v1/donors", require("./routes/donorRoutes")); // Added route for donor details

// Server port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(
    `Node server is running in ${process.env.DEV_MODE} mode on port ${PORT}`
      .bgBlue.white
  );
});
