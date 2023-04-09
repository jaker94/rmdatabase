const API_URL = "https://rickandmortyapi.com/api/character";

async function fetchCharactersByPage(page) {
  const response = await fetch(`${API_URL}/?page=${page}`);
  const data = await response.json();
  return data.results;
}

function renderCharacters(characters, container) {
  container.innerHTML = characters
    .map((character) => postHTML(character))
    .join("");
}

function postHTML(character) {
  return `
    <div class="row__component">
      <img class="row__component-backdrop" src=${character.image}></img>
      <div class="row__component-title">${character.name}</div>
    </div>`;
}

async function init() {
  const row1Characters = await fetchCharactersByPage(1);
  const row2characters = await fetchCharactersByPage(2);

  const row1container = document.querySelector(".row__components");
  const row2container = document.querySelector(".row__components-2");

  renderCharacters(row1Characters, row1container);
  renderCharacters(row2characters, row2container);
}

init();

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

  const childElements = rowLoading.querySelectorAll(
    ".fa-chevron-left, .fa-chevron-right"
  );
  childElements.forEach((child) => {
    child.style.display = "none";
  });
}

function nextButton(rowNumber) {
  const slideWidth = document.querySelector(
    `.row__components-${rowNumber}`
  ).clientWidth;
  const slidesContainer = document.getElementById(
    `slides-container-${rowNumber}`
  );
  slidesContainer.scrollLeft += slideWidth;
}

function prevButton(rowNumber) {
  console.log("worked");
  const slideWidth = document.querySelector(
    `.row__components-${rowNumber}`
  ).clientWidth;
  const slidesContainer = document.getElementById(
    `slides-container-${rowNumber}`
  );
  slidesContainer.scrollLeft -= slideWidth;
}
