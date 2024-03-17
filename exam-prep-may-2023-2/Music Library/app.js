import  page  from "../node_modules/page/page.mjs"
import { homeView } from "./views/home.js"
import { updateNavBar } from "./utils/navbvarLook.js"
import { dashBoardView } from "./views/dashboard.js"
import { logInView } from "./views/login.js"
import { logOutView } from "./views/logout.js"
import { registerView } from "./views/register.js"
import { detailsView } from "./views/details.js"
import { editView } from "./views/edit.js"
import { deleteFunctionality } from "./views/delete.js"
import { createView } from "./views/create.js"
import { like } from "./views/like.js"
console.log("Works...")

page(updateNavBar)
page("/", homeView);
page("/dashboard", dashBoardView);
page("/login", logInView)
page("/logout", logOutView)
page("/register", registerView)
page("/details/:id", detailsView);
page("/edit/:id", editView)
page("/del/:id", deleteFunctionality)
page("/add", createView)
page("/like/:id", like)

page.start();