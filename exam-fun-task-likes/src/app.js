import { page } from './lib.js';
import { getUserData, updateNav } from './util.js';
import { logout } from './data/users.js';
import { showCatalog } from './views/catalog.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';

updateNav();

page('/', showHome);
page('/catalog', showCatalog);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/catalog/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    logout();
    updateNav();
    page.redirect('/');
});