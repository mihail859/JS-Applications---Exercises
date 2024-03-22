import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../utils.js';
import { getById, updateCar } from '../data/cars.js';


const editTemplate = (motor, onEdit) => html`
    <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value=${motor.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  .value=${motor.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value=${motor.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${motor.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${motor.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
                .value=${motor.about}
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const car = await getById(id);

    ctx.render(editTemplate(car, createSubmitHandler(onEdit)));

    async function onEdit({
        model,
        imageUrl, 
        year, 
        mileage,
        contact,
        about
    }) {
        if([
            model,
        imageUrl, 
        year, 
        mileage,
        contact,
        about
        ].some((el) => el == '')
        ) {
            return alert('All fields are required');
        }

        const result = await updateCar(id, {
            model,
            imageUrl, 
            year, 
            mileage,
            contact,
            about
        });

        ctx.page.redirect('/catalog/' + id);
    }
}