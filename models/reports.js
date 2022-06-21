const { Schema, model } = require("mongoose");

const reportSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reasonForDelete: {
      type: String,
      required: false,
    },
    reportIsUpdate: {
      type: Boolean,
      default: false,
      required: false,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.methods.toJSON = function () {
  const { status, __v, _id, ...data } = this.toObject();

  data.uid = _id;

  return data;
};

module.exports = model("Reports", reportSchema);
