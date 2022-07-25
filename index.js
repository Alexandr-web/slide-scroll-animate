"use strict";

window.addEventListener("load", () => {
    class ScrollAnimate {
        constructor(slides, listDots) {
            this.slides = slides;
            this.listDots = listDots;
            this.dots = [];
            this.numActiveSlide = 0;
        }

        createDots() {
            for (let i = 0; i < this.slides.length; i++) {
                const dot = document.createElement("li");

                dot.classList.add("dot");

                if (i === this.numActiveSlide) {
                    dot.classList.add("dot--active");
                }

                this.listDots.appendChild(dot);
                this.dots.push(dot);
            }
        }

        setActiveSlide() {
            const activeSlide = this.slides[this.numActiveSlide];
            const top = activeSlide.offsetTop;

            activeSlide.classList.add("slide--active");
            activeSlide.style.transform = `translateY(-${top * this.numActiveSlide}px)`;
        }

        removeActiveSlide() {
            this.slides.forEach((slide) => {
                slide.classList.remove("slide--active");
                slide.style.transform = "translateY(0)";
            });
        }

        checkNumActiveSlide() {
            if (this.numActiveSlide < 0) {
                this.numActiveSlide = 0;
            }

            if (this.numActiveSlide > this.slides.length - 1) {
                this.numActiveSlide = this.slides.length - 1;
            }
        }

        setActiveDot() {
            this.dots[this.numActiveSlide].classList.add("dot--active");
        }

        removeActiveDot() {
            this.dots.map((dot) => dot.classList.remove("dot--active"));
        }

        scroll() {
            window.addEventListener("wheel", (e) => {
                const wheelSide = e.wheelDeltaY;

                this.numActiveSlide += wheelSide < 0 ? 1 : -1;

                this.checkNumActiveSlide();
                this.removeActiveSlide();
                this.setActiveSlide();
                this.removeActiveDot();
                this.setActiveDot();
            });
        }

        clickByDots() {
            this.dots.map((dot, index) => {
                dot.addEventListener("click", () => {
                    this.numActiveSlide = index;

                    this.removeActiveSlide();
                    this.setActiveSlide();
                    this.removeActiveDot();
                    this.setActiveDot();
                });
            });
        }

        init() {
            this.createDots();
            this.setActiveSlide();
            this.scroll();
            this.clickByDots();
        }
    }

    const slides = document.querySelectorAll(".slide");
    const listDots = document.querySelector(".dots");

    new ScrollAnimate(slides, listDots).init();
});