import { print } from "../../app/util/output";

interface KVP<K, V> {
    key: K;
    value: V;
    deleted: boolean;
}

type Table<K, V> = KVP<K, V>[];

class HashTable<K, V> {
    private table: Table<K, V>  = [];
    private tableSize: number = 10;
    private count: number = 0;
    private primeNumber: number = 7;

    constructor(initSize: number = 10) {
        this._allocateTable(initSize);
    }

    private _allocateTable(size: number) {
        this.tableSize = size;
        this.table = [];
        this.count = 0;

        for (let r = 0; r < this.tableSize; r++) {
            this.table[r] = null;
        }

        this.primeNumber = this._calcClosestPrimeNumber(this.tableSize);
    }

    private _isPrime(n: number): boolean {
        if (n === 1) {
            return false;
        } else if (n === 2) {
            return true;
        } else {
            for(let x = 2; x < n; x++) {
                if (n % x === 0) {
                    return false;
                }
            }
            return true;
        }
    }

    private _calcClosestPrimeNumber(n: number): number {
        let test = n;

        while (!this._isPrime(test)) {
            test--;
        }

        return test;
    };

    private _getHash(text: string): number {
        let hash = 0;

        if (text.length === 0) {
            return hash;
        }

        for (let i = 0; i < text.length; i++) {
            const chr = text.charCodeAt(i);
            hash  = (hash * 256 + chr) % this.primeNumber;
        }

        return hash;
    }

    private _getHash1(text: string): number {
        return this._getHash(text) % this.tableSize;
    }

    private _getHash2(text: string): number {
        return this.primeNumber - (this._getHash(text) % this.primeNumber);
    }

    private _getDoubleHash(
        h1: number,
        h2: number,
        probe: number,
    ): number {
        return (h1 + probe * h2) % this.tableSize;
    }

    private _atMaxThreshold() {
        return (this.count >= (this.tableSize / 2));
    }

    private _atMinThreshold() {
        return (this.count < (this.tableSize / 4));
    }

    private _compact(): Table<K, V> {
        const result: Table<K, V> = [];

        this.table.forEach((item: KVP<K, V>) => {
            if (item && !item.deleted) {
                result.push(item);
            }
        });

        return result;
    }

    _doubleTable(split?: boolean) {
        const newSize = (split) ? this.tableSize / 2 : this.tableSize * 2;
        const items = this._compact();
        this._allocateTable(newSize);

        items.forEach(({ key, value }) => {
            this._insert(key, value, false);
        });
    }

    private _insert(
        key: K,
        value: V,
        isDeleted: boolean,
    ): void {
        const h1 = this._getHash1(String(key));

        let slot = h1;
        let probe = 1;

        while (
            this.table[slot] &&
            !this.table[slot].deleted &&
            !(this.table[slot].key === key)) {
            const h2 = this._getHash2(String(key));
            slot = this._getDoubleHash(h1, h2, probe++);
        }

        const entry: KVP<K, V> = {
            key,
            value,
            deleted: isDeleted,
        }

        if (isDeleted) {
            this.count--;
        } else {
            this.count++;
        }

        this.table[slot] = entry;
    }

    public insert(
        key: K,
        value: V,
    ): HashTable<K, V> {
        this._insert(key, value, false);

        if (this._atMaxThreshold()) {
            this._doubleTable();
        }

        return this;
    }

    public insertAll(list: any[]): HashTable<K, V> {
        list.forEach((pair: any[]) => {
            const [ k, v ] = pair;
            this.insert(k, v);
        });

        return this;
    }

    public remove(key: K): HashTable<K, V> {
        this._insert(key, null, true);

        if (this._atMinThreshold()) {
            this._doubleTable(true);
        }

        return this;
    }

    public value(key: string): V | null {
        const h1 = this._getHash1(key);

        let slot = h1;
        let probe = 1;

        while (
            this.table[slot] &&
            !this.table[slot].deleted &&
            String(this.table[slot].key) !== String(key)) {
            const h2 = this._getHash2(key);
            slot = this._getDoubleHash(h1, h2, probe++);
        }

        return (this.table[slot]) ? this.table[slot].value : null;
    }

    public values(): V[] {
        return this._compact().map((item) => item.value);
    }

    public keys(): K[] {
        return this._compact().map((item) => item.key);
    }

    public size() {
        return this.count;
    }

    public printTable(): string {
        const text: string[] = [];

        for (let r = 0; r < this.tableSize; r++) {
            const slot: KVP<K, V> | null = this.table[r];
            const slotLabel = (!slot) ? "<empty>" :
                (slot.deleted) ? "<deleted>" : "";

            text.push(`Slot ${r} ${slotLabel}`);
        }

        return text.join(`\n`);
    }
}

export function createHashTable<K, V>(
    initSize: number = 10,
) {
    return new HashTable<K, V>(initSize);
}

export default function main(): void {
    const ht = createHashTable<string, string>();

    ht.insertAll([
        ["A", "Adam"],
        ["B", "Bob"],
        ["C", "Charles"],
        ["D", "Doug"],
        ["E", "Eric"],
        ["F", "Fred"],
        ["G", "Goerge"],
        ["H", "Henry"],
        ["I", "Isaac"],
        ["J", "Jon"],
        ["K", "Ken"],
        ["L", "Larry"],
        ["M", "Mike"],
        ["N", "Nick"],
        ["M", "Marty"],
        ["O", "Oscar"],
        ["P", "Patrick"],
        ["Q", "Quincy"],
        ["R", "Robert"],
        ["S", "Sam"],
        ["T", "Thomas"],
        ["TO", "Tony"],
        ["U", "Unice"],
        ["V", "victor"],
        ["W", "William"],
        ["X", "Xavier"],
        ["Y", "Young"],
        ["Z", "Zane"],
    ]);

    ht.remove("W");

    print("");
    print("Table structure");
    print("===================");
    print(ht.printTable());

    print("");
    print("Keys");
    print("===================");
    ht.keys().forEach((key: string) => {
        print(key);
    });

    print("");
    print("values");
    print("===================");
    ht.values().forEach((value: string) => {
        print(value);
    });

    print("");
    print("Get value for key E");
    print(ht.value("E"));

    print("");

};
