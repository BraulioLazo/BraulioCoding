function startTaskKeeper(){
  deployMenu();
}
window.addEventListener("load", startTaskKeeper);

function deployMenu(){
    const menuIcon = document.querySelector(".tk__icono__menu__container");
    menuIcon.addEventListener("click", () => {
        const menu = document.querySelector(".tk__section_menu");
        menu.classList.toggle("deploy__menu");
    })
}