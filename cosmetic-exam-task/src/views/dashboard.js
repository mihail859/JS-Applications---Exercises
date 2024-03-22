import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllProducts } from "../api/data.js";

const dashboardTemplate = (products) => html`
  <h2>Products</h2>
  <section id="dashboard">
  
    
    ${products.length !== 0
      ? html`
          
            ${products.map(
              (a) => html`
                <div class="product">
                <img src="${a.imageUrl}" alt="example1" />
                <p class="title">
                  ${a.name}
                </p>
                <p><strong>Price:</strong><span class="price">${a.price}</span>$</p>
                <a class="details-btn" href="/details/${a._id}">Details</a>
              </div>
              `
            )}
          
        `
      : html` <h2>No products yet.</h2> `}
  </section>
`;

export async function showDashboard(ctx) {
  // 1) render(template, container)
  // or
  // 2) ctx.render(template)

  const products = await getAllProducts();

  ctx.render(dashboardTemplate(products));
}
