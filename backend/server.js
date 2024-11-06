import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import {connectDB} from "./db/connectDB.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const app = express();
app.use(express.json());

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    });
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running in ${PORT}`);
})


