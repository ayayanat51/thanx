/** @format */

"use strict";

function openingAnime() {
  const body = document.querySelector("body");
  body.classList.toggle("is-active");

  gsap
    .timeline()
    .from(".js_opening-txt", {
      duration: 8.6,
      // autoAlpha: 0,
      y: 2,
    })
    .to(".js_opening", {
      autoAlpha: 0,
      duration: 0.8,
      onComplete: function () {
        body.classList.toggle("is-active");
      },
    });
}

const opening = document.querySelector(".js_opening");

function webStorage() {
  if (sessionStorage.getItem("access")) {
    //2回目以降アクセス時の処理には関数を実行しない
    opening.classList.add("is-active");
  } else {
    //初回アクセス時の処理
    sessionStorage.setItem("access", 0);
    openingAnime();
  }
}
webStorage("index.html");

//sessionStorageの使い方について
//https: //developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 0) || 100;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 4;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 8px solid #000, }";
  document.body.appendChild(css);
};
