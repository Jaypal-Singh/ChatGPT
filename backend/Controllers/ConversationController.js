import ConversationModel from "../Model/ConversationModel.js";
import mongoose from "mongoose";

// Replace the existing getConversation function
const getConversation = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: "User ID missing" });
  }
  try {
    // Use aggregation to count messages per conversation
    const conversations = await ConversationModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Filter by user
      {
        $lookup: {
          from: "messages", // Join with messages collection
          localField: "_id",
          foreignField: "conversationId",
          as: "messages",
        },
      },
      { $addFields: { messageCount: { $size: "$messages" } } }, // Count messages
      { $project: { messages: 0 } }, // Exclude the messages array to save bandwidth
      { $sort: { lastMessageAt: -1 } }, // Sort by latest
    ]);
    return res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export { getConversation };
