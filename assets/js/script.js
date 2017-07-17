
class trivia {

	constructor (props) {

		this.props = {
			score: props.score,
			time: props.time,
			utils: {
				selectedIndex: props.utils.selectedIndex,
				questionCounter: props.utils.questionCounter,
				questionNumber: props.utils.questionNumber,
				correctAnswers: props.utils.correctAnswers,
				incorrectAnswers: props.utils.incorrectAnswers,
				unansweredQuestions: props.utils.unansweredQuestions,
				numberOfAnswers: props.utils.numberOfAnswers,
				directions: props.utils.directions,
			},
			api: props.api
		}

	}


	apiHandle (result, category, diff) {

		let api = $.ajax({
			url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${diff}&type=multiple`,
			method: "GET"
		}).done((result) => {

			this.props.api = result;

		});	

	}

	categoryClick (event, diff) {

		this.apiHandle({}, $(event.currentTarget).attr('id'), diff);

		$('.trivia-wrap').empty().append('<h1 class="flash animated infinite">Loading</h1>');

		let timeout = setTimeout(() => {
			$('.header').append(`<h2 class="cat-title animated fadeIn">${this.props.api.results[0].category}</h2>`);
			this.question();
		}, 3000);

	}

	question () {

		$('.trivia-wrap').empty();
		$('.trivia-wrap').append(

			`<h3 class="animated fadeIn">${this.props.utils.questionNumber}. ${this.props.api.results[this.props.utils.questionCounter].question}</h3>`

		);

		this.avalChoices();
		this.timer();
		this.props.utils.questionNumber++;

		console.log('Correct Answer', this.props.api.results[this.props.utils.questionCounter].correct_answer);

	}

	avalChoices () {

		let correct_answer = this.props.api.results[this.props.utils.questionCounter].correct_answer;

		this.props.api.results[this.props.utils.questionCounter].incorrect_answers.push(correct_answer);

		this.props.api.results[this.props.utils.questionCounter].incorrect_answers.sort();

		let answer = this.props.api.results[this.props.utils.questionCounter].incorrect_answers;	

		$('.trivia-wrap').append(
			'<div class="row justify-content-center animated fadeIn">' +
				'<div class="col-md-5 col-sm-12 text-center">' +

					`<button id="0"class="choice" value="${answer[0]}">A. ${answer[0]}</button>` +
					`<button id="0"class="choice" value="${answer[1]}">B. ${answer[1]}</button>` +
					`<button id="0"class="choice" value="${answer[2]}">C. ${answer[2]}</button>` +
					`<button id="0"class="choice" value="${answer[3]}">D. ${answer[3]}</button>` +

				'</div>' +
			'</div>'
		);

	}

	timer () {

		$('.time-wrap').removeClass('hide');
		$('.timer').text(this.props.time);
		let currentTime = this.props.time;

		let timer = setInterval(() => {

			currentTime--;
			$('.timer').text(currentTime);
			console.log(this.props.utils.numberOfAnswers);

			if (currentTime === 0) {

				if (this.props.utils.questionCounter < 9) {

					this.props.utils.questionCounter++;
					this.evalAnswerChosen(undefined, timer);
					this.question();

				} else {

					currentTime = 0;
					this.evalAnswerChosen(undefined, timer);
					this.evalQuestionCount();

				}

			}

		}, 1000);

		let choices = $('.choice').click((event) => {
			this.answerClick(timer, event.currentTarget);
		});

	}

	answerClick (interval, event) {

		let selectedChoice = $(event).val();

		clearInterval(interval);

		if (this.props.utils.numberOfAnswers < 9) {

			this.evalAnswerChosen(selectedChoice);
		 	this.props.utils.questionCounter++;
		 	this.question();

		} else if (this.props.utils.questionCounter === 9) {

			this.evalAnswerChosen(selectedChoice);
			this.evalQuestionCount();

		}
	}

	evalAnswerChosen (choice, interval) {

		if (choice === this.props.api.results[this.props.utils.questionCounter].correct_answer) {

			this.props.utils.correctAnswers++;
			this.props.utils.numberOfAnswers++;

			console.log('Correct');

		} else if (choice !== this.props.api.results[this.props.utils.questionCounter].correct_answer && choice !== undefined) {

			this.props.utils.incorrectAnswers++;
			this.props.utils.numberOfAnswers++;

			console.log('Incorrect');

		} else if (choice === undefined) {

			clearInterval(interval);
			this.props.utils.unansweredQuestions++;
			this.props.utils.numberOfAnswers++;

			console.log('Unanswered');

		}

	}

	evalQuestionCount () {

		if (this.props.utils.numberOfAnswers === 10) {

			$('.trivia-wrap').empty();
			$('.time-wrap').addClass('hide');
			this.calcResults();

		}

	}

	calcResults () {

		if (this.props.utils.correctAnswers === 10) {

			$('.cat-title').remove();
			$('body').append(
				'<div class="overlay"></div>' +
				'<div class="million animated zoomIn text-center">' +
					'<h1>Congratulations you are a Millionaire!!!</h1>' +
					'<button id="reset" onClick="game.reset();">Play Again</button>' +
				'</div>'
			);

		} 
		else if (this.props.utils.correctAnswers === 0 && this.props.utils.unansweredQuestions === 10) {

			$('.cat-title').remove();
			$('.trivia-wrap').empty().append(
				'<button id="reset" onClick="game.reset();">Play Again</button>' +
				`<h4>Correct Answers: ${this.props.utils.correctAnswers} </h4>` +
				`<h4>Incorrect Answers: ${this.props.utils.incorrectAnswers}</h4>` +
				`<h4>Unanswered Questions: ${this.props.utils.unansweredQuestions}</h4>` +
				'<h4>Ummmmmm..... I\'m sorry you didn\'t answer questions.</h4>'
			);

		}
		else {

			$('.cat-title').text('');
			$('.trivia-wrap').append(
				'<h1 class="animated infinite flash">Calculating...</h1>'
			);

			let timeout = setTimeout(() => {

				$('.cat-title').text(this.props.api.results[0].category);
				$('.trivia-wrap').empty().append(
					'<button id="reset" onClick="game.reset();">Play Again</button>' +
					`<h4>Correct Answers: ${this.props.utils.correctAnswers} </h4>` +
					`<h4>Incorrect Answers: ${this.props.utils.incorrectAnswers}</h4>` +
					`<h4>Unanswered Questions: ${this.props.utils.unansweredQuestions}</h4>` +
					`<h2 class="money">You won $ ${this.props.utils.correctAnswers}00,000!!</h2>`
				).removeClass('zoomIn').addClass('zoomIn');

			}, 2500);

		}
	}

	reset () {

		this.props.utils.selectedIndex = 0,
		this.props.utils.questionCounter = 0,
		this.props.utils.questionNumber = 1,
		this.props.utils.correctAnswers = 0,
		this.props.utils.incorrectAnswers = 0,
		this.props.utils.unansweredQuestions = 0,
		this.props.utils.numberOfAnswers = 0,

		$('.trivia-wrap').remove();
		$('.overlay').remove();
		$('.million').remove();
		$('.cat-title').remove();
		$('.trivia-body').append(

			'<div class="trivia-wrap animated zoomIn">' + 
				'<h4>Select your difficulty</h4>' +
				'<button id="easy" class="directions diff" value="Easy">Easy</button>' +
				'<button id="medium" class="directions diff" value="Hard">Hard</button>' +
			'</div>'

		);

		$('.diff').click( function () {

			let diff = $(this).attr('id');
			$('.trivia-wrap').empty().append(

				'<h2 class="select">Please select a category</h2>' +
				'<button id="23" class="category" value="History">History</button>' +
				'<button id="21" class="category" value="Sports">Sports</button>' +
				'<button id="9" class="category" value="General">General</button>' +
				'<button id="14" class="category" value="Television">Television</button>' +
				'<button id="28" class="category" value="Vehicles">Vehicles</button>'

			);
				$('button.category').click((e) => {

					let foo = diff;
					game.categoryClick(e, foo);

				});
		});		

	}

}


const game = new trivia({
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
	api: {}
});

window.onload = function () {
	
	setTimeout( function () {

		$('.directions').addClass('wobble');

	}, 3500);


	$('.directions').click( function () {

		$('body').append(
			'<div class="directions-container animated zoomIn">' +
				'<div class="container">' +
					'<div class="row align-items-center">' +
						'<div class="col-12 text-center directions-text">' +
							'<h1>Directions</h1>' +
							`<h4 class="directions-instructions">${game.props.utils.directions} </h4><br>` +
							'<h4>Select your difficulty</h4>' +
							'<button id="easy" class="directions diff" value="Easy">Easy</button>' +
							'<button id="medium" class="directions diff" value="Hard">Hard</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);

		$('.diff').click( function () {

			let diff = $(this).attr('id');
			$('.directions').remove();
			$('.directions-container').removeClass('zoomIn').addClass('zoomOut');

			$('.directions-container').remove();
			$('.directions').removeClass('infinite wobble').addClass('zoomOut');
			$('.trivia-body').append(
				'<div class="trivia-wrap animated zoomIn">' + 
					'<h2 class="select">Please select a category</h2>' +
					'<button id="23" class="category" value="History">History</button>' +
					'<button id="21" class="category" value="Sports">Sports</button>' +
					'<button id="9" class="category" value="General">General</button>' +
					'<button id="14" class="category" value="Television">Television</button>' +
					'<button id="28" class="category" value="Vehicles">Vehicles</button>' +
				'</div>'
			);

			$('button.category').click( function (e) {

				let foo = diff;
				game.categoryClick(e, foo);

			});

		});	

	});

}