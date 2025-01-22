import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-axios",
  input: "openapi.json",
  output: "src/client",
  plugins: [
    {
      name: "@hey-api/sdk",
      asClass: true,
      operationId: true,
      methodNameBuilder: (operation) => {
        // @ts-ignore
        let name: string = operation.name;
        // @ts-ignore
        let service: string = operation.service;

        if (service && name.toLowerCase().startsWith(service.toLowerCase())) {
          name = name.slice(service.length);
        }

        return name.charAt(0).toLowerCase() + name.slice(1);
      },
    },
    "zod",
    // {
    //   name: "@hey-api/sdk",
    //   validator: true,
    // },
    "@tanstack/react-query",
  ],
});
