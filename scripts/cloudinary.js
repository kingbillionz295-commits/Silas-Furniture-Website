// ==========================================
// SILAS FURNITURE
// CLOUDINARY UPLOAD ENGINE
// ==========================================

// ------------------------------------------
// CLOUDINARY CONFIG
// ------------------------------------------

const CLOUD_NAME =
"g8qvywjx".trim();

const UPLOAD_PRESET = "silas_furniture_upload";

// ------------------------------------------
// CLOUDINARY URL
// ------------------------------------------

const CLOUDINARY_URL =
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`.trim();

// ==========================================
// UPLOAD FILE
// ==========================================

export async function uploadToCloudinary(file){

try{

const formData = new FormData();

formData.append("file", file);

formData.append("upload_preset", UPLOAD_PRESET);

const response = await fetch(CLOUDINARY_URL,{

method:"POST",

body:formData

});

if(!response.ok){

throw new Error("Cloudinary upload failed.");

}

const data = await response.json();

return{

success:true,

url:data.secure_url,

publicId:data.public_id,

resourceType:data.resource_type,

width:data.width,

height:data.height,

format:data.format,

bytes:data.bytes,

originalFilename:data.original_filename

};

}

catch(error){

console.error(error);

return{

success:false,

message:error.message

};

}

}

// ==========================================
// MULTIPLE FILES
// ==========================================

export async function uploadMultiple(files){

const uploaded=[];

for(const file of files){

const result=

await uploadToCloudinary(file);

if(result.success){

uploaded.push(result);

}

}

return uploaded;

}