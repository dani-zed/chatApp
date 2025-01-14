import Message from "../models/message.model.js";


export const getUsersForSidebar = async (req, res) => {
   try {
    const loggedInUser = req.user;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser} }).select("-password");
    res.status(200).json(filteredUsers);
   } catch (error) {
    console.log("error in the getUsersForSidebar controller", error.message);
    res.status(500).json({ message: "Internal server error" });
   }
};


export const getMessages = async (req, res) => {
   try {
      const {id:userToChatId}=req.params;
      const myId=req.user._id;

      const messages=await Message.find({
         $or:[
            {senderId:myId,receiverId:userToChatId},
            {senderId:userToChatId,receiverId:myId}
         ]
      }).sort({createdAt:"asc"});

      res.status(200).json(messages);

   } catch (error) {
      console.log("error in the getMessages controller", error.message);
      res.status(500).json({ message: "Internal server error" });
   }
};

export const sendMessages = async (req,res)=>{
   try {
      const {text,image}=req.body;
      const {id:receiverId}=req.params;
      const senderId=req.user._id;

      let imageUrl;
      if(image){
         //Upload image to cloudinary
         const uploadResponse=await cloudinary.uploader.upload(image);
         imageUrl=uploadResponse.secure_url;
      }

      const newMessage=new Message({
         senderId,
         receiverId,
         text,
         image:imageUrl,
      });
      await newMessage.save();

      //todo: implement real time functionality here with socket.io
      res.status(201).json(newMessage);

   } catch (error) {
      console.log("error in the sendMessages controller", error.message);
      res.status(500).json({ message: "Internal server error" });
   }
};