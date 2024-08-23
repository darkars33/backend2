const User = require('../models/useAuth.model');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const signUp = async (req, res) =>{
          try {
                    const {name, email, password} = req.body;
                    if(!name || !email || !password){
                              return res.status(400).json({
                                        message: "Please fill all the fields",
                                        success: false
                              })
                    }

                    const isExist = await User.findOne({email});
                    if(isExist){
                              return res.status(400).json({
                                        message: "User already exists",
                                        success: false
                              })
                    }
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    
                    const newUser = new User({
                              name,
                              email,
                              password: hashPassword
                    })

                    if(newUser){
                              generateToken(newUser._id, res);
                              const token = req.cookies.token
                              await newUser.save();
                              res.status(200).json({
                                        message: "User registered successfully",
                                        success: true,
                                        data: newUser,
                                        token: token
                              })
                    }

                     res.status(200).json({
                              message: "User registered successfully",
                              success: true,
                              data: newUser,
                              token: token
                    })

          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    })
          }
}

const logIn = async (req, res) =>{
          try {
                    const {email, password} = req.body;
                    if(!email || !password){
                              return res.status(400).json({
                                        message: "Please fill all the fields",
                                        success: false
                              })
                    }
                    const user = await User.findOne({email});
                    if(!user){
                              return res.status(400).json({
                                        message: "user not found",
                                        success: false
                              })
                    }
                    const isMatch = await bcrypt.compare(password, user.password);
                    if(!isMatch){
                              return res.status(400).json({
                                        message: "Invalid credentials",
                                        success: false
                              })
                    }
                    generateToken(user._id, res);
                    const token = req.cookies.token;
                    return res.status(200).json({
                              message: "User logged in successfully",
                              success: true,
                              data: user,
                              token: token
                    })

          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: "Internal Server Error",
                              success: false
                    })       
          }
}

module.exports = {signUp, logIn};