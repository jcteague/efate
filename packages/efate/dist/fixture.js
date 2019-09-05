"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line
/// <reference path="./global.d.ts" />
const property_builders_1 = require("./property-builders");
const utils_1 = require("./utils");
const debugGenerator = require("debug");
const debug = debugGenerator('efate:fixture');
function applyOverrides(fixture, overrides) {
    if (utils_1.isFunction(overrides)) {
        overrides(fixture);
    }
    else {
        Object.keys(overrides).forEach(k => {
            fixture[k] = overrides[k];
        });
    }
}
class Fixture {
    constructor(...fields) {
        debug('provided fields %o', fields);
        this.instanceCount = 1;
        this.builders = fields;
    }
    create(overrides = {}) {
        const fixture = {};
        this.builders.forEach(builder => {
            debug('builder: %o', builder);
            const field = property_builders_1.default.generateField(builder, this.instanceCount);
            debug('generated field %o', field);
            Object.defineProperty(fixture, field.name, {
                value: field.value,
                enumerable: true,
                writable: true
            });
            applyOverrides(fixture, overrides);
        });
        this.instanceCount++;
        return fixture;
    }
}
exports.default = Fixture;
