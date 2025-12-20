// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true
    },

    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true
    },

    text: {
      type: String,
      required: true
    },

    responseTime: {
      type: Number, // in seconds
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
