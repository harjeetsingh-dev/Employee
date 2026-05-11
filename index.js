const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const ejs = require('ejs');


const dotenv = require('dotenv');
dotenv.config();
// Models
const Employee = require('./models/employee');
const User = require('./models/user');  

// Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

//express session and connect-mongo
const session = require('express-session');
const MongoStore = require("connect-mongo");

app.listen(port, () => {
  console.log(`server Running on port ${port}`);
});


//Database connection
mongoose.connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// const store = MongoStore.create({
//   mongoUrl: "mongodb://127.0.0.1:27017/employeeDB",
//   crypto: {
//     secret: process.env.SECRET || "mySecretKey"
//   },
//   touchAfter: 24 * 60 * 60 // 24 hours
// });


// Express-Session configuration
app.use(session({
  secret: process.env.SECRET || "mySecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));


// Static files
app.use(express.json());
app.use(express.static('public'));


// User Routes
app.use("/", userRoutes);

//Employee Routes
app.use("/", employeeRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Employee Management API is running');
});

