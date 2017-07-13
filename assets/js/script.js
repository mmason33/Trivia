var pickedCat;
var questionCounter = 0;

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

		$('.trivia-body').html('<div class="trivia-wrap"><h3>Please select a category</h3><button id="Math" class="category">Math</button><button id="Science" class=" category">Science</button><button id="Sports" class="category">Sports</button><button id="Computers" class="category">Computers</button></div>');

	},
	categoryClick: function (event) {
		$('.trivia-wrap').empty();
		for (let cat in this.categories) {
			if ($(event.target).attr('id') === test.categories[cat].name) {
				$('.cat-title').text(test.categories[cat].name);
				pickedCat = test.categories[cat].name;
				console.log(pickedCat);
			}
		}
	},
	question: function () {
		for (let cat in this.categories) {
			if (pickedCat === test.categories[cat].name) {
				$('.trivia-wrap').append('<h3>'+ (questionCounter + 1) + '. ' + this.categories[cat].questions[questionCounter].theQuestion + '</h3>')
				console.log('yes');
			}
		}
		this.avalChoices();
		this.timer();
	},
	avalChoices: function () {
		for (let cat in this.categories) {
			if (pickedCat === test.categories[cat].name) {
				$('.trivia-wrap').append(
					'<h5>' + 'A. ' + this.categories[cat].questions[questionCounter].choices[0] + '</h5>',
					'<h5>' + 'B. ' + this.categories[cat].questions[questionCounter].choices[1] + '</h5>',
					'<h5>' + 'C. ' + this.categories[cat].questions[questionCounter].choices[2] + '</h5>',
					'<h5>' + 'D. ' + this.categories[cat].questions[questionCounter].choices[3] + '</h5>'
					);
			}	
		}
	},

	timer: function () {
		$('.timer').text('Timer: ' + this.time + ' seconds').removeClass('hide');
		var currentTime = this.time;
		var timer =	setInterval(function () {
			currentTime--;
			$('.timer').text('Timer: ' + currentTime + ' seconds');

			if (currentTime !== 0) {
				$('.trivia-wrap h5').click(function () {
					questionCounter++;
					$('.trivia-wrap').empty();
					test.question();
				});
			} else {
				questionCounter++;
				$('.trivia-wrap').empty();
				test.question();			
			}

		}, 1000);

	},

	answerClick: function () {

		questionCounter++;
	},

	evalAnswer: function () {},

	reset: function () {}
};





window.onload = function () {

	test.startGame();
	$('button.category').on('click',function(e){
		test.categoryClick(e);
		test.question();
	});

}