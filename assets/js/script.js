

var test = {
	score: 0,
	time: 0,
	categories: [
		{
			name: 'Math',
			questions: [
				{
					amount: '100,000',
					theQuestion: ''
				},
				{
					amount: '200,000',
					theQuestion: ''
				},
				{
					amount: '300,000',
					theQuestion: ''
				},
				{
					amount: '400,000',
					theQuestion: ''
				},
				{
					amount: '500,000',
					theQuestion: ''
				},
				{
					amount: '600,000',
					theQuestion: ''
				},
				{
					amount: '700,000',
					theQuestion: ''
				},
				{
					amount: '800,000',
					theQuestion: ''
				},
				{
					amount: '900,000',
					theQuestion: ''
				},				
				{
					amount: '1,000,000',
					theQuestion: ''
				}								
			]
		},
		{
			name: 'Science',
			questions: [
				{
					amount: '100,000',
					theQuestion: ''
				},
				{
					amount: '200,000',
					theQuestion: ''
				},
				{
					amount: '300,000',
					theQuestion: ''
				},
				{
					amount: '400,000',
					theQuestion: ''
				},
				{
					amount: '500,000',
					theQuestion: ''
				},
				{
					amount: '600,000',
					theQuestion: ''
				},
				{
					amount: '700,000',
					theQuestion: ''
				},
				{
					amount: '800,000',
					theQuestion: ''
				},
				{
					amount: '900,000',
					theQuestion: ''
				},				
				{
					amount: '1,000,000',
					theQuestion: ''
				}								
			]
		},
		{
			name: 'Sports',
			questions: [
				{
					amount: '100,000',
					theQuestion: ''
				},
				{
					amount: '200,000',
					theQuestion: ''
				},
				{
					amount: '300,000',
					theQuestion: ''
				},
				{
					amount: '400,000',
					theQuestion: ''
				},
				{
					amount: '500,000',
					theQuestion: ''
				},
				{
					amount: '600,000',
					theQuestion: ''
				},
				{
					amount: '700,000',
					theQuestion: ''
				},
				{
					amount: '800,000',
					theQuestion: ''
				},
				{
					amount: '900,000',
					theQuestion: ''
				},				
				{
					amount: '1,000,000',
					theQuestion: ''
				}								
			]
		},
		{
			name: 'Computer',
			questions: [
				{
					amount: '100,000',
					theQuestion: ''
				},
				{
					amount: '200,000',
					theQuestion: ''
				},
				{
					amount: '300,000',
					theQuestion: ''
				},
				{
					amount: '400,000',
					theQuestion: ''
				},
				{
					amount: '500,000',
					theQuestion: ''
				},
				{
					amount: '600,000',
					theQuestion: ''
				},
				{
					amount: '700,000',
					theQuestion: ''
				},
				{
					amount: '800,000',
					theQuestion: ''
				},
				{
					amount: '900,000',
					theQuestion: ''
				},				
				{
					amount: '1,000,000',
					theQuestion: ''
				}								
			]
		}

	],
	startGame: function () {

		$('.trivia-body').html('<div class="trivia-wrap"><h3>Please select a category</h3><button class="math category">Math</button><button class="science category">Science</button><button class="sports category">sports</button><button class="computer category">Computer Programming</button></div>');

	},
	categoryClick: function () {

		$('.trivia-wrap').empty();

	},
	question: function () {},
	timer: function () {},
	answerClick: function () {},
	evalAnswer: function () {},
	reset: function () {}
};

window.onload = function () {

	test.startGame();
	$('button.category').on('click',function(){
		test.categoryClick();
	});

}