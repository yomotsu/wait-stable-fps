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
})(this, (function () { 'use strict';

	const DELTA_FPS_30 = 1000 / 30;
	const TEST_FRAME_LENGTH = 10;
	const DIVISOR = 1 / TEST_FRAME_LENGTH;
	const waitStableFps = () => {
	    const recentDeltaTimeList = (new Array(TEST_FRAME_LENGTH)).fill(Infinity);
	    return new Promise((resolve) => {
	        let lastTime = performance.now();
	        const update = () => {
	            const now = performance.now();
	            const delta = now - lastTime;
	            lastTime = now;
	            recentDeltaTimeList.shift();
	            recentDeltaTimeList.push(delta);
	            const averageFPS = recentDeltaTimeList.reduce((a, b) => a + b) * DIVISOR;
	            if (averageFPS < DELTA_FPS_30 ||
	                document.readyState === 'complete') {
	                resolve();
	                return;
	            }
	            requestAnimationFrame(update);
	        };
	        requestAnimationFrame(update);
	    });
	};

	return waitStableFps;

}));
