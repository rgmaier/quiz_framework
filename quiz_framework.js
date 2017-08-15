//Questions per Level are set here, standard is 5
var questionsLevel = 5;

//Max. level is set here, standard is 5 (starts at 0)
var maxLevel = 0;
var currentLevel = 0;
var remainingLives = 3;

var questionsInCurrentLevel = [];
var score = 0;
var correctAnswer = "";

$(document).ready(function(){
	getQuestionOrder();
});

$(window).unload(function(){
	clearScore();
	window.location.replace("./index.htm#page_home");
});


function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function getQuestionOrder(){
	for(var i = 0; questionsInCurrentLevel.length < questionsLevel; i++){
				questionsInCurrentLevel.push(i);
			}
	shuffleArray(questionsInCurrentLevel);
}

function getNewQuestion(){
	
	if(currentLevel >= maxLevel && questionsInCurrentLevel.length ==0||remainingLives == 0){
	
		$("#result").text("Congratulations! Your final score is " + score + " and you reached level "+(currentLevel+1)+".");
		clearScore();
		window.location.replace("./index.htm#page_done");
	}else{
		if(questionsInCurrentLevel.length == 0){
			currentLevel++;
			getQuestionOrder();
		}
		
		var i = questionsInCurrentLevel.pop();
		
		$.getJSON("questions.json",function (data) {
			var answer = shuffleArray([data.level[currentLevel].questions[i].answer1,data.level[currentLevel].questions[i].answer2,data.level[currentLevel].questions[i].answer3,data.level[currentLevel].questions[i].answer4]);
			
			correctAnswer = data.level[currentLevel].questions[i].correctAnswer;
			
			$("#guess").attr("src",data.level[currentLevel].questions[i].url);
			$("#a1").text(answer[0]);
			$("#a2").text(answer[1]);
			$("#a3").text(answer[2]);
			$("#a4").text(answer[3]);
			$("#answerCheck").popup("close");
		});
		
	}
	return null;
}

function checkIfCorrect(answer){
	if(answer.innerText == correctAnswer){
		$("#check").text("correct");
		$("#lives_remaining").text(remainingLives);
		score++;
		correctAnswer = "";
	}
	else{
		$("#check").text("incorrect");
		remainingLives--;
		$("#lives_remaining").text(remainingLives);}
}

function clearScore(){
	score = 0;
	currentLevel = 0;
	remainingLives = 3;
	getQuestionOrder();
}

function setScore(){
	$("#popup_score_text").text("Your score is "+ score + " and you are on on level " + (currentLevel+1)+".");
}

	
	