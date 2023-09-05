import {Module} from '@nestjs/common';
import {NinjasModule} from './ninjas/ninjas.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {DataSource} from "typeorm";


// const TypeORMConf = require("../ormconfig")


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".env.development"
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            // entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true, // Only for development, set to false in production
        }),
        // TypeOrmModule.forRoot(TypeORMConf),
        NinjasModule,
        AuthModule,
        UsersModule,
    ],
    providers: [],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}


