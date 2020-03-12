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
}

/*
// here
function printBST(node, depth = 0) {
    let text = '';
    const spaces = ('-').repeat(depth);
    text += `${spaces}| ${node.value}\n`;
    
    if (node.l) {
        text += printBST(node.l, depth + 2);
    }
    if (node.r) {
        text += printBST(node.r, depth + 2);
    }

    return text;
}

function countBST(node, value) {
    let count = 1;
    
    if (node.l && node.l.value <= value) {
        count += countBST(node.l, value);
    }
    if (node.r && node.r.value <= value) {
        count += countBST(node.r, value);
    }

    return count;
}

function lteBST(node, value) {
    if (!node) {
        return 0;
    }

    if (node.value <= value) {
        return countBST(node, value);
    }

    if (value < node.value) {
        return lteBST(node.l, value);
    } else {
        return lteBST(node.r, value);
    }
}
*/

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
    print(`Input: [${items}]`)
    const root: Node<number> = bst.getRoot();
    // console.log(JSON.stringify(root));
}
