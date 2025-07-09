import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';


export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id: {$ne: currentUserId}}, //exclude current user
                {$id: {$nin: currentUser.friends}}, //exclude friends
                {isOnboarded: true} //only onboarded users
            ]
        })
    res.status(200).json(recommendedUsers)
    }
    catch (error) {
        console.log("Error in getRecommendedUsers controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullname profilePicture nativeLanguage learningLanguage");


        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in getMyFriends controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id:recipientId } = req.params;

        // prevent sending friend request to self
        if (myId === recipientId) {
            return res.status(400).json({message: "You cannot send a friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({message: "Recipient not found"});
        }
        // check if the recipient is already a friend
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({message: "You are already friends with this user"});
        }

        // check if a req already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if (existingRequest) {
            return res.status(400).json({message: "Friend request already exists"});
        }

        // create a new friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json({
            message: "Friend request sent successfully",
        });

    } catch (error) {
        console.log("Error in sendFriendRequest controller:", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};

export async function acceptFriendRequest(req, res) {
    try {
        const {id:requestId} = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({message: "Friend request not found"});
        }

        // verify the current user is the recipient of the request
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({message: "You are not authorized to accept this friend request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save();


        // add each user to the other's friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        });

        res.status(200).json({message: "Friend request accepted successfully"});
    } catch (error) {
        console.log("Error in acceptFriendRequest controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullname profilePicture nativeLanguage learningLanguage");

        const acceptedReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "accepted"
        }).populate("recipent", "fullname profilePicture");

        res.status(200).json({ incomingReqs, acceptedReqs });
    } catch (error) {
        console.log("Error in getFriendRequests controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgoingReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullname profilePicture nativeLanguage learningLanguage");

        res.status(200).json(outgoingReqs);
    } catch (error) {
        console.log("Error in getOutgoingFriendRequests controller:", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};