import Shift from "../models/shiftModel.js";
import User from "../models/userModel.js";
import Team from "../models/teamModel.js";

<<<<<<< HEAD
// Helpers
=======
// Helpers 
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
const MS_IN_24H = 24 * 60 * 60 * 1000;

const parseISODate = (iso) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
};

const validateStartEnd = (startISO, endISO) => {
  const start = parseISODate(startISO);
  const end = parseISODate(endISO);

<<<<<<< HEAD
  if (!start || !end) {
    return { ok: false, message: "Invalid ISO startDateTime or endDateTime" };
  }
  if (start >= end) {
    return { ok: false, message: "startDateTime must be before endDateTime" };
  }
  if (end - start > MS_IN_24H) {
    return { ok: false, message: "Shift cannot exceed 24 hours" };
  }
=======
  if (!start || !end) return { ok: false, message: "Invalid ISO startDateTime or endDateTime" };
  if (start >= end) return { ok: false, message: "startDateTime must be before endDateTime" };
  if (end - start > MS_IN_24H) return { ok: false, message: "Shift cannot exceed 24 hours" };
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

  return { ok: true, start, end };
};

<<<<<<< HEAD
// ===================================================
=======

// CREATE SHIFT

>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
export const createShift = async (req, res) => {
  try {
    const companyId = req.user.company;
    const adminId = req.user._id;

<<<<<<< HEAD
    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

    const { employeeId, startDateTime, endDateTime, notes } = req.body;

    const validation = validateStartEnd(startDateTime, endDateTime);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }
    const { start, end } = validation;

    // Check employee belongs to same company & is active employee
    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.company?.toString() !== companyId.toString()) {
      return res
        .status(403)
        .json({ message: "Employee does not belong to your company" });
    }

    if (employee.role !== "employee") {
      return res
        .status(400)
        .json({ message: "Shifts can only be assigned to employees" });
    }

    if (employee.active === false) {
      return res
        .status(400)
        .json({ message: "Cannot assign shift to inactive employee" });
    }

    // Check team (if employee has team) belongs to same company
