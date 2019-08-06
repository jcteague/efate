"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const fromFixtureBuilder = function (fixture) {
    const fieldName = this;
    return () => {
        return new field_1.default(fieldName, fixture.create());
    };
};
utils_1.attachBuilderToStringProto('fromFixture', fromFixtureBuilder);
