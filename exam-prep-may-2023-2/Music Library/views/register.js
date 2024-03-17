import { html, render } from "../node_modules/lit-html/lit-html.js" 
import page from "../node_modules/page/page.mjs"

export async function registerView(){
    render(registerTemplate(), document.querySelector("main"));


}

let registerTemplate = () => html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
    </section>
`;


async function onRegister(event){
    event.preventDefault();
    console.log("From register form element")

    try {   
        console.log("Event default prevented");
        let form = new FormData(event.target);

        let email = form.get('email');
        let password = form.get('password');
        let rePass = form.get('re-password');

        if (!email || (password !== rePass) || password== '' || rePass === '')   {
            throw new Error('Invalid credentials for registration')
        }

        let urlRegister = 'http://localhost:3030/users/register';
        let data = {email, password}
        let response = await fetch(urlRegister, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error(response.statusText)
        }

        let registeredData = await response.json();
        let dataUser = {
            accessToken: registeredData.accessToken,
            loggedInUser: registeredData.email,
            id: registeredData._id
        }
        sessionStorage.setItem('userData', JSON.stringify(dataUser));

        page.redirect("/dashboard")

    } catch (error) {
        alert(error.message)
    }

}