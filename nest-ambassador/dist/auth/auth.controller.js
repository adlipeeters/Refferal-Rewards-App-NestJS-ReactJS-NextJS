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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_dto_1 = require("./dtos/register.dto");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const login_dto_1 = require("./dtos/login.dto");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("./auth.guard");
const update_dto_1 = require("./dtos/update.dto");
let AuthController = class AuthController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(request, body) {
        const { password_confirm } = body, data = __rest(body, ["password_confirm"]);
        if (body.password !== password_confirm) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.save(Object.assign(Object.assign({}, data), { password: hashed, is_ambassador: request.path === '/api/ambassador/register' }));
    }
    async login(body, req, response) {
        const user = await this.userService.findOne({ email: body.email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!(await bcrypt.compare(body.password, user.password))) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const adminLogin = req.path === '/api/admin/login';
        if (user.is_ambassador && adminLogin) {
            throw new common_1.UnauthorizedException();
        }
        const jwt = await this.jwtService.signAsync({
            id: user.id,
            scope: adminLogin ? 'admin' : 'ambassador',
        });
        response.cookie('jwt', jwt, { httpOnly: true });
        return { message: 'success' };
    }
    async user(request) {
        const cookie = request.cookies['jwt'];
        const { id } = await this.jwtService.verifyAsync(cookie);
        if (request.path === '/api/admin/user') {
            return this.userService.findOne({ id });
        }
        const user = await this.userService.findOne({ id }, [
            'orders',
            'orders.order_items',
        ]);
        const { orders, password } = user, data = __rest(user, ["orders", "password"]);
        return Object.assign(Object.assign({}, data), { revenue: user.revenue });
    }
    async logout(response) {
        response.clearCookie('jwt');
        return { message: 'success' };
    }
    async updateInfo(request, body) {
        const cookie = request.cookies['jwt'];
        const { id } = await this.jwtService.verifyAsync(cookie);
        await this.userService.update(id, body);
        return this.userService.findOne({ id });
    }
    async updatePassword(request, body) {
        if (body.password !== body.password_confirm) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const cookie = request.cookies['jwt'];
        const { id } = await this.jwtService.verifyAsync(cookie);
        await this.userService.update(id, {
            password: await bcrypt.hash(body.password, 12),
        });
        return this.userService.findOne(Number(id));
    }
};
__decorate([
    (0, common_1.Post)(['admin/register', 'ambassador/register']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)(['admin/login', 'ambassador/login']),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(['admin/user', 'ambassador/user']),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(['admin/logout', 'ambassador/logout']),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(['admin/users/info', 'ambassador/users/info']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateInfo", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(['admin/users/password', 'ambassador/users/password']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map