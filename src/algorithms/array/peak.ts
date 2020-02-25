import { print } from "../../app/util/output";

function _findPeak(input: number[], start: number, end: number) {
    const n: number = end - start;
    const m: number = Math.floor(n / 2);
    const mid = input[m] || 0;
    const left = input[m - 1] || 0;
    const right = input[m + 1] || 0;

    if (left <= mid && mid >= right) {
        return mid;
    }
    if (left >= mid) {
        return _findPeak(input, start, m);
    }
    return _findPeak(input, m + 1, end + 1);
}

function findPeak(input: number[]) {
    return _findPeak(input, 1, input.length);
}

export default function main(): void {
    const lists: number[][] = [
        [],
        [1,2],
        [1,2,1],
        [1,2,3,4,5,4,3,2]
    ]

    lists.forEach((list: number[]) => {
        const result: number = findPeak(list);
        print("");
        print(`Input: [${list}]`)
        print(`Result: ${result}`);
    })
}
