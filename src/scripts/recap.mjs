import * as recap from "../data/recap.json";
import { openMediaPopUp } from "./popup.mjs";

document.addEventListener("DOMContentLoaded", ()=>{
    console.log(recap);
    refreshRecap();
});

function refreshRecap(){
    recap.forEach(recapEntry => {
        document.querySelector("#recap").appendChild(
            Array.isArray(recapEntry) ?
                createMultiRecapElements(recapEntry)
                : createRecapElement(recapEntry)
        )
    });
}

function createRecapElement(recapEntry){
    if(!recapEntry.title && !recapEntry.place) return null;

    const recapEl = document.createElement("div");

    const recapTimeline = document.createElement("div");
    const recapTimelineDot = document.createElement("div");
    const recapTimelineLine = document.createElement("div");
    
    const recapContent = document.createElement("div");

    const recapText = document.createElement("div");
    const recapTime = document.createElement("p");
    const recapTitle = document.createElement("h3");
    const recapPlace = document.createElement("p");

    const recapMedia = document.createElement("div");

    recapEl.className = "entry";
    recapTimeline.className = "timeline";
    recapTimelineDot.className = "dot";
    recapTimelineLine.className = "line";
    recapContent.className = "content";
    recapText.className = "text";
    recapTime.className = "time";
    recapTitle.className = "title";
    recapPlace.className = "place";
    recapMedia.className = "media";
    
    if(recapEntry.time) {
        recapTime.innerText = new Date(recapEntry.time) ? new Date(recapEntry.time).toLocaleTimeString("fr-FR", {minute:"numeric",hour:"numeric"}) : recapEntry.time;
        recapText.appendChild(recapTime);
    }
    recapTitle.innerText = recapEntry.title;
    recapPlace.innerText = recapEntry.place;
    if(recapEntry.medias){
        const mediaTitle = document.createElement("h4");
        const mediaContainer = document.createElement("div");
        mediaContainer.className = "media-container";

        mediaTitle.innerText = "Photos et vidéos";
        recapEntry.medias.map(media => createMediaThumb(media)).forEach(el => mediaContainer.appendChild(el));

        recapMedia.appendChild(mediaTitle);
        recapMedia.appendChild(mediaContainer);
    }

    recapTimeline.appendChild(recapTimelineDot);
    recapTimeline.appendChild(recapTimelineLine);
    recapText.appendChild(recapTitle);
    recapText.appendChild(recapPlace);
    recapEl.appendChild(recapTimeline);
    recapContent.appendChild(recapText);
    recapContent.appendChild(recapMedia);
    recapEl.appendChild(recapContent)

    return recapEl;
}

function createMultiRecapElements(recapMulti){
    const recapMultiEl = document.createElement("div");

    recapMultiEl.className = "multi";

    recapMulti.map(_entry => createRecapElement(_entry)).forEach(el => recapMultiEl.appendChild(el));

    return recapMultiEl;    
}

function createMediaThumb(media){
    const mediaEl = document.createElement("div");
    const mediaThumb = document.createElement("video");
    const mediaCTA = document.createElement("div");
    mediaEl.className = "media-element";
    mediaThumb.className = "media-thumb";
    mediaCTA.className = "media-cta";

    if(["webm","mp4"].includes(media.split(".").pop())){
        mediaEl.classList.add("video");
        mediaThumb.src = media;
        mediaEl.appendChild(mediaThumb);
        mediaEl.appendChild(mediaCTA);
    }else{
        mediaEl.style.backgroundImage += `url(${media})`;
    }

    mediaEl.addEventListener("click", ()=>{
        openMediaPopUp(media);
    });

    return mediaEl;
}