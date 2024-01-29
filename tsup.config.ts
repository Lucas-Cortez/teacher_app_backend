import { defineConfig } from "tsup";

export default defineConfig((options) => {
  const isDev = options?.["--"]?.[0] === "dev" || false;

  return {
    ignoreWatch: ["node_modules"],
    clean: true,
    outDir: "dist",
    format: ["esm"],
    entry: ["src/server.ts"],
    watch: isDev,
    sourcemap: isDev,
    onSuccess: isDev ? "node dist/server.js" : undefined,
    ...options,
  };
});
