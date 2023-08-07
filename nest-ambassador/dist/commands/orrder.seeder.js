"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const faker = require("faker");
const order_service_1 = require("../order/order.service");
(async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const orderService = app.get(order_service_1.OrderService);
    for (let i = 0; i < 30; i++) {
        await orderService.save({
            title: faker.lorem.words(2),
        });
    }
    process.exit();
})();
//# sourceMappingURL=orrder.seeder.js.map