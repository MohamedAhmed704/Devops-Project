import User from "../models/userModel.js";

// GET ALL USERS IN COMPANY
// Allowed: super_admin, company_admin
export const getUsers = async (req, res) => {
  try {
    const companyId = req.user.company;

    if (!["super_admin", "company_admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only admins can view users" });
    }

    const users = await User.find({ company: companyId }).select("-password");

    return res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// CREATE EMPLOYEE
// Allowed: super_admin, company_admin
export const createEmployee = async (req, res) => {
  try {
    const companyId = req.user.company;

    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

    if (!["super_admin", "company_admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only admins can create employees" });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    // Prevent duplicate emails
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Allowed roles to create:
    const allowedRoles = ["employee", "company_admin"];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role assignment" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "employee",
      company: companyId,
      active: true,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
      },
    });
  } catch (err) {
    console.error("createEmployee error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// GET MY PROFILE
export const getMe = async (req, res) => {
  try {
    return res.json(req.user);
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: err.message });
  }
};
