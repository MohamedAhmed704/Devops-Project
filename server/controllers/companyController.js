import Company from "../models/companyModel.js";
import User from "../models/userModel.js";

// GET COMPANY INFO (company_admin + employee)
export const getMyCompany = async (req, res) => {
  try {
    const companyId = req.user.company;

    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

    const company = await Company.findById(companyId);

    if (!company) return res.status(404).json({ message: "Company not found" });

    return res.json(company);
  } catch (err) {
    console.error("getMyCompany error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE COMPANY (company_admin only)
export const updateCompany = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only company admin can update the company" });
    }

    const companyId = req.user.company;
    const { name, address, metadata, active } = req.body;

    const updated = await Company.findByIdAndUpdate(
      companyId,
      { name, address, metadata, active },
      { new: true }
    );

    return res.json(updated);
  } catch (err) {
    console.error("updateCompany error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// SUPER ADMIN — GET ALL COMPANIES
export const getAllCompanies = async (req, res) => {
  try {
    if (req.user.role !== "superAdmin") {
      return res.status(403).json({ message: "Only super admin can access all companies" });
    }

    const companies = await Company.find().sort({ createdAt: -1 });

    return res.json(companies);
  } catch (err) {
    console.error("getAllCompanies error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// SUPER ADMIN — DEACTIVATE A COMPANY
export const deactivateCompany = async (req, res) => {
  try {
    if (req.user.role !== "superAdmin") {
      return res.status(403).json({ message: "Only super admin can deactivate companies" });
    }

    const { id } = req.params;

    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    company.active = false;
    await company.save();

    // deactivate all users inside company
    await User.updateMany({ company: id }, { active: false });

    return res.json({ message: "Company deactivated successfully" });
  } catch (err) {
    console.error("deactivateCompany error:", err);
    return res.status(500).json({ message: err.message });
  }
};
