import { YuRect } from "./YuRect";
import { YuVec3 } from "./YuVec3";


export class YuMath {

	static Lerp(a: number, b: number, t: number): number {
		let result = a * (1 - t) + b * t;
		if (b > a) {
			if (result > b) result = b;
			if (result < a) result = a;
		} else {
			if (result < b) result = b;
			if (result > a) result = a;
		}
		return result;
	}

	static rotatePoint(point: YuVec3, angle: number): YuVec3 {
		return new YuVec3(
			point.x * Math.cos(angle) - point.y * Math.sin(angle),
			point.x * Math.sin(angle) + point.y * Math.cos(angle),
			point.z
		);
	}

	static UpFirstChar(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static inRange(val: number, min: number, max: number) {
		let result = val;
		if (result < min) result = min;
		if (result > max) result = max;
		return result;
	}

	static pow10(pow: number): number {
		let result = 1;
		for (let i = 0; i < pow; i++)
			result *= 10;
		return result;
	}

	static round(val: number, places?: number) {
		if (places !== undefined)
			return Math.round((val + Number.EPSILON) * YuMath.pow10(places)) / YuMath.pow10(places);
		else
			return Math.round(val);
	}

	static rectsIntersect(rectA: YuRect, rectB: YuRect) {
		const maxAx = rectA.right > rectA.left ? rectA.right : rectA.left;
		const maxAy = rectA.top > rectA.bottom ? rectA.top : rectA.bottom;
		const minAx = rectA.right < rectA.left ? rectA.right : rectA.left;
		const minAy = rectA.top < rectA.bottom ? rectA.top : rectA.bottom;

		const maxBx = rectB.right > rectB.left ? rectB.right : rectB.left;
		const maxBy = rectB.top > rectB.bottom ? rectB.top : rectB.bottom;
		const minBx = rectB.right < rectB.left ? rectB.right : rectB.left;
		const minBy = rectB.top < rectB.bottom ? rectB.top : rectB.bottom;

		const aLeftOfB = maxAx < minBx;
		const aRightOfB = minAx > maxBx;
		const aAboveB = minAy > maxBy;
		const aBelowB = maxAy < minBy;
		if (!(aLeftOfB || aRightOfB || aAboveB || aBelowB))
			return true
		else
			return false;
	}

	static InRange(a: number, min: number, max: number) {
		return a >= min && a <= max;
	}

	static SumRange(range: number[]) {
		let result = 0;
		range.forEach(item => result += item);
		return result;
	}

	static CompressRange<T>(array: T[], GetX: (x: T) => number, factor: number, onCompress: (items: T[], isNeeded: boolean) => T, needSplit?: (x: T) => boolean) {
		const result: T[] = [];
		for (let i = 0; i < array.length; i++) {
			const startX = GetX(array[i]);
			let currentX = startX, currentPoint = array[i];
			let toCompress: T[] = [];
			let split = false;
			while (true) {
				toCompress.push(currentPoint);
				if (needSplit && needSplit(currentPoint)) {
					split = true;
					break;
				}
				i++;
				if (i < array.length) {
					currentPoint = array[i];
					currentX = GetX(array[i]);
				} else {
					break;
				}
				if (!(currentX - startX < factor)) {
					i -= 1;
					break;
				}
			}
			const point = onCompress(toCompress, split);
			result.push(point);
		}
		return result;
	}
	
	static filterMapWithNeighboring<T, G>(filtered: T[], condition: (item: T) => boolean, itemMap: (item: T) => G) {
		const result: G[] = [];
		let needPrev = true;


		for (let i = 0; i < filtered.length; i++) {
			const current = filtered[i];

			if (condition(current)) {
				if (needPrev) {
					needPrev = false;
					const prev = filtered[i - 1];
					if (prev)
						result.push(itemMap(prev));
					result.push(itemMap(current));
				}
				else {
					result.push(itemMap(current));
				}
			}
			else if (!needPrev) {
				const next = filtered[i + 1];
				if (next)
					result.push(itemMap(next));
				break;
			}
			continue;
		}

		return result;
	}

	static filterWithNeighboring<T>(filtered: T[], condition: (item: T) => boolean) {
		const result: T[] = [];
		let needPrev = true;

		for (let i = 0; i < filtered.length; i++) {
			const current = filtered[i];

			if (condition(current)) {
				if (needPrev) {
					needPrev = false;
					const prev = filtered[i - 1];
					if (prev)
						result.push(prev);
					result.push(current);
				}
				else {
					result.push(current);
				}
			}
			else if (!needPrev) {
				const next = filtered[i + 1];
				if (next)
					result.push(next);
				break;
			}
			continue;
		}

		return result;
	}
}