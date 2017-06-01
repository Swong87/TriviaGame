$(document).ready(function(){
	//Here we have the available questions with it's correct answer
	var questionArray = [
	    { question: "Which boss at the start of the battle yells out, 'New toys? For me? I promise I won't break them this time'?", answer: "XT-002 Deconstructor" },
	    { question: "How many resources did a team need in Arathi Basin to win?", answer: "1600" },
	    { question: "At level 46, what instance are you probably doing?", answer: "Zul'Farrak" },
	    { question: "Where is Coldridge Valley located?", answer: "Dun Morogh" },
	    { question: "What's the name of the mountain that borders Burning Steppes and Searing Gorge?", answer: "Blackrock Mountain" }
	]
	//These are the wrong answers to each corresponding question
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

	//Prints the question and the corresponding answers
	function triviaTime (qAnswerArray, choicesArray) {
		//Randomizes the answer print out
		correctAns = Math.round(Math.random() * 3);
		//Prints the question
		$("#question").append(qAnswerArray[questionNumber].question);

	    var wrongAns = 0;
	    //Prints all answers in random order
	    for (divId = 0; divId <= 4; divId++) {
	        if (divId === correctAns) {
	        	//Prints right answer
	            $("#answer" + divId).html("<button type='button' class='btn btn-lg btn-danger' id='a'>" + qAnswerArray[questionNumber].answer +
                    "</button>");
	        } else {
	        	//Prints wrong answers
	            $("#answer" + divId).html("<button type='button' class='btn btn-lg btn-danger' id='a" + divId + "'>" + choicesArray[questionNumber][wrongAns] +
                    "</button>");

	            wrongAns++;
	            //Stops the loop from repeating answers
	            if (wrongAns === 3) {
	            	wrongAns = 0;
	            }
	        }
	        //Allows the player to click the wrong answer
	        $("#a" + divId).on("click", triviaGame.wrongAnswer);
	    }
	    //Allows the player to click the right answer
	    $("#a").on("click", triviaGame.rightAnswer);
	};

	var triviaGame = {

		time: 15,

		start: function() {
			var clockRunning = false;
			var timeLeft = 15;
			//This starts the initail timer and shows the new question screen
			$("#timer").html("Time Remaining: " + timeLeft);
			$("#gameArea").html("");
			$("#question").html("");
			timeLeft = triviaGame.time;


			//This stops the clock from running more than once
			if (!clockRunning) {
				intervalId = setInterval(triviaGame.countDown, 1000);
				clockRunning = true;
				triviaTime(questionArray, wrongChoices);
			}
		},
//This method creates the timer and starts it counting down, and tells if the player ran out of time
		countDown: function() {
			triviaGame.time--;
			var timeLeft = triviaGame.time;
			$("#timer").html("Time Remaining: " + timeLeft);
			if (timeLeft <= 0){
				clearInterval(intervalId);
				clockRunning = false;
				wrongCount++;
				$(".trivia").addClass("bigFont").html("Out of Time!");
				$(".trivia").append("<br>The correct answer was: " + questionArray[questionNumber].answer);
				questionNumber++;
				if (questionNumber === 5) {
					runComplete();
				} else {
					setTimeout(noTimeWait, 3000);
				}
			}
		},
//This method indicates if the player chose a wrong answer
		wrongAnswer: function() {
			gotOne = false;
			clearInterval(intervalId);
			clockRunning = false;
			timeLeft = 15;
			triviaGame.checkAnswer();
		},
//This method indicates if the player chose the right answer
		rightAnswer: function() {
			gotOne = true;
			clearInterval(intervalId);
			clockRunning = false;
			timeLeft = 15;
			triviaGame.checkAnswer();

			
		},
//This method checks the player's answer and moves them to the next screen accordingly
		checkAnswer: function() {
			
			if (gotOne) {
				rightCount++;
				gotOne = false;
				$(".trivia").addClass("bigFont").html("Correct!");
				questionNumber++;
				setTimeout(correctWait, 3000);
			} else {
				wrongCount++;
				$(".trivia").addClass("bigFont").html("Wrong!");
				$(".trivia").append("<br>The correct answer was: " + questionArray[questionNumber].answer);
				questionNumber++;
				setTimeout(wrongWait, 3000);
			}
		}
		
	};
	//This function moves the player to the next question if the player answers a question right
	function correctWait() {
		if (questionNumber === 5) {
			runComplete();
		} else {
	        $(".trivia").removeClass("bigFont").html("");
	        //$(".trivia").html("");
	        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
	        triviaGame.time = 15;
	        triviaGame.start();
	    }
    }
    //This function moves the player to the next question if the player answers a question wrong
    function wrongWait() {
    	if (questionNumber === 5) {
			runComplete();
		} else {
	    	triviaTime(questionArray, wrongChoices);
	    	$(".trivia").removeClass("bigFont").html("");
	        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
	        triviaGame.time = 15;
	        triviaGame.start();
	    }
    }
    //This function moves the player to the next question if the player runs out of time
    function noTimeWait() {
    	if (questionNumber === 5) {
			runComplete();
		} else {
	    	triviaTime(questionArray, wrongChoices);
	    	$(".trivia").removeClass("bigFont").html("");
	        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
	        triviaGame.time = 15;
	        triviaGame.start();
	    }
    }
    //This function shows the complete screen showing the amount of right and wrong answers and creating the restart button
    function runComplete() {
    	$(".trivia").addClass("bigFont").html("Complete!");
        $(".trivia").append("<div class='col-md-12' id='score'></div>");
        $("#score").html("Correct Answers: " + rightCount);
        $("#score").append("<br>Wrong Answers: " + wrongCount);
        $("#score").append("<br><button type='button' class='restart btn btn-lg btn-danger'>Restart</button>");
        questionNumber = 0;
        $(".restart").on("click", restartGame);
    }
    //This function starts the game, resets the data, and starts the timer
	function restartGame() {
		triviaTime(questionArray, wrongChoices);
    	$(".trivia").removeClass("bigFont").html("");
        $(".trivia").html("<div class='col-md-12' id='timer'></div><div class='col-md-12' id='question'></div><br><div class='answer container questions'><div id='answer0'></div><div id='answer1'></div><div id='answer2'></div><div id='answer3'></div></div>");
        triviaGame.time = 15;
        rightCount = 0;
        wrongCount = 0;
        triviaGame.start();
	}
	//When you click the start button, the game will start
	$("#start").on("click", triviaGame.start);
	$("#start").on("click", playSound);
	function playSound() {
		var audio = new Audio("assets/sounds/bgmusic.mp3");
		audio.play()
	}

});