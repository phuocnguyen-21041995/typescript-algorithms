import { Cli } from "./app/cli/cli";
import peak from "./algorithms/array/peak";
import peak2D from "./algorithms/array/2Dpeak";
import insertionSort from "./algorithms/array/insertion_sort";
import mergeSort from "./algorithms/array/merge_sort";
import heapSort from "./algorithms/array/heap_sort";
import bstTree from "./algorithms/tree/bst";
import avlTree from "./algorithms/tree/avl";
import radixSort from "./algorithms/array/radix_sort";
import linkListHashTable from "./algorithms/hashtable/link.list";
import openAddressHashTable from "./algorithms/hashtable/open.address";
import searchRabinKarp from "./algorithms/search/rabinKarp";

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
                {
                    key: "radixSort",
                    description: "Radix Sort",
                    children: [],
                    exec: radixSort,
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
        },
        {
            key: "hashTables",
            children: [
                {
                    key: "linklist",
                    description: "Link List",
                    children: [],
                    exec: linkListHashTable,
                },
                {
                    key: "openAddress",
                    description: "Open Addressing",
                    children: [],
                    exec: openAddressHashTable,
                },
            ]
        },
        {
            key: "search",
            children: [
                {
                    key: "rk",
                    description: "Rabin Karp",
                    children: [],
                    exec: searchRabinKarp,
                },
            ]
        }
    ]
};
