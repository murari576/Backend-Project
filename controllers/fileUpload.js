const File = require("../models/Files");
const cloudinary = require("cloudinary").v2;


exports.localFileUpload = async(req, res) => {
    try{

        const file = req.files.file;
        console.log("File aagi jee ->" , file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path->" , path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully',

        });

    }

    catch(error) {
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "master");

        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl:response.secure_url,
        });
 
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        }) 

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:flase,
            message:'Something went wrong',
        });
    }
}

exports.videoUpload = async(req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "master");

        const fileData = await File.create({
            name, 
            tags,
            email,
            videoUrl:response.secure_url,
        });
 
        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        }) 


    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: 'something went wrong'
        })
    }
}

exports.imageReduceUpload = async(req, res) => {
    try{
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "master",36);

        const fileData = await File.create({
            name, 
            tags,
            email,
            imageUrl:response.secure_url,
        });
 
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        }) 

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:flase,
            message:'Something went wrong',
        });
    }
}
