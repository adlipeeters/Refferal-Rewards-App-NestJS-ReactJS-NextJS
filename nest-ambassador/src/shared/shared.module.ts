import { Module, CacheModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from './redis.service';

@Module({
    imports: [JwtModule.register({
        secret: '123189dkaj122ewasdasd',
        signOptions: { expiresIn: '1d' }
    }),
    CacheModule.register({
        // store: redisStore,
        password: 'INPz7Pus1soG8bnXxuPzSN38I8zFTs7O',
        host: 'redis-10248.c10.us-east-1-2.ec2.cloud.redislabs.com',
        port: 10248,
    }),],
    providers: [RedisService],
    exports: [JwtModule, CacheModule, RedisService],
})
export class SharedModule { }
