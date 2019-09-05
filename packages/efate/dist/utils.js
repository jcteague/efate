"use strict";
// import Field from "./field";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachBuilderToStringProto = (name, value) => {
    Object.defineProperty(String.prototype, name, { value });
};
const isOfType = (type) => (value) => typeof value === type;
exports.isObject = isOfType('object');
exports.isFunction = isOfType('function'); // tslint:disable-line
exports.isString = isOfType('string');
exports.default = {};
