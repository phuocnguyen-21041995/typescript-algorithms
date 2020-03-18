import { print } from "../../app/util/output";

interface Node<T> {
    value: T;
    left?: Node<T>;
    right?: Node<T>;
}

class BinarySearchTree<T>{
    private predicate: (value: T) => any;
    private root: Node<T>;
    constructor(
        predicate: (value: T) => any,
        values?: T[],
    ) {
        this.predicate = predicate;

        this.insert = this.insert.bind(this);

        this.insertAll(values || []);
    }

    private _createNode(value: T): Node<T> {
        return { value };
    }

    private _insert(
        node: Node<T>,
        value: T,
    ): Node<T> {
        if (!node) {
            return this._createNode(value);
        }

        const nodeValue = this.predicate(node.value);
        const newValue = this.predicate(value);

        if (nodeValue === newValue) {
            node.value = newValue;
            return node;
        } else if (newValue < nodeValue) {
            node.left = this._insert(node.left, value);
        } else {
            node.right = this._insert(node.right, value);
        }

        return node;
    }

    public insert(value: T): BinarySearchTree<T> {
        if (!(this.root)) {
            this.root = this._createNode(value);
        } else {
            this._insert(this.root, value);
        }

        return this;
    }

    public insertAll(values: T[]) {
        values.forEach(this.insert)

        return this;
    }

    public getRoot(): Node<T> {
        return this.root;
    }

    private _print(node: Node<T>, depth: number = 0): string {
        let text: string = "";
        const spaces = ("-").repeat(depth);

        text += `${spaces}| ${node.value}\n`;

        if (node.left) {
            text += this._print(node.left, depth + 2);
        }
        if (node.right) {
            text += this._print(node.right, depth + 2);
        }

        return text;
    }

    public print(): string {
        return this._print(this.root, 0);
    }

    private _filter(
        node: Node<T>,
        results: T[],
        predicate: (nodeValue: T) => boolean,
     ): T[] {

        const doNextNode = (nextNode: Node<T>) => {
            results.push(nextNode.value);
            this._filter(nextNode, results, predicate);
        }

        if (node.left && predicate(node.left.value)) {
            doNextNode(node.left);
        }
        if (node.right && predicate(node.right.value)) {
            doNextNode(node.right);
        }

        return results;
    }

    public filter(
        predicate: (nodeValue: T) => boolean,
    ) {
        return this._filter(this.root, [], predicate);
    }

    // Resume
    /*
    private _findDFS(
        node: Node<T>,
        predicate: (nodeValue: T) => boolean,
     ): T {

        if (!node) {
            return undefined;
        }

        if (predicate(node.value)) {
            return node.value;
        }

        const doNextNode = (nextNode: Node<T>) => {
            return this._find(nextNode, predicate);
        }

        if (node.left && predicate(node.left.value)) {
            doNextNode(node.left);
        }
        if (node.right && predicate(node.right.value)) {
            doNextNode(node.right);
        }

        return results;
    }
    */
}

export function createBinarySearchTree<T>(
    predicate: (value: T) => any,
    values?: T[],
) {
    return new BinarySearchTree(predicate, values);
}

export default function main(): void {
    const items: number[] = [50,25,75,20,30,70,80];
    const bst = createBinarySearchTree(
        (v: number) => v,
        items,
    )

    bst.insertAll([19,21,29,31,69,71,79,81]);

    print("");
    print(`Input: [${items}]`);

    print("");
    print("Tree:");
    print(bst.print());

    print("");
    print("Filtered: > 50");
    print(bst.filter((v) => v > 50).toString());

    print("");
    print("Filtered: < 50");
    print(bst.filter((v) => v < 50).toString());

    print("");
}
