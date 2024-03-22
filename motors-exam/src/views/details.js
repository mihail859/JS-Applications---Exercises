import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../utils.js';
import { deleteCar, getById } from '../data/cars.js';

const detailsTemplate = (motor, onDelete) => html`
    <section id="details">
          <div id="details-wrapper">
          <img id="details-img" src=${motor.imageUrl} alt="example1" />
            <p id="details-title">${motor.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">${motor.year}</p>
                <p class="mileage">Mileage: ${motor.mileage} km.</p>
                <p class="contact">Contact Number: ${motor.contact}</p>
                <p id = "motorcycle-description">${motor.about}</p>
              </div>
               <!--Edit and Delete are only for creator-->


               ${motor.canEdit
                ? html`
                    <div id="action-buttons">
                        <a href="/catalog/${motor._id}/edit" id="edit-btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                    </div>
                `
                : null
                }
        </div>
        </div>
      </section>
`;

export async function detailsPage(ctx) {

    const id = ctx.params.id;
    const car = await getById(id);
    const userData = getUserData();

    if (userData) {
        if (userData._id == car._ownerId) {
            car.canEdit = true;
        }
    }

    ctx.render(detailsTemplate(car, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteCar(id);
            ctx.page.redirect('/catalog');
        }
    }
}