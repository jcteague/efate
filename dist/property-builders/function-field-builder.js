"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const buildFromFunction = function (func) {
    const fieldName = this;
    return (increment) => {
        return new field_1.default(fieldName, func(increment));
    };
};
utils_1.attachBuilderToStringProto('as', buildFromFunction);
