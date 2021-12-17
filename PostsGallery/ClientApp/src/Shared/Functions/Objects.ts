
export function bindMethods(obj: object) {
	// Модернизация, добавление суфикса "bind" или т.д.
	const decorated = obj as any;
	Object.getOwnPropertyNames(decorated.__proto__).forEach(function (property) {
		if (typeof decorated[property] === 'function') {
			decorated[property] = decorated[property].bind(decorated);
		}
	});
}

export function copyObject<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}





