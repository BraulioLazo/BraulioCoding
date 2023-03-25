function startTaskKeeper() {
  deployChangeName();
  deployMenu();
}
window.addEventListener("load", startTaskKeeper);

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

function deployChangeName() {
  const userLogo = document.querySelector(".tk__user__logo");
  userLogo.addEventListener("click", () => {
    const containerChangeName = document.querySelector(".container__input__change__name");
    containerChangeName.classList.toggle("deploy__change__name");
  });
}