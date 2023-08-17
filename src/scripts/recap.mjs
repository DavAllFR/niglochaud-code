import * as recap from "../data/recap.json";

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

    if(recapEntry.time) {
        recapTime.innerText = recapEntry.time;
        recapText.appendChild(recapTime);
    }
    recapTitle.innerText = recapEntry.title;
    recapPlace.innerText = recapEntry.place;

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