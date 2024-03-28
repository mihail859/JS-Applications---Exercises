import { deleteEvent, getEventById } from '../data/events.js';
import { getVisitorByEventId, goToEvent, isGoing } from '../data/going.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (data, hasUser, isOwner, visitors, isUserGoing, onDelete, onGoing) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-category">${data.category}</p>
        <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${data.description}</p>
                <p id ="more-info">${data.moreInfo}</p>
              </div>

            <h3>Likes:<span id="likes">${visitors}</span></h3>

        

        <!--Edit and Delete are only for creator-->
        ${ hasUser ? html`
            <div id="action-buttons">
                ${ isOwner ? html`
                    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : (!isUserGoing ? html`
                    <a href="javascript:void(0)"id="like-btn" @click=${onGoing}>Like</a>` : null) }
            </div>` : null }
    </div>
</section>`;

export async function showDetails(ctx) {
    debugger
    const id = ctx.params.id;

    const requests = [
        getEventById(id),
        getVisitorByEventId(id)
    ];

    const user = getUserData();
    if (user) {
        requests.push(isGoing(id, user._id));
    }

    const [event, visitors, isUserGoing] = await Promise.all(requests);

    const hasUser = !!user;
    const isOwner = hasUser && user._id == event._ownerId;

    render(detailsTemplate(event, hasUser, isOwner, visitors, isUserGoing, onDelete, onGoing));

    async function onDelete() {
        const choice = confirm('Are you sure?');

        if (choice) {
            await deleteEvent(id);
            page.redirect('/catalog');
        }
    }

    async function onGoing() {
        await goToEvent(id);
        page.redirect('/catalog/' + id);
    }
}