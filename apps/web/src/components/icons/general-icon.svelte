<script context="module" lang="ts">
	export type GeneralIconName = 'arrowRight' | 'chevronRight';
</script>

<script lang="ts">
	export let name: GeneralIconName;
	export let size = '1em';
	export let color = 'currentColor';

	// NOTE: using iOS glyph
	const iconTable: Record<GeneralIconName, { box: number; svg: string }> = {
		arrowRight: {
			box: 30,
			svg: `<path fill="${color}" d="M 22.990234 8.9902344 A 1.0001 1.0001 0 0 0 22.292969 10.707031 L 25.585938 14 L 2 14 A 1.0001 1.0001 0 1 0 2 16 L 25.585938 16 L 22.292969 19.292969 A 1.0001 1.0001 0 1 0 23.707031 20.707031 L 28.619141 15.794922 A 1.0001 1.0001 0 0 0 28.623047 14.207031 A 1.0001 1.0001 0 0 0 28.617188 14.203125 L 23.707031 9.2929688 A 1.0001 1.0001 0 0 0 22.990234 8.9902344 z" />`
		},
		chevronRight: {
			box: 30,
			svg: `<path fill="${color}" d="M12,27h-2c-0.386,0-0.738-0.223-0.904-0.572s-0.115-0.762,0.13-1.062L17.708,15L9.226,4.633 c-0.245-0.299-0.295-0.712-0.13-1.062S9.614,3,10,3h2c0.3,0,0.584,0.135,0.774,0.367l9,11c0.301,0.369,0.301,0.898,0,1.267l-9,11 C12.584,26.865,12.3,27,12,27z" />`
		}
	};

	const icon = iconTable[`${name}`];
</script>

<svg viewBox="0 0 {icon.box} {icon.box}" width={size} height={size}>{@html icon.svg}</svg>
