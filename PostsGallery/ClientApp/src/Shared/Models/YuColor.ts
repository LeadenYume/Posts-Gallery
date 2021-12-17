import { YuMath } from "./YuMath";


export class YuColor {
	_r = 0; public get r(): number { return this._r; }  
	_g = 0; public get g(): number { return this._g; }
	_b = 0; public get b(): number { return this._b; }
	_a = 1; public get a(): number { return this._a; }
	rFloat = 0;
	gFloat = 0;
	bFloat = 0;
	aFloat = 0;
	changesArePossible = false;

	static Black = new YuColor(0, 0, 0);
	static ErrorColor = new YuColor(252, 15, 192);
	constructor(r: number | string, g?: number, b?: number, a?: number) {
		if (typeof r === "string") {
			const tmp = YuColor.FromCSS(r);
			this._r = tmp.r;
			this._g = tmp.g;
			this._b = tmp.b;
			this._a = 1;
		}
		else {
			if (r) this._r = r;
			if (g) this._g = g;
			if (b) this._b = b;
			if (a) this._a = a;
		}
		this.numToHex = this.numToHex.bind(this);
		this.Update = this.Update.bind(this);
		this.UpdateFloat = this.UpdateFloat.bind(this);
		this.Clone = this.Clone.bind(this);
		this.Lerp = this.Lerp.bind(this);
		this.ToCss = this.ToCss.bind(this);

		this.UpdateFloat();
	}

	private numToHex(num: number): string {
		const str = num.toString(16)
		return str.length > 1 ? str : "0" + str;
	}

	UpdateFloat() {
		this.rFloat = this.r / 255;
		this.gFloat = this.g / 255;
		this.bFloat = this.b / 255;
		this.aFloat = this.a / 255;
	}

	Update(color: YuColor) {
		this._r = color.r;
		this._g = color.g;
		this._b = color.b;
		this._a = color.a;
		this.UpdateFloat();
	}

	public Equal(col: YuColor): boolean {
		return this._r === col.r
			&& this._g === col.g
			&& this._b === col.b
			&& this._a === col.a;
	}
	Clone(): YuColor {
		return new YuColor(this.r, this.g, this.b, this.a);
	}

	Lerp(color: YuColor, t: number): YuColor {
		const col = new YuColor(
			Math.round(YuMath.Lerp(this.r, color.r, t)),
			Math.round(YuMath.Lerp(this.g, color.g, t)),
			Math.round(YuMath.Lerp(this.b, color.b, t))
		);
		return col;
	}

	ToCss(): string {
		return "#" +
			this.numToHex(this.r) +
			this.numToHex(this.g) +
			this.numToHex(this.b);
	}

	static FromCSS(str: string): YuColor {
		const r = parseInt(str.substring(1, 3), 16);
		const g = parseInt(str.substring(3, 5), 16);
		const b = parseInt(str.substring(5, 7), 16);
		return new YuColor(r, g, b);
	}

	static LerpColor(a: YuColor, b: YuColor, t: number): YuColor {
		const color = new YuColor(
			Math.round(YuMath.Lerp(a.r, b.r, t)),
			Math.round(YuMath.Lerp(a.g, b.g, t)),
			Math.round(YuMath.Lerp(a.b, b.b, t))
		);
		return color;
	}
	static getRandomInt(max: number): number {
		return Math.floor(Math.random() * Math.floor(max));
	}
	static Random(): YuColor {
		return new YuColor(YuColor.getRandomInt(255), YuColor.getRandomInt(255), YuColor.getRandomInt(255));
	}
}