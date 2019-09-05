"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const efate_1 = require("efate");
const index_1 = require("efate-uuid/dist/index");
exports.scalarMap = {
    'STRING': efate_1.propertyBuilders.asStringBuilder,
    'INT': efate_1.propertyBuilders.asNumberBuilder,
    'FLOAT': efate_1.propertyBuilders.asNumberBuilder,
    'BOOLEAN': efate_1.propertyBuilders.asBooleanBuilder,
    'ID': index_1.default,
};
