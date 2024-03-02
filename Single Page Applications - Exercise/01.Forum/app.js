// alert('Hello from app.js!');

import { createPost, onClose, showHomePage } from "./home.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHomePage)

console.log('hello from app.js');

const buttonsElements = document.querySelectorAll('button');
let cancelBtn = buttonsElements[0];
cancelBtn.addEventListener('click',onClose)

let createPostsButton = buttonsElements[1];
createPostsButton.addEventListener('click',createPost)