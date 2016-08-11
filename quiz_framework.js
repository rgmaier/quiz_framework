var currentLevel = 0;
var questionsInCurrentLevel = [0,1];
var score = 0;
var correctAnswer = "";

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
function getNewQuestion(){
	var i = Math.floor((Math.random()*2));
	$.getJSON("questions.json",function (data) {
		var answer = shuffleArray([data.level[currentLevel].questions[i].answer1,data.level[currentLevel].questions[i].answer2,data.level[currentLevel].questions[i].answer3,data.level[currentLevel].questions[i].answer4]);
		correctAnswer = data.level[currentLevel].questions[i].correctAnswer;
		$("#guess").attr("src",data.level[currentLevel].questions[i].url);
		$("#a1").text(answer[0]);
		$("#a2").text(answer[1]);
		$("#a3").text(answer[2]);
		$("#a4").text(answer[3]);
	});

}

function checkIfCorrect(answer){
	if(answer.innerText == correctAnswer){
		$("#check").text("correct");
		score++;
		correctAnswer = "";
	}
	else{
		$("#check").text("incorrect");}
}

function clearScore(){
	score = 0;
}

function setScore(){

}

	
	