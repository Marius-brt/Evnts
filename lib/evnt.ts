import {EvntOptions} from "@/index";

export default class Evnt<T> {
    private value: T;
    private readonly name: string;
    private readonly options: EvntOptions<T>;
    private readonly defaultVal: T;
    private debounceTimeout?: number;

    constructor(name: string, value: T, options?: EvntOptions<T>) {
        this.name = name;
        this.options = options || {};
        this.defaultVal = value;
        this.value = (options?.persist && this.exists()) ? this.load() : value;
    }

    private exists(): boolean {
        const storage = this.options.storage || localStorage
        return storage.getItem(this.options.storageKey || "evnts-" + this.name) !== null
    }

    private load(): T {
        try {
            const storage = this.options.storage || localStorage
            if (this.options.onLoad) return this.options.onLoad(storage.getItem(this.options.storageKey || "evnts-" + this.name) as string)
            return JSON.parse(storage.getItem(this.options.storageKey || "evnts-" + this.name) as string) as T
        } catch (e) {
            console.error(e)
            if (this.options.setDefaultIfFailedLoading)
                return this.defaultVal
            throw new Error("Failed to load value of evnt " + this.name + " from storage")
        }
    }

    private debounce() {
        if (this.options.debounce && this.options.debounce > 0) {
            if (this.debounceTimeout) clearTimeout(this.debounceTimeout)
            this.debounceTimeout = setTimeout(() => {
                this.save()
            }, this.options.debounce)
        } else {
            this.save()
        }
    }

    private save() {
        const storage = this.options.storage || localStorage
        if (this.options.onSave) storage.setItem(this.options.storageKey || "evnts-" + this.name, this.options.onSave(this.value))
        else storage.setItem(this.options.storageKey || "evnts-" + this.name, JSON.stringify(this.value))
    }

    public onChange(callback: (value: T, prev: T) => void) {
        const listener = (e: CustomEvent) => {
            callback(e.detail.newValue, e.detail.oldValue)
        }
        document.addEventListener(this.name, listener as EventListener)
        return () => document.removeEventListener(this.name, listener as EventListener)
    }

    public setValue(value?: T) {
        document.dispatchEvent(new CustomEvent(this.name, {
            detail: {newValue: value, oldValue: this.value}
        }));
        if (value !== undefined) {
            this.value = value
            if (this.options.persist)
                this.debounce()
        }
    }

    public getValue() {
        return this.value
    }

    public clear() {
        const storage = this.options.storage || localStorage
        storage.removeItem(this.options.storageKey || "evnts-" + this.name)
    }

    public reset() {
        this.value = this.defaultVal
        this.save()
    }
}