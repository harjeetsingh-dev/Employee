const { Model } = require("mongoose");

// Authentication Middleware

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Please login first" });
    } else {
        next();
    }
};


// Admin Middleware 
module.exports.isAdmin = (req, res, next) => {
    if (req.session.userRole !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    } else {
        next();
    }
};

