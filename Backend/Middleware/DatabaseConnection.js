import mongoose from "mongoose";

const DBConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connection Successfull...`);
    } catch (error) {
        console.log(error.message);
    }
}

export default DBConnect