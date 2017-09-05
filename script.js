$(document).ready(function(){
    //updateImageMap();
    //localStorage.setItem("nav_na","5");
    localStorage.clear();
    sessionStorage.clear();
    //This does not work, localStorage only accepts strings...
    //Solution: stringify when save, .parse when load
    localStorage.setItem("solved","[]");
    
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
            var solved = JSON.parse(localStorage.solved);
            if(solved.length < data.skiareas[navigation[sessionStorage.nav]].length){
                for(i = 0; i<data.skiareas[navigation[sessionStorage.nav]].length;i++)
                {
                    
                    console.log("Gelöst:"+solved);
                    if(!solved.includes(data.skiareas[navigation[sessionStorage.nav]][i].name)){
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
            }
            else{
                question.push("finished");
            }
            
            callback(question);
        }
    });
    //return result;
}

function updateContent(result){
    $('#nextbtn').hide();
    $(".correct").removeClass("correct"); 
    if(result[0]=="finished"){
        menu(NULL);
    }
    var answers = [result[0], result[2], result[3], result[4]];
    sessionStorage.setItem("answer",result[0]);
    shuffleArray(answers);
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

function menu(elementID){
    $(".navigation, #welcome-text").show();
    $("#main_canvas, #answer-box").hide();
    console.log(elementID);
    $("#home").removeClass(".ui-btn-active");
    sessionStorage.clear();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer(answer){
    if($(answer).text()==sessionStorage.answer){
        //Change background color to green, increase counter by one, add area to solved list
        $(answer).addClass("correct");
       var solved = JSON.parse(localStorage.solved);
       solved.push(sessionStorage.answer);
       localStorage.solved = JSON.stringify(solved);
       if(localStorage.getItem(sessionStorage.nav) === null){
           localStorage.setItem(sessionStorage.nav,"1");
       }
       else{
           var score = localStorage.getItem(sessionStorage.nav);
           score++;
           console.log(score);
           localStorage.setItem(sessionStorage.nav,score);
       }
        $('#nextbtn').show();
        console.log("success");
    }
    else{
        $(answer).addClass("false");
        $('#nextbtn').show();
    }
}