=======
    const { employeeId, startDateTime, endDateTime, notes } = req.body;

    const validation = validateStartEnd(startDateTime, endDateTime);
    if (!validation.ok) return res.status(400).json({ message: validation.message });

    const { start, end } = validation;

    // Check employee belongs to same company
    const employee = await User.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (employee.company.toString() !== companyId.toString()) {
      return res.status(403).json({
        message: "Employee does not belong to your company",
      });
    }

    // Check team belongs to same company
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    let team = null;
    if (employee.team) {
      team = await Team.findById(employee.team);
      if (!team || team.company.toString() !== companyId.toString()) {
<<<<<<< HEAD
        return res
          .status(403)
          .json({ message: "Employee's team is not in your company" });
=======
        return res.status(403).json({ message: "Employee's team is not in your company" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
      }
    }

    // Overlap check
    const overlapping = await Shift.findOne({
      employee: employeeId,
      startDateTime: { $lt: end },
      endDateTime: { $gt: start },
    });
<<<<<<< HEAD

    if (overlapping) {
      return res
        .status(400)
        .json({ message: "Shift overlaps with an existing shift" });
=======
    if (overlapping) {
      return res.status(400).json({ message: "Shift overlaps with an existing shift" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    }

    const shift = await Shift.create({
      company: companyId,
      employee: employeeId,
      team: team ? team._id : null,
      startDateTime: start,
      endDateTime: end,
      createdBy: adminId,
      notes,
    });

    const populated = await Shift.findById(shift._id)
<<<<<<< HEAD
      .populate("employee", "name email role")
=======
      .populate("employee", "name email")
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
      .populate("team", "name");

    return res.status(201).json(populated);
  } catch (err) {
    console.error("createShift error:", err);
    return res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
// ===================================================
export const getTeamShifts = async (req, res) => {
  try {
    const companyId = req.user.company;
    const { teamId } = req.params;
    const { start: startISO, end: endISO } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.company.toString() !== companyId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
=======

// GET TEAM SHIFTS

export const getTeamShifts = async (req, res) => {
  try {
    const companyId = req.user.company;
    const adminId = req.user._id;
    const { teamId } = req.params;
    const { start: startISO, end: endISO } = req.query;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.company.toString() !== companyId.toString())
      return res.status(403).json({ message: "Not allowed" });

    if (team.admin.toString() !== adminId.toString())
      return res.status(403).json({ message: "Only team admin can access shifts" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

    const query = {
      team: teamId,
      company: companyId,
    };

    if (startISO && endISO) {
      const start = parseISODate(startISO);
      const end = parseISODate(endISO);
<<<<<<< HEAD
      if (!start || !end) {
        return res
          .status(400)
          .json({ message: "Invalid start/end query params" });
      }
=======
      if (!start || !end)
        return res.status(400).json({ message: "Invalid start/end query params" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

      query.startDateTime = { $lt: end };
      query.endDateTime = { $gt: start };
    }

    const shifts = await Shift.find(query)
<<<<<<< HEAD
      .populate("employee", "name email role")
      .populate("team", "name")
=======
      .populate("employee", "name email")
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
      .sort({ startDateTime: 1 });

    return res.json(shifts);
  } catch (err) {
    console.error("getTeamShifts error:", err);
    return res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
// ===================================================
=======

// GET MY SHIFTS (employee)

>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
export const getMyShifts = async (req, res) => {
  try {
    const companyId = req.user.company;
    const userId = req.user._id;
    const { start: startISO, end: endISO } = req.query;

<<<<<<< HEAD
    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

=======
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    const query = { employee: userId, company: companyId };

    if (startISO && endISO) {
      const start = parseISODate(startISO);
      const end = parseISODate(endISO);
<<<<<<< HEAD
      if (!start || !end) {
        return res
          .status(400)
          .json({ message: "Invalid start/end query params" });
      }
=======
      if (!start || !end)
        return res.status(400).json({ message: "Invalid start/end query params" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

      query.startDateTime = { $lt: end };
      query.endDateTime = { $gt: start };
    }

    const shifts = await Shift.find(query)
      .populate("team", "name")
      .sort({ startDateTime: 1 });

    return res.json(shifts);
  } catch (err) {
    console.error("getMyShifts error:", err);
    return res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
// ===================================================
export const updateShift = async (req, res) => {
  try {
    const companyId = req.user.company;
    const { id } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

    const { startDateTime, endDateTime, employeeId, notes, status } = req.body;

    const shift = await Shift.findById(id);
    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    if (shift.company.toString() !== companyId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
=======

// UPDATE SHIFT

export const updateShift = async (req, res) => {
  try {
    const companyId = req.user.company;
    const adminId = req.user._id;
    const { id } = req.params;

    const { startDateTime, endDateTime, employeeId, notes, status } = req.body;

    const shift = await Shift.findById(id);
    if (!shift)
      return res.status(404).json({ message: "Shift not found" });

    if (shift.company.toString() !== companyId.toString())
      return res.status(403).json({ message: "Not allowed" });

    // Ensure admin owns the team
    const team = await Team.findById(shift.team);
    if (!team || team.admin.toString() !== adminId.toString())
      return res.status(403).json({ message: "Not allowed" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

    // New employee validation
    let finalEmployee = shift.employee.toString();

    if (employeeId && employeeId !== finalEmployee) {
      const newEmp = await User.findById(employeeId);
<<<<<<< HEAD
      if (!newEmp) {
        return res.status(404).json({ message: "Employee not found" });
      }

      if (newEmp.company?.toString() !== companyId.toString()) {
        return res
          .status(403)
          .json({ message: "Employee not in your company" });
      }

      if (newEmp.role !== "employee") {
        return res
          .status(400)
          .json({ message: "Shifts can only be assigned to employees" });
      }

      if (newEmp.active === false) {
        return res
          .status(400)
          .json({ message: "Cannot assign shift to inactive employee" });
      }

      // If the shift is linked to a team, ensure employee belongs to same team
      if (shift.team && (!newEmp.team || newEmp.team.toString() !== shift.team.toString())) {
        return res
          .status(400)
          .json({ message: "Employee is not in this team" });
      }
=======
      if (!newEmp) return res.status(404).json({ message: "Employee not found" });

      if (newEmp.company.toString() !== companyId.toString())
        return res.status(403).json({ message: "Employee not in your company" });

      if (!newEmp.team || newEmp.team.toString() !== team._id.toString())
        return res.status(400).json({ message: "Employee is not in this team" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

      finalEmployee = employeeId;
    }

    // Validate times if changed
    let newStart = shift.startDateTime;
    let newEnd = shift.endDateTime;

    if (startDateTime || endDateTime) {
      const startISO = startDateTime || shift.startDateTime.toISOString();
      const endISO = endDateTime || shift.endDateTime.toISOString();

      const validation = validateStartEnd(startISO, endISO);
<<<<<<< HEAD
      if (!validation.ok) {
        return res.status(400).json({ message: validation.message });
      }
=======
      if (!validation.ok) return res.status(400).json({ message: validation.message });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

      newStart = validation.start;
      newEnd = validation.end;
    }

<<<<<<< HEAD
    // Overlap check with other shifts
=======
    // Overlap check
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    const overlapping = await Shift.findOne({
      employee: finalEmployee,
      _id: { $ne: shift._id },
      startDateTime: { $lt: newEnd },
      endDateTime: { $gt: newStart },
    });
<<<<<<< HEAD

    if (overlapping) {
      return res
        .status(400)
        .json({ message: "Updated shift overlaps another shift" });
    }
=======
    if (overlapping)
      return res.status(400).json({ message: "Updated shift overlaps another shift" });
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9

    shift.employee = finalEmployee;
    shift.startDateTime = newStart;
    shift.endDateTime = newEnd;
<<<<<<< HEAD

=======
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    if (notes !== undefined) shift.notes = notes;
    if (status !== undefined) shift.status = status;

    await shift.save();

    const populated = await Shift.findById(shift._id)
<<<<<<< HEAD
      .populate("employee", "name email role")
=======
      .populate("employee", "name email")
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
      .populate("team", "name");

    return res.json(populated);
  } catch (err) {
    console.error("updateShift error:", err);
    return res.status(500).json({ message: err.message });
  }
};

<<<<<<< HEAD
// ===================================================
export const deleteShift = async (req, res) => {
  try {
    const companyId = req.user.company;
    const { id } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "User has no company assigned" });
    }

    const shift = await Shift.findById(id);
    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    if (shift.company.toString() !== companyId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await shift.deleteOne();

=======

// DELETE SHIFT

export const deleteShift = async (req, res) => {
  try {
    const companyId = req.user.company;
    const adminId = req.user._id;
    const { id } = req.params;

    const shift = await Shift.findById(id);
    if (!shift)
      return res.status(404).json({ message: "Shift not found" });

    if (shift.company.toString() !== companyId.toString())
      return res.status(403).json({ message: "Not allowed" });

    const team = await Team.findById(shift.team);
    if (!team || team.admin.toString() !== adminId.toString())
      return res.status(403).json({ message: "Not allowed" });

    await shift.deleteOne();
>>>>>>> 98c9c9b1d4cdd655f227d2c71da409295e082ee9
    return res.json({ message: "Shift deleted" });
  } catch (err) {
    console.error("deleteShift error:", err);
    return res.status(500).json({ message: err.message });
  }
};
