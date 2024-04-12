export const swaggerOptions = {
    swagger: {
        info: {
            title: "Amigo Secreto API",
            description: "Vagas Econdo.",
            version: "1.0.0",
        },
        host: process.env.HOSTNAME || "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
          { name: "Users", description: "Users" },
          { name: "Groups", description: "Groups" },
          { name: "Group Members", description: "Group Members" }
        ],
    },
};

export const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};