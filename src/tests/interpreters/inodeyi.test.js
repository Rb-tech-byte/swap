jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

const MainInterpreter = require("../../interpreters/maininterpreter.js");
const Environment = require("../../environment.js");
const Parser = require("../../parsers/parser.js");
const Lexer = require("../../lexer.js");
const InputStream = require("../../inputstream.js");
const constants = require("../../constants.js");

describe("INodeFun test suite", () => {
    let mainInterpreter, parser;

    beforeEach(() => {
        parser = new Parser(new Lexer(new InputStream()));
        mainInterpreter = new MainInterpreter(new Environment(), parser);
        global.console.log = jest.fn();
    });

    test("it should interprete a valid yi node", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.JEKI} oruko = "femi";

        ${constants.KW.YI} (oruko) {
            ${constants.KW.IRU} "anu":
                ${constants.KW.SOPE} "it is anu";
            ${constants.KW.IRU} "femi":
                ${constants.KW.SOPE} "it is femi";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is femi");
    });

    test("it should interprete a nested yi node", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.JEKI} oruko = 1;

        ${constants.KW.YI} (oruko) {
            ${constants.KW.IRU} 1:
                ${constants.KW.YI} (1+5) {
                    ${constants.KW.IRU} 3+3:
                        ${constants.KW.SOPE} "it is anu";
                    ${constants.KW.IRU} 3:
                        ${constants.KW.SOPE} "it is three";
                }            
            ${constants.KW.IRU} 2:
                ${constants.KW.SOPE} "it is femi";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is anu");
    });

    test("it should interprete yi node with padasi", () => {
        parser.lexer().inputStream.code = `
        ${constants.KW.JEKI} oruko = "funmi";

        ${constants.KW.YI} (oruko) {
            ${constants.KW.IRU} "anu":
                ${constants.KW.SOPE} "it is anu";
            ${constants.KW.IRU} "femi":
                ${constants.KW.SOPE} "it is femi";
            ${constants.KW.PADASI}: 
                ${constants.KW.SOPE} "i don't know";
                ${constants.KW.SOPE} "Yoruba - mi o mo";
        }`;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("i don't know");
        expect(global.console.log).toHaveBeenCalledWith("Yoruba - mi o mo");
    });

    test("it should interprete a valid yi node and return a value from within it", () => {
        parser.lexer().inputStream.code = `
            ${constants.KW.JEKI} oruko = "femi";

            ${constants.KW.ISE} apere(oruko) {

                ${constants.KW.YI} (oruko) {
                    ${constants.KW.IRU} "anu":
                        ${constants.KW.PADA} "it is anu";
                    ${constants.KW.IRU} "femi":
                        ${constants.KW.PADA} "it is femi";
                }
            }
            
            ${constants.KW.SOPE} apere(oruko);
        `;

        mainInterpreter.interpreteProgram();
        expect(global.console.log).toHaveBeenCalledWith("it is femi");
    });
});
