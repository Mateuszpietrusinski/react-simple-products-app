import {IStoragePort} from "../IStoragePort.ts";

export default class LocalStorageAdapter implements IStoragePort {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}