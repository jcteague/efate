"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const asNumberBuilder = function () {
    const fieldName = this;
    return (increment) => {
        return new field_1.default(fieldName, increment);
    };
};
utils_1.attachBuilderToStringProto('asNumber', asNumberBuilder);
