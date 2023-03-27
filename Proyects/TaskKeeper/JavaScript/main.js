const levelAdvanced = 50;
const levelPro = 280;

function startTaskKeeper() {
  startDataBase();
  deployChangeName();
  generateUserName();
  changeUserName();
  deployMenu();
  updateUserLevel();
  resetProgram();
  updateProgressBarToday();
  updatePregressBarLevel();

  const btnNewTask = document.querySelector("#tk__btn__new__note");
  btnNewTask.addEventListener("click", () => {
    document.querySelector(".tk__section_menu").classList.remove("deploy__menu");
    document.querySelector(".tk__section__user__info").classList.remove("deploy__menu");

    deployNoteForm();
  });

  const btnCloseForm = document.querySelector("#tk__close__form");
  btnCloseForm.addEventListener("click", () => {
    deployNoteForm();
  });

  const btnKeepNote = document.querySelector("#btn__keepnote");
  btnKeepNote.addEventListener("click", addNoteCloseForm);
}
window.addEventListener("load", startTaskKeeper);



function deployChangeName() {
  const userLogo = document.querySelector(".tk__user__logo");
  userLogo.addEventListener("click", () => {
    const containerChangeName = document.querySelector(".container__input__change__name");
    containerChangeName.classList.toggle("deploy__change__name");
  });
}

function generateUserName() {
  const containerUserName = document.querySelector(".tk__user__name__container");
  if (localStorage.getItem("username")) {
    const userName = localStorage.getItem("username");
    containerUserName.innerHTML = "¡Hola " + userName + "!";
  } else {
    localStorage.setItem("username", "Usuario");
    containerUserName.innerHTML = "¡Hola Usuario!";
  }
}

function changeUserName() {
  let formChageName = document.querySelector("#form__change__name");
  formChageName.addEventListener("submit", () => {
    const name = document.querySelector("#input__change__name").value;
    localStorage.setItem("username", name);
    deployChangeName();
  });
}

function deployMenu() {
  const menuIcon = document.querySelector(".tk__icono__menu__container");
  menuIcon.addEventListener("click", () => {
    const menu = document.querySelector(".tk__section_menu");
    menu.classList.toggle("deploy__menu");
  });

  const iconUserInfo = document.querySelector(".tk__icono__user__info__container");
  iconUserInfo.addEventListener("click", () => {
    const sectionUserInfo = document.querySelector(".tk__section__user__info");
    sectionUserInfo.classList.toggle("deploy__menu");
  });
}

function updateUserLevel() {
  const levelContainer = document.querySelector(".tk__level__container");
  if (localStorage.getItem("taskDoneCounter")) {

    const taskDone = parseInt(localStorage.getItem("taskDoneCounter"));

    if (taskDone < levelAdvanced) {
      localStorage.setItem("UserLevel", "Amateur");
      levelContainer.innerHTML = '<img src="images/amateur__crown__image.webp">' +
        localStorage.getItem("UserLevel") +
        '<img src="images/amateur__crown__image.webp">';
    } else if (taskDone >= levelAdvanced && taskDone < levelPro) {
      localStorage.setItem("UserLevel", "Advanced");
      levelContainer.innerHTML = '<img src="images/advanced__crown__image.webp">' +
        localStorage.getItem("UserLevel") +
        '<img src="images/advanced__crown__image.webp">';
    } else if (taskDone >= levelPro) {
      localStorage.setItem("UserLevel", "Pro");
      levelContainer.innerHTML = '<img src="images/pro__crown__image.webp">' +
        localStorage.getItem("UserLevel") +
        '<img src="images/pro__crown__image.webp">';
    }
  } else {
    localStorage.setItem("UserLevel", "Amateur");
    levelContainer.innerHTML = '<img src="images/amateur__crown__image.webp">' +
      localStorage.getItem("UserLevel") +
      '<img src="images/amateur__crown__image.webp">';
  }

}

