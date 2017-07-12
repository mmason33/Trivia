

var test = {
	score: 0,
	time: 0,
	categories: ['math', 'science', 'sports', 'computers'],
	startGame: function () {

		$('.trivia-body').html('<div class="trivia-wrap"><h3>Please select a category</h3><button class="math category">Math</button><button class="science category">Science</button><button class="sports category">sports</button><button class="computer category">Computer Programming</button></div>');

	},
	catClick: function (categories) {

		$('.trivia-wrap').empty();

	},
	question: function () {},
	reset: function () {}
};

window.onload = function () {

	test.startGame();
	$('button.category').on('click',function(){
		test.catClick();
	});

}