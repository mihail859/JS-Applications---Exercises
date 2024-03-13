import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarLook } from "../utils/navBarView.js";
import page from "//unpkg.com/page/page.mjs";

export async function deletePublication(ctx, next){
    try {
        console.log("From deletePublication function ")

        let id = ctx.params.id;
        console.log("The id of the publication: ", id);
        const confirmed = window.confirm("Are you sure you want to delete this item?");

        if (!confirmed) {
            return; // User canceled the deletion
        }
        let url = `http://localhost:3030/data/catalog/${id}`;
        let accessToken = JSON.parse(sessionStorage.getItem("dataUser")).accessToken;
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {'X-Authorization': accessToken}
        });
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        page.redirect("/")

    } catch (error) {
        alert(error.message)
    }
}