import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteAlbumById,
  getAlbumById,
  getAllLikesByAlbumId,
  getAllLikesByAlbumIdAndUserId,
  likeAlbumById,
} from "../api/data.js";

const detailsTemplate = (a, likes, user, isAlreadyLiked, onDelete, onLike) => {
  const isCreator = a._ownerId === user?._id;

  return html`
   <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${a.imageUrl}" alt="example1" />
            <p id="details-title">${a.name}</p>
            <p id="details-category">
              Category: <span id="categories">${a.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${a.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${likes}</span> times.</h4>
                <span>${a.description}</span
                >
              </div>
            </div>
    

        <!--Edit and Delete are only for creator-->
        ${user
          ? html`
              <div id="action-buttons">
                ${!isCreator && !isAlreadyLiked
                  ? html`
                  <a href="" id="buy-btn" @click=${onLike}>Buy</a>`
                  : nothing}
                ${isCreator
                  ? html`
                      <a href="/edit/${a._id}" id="edit-btn">Edit</a>
                      <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    </section>
  `;
};

export async function showDetails(ctx) {
  // 1) render(template, container)
  // or
  // 2) ctx.render(template)

  const albumId = ctx.params.id;

  // TODO:
  // use Promise.all for album & likes requests

  const album = await getAlbumById(albumId);

  const likes = await getAllLikesByAlbumId(albumId);

  let isAlreadyLiked = false;

  if (ctx.user) {
    isAlreadyLiked = !!(await getAllLikesByAlbumIdAndUserId(
      albumId,
      ctx.user._id
    ));
  }

  ctx.render(
    detailsTemplate(album, likes, ctx.user, isAlreadyLiked, onDelete, onLike)
  );

  async function onLike() {
    try {
      likeAlbumById({ albumId: album._id });

      ctx.page.redirect("/details/" + albumId);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function onDelete() {
    try {
      await deleteAlbumById(albumId);

      ctx.page.redirect("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  }
}
