import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCars } from '../data/cars.js';

const catalogTemplate = (motors) => html`
        <h2>Available Motorcycles</h2>
    <section id="dashboard">

        ${motors.length > 0
            ? html`
                ${motors.map(carCard)}
            `
            : html`
                <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>
            `
        }

    </section>
`;

const carCard = (motors) => html`
    <div class="motorcycle">
            <img src=${motors.imageUrl} alt="example1" />
            <h3 class="model">${motors.model}</h3>
            <p class="year">${motors.year}</p>
            <p class="mileage">Mileage: ${motors.mileage} km.</p>
            <p class="contact">Contact Number: ${motors.contact}</p>
            <a class="details-btn" href="/catalog/${motors._id}">More Info</a>
    </div>
`;

export async function catalogPage(ctx) {
    const cars = await getAllCars();

    ctx.render(catalogTemplate(cars));
}