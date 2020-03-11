import { print } from "../../app/util/output";

/* Heapsort O(n log n) */
/**
 * Heapify
 * @param arr array to heapify
 * @param length length of array
 * @param root Starting root element
 * @param predicate evaluation predicate
 */
function heapify<T>(
    arr: T[],
    length: number,
    root: number,
    predicate: (a: T, b: T) => boolean,
): void {
    let largest = root; // Initialize largest as root
	const left = 2 * root + 1; // left = 2*i + 1
	const right = 2 * root + 2; // right = 2*i + 2

    // If left child is larger than root
	if (left < length && predicate(arr[left], arr[largest])) {
        largest = left;
    }

    // If right child is larger than largest so far
	if (right < length && predicate(arr[right], arr[largest])) {
        largest = right;
    }

    // If largest is not root
	if (largest !== root) {
        swap(arr, root, largest);

		// Recursively heapify the affected sub-tree
        heapify(arr, length, largest, predicate);
	}
}

/**
 * Swaps two elements
 * @param arr Target array
 * @param i First Item index
 * @param j Second Item index
 */
function swap<T>(
    arr: T[],
    i: number,
    j: number,
): void {
    const temp: T = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

/**
 * Sorts array using the heap sort algorithm
 * @param arr array to heapify
 * @param predicate evaluation predicate
 */
function sort<T>(
    arr: T[],
    predicate: (a: T, b: T) => boolean,
): T[] {
    const length = arr.length;

    // Build heap (rearrange array)
	for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(arr, length, i, predicate);
    }

	// One by one extract an element from heap
	for (let i = length - 1; i >= 0; i--) {
		// Move current root to end
		swap(arr, 0, i);

		// call max heapify on the reduced heap 
		heapify(arr, i, 0, predicate);
    }

    return arr;
}

function numberPredicate(a: number, b: number) {
    return a > b;
}

export default function main(): void {
    const lists: number[][] = [
        [3,2,1,6,5,4,8,7,0]
    ]

    lists.forEach((list: number[]) => {
        print("");
        print(`Input: [${list}]`)
        const result: number[] = sort(list, numberPredicate);
        print(`Result: ${result}`);
    })
}
