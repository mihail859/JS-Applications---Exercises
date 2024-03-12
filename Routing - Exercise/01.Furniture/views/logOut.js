import page from "//unpkg.com/page/page.mjs";

export async function logoutEvent(event) {
    try {
        event.preventDefault();

        let accessToken = JSON.parse(sessionStorage.getItem('dataUser')).accessToken;

        console.log(accessToken);
        let res = await fetch('http://localhost:3030/users/logout', {
            method: 'GET', 
            headers:{ 'X-Authorization': accessToken}
        })
        if (!res.ok){
            throw new Error(res.statusText)
        }
        sessionStorage.removeItem('dataUser');
        page.redirect("/")

    } catch (error) {
        alert(error.message)
    }
}