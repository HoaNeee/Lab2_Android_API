const mongoose = require('mongoose');
const modelSinhVien = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const SinhVien = mongoose.model('sinhvien', modelSinhVien);
module.exports = SinhVien;