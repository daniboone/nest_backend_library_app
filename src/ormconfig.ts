import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: [__dirname + '/migration/**/*.ts', __dirname + '/migration/**/*.js'],
    cli: {
        "migrationsDir": "src/migration"
    }
}

export = config;      