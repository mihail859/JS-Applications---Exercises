// [x]show home page
// [x]load posts
//[x] post functionality => create posts 
//cancel functionality

import { createElements } from "./utils.js";

export async function showHomePage(e){
    e.preventDefault();
    localStorage.clear();
    window.location = './index.html';
    console.log('hello from home page');
}

if (!window.location.href.includes('theme-content.html')){
    loadPosts();
}



function showComments(e){
    let postId;
    if (e.target.tagName === 'a'){
        postId = e.target.dataset.id;
    }else{
        postId = e.target.parentElement.getAttribute('dataset.id');
    }

    console.log(postId);
    localStorage.setItem('postId', postId)
    window.location = './theme-content.html'
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
            console.log(postId, post);
           
            let topicContainer = createElements('div', '', topicDivElement, 
            {'class': 'topic-container'});

            let topicNameWrapperDivElement = createElements('div', '', topicContainer,
            {'class': 'topic-name-wrapper'});

            let topicNameDivElement = createElements('div', '', topicNameWrapperDivElement,
            {'class': 'topic-name'});

            let anchorElement = createElements('a', '', topicNameDivElement, 
            {class: 'normal', href: '#', 'dataset.id': postId});
            anchorElement.addEventListener('click', showComments);
            createElements('h2', post.title, anchorElement, {});

            let columnsDivElement = createElements('div', '',topicNameDivElement, 
            {'class': 'columns'});
            let divElement = createElements('div', '',columnsDivElement, {});

            let dateParagraphElement = createElements('p', 'Date:', divElement,{});
            createElements('time', post.createDate, dateParagraphElement, {});

            let nicknameDivElement = createElements('div', '', divElement, {
                'class': 'nick-name'
            });
            let userNameParagraphElement = createElements('p', 'Username: ', nicknameDivElement,{});
            createElements('span', post.username, userNameParagraphElement, {});

        }

        console.log(topicDivElement);

    } catch (error) {
        
    }
}

export async function createPost(e){
    e.preventDefault();

    let formElement = document.querySelector('form');

    let formData = new FormData(formElement);

    let title = formData.get('topicName').trim();
    let username = formData.get('username').trim();
    let content = formData.get('postText').trim();

    console.log(title, username, content);

    let createDate = new Date();

    try {
        if (!title || !username || !content){
            throw new Error('Invalid title or username or post');
        }

        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, username, content,createDate})
        })
        if (!response.ok){
            let err = await response.json();
            throw new Error(err.message)
        }

        formElement.reset();

        await loadPosts();
    } catch (error) {
        alert(error.message);
    }

}

export function onClose(event) {
    event.preventDefault();

    const formElement = document.querySelector('form');
    formElement.reset();
}