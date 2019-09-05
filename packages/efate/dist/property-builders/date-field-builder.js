"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const defaultOptions = {
    incrementDay: false
};
const asDateBuilder = function (options = defaultOptions) {
    const fieldName = this;
    return (increment) => {
        const date = new Date();
        if (options.incrementDay) {
            date.setDate(date.getDate() + (increment - 1));
        }
        return new field_1.default(fieldName, date);
    };
};
utils_1.attachBuilderToStringProto('asDate', asDateBuilder);
exports.default = asDateBuilder;
