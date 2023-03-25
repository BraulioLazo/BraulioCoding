let db;
let boxNotes;
let notePriority;
let lastPrioritySearch = null;

function generateKey() {
    if (localStorage.getItem("Task-Key")) {
        let ideasKey = localStorage.getItem("Task-Key");
        ideasKey = parseInt(ideasKey) + 1;
        localStorage.setItem("Task-Key", ideasKey);
    } else {
        localStorage.setItem("Task-Key", 0);
    }
}

function startDataBase() {
    boxNotes = document.querySelector(".tk__section__notes__container__notes");
    const request = indexedDB.open("DataBase__Task__keeper");

    request.addEventListener("error", showError);
    request.addEventListener("success", start);
    request.addEventListener("upgradeneeded", createStorage);
}

function showError(event) {
    alert("Tenemos un ERROR: " + event.code + " / " + event.message);
}

function start(event) {
    db = event.target.result;
}

function createStorage(event) {
    const dataBase = event.target.result;
    const storageTask = dataBase.createObjectStore("Task-Keeper", { keyPath: "key" });

    storageTask.createIndex("LookForPriority", "priority", { unique: false });
}