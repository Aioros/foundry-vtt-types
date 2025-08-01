import type { InexactPartial } from "#utils";

/**
 * A class responsible for recording information about a validation failure.
 */
declare class DataModelValidationFailure {
  constructor(options?: DataModelValidationFailure.ConstructorOptions);

  /**
   * The value that failed validation for this field.
   */
  invalidValue: unknown;

  /**
   * The value it was replaced by, if any.
   */
  fallback: unknown;

  /**
   * Whether the value was dropped from some parent collection.
   * @defaultValue `false`
   */
  dropped: boolean;

  /**
   * The validation error message.
   */
  message: string | undefined;

  /**
   * If this field contains other fields that are validated as part of its validation, their results are recorded here.
   * @defaultValue `{}`
   */
  fields: Record<string, DataModelValidationFailure>;

  /**
   * If this field contains a list of elements that are validated as part of its validation, their results are recorded here.
   * @defaultValue `{}`
   */
  elements: DataModelValidationFailure.ElementValidationFailure[];

  /**
   * Record whether a validation failure is unresolved.
   * This reports as true if validation for this field or any hierarchically contained field is unresolved.
   * A failure is unresolved if the value was invalid and there was no valid fallback value available.
   * @defaultValue `false`
   */
  unresolved: boolean;

  /**
   * Return this validation failure as an Error object.
   */
  asError(): DataModelValidationError;

  /**
   * Whether this failure contains other sub-failures.
   */
  isEmpty(): boolean;

  /**
   * Return the base properties of this failure, omitting any nested failures.
   */
  toObject(): DataModelValidationFailure.ToObjectReturn;

  /**
   * Represent the DataModelValidationFailure as a string.
   */
  toString(): string;

  static #DataModelValidationFailure: true;
}

/**
 * A specialised Error to indicate a model validation failure.
 */
declare class DataModelValidationError extends Error {
  /**
   * @param failure - The failure that triggered this error or an error message
   * @param params  - Additional Error constructor parameters
   */
  constructor(failure: DataModelValidationFailure | string, options?: ErrorOptions);

  /**
   * Retrieve the root failure that caused this error, or a specific sub-failure via a path.
   * @param path - The property path to the failure.
   *
   * @example Retrieving a failure.
   * ```js
   * const changes = {
   *   "foo.bar": "validValue",
   *   "foo.baz": "invalidValue"
   * };
   * try {
   *   doc.validate(expandObject(changes));
   * } catch ( err ) {
   *   const failure = err.getFailure("foo.baz");
   *   console.log(failure.invalidValue); // "invalidValue"
   * }
   * ```
   */
  getFailure(path?: string): DataModelValidationFailure | void;

  /**
   * Retrieve a flattened object of all the properties that failed validation as part of this error.
   *
   * @example Removing invalid changes from an update delta.
   * ```js
   * const changes = {
   *   "foo.bar": "validValue",
   *   "foo.baz": "invalidValue"
   * };
   * try {
   *   doc.validate(expandObject(changes));
   * } catch ( err ) {
   *   const failures = err.getAllFailures();
   *   if ( failures ) {
   *     for ( const prop in failures ) delete changes[prop];
   *     doc.validate(expandObject(changes));
   *   }
   * }
   * ```
   */
  getAllFailures(): Record<string, DataModelValidationFailure> | void;

  /**
   * Log the validation error as a table.
   */
  logAsTable(): void;

  /**
   * Generate a nested tree view of the error as an HTML string.
   */
  asHTML(): string;

  #DataModelValidationError: true;
}

declare namespace DataModelValidationFailure {
  /** @internal */
  type _ConstructorOptions = InexactPartial<{
    /** The value that failed validation for this field. */
    invalidValue: unknown;

    /**  The value it was replaced by, if any. */
    fallback: unknown;

    /**
     * Whether the value was dropped from some parent collection.
     * @defaultValue `false`
     */
    dropped: boolean;

    /** The validation error message. */
    message: string;

    /**
     * Whether this failure was unresolved
     * @defaultValue `false`
     */
    unresolved: boolean;
  }>;

  interface ConstructorOptions extends _ConstructorOptions {}

  /** @internal */
  type _ElementValidationFailure = InexactPartial<{
    /** Optionally a user-friendly name for the element. */
    name?: string;
  }>;

  interface ElementValidationFailure extends _ElementValidationFailure {
    /** Either the element's index or some other identifier for it. */
    id: string | number;

    /** The element's validation failure. */
    failure: DataModelValidationFailure;
  }

  /**
   * @remarks {@linkcode DataModelValidationFailure.toObject | DataModelValidationFailure#toObject} returns
   * its instance's properties of the same names
   */
  interface ToObjectReturn
    extends Pick<DataModelValidationFailure, "invalidValue" | "fallback" | "dropped" | "message"> {}
}

export { DataModelValidationFailure, DataModelValidationError };
