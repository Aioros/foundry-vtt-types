import { expectTypeOf } from "vitest";
import { TokenRingConfig, TokenRing, DynamicRingData } from "#client/canvas/placeables/tokens/_module.mjs";
import type { PrimaryBaseSamplerShader } from "#client/canvas/rendering/shaders/_module.mjs";

import TokenRingSamplerShader = foundry.canvas.rendering.shaders.TokenRingSamplerShader;

expectTypeOf(TokenRingConfig.CORE_TOKEN_RINGS).toEqualTypeOf<TokenRingConfig.MaybeCoreRings>;

expectTypeOf(TokenRingConfig.CORE_TOKEN_RINGS_FIT_MODES).toEqualTypeOf<TokenRingConfig.CoreTokenRingsFitModes>();
expectTypeOf(TokenRingConfig.initialize()).toBeVoid();
expectTypeOf(TokenRingConfig.registerSettings()).toBeVoid();

const myTRC = new TokenRingConfig();

expectTypeOf(myTRC.subjectPaths).toEqualTypeOf<Record<string, string>>();
expectTypeOf(myTRC.debugColorBands).toBeBoolean();

expectTypeOf(myTRC.ringClass).toEqualTypeOf<typeof TokenRing>();
declare class MyTokenRing extends TokenRing {
  #differentClass: true;
}
expectTypeOf((myTRC.ringClass = MyTokenRing)).toEqualTypeOf<typeof MyTokenRing>();

expectTypeOf(myTRC.effects).toEqualTypeOf<Record<string, string>>();
expectTypeOf(myTRC.spritesheet).toEqualTypeOf<string | null>();

expectTypeOf(myTRC.shaderClass).toEqualTypeOf<PrimaryBaseSamplerShader.AnyConstructor>();
myTRC.shaderClass = TokenRingSamplerShader;

expectTypeOf(myTRC.label).toEqualTypeOf<string | undefined>();
expectTypeOf(myTRC.id).toEqualTypeOf<string | undefined>();
expectTypeOf(myTRC.isGridFitMode).toBeBoolean();

declare const someConfig: DynamicRingData;
expectTypeOf(myTRC.addConfig("someConfig", someConfig)).toBeVoid();
expectTypeOf(myTRC.getConfig("someConfig")).toEqualTypeOf<DynamicRingData>();
expectTypeOf(myTRC.useConfig("someConfig")).toBeBoolean();

expectTypeOf(myTRC.configIDs).toEqualTypeOf<string[]>();
expectTypeOf(myTRC.configLabels).toEqualTypeOf<Record<string, string>>();

// deprecated since v12, until v14
// eslint-disable-next-line @typescript-eslint/no-deprecated
expectTypeOf(myTRC.configNames).toEqualTypeOf<string[]>();
