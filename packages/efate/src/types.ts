import Field from './field';

export type DefineFixtureFields<T, TFieldBuilder> = {
  extends: <J>(fixture: J) => void;
} & {
  [P in keyof T]: TFieldBuilder;
};

export type DefineFixture<T, TFieldBuilder> = (t: DefineFixtureFields<T, TFieldBuilder>) => void;

export type FixtureFieldBuilder<T> = (increment: number) => Field<keyof T>;

export type FixturesArrayBuilder<T> =
  | Partial<T>
  | Array<Partial<T>>
  | ((index: number, createFn: (overrides?: FixtureOverrider<T>) => T) => T);

export type FixtureOverrider<T> = Partial<T> | ((fixture: T) => void);

export type FixtureExtension = Record<string, (...args: never[]) => FixtureFieldBuilder<never>>;
