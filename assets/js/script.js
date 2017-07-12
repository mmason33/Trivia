

var test = {
	score: 0,
	time: 0,
	categories: [],
	startGame: function () {
		window.onload = function() {

			$('.trivia-body').html('<h3>Please select a category</h3><button class="math category">Math</button><button class="science category">Science</button><button class="sports category">sports</button><button class="computer category">Computer Programming</button>');

		}
	},
	catClick: function () {

		$('.triva-body').html('');

	},
	question: function () {},
	reset: function () {}
};

test.startGame();
$('.category').click(catClick);