import { getAllEvents } from '../data/events.js';
import { html, render } from '../lib.js';

const catalogTemplate = (events) => html`
    <h2>Fun Facts</h2>
    <section id="dashboard">
    ${events.length ? events.map(eventTemplate) : html`<h2>No Fun Facts yet.</h2>`}
        
    </section>
        
         
`;

const eventTemplate = (event) => html`
    <div class="fact">
        <img src="${event.imageUrl}" alt="example1" />
        <h3 class="category">${event.category}</h3>
        <p class="description">${event.description}</p>
        <a class="details-btn" href="/catalog/${event._id}">More Info</a>
    </div>`;

export async function showCatalog(ctx) {
    const events = await getAllEvents();
    render(catalogTemplate(events));
}