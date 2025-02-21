// ----------- Nav --------

const menuIcon = document.querySelector("#menu-icon");
const menuContent = document.querySelector("#hamburger-menu");
const homeList = document.querySelector("#home-dropdown");
const lawnList = document.querySelector("#lawn-dropdown");
let contentFocusCount = 0;

//on click, menu icon turns into x icon
menuIcon.addEventListener("click", function () {
	menuContent.classList.toggle("active");
	menuIcon.classList.toggle("bx-menu");
	menuIcon.classList.toggle("bxs-x-square");
});

menuContent.addEventListener("focusin", function () {
	contentFocusCount ++;
	menuContent.classList.add("active");
	menuIcon.classList.remove("bx-menu");
	menuIcon.classList.add("bxs-x-square");
});

menuContent.addEventListener("focusout", function () {
	contentFocusCount --;
	setTimeout(() => {
		if (contentFocusCount === 0) {
			menuContent.classList.remove("active");
			menuIcon.classList.add("bx-menu");
			menuIcon.classList.remove("bxs-x-square");
		}
	}, 30);
});

function listInit() {
    lawnList.open = true;
    homeList.open = true;
    lawnList.classList.remove('active');
    homeList.classList.remove('active');
}
listInit();

//add display to ul of nav-dropdown
homeList.addEventListener("mouseenter", () => {
    homeList.classList.add('active');
    setTimeout(() => {
        homeList.open = true;
    }, 10);
});
lawnList.addEventListener("mouseenter", () => {
    lawnList.classList.add('active');
    setTimeout(() => {
        lawnList.open = true;
    }, 10);
});

homeList.addEventListener("focusin", () => {
    homeList.classList.add('active');
    setTimeout(() => {
        homeList.open = true;
    }, 10);
});
lawnList.addEventListener("focusin", () => {
    lawnList.classList.add('active');
    setTimeout(() => {
        lawnList.open = true;
    }, 10);
});


homeList.addEventListener("mouseleave", () => {
    homeList.classList.remove('active');
    setTimeout(() => {
        homeList.open = false;
    }, 10);
});
lawnList.addEventListener("mouseleave", () => {
    lawnList.classList.remove('active');
    setTimeout(() => {
        lawnList.open = false;
    }, 10);
});

homeList.addEventListener("focusout", () => {
    homeList.classList.remove('active');
    setTimeout(() => {
        homeList.open = false;
    }, 10);
});
lawnList.addEventListener("focusout", () => {
    lawnList.classList.remove('active');
    setTimeout(() => {
        lawnList.open = false;
    }, 10);
});

// ---------------- FAQ --------------

const faqQuestions = document.querySelectorAll(".question");

faqQuestions.forEach((question) => {
	question.addEventListener("click", function (event) {
		event.preventDefault();
		if (this.open) {
			this.classList.toggle("active");
			setTimeout(() => {
				question.open = !open;
			}, 250);
		} else {
			faqQuestions.forEach((question) => {
				question.classList.remove("active");
				if (question.open) {
					setTimeout(() => {
						question.open = !open;
					}, 250);
				}
			});
			this.classList.toggle("active");
			this.open = open;
		}
	});
});


// ------------- set cards as active when on sreen effect
let allCards = document.querySelectorAll("#odd, .card, .expect-card, .testimonial, #why-container img");
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