/* Esta funcion se encarga de reiniciar el PROGRAMA*/
function resetProgram() {
  document.querySelector(".tk__tools").addEventListener("click", () => {
    localStorage.clear();
    deleteIndexedDB();
    location.reload();
  });
}

function deployNoteForm() {
  const sectionNoteForm = document.querySelector(".tk__section__note__form");
  if (sectionNoteForm.classList.contains("deploy__form")) {
    sectionNoteForm.classList.remove("deploy__form");
  } else {
    sectionNoteForm.classList.add("deploy__form");

  }
}

function addNoteCloseForm() {
  addNote();
  deployNoteForm();
  tasksToDoCounterUp();
  tasksToDoTodayCounter();
  updateProgressBarToday();
}

function beforeShowNotes() {
  if (lastPrioritySearch === null) {
    showNotes();
  } else {
    lastSearch();
  }
}

function priorityColors() {
  workPriority = document.querySelectorAll(".tk__p__priority");
  workPriority.forEach(function (element) {
    if (element.innerHTML === "Alta") {
      element.style.backgroundColor = "#f22f7033";
    } else if (element.innerHTML === "Media") {
      element.style.backgroundColor = "rgba(1, 255, 1, 0.3)";
      element.style.color = "rgba(1, 148, 1)";
    } else if (element.innerHTML === "Baja") {
      element.style.backgroundColor = "rgba(230, 255, 3, 0.3)";
      element.style.color = "rgb(250, 171, 0)";
    }
  });
}

function deployMenuNote() {
  let menuNote = document.querySelectorAll(".tk__note__menu__container__button__image");
  let containerMenuNote = document.querySelectorAll(".tk__note__menu__container");
  let iconMenuNote = document.querySelectorAll(".tk__note__menu__image");

  iconMenuNote.forEach(function (element, position) {
    element.addEventListener("click", function () {
      menuNote[position].classList.toggle("deploy__note__menu");
      containerMenuNote[position].classList.toggle("deploy__container__note__menu");

    });
  });

  let btnDeleteTask = document.querySelectorAll(".note__btn__delete");
}

/* Estos son los contadores necesarios ---------------- */
function taskDoneCounter() {
  if (localStorage.getItem("taskDoneCounter")) {
    let tasksDone = parseInt(localStorage.getItem("taskDoneCounter"));
    tasksDone = tasksDone + 1;
    localStorage.setItem("taskDoneCounter", tasksDone);
  } else {
    localStorage.setItem("taskDoneCounter", "1");
  }
}

function tasksToDoCounterUp() {
  if (localStorage.getItem("tasksToDo")) {
    let tasksToDo = parseInt(localStorage.getItem("tasksToDo"));
    tasksToDo = tasksToDo + 1;
    localStorage.setItem("tasksToDo", tasksToDo);
  } else {
    localStorage.setItem("tasksToDo", "1");
  }
}

function tasksToDoCounterDown() {
  let tasksToDo = parseInt(localStorage.getItem("tasksToDo"));
  tasksToDo = tasksToDo - 1;
  localStorage.setItem("tasksToDo", tasksToDo);

  if (tasksToDo === 0) {
    localStorage.removeItem("tasksToDo");
    localStorage.removeItem("tasksToDoToday");
    localStorage.removeItem("Task-Key");
  }
}

function tasksToDoTodayCounter() {
  if (localStorage.getItem("tasksToDoToday")) {
    let tasksToDoToday = parseInt(localStorage.getItem("tasksToDoToday"));
    tasksToDoToday = tasksToDoToday + 1;
    localStorage.setItem("tasksToDoToday", tasksToDoToday);
  } else {
    localStorage.setItem("tasksToDoToday", "1");
  }
}

function tasksToDoTodayCounterDown() {
  let tasksToDoToday = parseInt(localStorage.getItem("tasksToDoToday"));
  tasksToDoToday = tasksToDoToday - 1;
  localStorage.setItem("tasksToDoToday", tasksToDoToday);
}

