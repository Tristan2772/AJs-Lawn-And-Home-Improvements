// ----------- Nav --------

const menuIcon = document.querySelector("#menu-icon");
const menuContent = document.querySelector("#hamburger-menu");
const homeList = document.querySelector("#home-dropdown");
const lawnList = document.querySelector("#lawn-dropdown");
let focusTimer;

//on click, menu icon and x icon are toggled and menu content is toggled
menuIcon.addEventListener("click", function () {
	menuContent.classList.toggle("active");
	menuIcon.classList.toggle("bx-menu");
	menuIcon.classList.toggle("bxs-x-square");
	clearTimeout(focusTimer);
});

//on keyboard focus, show content in menu
menuContent.addEventListener("focusin", function () {
	menuContent.classList.add("active");
	menuIcon.classList.remove("bx-menu");
	menuIcon.classList.add("bxs-x-square");
	clearTimeout(focusTimer);
});

menuContent.addEventListener("focusout", function () {
	focusTimer = setTimeout( () => {
		menuContent.classList.remove("active");
		menuIcon.classList.add("bx-menu");
		menuIcon.classList.remove("bxs-x-square");
	}, 200);
});


//on mouse hover toggle display of nav-dropdown
homeList.addEventListener("mouseenter", () => {
	homeList.classList.add("active");
});
lawnList.addEventListener("mouseenter", () => {
	lawnList.classList.add("active");
});

homeList.addEventListener("mouseleave", () => {
	homeList.classList.remove("active");
});
lawnList.addEventListener("mouseleave", () => {
	lawnList.classList.remove("active");
});


//on keyboard focus, toggle display of nav-dropdown
homeList.addEventListener("focusin", () => {
	homeList.classList.add("active");
});
lawnList.addEventListener("focusin", () => {
	lawnList.classList.add("active");
});

homeList.addEventListener("focusout", () => {
	homeList.classList.remove("active");
});
lawnList.addEventListener("focusout", () => {
	lawnList.classList.remove("active");
});


// ---------------- FAQ --------------
const faqQuestions = document.querySelectorAll(".question");

function listInit() {
	lawnList.open = true;
	homeList.open = true;
	lawnList.classList.remove("active");
	homeList.classList.remove("active");
	faqQuestions.forEach((question) => {
		question.open = !open;
		question.classList.remove("active");
	});
}

//on each page load, run func to smooth out transitions
window.addEventListener("DOMContentLoaded", listInit());

faqQuestions.forEach((question) => {
	question.addEventListener("click", function (event) {
		event.preventDefault();
		// if details is open, close it 
		if (this.open) {
			this.classList.remove("active");
			setTimeout(() => {
				question.open = !open;
			}, 300);
		// or if details is closed, close others and open this one
		} else {
			faqQuestions.forEach((question) => {
				question.classList.remove("active");
				if (question.open) {
					setTimeout(() => {
						question.open = !open;
					}, 300);
				}
			});
			this.classList.add("active");
			this.open = open;
		}
	});
});

// ------------- set cards as active when on sreen effect
let allCards = document.querySelectorAll(
	"#odd, .card, .expect-card, .testimonial, #why-container img"
);
let isScrolling;

document.addEventListener("scroll", () => {
	let windowWidth = document.documentElement.clientWidth;
	windowWidth += 15;
	if (windowWidth <= 880) {
		window.clearTimeout(isScrolling);

		isScrolling = setTimeout(() => {
			let windowTop = window.scrollY;
			let windowBottom = windowTop + window.innerHeight;

			allCards.forEach((card) => {
				let topOfCard = card.offsetTop;
				let cardHeight = card.clientHeight;
				let middleOfCard = cardHeight / 2;
				middleOfCard += topOfCard;

				if (middleOfCard + 50 < windowBottom) {
					// if card is over halfway on the screen, give it active class
					card.classList.add("active");
				}
				if (middleOfCard + 50 < windowTop) {
					// if card if over halfway off the top of screen, remove active class
					card.classList.remove("active");
				}
				if (middleOfCard - 50 > windowBottom) {
					// if card if over halfway off the bottom of screen, remove active class
					card.classList.remove("active");
				}
			});
		}, 250);
	}
});