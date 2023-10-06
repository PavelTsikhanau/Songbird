import birdsData from "./birdsdata.js";

const warmingUp = birdsData[0],
  passerines = birdsData[1],
  forestBirds = birdsData[2],
  songBirds = birdsData[3],
  predatorBirds = birdsData[4],
  seaBirds = birdsData[5],
  chapters = document.querySelectorAll('li'),
  player = document.querySelector('.player'),
  playButton = document.querySelector('.btn-play'),
  audio = document.querySelector('.audio'),
  answerSound = document.querySelector('.answer-sound'),
  progress = document.querySelector('.progress'),
  imgSrc = document.querySelector('.img-src'),
  progressContainer = document.querySelector('.progress-container'),
  answerCard = document.querySelector('.answer-card');

let currentIndex = 0;
let randomBird = birdsData[0][Math.floor(Math.random() * birdsData[0].length)];
audio.src = randomBird.audio;

console.log(randomBird)


//header style 
const burgerRotate = document.querySelector('.songbird-rotate');
const burgerMouseover = document.querySelectorAll('.songbird-mouseover');
const logoImage = document.querySelector('.logo-image');

burgerRotate.addEventListener('click', function () {
  alert('click');
});

burgerRotate.addEventListener('mouseover', function () {
  burgerMouseover.forEach((i) => {
    i.classList.add('songbird-mouseover-after');
  })
});

burgerRotate.addEventListener('mouseout', function () { 
  burgerMouseover.forEach((i) => { 
    i.classList.remove('songbird-mouseover-after'); 
  }); 
});


//building radiobuttons
function createRadiobutton(bird) {
  const radiobutton = document.createElement('div');
  radiobutton.classList.add('radiobutton');

  radiobutton.addEventListener('mouseover', (event) => { 
    radiobutton.classList.add('radiobtn-mouseover'); 
  }); 

  radiobutton.addEventListener('mouseout', (event) => { 
    radiobutton.classList.remove('radiobtn-mouseover'); 
  }); 
  
  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('id', bird.id);
  input.setAttribute('name', 'bird');
  input.setAttribute('value', bird.name);
  const label = document.createElement('label');
  label.setAttribute('for', bird.id);
  label.innerText = bird.name;
  
  radiobutton.append(input, label);


  //click on radiobutton
  function radioClick(e) {
    if (input.id === randomBird.id.toString()) {
      answerSound.src = "./sounds/correct-answer.mp3";
      answerSound.play();
      input.style.checked
      fillAnswerCard();
      resetProgress();
      document.querySelector('.next-level').removeAttribute('disabled');
      document.querySelector('.question-image').src = randomBird.image;
      document.querySelector('footer').classList.add('next');
      document.querySelector('h2').innerHTML = `${randomBird.name}`;
    } else {
      answerSound.src = './sounds/incorrect-answer.mp3';
      answerSound.play();
      
    };
  };

  radiobutton.addEventListener('click', radioClick);

  return radiobutton;
}

function fillKeystrokeCard(birds) {
  const fieldset = document.querySelector(".keystroke-card");
  const radiobuttons = birds.map((bird) => {
    return createRadiobutton(bird);
  });
  
  fieldset.append(...radiobuttons);
}

function clearKeystrokeCard() {
  const fieldset = document.querySelector(".keystroke-card");
  fieldset.innerHTML = ''
}

document.addEventListener("DOMContentLoaded", () => {
  fillKeystrokeCard(birdsData[currentIndex]);
  chapters[currentIndex].classList.add('current-chapter');
});

document.addEventListener("DOMContentLoaded", () => {
  answerCard.innerHTML = 'Послушайте плеер. Выберите птицу из списка';
});


//next level
const nextLevelButton = document.querySelector('.next-level');

nextLevelButton.addEventListener('click', () => {
  document.querySelector('footer').classList.remove('next');
  document.querySelector('h2').innerHTML = '*****';
  document.querySelector('.question-image').src = './images/unknown-bird.jpg';
  answerCard.innerHTML = 'Послушайте плеер. Выберите птицу из списка';
  document.querySelector('.next-level').setAttribute('disabled', '');

  chapters[currentIndex].classList.remove('current-chapter');
  
  if (currentIndex < birdsData.length - 1) {
    currentIndex += 1;
  } else {
    currentIndex = 0;
  };
  
  chapters[currentIndex].classList.add('current-chapter');
  
  clearKeystrokeCard();
  fillKeystrokeCard(birdsData[currentIndex]);
  resetProgress();

  console.log(currentIndex);
  randomBird = birdsData[currentIndex][Math.floor(Math.random() * birdsData[currentIndex].length)];
  audio.src = randomBird.audio;
  console.log(randomBird.name);

  pauseSong();
});


//audio
function playSong() {
  audio.play();
  imgSrc.src = "./images/pause-icon.svg";
  player.classList.add('is-playing')
};

function pauseSong() {
  audio.pause();
  imgSrc.src = "./images/play-icon.svg";
  player.classList.remove('is-playing')
};


playButton.addEventListener('click', () => {
  const isPlaying = player.classList.contains('is-playing'); 
  if (isPlaying) {
    pauseSong()
  } else {
    playSong();
  }
});


//update progress
function updateProgress (e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercents = (currentTime / duration) * 100;
  progress.style.marginLeft = `${progressPercents}%`;
};

audio.addEventListener('timeupdate', updateProgress);


//reset to zero progress
function resetProgress (e) {
  progress.style.marginLeft = '0%';
}


//set progress
function setProgress() {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

progressContainer.addEventListener('click', setProgress);


//fill answer card
function fillAnswerCard() {
  answerCard.innerHTML = '';

  const upperBlock = document.createElement('div');
  upperBlock.classList.add('upper-block');

  const upperBlockLeft = document.createElement('div');
  upperBlockLeft.classList.add('upper-block-left');

  const upperBlockRight = document.createElement('div');
  upperBlockRight.classList.add('upper-block-right');

  const answerCardImage = document.createElement('img');
  answerCardImage.classList.add('answer-card-image');
  answerCardImage.setAttribute('src', `${randomBird.image}`);
  answerCardImage.setAttribute('alt', 'guessed bird')

  const answerCardName = document.createElement('div');
  answerCardName.classList.add('answer-card-name');
  answerCardName.innerHTML = `${randomBird.name}`;

  const answerCardSpecies = document.createElement('div');
  answerCardSpecies.classList.add('answer-card-species');
  answerCardSpecies.innerHTML = `${randomBird.species}`;

  const lowerBlock = document.createElement('div');
  lowerBlock.classList.add('lower-block');

  const description = document.createElement('div');
  description.classList.add('answer-card-description');
  description.innerHTML = `${randomBird.description}`;

  answerCard.append(upperBlock, lowerBlock);
  upperBlock.append(upperBlockLeft, upperBlockRight)
  upperBlockLeft.append(answerCardImage);
  upperBlockRight.append(answerCardName, answerCardSpecies);
  lowerBlock.append(description);
}










