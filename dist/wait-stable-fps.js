/*!
 * wait-stable-fps
 * https://github.com/yomotsu/wait-stable-fps
 * (c) 2021 @yomotsu
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.waitStableFps = factory());
}(this, (function () { 'use strict';

	var DELTA_FPS_30 = 1000 / 30;
	var TEST_FRAME_LENGTH = 10;
	var DIVISOR = 1 / TEST_FRAME_LENGTH; // resolve() when average FPS reached 30FPS

	var index = waitStableFps = function waitStableFps() {
	  var recentDeltaTimeList = new Array(TEST_FRAME_LENGTH).fill(Infinity);
	  return new Promise(function (resolve) {
	    var lastTime = performance.now();

	    var update = function update() {
	      var now = performance.now();
	      var delta = now - lastTime;
	      lastTime = now;
	      recentDeltaTimeList.shift();
	      recentDeltaTimeList.push(delta);
	      var averageFPS = recentDeltaTimeList.reduce(function (a, b) {
	        return a + b;
	      }) * DIVISOR;

	      if (averageFPS < DELTA_FPS_30 || document.readyState === 'loaded') {
	        resolve();
	        return;
	      }

	      requestAnimationFrame(update);
	    };

	    requestAnimationFrame(update);
	  });
	};

	return index;

})));
