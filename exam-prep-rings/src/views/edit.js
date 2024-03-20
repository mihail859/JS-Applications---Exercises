import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserId } from '../api/api.js';
import { getRecordById, editRecord } from '../api/data.js';

const editTemplate = (hero, onSubmit) => html`
    <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form"  @submit=${onSubmit}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              value=${hero.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value=${hero.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
          >${hero.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
          >${hero.moreInfo}</textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;
  const hero = await getRecordById(id);

  ctx.render(editTemplate(hero, onSubmit));


  async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const editedHero = {
      category: formData.get('category'),
      imageUrl: formData.get('image-url'),
      description: formData.get('description'),
      moreInfo: formData.get('additional-info'),
      _id: hero._id
    };

    if (editedHero.category == '' || editedHero.imageUrl == '' || editedHero.description == '' || editedHero.moreInfo == '') {
      return alert('Please fill in all mandatory fields!');
    }

    editedHero.category = editedHero.category.trim();
    editedHero.imageUrl = editedHero.imageUrl.trim();
    editedHero.description = editedHero.description;
    editedHero.moreInfo = editedHero.moreInfo;
    editedHero._ownerId = getUserId();

    await editRecord(id, editedHero);
    ctx.page.redirect(`/characters/${id}`);
  }
}