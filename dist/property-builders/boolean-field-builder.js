"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const asBooleanBuilder = function () {
    const fieldName = this;
    return () => {
        return new field_1.default(fieldName, !!Math.floor(Math.random() * 2));
    };
};
utils_1.attachBuilderToStringProto('asBoolean', asBooleanBuilder);
