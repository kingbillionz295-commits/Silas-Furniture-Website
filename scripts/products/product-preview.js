// ==========================================
// SILAS FURNITURE
// PRODUCT PREVIEW ENGINE
// PHASE 5.6 PART 4
// ==========================================

// Preview Container

const previewGrid =
document.getElementById("preview-grid");

// ==========================================
// CLEAR PREVIEW
// ==========================================

export function clearPreview(){

if(previewGrid){

previewGrid.innerHTML="";

}

}

// ==========================================
// IMAGE PREVIEW
// ==========================================

export function previewImage(file){

const reader=new FileReader();

reader.onload=(event)=>{

const card=document.createElement("div");

card.className="preview-card";

card.innerHTML=`

<img
src="${event.target.result}"
class="preview-image">

<button
class="remove-preview">

🗑

</button>

`;

card.querySelector(".remove-preview")
.onclick=()=>{

card.remove();

};

previewGrid.appendChild(card);

};

reader.readAsDataURL(file);

}

// ==========================================
// VIDEO PREVIEW
// ==========================================

export function previewVideo(file){

const reader=new FileReader();

reader.onload=(event)=>{

const card=document.createElement("div");

card.className="preview-card";

card.innerHTML=`

<video
controls
class="preview-video">

<source
src="${event.target.result}">

</video>

<button
class="remove-preview">

🗑

</button>

`;

card.querySelector(".remove-preview")
.onclick=()=>{

card.remove();

};

previewGrid.appendChild(card);

};

reader.readAsDataURL(file);

}