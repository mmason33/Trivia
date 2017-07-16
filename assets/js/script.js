
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
	categories: [
		{
			name: 'Math',
			questions: [
				{
					amount: '100,000',
					theQuestion: 'What is the sum of 10 + 7?',
					choices: ['8', '19', '17', '20'],
					answer: 2
				},
				{
					amount: '200,000',
					theQuestion: 'What is the quotent of 64 / 8?',
					choices: ['8', '16', '20', '4'],
					answer: 0
				},
				{
					amount: '300,000',
					theQuestion: 'What is 20 x 7?',
					choices: ['120', '100', '200', '140'],
					answer: 3
				},
				{
					amount: '400,000',
					theQuestion: 'What is the answer - (7 + 4 - 1) x 13?',
					choices: ['144', '133', '130', '140'],
					answer: 2
				},
				{
					amount: '500,000',
					theQuestion: 'What is the square root of 144?',
					choices: ['10', '12', '14', '24'],
					answer: 1
				},
				{
					amount: '600,000',
					theQuestion: 'What is the square root of (441) x 2?',
					choices: ['21', '40', '20', '42'],
					answer: 3
				},
				{
					amount: '700,000',
					theQuestion: 'What is the answer - ((239 x 2) + 2) / 4?',
					choices: ['120', '100', '400', '480'],
					answer: 0
				},
				{
					amount: '800,000',
					theQuestion: 'Select the prime number.',
					choices: ['26', '32', '48', '2'],
					answer: 3
				},
				{
					amount: '900,000',
					theQuestion: 'What is the answer - ((-2 x -2) + -1) x -3',
					choices: ['9', '-12', '-9', '12'],
					answer: 2
				},				
				{
					amount: '1,000,000',
					theQuestion: 'What is the cube root of 729?',
					choices: ['9', '18', '6', '12'],
					answer: 0
				}								
			]
		},
		{
			name: 'Football',
			questions: [
				{
					amount: '100,000',
					theQuestion: 'What is the American name for Futbol?',
					choices: ['Football', 'Soccer', 'Baseball', 'Basketball'],
					answer: 1
				},
				{
					amount: '200,000',
					theQuestion: 'How many NBA teams are in California?',
					choices: ['2', '3', '4', '5'],
					answer: 2
				},
				{
					amount: '300,000',
					theQuestion: 'What team does Lebron James play for?',
					choices: ['Kings', 'Lakers', 'Mavericks', 'Cavaliers'],
					answer: 3
				},
				{
					amount: '400,000',
					theQuestion: 'How many NFL teams are in Texas?',
					choices: ['2', '3', '4', '5'],
					answer: 0
				},
				{
					amount: '500,000',
					theQuestion: 'Where did Peyton Manning go to college?',
					choices: ['Stanford', 'USC', 'SMU', 'Tennessee'],
					answer: 3
				},
				{
					amount: '600,000',
					theQuestion: 'How many NFL teams have never won a superbowl?',
					choices: ['12', '13', '14', '15'],
					answer: 1
				},
				{
					amount: '700,000',
					theQuestion: 'Where did Marshawn Lynch go to college?',
					choices: ['Texas', 'Alabama', 'Auburn', 'Berkley'],
					answer: 3
				},
				{
					amount: '800,000',
					theQuestion: 'What quarterback has the most superbowls?',
					choices: ['Troy Aikman', 'Jim Kelly', 'Tom Brady', 'Aaron Rogers'],
					answer: 2
				},
				{
					amount: '900,000',
					theQuestion: 'How long is a football field?',
					choices: ['100 yards', '110 yards', '120 yards', '130 yards'],
					answer: 2
				},				
				{
					amount: '1,000,000',
					theQuestion: 'What year was the first NFL game?',
					choices: ['1917', '1936', '1942', '1920'],
					answer: 3
				}								
			]
		}

	],

	categoryClick: function (event) {

		for (let cat in this.categories) {

			if ($(event.currentTarget).attr('id') === trivia.categories[cat].name) {

				$('.header').append(
					'<h1 class="cat-title animated fadeIn">' + trivia.categories[cat].name + '</h1>'
				);

				this.utils.selectedIndex = cat;

			}

		}
		this.question();
	},

	question: function () {
		$('.trivia-wrap').empty();
		param =	$('.trivia-wrap').append(
			'<h3 class="animated fadeIn">'+ this.utils.questionNumber + '. ' + this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].theQuestion + '</h3>' +
			'<h4 class="animated fadeIn">' + 'For: ' + '$' + this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].amount + '</h4>'
		);
		this.avalChoices();
		this.timer();
		this.utils.questionNumber++;

		console.log(
			'Correct Answer', this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].choices[this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].answer]
		);

	},

	avalChoices: function () {

		$('.trivia-wrap').append(
			'<div class="row justify-content-center animated fadeIn">' +
				'<div class="col-5 text-center">' +
					'<button id="0"class="choice">' + 'A. ' + this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].choices[0] + '</button>' +
					'<button id="1"class="choice">' + 'B. ' + this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].choices[1] + '</button>' +
					'<button id="2"class="choice">' + 'C. ' + this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].choices[2] + '</button>' +
					'<button id="3"class="choice">' + 'D. ' + this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].choices[3] + '</button>' +
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

			if (currentTime === 0 && trivia.utils.questionCounter !== 9) {

				trivia.utils.questionCounter++;
				trivia.evalAnswerChosen();
				trivia.question();

			}

		}, 1000);

		$('.choice').click( function (event) {
			trivia.answerClick(timer, event.currentTarget);
		});

	},

	answerClick: function (interval, event) {

		var selectedChoice = $(event).attr('id');
		var choiceAsNumber = parseInt(selectedChoice, 10);

		clearInterval(interval);

		if (trivia.utils.numberOfAnswers < 9) {

			trivia.evalAnswerChosen(choiceAsNumber);
		 	trivia.utils.questionCounter++;
		 	trivia.utils.numberOfAnswers++;
		 	trivia.question();

		} else if (trivia.utils.questionCounter === 9) {

			trivia.evalAnswerChosen(choiceAsNumber);
			trivia.utils.numberOfAnswers++;
			trivia.evalQuestionCount();

		}
	},

	evalAnswerChosen: function (choice) {

		if (choice === this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].answer) {

			this.utils.correctAnswers++;

			console.log(
				'Correct =>',
				'Selected Answer Index =>', choice, '--', 
				'Correct Answer Index =>', trivia.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].answer
			);

		} else if (choice !== this.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].answer && choice !== undefined) {

			this.utils.incorrectAnswers++;

			console.log(
				'Incorrect =>',
				'Selected Answer Index =>', choice, '--', 
				'Correct Answer Index =>', trivia.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].answer
			);

		} else if (choice === undefined) {

			this.utils.unansweredQuestions++;

			console.log(
				'Unanswered =>',
				'Selected Answer Index =>', choice, '--', 
				'Correct Answer Index =>', trivia.categories[this.utils.selectedIndex].questions[trivia.utils.questionCounter].answer
			);

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
				'<h4>Ummmmmm..... I\'m sorry you missed all of the questions.</h4>'
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
		$('.trivia-body').append(
			'<div class="trivia-wrap animated zoomIn">' + 
				'<h2>Please select a category</h2>' +
				'<button id="Math" class="category">Math</button>' +
				'<button id="Football" class="category">Football</button>' +
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
					'<span><a href="#" class="close animated pulse infinite">&#10005;</a></span>' +
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
						'<button id="Math" class="category">Math</button>' +
						'<button id="Football" class="category">Football</button>' +
					'</div>'
				);

				$('button.category').on('click', function (e) {

					trivia.categoryClick(e);

				});

			}, 500);

		});


	});

}