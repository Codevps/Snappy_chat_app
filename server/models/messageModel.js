const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: String,
      selectedFile: String,
      video: String,
      audio: String,
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
