import { dayEnd, dayStart, hoursListened } from "./spotifyData.js";
const ele = document.createElement("p");
const ele2 = document.createElement("p");
const ele4 = document.createElement("p");
const dataInfo = document.querySelector(".data-result");
let mins, hours, days;

//----------------------HOME DATA----------------------//
function home() {
  mins = (hoursListened / 60000).toFixed(2);
  hours = (mins / 60).toFixed(2);
  days = (hours / 24).toFixed(2);
  ele.textContent = `This data is only valid from ${dayStart} to ${dayEnd}`;
  ele.classList.add("data-result");
  dataInfo.appendChild(ele);
  ele2.textContent = `You have listened to music for ${mins} mins or ${hours} hours or ${days} days`;
  ele2.classList.add("data-result");
  dataInfo.appendChild(ele2);
}

function invalidData() {
  ele4.textContent = `Dates selected seem to be out of range in relative to data input`;
  ele4.classList.add("data-result");
  dataInfo.appendChild(ele4);
}

const ele3 = document.createElement("p");

function noUpload() {
  ele3.textContent = `No file selected to upload`;
  dataInfo.appendChild(ele3);
}

function clearMessage() {
  while (dataInfo.childNodes.length) {
    dataInfo.removeChild(dataInfo.childNodes[0]);
  }
}

export { home, noUpload, clearMessage, invalidData };
