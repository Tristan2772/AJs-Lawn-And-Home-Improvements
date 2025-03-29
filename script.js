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


// ---------------- FAQ --------------
const questions = document.querySelectorAll(".question");
const questionCards = document.querySelectorAll(".question-card");

questions.forEach(question => {
	question.addEventListener("click", () => {
		const isExpanded = question.getAttribute("aria-expanded") === "true";
		let parEl = question.parentElement;
		//if open when clicked, close it
		if (isExpanded) {
			parEl.classList.remove("active");
			question.setAttribute("aria-expanded", "false");
			//if closed when clicked, close others and open the clicked one
		} else {
			//close other question cards
			questionCards.forEach(card => {
				card.classList.remove("active");
				let childEl = card.querySelector(".question");
				childEl.setAttribute("aria-expanded", "false");
			});
			//open this question card
			parEl.classList.add("active");
			question.setAttribute("aria-expanded", "true");
		}
	});
});