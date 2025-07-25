import type { Brand, HandleEmptyObject, Identity } from "#utils";
import type { PrimaryCanvasGroupAmbienceFilter } from "#client/canvas/rendering/filters/_module.d.mts";
import type { CachedContainer, SpriteMesh } from "#client/canvas/containers/_module.d.mts";
import type { CanvasGroupMixin } from "#client/canvas/groups/_module.d.mts";
import type { CanvasQuadtree } from "#client/canvas/geometry/quad-tree.d.mts";
import type { Drawing, Tile, Token } from "#client/canvas/placeables/_module.d.mts";
import type {
  PrimaryCanvasObjectMixin,
  PrimaryGraphics,
  PrimarySpriteMesh,
} from "#client/canvas/primary/_module.d.mts";

declare module "#configuration" {
  namespace Hooks {
    interface CanvasGroupConfig {
      PrimaryCanvasGroup: PrimaryCanvasGroup.Any;
    }
  }
}

/**
 * The primary Canvas group which generally contains tangible physical objects which exist within the Scene.
 * This group is a {@linkcode CachedContainer} which is rendered to the Scene as a {@linkcode SpriteMesh}.
 * This allows the rendered result of the Primary Canvas Group to be affected by a {@linkcode BaseSamplerShader}.
 */
declare class PrimaryCanvasGroup<
  DrawOptions extends PrimaryCanvasGroup.DrawOptions = PrimaryCanvasGroup.DrawOptions,
  TearDownOptions extends PrimaryCanvasGroup.TearDownOptions = PrimaryCanvasGroup.TearDownOptions,
