export {};

declare global {
  namespace AbstractBaseShader {
    type Coordinates =
      | { x: number; y: number }
      | { x: number; y: number; z: number }
      | { x: number; y: number; z: number; w: number };
    type UniformValue = boolean | number | Int32List | Float32List | Coordinates | Coordinates[] | PIXI.Texture;

    type Uniforms = Record<string, AbstractBaseShader.UniformValue>;

    type FragmentShader = string | ((...args: never[]) => string);
  }

  /**
   * This class defines an interface which all shaders utilize
   */
  abstract class AbstractBaseShader extends BaseShaderMixin(PIXI.Shader) {
    constructor(program: PIXI.Program, uniforms: AbstractBaseShader.Uniforms);

    /**
     * The raw vertex shader used by this class.
     * A subclass of AbstractBaseShader must implement the vertexShader static field.
     * @defaultValue `""`
     *
     * @remarks This is abstract, subclasses must implement it.
     */
    static vertexShader: string;

    /**
     * The raw fragment shader used by this class.
     * A subclass of AbstractBaseShader must implement the fragmentShader static field.
     * @remarks This is abstract, subclasses must implement it.
     */
    static fragmentShader: AbstractBaseShader.FragmentShader;

    /**
     * The default uniform values for the shader.
     * A subclass of AbstractBaseShader must implement the defaultUniforms static field.
     * @defaultValue `{}`
     *
     * @remarks This is abstract, subclasses must implement it.
     */
    static defaultUniforms: AbstractBaseShader.Uniforms;

    /**
     * A factory method for creating the shader using its defined default values
     */
    static create(initialUniforms?: AbstractBaseShader.Uniforms): AbstractBaseShader;

    /**
     * Reset the shader uniforms back to their initial values.
     */
    protected reset(): void;

    /**
     * A one time initialization performed on creation.
     * @remarks Does nothing without subclass implementation.
     */
    protected _configure(): void;

    /**
     * Perform operations which are required before binding the Shader to the Renderer.
     * @param mesh - The mesh display object linked to this shader.
     * @param renderer - The renderer
     */
    protected _preRender(mesh: PIXI.DisplayObject, renderer: PIXI.Renderer): void;

    /**
     * The initial default values of shader uniforms
     * @deprecated since v12, until v14
     * @remarks AbstractBaseShader#_defaults is deprecated in favor of AbstractBaseShader#initialUniforms.
     */
    protected get _defaults(): AbstractBaseShader.Uniforms;
  }
}
