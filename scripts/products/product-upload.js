// ==========================================
// SILAS FURNITURE
// PRODUCT UPLOAD ENGINE
// PHASE 5.6 PART 3
// ==========================================
import { uploadToCloudinary } from "./cloudinary.js";
import { createProductCard }
from "./product-card.js";

// ==========================================
// PRODUCT ID
// ==========================================

export function generateProductID(){

const random =
Math.floor(Math.random()*9000)+1000;

return `SF-${random}`;

}

// ==========================================
// DATE
// ==========================================

export function generateUploadDate(){

const today =
new Date();

return today.toLocaleDateString();

}

// ==========================================
// TIME
// ==========================================

export function generateUploadTime(){

const now =
new Date();

return now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

}

// ==========================================
// CREATE PRODUCT
// ==========================================

export function publishProduct(data){

const product={

id:generateProductID(),

name:data.name,

category:data.category,

description:data.description,

featured:data.featured,

src:data.src,

type:data.type,

date:

`${generateUploadDate()} • ${generateUploadTime()}`

};

return createProductCard(product);

}
async function uploadSelectedFile(file){

const uploadStatus = document.getElementById("upload-status");

uploadStatus.textContent = "☁ Uploading...";

const result = await uploadToCloudinary(file);

if(result.success){

uploadStatus.textContent = "✅ Upload Complete";

return result;

}

uploadStatus.textContent = "❌ Upload Failed";

return null;

}