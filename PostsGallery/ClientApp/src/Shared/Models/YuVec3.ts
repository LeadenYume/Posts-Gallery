import { Vector3 } from 'three';
import { YuVec2 } from './YuVec2';

export class YuVec3 {
  public x = 0;
  public y = 0;
  public z = 0;

  constructor(x?: number | Vector3, y?: number, z?: number) {
    if (typeof x === 'number') {
      if (x !== undefined && y === undefined && z === undefined) {
        this.x = x;
        this.y = x;
        this.z = x;
      }
      if (x !== undefined && y !== undefined && z === undefined) {
        this.x = x;
        this.y = y;
        this.z = 0;
      }
      if (x !== undefined && y !== undefined && z !== undefined) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    } else {
      if (x) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
      }
    }
  }

  //Casts
  public ToTHREEVec(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public ToVec2(): YuVec2 {
    return new YuVec2(this.x, this.y);
  }

  public Clone(): YuVec3 {
    return new YuVec3(this.x, this.y, this.z);
  }

  public Equal(vec: YuVec3): boolean {
    return this.x === vec.x && this.y === vec.y && this.x === vec.x && this.z === vec.z;  
  }

  //Update
  public move(x: number, y: number, z?: number) {
    this.x += x;
    this.y += y;
    this.z += z ? z : 0;
    return this;
  }

  //Scalar
  public power(): number {
    return Math.sqrt((this.x) * (this.x) + (this.y) * (this.y));
  }

  public dist(vec: YuVec3): number {
    return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z));
  }

  public sum(vec: YuVec3): YuVec3 {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
    return this;
  }


  //Irreversible
  public sub(vec: YuVec3): YuVec3 {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
    return this;
  }

  public multVec(vec: YuVec3): YuVec3 {
    this.x *= vec.x;
    this.y *= vec.y;
    this.z *= vec.z;
    return this;
  }

  public mult(num: number): YuVec3 {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
  }

  public sumXYZ(): number {
    return this.x + this.y + this.z;
  }

  public normal(): YuVec3 {
    const power = this.power();
    return this.mult(1 / power);
  }


  public static clone(vector: YuVec3) {
    return new YuVec3(vector.x, vector.y, vector.z);
  }
  //Statics
  public static power(vector: YuVec3): number {
    return Math.sqrt((vector.x) * (vector.x) + (vector.y) * (vector.y) + (vector.z) * (vector.z));
  }

  public static dist(p1: YuVec3, p2: YuVec3): number {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
  }

  public static sum(p1: YuVec3, p2: YuVec3): YuVec3 {
    return new YuVec3(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
  }

  public static sub(p1: YuVec3, p2: YuVec3): YuVec3 {
    return new YuVec3(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
  }

  public static mult(p1: YuVec3, num: number): YuVec3 {
    return new YuVec3(p1.x * num, p1.y * num, p1.z * num);
  }

  public static multVec(p1: YuVec3, p2: YuVec3): YuVec3 {
    return new YuVec3(p1.x * p2.x, p1.y * p2.y, p1.z * p2.z);
  }

  public static normal(vector: YuVec3): YuVec3 {
    const power = this.power(vector);
    return this.mult(vector, 1 / power);
  }
}

