const jwt = require('jsonwebtoken');
const User = require('../models/userAuth.model');

const protectRoute = async(req, res, next) =>{
          try {
                    const token = req.cookies.token;
                    if(!token){
                              return res.status(401).json({
                                        message: "Unauthorized",
                                        success: false
                              })
                    }

                    const decoded = jwt.verify(token, process.env.JWT_SECRET);

                    if(!decoded){
                              return res.status(401).json({
                                        message: "Unauthorized",
                                        success: false
                              })
                    }

                    const user= await User.findById(decoded.userId);
                    if(!user){
                              return res.status(401).json({
                                        message: "Unauthorized",
                                        success: false
                              })
                    }

                    req.user = user;

                    next();

          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    })
          }
}

module.exports = protectRoute;