import ts from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import vue from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import css from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const production = process.env.NODE_ENV === "production";

export default {
  input: ["src/main.ts"],
  output: {
    format: "esm",
    dir: "build",
    sourcemap: !production
  },
  plugins: [
    copy({
      targets: [
        { src: "./src/index.html", dest: "./build" },
        { src: "./static/*", dest: "./build" }
      ]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        production ? "production" : "development"
      ),
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: !production
    }),
    resolve(),
    vue(),
    cjs(),
    ts(),
    css({ extract: "bundle.css", minimize: production }),
    production &&
      terser({
        module: true,
        compress: {
          booleans_as_integers: true,
          drop_console: false,
          ecma: 2018,
          hoist_funs: true,
          keep_fargs: false,
          passes: 2,
          toplevel: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_Function: true,
          unsafe_math: true,
          unsafe_symbols: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true,
          unsafe_undefined: true
        },
        mangle: { module: true, toplevel: true, properties: false }
      })
  ]
};
