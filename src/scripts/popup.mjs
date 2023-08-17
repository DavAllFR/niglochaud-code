export function openMediaPopUp(mediaUrl){
    const popUp = createPopUp();

    const isVideo = ["webm","mp4"].includes(mediaUrl.split(".").pop());
    const mediaEl = document.createElement(isVideo ? "video":"img");
    mediaEl.src = mediaUrl;
    if(isVideo) {
        mediaEl.controls = true;
        mediaEl.addEventListener("click", (e)=>{
            e.stopPropagation();
        });
    }

    popUp.element.appendChild(mediaEl);
    document.body.appendChild(popUp.element);

    return popUp;
}

function createPopUp(){
    const popUpEl = document.createElement("div");
    popUpEl.className = "popUp";

    const close = ()=>{
        popUpEl.remove();
    }

    popUpEl.addEventListener("click", ()=> close());

    return {element: popUpEl, close};
}