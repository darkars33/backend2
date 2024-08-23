const jwt= require('jsonwebtoken');

const generateToken = (userId, res) =>{
          try {
                    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
                              expiresIn: '15d'
                    })

                    res.cookie('token', token, {
                              httpOnly: true,
                              maxAge: 15*24*60*60*1000,
                              secure: process.env.NODE_ENV === 'development'
                    })

          } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                              message: error.message,
                              success: false
                    })
          }
}

module.exports = generateToken;