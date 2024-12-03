import mongoose from "mongoose";

interface connectionType {
    isConnection?: boolean
}

const connection: connectionType = {};

export async function connectDB() {
    const alreadyConnected = connection.isConnection;

    if (!alreadyConnected) {
        const url = process.env.MONGO_DB_URL as string;
        mongoose.connect(url).then((e) => {
            console.log("Mongoose connected");
            connection.isConnection = true;
        })
    } else {
        console.log("Mongodb already connected");
    }
}