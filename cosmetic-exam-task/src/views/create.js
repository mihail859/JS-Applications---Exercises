import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAlbum } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

export function showCreate(ctx) {
  // 1) render(template, container)
  // or
  // 2) ctx.render(template)

  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (
      !data.name ||
      !data.imageUrl ||
      !data.category ||
      !data.description ||
      !data.price
    ) {
      return;
    }

    try {
      await createAlbum(data);

      ctx.page.redirect("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  }
}
