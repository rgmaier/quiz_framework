$(document).ready(function(){
    //updateImageMap();
    localStorage.setItem("nav_na","5");
    localStorage.setItem("solved",[]);
    
});

var navigation = {nav_na:"North America", nav_sa: "South America", nav_af: "Africa", nav_as: "Asia & Oceania", nav_eu:"Europe"};
var max_pts = {nav_na: 100, nav_sa:100, nav_af:0, nav_as:50, nav_eu:50};

function loadQuestion(callback){
    
    $.ajax({
        url: "questions_new.json",
        beforeSend: function(xhr){
            if (xhr.overrideMimeType)
            {
            xhr.overrideMimeType("application/json");
            }
        },
        dataType: 'json',
        success: function(data){
            var question=[];
            for(i = 0; i<data.skiareas[navigation[sessionStorage.nav]].length;i++)
            {
                if(!localStorage.solved.includes(data.skiareas[navigation[sessionStorage.nav]][i].name)){
                    question.push(data.skiareas[navigation[sessionStorage.nav]][i].name);
                    question.push(data.skiareas[navigation[sessionStorage.nav]][i].img);
                    break;
                }
            }
            var i = 0;
            while(i<3){
                var rnd = getRandomInt(0,data.skiareas[navigation[sessionStorage.nav]].length-1);
                if(!question.includes(data.skiareas[navigation[sessionStorage.nav]][rnd].name)){
                    question.push(data.skiareas[navigation[sessionStorage.nav]][rnd].name);
                    i++;
                }
                
            }
            callback(question);
        }
    });
    //return result;
}

function updateContent(result){
    var pathname = window.location.hash;
    var answers = [result[0], result[2], result[3], result[4]];
    shuffleArray(answers);
    console.log(result[1]);
    $('#main_canvas').attr("src",result[1]);
    $('#answer-box').find('a').each(function(){
        $(this).text(answers[answers.length-1]);
        answers.pop();
    });
}

function updateNavContent(elementID){
    console.log(elementID);
    $('#popup-continent').text(navigation[elementID]);
    $('#popup-max-pts').text(max_pts[elementID]);
    if(localStorage.getItem(elementID) === null){
        $('#popup-pts').text("0");
    }
    else{
        $('#popup-pts').text(localStorage.getItem(elementID));
    }
    sessionStorage.setItem("nav",elementID);
}

function play(){
    loadQuestion(updateContent);
    $(".navigation, #welcome-text").hide();
    $("#main_canvas, #answer-box").show();
    $("#menu").popup("close");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

