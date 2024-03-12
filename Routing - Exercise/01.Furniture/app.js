import { html, render } from './node_modules/lit-html/lit-html.js';
import page from "//unpkg.com/page/page.mjs";
import { createView } from './views/createView.js';
import { dashboard } from './views/dashboardView.js';
import { loginFunction } from './views/loginView.js';
import { myPublications } from './views/publicationsView.js';
import { registerFunction } from './views/registerView.js';
import { navBarLook } from './utils/navBarView.js';
import { logoutEvent } from './views/logOut.js';

console.log("The app.js works;");

document.getElementById('logoutBtn').addEventListener('click', logoutEvent)

page('/', dashboard);
page('/create', createView)
page('/my-furniture', myPublications)
page('/login', loginFunction)
page('/register', registerFunction)

page.start();
navBarLook();