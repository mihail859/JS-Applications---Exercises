import page from "./node_modules/page/page.mjs"
import { createView } from "./src/add.js";
import { dashBoardView } from "./src/dashboard.js";
import { deleteFunctionality } from "./src/delete.js";
import { detailsView } from "./src/details.js";
import { editView } from "./src/edit.js";
import { home } from "./src/home.js";
import { logInView } from "./src/login.js";
import { logOutView } from "./src/logout.js";
import { registerView } from "./src/register.js";
import { searchFunction } from "./src/search.js";
import { navBarLook } from "./utils/navBarView.js";


console.log("Starting")
page(navBarLook);
page("/", home)
page("/login", logInView)
page("/logout", logOutView)
page("/register", registerView)
page("/cars", dashBoardView)
page("/details/:id", detailsView);
page("/edit/:id", editView)
page("/del/:id", deleteFunctionality)
page("/add", createView)
page("/search", searchFunction)

page.start();
