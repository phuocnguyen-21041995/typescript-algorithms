import { print } from "../../app/util/output";

function doSwap<T>(
    list: T[],
    i: number,
    j: number,
): void {
    const temp = list[j];

    list[j] = list[i];
    list[i] = temp;
}

function numberComparator(a: number, b: number) {
    return a >= b;
}

function sort<T>(
    list: T[],
    comparator: (a: T, b: T) => boolean,
) : T[] {
    const n: number = list.length;

    if (n === 1) {
        return list;
    }

    for (let i: number = 1; i < n; i++) {
        let j: number = i - 1;

        while (j >= 0 && comparator(list[j], list[i])) {
            doSwap(list, i, j);
            i--;
            j--;
        }
    }

    return list;
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
