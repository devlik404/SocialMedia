import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "monorail.proxy.rlwy.net",
    port: 17828,
    username: "postgres",
    password: "2FaGbcCC2b6eFGdCEcAAgAb1gb*Agf-a",
    database: "railway",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
