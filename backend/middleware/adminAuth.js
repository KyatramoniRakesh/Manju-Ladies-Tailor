export const requireAdmin = (req, res, next) => {
  const token = req.header("x-admin-token");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ message: "ADMIN_PASSWORD is not configured." });
  }

  if (!token || token !== adminPassword) {
    return res.status(401).json({ message: "Admin login required." });
  }

  next();
};
