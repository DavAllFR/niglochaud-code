let recap;

document.addEventListener("DOMContentLoaded", ()=>{
    fetch("/data/recap.json")
        .then(res=>res.json())
        .then(json=>{
            recap = json;
        });
});