import type { FixedInstanceType, Mixin } from "#utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare class BaseShader {
  /** @privateRemarks All mixin classes should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * Useful constant values computed at compile time
   */
  static CONSTANTS: string;

  /**
   * Fast approximate perceived brightness computation
   * Using Digital ITU BT.709 : Exact luminance factors
   */
  static PERCEIVED_BRIGHTNESS: string;

  /**
   * Simplex 3D noise functions
   */
  static SIMPLEX_3D: string;

  /**
   * Conversion functions for sRGB and Linear RGB.
   */
  static COLOR_SPACES: string;

  /**
   * Fractional Brownian Motion for a given number of octaves
   * @param octaves - (default: `4`)
   * @param amp     - (default: `1.0`)
   */
  static FBM(octaves?: number, amp?: number): string;

  /**
   * High Quality Fractional Brownian Motion.
   * @param octaves       - Number of octaves (iteration). (default: `3`)
   * @param fbmFuncName   - Name of the fbm function. (default `"fbm"`)
   * @param noiseFuncName - Name of the noise function to use inside fbm (must return a `float`). (default: `"noise"`)
   * @param vecType       - The vec type the function accepts as a parameter. (default: `"vec2"`)
   * @returns The formed fbm function
   */
  static FBMHQ(octaves?: number, fbmFuncName?: string, noiseFuncName?: string, vecType?: string): string;

  /**
   * Angular constraint working with coordinates on the range [-1, 1]
   * =\> coord: Coordinates
   * =\> angle: Angle in radians
   * =\> smoothness: Smoothness of the pie
   * =\> l: Length of the pie.
   */
  static PIE: string;

  /**
   * A conventional pseudo-random number generator with the "golden" numbers, based on uv position
   */
  static PRNG_LEGACY: string;

  /**
   * A pseudo-random number generator based on uv position which does not use cos/sin
   * This PRNG replaces the old PRNG_LEGACY to workaround some driver bugs
   */
  static PRNG: string;

  /**
   * A Vec2 pseudo-random generator, based on uv position
   */
  static PRNG2D: string;

  /**
   * A Vec3 pseudo-random generator, based on uv position
   */
  static PRNG3D: string;

  /**
   * A conventional noise generator
   */
  static NOISE: string;

  /**
   * Convert a Hue-Saturation-Brightness color to RGB - useful to convert polar coordinates to RGB
   */
  static HSB2RGB: string;

  /**
   * Declare a wave function in a shader -\> wcos (default), wsin or wtan.
   * Wave on the [v1,v2] range with amplitude -\> a and speed -\> speed.
   * @param func - the math function to use (default: `"cos"`)
   */
  static WAVE(func?: BaseShaderMixin.WaveTrigFunction): string;

  /**
   * Rotation function.
   */
  static ROTATION: string;

  /**
   * Voronoi noise function. Needs PRNG2D and CONSTANTS.
   * @see {@linkcode PRNG2D}
   * @see {@linkcode CONSTANTS}
   */
  static VORONOI: string;

  /**
   * Enables GLSL 1.0 backwards compatibility in GLSL 3.00 ES vertex shaders.
   */
  static GLSL1_COMPATIBILITY_VERTEX: string;

  /**
   * Enables GLSL 1.0 backwards compatibility in GLSL 3.00 ES fragment shaders.
   */
  static GLSL1_COMPATIBILITY_FRAGMENT: string;
}

/**
 * A mixin which decorates a PIXI.Filter or PIXI.Shader with common properties.
 * @param ShaderClass - The parent ShaderClass class being mixed.
 */
declare function BaseShaderMixin<BaseClass extends BaseShaderMixin.BaseClass>(
  ShaderClass: BaseClass,
): Mixin<typeof BaseShader, BaseClass>;

declare namespace BaseShaderMixin {
  /** @privateRemarks `AnyMixed` can't extend `AnyMixedConstructor` if it's using the `BaseClass` union; `PIXI.Shader` is the parent of `Filter`, so it's used instead */
  interface AnyMixedConstructor extends ReturnType<typeof BaseShaderMixin<PIXI.Shader.AnyConstructor>> {}
  interface AnyMixed extends FixedInstanceType<AnyMixedConstructor> {}

  type BaseClass = PIXI.Shader.AnyConstructor | PIXI.Filter.AnyConstructor;

  type WaveTrigFunction = "cos" | "sin" | "tan";
}

export default BaseShaderMixin;
