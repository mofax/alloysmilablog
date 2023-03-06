import { isObject } from "typechecked";

export function getProperty<S>(o: unknown, key: string) {
    const obj = isObject(o);
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    return descriptor?.value as S;
}
