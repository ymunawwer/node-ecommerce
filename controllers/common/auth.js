
let checkToken = (req, res, next) => {
    console.log(req.headers)
    let token = req.headers['x-access-token'] || req.headers['auth']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
        console.log(token);
      jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
          return res.json({
            error_code:401,
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        error_code:422,
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };
  

  module.exports = {

    checkToken

  }