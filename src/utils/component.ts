import { RouteProps } from 'react-router-dom';

/**
 * Base props for pages defined.
 */

export type BasePageProps = RouteProps;

export function mapModifiers(baseClassName: string, ...modifiers: (string | string[] | false | undefined)[]): string {
	return modifiers
		.reduce<string[]>((acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]), [])
		.map(m => `-${m}`)
		.reduce<string>((classNames, suffix) => `${classNames} ${baseClassName}${suffix}`, baseClassName);
}
