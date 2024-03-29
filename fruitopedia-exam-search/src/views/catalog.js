import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../data/cars.js';

const catalogTemplate = (fruits) => html`
        <h2>Fruits</h2>
    <section id="dashboard">

        ${fruits.length > 0
            ? html`
                ${fruits.map(carCard)}
            `
            : html`
                <h2>No fruit info yet.</h2>
            `
        }

    </section>
`;

const carCard = (fruit) => html`
    <div class="fruit">
            <img src="${fruit.imageUrl}" alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
    </div>
`;

export async function catalogPage(ctx) {
    const cars = await getAllCars();

    ctx.render(catalogTemplate(cars));
}