import { del, get, post, put } from './request.js';

const endpoints = {
    dashboard: '/data/facts?sortBy=_createdOn%20desc',
    events: '/data/facts',
    eventById: '/data/facts/',
};

export async function getAllEvents() {
    return get(endpoints.dashboard);
}

export async function getEventById(id) {
    return get(endpoints.eventById + id);
}

export async function createEvent(category, imageUrl, description, moreInfo) {
    return post(endpoints.events, {
        category,
        imageUrl, 
        description, 
        moreInfo

    });
}

export async function updateEvent(id, data) {
    return put(endpoints.eventById + id, data);
}

export async function deleteEvent(id) {
    return del(endpoints.eventById + id);
}