import { print } from "../../app/util/output";

interface KVP<K, V> {
    key: K;
    value: V;
}

type KVPList<K, V> = KVP<K, V>[];

interface List<K, V> {
    data: KVP<K, V>;
    tail: List<K, V> | null;
};

type Slot<K, V> = List<K, V>;

type Table<K, V> = Slot<K, V>[];

interface HashInfo<K, V> {
    hash: number;
    slot: number;
}

class HashTable<K, V> {
    private table: Table<K, V> = [];
    private tableSize: number = 10;
    private count: number = 0;

    constructor(initSize: number = 10) {
        this._allocateTable(initSize);
    }

    private _getHash(
        text: string,
    ): number {
        let hash = 0;

        if (text.length === 0) {
            return hash;
        }

        for (let i = 0; i < text.length; i++) {
            const chr: number = text.charCodeAt(i);
            hash = hash * 256 + chr;
        }

        return hash;
    }

    private _getSlot(
        hash: number,
    ): number {
        return Math.abs(hash % this.tableSize);
    }

    private _createHashInfo(key: K): HashInfo<K, V> {
        const hash = this._getHash(String(key));

        return {
            hash,
            slot: this._getSlot(hash)
        }
    }

    private _getItem(key: K): KVP<K, V> | null {
        const hashInfo = this._createHashInfo(key);
        const slot: Slot<K, V> = this.table[hashInfo.slot];
        if (!slot) {
            return null;
        }

        let head = slot;
        while (head) {
            if (head.data.key === key) {
                return head.data;
            }

            head = head.tail;
        }

        return null;
    }

    private _atMaxThreshold() {
        return (this.count >= this.tableSize);
    }

    private _atMinThreshold() {
        return (this.count < (this.tableSize / 4));
    }

    private _flatten(): KVPList<K, V> {
        const result: KVPList<K, V> = [];

        this.table.forEach((slot: Slot<K, V>) => {
            if (!slot) {
                return;
            }

            let head = slot;
            while (head) {
                if (head.data) {
                    result.push(head.data);
                }

                head = head.tail;
            }
        });

        return result;
    }

    private _allocateTable(size: number) {
        this.tableSize = size;
        this.table = [];

        for (let r = 0; r < this.tableSize; r++) {
            this.table[r] = null;
        }
    }

    private _doubleTable(split?: boolean): number {
        const all: KVPList<K, V> = this._flatten();

        this.count = 0;
        const newSize = (split) ? this.tableSize / 2 : this.tableSize * 2;

        this._allocateTable(newSize);

        all.forEach(({ key, value }) => {
            this.insert(key, value);
        });

        return this.tableSize;
    }

    insert(
        key: K,
        value: V,
    ): HashTable<K, V> {
        const { slot }= this._createHashInfo(key);
        const existing: KVP<K, V> | null = this._getItem(key);

        if (existing && existing.key === key) {
            existing.value = value;
            return;
        }

        if (this._atMaxThreshold()) {
            this._doubleTable();
        }

        this.count++;

        const tail: List<K, V> = this.table[slot] || null;

        const head: List<K, V> = {
            data: {
                key,
                value,
            },
            tail
        }

        this.table[slot] = head;

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
        this.insert(key, undefined);

        this.count--;

        if (this._atMinThreshold()) {
            this._doubleTable(true);
        }

        return this;
    }

    public value(key: K): V | null {
        const existing: KVP<K, V> = this._getItem(key);

        return (existing) ? existing.value : null;
    }

    values(): V[] {
        return this._flatten().map((item) => item.value);
    }

    keys(): K[] {
        return this._flatten().map((item) => item.key);
    }

    public size() {
        return this.count;
    }

    public printTable(): string {
        const text: string[] = [];

        for (let r = 0; r < this.tableSize; r++) {
            const slot: Slot<K, V> | null = this.table[r];
            const slotLabel = (slot) ? "" : "<empty>";
            text.push(`Slot ${r} ${slotLabel}`);

            let head = slot;
            while (head) {
                const colLabel = (head.data.value) ? `${head.data.key}: ${head.data.value}` : `${head.data.key} <empty>`;
                text.push(`  Col > ${colLabel}`)
                head = head.tail;
            }

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
    ]);

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
