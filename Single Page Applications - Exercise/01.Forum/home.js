// show home page
// load posts
// post functionality => create posts 
//cancel functionality

async function loadPosts() {
    let topicDivElement = document.querySelector('.topic-title');
    topicDivElement.replaceChild();

    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if (!response.ok){
            let error = await response.json()
            throw new Error(error.message)
        }
        let posts = await response.json();
        
    } catch (error) {
        
    }
}