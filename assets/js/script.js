var pickedCat;
var questionCounter = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var timer;
var selectedChoice;
var numberOfAnswers = 0;
var index;
var choiceAsNumber;

var trivia = {
	score: 0,
	time: 60,
	directions: 'Select a category. Each question is worth $100,000. There are 10 questions and you have 60 seconds to answer each question. Good luck and hopefully you become a Millionaire!!',
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
			name: 'Sports',
			questions: [
				{
					amount: '100,000',
					theQuestion: 'What is the American name for Futbol?',
					choices: ['Football', 'Soccer', 'Baseball', 'Basketball'],
					answer: 1
				},
				{
					amount: '200,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '300,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '400,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '500,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '600,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '700,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '800,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '900,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},				
				{
					amount: '1,000,000',
					theQuestion: '',
					choices: [],
					answer: 1
				}								
			]
		},
		{
			name: 'Computers',
			questions: [
				{
					amount: '100,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '200,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '300,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '400,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '500,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '600,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '700,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '800,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},
				{
					amount: '900,000',
					theQuestion: '',
					choices: [],
					answer: 1
				},				
				{
					amount: '1,000,000',
					theQuestion: '',
					choices: [],
					answer: 1
				}								
			]
		}

	],

	categoryClick: function (event) {
		for (let cat in this.categories) {
			if ($(event.target).attr('id') === trivia.categories[cat].name) {
				$('.header').append('<h1 class="cat-title animated fadeIn">' + trivia.categories[cat].name + '</h1>');
				pickedCat = $(event.target).attr('id');
				index = cat;
			}
		}
		this.question();
	},
	question: function () {
		var questionNumber = questionCounter + 1;
		$('.trivia-wrap').empty();
		param =	$('.trivia-wrap').append('<h3 class="animated fadeIn">'+ questionNumber + '. ' + this.categories[index].questions[questionCounter].theQuestion + '</h3>');
		this.questionValue();
		this.avalChoices();
		this.timer();
		console.log(this.categories[index].questions[questionCounter].choices[this.categories[index].questions[questionCounter].answer]);
	},
	questionValue: function () {
		$('.trivia-wrap').append('<h4 class="animated fadeIn">' + 'For: ' + '$' + this.categories[index].questions[questionCounter].amount + '</h4>');
	},

	avalChoices: function () {
		$('.trivia-wrap').append(
			'<div class="row justify-content-center animated fadeIn"><div class="col-5 text-center">' +
			'<button id="0"class="choice">' + 'A. ' + this.categories[index].questions[questionCounter].choices[0] + '</button>' +
			'<button id="1"class="choice">' + 'B. ' + this.categories[index].questions[questionCounter].choices[1] + '</button>' +
			'<button id="2"class="choice">' + 'C. ' + this.categories[index].questions[questionCounter].choices[2] + '</button>' +
			'<button id="3"class="choice">' + 'D. ' + this.categories[index].questions[questionCounter].choices[3] + '</button>' +
			'</div></div>'
		);	
		$('.choice').click(trivia.answerClick);
	},

	timer: function () {
		$('.time-wrap').removeClass('hide');
		$('.timer').text(this.time);
		var currentTime = this.time;
		timer =	setInterval(function () {
			currentTime--;
			$('.timer').text(currentTime);

			if (currentTime === 0 && questionCounter !== 9) {
				questionCounter++;
				trivia.evalAnswer();
				trivia.question();
			}

		}, 1000);

	},

	answerClick: function () {
		selectedChoice = $(this).attr('id');
		choiceAsNumber = parseInt(selectedChoice, 10);
		console.log(choiceAsNumber, trivia.categories[index].questions[questionCounter].answer)
		clearInterval(timer);
		if (numberOfAnswers < 9) {
			trivia.evalAnswer();
		 	questionCounter++;
		 	numberOfAnswers++;
		 	trivia.question();
		} else if (questionCounter === 9) {
			trivia.evalAnswer();
			numberOfAnswers++;
			trivia.evalScore();
		}
	},

	evalAnswer: function () {
		if (choiceAsNumber === this.categories[index].questions[questionCounter].answer) {
			correctAnswers++;
			console.log('correct');
		} else if (selectedChoice) {
			incorrectAnswers++;
		} else {
			unansweredQuestions++;
		}
	},

	evalScore: function () {
		if (numberOfAnswers === 10) {
			$('.trivia-wrap').empty();
			$('.time-wrap').remove();
			trivia.answerResults();
		}	
	},

	answerResults: function () {
		$('.trivia-wrap').append('<h1 class="animated infinite flash">Calculating...</h1>');
		if (correctAnswers === 10) {
			$('body').append('<div class="overlay"></div>');
			console.log('million');
		}
		setTimeout( function () {
			$('.trivia-wrap').empty();
			$('.trivia-wrap').append(
			'<h4>Correct Answers: ' + correctAnswers + '</h4><h4>Incorrect Answers: ' + incorrectAnswers + '</h4><h4>Unanswered Questions: ' + unansweredQuestions + '</h4><h2 class="money">You won $' + correctAnswers + '00,000!!' + '</h2>'
			).removeClass('zoomIn').addClass('zoomIn');;
		}, 2500);
	},

	reset: function () {
		location.reload();
	}
};


window.onload = function () {

	setTimeout( function () {
		$('.directions').addClass('wobble');
	}, 3500);


	$('.directions').click(function(){
		$('body').append(
			'<div class="directions-container animated zoomIn"><div class="container"><span><a href="#" class="close animated pulse infinite">&#10005;</a></span><div class="row align-items-center"><div class="col-12 text-center directions-text"><h1>Directions</h1><h4 class="directions-instructions">' + trivia.directions + '</h4></div></div></div></div>'
		);


		$('.close').click(function() {
			$('.directions').remove();
			$('.directions-container').removeClass('zoomIn').addClass('zoomOut');
			setTimeout(function() { 
				$('.directions-container').remove();
				$('.directions').removeClass('infinite tada').addClass('zoomOut');
				$('.trivia-body').append('<div class="trivia-wrap animated zoomIn"><h2>Please select a category</h2><button id="Math" class="category">Math</button><button id="Sports" class="category">Sports</button><button id="Computers" class="category">Computers</button></div>');
				$('button.category').on('click',function(e){
					trivia.categoryClick(e);
				});
			}, 500);

		});


	});

}