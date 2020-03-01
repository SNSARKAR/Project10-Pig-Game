/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

window.onload = function(){
var scores,roundScores,previousScore,gamePlaying;
    
    newGame();
function newGame(){
    gamePlaying = true;
    scores =[0,0];
    roundScores = 0;
    activePlayer = 0;
    previousScore =0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner'); 
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.add('active'); 
    document.querySelector('.player-1-panel').classList.remove('active');
    
}
    
    function nextPlayer(){
        activePlayer = activePlayer == 0?1:0;
        roundScores =0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
    }

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    //calculate dice number
    let dice = Math.floor(Math.random() * 6)+1;
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';
    
    //document.querySelector('#current-' + activePlayer).textContent = dice;//setter
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';
    //document.querySelector('.dice').style.display = 'none';
    
    //update the round score,if the rolled dice is no zero
    if(previousScore === 6 && dice===6 ){
        scores[activePlayer]=0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
        
    }
         
    else if(dice !=1){
        //add score
        roundScores = roundScores + dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScores;//setter
    }
    else{
        //next player
        nextPlayer();

    }
    
   previousScore = dice; 
}});
    document.querySelector('.btn-hold').addEventListener('click',function(){
        if(gamePlaying){
        scores[activePlayer] += roundScores;
        document.getElementById('score-' +activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner'); 
            gamePlaying = false;
        }
        else{
           nextPlayer(); 
        }
    }});
    
    document.querySelector('.btn-new').addEventListener('click',newGame);

    
    };