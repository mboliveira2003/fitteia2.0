module.exports = {
  "student-hub-api": {
    input: {
      target: "./student-hub-api.yml",
    },
    output: {
      client: "react-query",
      mock: false,
      mode: "tags-split",
      target: ".",
      schemas: "./model",
      override: {
        mutator: {
          path: "./instance.ts",
          name: "instance",
        },
      },
    },
  },
};
