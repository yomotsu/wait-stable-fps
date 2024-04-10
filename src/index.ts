const DELTA_FPS_30 = 1000 / 30;
const TEST_FRAME_LENGTH = 10;
const DIVISOR = 1 / TEST_FRAME_LENGTH;

// resolve() when average FPS reached 30FPS
const waitStableFps = (): Promise<void> => {

	const recentDeltaTimeList = ( new Array( TEST_FRAME_LENGTH ) ).fill( Infinity );

	return new Promise( ( resolve ) => {

		let lastTime = performance.now();

		const update = () => {

			const now = performance.now();
			const delta = now - lastTime;
			lastTime = now;

			recentDeltaTimeList.shift();
			recentDeltaTimeList.push( delta );
			const averageFPS = recentDeltaTimeList.reduce( ( a, b ) => a + b ) * DIVISOR;

			if (
				averageFPS < DELTA_FPS_30 ||
				document.readyState === 'complete'
			) {

				resolve();
				return;

			}

			requestAnimationFrame( update );

		}

		requestAnimationFrame( update );

	} );

};

export default waitStableFps;
