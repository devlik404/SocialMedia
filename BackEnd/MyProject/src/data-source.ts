import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "MF13012003",
    database: "threads",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
