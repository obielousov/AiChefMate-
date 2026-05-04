"use strict"

window.addEventListener("load", windowLoad)

const html = document.documentElement

function windowLoad() {
	document.addEventListener("click", documentActions)

	headerScroll()

	initActiveCards(".pricing__items", ".pricing__item", "--active")

	html.classList.add("loaded")

	workSlider()
}

function documentActions(e) {
	const targetElement = e.target

	if (targetElement.closest(".icon-menu")) {
		html.classList.toggle("menu-open")
	}

	if (targetElement.closest("summary")) {
		e.preventDefault()

		const spollerTitle = targetElement.closest("summary")
		const spoller = spollerTitle.closest("details")
		const spollerBody = spollerTitle.nextElementSibling

		!spollerBody.hidden
			? spoller.classList.contains("--active")
				? setTimeout(() => {
						spollerBody.hidden = true
					}, 500)
				: (spollerBody.hidden = true)
			: null

		!spoller.open
			? (spoller.open = true)
			: setTimeout(() => {
					spoller.open = false
				}, 500)

		_slideToggle(spollerBody)

		spoller.classList.toggle("--active")
	}
}

function headerScroll() {
	const header = document.querySelector(".header")

	if (!header) return

	function checkScroll() {
		if (window.scrollY > 1) {
			header.classList.add("header-scroll-state")
		} else {
			header.classList.remove("header-scroll-state")
		}
	}

	const options = {
		root: null,
		rootMargin: "0px 0px 0px 0px",
		// Відсоток від розміру об'єкту.
		// При появі якого спрацьовує подія
		// Де 0 це будь яка поява
		// 1 це повна поява об'кта в в'юпорті
		threshold: 0.1,
	}
	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			const currentElement = entry.target
			if (entry.isIntersecting) {
				currentElement.classList.add("--animate")
			} else {
			}
		})
	}
	const observer = new IntersectionObserver(callback, options)

	const animElements = document.querySelectorAll('[class*="--anim"]')
	animElements.forEach((animElement) => {
		observer.observe(animElement)
	})

	checkScroll()

	window.addEventListener("scroll", checkScroll)
}

function initActiveCards(parentSelector, cardSelector, activeClass) {
	const parent = document.querySelector(parentSelector)

	if (!parent) return

	parent.addEventListener("click", function (e) {
		const currentCard = e.target.closest(cardSelector)

		if (!currentCard || !parent.contains(currentCard)) return

		const activeCard = parent.querySelector(`.${activeClass}`)

		if (activeCard === currentCard) return

		activeCard?.classList.remove(activeClass)
		currentCard.classList.add(activeClass)
	})
}

function faqBuild() {
	const faqItems = document.querySelectorAll(".item-faq")
	if (faqItems.length) {
		const faqBody = document.querySelector(".faq__body")
		let faqTemplate = faqItems.forEach((faqItems, index) => {})
	}
}

let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains("_slide")) {
		target.classList.add("_slide")
		target.style.transitionProperty = "height, margin, padding"
		target.style.transitionDuration = duration + "ms"
		target.style.height = `${target.offsetHeight}px`
		target.offsetHeight
		target.style.overflow = "hidden"
		target.style.height = showmore ? `${showmore}px` : `0px`
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false
			!showmore ? target.style.removeProperty("height") : null
			target.style.removeProperty("padding-top")
			target.style.removeProperty("padding-bottom")
			target.style.removeProperty("margin-top")
			target.style.removeProperty("margin-bottom")
			!showmore ? target.style.removeProperty("overflow") : null
			target.style.removeProperty("transition-duration")
			target.style.removeProperty("transition-property")
			target.classList.remove("_slide")
			// Створюємо подію
			document.dispatchEvent(
				new CustomEvent("slideUpDone", {
					detail: {
						target: target,
					},
				}),
			)
		}, duration)
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains("_slide")) {
		target.classList.add("_slide")
		target.hidden = target.hidden ? false : null
		showmore ? target.style.removeProperty("height") : null
		let height = target.offsetHeight
		target.style.overflow = "hidden"
		target.style.height = showmore ? `${showmore}px` : `0px`
		target.style.paddingTop = 0
		target.style.paddingBottom = 0
		target.style.marginTop = 0
		target.style.marginBottom = 0
		target.offsetHeight
		target.style.transitionProperty = "height, margin, padding"
		target.style.transitionDuration = duration + "ms"
		target.style.height = height + "px"
		target.style.removeProperty("padding-top")
		target.style.removeProperty("padding-bottom")
		target.style.removeProperty("margin-top")
		target.style.removeProperty("margin-bottom")
		window.setTimeout(() => {
			target.style.removeProperty("height")
			target.style.removeProperty("overflow")
			target.style.removeProperty("transition-duration")
			target.style.removeProperty("transition-property")
			target.classList.remove("_slide")
			// Створюємо подію
			document.dispatchEvent(
				new CustomEvent("slideDownDone", {
					detail: {
						target: target,
					},
				}),
			)
		}, duration)
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration)
	} else {
		return _slideUp(target, duration)
	}
}

function workSlider() {
	const SELLECTORS = {
		wrapper: ".works",
		contentSlider: ".slider-works__content",
		imageSlider: ".slider-works__swiper",
		sliderBtnNext: ".slider-works__button--next",
		sliderBtnPrev: ".slider-works__button--prev",
		sliderPagination: ".slider-works__pagination",
	}

	const imageSliderEl = document.querySelector(SELLECTORS.imageSlider)
	const imageOffset = Number(imageSliderEl?.dataset.slidesOffset) || 10
	const imageRotate = Number(imageSliderEl?.dataset.slidesRotate) || 12

	const contentSlider = new Swiper(SELLECTORS.contentSlider, {
		effect: "fade",
		speed: 600,
		allowTouchMove: false,
		fadeEffect: {
			crossFade: true,
		},
	})

	const imageSlider = new Swiper(SELLECTORS.imageSlider, {
		effect: "cards",
		speed: 600,
		watchSlidesProgress: true,

		cardsEffect: {
			slideShadows: false,
			perSlideOffset: imageOffset,
			perSlideRotate: imageRotate,
		},

		pagination: {
			el: SELLECTORS.sliderPagination,
			type: "fraction",
		},

		navigation: {
			nextEl: SELLECTORS.sliderBtnNext,
			prevEl: SELLECTORS.sliderBtnPrev,
		},

		controller: {
			control: contentSlider,
		},
	})

	contentSlider.controller.control = imageSlider
}
