import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

// CREATE TEAM  (Allowed: super_admin, company_admin)
export const createTeam = async (req, res) => {
  try {
    const companyId = req.user.company;

    if (!companyId)
      return res.status(400).json({ message: "User has no company assigned" });

    // Only admins can create teams
    if (!["superAdmin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only admins can create teams" });
    }

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Team name is required" });

    // Company scoped uniqueness
    const existing = await Team.findOne({ name, company: companyId });
    if (existing)
      return res.status(400).json({
        message: "A team with this name already exists in your company",
      });

    const team = await Team.create({
      name,
      company: companyId,
      members: [],
    });

    return res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (err) {
    console.error("createTeam error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// ADD MEMBER TO TEAM (Allowed: super_admin, company_admin)
export const addMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    // Admin check
    if (!["superAdmin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only admins can add members" });
    }

    const companyId = req.user.company;

    // 1) Get team
    const team = await Team.findById(teamId);
    if (!team)
      return res.status(404).json({ message: "Team not found" });

    // 2) Team must belong to same company
    if (team.company.toString() !== companyId.toString()) {
      return res.status(403).json({
        message: "Cannot modify a team from another company",
      });
    }

    // 3) Fetch user
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Must belong to same company
    if (user.company.toString() !== companyId.toString()) {
      return res.status(403).json({ message: "User not in your company" });
    }

    if (user.role !== "employee") {
      return res.status(400).json({
        message: "Only employees can be added to teams",
      });
    }

    if (!user.active) {
      return res.status(400).json({
        message: "Cannot add inactive employee to team",
      });
    }

    // 4) Prevent duplicate membership
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }

    // Attach team to the user
    user.team = team._id;
    await user.save();

    return res.json({
      message: "Member added successfully",
      team,
    });
  } catch (err) {
    console.error("addMember error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// GET ALL TEAMS IN MY COMPANY (Allowed: super_admin, company_admin)
export const getMyTeams = async (req, res) => {
  try {
    const companyId = req.user.company;

    if (!["superAdmin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Admins only" });
    }

    const teams = await Team.find({ company: companyId })
      .populate("members", "name email role active")
      .sort({ createdAt: -1 });

    return res.json(teams);
  } catch (err) {
    console.error("getMyTeams error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// GET MY TEAM (Allowed: employee)
export const getMyTeam = async (req, res) => {
  try {
    const userId = req.user._id;
    const companyId = req.user.company;

    const team = await Team.findOne({
      members: userId,
      company: companyId,
    })
      .populate("members", "name email role active")
      .sort({ createdAt: -1 });

    if (!team)
      return res.status(404).json({ message: "You are not assigned to any team" });

    return res.json(team);
  } catch (err) {
    console.error("getMyTeam error:", err);
    return res.status(500).json({ message: err.message });
  }
};
