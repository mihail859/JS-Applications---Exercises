import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllRecords } from '../api/data.js';

const dashboardTemplate = (data) => html`
        <h2>Characters</h2>
        <section id="characters">

        ${data.length > 0
          ? html`${data.map(heroTemplate)}`
          : html`<h2>No added Heroes yet.</h2></h3>`}

        </section>
`;



const heroTemplate = (hero) => html`
  <div class="character">
            <img src="${hero.imageUrl}" alt="example1" />
            <div class="hero-info">
              <h3 class="category">${hero.category}</h3>
              <p class="description">${hero.description}</p>
              <a class="details-btn" href="/characters/${hero._id}">More Info</a>
            </div>
`;

export async function dashboardPage(ctx) {
  const data = await getAllRecords();

  ctx.setUserNav();
  ctx.render(dashboardTemplate(data));
}
