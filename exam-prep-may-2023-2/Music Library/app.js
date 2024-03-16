import  page  from "../node_modules/page/page.mjs"
import { homeView } from "../views/home.js"
import { updateNavBar } from "./utils/navbvarLook.js"
import { dashBoardView } from "./views/dashboard.js"
import { logInView } from "./views/login.js"
import { logOutView } from "./views/logout.js"
console.log("Works...")

page(updateNavBar)
page("/", homeView);
page("/dashboard", dashBoardView);
page("/login", logInView)
page("/logout", logOutView)

page.start();