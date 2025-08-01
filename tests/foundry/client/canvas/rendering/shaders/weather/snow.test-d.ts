import { expectTypeOf } from "vitest";
import { AbstractBaseShader, SnowShader } from "#client/canvas/rendering/shaders/_module.mjs";

const SS = SnowShader;
let mySS;

expectTypeOf(SS.fragmentShader).toEqualTypeOf<string>();
expectTypeOf(SS.createProgram()).toEqualTypeOf<PIXI.Program>();
expectTypeOf((mySS = SS.create())).toEqualTypeOf<SnowShader>();

expectTypeOf(mySS.speed).toEqualTypeOf<number>();
expectTypeOf(mySS["_preRender"]).toEqualTypeOf<AbstractBaseShader.PreRenderFunction>();

// dynamic properties from `SnowShader.DefaultOptions`
expectTypeOf(mySS.direction).toBeNumber();
