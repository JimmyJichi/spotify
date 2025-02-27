import { platform, countries } from "./spotifyData.js";

const platformList = document.querySelector(".platform");
const countriesList = document.querySelector(".countries");

function clearOtherData() {
  while (platformList.childNodes.length > 2) {
    platformList.removeChild(platformList.childNodes[0]);
  }
  while (countriesList.childNodes.length > 2) {
    countriesList.removeChild(countriesList.childNodes[0]);
  }
}

function other() {
  let li;
  platform.forEach((ele) => {
    li = document.createElement("li");
    li.textContent = ele;
    platformList.appendChild(li);
  });
}

function other2() {
  let li;
  countries.forEach((ele) => {
    li = document.createElement("li");
    li.textContent = getFlagEmoji(ele) + ele;
    countriesList.appendChild(li);
  });
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export { other, other2, clearOtherData };
