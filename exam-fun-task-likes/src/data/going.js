import { get, post } from './request.js';

const endpoints = {
    goToEvent: '/data/likes',
    visitorsByEventId: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    isGoing: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function goToEvent(eventId) {
    await post(endpoints.goToEvent, { eventId });
}

export async function getVisitorByEventId(eventId) {
    return get(endpoints.visitorsByEventId(eventId));
}

export async function isGoing(eventId, userId) {
    return get(endpoints.isGoing(eventId, userId));
}