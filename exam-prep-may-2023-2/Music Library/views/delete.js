import page from "../node_modules/page/page.mjs"

export  async function deleteFunctionality(ctx, next){
    console.log("From deleteFunctionality")

    

    const confirmed = window.confirm("Are you sure you want to delete this item?");

    if (!confirmed){
        return
    }

    try {
        let id = ctx.params.id;
        console.log(id)

        const accessToken = JSON.parse(sessionStorage.getItem("userData")).accessToken;

        let response = await fetch("http://localhost:3030/data/albums/" + id, {
            method: "DELETE",
            headers: {
                
                'X-Authorization': accessToken
            }
            
        })

        if (!response.ok){
            throw new Error(response.statusText)
        }

        page.redirect("/dashboard")


    } catch (error) {
        alert(error.message)
    }
}