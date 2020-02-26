import { Cli, exec, renderHelp } from "./app/cli/cli";
import { print } from "./app/util/output";
import peak from "./algorithms/array/peak";
import peak2D from "./algorithms/array/2Dpeak";
import insertionSort from "./algorithms/array/insertion_sort";

export const cli: Cli = {
    key: "ds",
    children: [
        {
            key: "help",
            description: "Help",
            children: [],
        },
        {
            key: "arrays",
            children: [
                {
                    key: "peak",
                    description: "Single peak in array",
                    children: [],
                    exec: peak,
                },
                {
                    key: "2DPeak",
                    description: "2D peak in matrix",
                    children: [],
                    exec: peak2D,
                },
                {
                    key: "insertionSort",
                    description: "Insertion Sort",
                    children: [],
                    exec: insertionSort,
                },
            ],
        },
    ]
};
