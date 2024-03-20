import { html } from '../../node_modules/lit-html/lit-html.js';
import * as api from '../api/data.js';

const detailsTemplate = (hero, onDelete, isOwner) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${hero.imageUrl}" alt="example1" />
          <div>
          <p id="details-category">Hero</p>
          <div id="info-wrapper">
            <div id="details-description">
              <p id="description">
                ${hero.description}
              </p>
              <p id ="more-info">
                ${hero.moreInfo}
              </p>
            </div>
          </div>  

          <h3>Is This Useful:<span id="likes">0</span></h3>

              ${isOwner
    ? html`
              <div id="action-buttons">
                <a href=${`/characters/edit/${hero._id}`} id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              </div>
              `
    : ""
  }          
            </div>
        </div>
      </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const userId = api.getUserId();
  const hero = await api.getRecordById(id);

  ctx.render(detailsTemplate(hero, onDelete, hero._ownerId == userId));

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete this hero?');

    if (confirmed) {
      await api.deleteRecord(hero._id);
      ctx.page.redirect('/characters');
    }
  }
}