import { print } from "../../app/util/output";

export class RadixSort {
    private _getMax(
        arr: number[],
        n: number,
    ): number {
        let mx: number = arr[0];

        for (let i = 1; i < n; i++) {
            if (arr[i] > mx) {
                mx = arr[i];
            }
        }

        return mx;
    }

    private _createSizeArray(
        n: number,
    ): number[] {
        const arr: number[] = [];

        for (let i = 0; i < n; i++) {
            arr[i] = 0;
        }

        return arr;
    }

    // A function to do counting sort of arr[] according to
    // the digit represented by exp.
    private _countSort(
        arr: number[],
        n: number,
        exp: number,
    ): number[] {
        const SIZE = 10;
        const output = this._createSizeArray(SIZE);

        // output array
        const count = this._createSizeArray(SIZE);

        // Store count of occurrences in count[]
        for (let i = 0; i < n; i++) {
            const position = Math.floor(arr[i] / exp) % SIZE;
            count[position]++;
        }

        // Change count[i] so that count[i] now contains actual
        // position of this digit in output[]
        for (let i = 1; i < SIZE; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (let i = n - 1; i >= 0; i--) {
            const position = Math.floor(arr[i] / exp) % SIZE;
            output[count[position] - 1] = arr[i];
            count[position]--;
        }

        // Copy the output array to arr[], so that arr[] now
        // contains sorted numbers according to current digit
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }

        return arr;
    }

    // The main function to that sorts arr[] of size n using  
    // Radix Sort
    public radixsort(
        arr: number[],
        n: number,
    ): number[] {

        // Find the maximum number to know number of digits
        const m: number = this._getMax(arr, n);

        // Do counting sort for every digit. Note that instead
        // of passing digit number, exp is passed. exp is 10^i
        // where i is current digit number
        for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
            this._countSort(arr, n, exp);
        }

        return arr;
    }
}

export function radixSort(
    arr: number[],
): number[] {
    const sorter = new RadixSort();

    return sorter.radixsort(arr, arr.length);
}


export default function main(): void {
    print("");
    const list = [124,12,2,456,4,14,3,69,4587];
    print(`Input: [${list}]`)

    const result = radixSort(list);
    print(`Result: ${result}`);
    print("");
}
