import { del, get, post, put } from "./api.js";

const endpoints = {
    allCars: '/data/fruits?sortBy=_createdOn%20desc',
    create: '/data/fruits',
    byId: '/data/fruits/',
    byName: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`
};

export async function getAllCars() {
    return get(endpoints.allCars);
}

export async function createCar(data) {
    return post(endpoints.create, data);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

export async function deleteCar(id) {
    return del(endpoints.byId + id);
}

export async function updateCar(id, data) {
    return put(endpoints.byId + id, data);
}

export async function getCarsByName(query) {
    return get(endpoints.byName(query));
}