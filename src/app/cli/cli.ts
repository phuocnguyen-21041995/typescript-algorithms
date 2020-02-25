import { print } from "../../app/util/output";

export interface Cli {
    key: string
    description?: string;
    children: Cli[];
    exec?: () => void;
}

export function renderHelp(cli: Cli, ancestors: string[] = []): void {
    const { children, description } = cli;

    if (children.length === 0) {
        const prevKeys = ancestors.join(" ");
        print(`${prevKeys} - ${description}`);
        return;
    }

    children.forEach((child: Cli) => {
        renderHelp(child, [...ancestors, child.key]);
    })

    return;
};

export function exec(params: string[], commands: Cli[]): void {
    const [ param, ...rest ] = params;

    if (!param || commands.length === 0) {
        print(`Command not found! enter "help" for command list`)
        return;
    }

    const cmd = commands.find((c: Cli) => c.key === param);

    if (!cmd) {
        print(`Command "${param}" not found! enter "help" for command list`)
        return;
    }

    if (rest.length === 0 && !cmd.children.length) {
        cmd.exec();
        return;
    }

    exec(rest, cmd.children);
};

