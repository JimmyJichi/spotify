import { tracks } from "./spotifyData.js";
let resultsSelect = document.getElementById("results-track");
let resultsPerPage = parseInt(resultsSelect.value);
let result = resultsPerPage;
const trackData = document.querySelector(".track-data");
const buttons = document.querySelectorAll(".track-button");
function tracksDisplay() {
  let time;
  let tableR, cell, cellText;
  for (let i = result - resultsPerPage; i < result; i++) {
    if (i >= tracks.length) return;
    tableR = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      cell = document.createElement("td");
      cellText;
      if (j === 0) {
        cellText = document.createTextNode(`${i + 1}.${tracks[i].get("name")}`);
      } else if (j === 1)
        cellText = document.createTextNode(`${tracks[i].get("aname")}`);
      else if (j === 2)
        cellText = document.createTextNode(`${tracks[i].get("timesPlayed")}`);
      else {
        time = (tracks[i].get("mins") / 60000 / 60).toFixed(2);
        cellText = document.createTextNode(`${time}`);
      }
      cell.appendChild(cellText);
      tableR.appendChild(cell);
    }
    trackData.appendChild(tableR);
  }
  console.log(tracks.length);
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

const sortButton = document.querySelector(".sort-track");

sortButton.addEventListener("click", sortByMinutes);

function sortByMinutes(e) {
  if (e.target.innerText === "Sort by Minutes") {
    sortButton.textContent = "Sort by Times Listened";
    tracks.sort((a, b) => b.get("mins") - a.get("mins"));
    clearTrackTable();
    result = resultsPerPage;
    tracksDisplay();
  } else {
    sortButton.textContent = "Sort by Minutes";
    tracks.sort((a, b) => b.get("timesPlayed") - a.get("timesPlayed"));
    clearTrackTable();
    result = resultsPerPage;
    tracksDisplay();
  }
}

export { tracksDisplay, clearTrackTable };
