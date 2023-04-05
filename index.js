// ROW 1
async function getCharacters() {
  const characters = await fetch(
    "https://rickandmortyapi.com/api/character/?page=1"
  );
  const characterData = await characters.json();
  const characterArray = characterData.results;
  const characterListEl = document.querySelector(`.row__components`);

  characterListEl.innerHTML = characterArray
    .map((character) => postHTML(character))
    .join("");
}
getCharacters();

// ROW 2

async function getCharacters2() {
  const characters = await fetch(
    "https://rickandmortyapi.com/api/character/?page=2"
  );
  const characterData = await characters.json();
  const characterArray = characterData.results;
  const characterListEl = document.querySelector(`.row__components-2`);

  characterListEl.innerHTML = characterArray
    .map((character) => postHTML(character))
    .join("");
}

getCharacters2();

// SEARCH BAR Function all characters

async function onSearchChange(event) {
  const name = event.target.value;
  const characters = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}`
  );
  const rowWrapper = document.querySelector(".wrapper-2");
  const rowLoading = document.querySelector(".row__components--wrapper");
  const loadedStyles = document.querySelector(".row__components");
  rowLoading.classList.add("row__loading");
  rowWrapper.classList.add("row__loaded");
  loadedStyles.classList.add("loadedStyles");
  rowLoading.style.display = "none";
  const characterData = await characters.json();
  const characterArray = characterData.results;
  const characterListEl = document.querySelector(`.row__components`);

  setTimeout(() => {
    rowLoading.classList.remove(`row__loading`);
    rowLoading.style.display = "block";
  }, 1000); 

  characterListEl.innerHTML = characterArray
    .map((character) => postHTML(character))
    .join("");

    const loadedRows = document.querySelectorAll(".row__component");
    loadedRows.forEach((row) => {
      row.classList.add("loadedRows");
    });

    const childElements = rowLoading.querySelectorAll('.fa-chevron-left, .fa-chevron-right');
  childElements.forEach((child) => {
  child.style.display = "none";
});

}

// Dynamic HTML insert
function postHTML(character) {
  return `
    <div class="row__component">
      <img class="row__component-backdrop" src=${character.image}></img>
      <div class="row__component-title">${character.name}</div>
    </div>`;
}
// Scroll functions

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".row__components");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});

const slidesContainer2 = document.getElementById("slides-container-2");
const slide2 = document.querySelector(".row__components-2");
const prevButton2 = document.getElementById("slide-arrow-prev-2");
const nextButton2 = document.getElementById("slide-arrow-next-2");

nextButton2.addEventListener("click", () => {
  const slideWidth = slide2.clientWidth;
  slidesContainer2.scrollLeft += slideWidth;
});

prevButton2.addEventListener("click", () => {
  const slideWidth = slide2.clientWidth;
  slidesContainer2.scrollLeft -= slideWidth;
});