/* Esta funcion el PROGRESO DIARIO del Usuario */

function updateProgressBarToday() {
  let progressBarh2 = document.querySelector(".tk__progress__bar__porcent");
  let tasksToDoToday = parseInt(localStorage.getItem("tasksToDoToday"));
  let tasksToDo = parseInt(localStorage.getItem("tasksToDo"));
  let porcentByTaks = 100 / tasksToDoToday;
  let restTasks = tasksToDoToday - tasksToDo;

  if (localStorage.getItem("tasksToDoToday")) {
    progressBarPorcent = Math.round(restTasks * 100 / tasksToDoToday);
  } else {
    progressBarPorcent = 0;
  }

  progressBarh2.innerHTML = progressBarPorcent + "%";

  const progressBarToday = document.querySelector(".tk__progress__bar__today");
  progressBarToday.style.backgroundImage = `conic-gradient(#0089DC, ${restTasks * 100 / tasksToDoToday * 3.6}deg, transparent 0deg)`;
}

/* Esta funcion actualiza el PROGRESO a traves del TIEMPO */
function updatePregressBarLevel() {
  const nextLevelH2 = document.querySelector(".tk__progress__bar__porcent__next__level");
  const nextLevelTextImage = document.querySelector(".tk__progress__bar__text__next__level");
  const progressBarNextLevel = document.querySelector(".tk__progress__bar__next__level");
  let missingPorcentage;

  if (localStorage.getItem("taskDoneCounter")) {
    const taskDone = parseInt(localStorage.getItem("taskDoneCounter"));
    if (taskDone < levelAdvanced) {
      missingPorcentage = Math.round(taskDone * 100 / levelAdvanced);
      nextLevelTextImage.innerHTML = '<img src="images/advanced__crown__image.webp" alt="">' +
        '<p>' + 'Advanced' + '</p>' +
        '<img src="images/advanced__crown__image.webp" alt="">';
    } else if (taskDone >= levelAdvanced && taskDone < levelPro) {
      missingPorcentage = Math.round(taskDone * 100 / levelPro);
      nextLevelTextImage.innerHTML = '<img src="images/pro__crown__image.webp" alt="">' +
        '<p>' + 'Pro' + '</p>' +
        '<img src="images/pro__crown__image.webp" alt="">';
    } else if (taskDone >= levelPro) {
      missingPorcentage = 100;
      nextLevelTextImage.innerHTML = '<img src="images/pro__crown__image.webp" alt="">' +
        '<p>' + 'Pro' + '</p>' +
        '<img src="images/pro__crown__image.webp" alt="">';
    }

    nextLevelH2.innerHTML = missingPorcentage + "%";
    progressBarNextLevel.style.backgroundImage = `conic-gradient(#0089DC, ${missingPorcentage * 3.6}deg, transparent 0deg)`;
  } else {
    nextLevelH2.innerHTML = 0 + "%";
    progressBarNextLevel.style.backgroundImage = `conic-gradient(#0089DC, 0deg, transparent 0deg)`;
    nextLevelTextImage.innerHTML = '<img src="images/advanced__crown__image.webp" alt="">' +
      '<p>' + 'Advanced' + '</p>' +
      '<img src="images/advanced__crown__image.webp" alt="">';
  }

}

/* Esta funcion borra las TAREAS pero Agrega puntos al USUARIO */
function deleteTaskAddPonits(key) {
  deleteTask(key);
  tasksToDoCounterDown();
  updateProgressBarToday();
  taskDoneCounter();
  updateUserLevel();
  updatePregressBarLevel();
}

/* Esta funcion elimina tareas pero sin agregar puntos al usuario */
function beforeDeleteTask(key) {
  tasksToDoTodayCounterDown();
  tasksToDoCounterDown();
  deleteTask(key);
}