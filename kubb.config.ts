import { defineConfig } from "@kubb/core"
import { pluginOas } from "@kubb/plugin-oas"
import { pluginReactQuery } from "@kubb/plugin-react-query"
import { pluginTs } from "@kubb/plugin-ts"

export default defineConfig({
  root: ".",
  input: {
    path: "https://challenge.outsera.tech/v3/api-docs",
  },
  output: {
    path: "./src/api/generated",
    clean: true,
  },
  plugins: [
    pluginOas({
      validate: false,
      generators: [],
    }),

    pluginTs({
      output: { path: "./types" },
      enumType: "literal",
      dateType: "string",
      transformers: {
        name: (name) => {
          if (name.match(/\d{3}$/)) {
            const statusMatch = name.match(/^(.+?)(\d{3})$/)
            if (statusMatch) {
              const [, baseName, statusCode] = statusMatch
              if (statusCode === "200") {
                return `T${baseName}Response`
              }
              return `T${baseName}${statusCode}Error`
            }
          }

          if (name.endsWith("MutationRequest")) {
            const baseName = name.replace("MutationRequest", "")
            return `T${baseName}Request`
          }

          if (name.endsWith("MutationResponse")) return name

          if (name.endsWith("HeaderParams")) {
            const baseName = name.replace("HeaderParams", "")
            return `T${baseName}HeaderParams`
          }

          if (name.endsWith("PathParams")) {
            return `T${name}`
          }

          if (name.endsWith("QueryParams")) {
            return `T${name}`
          }

          return name
        },
      },
    }),

    pluginReactQuery({
      output: { path: "./hooks" },
      client: {
        importPath: "@/client/custom-fetch",
        dataReturnType: "data",
      },
      query: {
        methods: ["get"],
        importPath: "@tanstack/react-query",
      },
      mutation: {
        methods: ["post", "put", "patch", "delete"],
        importPath: "@tanstack/react-query",
      },
      infinite: false,
      suspense: false,
      transformers: {
        name: (name) => {
          return name
        },
      },
    }),
  ],
})
