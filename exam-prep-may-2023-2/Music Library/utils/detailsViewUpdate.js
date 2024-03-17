

export function detailsViewBasedOnUser(){
    let information = sessionStorage.getItem("userData");
    return information !== null;
}

