import { print } from "../../app/util/output";

function findPeakInRow(
    input: number[][],
    row: number,
    start: number,
    end: number,
) : number {
    const n: number = end - start;
    const m: number = Math.floor(n / 2);
    const mid: number = input[row][m];
    const left: number = input[row][m - 1] || 0;
    const right: number = input[row][m + 1] || 0;

    if (left <= mid && mid >= right) {
        return mid;
    } else if (left >= mid) {
        return findPeakInRow(input, row, start, m);
    }

    return findPeakInRow(input, row, m + 1, end + 1);
}

function findInPeakColumn(
    input: number[][],
    column: number,
) {
    let maxVal: number = 0;
    let maxRowIdx: number = 0;

    for (let r = 0; r < input.length; r++) {
        const cellValue = input[r][column];
        if (cellValue > maxVal) {
            maxVal = cellValue;
            maxRowIdx = r;
        }
    }

    return maxRowIdx;
}

function find2DPeak(input: number[][]) : number {
    const cols: number = input[0].length;
    const midCol: number = Math.floor(cols / 2) - 1;

    const rowWithMaxPeak: number = findInPeakColumn(input, midCol);
    return findPeakInRow(input, rowWithMaxPeak, 0, input.length);
}

export default function main(): void {
    const matrices: number[][][] = [
        [
            [1,2,3,4,5],
            [6,7,8,9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
        ],
        [
            [1,2],
            [6,7],
        ],
        [
            [2],
        ],
        [
            [3,2,1],
            [2,1,0],
            [1,0,0],
        ],
    ]

    matrices.forEach((matrix: number[][]) => {
        const result: number = find2DPeak(matrix);
        print("");
        print("Input: [")
        matrix.forEach((list: number[]) => {
            print(`         [${list}]`)
        });
        print("       ]")
        print(`Result: ${result}`);
    })
}

