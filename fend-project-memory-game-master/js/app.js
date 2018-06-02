 let cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
 let cardList = document.querySelectorAll('.card');
 let openCardList = [];
 let matchedCards = 0;
 let moves = 0;
 let t;
 let seconds= 0;
 let minutes= 0;
 let star= 3;
 let counter = document.querySelector(".moves");
 let timer = document.querySelector(".timer");

 const deck = document.querySelector(".deck");
 const stars = document.getElementsByClassName("stars").item(0);
 const modalBox = document.querySelector('#modal-box');
 const modalMessage = document.querySelector("#modal-message");
 const playAgain = document.querySelector('.playAgain');
 const restart = document.querySelector('.restart');

 //Restart button
 restart.addEventListener('click', newBoard);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function newBoard(){
  // Shuffle cards
  shuffledCards = shuffle(cards);

  for (let i=0; i<cardList.length; i++){
    let deckCard = deck.getElementsByTagName("li");
    let cardClass = deckCard[i].getAttribute("class");
    deckCard[i].className='';
    deckCard[i].classList.add('card');

    let deckSymbol = deck.getElementsByTagName("i");
    let symbolClass = deckSymbol[i].getAttribute("class");
    deckSymbol[i].className='';
    deckSymbol[i].classList.add('fa', shuffledCards[i]);
 };

 matchedCards = 0;

 //Reset moves counter
 moves = 0;
 counter.innerHTML = moves;

 //Reset star ranking
 stars.innerHTML='<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
 star='3';

 //Reset timer
 seconds = 0;
 minutes = 0;
 timer.innerHTML = "0 mins 0 secs";
 clearInterval(t);
}

newBoard();

//Following Mike Wales' youtube, 2018

//Card matching functionality
for (let card of cardList) {
	card.addEventListener('click', function(e){
    if(!card.classList.contains('match') && !card.classList.contains('open') && !card.classList.contains('show')){
      if(openCardList.length < 2){
        openCardList.push(card);
        card.classList.add('open', 'show');
      }

      	//Match Card
        if(openCardList.length === 2){
           moveCounter();
          if(openCardList[0].innerHTML === openCardList[1].innerHTML){
            matchedCards++;
            openCardList[0].classList.add('match');
  					openCardList[1].classList.add('match');
  					openCardList[0].classList.add('open', 'show');
  					openCardList[1].classList.add('open', 'show');
  					openCardList = [];

          } else {

            //Flip over unmatched Card
            	setTimeout(function(){
                openCardList[0].classList.remove('open', 'show');
                openCardList[1].classList.remove('open', 'show');
                openCardList = [];
              }, 700);
          }
        }
    }

    //Move counter functionality
    function moveCounter(){
      moves++;
      counter.innerHTML = moves;
      //Start timer on first moves
      if(moves===1){
        seconds = 0;
        minutes = 0;
        startTimer();
      }
    }
    
    //Star ranking based on number of moves
    if(moves < 10){
      star ='3';
    }else if(moves === 10){
      stars.removeChild(stars.childNodes[0]);
      star = "2";
    }else if(moves === 20){
      stars.removeChild(stars.childNodes[0]);
      star = "1";
    }else if(moves === 50){
      stars.removeChild(stars.childNodes[0]);
      star = "0";
    }
    gameOver();
	});
}

//Start timer functionality
function startTimer(display){
  t = setInterval(function(){
    seconds++;
    if(seconds>=60) {
      seconds = 0;
      minutes++;
    }
    timer.innerHTML = minutes + "mins" + seconds + "secs";
  }, 1000);
};

//Stop timer functionality
function stopTimer(){
    clearInterval(t);
}

//Game over functionality
function gameOver(){
  if(matchedCards===8){
    stopTimer();
    modalBox.style.display='block';
    modalMessage.innerHTML= "You did it in" + " " + minutes + " " + "minute(s) and" + " " + seconds + " " + "second(s). You collected" + " " + star + " " + "star(s).";
  }
};

//Play again functionality
playAgain.addEventListener('click',function(){
  modalBox.style.display = "none";
  newBoard();
});
