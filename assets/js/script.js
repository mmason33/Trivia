
var trivia = {
	score: 0,
	time: 60,
	utils: {
		selectedIndex: 0,
		questionCounter: 0,
		questionNumber: 1,
		correctAnswers: 0,
		incorrectAnswers: 0,
		unansweredQuestions: 0,
		numberOfAnswers: 0,
		directions: 'Select a category. Each question is worth $100,000. There are 10 questions and you have 60 seconds to answer each question. Good luck and hopefully you become a Millionaire!!',
	},
	queryURL: 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple',
	api: {},

	apiHandle: function (result, category) {

		$.ajax({
			url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`,
			method: "GET"
		}).done(function(result) {

			trivia.api = result;

		});	

	},

	categoryClick: function (event) {
		console.log($(event.currentTarget).attr('id'));
		trivia.apiHandle({}, $(event.currentTarget).attr('id'));

		$('.trivia-wrap').empty().append('<h1 class="flash animated infinite">Loading</h1>');

		setTimeout( function () {
			// $('.header').append('<h2 class="cat-title animated fadeIn">' + trivia.api.results[0].category + '</h2>');
			trivia.question();
		}, 3000);

	},

	question: function () {

		$('.trivia-wrap').empty();
		$('.trivia-wrap').append(

			'<h3 class="animated fadeIn">'+ this.utils.questionNumber + '. ' + this.api.results[this.utils.questionCounter].question + '</h3>'

		);

		this.avalChoices();
		this.timer();
		this.utils.questionNumber++;

		console.log('Correct Answer', this.api.results[this.utils.questionCounter].correct_answer);

	},

	avalChoices: function () {

		var correct_answer = this.api.results[this.utils.questionCounter].correct_answer;

		this.api.results[this.utils.questionCounter].incorrect_answers.push(correct_answer);

		this.api.results[this.utils.questionCounter].incorrect_answers.sort();

		var answer = this.api.results[this.utils.questionCounter].incorrect_answers;	

		$('.trivia-wrap').append(
			'<div class="row justify-content-center animated fadeIn">' +
				'<div class="col-md-5 col-sm-12 text-center">' +

					`<button id="0"class="choice" value="${answer[0]}">` + 'A. ' + 

					answer[0] + 

					'</button>' +

					`<button id="1"class="choice" value="${answer[1]}">` + 'B. ' + 

					answer[1] + 

					'</button>' +

					`<button id="2"class="choice" value="${answer[2]}">` + 'C. ' + 

					answer[2] + 
			
					'</button>' +

					`<button id="3"class="choice" value="${answer[3]}">` + 'D. ' + 

					answer[3] + 

					'</button>' +

				'</div>' +
			'</div>'
		);

	},

	timer: function () {

		$('.time-wrap').removeClass('hide');
		$('.timer').text(this.time);
		var currentTime = this.time;

		var timer =	setInterval( function () {

			currentTime--;
			$('.timer').text(currentTime);
			console.log(trivia.utils.numberOfAnswers);

			if (currentTime === 0) {

				if (trivia.utils.questionCounter < 9) {

					trivia.utils.questionCounter++;
					trivia.evalAnswerChosen(undefined, timer);
					trivia.question();

				} else {

					currentTime = 0;
					trivia.evalAnswerChosen(undefined, timer);
					trivia.evalQuestionCount();

				}

			}

		}, 1000);

		$('.choice').click( function (event) {
			trivia.answerClick(timer, event.currentTarget);
		});

	},

	answerClick: function (interval, event) {

		var selectedChoice = $(event).val();

		clearInterval(interval);

		if (trivia.utils.numberOfAnswers < 9) {

			trivia.evalAnswerChosen(selectedChoice);
		 	trivia.utils.questionCounter++;
		 	trivia.question();

		} else if (trivia.utils.questionCounter === 9) {

			trivia.evalAnswerChosen(selectedChoice);
			trivia.evalQuestionCount();

		}
	},

	evalAnswerChosen: function (choice, interval) {

		if (choice === this.api.results[this.utils.questionCounter].correct_answer) {

			this.utils.correctAnswers++;
			trivia.utils.numberOfAnswers++;

			console.log('Correct');

		} else if (choice !== this.api.results[this.utils.questionCounter].correct_answer && choice !== undefined) {

			this.utils.incorrectAnswers++;
			trivia.utils.numberOfAnswers++;

			console.log('Incorrect');

		} else if (choice === undefined) {

			clearInterval(interval);
			this.utils.unansweredQuestions++;
			trivia.utils.numberOfAnswers++;

			console.log('Unanswered');

		}

	},

	evalQuestionCount: function () {

		if (this.utils.numberOfAnswers === 10) {

			$('.trivia-wrap').empty();
			$('.time-wrap').remove();
			this.calcResults();

		}

	},

	calcResults: function () {

		if (this.utils.correctAnswers === 10) {
			$('.cat-title').remove();
			$('body').append(
				'<div class="overlay"></div>' +
				'<div class="million animated zoomIn text-center">' +
					'<h1>Congratulations you are a Millionaire!!!</h1>' +
					'<button id="reset" onClick="trivia.reset();">Play Again</button>' +
				'</div>'
			);

		} 
		else if (this.utils.correctAnswers === 0) {

			$('.trivia-wrap').empty().append(
				'<button id="reset" onClick="trivia.reset();">Play Again</button>' +
				'<h4>Correct Answers: ' + trivia.utils.correctAnswers + '</h4>' +
				'<h4>Incorrect Answers: ' + trivia.utils.incorrectAnswers + '</h4>' +
				'<h4>Unanswered Questions: ' + trivia.utils.unansweredQuestions + '</h4>' +
				'<h4>Ummmmmm..... I\'m sorry you didn\'t answer questions.</h4>'
			);

		}
		else {

			$('.trivia-wrap').append(
				'<h1 class="animated infinite flash">Calculating...</h1>'
			);

			setTimeout( function () {

				$('.trivia-wrap').empty().append(
					'<button id="reset" onClick="trivia.reset();">Play Again</button>' +
					'<h4>Correct Answers: ' + trivia.utils.correctAnswers + '</h4>' +
					'<h4>Incorrect Answers: ' + trivia.utils.incorrectAnswers + '</h4>' +
					'<h4>Unanswered Questions: ' + trivia.utils.unansweredQuestions + '</h4>' +
					'<h2 class="money">You won $' + trivia.utils.correctAnswers + '00,000!!' + '</h2>'
				).removeClass('zoomIn').addClass('zoomIn');

			}, 2500);

		}
	},

	reset: function () {

		this.utils.selectedIndex = 0,
		this.utils.questionCounter = 0,
		this.utils.questionNumber = 1,
		this.utils.correctAnswers = 0,
		this.utils.incorrectAnswers = 0,
		this.utils.unansweredQuestions = 0,
		this.utils.numberOfAnswers = 0,

		$('.trivia-wrap').remove();
		$('.overlay').remove();
		$('.million').remove();
		$('.cat-title').text('');
		$('.trivia-body').append(
			'<div class="trivia-wrap animated zoomIn">' + 
				'<h2>Please select a category</h2>' +
				'<button id="23" class="category" value="History">History</button>' +
				'<button id="21" class="category" value="Sports">Sports</button>' +
				'<button id="9" class="category" value="General">General</button>' +
				'<button id="14" class="category" value="Television">Television</button>' +
				'<button id="28" class="category" value="Vehicles">Vehicles</button>' +
			'</div>'
		);

		$('button.category').on('click', function (e) {

			trivia.categoryClick(e);

		});

	}
};


window.onload = function () {
	
	setTimeout( function () {

		$('.directions').addClass('wobble');

	}, 3500);


	$('.directions').click( function () {

		$('body').append(
			'<div class="directions-container animated zoomIn">' +
				'<div class="container">' +
					'<span class="closer"><a href="#" class="close animated pulse infinite">&#10005;</a></span>' +
					'<div class="row align-items-center">' +
						'<div class="col-12 text-center directions-text">' +
							'<h1>Directions</h1>' +
							'<h4 class="directions-instructions">' + trivia.utils.directions + '</h4>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);


		$('.close').click( function () {

			$('.directions').remove();
			$('.directions-container').removeClass('zoomIn').addClass('zoomOut');

			setTimeout(function() { 
				$('.directions-container').remove();
				$('.directions').removeClass('infinite wobble').addClass('zoomOut');
				$('.trivia-body').append(
					'<div class="trivia-wrap animated zoomIn">' + 
						'<h2>Please select a category</h2>' +
						'<button id="23" class="category" value="History">History</button>' +
						'<button id="21" class="category" value="Sports">Sports</button>' +
						'<button id="9" class="category" value="General">General</button>' +
						'<button id="14" class="category" value="Television">Television</button>' +
						'<button id="28" class="category" value="Vehicles">Vehicles</button>' +
					'</div>'
				);

				$('button.category').on('click', function (e) {

					trivia.categoryClick(e);

				});

			}, 500);

		});


	});

}