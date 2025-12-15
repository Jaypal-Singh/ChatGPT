import ConversationModel from "../Model/ConversationModel.js";

const getConversation = async(req, res) =>{
    const userId = req.user._id
    console.log(userId)

    if(!userId){
        return res.status(401).json({ message: "conversation id missing" });
    }
    try{
         const conversations = await ConversationModel.find({ userId }).sort({ lastMessageAt: -1 }); // latest chat first

        if (!conversations || conversations.length === 0) {
        return res.status(200).json([]); // empty list, not error
        }

    
        return res.status(200).json(conversations);
    }catch(err){
        return res.status(500).json({ message: "server error" });

    }
    
}


export {getConversation, };