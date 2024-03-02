// show home page
// load posts
// post functionality => create posts 
//cancel functionality

import { createElements } from "./utils.js";

export async function showHomePage(e){
    e.preventDefault();
    loadPosts();
    console.log('hello from home page');
}

async function loadPosts() {
    let topicDivElement = document.querySelector('.topic-title');
    topicDivElement.replaceChildren();
    console.log('try to load');
    

    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if (!response.ok){
            let error = await response.json()
            throw new Error(error.message)
        }
        let posts = await response.json();

        for (const [postId, post] of Object.entries(posts)) {
            let topicContainer = createElements('div', '', topicDivElement, {'class': 'topic-container'});
            let topicNameWrapperDivElement = createElements('div', '', topicContainer,{'class': 'topic-name-wrapper'});
            let topicNameDivElement = createElements('div', '', topicNameWrapperDivElement,{'class': 'topic-name'});

            let anchorElement = createElements('a', '', topicNameDivElement, {'class': 'normal', 'href': '#', 'dataset.id': postId});
            //anchorElement.addEventListener('click', showComments);
            let h2Element = createElements('h2', '', anchorElement, {});

            let columnsDivElement = createElements('div', '',topicNameDivElement, {'class': 'columns'});
            let divElement = createElements('div', '',columnsDivElement, {});

            let dateParagraphElement = createElements('p', 'Date:', divElement,{});
            createElements('time', post.createdDate, dateParagraphElement, {});

            let nicknameDivElement = createElements('div', '', divElement, {
                'class': 'nick-name'
            });
            let userNameParagraphElement = createElements('p', 'Username: ', nicknameDivElement,{});
            createElements('span', post.username, userNameParagraphElement, {});

        }

    } catch (error) {
        
    }
}

export async function createPost(e){
    e.preventDefault();

    let formElement = document.querySelector('form');

    let formData = new FormData(formElement);

    
}