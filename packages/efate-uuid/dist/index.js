"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line
/// <reference path="./global.d.ts" />
const efate_1 = require("efate");
const uuid_1 = require("uuid");
const uuidBuilder = function () {
    const fieldName = this;
    return () => new efate_1.Field(fieldName, uuid_1.v4());
};
efate_1.attachBuilderToStringProto('asUUID', uuidBuilder);
exports.default = uuidBuilder;
