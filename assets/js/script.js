var pickedCat;
var questionCounter = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var timer;
var selectedChoice;
var numberOfAnswers = 0;

var test = {
	score: 0,
	time: 60,
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
			name: 'Science',
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
		},
		{
			name: 'Sports',
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
	startGame: function () {

		$('.trivia-body').append('<div class="trivia-wrap"><h3>Please select a category</h3><button id="Math" class="category">Math</button><button id="Science" class=" category">Science</button><button id="Sports" class="category">Sports</button><button id="Computers" class="category">Computers</button></div>');

	},
	categoryClick: function (event) {
		for (let cat in this.categories) {
			if ($(event.target).attr('id') === test.categories[cat].name) {
				$('.header').append('<h1 class="cat-title animated fadeIn">' + test.categories[cat].name + '</h1>');
				pickedCat = $(event.target).attr('id');
			}
		}
		this.question();
	},
	question: function () {
		var questionNumber = questionCounter + 1;
		$('.trivia-wrap').empty();
		for (let cat in this.categories) {
			if (pickedCat === test.categories[cat].name) {
				$('.trivia-wrap').append('<h3 class="animated fadeIn">'+ questionNumber + '. ' + this.categories[cat].questions[questionCounter].theQuestion + '</h3>');
			}
		}
		this.questionValue();
		this.avalChoices();
		this.timer();
	},
	questionValue: function () {

		for (let cat in this.categories) {
			if (pickedCat === test.categories[cat].name) {
				$('.trivia-wrap').append('<h4 class="animated fadeIn">' + 'Question value: ' + '$' + this.categories[cat].questions[questionCounter].amount + '</h4>');
			}
		}

	},

	avalChoices: function () {
		for (let cat in this.categories) {
			if (pickedCat === test.categories[cat].name) {
				$('.trivia-wrap').append(
					'<div class="row justify-content-center animated fadeIn"><div class="col-5 text-center">' +
					'<button id="0"class="choice">' + 'A. ' + this.categories[cat].questions[questionCounter].choices[0] + '</button>' +
					'<button id="1"class="choice">' + 'B. ' + this.categories[cat].questions[questionCounter].choices[1] + '</button>' +
					'<button id="2"class="choice">' + 'C. ' + this.categories[cat].questions[questionCounter].choices[2] + '</button>' +
					'<button id="3"class="choice">' + 'D. ' + this.categories[cat].questions[questionCounter].choices[3] + '</button>' +
					'</div></div>'
					);
			}	
		}
		$('.choice').click(test.answerClick);
	},
	timer: function () {
		$('.timer').text('Timer: ' + this.time + ' seconds').removeClass('hide');
		var currentTime = this.time;
		timer =	setInterval(function () {
			currentTime--;
			$('.timer').text('Timer: ' + currentTime + ' seconds');

			if (currentTime === 0 && questionCounter !== 9) {
				questionCounter++;
				test.evalAnswer();
				test.question();
			}

		}, 1000);

	},

	answerClick: function () {
		selectedChoice = $(this).attr('id');
		clearInterval(timer);
		if (questionCounter < 9) {
			questionCounter++;
			test.evalAnswer();
		 	test.question();
		 	numberOfAnswers++;
			console.log(numberOfAnswers);
		} else if (questionCounter === 9) {
			test.evalAnswer();
		 	numberOfAnswers++;
			console.log(numberOfAnswers);
			test.evalScore();
		}
		console.log(selectedChoice);
	},

	evalAnswer: function () {
		for (let cat in this.categories) {
			if (pickedCat === test.categories[cat].name) {
				if (parseInt(selectedChoice) === this.categories[cat].questions[questionCounter].answer) {
					correctAnswers++;
				} else if (parseInt(selectedChoice)) {
					incorrectAnswers++;
				} else {
					unansweredQuestions++;
				}
			}
		}
	},

	evalScore: function () {
		if (correctAnswers === 10) {
			console.log('million');
		} else if (correctAnswers > 10 && correctAnswers !== 0) {
			console.log(correctAnswers + '00k');
		} else {
		 	console.log ('no dice');
		}	
	},

	reset: function () {
		location.reload();
	}
};


window.onload = function () {

	test.startGame();
	$('button.category').on('click',function(e){
		test.categoryClick(e);
	});

}