import { expectTypeOf } from "vitest";
import { Edge, PolygonVertex } from "#client/canvas/geometry/edges/_module.mjs";

declare const somePV: PolygonVertex;
declare const someEdge: Edge;

const myCollisionResult = new foundry.canvas.geometry.edges.CollisionResult({
  target: somePV,
  isBehind: false,
  wasLimited: true,
  isLimited: false,
  cwEdges: new Set([someEdge]),
});

expectTypeOf(myCollisionResult.target).toEqualTypeOf<PolygonVertex>();
expectTypeOf(myCollisionResult.collisions).toEqualTypeOf<PolygonVertex[]>();
expectTypeOf(myCollisionResult.cwEdges).toEqualTypeOf<Set<Edge> | undefined>();
expectTypeOf(myCollisionResult.isBehind).toEqualTypeOf<boolean | undefined>();
expectTypeOf(myCollisionResult.isLimited).toEqualTypeOf<boolean | undefined>();
expectTypeOf(myCollisionResult.wasLimited).toEqualTypeOf<boolean | undefined>();
expectTypeOf(myCollisionResult.limitedCW).toEqualTypeOf<boolean>();
expectTypeOf(myCollisionResult.limitedCCW).toEqualTypeOf<boolean>();
expectTypeOf(myCollisionResult.blockedCW).toEqualTypeOf<boolean>();
expectTypeOf(myCollisionResult.blockedCCW).toEqualTypeOf<boolean>();
expectTypeOf(myCollisionResult.blockedCWPrev).toEqualTypeOf<boolean>();
expectTypeOf(myCollisionResult.blockedCCWPrev).toEqualTypeOf<boolean>();
