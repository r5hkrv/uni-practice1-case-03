type TrimPrefix<
	Value extends string,
	Prefix extends string
> = Value extends `${Prefix}${infer Suffix}` ? Suffix : never;

type CapitalizeFn = <T extends string>(value: T) => Capitalize<T>;

export const capitalize: CapitalizeFn = (value) => {
	if (value === "") return "" as any;

	if (value.length === 1) return value.toUpperCase() as any;

	return (value.charAt(0).toUpperCase() + value.slice(1)) as any;
};

type LabelFromPathFn = <Value extends string, Prefix extends string>(
	path: `/${Value}`,
	prefix: Prefix
) => `${Capitalize<Prefix>} ${TrimPrefix<Value, Prefix>}`;

export const labelFromPath: LabelFromPathFn = (path, prefix) => {
	const slashOmitted = path.substring(1);
	const suffix = slashOmitted.replace(prefix, "");
	const prefixCapital = capitalize(prefix);

	return (prefixCapital + " " + suffix) as any;
};
