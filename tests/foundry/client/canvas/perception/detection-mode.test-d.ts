import { expectTypeOf } from "vitest";
import { DetectionMode } from "#client/canvas/perception/_module.mjs";
import type { Token } from "#client/canvas/placeables/_module.d.mts";

expectTypeOf(DetectionMode.getDetectionFilter()).toEqualTypeOf<PIXI.Filter | undefined>();
expectTypeOf(DetectionMode.DETECTION_TYPES).toExtend<
  Record<keyof DetectionMode.DetectionTypes, DetectionMode.DETECTION_TYPES>
>();
expectTypeOf(DetectionMode.BASIC_MODE_ID).toEqualTypeOf<"basicSight">();

const source = {
  id: "foo",
  label: "bar",
  type: DetectionMode.DETECTION_TYPES.OTHER,
  angle: false,
  walls: true,
  tokenConfig: false,
};
const myDetectionMode = new DetectionMode(source);

declare const someVisionSource: foundry.canvas.sources.PointVisionSource;
declare const someToken: Token.Implementation;

const someCanvasVisibilityTest = {
  elevation: 20,
  los: new Map([[someVisionSource, true]]),
  point: { x: 50, y: 50 },
};

expectTypeOf(
  myDetectionMode.testVisibility(
    someVisionSource,
    { id: "foobar", enabled: true, range: 3 },
    { object: someToken, tests: [someCanvasVisibilityTest] },
  ),
).toEqualTypeOf<boolean>();

expectTypeOf(myDetectionMode.id).toEqualTypeOf<string | undefined>();
expectTypeOf(myDetectionMode.label).toEqualTypeOf<string | undefined>();
expectTypeOf(myDetectionMode.tokenConfig).toEqualTypeOf<boolean>();
expectTypeOf(myDetectionMode.walls).toEqualTypeOf<boolean>();
expectTypeOf(myDetectionMode.angle).toEqualTypeOf<boolean>();

// @ts-expect-error For two reasons: first, this currently wants `| undefined` when it shouldn't (the field is `required: false`, but has an `initial`),
// and second, it isn't not accepting the Branded number type
expectTypeOf(myDetectionMode.type).toEqualTypeOf<DetectionMode.DETECTION_TYPES | null>();

const someTokenDetectionMode = {
  enabled: true,
  id: "baz",
  range: 600,
};
expectTypeOf(myDetectionMode["_canDetect"](someVisionSource, someToken)).toEqualTypeOf<boolean>();
expectTypeOf(
  myDetectionMode["_testPoint"](someVisionSource, someTokenDetectionMode, someToken, someCanvasVisibilityTest),
).toEqualTypeOf<boolean>();
expectTypeOf(
  myDetectionMode["_testLOS"](someVisionSource, someTokenDetectionMode, someToken, someCanvasVisibilityTest),
).toEqualTypeOf<boolean>();
expectTypeOf(
  myDetectionMode["_testAngle"](someVisionSource, someTokenDetectionMode, someToken, someCanvasVisibilityTest),
).toEqualTypeOf<boolean>();
expectTypeOf(
  myDetectionMode["_testRange"](someVisionSource, someTokenDetectionMode, someToken, someCanvasVisibilityTest),
).toEqualTypeOf<boolean>();
