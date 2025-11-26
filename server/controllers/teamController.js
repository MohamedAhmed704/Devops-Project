import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

<<<<<<< HEAD
// CREATE TEAM  (Allowed: super_admin, company_admin)
export const createTeam = async (req, res) => {
=======
// CREATE TEAM (ADMIN ONLY)
export const createTeam = async (req, res) => {
  const { name } = req.body;
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
  try {
    const companyId = req.user.company;

    if (!companyId)
      return res.status(400).json({ message: "User has no company assigned" });

<<<<<<< HEAD
    // Only admins can create teams
    if (!["super_admin", "company_admin"].includes(req.user.role)) {
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
=======
    // Company-scoped uniqueness
    const existing = await Team.findOne({ name, company: companyId });
    if (existing)
      return res
        .status(400)
        .json({ message: "A team with this name already exists for this company" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

    const team = await Team.create({
      name,
      company: companyId,
<<<<<<< HEAD
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
    if (!["super_admin", "company_admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Only admins can add members" });
    }

    const companyId = req.user.company;

=======
      admin: req.user._id,
      members: [], // initialize empty array
    });

    return res.status(201).json(team);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ADD MEMBER TO TEAM
export const addMember = async (req, res) => {
  const { teamId, userId } = req.body;

  try {
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    // 1) Get team
    const team = await Team.findById(teamId);
    if (!team)
      return res.status(404).json({ message: "Team not found" });

<<<<<<< HEAD
    // 2) Team must belong to same company
    if (team.company.toString() !== companyId.toString()) {
      return res.status(403).json({
        message: "Cannot modify a team from another company",
      });
    }

    // 3) Fetch user
=======
    // 2) Ensure team belongs to same company
    if (team.company.toString() !== req.user.company.toString()) {
      return res.status(403).json({
        message: "You cannot modify a team from another company",
      });
    }

    // 3) Only the team admin can add members
    if (team.admin.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the team admin can add members" });
    }

    // 4) Fetch user
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

<<<<<<< HEAD
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
=======
    // 5) Ensure user belongs to same company
    if (user.company.toString() !== req.user.company.toString()) {
      return res.status(403).json({
        message: "User is not part of your company",
      });
    }

    // 6) Prevent duplicates
    if (!team.members.some((m) => m.toString() === userId.toString())) {
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
      team.members.push(userId);
      await team.save();
    }

<<<<<<< HEAD
    // Attach team to the user
=======
    // 7) Connect user -> team
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    user.team = team._id;
    await user.save();

    return res.json({
      message: "Member added successfully",
      team,
    });
<<<<<<< HEAD
  } catch (err) {
    console.error("addMember error:", err);
    return res.status(500).json({ message: err.message });
  }
};

// GET ALL TEAMS IN MY COMPANY (Allowed: super_admin, company_admin)
=======
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// GET ALL TEAMS IN MY COMPANY (Admin Only)

>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
export const getMyTeams = async (req, res) => {
  try {
    const companyId = req.user.company;

<<<<<<< HEAD
    if (!["super_admin", "company_admin"].includes(req.user.role)) {
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
=======
    const teams = await Team.find({ company: companyId })
      .populate("members", "name email role")
      .populate("admin", "name email");

    return res.json(teams);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET MY TEAM (Employee Route)
export const getMyTeam = async (req, res) => {
  try {
    const team = await Team.findOne({
      members: req.user._id,
      company: req.user.company,
    })
      .populate("members", "name email role")
      .populate("admin", "name email");
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

    if (!team)
      return res.status(404).json({ message: "You are not assigned to any team" });

    return res.json(team);
<<<<<<< HEAD
  } catch (err) {
    console.error("getMyTeam error:", err);
    return res.status(500).json({ message: err.message });
=======
  } catch (error) {
    return res.status(500).json({ message: error.message });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
  }
};
