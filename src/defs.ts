import { Cli, exec, renderHelp } from "./app/cli/cli";
import { print } from "./app/util/output";
import peak from "./algorithms/array/peak";

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
            ],
        },
    ]
};
