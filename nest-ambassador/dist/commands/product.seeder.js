"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const faker = require("faker");
const product_service_1 = require("../product/product.service");
const crypto_1 = require("crypto");
(async () => {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const productService = app.get(product_service_1.ProductService);
    for (let i = 0; i < 30; i++) {
        await productService.save({
            title: faker.lorem.words(2),
            description: faker.lorem.words(10),
            image: faker.image.imageUrl(200, 200, '', true),
            price: (0, crypto_1.randomInt)(10, 100)
        });
    }
    process.exit();
})();
//# sourceMappingURL=product.seeder.js.map