import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const isCustomAuth = token?.length < 500;

    let decodedToken;

    if (token && isCustomAuth) {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } else {
      decodedToken = jwt.decode(token);
    }

    req.userId = decodedToken?.id || decodedToken?.sub;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticateUser;