const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
//dot config
dotenv.config();

const allowedOrigins = [
  "https://blood-bank-management-system-drab.vercel.app",
  "https://blood-bank-management-system-e1vmac1nq-nuradnans-projects.vercel.app",
];
// mongodb connection
connectDB()
  .then(() => {})
  .catch(() => {});

// rest object
const app = express();

// middlewares
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

// routs
// 1 test routs
app.use("/api/v1/test", require("./routes/testRouts"));

// register route
app.use("/api/v1/auth", require("./routes/authRoutes"));

// inventory route
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

// analytics route
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));

// admin route
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node server is running In ${process.env.DEV_MODE} Mode on ${process.env.PORT} port`
      .bgBlue.white
  );
});
