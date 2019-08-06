"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const asArrayBuilder = function (length = 1) {
    const fieldName = this;
    const createArray = (prefix, len) => {
        const arr = [];
        for (let i = 1; i < len + 1; i++) {
            arr.push(`${prefix}${i}`);
        }
        return arr;
    };
    return () => {
        return new field_1.default(fieldName, createArray(fieldName, length));
    };
};
utils_1.attachBuilderToStringProto('asArray', asArrayBuilder);
