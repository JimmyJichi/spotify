import { albums } from "./spotifyData.js";
let resultsSelect = document.getElementById("results-album");
let resultsPerPage = parseInt(resultsSelect.value);
let result = resultsPerPage;
const albumData = document.querySelector(".album-data");
const buttons = document.querySelectorAll(".album-button");

function albumDisplay() {
  let time;
  let tableR, cell, cellText;
  for (let i = result - resultsPerPage; i < result; i++) {
    if (i >= albums.length) return;
    tableR = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      cell = document.createElement("td");
      cellText;
      if (j === 0)
        cellText = document.createTextNode(`${i + 1}.${albums[i].get("name")}`);
      else if (j === 1)
        cellText = document.createTextNode(`${albums[i].get("aname")}`);
      else if (j === 2)
        cellText = document.createTextNode(`${albums[i].get("timesPlayed")}`);
      else {
        time = (albums[i].get("mins") / 60000 / 60).toFixed(2);
        cellText = document.createTextNode(`${time}`);
      }
      cell.appendChild(cellText);
      tableR.appendChild(cell);
    }
    albumData.appendChild(tableR);
  }
}

//-------------Function to clear table-----------------//

function clearAlbumTable() {
  while (albumData.childNodes.length) {
    albumData.removeChild(albumData.childNodes[0]);
  }
}

//------------------SEEK TABLE(Next and previous buttons)------------------//

function seek() {
  buttons.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      let choice;
      choice = e.target.innerText;
      if (choice === "Next") {
        if (albums.length - (result + resultsPerPage) <= resultsPerPage * -1) return;
        result = result + resultsPerPage;
        clearAlbumTable();
        albumDisplay();
      } else {
        if (result === resultsPerPage) return;
        clearAlbumTable();
        result = result - resultsPerPage;
        albumDisplay();
      }
    })
  );
  resultsSelect.addEventListener("change", function (e) {
    result = parseInt(e.target.value);
    resultsPerPage = parseInt(e.target.value);
    clearAlbumTable();
    albumDisplay();
  });
}
seek();

//------------SORT--------------//

const sortButton = document.querySelector(".sort-album");

sortButton.addEventListener("click", sortByMinutes);

function sortByMinutes(e) {
  if (e.target.innerText === "Sort by Minutes") {
    sortButton.textContent = "Sort by Times Listened";
    albums.sort((a, b) => b.get("mins") - a.get("mins"));
    clearAlbumTable();
    result = resultsPerPage;
    albumDisplay();
  } else {
    sortButton.textContent = "Sort by Minutes";
    albums.sort((a, b) => b.get("timesPlayed") - a.get("timesPlayed"));
    clearAlbumTable();
    result = resultsPerPage;
    albumDisplay();
  }
}

export { albumDisplay, clearAlbumTable };
