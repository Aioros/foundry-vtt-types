import { expectTypeOf } from "vitest";
import { EnvironmentCanvasGroup } from "#client/canvas/groups/_module.mjs";

import CanvasGroupMixin = foundry.canvas.groups.CanvasGroupMixin;

expectTypeOf(EnvironmentCanvasGroup.groupName).toEqualTypeOf<"environment">();
expectTypeOf(EnvironmentCanvasGroup.tearDownChildren).toEqualTypeOf<boolean>();

const myEnvironmentGroup = new EnvironmentCanvasGroup();
expectTypeOf(
  myEnvironmentGroup.initialize({
    backgroundColor: [0.2, 0.4, 0.8],
    brightestColor: "#FFFFFF",
    daylightColor: "AABBCC",
    fogExploredColor: null,
    fogUnexploredColor: undefined,
    environment: {
      // TODO: expand test once SceneEnvironmentData is properly typed (dependant on BaseScene schema)
    },
    darknessLevel: 5, // deprecated since v12 until v14
  }),
).toEqualTypeOf<void>();
expectTypeOf(myEnvironmentGroup.layers).toEqualTypeOf<CanvasGroupMixin.LayersFor<"environment">>();
expectTypeOf(
  myEnvironmentGroup.globalLightSource,
).toEqualTypeOf<foundry.canvas.sources.GlobalLightSource.Implementation>();
expectTypeOf(myEnvironmentGroup.darknessLevel).toEqualTypeOf<number>();
expectTypeOf(myEnvironmentGroup.colors.ambientBrightest).toEqualTypeOf<Color | undefined>();
expectTypeOf(myEnvironmentGroup.weights.bright).toEqualTypeOf<number | undefined>();

// deprecated since v12 until v14
// eslint-disable-next-line @typescript-eslint/no-deprecated
expectTypeOf(myEnvironmentGroup.darknessPenalty).toEqualTypeOf<0>();
