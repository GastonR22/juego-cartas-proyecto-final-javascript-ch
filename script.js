let randomCardsArray = [];

function assginRandomIdToCards() {
  let tenRandomNumberArray = giveRangeRandomNumbers(1, 10);
  for (let i = 0; i < 10; i++) {
    createSectionArticleImg(tenRandomNumberArray[i], i, true);
    createSectionArticleImg(tenRandomNumberArray[i], i, false);
  }
}

function createSectionArticleImg(randomNumber, index, isCopy) {
  index = index + 1;
  articleElement = document.createElement("article");
  imgBackElement = document.createElement("img");

  imgBackElement.src = "img/cartaImagenTrasera.jpg";
  imgBackElement.alt = "Imagen trasera carta";
  imgBackElement.classList.add("backCard");
  imgBackElement.addEventListener("click", onClickHelper);

  imgFrontElement = document.createElement("img");
  if (!isCopy) {
    imgFrontElement.src = `img/img${index}.svg`;
    imgFrontElement.id = randomNumber;
    imgBackElement.id = randomNumber + "O";
  } else {
    imgFrontElement.src = `img/img${index} - copia.svg`;
    imgFrontElement.id = randomNumber + ".1";
    imgBackElement.id = randomNumber + "C";
  }
  imgFrontElement.alt = "Imagen delantera carta";
  imgFrontElement.classList.add("frontCard");

  articleElement.appendChild(imgBackElement);
  articleElement.appendChild(imgFrontElement);

  randomCardsArray.push(articleElement);
}

function insertCardsElements() {
  let htmlSection = document.getElementById("cardSection");
  let twentyRandomNumbersArrayElements = giveRangeRandomNumbers(0, 20, 20);
  for (let i = 0; i < 20; i++) {
    htmlSection.appendChild(
      randomCardsArray[twentyRandomNumbersArrayElements[i]]
    );
  }
}

function giveRangeRandomNumbers(minRange, maxRange, excludeNumber) {
  let randomNumber;
  let usedNumbersArray = [];
  for (let i = 1; i < maxRange + 1; i++) {
    randomNumber = Math.round(Math.random() * (maxRange - minRange) + minRange);
    while (usedNumbersArray.includes(randomNumber) || randomNumber == excludeNumber){
      randomNumber = Math.round(Math.random() * (maxRange - minRange) + minRange);
    }
    usedNumbersArray.push(randomNumber);
  }

  return usedNumbersArray;
}

function modifyCssElement(idCard, numberOfTimesOnclick) {
  let backCardElement = document.getElementById(idCard);
  let frontCardElement = idCard.includes("O")? document.getElementById(idCard.replace("O", "")): document.getElementById(idCard.replace("C", ".1"));
  let frontCardValue = idCard.includes("O")? idCard.replace("O", ""): idCard.replace("C", "");
  let idFrontCard = idCard.includes("O")? idCard.replace("O", ""): idCard.replace("C", ".1");
  let winReturned;
  let beforeFrontCardElement;
  let winNumber;

  backCardElement.style.visibility = "hidden";
  setTimeout(function () {
    frontCardElement.style.visibility = "visible";
    setTimeout(() => {
        if (numberOfTimesOnclick == 1) {
            sessionStorage.setItem("cardId1", frontCardValue);
            sessionStorage.setItem("cardId1Id", idFrontCard);
            sessionStorage.setItem("backCard1Id", idCard);
          } else {
            beforeFrontCardElement = document.getElementById(sessionStorage.getItem("cardId1Id"));
            beforeBackCardElement = document.getElementById(sessionStorage.getItem("backCard1Id"));
            actualFrontCardElemnt = document.getElementById(idFrontCard);
        
            sessionStorage.setItem("cardId2", frontCardValue);
        
            winReturned = checkBothIds();
            setWinVisibility(winReturned,backCardElement,beforeBackCardElement,actualFrontCardElemnt,beforeFrontCardElement);
            if(winReturned){
              winNumber = addWinsTimeToStorage();
            }
            congratulationsWinnerAndRestart(winNumber);
            enableClick();
          }
    }, 500);
  }, 200);
}

function onClickHelper(event) {
  let eventSrcId = event.srcElement.id;
  let itemGetted = sessionStorage.getItem("numbersOfTimesOnclick");

  if (itemGetted == null) {
    sessionStorage.setItem("numbersOfTimesOnclick", 1);
  } else {
    disableClick();
    sessionStorage.setItem("numbersOfTimesOnclick", parseInt(itemGetted) + 1);
  }

  let lastItemGetted = sessionStorage.getItem("numbersOfTimesOnclick");
  modifyCssElement(eventSrcId, lastItemGetted);
}

function checkBothIds() {
  let card1 = sessionStorage.getItem("cardId1");
  let card2 = sessionStorage.getItem("cardId2");
  let win = false;

  if (card1 == card2) {
    win = true;
    swal("Buen trabajo", "Elegiste las cartas correctas", "info");
  }
  sessionStorage.removeItem("beforeFrontCard");
  sessionStorage.removeItem("numbersOfTimesOnclick");
  sessionStorage.removeItem("cardId1");
  sessionStorage.removeItem("cardId2");

  return win;
}

function setWinVisibility(isAWin,backCard,backCardBefore,actualFrontCard,beforeFrontCard){
  if (!isAWin) {
    actualFrontCard.style.visibility = "hidden";
    beforeFrontCard.style.visibility = "hidden";
    setTimeout(function () {
      backCard.style.visibility = "visible";
      backCardBefore.style.visibility = "visible";
    }, 200);
  }
}

function addWinsTimeToStorage(){
  let winsSessionStorage = sessionStorage.getItem("wins");

  if(winsSessionStorage != null){
    sessionStorage.setItem("wins", parseInt(winsSessionStorage) + 1);
  }else{
    sessionStorage.setItem("wins", 1);
  }

  return sessionStorage.getItem("wins");
}

function congratulationsWinnerAndRestart(numberOfWins){
  if(numberOfWins == 10){
    swal("Felicitaciones, Ganaste", "¿Listo para otra partida?", "success");
    sessionStorage.removeItem("wins");
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}


function disableClick(){
  let allImgElements = document.getElementsByTagName("img");
  Array.from(allImgElements).forEach(element => element.style.pointerEvents = "none");
}

function enableClick(){
  let allImgElements = document.getElementsByTagName("img");
  Array.from(allImgElements).forEach(element => element.style.pointerEvents = "auto");
}

assginRandomIdToCards();
insertCardsElements();
