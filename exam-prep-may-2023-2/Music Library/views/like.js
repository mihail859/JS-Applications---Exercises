export async function like(ctx){
    // console.log("From like")
    

    // try {
    //     let albumId = ctx.params.id;
    //     console.log(albumId);
    //     console.log(albumId)
    //     console.log(ctx)

        
    //     await publishLike(albumId)
    //     let likes = await totalLikes(albumId)
    //     console.log(likes);


    // } catch (error) {
        
    // }
}

async function publishLike(albumId){
    try {
        const accessToken = JSON.parse(sessionStorage.getItem("userData")).accessToken;
        let response = await fetch("http://localhost:3030/data/likes", {
            method: "POST",
            headers: {"Content-Type" : "application/json",  'X-Authorization': accessToken},
            body: JSON.stringify({ albumId })
        })
        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await response.text();
        console.log(data);


    } catch (error) {
        alert(error.message)
    }
}

export async function totalLikes(albumId){
    try {
        let response = await fetch(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`, {
            method: "GET"
        })
        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await response.json();
        return data;

        


    } catch (error) {
        alert(error.message)
    }
}

async function isLiked(albumId){
    let  userId = JSON.parse(sessionStorage.getItem("userData")).id;

    try {
        let response = await fetch(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`, {
            method: "GET"
        })
        if (!response.ok){
            throw new Error(response.statusText)
        }
        let data = await response.json();
        console.log(data);


    } catch (error) {
        alert(error.message)
    }
}