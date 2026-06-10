const messageModel = require("../Model/messageModel");

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: {
        text: message,
      
      users: [from, to],
      sender: from}
    });
    if (data) return res.json({msg : "Messages Added Successfully"});
    return res.json({msg : "Failed to Add Message "});
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMsg = async (req, res, next) => {
    try {
        const {from , to} = req.body;
        const messages = await messageModel.find({"message.users" : {$all: [from , to]}}).sort({updatedAt : 1});
        
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf : msg.message.sender.toString() === from,
                message : msg.message.text
            }
        });
       res.json(projectedMessages);
    } catch (error) {
        next(error)
    }
};
