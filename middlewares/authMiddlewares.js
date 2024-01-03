import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default authMiddleware;
