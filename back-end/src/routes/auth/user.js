const jwt = require("jsonwebtoken");


function authenticate(req, res, next) {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];

  console.log(token)
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    console.log(token)
    const decoded = jwt.verify(token, "RandomText");
   
    req.id = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = authenticate;
