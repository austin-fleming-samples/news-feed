<script context="module" lang="ts">
	export type NavigationIconName = 'home' | 'stories' | 'newsletters' | 'podcasts' | 'hamburger';
</script>

<script lang="ts">
	export let name: NavigationIconName;
	export let width = '1em';
	export let height = '1em';
	export let color = 'currentColor';

	// NOTE: using iOS glyph
	const iconTable: Record<NavigationIconName, { box: number; svg: string }> = {
		home: {
			box: 30,
			svg: `<path fill="${color}" d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z" />`
		},
		newsletters: {
			box: 30,
			svg: `<path fill="${color}" d="M 4 2 C 3.448 2 3 2.448 3 3 L 3 24 C 3 26.209 4.791 28 7 28 L 22 28 L 23 28 L 24 28 C 26.209 28 28 26.209 28 24 L 28 10 C 28 9.448 27.552 9 27 9 L 25 9 L 25 24 C 25 24.553 24.552 25 24 25 C 23.448 25 23 24.553 23 24 L 23 3 C 23 2.448 22.552 2 22 2 L 4 2 z M 6 6 L 20 6 L 20 9 L 6 9 L 6 6 z M 6 13 L 12 13 L 12 15 L 6 15 L 6 13 z M 14 13 L 20 13 L 20 15 L 14 15 L 14 13 z M 6 17 L 12 17 L 12 19 L 6 19 L 6 17 z M 14 17 L 20 17 L 20 19 L 14 19 L 14 17 z M 6 21 L 12 21 L 12 23 L 6 23 L 6 21 z M 14 21 L 20 21 L 20 23 L 14 23 L 14 21 z" />`
		},
		podcasts: {
			box: 30,
			svg: `<path fill="${color}" d="M 15 1 C 7.8324839 1 2 6.8324839 2 14 C 2 19.007051 4.8422214 23.35865 9.0019531 25.527344 A 1.0002691 1.0002691 0 0 0 9.9277344 23.753906 C 6.4074661 21.9186 4 18.250949 4 14 C 4 7.9135161 8.9135161 3 15 3 C 21.086484 3 26 7.9135161 26 14 C 26 18.250949 23.593315 21.919649 20.074219 23.753906 A 1.0001 1.0001 0 1 0 20.998047 25.527344 C 25.156951 23.359601 28 19.007051 28 14 C 28 6.8324839 22.167516 1 15 1 z M 15 5 C 10.041484 5 6 9.0414839 6 14 C 6 16.535236 7.0583621 18.833285 8.7480469 20.466797 A 1.0007326 1.0007326 0 0 0 10.138672 19.027344 C 8.8203565 17.752855 8 15.980764 8 14 C 8 10.122516 11.122516 7 15 7 C 18.877484 7 22 10.122516 22 14 C 22 15.980764 21.179643 17.752855 19.861328 19.027344 A 1.0007326 1.0007326 0 1 0 21.251953 20.466797 C 22.941638 18.833285 24 16.535236 24 14 C 24 9.0414839 19.958516 5 15 5 z M 15 11 A 3 3 0 0 0 12 14 A 3 3 0 0 0 15 17 A 3 3 0 0 0 18 14 A 3 3 0 0 0 15 11 z M 15 19 C 13.343 19 12 20.343 12 22 C 12 22.148 12.023922 22.290594 12.044922 22.433594 L 12.033203 22.433594 L 12.060547 22.591797 C 12.061547 22.597797 12.0615 22.605328 12.0625 22.611328 L 13.015625 28.238281 L 13.023438 28.236328 C 13.142437 29.228328 13.977 30 15 30 C 16.023 30 16.857563 29.228328 16.976562 28.236328 L 16.984375 28.238281 L 17.9375 22.611328 C 17.9385 22.605328 17.938453 22.597797 17.939453 22.591797 L 17.966797 22.433594 L 17.955078 22.433594 C 17.976078 22.290594 18 22.148 18 22 C 18 20.343 16.657 19 15 19 z" />`
		},
		stories: {
			box: 30,
			svg: `<path fill="${color}" d="M 6.6894531 4 C 6.4823624 4 6.0111401 4.0475719 5.6152344 4.3164062 C 5.2193287 4.5852406 4.9188064 4.9901615 4.6464844 5.5546875 L 4.6464844 5.5566406 C 4.4942912 5.8724347 4.1955355 6.593733 3.75 7.6660156 C 3.3044645 8.7382983 2.7477305 10.089239 2.203125 11.416016 C 1.140881 14.00387 0.17656868 16.372298 0.12695312 16.494141 A 1.0001 1.0001 0 0 0 -0.009765625 17.072266 A 1.0001 1.0001 0 0 0 -0.005859375 17.132812 A 1.0001 1.0001 0 0 0 1 18.029297 L 1 18.220703 L 1 18.222656 C 1 19.974763 1.3595538 21.687386 2.5 22.982422 C 3.6404462 24.27741 5.4844416 25 8 25 C 9.8655614 25 11.456964 24.283787 12.490234 23.033203 C 13.523505 21.782619 14 20.08435 14 18.167969 L 14 17.175781 C 14.200188 17.094786 14.502936 17 15 17 C 15.497064 17 15.799812 17.094787 16 17.175781 L 16 18.167969 C 16 20.08435 16.476495 21.782619 17.509766 23.033203 C 18.543036 24.283787 20.134439 25 22 25 C 24.515558 25 26.359554 24.277457 27.5 22.982422 C 28.640446 21.687386 29 19.974763 29 18.222656 L 29 18.220703 L 29 18.029297 A 1.0001 1.0001 0 0 0 30.007812 17.117188 A 1.0001 1.0001 0 0 0 29.873047 16.492188 C 29.822812 16.368824 28.858769 14.003018 27.796875 11.416016 C 27.252269 10.089239 26.695535 8.7382983 26.25 7.6660156 C 25.804465 6.593733 25.505709 5.8724316 25.353516 5.5566406 L 25.353516 5.5546875 C 25.081194 4.9901584 24.780671 4.5852406 24.384766 4.3164062 C 23.98886 4.047572 23.517638 4 23.310547 4 C 22.562501 4 21.946709 4.5520735 21.652344 5.0644531 C 21.357979 5.5768328 21.199936 6.1311445 21.035156 6.7382812 A 1.0001 1.0001 0 1 0 22.964844 7.2617188 C 23.108126 6.7337881 23.250716 6.3421572 23.361328 6.1308594 C 23.408898 6.1849434 23.434378 6.1825194 23.550781 6.4238281 C 23.592091 6.5095371 23.958848 7.3662201 24.402344 8.4335938 C 24.84584 9.5009673 25.401294 10.850433 25.945312 12.175781 C 26.652484 13.898603 26.933639 14.591241 27.328125 15.556641 C 26.002315 15.283255 24.138488 15 22 15 C 20.235393 15 18.107225 15.241857 16.693359 15.417969 C 16.3857 15.270979 16.013483 15.041908 15.164062 15.011719 A 1.0001 1.0001 0 0 0 15 15 A 1.0001 1.0001 0 0 0 14.859375 15.009766 C 13.991539 15.036073 13.61735 15.269522 13.306641 15.417969 C 11.892775 15.241857 9.7646069 15 8 15 C 5.8615122 15 3.9976854 15.283255 2.671875 15.556641 C 3.0663612 14.591241 3.3475163 13.898603 4.0546875 12.175781 C 4.598707 10.850433 5.1541606 9.5009672 5.5976562 8.4335938 C 6.041152 7.3662201 6.4079119 6.5095371 6.4492188 6.4238281 C 6.5656236 6.1825198 6.591097 6.1849436 6.6386719 6.1308594 C 6.7492838 6.3421572 6.8918737 6.7337881 7.0351562 7.2617188 A 1.0001 1.0001 0 1 0 8.9648438 6.7382812 C 8.8000643 6.1311446 8.6420214 5.5768328 8.3476562 5.0644531 C 8.0532913 4.5520735 7.4374993 4 6.6894531 4 z M 8 17 C 9.2351768 17 10.714266 17.144629 12 17.289062 L 12 18.167969 C 12 19.751588 11.602698 20.96885 10.949219 21.759766 C 10.29574 22.550682 9.3874386 23 8 23 C 5.8485584 23 4.6928038 22.446871 4 21.660156 C 3.3075332 20.873824 3.0002991 19.700491 3 18.224609 L 3 18.222656 L 3.0019531 17.533203 C 4.2192672 17.276867 5.961497 17 8 17 z M 22 17 C 24.038503 17 25.780733 17.276867 26.998047 17.533203 L 27 18.224609 C 26.999701 19.700491 26.692467 20.873824 26 21.660156 C 25.307196 22.446871 24.151442 23 22 23 C 20.612561 23 19.70426 22.550682 19.050781 21.759766 C 18.397302 20.96885 18 19.751588 18 18.167969 L 18 17.289062 C 19.285734 17.144631 20.764823 17 22 17 z" />`
		},
		hamburger: {
			box: 30,
			svg: `<path fill="${color}" d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" />`
		}
	};

	const icon = iconTable[`${name}`];
</script>

<svg viewBox="0 0 {icon.box} {icon.box}" {width} {height}>{@html icon.svg}</svg>
