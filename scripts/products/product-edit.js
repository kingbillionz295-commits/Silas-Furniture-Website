// ==========================================
// SILAS FURNITURE
// PRODUCT EDIT ENGINE
// PHASE 5.6 PART 5
// ==========================================

// Current Product

let editingProduct = null;

// ==========================================
// START EDIT
// ==========================================

export function startEditing(product){

editingProduct = product;

console.log(
"Editing:",
product.id
);

}

// ==========================================
// UPDATE PRODUCT
// ==========================================

export function updateProduct(updatedData){

if(!editingProduct) return;

editingProduct.name =
updatedData.name;

editingProduct.description =
updatedData.description;

editingProduct.category =
updatedData.category;

editingProduct.featured =
updatedData.featured;

console.log(
"Product Updated:",
editingProduct
);

}

// ==========================================
// CANCEL
// ==========================================

export function cancelEditing(){

editingProduct = null;

console.log(
"Editing Cancelled"
);

}