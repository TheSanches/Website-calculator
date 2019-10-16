let houses = document.querySelectorAll('.houses span');
let housesCost = 0;
let housesName = '';
for (let i = 0; i < houses.length; i++) {
  houses[i].onclick = function () {
    housesCost = houses[i].getAttribute('data-cost'); 
    housesName = houses[i].getAttribute('data-name'); 
    housesCost = parseInt(housesCost);
    for (let i = 0; i < houses.length; i++) {
      houses[i].classList.remove('houses-active');
    }
    this.classList.add('houses-active');
  }
}

function garageNeed() {
  let garageTrue = document.getElementById('garage-true');
  let garageTrueFalse = document.querySelector('.garage-true-false');
  let garageCar = document.querySelectorAll('#garage-number, #garage-car');
  if (garageTrue.checked) {
    garageTrueFalse.style.opacity = '0';
    garageCar[0].style.opacity = '1';
    garageCar[0].style.transform = 'scale(1)';
    garageCar[0].style.position = 'static';
    garageCar[1].style.position = 'static';
    garageCar[1].style.opacity = '1';
    garageCar[1].style.transform = 'scale(1)';
  }
  else{
    garageTrueFalse.style.opacity = '1';
    garageCar[0].style.opacity = '0';
    garageCar[0].style.transform = 'scale(0)';
    garageCar[0].style.position = 'absolute';
    garageCar[1].style.position = 'absolute';
    garageCar[1].style.opacity = '0';
    garageCar[1].style.transform = 'scale(0)';
  }
}


let calculate = document.getElementById('calculate');
let reset = document.getElementById('reset');

let nameCalcOut = document.querySelector('.sum-calc-out');

let floors = document.getElementById('floor');
let rooms = document.getElementById('room');
let fireplaces = document.getElementById('fireplace');
let heatings = document.getElementById('heating');
let bathrooms = document.getElementById('bathroom');
let garageNumbers = document.getElementById('garage-number');
let garageCars = document.getElementById('garage-car');
let housesErr = document.querySelector('.houses');

let sumForm = 0; 
let choice; 

let formOrder = document.querySelector('#form');

arrInput = [floors, rooms, fireplaces, heatings, bathrooms, garageNumbers, garageCars];

function calc() {
  let floor = document.getElementById('floor').value;
  let room = document.getElementById('room').value;
  let fireplace = document.getElementById('fireplace').value;
  let heating = document.getElementById('heating').value;
  let bathroom = document.getElementById('bathroom').value;
  let garageTrue = document.getElementById('garage-true');
  let garageNumber = document.getElementById('garage-number').value;
  let garageCar = document.getElementById('garage-car').value;
  let sumCalcPrice = document.querySelector('.sum-calc-price p');
  let repl;
  let houseTrue = true;
  let garagesTrue = true;
  let totalSum = 0;

  floor = parseInt(floor);
  room = parseInt(room);
  fireplace = parseInt(fireplace);
  heating = parseInt(heating);
  bathroom = parseInt(bathroom);
  garageNumber = parseInt(garageNumber);
  garageCar = parseInt(garageCar);

  bathroom = bathroom * 25588;

  sumCalcContainer.style.left = '0';


  garageCar *= garageNumber;

  if (garageTrue.checked && housesCost != 0) {
    if (Number.isNaN(garageNumber) || Number.isNaN(garageCar)) {
      garagesTrue = false;
    } else {
      totalSum = housesCost + floor + room + fireplace + heating + bathroom + garageCar;
      outName(1);
    }
  } else if (housesCost != 0) {
    totalSum = housesCost + floor + room + fireplace + heating + bathroom;
    outName(2);
  } else {
    houseTrue = false;
  }
  for (let r = 0; r < arrInput.length; r++) {

    if (houseTrue == false) {
      sumCalcPrice.innerHTML = 'Вы не выбрали тип дома';
      housesErr.style.border = '1px solid red';
    } else if (Number.isNaN(floor)) {
      outName(0);
      sumCalcPrice.innerHTML = 'Количество этажей';

      arrInput[r].classList.remove('error-border');
      housesErr.style.border = '0';
      if(arrInput[r].value == sumCalcPrice.innerHTML){
        arrInput[r].classList.add('error-border');
      }

    } else if (Number.isNaN(room)) {
      outName(0);
      sumCalcPrice.innerHTML = 'Количество комнат';
      housesErr.style.border = '0';
      arrInput[r].classList.remove('error-border');
      if(arrInput[r].value == sumCalcPrice.innerHTML){
        arrInput[r].classList.add('error-border');
      }
    } else if (Number.isNaN(fireplace)) {
      outName(0);
      sumCalcPrice.innerHTML = 'Камин';
      housesErr.style.border = '0';
      arrInput[r].classList.remove('error-border');
      if(arrInput[r].value == sumCalcPrice.innerHTML){
        arrInput[r].classList.add('error-border');
      }
    } else if (Number.isNaN(heating)) {
      outName(0);
      sumCalcPrice.innerHTML = 'Вид отопления';
      housesErr.style.border = '0';
      arrInput[r].classList.remove('error-border');
      if(arrInput[r].value == sumCalcPrice.innerHTML){
        arrInput[r].classList.add('error-border');
      }
    } else if (Number.isNaN(bathroom)) {
      outName(0);
      sumCalcPrice.innerHTML = 'Количество санузлов';
      housesErr.style.border = '0';
      arrInput[r].classList.remove('error-border');
      arrInput[4].classList.add('error-border');
    } else if (garagesTrue == false) {
      outName(0);
      sumCalcPrice.innerHTML = 'Количество гаражей';
      housesErr.style.border = '0';
      arrInput[r].classList.remove('error-border');
      if(arrInput[r].value == sumCalcPrice.innerHTML){
        arrInput[r].classList.add('error-border');
      }
    } else {
      totalSum += ''; 
      repl = totalSum.replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1"); 
      sumCalcPrice.innerHTML = repl + ' грн.';
      arrInput[r].classList.remove('error-border');
      housesErr.style.border = '0';
      sumForm = repl + 'грн';
    }
  }
}

