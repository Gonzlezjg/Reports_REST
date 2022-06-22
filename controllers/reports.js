const { response } = require("express");
const Reports = require("../models/reports");
const User = require("../models/user");

const reportsGetAll = async (req, res = response) => {
  const [reports] = await Promise.all([
    Reports.find({ status: true }).populate("user", "user_name"),
  ]);

  const totalReports = await Reports.countDocuments();

  res.json({ totalReports, reports });
};

const reportsByUser = async (req, res = response) => {
  const { id } = req.params;

  const reports = await Reports.find({ user: id }).populate(
    "user",
    "user_name"
  );

  if (reports) {
    const allReport = reports.filter((report) => {
      return !report.reasonForDelete;
    });
    res.json({ allReport });
  }
};

const repotsById = async (req, res = response) => {
  const { id } = req.params;

  const reports = await Reports.findById(id).populate("user", "user_name");

  res.json({ reports });
};

const reportsPost = async (req, res = response) => {
  const { name, message, user } = req.body;

  const findUser = await User.findById(user);
  const { userName } = findUser;
  if (!findUser) {
    return res.status(400).json({ msg: "El usuario no existe" });
  }
  if (findUser.reportsCount >= 5) {
    return res.status(400).json({
      message: "El usuario ya tiene 5 reportes",
    });
  }

  const reportsData = await Reports.findOne({
    name,
    message,
    user,
  });

  if (reportsData) {
    return res.status(400).json({
      msg: "El reporte ya existe, por favor especifique otro problema.",
    });
  }

  const data = {
    name,
    message,
    userName,
  };

  const reports = new Reports(data);

  await User.findByIdAndUpdate(user, {
    $inc: { reportsCount: 1 },
  });

  await reports.save();

  res.status(201).json(reports);
};

const repotsDelete = async (req, res = response) => {
  const { id } = req.params;
  const { reasonForDelete } = req.body;

  const data = {
    resolved: true,
    reasonForDelete,
  };

  const reports = await Reports.findByIdAndUpdate(id, data);

  res.json({ reports });
};

const reportUpdate = async (req, res = response) => {
  const { id } = req.params;

  const report = await Reports.findById(id);

  if (!report) {
    return res.status(400).json({ msg: "El reporte no existe" });
  }

  if (report.reportIsUpdate) {
    return res.status(400).json({ msg: "El reporte ya fue actualizado" });
  }

  const { message } = req.body;

  const data = {
    message,
    reportIsUpdate: true,
  };

  const updateReport = await Reports.findByIdAndUpdate(id, data);

  res.json({ updateReport });
};

module.exports = {
  reportsPost,
  reportsGetAll,
  reportsByUser,
  repotsById,
  repotsDelete,
  reportUpdate,
};
