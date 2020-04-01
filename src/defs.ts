import { Cli } from "./app/cli/cli";
import peak from "./algorithms/array/peak";
import peak2D from "./algorithms/array/2Dpeak";
import insertionSort from "./algorithms/array/insertion_sort";
import mergeSort from "./algorithms/array/merge_sort";
import heapSort from "./algorithms/array/heap_sort";
import bstTree from "./algorithms/tree/bst";
import avlTree from "./algorithms/tree/avl";

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
                {
                    key: "mergeSort",
                    description: "Merge Sort",
                    children: [],
                    exec: mergeSort,
                },
                {
                    key: "heapSort",
                    description: "Heap Sort",
                    children: [],
                    exec: heapSort,
                },
            ],
        },
        {
            key: "trees",
            children: [
                {
                    key: "bst",
                    description: "Binary Search Tree",
                    children: [],
                    exec: bstTree,
                },
                {
                    key: "avl",
                    description: "AVL Tree",
                    children: [],
                    exec: avlTree,
                },
            ]
        }
    ]
};
