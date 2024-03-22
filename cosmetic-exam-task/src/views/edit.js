import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAlbumById, updateAlbumById } from "../api/data.js";

const editTemplate = (a, onEdit) => html`
  <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                value=${a.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                value="${a.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                value="${a.category}"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${a.description}</textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                value=${a.price}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {
  // 1) render(template, container)
  // or
  // 2) ctx.render(template)

  const album = await getAlbumById(ctx.params.id);

  ctx.render(editTemplate(album, onEdit));

  async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log("data", data);

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
      await updateAlbumById(ctx.params.id, data);

      ctx.page.redirect("/edit/" + ctx.params.id);
    } catch (err) {
      console.log(err.message);
    }
  }
}
