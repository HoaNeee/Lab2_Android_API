// import thư viện


const express = require('express');
const mongoose = require('mongoose');
//const modelSinhVien = require('./modelSinhVien');



// tao doi tuong cho express

const app = express();
app.set('view engine', 'ejs');

// ket noi mongodb

mongoose.connect('mongodb+srv://sieuhoadz:sieuhoadz@cluster0.0kyy35a.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("ket noi thanh cong");
}).catch((err) =>{
    console.error("co loi",err);
});

// truy van 
// chọn csdl để thao tác
const db1 = mongoose.connection.useDb('db1');

//dinh nghia model cho conect

const SinhVienSchema = new mongoose.Schema({
    masv: {
        type: String,
        required: true
    },
    tensv: {
        type: String,
        required: true
    }
});

//anh xa model

const sinhvien = db1.model('sinhvien', SinhVienSchema);

//tao link de call 
app.get('/', async(req, res) =>{
    try{
        const sinhviens = await sinhvien.find();
        if(sinhviens.length > 0){
            //res.json(sinhvien);
            //console.log(sinhvien);
            res.render('index', {sinhviens: sinhviens});
        } else{
            res.status(404).json({error: "Khong co sinh vien nao"});
        }
    }
    catch (error){
        console.log(error("Lỗi đọc dữ liệu: "+error));
        res.status(500).json({error:"đọc dữ liệu lỗi"});
    }
});
//khoi chay

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log("sv dang chay o cong 5000");
});