"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'searchTerm',
    'title',
    'author',
    'genre',
    'price',
    'categoryId',
];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFields = ['categoryId'];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
};
