import  page  from "../node_modules/page/page.mjs"
import { homeView } from "./views/home.js"
import { updateNavBar } from "./utils/navbvarLook.js"
import { dashBoardView } from "./views/dashboard.js"
import { logInView } from "./views/login.js"
import { logOutView } from "./views/logout.js"
import { registerView } from "./views/register.js"
import { detailsView } from "./views/details.js"
import { editView } from "./views/edit.js"
console.log("Works...")

page(updateNavBar)
page("/", homeView);
page("/dashboard", dashBoardView);
page("/login", logInView)
page("/logout", logOutView)
page("/register", registerView)
page("/details/:id", detailsView);
page("/edit/:id", editView)

page.start();