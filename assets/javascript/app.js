$(document).ready(function(){

	var questionArray = [
	    { question: "Which boss at the start of the battle yells out, 'New toys? For me? I promise I won't break them this time'?", answer: "XT-002 Deconstructor" },
	    { question: "How many resources did a team need in Arathi Basin to win?", answer: "1600" },
	    { question: "At level 46, what instance are you probably doing?", answer: "Zul'Farrak" },
	    { question: "Where is Coldridge Valley located?", answer: "Dun Morogh" },
	    { question: "What's the name of the mountain that borders Burning Steppes and Searing Gorge?", answer: "Blackrock Mountain" }
	  ]
	var wrongChoices = [
	    ["Mekgineer Thermaplugg", "Hogger", "Princess Theradras"],
	    ["2000", "1800", "1000"],
	    ["Uldaman", "Scarlet Halls", "The Deadmines"],
	    ["Tirisfal Glades", "Ashenvale", "The Barrens"],
	    ["Blade's Edge", "Redridge Mountain", "Stonetalon Mountain"]
	]
	  
	var intervalId;

	var gotOne = false;
	var wrongCount = 0;
	var rightCount = 0;
	var questionNumber = 0;


	function triviaTime (qAnswerArray, choicesArray) {

		correctAns = Math.round(Math.random() * 3);
		$("#question").append(qAnswerArray[correctAns].question);
		//console.log(questionArray[4]);
		//console.log(wrongChoices[0][2]);
	    var wrongAns = 0;
	    for (divId = 0; divId <= 4; divId++) {
	        if (divId === correctAns) {
	            $("#answer" + divId).html("<button type='button' class='btn btn-lg btn-danger' id='a'>" + qAnswerArray[correctAns].answer +
                    "</button>");
	        } else {
	            $("#answer" + divId).html("<button type='button' class='btn btn-lg btn-danger' id='a" + divId + "'>" + choicesArray[correctAns][wrongAns] +
                    "</button>");
	            //console.log("correctans" + correctAns);
	            //console.log("wrongans" + wrongAns);
	            wrongAns++;
	            if (wrongAns === 3) {
	            	wrongAns = 0;
	            }
	        }
	        $("#a" + divId).on("click", triviaGame.wrongAnswer);
	    }
	    
	    $("#a").on("click", triviaGame.rightAnswer);
	};

	var triviaGame = {

		time: 10,

		start: function() {
			
			timesUp = setTimeout(function() {

			}, 1000 * 10);
			

			var clockRunning = false;
			var timeLeft = 10;
			$("#timer").html("Time Remaining: " + timeLeft);
			$("#gameArea").html("");
			$("#question").html("");
			timeLeft = triviaGame.time;


			
			if (!clockRunning) {
				intervalId = setInterval(triviaGame.countDown, 1000);
				clockRunning = true;
				triviaTime(questionArray, wrongChoices);
			}
		},

		countDown: function() {
			triviaGame.time--;
			var timeLeft = triviaGame.time;
			$("#timer").html("Time Remaining: " + timeLeft);
			if (timeLeft <= 0){
				clearInterval(intervalId);
				clockRunning = false;
				wrongCount++;
				$(".trivia").addClass("bigFont").html("Out of Time!");
				setTimeout(noTimeWait, 3000);
			}
		},

		wrongAnswer: function() {
			gotOne = false;
			clearInterval(intervalId);
			clockRunning = false;
			timeLeft = 10;
			console.log("shit");
			console.log(wrongCount);
			triviaGame.checkAnswer();
		},

		rightAnswer: function() {
			gotOne = true;
			clearInterval(intervalId);
			clockRunning = false;
			timeLeft = 10;
			console.log("good");
			console.log(rightCount);
			triviaGame.checkAnswer();

			
		},

		checkAnswer: function() {
			
			if (gotOne) {
				rightCount++;
				gotOne = false;
				$(".trivia").addClass("bigFont").html("Correct!");
				setTimeout(correctWait, 3000);
			} else {
				wrongCount++;
				$(".trivia").addClass("bigFont").html("Wrong!");
				setTimeout(wrongWait, 3000);
			}
		}
		
	};
	function correctWait() {
        $(".trivia").removeClass("bigFont").html("");
        //$(".trivia").html("");
        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
        triviaGame.time = 10;
        triviaGame.start();
    }
    function wrongWait() {
    	triviaTime(questionArray, wrongChoices);
    	$(".trivia").removeClass("bigFont").html("");
        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
        triviaGame.time = 10;
        triviaGame.start();
    }
    function noTimeWait() {
    	triviaTime(questionArray, wrongChoices);
    	$(".trivia").removeClass("bigFont").html("");
        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
        triviaGame.time = 10;
        triviaGame.start();
    }
	
	$("#start").on("click", triviaGame.start);

});