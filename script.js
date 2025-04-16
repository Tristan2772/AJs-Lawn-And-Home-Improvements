// ----------- Nav --------

const menuIcon = document.querySelector("#menu-icon");
const menuContent = document.querySelector("#hamburger-menu");
const navDropdowns = document.querySelectorAll(".nav-dropdown");
const navBtns = document.querySelectorAll(".nav-dropdown button");
const navBar = document.querySelector("nav");
let focusTimer;

//on mobile menu click, menu icon and x icon are toggled and menu content is toggled
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


//on nav dropdown click, open list 
navDropdowns.forEach(dropdown => {

	let btn = dropdown.querySelector("button");
	const btnContent = document.getElementById(btn.getAttribute("aria-controls"));
	btn.addEventListener("click", () => {

		//if open when clicked, close it. if closed, open
		const isExpanded = btn.getAttribute("aria-expanded") === "true";
		
		navBtns.forEach(navBtn => {
			// close all accordions
			navBtn.setAttribute("aria-expanded", "false");
			const content = document.getElementById(navBtn.getAttribute("aria-controls"));
			content.setAttribute("hidden", "");
			const parEl = navBtn.parentElement;
			parEl.classList.remove("active");
			//take links out of tab order
			content.querySelectorAll("a").forEach(link => {
				link.setAttribute("tabindex", "-1");
			});
		});
		
		if (!isExpanded) {
			//open this accordion
			btn.setAttribute("aria-expanded", "true");
			const content = document.getElementById(btn.getAttribute("aria-controls"));
			content.removeAttribute('hidden');
			const parEl = btn.parentElement;
			parEl.classList.add("active");
			//reset links tab order
			content.querySelectorAll("a").forEach(link => {
				link.removeAttribute("tabindex");
			});
		}                                                 
	});

	//close when button or content is not in focus
	const closeOnBlur = () => {
		setTimeout(() => {
			const activeEl = document.activeElement;
			const parEl = btn.parentElement;
			if (!btn.contains(activeEl) && !btnContent.contains(activeEl)) {
				parEl.classList.remove("active");
				btn.setAttribute("aria-expanded", "false");
				btnContent.setAttribute("hidden", "");
				btnContent.querySelectorAll("a").forEach(link => {
					link.setAttribute("tabindex", "-1");
				});
			}
		}, 200);
	}

	btn.addEventListener("blur", closeOnBlur);
	btnContent.addEventListener("focusout", closeOnBlur);
	
});

//dynamically place navbar to avoid alignment issues
function setNavHeight() {
	let navHeight = navBar.offsetHeight;
	menuContent.style.top = navHeight + "px";
}

window.addEventListener("load", setNavHeight);
window.addEventListener("resize", setNavHeight);


// ------------- set cards as active when on sreen
let allCards = document.querySelectorAll(
	"#odd, .card, .featured-container img, .expect-card, .testimonial, #why-container img"
);
let isScrolling;

function setActiveCard() {
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

				if (middleOfCard + 20 < windowBottom) {
					// if card is over halfway on the screen, give it active class
					card.classList.add("active");
				}
				if (middleOfCard + 20 < windowTop) {
					// if card if over halfway off the top of screen, remove active class
					card.classList.remove("active");
					card.blur();
				}
				if (middleOfCard - 20 > windowBottom) {
					// if card if over halfway off the bottom of screen, remove active class
					card.classList.remove("active");
					card.blur();
				}
			});
		}, 300);
	} else {
		allCards.forEach((card) => {
			card.classList.remove("active");
		});
	}
}

document.addEventListener("scroll", setActiveCard);
window.addEventListener("resize", setActiveCard);


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

//on tap, change service img. on blur, change it back
const imageBoxes = document.querySelectorAll(".service-img");
imageBoxes.forEach(imageBox => {
	imageBox.addEventListener("mouseenter", () => {
		imageBox.classList.add("active");
	});
	imageBox.addEventListener("pointerdown", () => {
		imageBox.classList.toggle("active");
	});
	imageBox.addEventListener("mouseout", () => {
		imageBox.classList.remove("active");
	});
	imageBox.addEventListener("blur", () => {
		imageBox.classList.remove("active");
	});
});