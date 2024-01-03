import ToggleEvnt from "@/components/toggleEvnt";
import Evnts from "@/evnt";
import useBoolEvnt from "@/hooks/useBoolEvnt";
import useEvnt from "@/hooks/useEvnt";

export type EvntOptions<T> = {
    persist?: boolean,
    onSave?: (value: T) => string,
    onLoad?: (value: string) => T,
    storage?: Storage,
    storageKey?: string,
    setDefaultIfFailedLoading?: boolean,
}

const defaultOptions: EvntOptions<any> = {
    setDefaultIfFailedLoading: true,
}

export function createEvnt<T>(eventName: string, value: T, options?: EvntOptions<T>) {
    return new Evnts<T>(eventName, value, {...defaultOptions, ...options})
}

export {useEvnt, useBoolEvnt, ToggleEvnt}