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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AbstractService = class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    async save(options) {
        return this.repository.save(options);
    }
    async findOne(options = {}, relations = []) {
        return this.repository.findOne({
            relations: relations,
            where: options,
        });
    }
    async update(id, options) {
        return this.repository.update(id, options);
    }
    async find(options = {}, relations = []) {
        return this.repository.find({
            relations: relations,
            where: options,
        });
    }
    async delete(id) {
        return this.repository.delete(id);
    }
};
AbstractService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AbstractService);
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map