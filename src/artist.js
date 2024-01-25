import { artists } from "./spotifyData.js";
let resultsSelect = document.getElementById("results-artist");
let resultsPerPage = parseInt(resultsSelect.value);
let result = resultsPerPage;
const artistData = document.querySelector(".artist-data");
const buttons = document.querySelectorAll(".artist-button");

function artistDisplay() {
  let time;
  let tableR, cell, cellText;
  for (let i = result - resultsPerPage; i < result; i++) {
    if (i >= artists.length) return;
    tableR = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      cell = document.createElement("td");
      cellText;
      if (j === 0) {
        cellText = document.createTextNode(
          `${i + 1}.${artists[i].get("name")}`
        );
      } else if (j === 1) {
        cellText = document.createTextNode(`${artists[i].get("timesPlayed")}`);
      } else if (j === 2) {
        time = (artists[i].get("mins") / 60000).toFixed(2);
        cellText = document.createTextNode(`${time}`);
      } else cellText = document.createTextNode(`${(time / 60).toFixed(2)}`);
      cell.appendChild(cellText);
      tableR.appendChild(cell);
    }
    artistData.appendChild(tableR);
  }
}

//-------------Function to clear table-----------------//

function clearArtistTable() {
  while (artistData.childNodes.length) {
    artistData.removeChild(artistData.childNodes[0]);
  }
}

//------------------SEEK TABLE(Next and previous buttons)------------------//

function seek() {
  buttons.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      let choice;
      choice = e.target.innerText;
      if (choice === "Next") {
        if (artists.length - (result + resultsPerPage) <= resultsPerPage * -1) return;
        result = result + resultsPerPage;
        clearArtistTable();
        artistDisplay();
      } else {
        if (result === resultsPerPage) return;
        clearArtistTable();
        result = result - resultsPerPage;
        artistDisplay();
      }
    })
  );
  resultsSelect.addEventListener("change", function (e) {
    result = parseInt(e.target.value);
    resultsPerPage = parseInt(e.target.value);
    clearArtistTable();
    artistDisplay();
  });
}

seek();

//------------SORT---------------//

const sortButton = document.querySelector(".sort-artist");

sortButton.addEventListener("click", sortByMinutes);

function sortByMinutes(e) {
  if (e.target.innerText === "Sort by Minutes") {
    sortButton.textContent = "Sort by Times Listened";
    artists.sort((a, b) => b.get("mins") - a.get("mins"));
    clearArtistTable();
    result = resultsPerPage;
    artistDisplay();
  } else {
    sortButton.textContent = "Sort by Minutes";
    artists.sort((a, b) => b.get("timesPlayed") - a.get("timesPlayed"));
    clearArtistTable();
    result = resultsPerPage;
    artistDisplay();
  }
}

export { artistDisplay, clearArtistTable };
