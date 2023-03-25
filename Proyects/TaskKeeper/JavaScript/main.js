function startTaskKeeper() {
  deployChangeName();
  generateUserName();
  changeUserName();
  deployMenu();
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

function changeUserName(){
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