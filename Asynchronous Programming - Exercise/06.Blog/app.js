function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost);
    
    const postsArr = []
    async function loadPosts() {
        try {
            let response = await fetch('http://localhost:3030/jsonstore/blog/posts')
            let posts = await response.json();


            document.getElementById('posts').innerHTML = '';

            Object.entries(posts).forEach(([key, value]) => {
                let optionElement = document.createElement('option');
                optionElement.value = key;
                optionElement.textContent = value.title;
                document.getElementById('posts').appendChild(optionElement);
                postsArr.push({title: value.title, body: value.body})
            })


        } catch (error) {
            console.log(error);
        }
    }

    async function viewPost() {
        try {
            let selectedPost = document.getElementById('posts');
            let res = await fetch(`http://localhost:3030/jsonstore/blog/comments`)
            
            if(!res.ok) throw new Error();
            let dataPost = await res.json();
            const currentComments = Object.values(dataPost)
                                          .filter(el => el.postId===selectedPost.value)
          
            document.getElementById('post-title').textContent = selectedPost.selectedOptions[0].textContent;
            const po = postsArr.filter(p => p.title === selectedPost.selectedOptions[0].textContent)

            document.getElementById('post-body').innerHTML = `${po[0].body}`
            document.getElementById('post-comments').innerHTML = '';

            currentComments.forEach(el => {
                const liElement = document.createElement('li');
                liElement.textContent = el.text;
                document.getElementById('post-comments').appendChild(liElement)
            })


        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();