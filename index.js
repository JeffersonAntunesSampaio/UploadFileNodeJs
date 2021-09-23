const express = require("express");
const multer  = require("multer");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload_images/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });


app.get("/", (req,res,next) => {
    res.status(200).json({
        message: "server ok"
    });
});

app.post("/", upload.single('image'), (req,res,next) => {
    res.status(201).json({
        message: "upload feito com sucesso",
        link: `http://localhost:3000/upload_images/${req.file.filename}`
    });
});

console.log(__dirname+'/upload_images/');
app.use('/upload_images', express.static(__dirname+'/upload_images/'));

app.listen(3000, ()=> {
    console.log("Listening port 3000");
});