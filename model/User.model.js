import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Пожалуйста, придумайте уникальное имя пользователя"],
        unique: [true, "Имя пользователя занято"]
    },
    password: {
        type: String,
        required: [true, "Пожалуйста, укажите пароль"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Пожалуйста, укажите уникальный адрес электронной почты"],
        unique: true,
    },
    firstName: { type: String},
    lastName: { type: String},
    mobile : { type : Number},
    address: { type: String},
    profile: { type: String}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);