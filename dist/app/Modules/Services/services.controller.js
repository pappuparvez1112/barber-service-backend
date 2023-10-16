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
exports.serviceController = void 0;
const services_services_1 = require("./services.services");
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceData = __rest(req.body, []);
        const service = yield services_services_1.serviceServices.createService(serviceData);
        res.status(200).json({
            status: 'success',
            message: 'Service created successfully',
            data: service,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.query, { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'asc', searchTerm = '' } = _a, filtersData = __rest(_a, ["page", "limit", "sortBy", "sortOrder", "searchTerm"]);
    console.log(req.query);
    try {
        const services = yield services_services_1.serviceServices.getAllServices(Number(page), Number(limit), sortBy, sortOrder, searchTerm, filtersData);
        res.status(200).json({
            status: 'success',
            message: 'Services fetched successfully',
            meta: services.meta,
            data: services.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const services = await serviceServices.getAllServices();
//         res.status(200).json({
//             status: 'success',
//             message: 'Services fetched successfully',
//             data: services.data,
//         });
//     } catch (error) {
//         next(error)
//     }
// };
const getSingleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield services_services_1.serviceServices.getSingleService(id);
        res.status(200).json({
            status: 'success',
            message: 'Service fetched successfully',
            data: service,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const serviceData = __rest(req.body, []);
        const service = yield services_services_1.serviceServices.updateService(id, serviceData);
        res.status(200).json({
            status: 'success',
            message: 'Service updated successfully',
            data: service,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const service = yield services_services_1.serviceServices.deleteService(id);
        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully',
            data: service,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.serviceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
