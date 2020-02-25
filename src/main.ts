import { Cli, exec, renderHelp } from "./app/cli/cli";
import { print } from "./app/util/output";
import { cli } from "./defs";

const params = process.argv.slice(2);

if (!params.length || params[0] === "help") {
    print("Demo Commands:")
    renderHelp(cli, [cli.key])
} else {
    exec(params, [cli])
}
