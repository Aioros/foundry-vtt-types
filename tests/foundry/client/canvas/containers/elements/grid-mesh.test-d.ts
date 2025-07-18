import { expectTypeOf } from "vitest";
import { GridMesh } from "#client/canvas/containers/_module.mjs";

import GridShader = foundry.canvas.rendering.shaders.GridShader;

const myGridMesh = new GridMesh(GridShader);

expectTypeOf(myGridMesh.data.type).toExtend<CONST.GRID_TYPES>();

const myGridMeshData = {
  type: CONST.GRID_TYPES.HEXEVENQ,
  width: 100,
  height: 100,
  size: 128,
  thickness: undefined,
  alpha: 0.72,
};

expectTypeOf(myGridMesh.initialize(myGridMeshData)).toEqualTypeOf<typeof myGridMesh>();
expectTypeOf(myGridMesh["_initialize"](myGridMeshData)).toBeVoid();
