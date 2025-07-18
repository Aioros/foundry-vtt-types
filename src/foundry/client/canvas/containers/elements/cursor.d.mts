import type { Identity } from "#utils";

/**
 * A single Mouse Cursor
 */
declare class Cursor extends PIXI.Container {
  constructor(user: User.Implementation);

  /**
   * @defaultValue `{x: 0, y: 0}`
   */
  target: PIXI.IPointData;

  /**
   * Update visibility and animations
   * @param user - The user
   */
  refreshVisibility(user: User.Implementation): void;

  /**
   * Draw the user's cursor as a small dot with their user name attached as text
   */
  draw(user: User.Implementation): void;

  /**
   * Move an existing cursor to a new position smoothly along the animation loop
   */
  protected _animate(): void;

  override destroy(options?: PIXI.IDestroyOptions | boolean): void;
}

declare namespace Cursor {
  interface Any extends AnyCursor {}
  interface AnyConstructor extends Identity<typeof AnyCursor> {}
}

export default Cursor;

declare abstract class AnyCursor extends Cursor {
  constructor(...args: never);
}
