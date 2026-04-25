import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD;

export const signAdminToken = () =>
  jwt.sign({ role: "admin" }, getJwtSecret(), { expiresIn: "1h" });

export const requireAdmin = (req, res, next) => {
  const token = req.header("x-admin-token");
  const jwtSecret = getJwtSecret();

  if (!jwtSecret) {
    return res.status(500).json({ message: "Admin auth is not configured." });
  }

  if (!token) {
    return res.status(401).json({ message: "Admin login required." });
  }

  try {
    req.admin = jwt.verify(token, jwtSecret);
    next();
  } catch {
    return res.status(401).json({ message: "Admin session expired. Please login again." });
  }
};
