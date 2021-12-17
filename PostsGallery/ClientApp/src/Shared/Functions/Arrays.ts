export function existItems<T>(array: Array<T>) {
	return array.length !== 0;
}

export function existItemsMany<T>(arrays: Array<Array<T>>) {
	let result = false;
	arrays.forEach(arr => {
		if (arr.length === 0)
			result = true;
	});
	return result;
}

export function removeFromArray<T>(array: Array<T>, item: T) {
	const index = array.indexOf(item);
	array.splice(index, 1);
}

export function pushToStart<T>(array: T[], index: number) {
	const result = array.concat()
	let injectItem = result[index];
	for (let i = index; i > 0; i--) {
		result[i] = result[i - 1];
	}
	result[0] = injectItem;
	return result;
}


export function groupBy<T, F>(input: T[], factor: (current: T) => F): Map<F, T[]> {
	return input.reduce((result, current) => {
		if (!result.has(factor(current))) {
			result.set(factor(current), []);
		}
		(result.get(factor(current)) as T[]).push(current)
		return result;
	}, new Map<F, T[]>());

}

