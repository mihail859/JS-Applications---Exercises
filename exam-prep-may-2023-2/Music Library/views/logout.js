import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

export async function logOutView(){
    try {
        console.log("logOut")


        let accessToken = JSON.parse(sessionStorage.getItem("userData")).accessToken;

        console.log(accessToken);
        let res = await fetch('http://localhost:3030/users/logout', {
            method: 'GET', 
            headers:{ 'X-Authorization': accessToken}
        })
        if (!res.ok){
            throw new Error(res.statusText)
        }
        sessionStorage.removeItem("userData");
        page.redirect("/dashboard")


    } catch (error) {
        alert(error.message)
    }
}