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
exports.adminController = void 0;
const admins_services_1 = require("./admins.services");
const createAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminData = __rest(req.body, []);
        const admin = yield admins_services_1.adminServices.createAdmin(adminData);
        res.status(200).json({
            status: 'success',
            message: 'Admin created successfully',
            data: admin
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield admins_services_1.adminServices.getAllAdmins();
        res.status(200).json({
            status: 'success',
            message: 'Admins fetched successfully',
            data: admins.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield admins_services_1.adminServices.getSingleAdmin(id);
        res.status(200).json({
            status: 'success',
            message: 'Admin fetched successfully',
            data: admin
        });
    }
    catch (error) {
        next(error);
    }
});
const updateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const adminData = __rest(req.body, []);
        const admin = yield admins_services_1.adminServices.updateAdmin(id, adminData);
        res.status(200).json({
            status: 'success',
            message: 'Admin updated successfully',
            data: admin
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield admins_services_1.adminServices.deleteAdmin(id);
        res.status(200).json({
            status: 'success',
            message: 'Admin deleted successfully',
            data: admin
        });
    }
    catch (error) {
        next(error);
    }
});
exports.adminController = {
    createAdmin,
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
};
