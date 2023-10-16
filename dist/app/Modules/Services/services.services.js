"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data: service,
    });
    return result;
});
const getAllServices = (page, limit, sortBy, sortOrder, searchTerm, filtersData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            category: {
                                title: {
                                    contains: searchTerm,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    ],
                },
                {
                    category: {
                        title: {
                            equals: filtersData.category,
                            mode: 'insensitive',
                        },
                    },
                },
            ],
        },
        include: {
            category: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.service.count();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateService = (id, service) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id: id,
        },
        data: service,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.serviceServices = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
