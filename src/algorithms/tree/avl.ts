import { print } from "../../app/util/output";

export type Node<T> = {
    value: T;
    height: number;
    left?: Node<T>;
    right?: Node<T>;
}

export type AVLKeyFunc<T> = (value: T) => any;

export class AVL<T> {
    private avlKeyFunc: AVLKeyFunc<T>;
    private root?: Node<T>;

    constructor(avlKeyFunc: AVLKeyFunc<T>, values?: T[]) {
        this.avlKeyFunc = avlKeyFunc;
        if (values) {
            this.insertMany(values)
        }
    }

    private _createNode(
        value: T
    ): Node<T> {
        return {
            value,
            height: 1,
            left: undefined,
            right: undefined,
        };
    }

    private _height(node?: Node<T>): number {
        if (!node) {
            return 0;
        }
        return node.height;
    }

    private _max(a: number, b: number): number {
        return (a > b) ? a : b;
    }

    private _rightRotate(y: Node<T>): Node<T> {
        /*
           y
          / \
         x   T2
        */
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        /*
            x
             \
              y
             /
            T2
        */
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = this._max(this._height(y.left), this._height(y.right)) + 1;
        x.height = this._max(this._height(x.left), this._height(x.right)) + 1;

        // Return new root
        return x;
    }

    private _leftRotate(x: Node<T>): Node<T> {
        /*
             x
              \
               y
              /
            T2
        */
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        /*
              y
             /
            x
             \
              T2
        */
        y.left = x;
        x.right = T2;

        // Update heights
        x.height = this._max(this._height(x.left), this._height(x.right)) + 1;
        y.height = this._max(this._height(y.left), this._height(y.right)) + 1;

        // Return new root
        return y;
    }

    private _getBalance(node?: Node<T>): number {
        if (!node) {
            return 0;
        }

        return this._height(node.left) - this._height(node.right);
    }

    private _insert(node?: Node<T>, value?: T): Node<T> {
        /* 1. Perform the normal BST insertion */
        if (!node) {
            return this._createNode(value);
        }

        const nodeValue = this.avlKeyFunc(node.value);

        if (value < nodeValue) {
            node.left = this._insert(node.left, value);
        } else if (value > nodeValue) {
            node.right = this._insert(node.right, value);
        } else { // Equal keys are not allowed in BST
            return node;
        }

        /* 2. Update height of this ancestor node */
        node.height = 1 + this._max(this._height(node.left), this._height(node.right));

        /* 3. Get the balance factor of this ancestor
            node to check whether this node became
            unbalanced */
        const balance = this._getBalance(node);
        // If this node becomes unbalanced, then
        // there are 4 cases

        // Left Left Case
        if (balance > 1 && value < this.avlKeyFunc(node.left.value)) {
            return this._rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > this.avlKeyFunc(node.right.value)) {
            return this._leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > this.avlKeyFunc(node.left.value))  {
            node.left = this._leftRotate(node.left);
            return this._rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < this.avlKeyFunc(node.right.value)) {
            node.right = this._rightRotate(node.right);
            return this._leftRotate(node);
        }

        /* return the (unchanged) node pointer */
        return node;
    }

    public insert(value?: T): AVL<T> {
        this.root = this._insert(this.root, value);

        return this;
    }

    public insertMany(values: T[]): AVL<T> {
        values.forEach((value: T) => {
            this.insert(value);
        })

        return this;
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
}

export function createAVLTree<T>(
    avlKeyFunc: AVLKeyFunc<T>,
    values?: T[]
): AVL<T> {
    return new AVL<T>(avlKeyFunc, values);
}

export default function main(): void {
    const values: number[] = [50,25,11,1,88,121,20];
    const avl = createAVLTree(
        (v: number) => v,
        values,
    );

    const result = avl
        .insert(54)
        .insertMany([587,412,5,120,122])
        .print();

    print("");
    print(result);

}
