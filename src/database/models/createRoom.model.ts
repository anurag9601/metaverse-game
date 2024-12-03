import mongoose from "mongoose";

const createdRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        requried: true
    },
    passwordSet: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        default: ""
    },
    roomJoinUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const createdRoomModel = mongoose.models.createdRooms || mongoose.model("createdRooms", createdRoomSchema);