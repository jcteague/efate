"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const names_1 = require("./names");
const debugFn = require("debug");
const debug = debugFn('efate:string-field-builder');
const asStringBuilder = function () {
    const fieldName = this;
    debug('string builder field = %s', fieldName);
    return (increment) => new field_1.default(fieldName, `${fieldName}${increment}`);
};
exports.asStringBuilder = asStringBuilder;
const withValueBuilder = function (valuePrefix) {
    const fieldName = this;
    return (increment) => new field_1.default(fieldName, `${valuePrefix}${increment}`);
};
exports.withValueBuilder = withValueBuilder;
const withConstantBuilder = function (valueConstant) {
    const fieldName = this;
    return () => new field_1.default(fieldName, valueConstant);
};
exports.withConstantBuilder = withConstantBuilder;
const getRandomElement = (list) => {
    const i = Math.floor(Math.random() * list.length);
    return list[i];
};
const firstNameBuilder = function () {
    const fieldName = this;
    return () => {
        return new field_1.default(fieldName, getRandomElement(names_1.firstNames));
    };
};
exports.firstNameBuilder = firstNameBuilder;
const lastNameBuilder = function () {
    const fieldName = this;
    return () => {
        return new field_1.default(fieldName, getRandomElement(names_1.lastNames));
    };
};
exports.lastNameBuilder = lastNameBuilder;
const fullNameBuilder = function () {
    const fieldName = this;
    return () => {
        const first = getRandomElement(names_1.firstNames);
        const last = getRandomElement(names_1.lastNames);
        return new field_1.default(fieldName, `${first} ${last}`);
    };
};
exports.fullNameBuilder = fullNameBuilder;
utils_1.attachBuilderToStringProto('withValue', withValueBuilder);
utils_1.attachBuilderToStringProto('asConstant', withConstantBuilder);
utils_1.attachBuilderToStringProto('asFirstName', firstNameBuilder);
utils_1.attachBuilderToStringProto('asLastName', lastNameBuilder);
utils_1.attachBuilderToStringProto('asFullName', fullNameBuilder);
// export const withValueBuilder;
exports.default = (name, increment) => {
    return new field_1.default(name, `${name}${increment}`);
};
