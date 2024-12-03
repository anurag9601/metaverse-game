import { connectDB } from "@/database/db"
import { createdRoomModel } from "@/database/models/createRoom.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    try {
        connectDB();

        const { roomName, passwordSet, password } = await req.json();

        const createdRoom = await createdRoomModel.create({
            roomName,
            passwordSet,
            password
        });

        if (createdRoom) {
            createdRoom.roomJoinUrl = `http://localhost:3000/play/${createdRoom._id}`;
            await createdRoom.save();
        }

        return res.status(200).json({ success: true, data: createdRoom });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error " });
    }
}