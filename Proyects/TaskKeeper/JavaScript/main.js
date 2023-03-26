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
  
  const btnNewTask = document.querySelector("#tk__btn__new__note");
  btnNewTask.addEventListener("click", () => {
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

function resetProgram() {
  document.querySelector(".tk__tools").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}

function deployNoteForm() {
  const sectionNoteForm = document.querySelector(".tk__section__note__form");
  sectionNoteForm.classList.toggle("deploy__form");
}

function addNoteCloseForm() {
  addNote();
  deployNoteForm();
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

  btnDeleteTask = document.querySelectorAll(".note__btn__delete");
}