> extends CanvasGroupMixin<typeof CachedContainer, "primary">(CachedContainer)<DrawOptions, TearDownOptions> {
  /**
   * @param sprite - (default: `new SpriteMesh(undefined, BaseSamplerShader)`)
   */
  constructor(sprite?: SpriteMesh);

  /**
   * Sort order to break ties on the group/layer level.
   */
  static SORT_LAYERS: PrimaryCanvasGroup.Sort_Layers;

  /**
   * @defaultValue
   * ```js
   * {
   *   scaleMode: PIXI.SCALE_MODES.NEAREST,
   *   format: PIXI.FORMATS.RGB,
   *   multisample: PIXI.MSAA_QUALITY.NONE
   * }
   * ```
   */
  static override textureConfiguration: CachedContainer.TextureConfiguration;

  /**
   * @defaultValue `"none"`
   */
  override eventMode: PIXI.EventMode;

  /**
   * @defaultValue `[0, 0, 0, 0]`
   */
  override clearColor: Color.RGBAColorVector;

  /**
   * The background color in RGB.
   */
  _backgroundColor: Color.RGBColorVector | undefined;

  /**
   * Track the set of HTMLVideoElements which are currently playing as part of this group.
   */
  videoMeshes: Set<SpriteMesh>;

  /**
   * Occludable objects above this elevation are faded on hover.
   * @defaultValue `0`
   */
  hoverFadeElevation: number;

  /**
   * Allow API users to override the default elevation of the background layer.
   * This is a temporary solution until more formal support for scene levels is added in a future release.
   */
  static BACKGROUND_ELEVATION: number;

  /**
   * The primary background image configured for the Scene, rendered as a SpriteMesh.
   */
  background: SpriteMesh | undefined;

  /**
   * The primary foreground image configured for the Scene, rendered as a SpriteMesh.
   */
  foreground: SpriteMesh | undefined;

  /**
   * A Quadtree which partitions and organizes primary canvas objects.
   */
  quadtree: CanvasQuadtree<PrimaryCanvasObjectMixin.AnyMixed>;

  /**
   * The collection of PrimaryDrawingContainer objects which are rendered in the Scene.
   * @privateRemarks Foundry types this as `Collection<PrimaryDrawingContainer>`, which doesn't exist. It's `PrimaryGraphics` in practice.
   */
  drawings: Collection<PrimaryGraphics>;

  /**
   * The collection of SpriteMesh objects which are rendered in the Scene.
   * @privateRemarks Foundry types this as `Collection<TokenMesh>`, which doesn't exist. In practice it's `PrimarySpriteMesh`
   */
  tokens: Collection<PrimarySpriteMesh>;

  /**
   * The collection of SpriteMesh objects which are rendered in the Scene.
   * @privateRemarks Foundry types this as `Collection<PrimarySpriteMesh | TileSprite>`, but `TileSprite` doens't exist. In practice it's all `PrimarySpriteMesh`.
   */
  tiles: Collection<PrimarySpriteMesh>;

  /**
   * The ambience filter which is applying post-processing effects.
   */
  _ambienceFilter: PrimaryCanvasGroupAmbienceFilter | undefined;

  /**
   * Return the base HTML image or video element which provides the background texture.
   * @privateRemarks Foundry does not indicate the possibility of a null return
   */
  get backgroundSource(): HTMLImageElement | HTMLVideoElement | null;

  /**
   * Return the base HTML image or video element which provides the foreground texture.
   * @privateRemarks Foundry does not indicate the possibility of a null return
   */
  get foregroundSource(): HTMLImageElement | HTMLVideoElement | null;

  /**
   * Refresh the primary mesh.
   */
  refreshPrimarySpriteMesh(): void;

  /**
   * Update this group. Calculates the canvas transform and bounds of all its children and updates the quadtree.
   */
  update(): void;

  protected override _draw(options: HandleEmptyObject<DrawOptions>): Promise<void>;

  protected override _render(_renderer: PIXI.Renderer): void;

  protected override _tearDown(options: HandleEmptyObject<TearDownOptions>): Promise<void>;

  /**
   * Draw the SpriteMesh for a specific Token object.
   * @param token - The Token being added
   * @returns The added PrimarySpriteMesh
   */
  addToken(token: Token.Implementation): PrimarySpriteMesh;

  /**
   * Remove a TokenMesh from the group.
   * @param token - The Token being removed
   */
  removeToken(token: Token.Implementation): void;

  /**
   * Draw the SpriteMesh for a specific Token object.
   * @param tile - The Tile being added
   * @returns The added PrimarySpriteMesh
   */
  addTile(tile: Tile.Implementation): PrimarySpriteMesh;

  /**
   * Remove a TokenMesh from the group.
   * @param tile - The Tile being removed
   */
  removeTile(tile: Tile.Implementation): void;

  /**
   * Add a PrimaryGraphics to the group.
   * @param drawing - The Drawing being added
   * @returns The created PrimaryGraphics instance
   */
  addDrawing(drawing: Drawing.Implementation): PrimaryGraphics;

  /**
   * Remove a PrimaryGraphics from the group.
   * @param drawing - The Drawing being removed
   */
  removeDrawing(drawing: Drawing.Implementation): void;

  /**
   * Override the default PIXI.Container behavior for how objects in this container are sorted.
   * @remarks Actually an override of `PIXI.Container#sortChildren`
   */
  sortChildren(): void;

  /**
   * Handle mousemove events on the primary group to update the hovered state of its children.
   * @remarks Foundry marked `@internal`
   */
  _onMouseMove(): void;

  /**
   * @deprecated since v12, will be removed in v14
   * @remarks `"PrimaryCanvasGroup#mapElevationAlpha is deprecated. Use canvas.masks.depth.mapElevation(elevation) instead."`
   */
  mapElevationToDepth(elevation: number): number;

  /**
   * @deprecated since v11, will be removed in v13
   * @remarks "PrimaryCanvasGroup#mapElevationAlpha is deprecated in favor of PrimaryCanvasGroup#mapElevationToDepth"
   */
  mapElevationAlpha(elevation: number): number;
}

declare namespace PrimaryCanvasGroup {
  interface Any extends AnyPrimaryCanvasGroup {}
  interface AnyConstructor extends Identity<typeof AnyPrimaryCanvasGroup> {}

  interface DrawOptions extends CanvasGroupMixin.DrawOptions {}

  interface TearDownOptions extends CanvasGroupMixin.TearDownOptions {}

  type SORT_LAYERS = Brand<number, "PrimaryCanvasGroup.SORT_LAYERS">;

  interface Sort_Layers {
    readonly SCENE: 0 & SORT_LAYERS;
    readonly TILES: 500 & SORT_LAYERS;
    readonly DRAWINGS: 600 & SORT_LAYERS;
    readonly TOKENS: 700 & SORT_LAYERS;
    readonly WEATHER: 1000 & SORT_LAYERS;
  }
}

export default PrimaryCanvasGroup;

declare abstract class AnyPrimaryCanvasGroup extends PrimaryCanvasGroup {
  constructor(...args: never);
}
