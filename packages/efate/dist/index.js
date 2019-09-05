"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixture_1 = require("./fixture");
const utils_1 = require("./utils");
exports.attachBuilderToStringProto = utils_1.attachBuilderToStringProto;
const field_1 = require("./field");
exports.Field = field_1.default;
const array_field_builder_1 = require("./property-builders/array-field-builder");
const number_field_builder_1 = require("./property-builders/number-field-builder");
const boolean_field_builder_1 = require("./property-builders/boolean-field-builder");
const date_field_builder_1 = require("./property-builders/date-field-builder");
const string_field_builder_1 = require("./property-builders/string-field-builder");
const propertyBuilders = {
    asStringBuilder: string_field_builder_1.asStringBuilder,
    asArrayBuilder: array_field_builder_1.default,
    asNumberBuilder: number_field_builder_1.default,
    asBooleanBuilder: boolean_field_builder_1.default,
    asDateBuilder: date_field_builder_1.default,
};
exports.propertyBuilders = propertyBuilders;
exports.default = fixture_1.default;
