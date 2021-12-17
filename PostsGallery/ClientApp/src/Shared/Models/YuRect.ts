import { numberEnumerable } from "../Functions/NumberRange";
import { YuColor } from "./YuColor";

export class YuRect {
	private _left: number;
	private _right: number;
	private _top: number;
	private _bottom: number;
	private _width: number;
	private _height: number;
	private _color: YuColor | undefined;
	constructor(left: number, right: number, top: number, bottom: number, color?: YuColor) {
		this._left = left;
		this._right = right;
		this._top = top;
		this._bottom = bottom;
		this._width = this._right - this._left;
		this._height = this._top - this._bottom;
		if (color)
			this._color = color;
	}

	private update() {
		this._width = this._right - this._left;
		this._height = this._top - this._bottom;
	}

	public get left(): number {
		return this._left;
	}
	public get right(): number {
		return this._right;
	}
	public get top(): number {
		return this._top;
	}
	public get bottom(): number {
		return this._bottom;
	}
	public get width(): number {
		return this._width;
	}
	public get height(): number {
		return this._height;
	}
	public get color(): YuColor | undefined {
		return this._color;
	}

	public set(left: number, right: number, top: number, bottom: number) {
		this._left = left;
		this._right = right;
		this._top = top;
		this._bottom = bottom;
		this.update();
	}

	public setLeft(left: number) {
		this._left = left;
		this.update();
		return this;
	}

	public setRight(right: number) {
		this._right = right;
		this.update();
		return this;
	}

	public setTop(top: number) {
		this._top = top;
		this.update();
		return this;
	}

	public setBottom(bottom: number) {
		this._bottom = bottom;
		this.update();
		return this;
	}

	static clone(rect: YuRect) {
		return new YuRect(rect._left, rect._right, rect._top, rect._bottom, rect._color);
	}

	static ExpandTwoRects(a: YuRect, b: YuRect) {
		return new YuRect(
			Math.min(a._left, b._left),
			Math.max(a._right, b._right),
			Math.max(a._top, b._top),
			Math.min(a._bottom, b._bottom),
		);
	}

	static ExpandRects(arr: YuRect[]) {
		let result = arr[0];
		numberEnumerable(0, arr.length - 1).forEach(index => {
			if (result && arr[index + 1])
				result = YuRect.ExpandTwoRects(result, arr[index + 1]);
		});
		result.update();
		return result;
	}

	static Average(rects: YuRect[]) {
		let Left = 0;
		let Right = 0;
		let Top = 0;
		let Bottom = 0;
		rects.forEach(rect => {
			Left += rect._left;
			Right += rect._right;
			Top += rect._top;
			Bottom += rect._bottom;
		});
		const count = rects.length;
		return new YuRect(Left / count, Right / count, Top / count, Bottom / count);
	}
}