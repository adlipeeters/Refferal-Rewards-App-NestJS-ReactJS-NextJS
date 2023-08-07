"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const auth_guard_1 = require("../auth/auth.guard");
const create_order_dto_1 = require("./dtos/create-order.dto");
const link_service_1 = require("../link/link.service");
const typeorm_1 = require("typeorm");
const order_item_1 = require("./order-item");
const product_service_1 = require("../product/product.service");
const order_1 = require("./order");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
let OrderController = class OrderController {
    constructor(orderService, linkService, connection, productService, configService, eventEmitter) {
        this.orderService = orderService;
        this.linkService = linkService;
        this.connection = connection;
        this.productService = productService;
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET'), {
            apiVersion: '2022-11-15',
        });
    }
    async all() {
        return this.orderService.find({}, ['order_items']);
    }
    async create(body) {
        const link = await this.linkService.findOne({ code: body.code }, [
            'user',
        ]);
        if (!link) {
            throw new common_1.BadRequestException('Invalid link');
        }
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const o = new order_1.Order();
            o.user_id = link.user.id;
            o.ambassador_email = link.user.email;
            o.first_name = body.first_name;
            o.last_name = body.last_name;
            o.email = body.email;
            o.address = body.address;
            o.country = body.country;
            o.city = body.city;
            o.zip = body.zip;
            o.code = body.code;
            const order = await queryRunner.manager.save(o);
            const line_items = [];
            for (const p of body.products) {
                const product = await this.productService.findOne({
                    id: p.product_id,
                });
                const orderItem = new order_item_1.OrderItem();
                orderItem.order = order;
                orderItem.product_title = product.title;
                orderItem.price = product.price;
                orderItem.quantity = p.quantity;
                orderItem.ambassador_revenue = 0.1 * product.price * p.quantity;
                orderItem.admin_revenue = 0.9 * product.price * p.quantity;
                await queryRunner.manager.save(orderItem);
                line_items.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            images: [product.image],
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: p.quantity,
                });
            }
            const source = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${this.configService.get('CHECKOUT_URL')}/success?source={CHECKOUT_SESSION_ID}`,
                cancel_url: `${this.configService.get('CHECKOUT_URL')}/error`,
            });
            order.transaction_id = source['id'];
            await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return source;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException('Error, Something went wrong!');
        }
        finally {
            await queryRunner.release();
        }
    }
    async confirm(source) {
        const order = await this.orderService.findOne({
            transaction_id: source,
        }, ['order_items']);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        await this.orderService.update(Number(order.id), { complete: true });
        await this.eventEmitter.emit('order.completed', order);
        return {
            message: 'success',
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('admin/orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('checkout/orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('checkout/orders/confirm'),
    __param(0, (0, common_1.Body)('source')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "confirm", null);
OrderController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        link_service_1.LinkService,
        typeorm_1.Connection,
        product_service_1.ProductService,
        config_1.ConfigService,
        event_emitter_1.EventEmitter2])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map