function resetCalc() {

  document.getElementById('floor').options[0].selected = true;
  document.getElementById('room').options[0].selected = true;
  document.getElementById('fireplace').options[0].selected = true;
  document.getElementById('heating').options[0].selected = true;
  document.getElementById('bathroom').value = '';
  document.getElementById('garage-number').options[0].selected = true;
  document.getElementById('garage-car').options[0].selected = true;

  for (let i = 0; i < houses.length; i++) {
    houses[i].classList.remove('houses-active');
  }
  housesCost = 0;
  housesErr.style.border = '0';

  for (let r = 0; r < arrInput.length; r++) {
    arrInput[r].classList.remove('error-border');
  }

  document.querySelector('.sum-calc-price p').innerHTML = '';

  document.getElementById('garage-true').checked = '';

  nameCalcOut.innerHTML = '';

  formOrder.style.display = 'none';

  sumCalcContainer.style.left = '-100%';

  garageNeed();
}

function outName(n){


  let fireplacesIndex = fireplaces.selectedIndex;
  let fireplacesOptions = fireplaces.options;
  let floorsIndex = floors.selectedIndex;
  let floorsOptions = floors.options;
  let roomsIndex = rooms.selectedIndex;
  let roomsOptions = rooms.options;
  let heatingsIndex = heatings.selectedIndex;
  let fheatingsOptions = heatings.options;
  let garageNumbersIndex = garageNumbers.selectedIndex;
  let garageNumbersOptions = garageNumbers.options;
  let garageCarsIndex = garageCars.selectedIndex;
  let garageCarsOptions = garageCars.options;

  if(n == 1){
    nameCalcOut.innerHTML = '<p>' + housesName + '</p><p>Количество этажей: ' +  floorsOptions[floorsIndex].text + '</p><p>Количество комнат: ' + roomsOptions[roomsIndex].text + '</p><p>' + fireplacesOptions[fireplacesIndex].text + '</p><p>' + fheatingsOptions[heatingsIndex].text + '</p><p>Количество санузлов: ' + bathrooms.value + '</p><p>Количество гаражей: ' + garageNumbersOptions[garageNumbersIndex].text + '</p><p>' + garageCarsOptions[garageCarsIndex].text + '</p>';

    formOrder.style.display = 'block';

    choice = housesName + ' /==/ Количество этажей: ' +  floorsOptions[floorsIndex].text + ' /==/ Количество комнат: ' + roomsOptions[roomsIndex].text + ' /==/ ' + fireplacesOptions[fireplacesIndex].text + ' /==/ ' + fheatingsOptions[heatingsIndex].text + ' /==/ Количество санузлов: ' + bathrooms.value + ' /==/ Количество гаражей: ' + garageNumbersOptions[garageNumbersIndex].text + ' /==/ ' + garageCarsOptions[garageCarsIndex].text;
  }
  else if(n == 2){
    nameCalcOut.innerHTML = '<p>' + housesName + '</p><p>Количество этажей: ' +  floorsOptions[floorsIndex].text + '</p><p>Количество комнат: ' + roomsOptions[roomsIndex].text + '</p><p>' + fireplacesOptions[fireplacesIndex].text + '</p><p>' + fheatingsOptions[heatingsIndex].text + '</p><p>Количество санузлов: ' + bathrooms.value + '</p>';

    formOrder.style.display = 'block';

    choice = housesName + ' /==/ Количество этажей: ' +  floorsOptions[floorsIndex].text + ' /==/ Количество комнат: ' + roomsOptions[roomsIndex].text + ' /==/ ' + fireplacesOptions[fireplacesIndex].text + ' /==/ ' + fheatingsOptions[heatingsIndex].text + ' /==/ Количество санузлов: ' + bathrooms.value;
  
  }
  else{
    nameCalcOut.innerHTML = '';
    formOrder.style.display = 'none';
  }
  
}

calculate.onclick = calc;
reset.onclick = resetCalc;

let sumCalcContainer = document.querySelector('.sum-calc');


$("#form").submit(function() {
  const requestData = new FormData(this);
  requestData.append('sumForm', sumForm);
  requestData.append('choice', choice);

  $.ajax({
      type: "POST",
      url: "mailAjax.php",
      contentType: false,
      processData: false,
      data: requestData
  }).done(function() {
      $(this).find("input").val("");
      $("#form").trigger("reset");


      $('.feedback__sent').fadeIn(300).delay(4000).fadeOut(400);

  }).fail(function() {
      $("#form").trigger("reset");

      $('.feedback__error').fadeIn(300).delay(3500).fadeOut(400);
  });
  return false;
});

