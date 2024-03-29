import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../utils.js';
import { deleteCar, getById } from '../data/cars.js';

const detailsTemplate = (fruit, onDelete) => html`
    <section id="details">
            <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${fruit.nutrition}</p>
              </div>
            
            ${fruit.canEdit
                ? html`
                    <div id="action-buttons">
                        <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
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
        const choice = confirm('Do you want to delete this item from the catalog?');

        if (choice) {
            await deleteCar(id);
            ctx.page.redirect('/catalog');
        }
    }
}