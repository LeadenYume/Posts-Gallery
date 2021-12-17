export function numberRange(start: number, end?: number) {
	const result = [];
	const _start = end !== undefined ? start : 0;
	const _end = end !== undefined ? end : start;
	let index = 0;
	for (let i = _start; i < _end; i++) {
		result[index] = i;
		index++;
	}
	return result;
}

export function numberEnumerable(start: number, end?: number) {
	const _start = end !== undefined ? start : 0;
	const _end = end !== undefined ? end : start;
	return {
		forEach: (iter: (num: number, index?: number) => void) => {
			let index = 0;
			for (let i = _start; i < _end; i++) {
				iter(i, index);
				index++;
			}
		}
	};
}