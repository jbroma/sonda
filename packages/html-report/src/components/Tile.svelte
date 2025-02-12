<g>
	<rect
		data-tile={ content.path }
		data-hover={ `${ content.name } - ${ formattedSize } (${ percentageOfTotal }%)` }
		x={ tile.x }
		y={ tile.y }
		width={ tile.width }
		height={ tile.height }
		fill={ color }
		class="stroke-gray-500 { isFolder( content ) ? 'cursor-zoom-in' : 'cursor-pointer' }"
		shape-rendering="crispEdges"
		vector-effect="non-scaling-stroke"
	/>

	<foreignObject
		x={ tile.x }
		y={ tile.y }
		width={ tile.width }
		height={ tile.height }
		class="pointer-events-none"
	>
		<p
			xmlns="http://www.w3.org/1999/xhtml"
			class="p-1 size-full text-center text-xs truncate"
		>
			{#if shouldDisplayText}
				<span class="text-gray-900">{ content.name }</span>
				<span class="text-gray-600">- { formattedSize }</span>
			{/if}
		</p>
	</foreignObject>

	{#if children.length}
		<Level
			content={ children }
			{ totalBytes }
			width={ childWidth }
			height={ childHeight }
			xStart={ tile.x + padding }
			yStart={ tile.y + paddingTop }
		/>
	{/if}
</g>

<script lang="ts">
import Level from './Level.svelte';
import { formatSize } from '../format';
import { isFolder, type Content } from '../FileSystemTrie';
import type { TileData } from '../TreeMapGenerator';

const tresholdInPixels = 20;
const padding = 6;
const paddingTop = 22;

interface Props {
	tile: TileData;
	content: Content;
	totalBytes: number;
}

let { tile, content, totalBytes }: Props = $props();

const childWidth = $derived( tile.width - ( padding * 2 ) );
const childHeight = $derived( tile.height - padding - paddingTop );
const formattedSize = $derived( formatSize( content.uncompressed ) );
const percentageOfTotal = $derived( Math.min( content.uncompressed / totalBytes * 100, 100 ).toFixed(2) );
const color = $derived( `color-mix(in oklch, #fca5a5 ${ percentageOfTotal }%, #86efac)` );
const shouldDisplayText = $derived( tile.width >= ( paddingTop * 1.75 ) && tile.height >= paddingTop );

const children = $derived.by(() => {
	if ( !isFolder( content ) || childHeight <= tresholdInPixels || childWidth <= tresholdInPixels ) {
		return [];
	}

	return content.items;
} );
</script>

<style>
rect:hover {
	filter: brightness(1.15);
}
</style>
