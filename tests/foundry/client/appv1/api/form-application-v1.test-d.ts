import { assertType, expectTypeOf } from "vitest";
import type { GetDataReturnType, MaybePromise } from "fvtt-types/utils";

import FormApplication = foundry.appv1.api.FormApplication;
import Application = foundry.appv1.api.Application;

declare const formApplication: FormApplication<Actor.Implementation, FormApplication.Options>;

expectTypeOf(formApplication.object).toEqualTypeOf<Actor.Implementation>();
expectTypeOf(FormApplication.defaultOptions).toEqualTypeOf<FormApplication.Options>();
expectTypeOf(formApplication.options).toEqualTypeOf<FormApplication.Options>();
expectTypeOf(formApplication.getData()).toEqualTypeOf<
  MaybePromise<GetDataReturnType<FormApplication.FormApplicationData<FormApplication.Options, Actor.Implementation>>>
>();
expectTypeOf(formApplication.render(true)).toEqualTypeOf<
  FormApplication<Actor.Implementation, FormApplication.Options>
>();

expectTypeOf(formApplication.form).toEqualTypeOf<HTMLElement | null>();
expectTypeOf(formApplication.editors).toEqualTypeOf<Record<string, FormApplication.FormApplicationEditor>>();

const app = new (class extends FormApplication<{ foo: string }, FormApplication.Options> {
  protected _updateObject(): Promise<unknown> {
    return Promise.resolve(undefined);
  }
})({ foo: "bar" });

assertType<Application>(app);
expectTypeOf(app.isEditable).toEqualTypeOf<boolean>();
expectTypeOf(app.object).toEqualTypeOf<{ foo: string }>();
