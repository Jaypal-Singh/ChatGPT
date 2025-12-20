import MessageModel from "../Model/MessageModel.js";
import ConversationModel from "../Model/ConversationModel.js";
import DashboardModel from "../Model/DashboardModel.js";

const getMessage = async (req, res) => {
  console.log("msg api hit");
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    // 1️⃣ Check conversation belongs to this user
    const conversation = await ConversationModel.findOne({
      _id: conversationId,
      userId: userId,
    });

    if (!conversation) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this conversation",
      });
    }

    // 2️⃣ Fetch messages of this conversation
    const messages = await MessageModel.find({ conversationId }).sort({
      createdAt: 1,
    }); // old → new
    // console.log(messages.length)
    const totalMessageLength = messages.length;
    console.log(totalMessageLength);

    res.status(200).json({
      success: true,
      messages,
      totalMessageLength,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    // Messages don't have a `userId` field; they reference a conversation.
    // First fetch user's conversations, then get messages for those conversations.
    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    const usermsg = await MessageModel.find({
      conversationId: { $in: conversationIds },
      sender: "user",
    }).sort({ createdAt: 1 });

    const AImsg = await MessageModel.find({
      conversationId: { $in: conversationIds },
      sender: "ai",
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      usermsgCount: usermsg.length,
      AImsgCount: AImsg.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch message length",
    });
  }
};

const getMessageLength = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all conversations for the user
    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    // Count total messages in those conversations
    const totalMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
    });

    res.status(200).json({
      success: true,
      totalMessages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch message length",
    });
  }
};

const getMessagesByTime = async (req, res) => {
  try {
    const userId = req.user._id;

    //day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    //yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfYesterday = new Date(yesterday);
    startOfYesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    //week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date();

    const todayMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const yesterdayMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
      createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
    });

    const weekMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });

    res
      .status(200)
      .json({ success: true, todayMessages, yesterdayMessages, weekMessages });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch today's messages" });
  }
};
export { getMessage, getMessageLength, getMessagesByTime, getAllMessages };

// export { getMessage, getMessageLength };
