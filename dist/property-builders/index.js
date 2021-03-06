"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
require("./array-field-builder");
require("./boolean-field-builder");
require("./date-field-builder");
require("./email-field-builder");
require("./from-fixture-field-builder");
require("./function-field-builder");
require("./lorem-ipsum-field-builder");
require("./number-field-builder");
require("./pick-from-field-builder");
const string_field_builder_1 = require("./string-field-builder");
exports.default = {
    generateField(builder, instanceCounter) {
        if (utils_1.isString(builder)) {
            return string_field_builder_1.default.buildFixtureProperty(builder, instanceCounter);
        }
        if (utils_1.isFunction(builder)) {
            return builder(instanceCounter);
        }
        throw new Error(`Unsupported builder type ${typeof builder}`);
    }
};
