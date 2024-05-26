import type { DocumentTypeWithTypeData } from "../../../types/helperTypes.d.mts";
import type { Merge } from "../../../types/utils.d.mts";
import type { DataField, ObjectField } from "../data/fields.d.mts";

/**
 * A special [ObjectField]{@link ObjectField} available to packages which configures any additional Document sub-types
 * provided by the package.
 */
declare class AdditionalTypesField<
  Options extends AdditionalTypesField.DefaultOptions = AdditionalTypesField.DefaultOptions,
> extends ObjectField<
  Options,
  AdditionalTypesField.ServerTypeDeclarations,
  AdditionalTypesField.ServerTypeDeclarations,
  AdditionalTypesField.ServerTypeDeclarations
> {
  static get _defaults(): AdditionalTypesField.DefaultOptions;

  protected _validateType(
    value: ObjectField.InitializedType<Options>,
    options?: DataField.ValidationOptions<DataField.Any> | undefined,
  ): boolean | void;
}

export default AdditionalTypesField;

declare namespace AdditionalTypesField {
  type DefaultOptions = Merge<
    ObjectField.DefaultOptions,
    {
      // Required is set as false BUT this doesn't work correctly in v11
      // TODO: Re-enable in v12
      // required: false;
      readonly: true;
      validationError: "is not a valid sub-types configuration";
    }
  >;

  type ServerTypeDeclarations = Record<DocumentTypeWithTypeData, Record<string, Record<string, unknown>>>;
}
