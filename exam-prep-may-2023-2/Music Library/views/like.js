export async function like(ctx){
    console.log("From like")
    

    try {
        let albumId = ctx.params.id;
        console.log(albumId)

        let response = await fetch()


    } catch (error) {
        
    }
}

async function publishLike(albumId){
    try {
        let response = await fetch("http://localhost:3030/data/likes", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ albumId })
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