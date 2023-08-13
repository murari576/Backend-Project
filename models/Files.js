const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    imageUrl: {
        type:String,
    },

    tags:{
        type:String,
    },
    email:{
        type:String,
    }

});

//post middleware
fileSchema.post("save", async function(doc) {
    try{

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })

        //send mail
        let info = await transporter.sendMail({
            from: `Forex master -by Murari`,
            to: doc.email,
            subject: "New file Uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2> <> File Uploaded 
                     view here: <a href = "${doc.imageUrl}">
                      ${Sdoc.imageUrl} </a> </p>`,
        })

    }
    catch(error) {
        console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;