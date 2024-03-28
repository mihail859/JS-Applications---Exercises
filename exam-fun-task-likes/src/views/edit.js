import { getEventById, updateEvent } from '../data/events.js';
import { html, page, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (event, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${event.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${event.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${event.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${event.moreInfo}
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const event = await getEventById(id);
    render(editTemplate(event, createSubmitHandler(onEdit)));

    async function onEdit({
        category,
        'image-url': imageUrl, 
    description, 
    'additional-info': moreInfo
    }, form) {
        console.log(category, imageUrl, description, moreInfo);
        if (!category || !imageUrl || !description || !moreInfo) {
            return alert('All fields are required!');
        }

        await updateEvent(id, { category, imageUrl, description, moreInfo });
        page.redirect('/catalog/' + id);
    }
}
