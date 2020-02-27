import { print } from "../../app/util/output";

function merge<T>(
    array: T[],
    left: number,
    mid: number,
    right: number,
    comparator: (a: T, b: T) => boolean,
) {
    let i: number;
    let j: number;
    let k: number;

    const n1: number = mid - left + 1;
	const n2: number = right - mid;
    const L: T[] = [];
    const R: T[] = [];

	/* Copy data to temp arrays L[] and R[] */
	for (i = 0; i < n1; i++) {
        L[i] = array[left + i];
    }

    for (j = 0; j < n2; j++) {
        R[j] = array[mid + 1 + j];
    }

	/* Merge the temp arrays back into arr[l..r]*/
	i = 0; // Initial index of first subarray
	j = 0; // Initial index of second subarray
	k = left; // Initial index of merged subarray
	while (i < n1 && j < n2) {
		if (comparator(L[i], R[j])) {
			array[k] = L[i];
			i++;
		} else {
			array[k] = R[j];
			j++;
		}
		k++;
	}

	/* Copy the remaining elements of L[], if there
	are any */
	while (i < n1) {
		array[k] = L[i];
		i++;
		k++;
	}

	/* Copy the remaining elements of R[], if there
	are any */
	while (j < n2) {
		array[k] = R[j];
		j++;
		k++;
	}
}

/* l is for left index and r is right index of the
sub-array of arr to be sorted */
function mergeSort<T>(
    array: T[],
    left: number,
    right: number,
    comparator: (a: T, b: T) => boolean,
) {
	if (left < right) {
		// Same as (l+r)/2, but avoids overflow for
		// large l and h
		const mid: number = Math.floor(left + (right - left) / 2);

		// Sort first and second halves
        mergeSort(array, left, mid, comparator);
        mergeSort(array, mid + 1, right, comparator);

		merge(array, left, mid, right, comparator);
    }
    return array;
}

function sort<T>(
    array: T[],
    comparator: (a: T, b: T) => boolean,
) {
    return mergeSort(array, 0, array.length - 1, comparator);
}

function numberComparator(a: number, b: number) {
    return a <= b;
}

export default function main(): void {
    const lists: number[][] = [
        [3,2,1,6,5,4,8,7,0]
    ]

    lists.forEach((list: number[]) => {
        print("");
        print(`Input: [${list}]`)
        const result: number[] = sort(list, numberComparator);
        print(`Result: ${result}`);
    })
}
