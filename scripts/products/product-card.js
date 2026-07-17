// ==========================================
// SILAS FURNITURE
// PRODUCT CARD ENGINE
// PHASE 5.6 PART 2
// ==========================================

export function createProductCard(product){

const card =
document.createElement("div");

card.className="product-card";

card.dataset.id=product.id;

card.innerHTML=`

<div class="product-image">

${product.type==="image"

?

`<img
class="published-image"
src="${product.src}"
alt="${product.name}">`

:

`<video
class="published-video"
controls>

<source
src="${product.src}">

</video>`

}

</div>

<div class="product-details">

<h2>

${product.name}

</h2>

<p>

${product.category}

</p>

${product.featured

?

`<span class="featured">

⭐ Featured

</span>`

:

""

}

</div>

<div class="product-stats">

<span>

❤ 0

</span>

<span>

💬 0

</span>

<span>

📤 0

</span>

<span>

👁 0

</span>

</div>

<div class="product-actions">

<button
class="edit-product">

✏ Edit

</button>

<button
class="delete-product">

🗑 Delete

</button>

<button
class="open-product">

📂 Open

</button>

</div>

<div class="product-footer">

<p>

${product.id}

</p>

<p>

${product.date}

</p>

</div>

`;

return card;

}