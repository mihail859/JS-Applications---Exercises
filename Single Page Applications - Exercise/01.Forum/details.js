import { showHomePage } from "./home.js";
import { createElements } from "./utils.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHomePage);



function fetchPost(){
    const postId = localStorage.getItem('postId')
    
    loadPost(postId);
}

fetchPost();

async function loadPost(postId) {
    let formEl = document.querySelector('form');
    formEl.setAttribute('dataset.id', postId);

    try {
        const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`);
        if (!res.ok){
            const error = await res.json()
            throw new Error(error.message)
        }

        const post = await res.json();

        let themeContentDivElement = document.querySelector('.theme-content');

        themeContentDivElement.replaceChildren();


        const themeTitleDivElement = createElements('div', '', themeContentDivElement, {
            'class': 'theme-title'
        });

        const themeNameWrapperDivElement = createElements('div', '', themeTitleDivElement, {
            'class': 'theme-name-wrapper'
        });


        const themeNameDivElement = createElements('div', '', themeNameWrapperDivElement, {
            'class': 'theme-name'
        });

        createElements('h2', post.title, themeNameDivElement, {});

        const commentDivElement = createElements('div', '', themeContentDivElement, {
            'class': 'comment'
        });

        const headerDivElement = createElements('div', '', commentDivElement, {
            'class': 'header'
        });
        createElements('img', '', headerDivElement, {
            'src': './static/profile.png',
            'alt': 'avatar'
        });

        const paragraphElement = createElements('p', '', headerDivElement, {});
        paragraphElement.innerHTML =  `<span>${post.username}</span> posted on <time>${post.createDate}</time>`;

        createElements('p', post.content, headerDivElement, {
            class: 'post-content'
        });

        const comments = await loadComments(postId)
        for (const comment of Object.values(comments)) {
            const userCommentDivElement = createElements('div', '', commentDivElement, {
                class: 'user-comment'
            });

            const topicNameWrapper = createElements('div', '', userCommentDivElement, {
                class: 'topic-name-wrapper'
            });

            const topicNameDivElement = createElements('div', '', topicNameWrapper, {
                class: 'topic-name'
            });

            const paragraphElement = createElements('p', '',topicNameDivElement, {})
            paragraphElement.innerHTML = `<strong>${comment.username}</strong> commented on <time>${comment.createDate}</time>`

            const postContentDivElement = createElements('div', '',topicNameDivElement, {
                'class': 'post-content'
            });
            createElements('p', comment.content, postContentDivElement, {})
        }

        const answerComment = createElements('div', '', themeContentDivElement, {
            class: 'answer-comment'
        });

        const answerParagraphElement = createElements('p', '', answerComment, {});
        answerParagraphElement.innerHTML = `<span>currentUser</span>comment:`

        const divElementAnswer = createElements('div', '', answerComment, {
            class: 'answer'
        });

        const formAnswerElement = createElements('form', '', divElementAnswer, {});

        const textAreaElement = createElements('textarea', '', formAnswerElement, {
            name: "postText",
            id: "comment",
            cols: "30",
            rows: "10"
        });

        const formDivElementWithLabelAndInput = createElements('div', '', formAnswerElement, {});
        const label1 = createElements('label','', formDivElementWithLabelAndInput, {
            'for': 'username'
        });
        label1.innerHTML = `Username <span class="red">*</span>`;

        const inputElement = createElements('input', '', formDivElementWithLabelAndInput, {
            type: "text", 
            name: "username",
            id: "username"
        });

        createElements('button', 'Post', formAnswerElement, {})

        let formElement = document.querySelector('form');
        formElement.setAttribute('dataset.id', postId);

        const postBtnElement = document.querySelector('button');
        postBtnElement.addEventListener('click', async (event) => {
            event.preventDefault();

            let formElem = document.querySelector('form');
            let postId = formElem.getAttribute('dataset.id');

            let formData = new FormData(formElem);
            let username = formData.get('username').trim();
            let content = formData.get('postText').trim();

            let createDate = new Date();

            try {
                if (!username || !content){
                    throw new Error('Invalid username or content')
                }

                const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({username, content, createDate, postId})
                });

                if (!response.ok){
                    throw new Error("Error");
                }

                fetchPost();
                formElem.reset();


            } catch (error) {
                alert(error)
            }

        })


    } catch (error) {
        alert(error.message);
    }
}
async function loadComments(postId) {
    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
        if (!res.ok){
            throw new Error('error')
        }
        const comments = await res.json();
        return Object.values(comments).filter(comment => comment.postId === postId);

    } catch (error) {
        alert(error.message)
    }
}

