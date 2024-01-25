import { albums } from "./spotifyData.js";
let resultsSelect = document.getElementById("results-album");
let resultsPerPage = parseInt(resultsSelect.value);
let result = resultsPerPage;
const albumData = document.querySelector(".album-data");
const buttons = document.querySelectorAll(".album-button");

function albumDisplay() {
  let time, firstPlayed;
  let tableR, cell, cellText;
  for (let i = result - resultsPerPage; i < result; i++) {
    if (i >= albums.length) return;
    tableR = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      cell = document.createElement("td");
      cellText;
      if (j === 0)
        cellText = document.createTextNode(`${i + 1}.${albums[i].get("name")}`);
      else if (j === 1)
        cellText = document.createTextNode(`${albums[i].get("aname")}`);
      else if (j === 2)
        cellText = document.createTextNode(`${albums[i].get("timesPlayed")}`);
      else if (j === 3) {
        time = (albums[i].get("mins") / 60000 / 60).toFixed(2);
        cellText = document.createTextNode(`${time}`);
      } else {
        firstPlayed = new Date(albums[i].get("firstPlayed"));
        cellText = document.createTextNode(`${firstPlayed.toUTCString()}`);
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
      if (choice === "<<") {
        clearAlbumTable();
        result = resultsPerPage;
        albumDisplay();
      } else if (choice === "<"){
        if (result === resultsPerPage) return;
        clearAlbumTable();
        result = result - resultsPerPage;
        albumDisplay();
      } else if (choice === ">") {
        if (albums.length - (result + resultsPerPage) <= resultsPerPage * -1) return;
        result = result + resultsPerPage;
        clearAlbumTable();
        albumDisplay();
      } else {
        result = albums.length - (albums.length % resultsPerPage) + resultsPerPage;
        clearAlbumTable();
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

const sortSelect = document.getElementById("sort-album");

sortSelect.addEventListener("change", sortAlbums);

function sortAlbums(e) {
  if (e.target.value === "minutes") {
    albums.sort((a, b) => b.get("mins") - a.get("mins"));
    clearAlbumTable();
    result = resultsPerPage;
    albumDisplay();
  } else if (e.target.value === "times") {
    albums.sort((a, b) => b.get("timesPlayed") - a.get("timesPlayed"));
    clearAlbumTable();
    result = resultsPerPage;
    albumDisplay();
  } else {
    albums.sort(function (a, b) {
      return new Date(a.get("firstPlayed")) - new Date(b.get("firstPlayed"));
    });
    clearAlbumTable();
    result = resultsPerPage;
    albumDisplay();
  }
}

export { albumDisplay, clearAlbumTable };
