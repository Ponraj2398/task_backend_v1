const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8080
const MONGODB_URL="mongodb://127.0.0.1:27017/DBConnection"
const router = express.Router()

// DB Connection

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log(`${MONGODB_URL} Connection Successfull...`);
})
.catch((err) =>{
    console.log("Error in connecting to mongodb", err.message);
})
app.listen(PORT, ()=>{
    console.log("Server listening on PORT " + PORT);
});

// --------------------File uploads Image Upload in NodeJS---------------------------
const multer = require('multer')
const path = require('path')
// const fs = require("fs");


// Upload single file
// app.post('/upload/single', uploader.single('uploaded_file'), function (req, res){
//     console.log(req.file, req.body);
//     res.status(200).send("File Uploaded Successfully...!")
// });
// // Upload Multiple files
// app.post("/upload/multiple", uploader.array('uploaded_file', 10), (req, res) =>{
//     console.log(req.files);
//     return res.send("Multiple files Uploaded Successfully...!")
// })
// const uploadDir = 'public/data/uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage= multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null,'public/data/uploads/')
//     },
//     filename: function (req, file, cb){
//         cb(null, Date.now()+ path.extname(file.originalname))
//     }
// })
// const uploader=multer({storage: storage});
// app.use("/public",express.static(__dirname + "/public"))
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.json())

app.use('/public/data/uploads', express.static(path.join(__dirname, 'public/data/uploads')));
const verifyToken = require("./Middleware/AuthMiddleware")


// --------------------------------CORS Policy enable---------------------------------
const cors=require("cors")
app.use(cors({
    origin: "*"
}))
// -----------------------------------------------------------------------------------









app.use(require("./Controller/UserController"))
const productRoutes = require("./Router/ProductRoute");
app.use('/api', productRoutes);
// app.use(require("./Controller/ProductController"))
