import jwt from "jsonwebtoken";
const SECRET = 'SECr3t';  

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, decoded) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.userId = decoded.id;  // Adjusted this line to correctly set req.userId
          console.log("Exited from middleware")
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

export { authenticateJwt, SECRET };