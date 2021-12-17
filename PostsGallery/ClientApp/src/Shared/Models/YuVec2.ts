import { Vector2 } from 'three';
import { YuVec3 } from './YuVec3';

export class YuVec2 {
  public x = 0;
  public y = 0;

  constructor(x?: number | Vector2, y?: number) {
    if (typeof x === 'number') {
      if (x !== undefined && y === undefined) {
        this.x = x;
        this.y = x;
      }
      if (x !== undefined && y !== undefined) {
        this.x = x;
        this.y = y;
      }
    } else {
      if (x !== undefined) {
        this.x = x.x;
        this.y = x.y;
      }
    }
  }

  //Casts
  public ToTHREEVec(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public ToVec3(z?: number): YuVec3 {
    if (z)
      return new YuVec3(this.x, this.y, z);
    else
      return new YuVec3(this.x, this.y);
  }

  public copy(): YuVec2 {
    return new YuVec2(this.x, this.y);
  }


  //Scalar
  public power(): number {
    return Math.sqrt((this.x) * (this.x) + (this.y) * (this.y));
  }

  public dist(vec: YuVec2): number {
    return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y));
  }

  public sum(vec: YuVec2): YuVec2 {
    this.x += vec.x;
    this.y += vec.y
    return this;
  }


  //Irreversible
  public sub(vec: YuVec2): YuVec2 {
    this.x -= vec.x;
    this.y -= vec.y
    return this;
  }

  public mult(num: number): YuVec2 {
    this.x *= num;
    this.y *= num;
    return this;
  }

  public normal(): YuVec2 {
    const power = this.power();
    return this.mult(1 / power);
  }


  //Statics
  public static copy(vec: YuVec2): YuVec2 {
    return new YuVec2(vec.x, vec.y);
  }

  public static power(vector: YuVec2): number {
    return Math.sqrt((vector.x) * (vector.x) + (vector.y) * (vector.y));
  }

  public static dist(p1: YuVec2, p2: YuVec2): number {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
  }

  public static sum(p1: YuVec2, p2: YuVec2): YuVec2 {
    return new YuVec2(p1.x + p2.x, p1.y + p2.y);
  }

  public static sub(p1: YuVec2, p2: YuVec2): YuVec2 {
    return new YuVec2(p1.x - p2.x, p1.y - p2.y);
  }

  public static mult(p1: YuVec2, num: number): YuVec2 {
    return new YuVec2(p1.x * num, p1.y * num);
  }

  public static normal(vector: YuVec2): YuVec2 {
    const power = this.power(vector);
    return this.mult(vector, 1 / power);
  }

  public static Average(vecs: YuVec2[]) {
    let X = 0;
    let Y = 0;
    vecs.forEach(vec => {
      X += vec.x;
      Y += vec.y;
    });
    return new YuVec2(X / vecs.length, Y / vecs.length);
  }
}

