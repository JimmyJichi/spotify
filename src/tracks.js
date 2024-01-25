import { tracks } from "./spotifyData.js";
let resultsSelect = document.getElementById("results-track");
let resultsPerPage = parseInt(resultsSelect.value);
let result = resultsPerPage;
const trackData = document.querySelector(".track-data");
const buttons = document.querySelectorAll(".track-button");
function tracksDisplay() {
  let time, firstPlayed;
  let tableR, cell, cellText;
  for (let i = result - resultsPerPage; i < result; i++) {
    if (i >= tracks.length) return;
    tableR = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      cell = document.createElement("td");
      cellText;
      if (j === 0) {
        cellText = document.createTextNode(`${i + 1}.${tracks[i].get("name")}`);
      } else if (j === 1)
        cellText = document.createTextNode(`${tracks[i].get("aname")}`);
      else if (j === 2)
        cellText = document.createTextNode(`${tracks[i].get("timesPlayed")}`);
      else if (j === 3) {
        time = (tracks[i].get("mins") / 60000 / 60).toFixed(2);
        cellText = document.createTextNode(`${time}`);
      } else {
        firstPlayed = new Date(tracks[i].get("firstPlayed"));
        cellText = document.createTextNode(`${firstPlayed.toUTCString()}`);
      }
      cell.appendChild(cellText);
      tableR.appendChild(cell);
    }
    trackData.appendChild(tableR);
  }
}

//-------------Function to clear table-----------------//

function clearTrackTable() {
  while (trackData.childNodes.length) {
    trackData.removeChild(trackData.childNodes[0]);
  }
}

//------------------SEEK TABLE(Next and previous buttons)------------------//

function seek() {
  buttons.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      let choice;
      choice = e.target.innerText;
      if (choice === "<<") {
        clearTrackTable();
        result = resultsPerPage;
        tracksDisplay();
      } else if (choice === "<"){
        if (result === resultsPerPage) return;
        clearTrackTable();
        result = result - resultsPerPage;
        tracksDisplay();
      } else if (choice === ">") {
        if (tracks.length - (result + resultsPerPage) <= resultsPerPage * -1) return;
        result = result + resultsPerPage;
        clearTrackTable();
        tracksDisplay();
      } else {
        result = tracks.length - (tracks.length % resultsPerPage) + resultsPerPage;
        clearTrackTable();
        tracksDisplay();
      }
    })
  );
  resultsSelect.addEventListener("change", function (e) {
    result = parseInt(e.target.value);
    resultsPerPage = parseInt(e.target.value);
    clearTrackTable();
    tracksDisplay();
  });
}
seek();

//------------SORT---------------//

const sortSelect = document.getElementById("sort-track");

sortSelect.addEventListener("change", sortTracks);

function sortTracks(e) {
  if (e.target.value === "minutes") {
    tracks.sort((a, b) => b.get("mins") - a.get("mins"));
    clearTrackTable();
    result = resultsPerPage;
    tracksDisplay();
  } else if (e.target.value === "times") {
    tracks.sort((a, b) => b.get("timesPlayed") - a.get("timesPlayed"));
    clearTrackTable();
    result = resultsPerPage;
    tracksDisplay();
  } else {
    tracks.sort(function (a, b) {
      return new Date(a.get("firstPlayed")) - new Date(b.get("firstPlayed"));
    });
    clearTrackTable();
    result = resultsPerPage;
    tracksDisplay();
  }
}

export { tracksDisplay, clearTrackTable };
