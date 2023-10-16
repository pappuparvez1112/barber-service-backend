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
exports.adminServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.create({
        data: Object.assign(Object.assign({}, admin), { role: 'admin' }),
    });
    return result;
});
const getAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.findMany();
    const total = yield prisma_1.default.admin.count();
    return {
        meta: {
            total,
        },
        data: result,
    };
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateAdmin = (id, admin) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.update({
        where: {
            id: id,
        },
        data: admin,
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.adminServices = {
    createAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
