import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from "//unpkg.com/page/page.mjs";

export async function registerFunction(){
    console.log("From registerFunction");
    render(template(), document.querySelector('.container'))
}

let template = () => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${registerFunc}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group" >
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

async function registerFunc(event){
    event.preventDefault(); 
    try {   
        console.log("Event default prevented");
        let form = new FormData(event.target);

        let email = form.get('email');
        let password = form.get('password');
        let rePass = form.get('rePass');

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
        sessionStorage.setItem('dataUser', JSON.stringify(dataUser));

        page.redirect("/")

    } catch (error) {
        alert(error.message)
    }
}