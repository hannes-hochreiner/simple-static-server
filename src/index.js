import { default as express } from "express";
import {default as commander} from "commander";

commander.option("-p, --port [n]", "Port at which the server listens. If none is specified, the server listens at file descriptor 3.")
  .option("-t, --timeout [n]", "Number of seconds of idleness, before the server shuts down. If not specified, the idle timeout is 10 s. Use 0 to avoid shutdowns due to idleness.")
  .option("-r, --root <path>", "Path of the root directory.")
  .parse(process.argv);

let app = express();

app.use('/', express.static(commander.root));

let idleTimeout = commander.timeout || 10;
let idleCounter = 0;
let port = commander.port || { fd: 3 };
let server = app.listen(port, () => {
  console.log(`server listening at ${JSON.stringify(port)}`);

  if (idleTimeout != 0) {
    console.log(`server will shutdown after ${idleTimeout} s of idleness.`);
  } else {
    console.log(`server will not shutdown due to idleness.`);
  }
});

setInterval(() => {
  if (idleTimeout != 0 && idleCounter >= idleTimeout) {
    console.log("reached idle timeout ... closing server");
    server.close();
    process.exit(0);
  }

  idleCounter += 1;
}, 1000);
