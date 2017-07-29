// MIT © 2017 azu
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const convertJsonToXML = require("../src/ldr-export-opml").convertJsonToXML;
describe("convertJsonToXML", () => {
    it("should convert json to xml(opml)", () => {
        const input = require("./fixtures/ldr.input.json");
        const result = convertJsonToXML(input);
        const expectedOutput = fs.readFileSync(path.join(__dirname, "./fixtures/ldr.output.xml"), "utf-8");
        assert.strictEqual(result, expectedOutput);
    });
});