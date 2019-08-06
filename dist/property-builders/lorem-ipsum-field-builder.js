"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("../field");
const utils_1 = require("../utils");
const lorem_ipsum_1 = require("./lorem-ipsum");
const defaultOptions = {
    maxLength: 25,
    minLength: 10
};
const generateText = ({ minLength, maxLength }) => {
    const constrainedMaxLength = lorem_ipsum_1.loremIpsumText.length - maxLength;
    const startPosition = Math.floor(Math.random() * constrainedMaxLength);
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return lorem_ipsum_1.loremIpsumText.substr(startPosition, length);
};
const loremIpsumBuilder = function (options = defaultOptions) {
    const fieldName = this;
    return () => {
        return new field_1.default(fieldName, generateText(options));
    };
};
utils_1.attachBuilderToStringProto('asLoremIpsum', loremIpsumBuilder);
