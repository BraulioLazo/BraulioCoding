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

function addNote() {
    generateKey();
    ideasKey = localStorage.getItem("Task-Key");
    const noteTitle = document.querySelector("#tk__input__title").value;
    const note = document.querySelector("#tk__note__area").value;
    const priority = document.querySelector("#tk__select__priority").value;

    const dbTransaction = db.transaction(["Task-Keeper"], "readwrite");
    const dbStorage = dbTransaction.objectStore("Task-Keeper");
    dbTransaction.addEventListener("complete", beforeShowNotes);

    const request = dbStorage.add({
        key: ideasKey,
        notetitle: noteTitle,
        note: note,
        priority: priority
    });

    document.querySelector("#tk__input__title").value = "";
    document.querySelector("#tk__note__area").value = "";
}

function showNotes() {

    boxNotes.innerHTML = "";
    const dbTransaction = db.transaction(["Task-Keeper"]);
    const dbStorage = dbTransaction.objectStore("Task-Keeper");
    const pointer = dbStorage.openCursor();
    pointer.addEventListener("success", (event) => {
        const pointer = event.target.result;
        if (pointer) {
            boxNotes.innerHTML += '<div class="tk__note__container">' +
                '<div class="tk__note__menu__container">' +
                '<div class="tk__note__menu__image">' +
                '<img src="images/note__menu__close__image.webp" alt="">' +
                '</div>' +

                '<div class="tk__note__menu__container__button__image">' +

                '<button class="note__btn__edit" onclick="selectTask(\'' + pointer.value.key + '\')">' + 'Editar' + '</button>' +
                '<button class="note__btn__delete" onclick="beforeDeleteTask(\'' + pointer.value.key + '\')">' + 'Eliminar' + '</button>' +
                '</div>' +
                '</div>' +

                '<div class="tk__container__title">' +
                pointer.value.notetitle +
                '</div>' +
                '<div class="tk__container__note">' +
                pointer.value.note +
                '</div>' +
                '<div class="tk__note__pririty__done__container">' +
                '<p class="tk__p__priority">' +
                pointer.value.priority +
                '</p>' +
                '<button class="tk__work__done" onclick="deleteTaskAddPonits(\'' + pointer.value.key + '\')">' + 'Terminado' + '</button>' +
                '</div>' +
                '</div>';
            pointer.continue();
            deployNoteForm()
        }
        priorityColors();
    });
}

