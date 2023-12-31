"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const process_1 = require("process");
const app_module_1 = require("../app.module");
const redis_service_1 = require("../shared/redis.service");
const user_service_1 = require("../user/user.service");
(async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userService = app.get(user_service_1.UserService);
    const ambassadors = await userService.find({
        is_ambassador: true,
    }, ['orders', 'orders.order_items']);
    const redisService = app.get(redis_service_1.RedisService);
    const client = redisService.getClient();
    for (let i = 0; i < ambassadors.length; i++) {
        await client.zadd('rankings', ambassadors[i].revenue, ambassadors[i].name);
    }
    process_1.default.exit();
})();
//# sourceMappingURL=rankings.js.map