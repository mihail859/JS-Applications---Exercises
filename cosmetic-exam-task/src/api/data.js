import * as api from "./api.js";

export async function getAllProducts() {
  return api.get("/data/products?sortBy=_createdOn%20desc");
}

export async function getAlbumById(id) {
  return api.get("/data/products/" + id);
}

export async function createAlbum(data) {
  return api.post("/data/products", data);
}

export async function updateAlbumById(id, data) {
  return api.put("/data/products/" + id, data);
}

export async function deleteAlbumById(id) {
  return api.del("/data/products/" + id);
}

export async function likeAlbumById(data) {
  return api.post("/data/bought", data);
}

export async function getAllLikesByAlbumId(productId) {
  // /data/likes?where= albumId%3D%22{albumId}%22 & distinct=_ownerId & count
  //  /data/likes?where=albumId%3D%22{albumId}%22&distinct=_ownerId&count

  return api.get(
    `/data/bought?where${encodeURIComponent(
      `productId="${productId}"`
    )}&distinct=_ownerId&count`
  );

  
}

export async function getAllLikesByAlbumIdAndUserId(productId, userId) {
  // /data/likes?where=albumId%3D%22{albumId}%22%20and%20_ownerId%3D%22{userId}%22&count

  // /data/likes?where=albumId%3D%22126777f5-3277-42ad-b874-76d043b069cb%22%20and%20_ownerId%3D%2235c62d76-8152-4626-8712-eeb96381bea8%22&count

  // /data/likes?where=albumId%3D%22126777f5-3277-42ad-b874-76d043b069cb%22and_ownerId%3D%2235c62d76-8152-4626-8712-eeb96381bea8%22&count

  const url = `/data/bought?where=${encodeURIComponent(
    `productId="${productId}"`
  )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`;

  console.log(url);

  return api.get(
    `/data/bought?where=${encodeURIComponent(
      `productId="${productId}"`
    )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`
  );
}
