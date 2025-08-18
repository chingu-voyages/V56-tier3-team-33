import { env } from "node:process";
import { execSync } from "node:child_process";

if (!env.NODE_ENV || env.NODE_ENV === "production") {
  process.exit(0);
}

console.info(">> executing prepare script");
execSync("git config core.hooksPath .githooks", { stdio: "inherit" });
