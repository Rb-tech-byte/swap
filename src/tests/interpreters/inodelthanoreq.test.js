jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const iNodeLthanOrEq = require("../../interpreters/inodelthanoreq.js");
const kwNodeTi = require("../../parsers/keywordnodes/kwnodejeki.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeLessThanOrEqual test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
    });

    test("it should return ooto for a lesser than or equal true condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 5 <= 5;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeLthanOrEq.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.KWELI);
    });

    test("it should return iro for a lesser than or equal false condition", () => {
        parser.lexer().inputStream.code = `${constants.KW.HIFADHI} a = 5 <= 4;`;
        const node = kwNodeTi.getNode.call(parser);
        expect(iNodeLthanOrEq.interpreteNode.call(mainInterpreter, node.right)).toBe(constants.KW.SIKWELI);
    });

    test("it should get the value of a variable and test it in a lesser than or equal condition", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.HIFADHI} a = 6;
            ${constants.KW.HIFADHI} b = a <= 7;
        `;

        mainInterpreter.interpreteProgram();
        expect(mainInterpreter.environment().getJeki(mainInterpreter.getCurrentScope(), "b")).toEqual(constants.KW.KWELI);
    });
});
