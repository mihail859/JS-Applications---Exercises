import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../utils.js';
import { getById, updateCar } from '../data/cars.js';

const editTemplate = (fruit, onEdit) => html`
    <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${fruit.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${fruit.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${fruit.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${fruit.nutrition}
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const car = await getById(id);

    ctx.render(editTemplate(car, createSubmitHandler(onEdit)));

    async function onEdit({
        name,
        imageUrl, 
        description, 
        nutrition

    }) {
        if([
            name,
            imageUrl, 
            description, 
            nutrition

        ].some((el) => el == '')
        ) {
            return alert('All fields are required');
        }

        const result = await updateCar(id, {
            name,
            imageUrl, 
            description, 
            nutrition

        });

        ctx.page.redirect('/catalog/' + id);
    }
}