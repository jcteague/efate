"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const pickFromBuilder = function (options) {
    if (!options || options.length === 0) {
        throw new Error('options to pick values from not provided');
    }
    const fieldName = this;
    return () => {
        return new field_1.default(fieldName, options[Math.floor(Math.random() * options.length)]);
    };
};
utils_1.attachBuilderToStringProto('pickFrom', pickFromBuilder);
exports.default = pickFromBuilder;
