const registeredInterpreters = require("./interpreters.js");
const constants = require("../constants.js");
const IBase = require("./ibase.js");

class MainInterpreter {
    constructor (environment, parser) {
        this.environment = () => environment;
        this.parser = () => parser;
        this.initScopeStack();
    }

    initScopeStack () {
        const _scopeStack = [ "global", ];
        this.getCurrentScope = () => _scopeStack[_scopeStack.length - 1];
        this.scopeStack = () => [ ..._scopeStack, ];
        this.pushToScopeStack = (scope) => _scopeStack.push(scope);
        this.popFromScopeStack = () => _scopeStack.pop();
    }

    getLeafValue (leaf) {
        if (leaf.value != null) {
            return leaf.value;
        }

        return null;
    }

    evaluateNode (node) {
        const leafValue = this.getLeafValue(node);
        if (leafValue == null) {
            const interpreter = registeredInterpreters[node.operation];
            if (interpreter instanceof IBase) return interpreter.interpreteNode.call(this, node);
            else this.throwError(`Interpreter must be of type IBase: ${node.operation}`);
        }

        return leafValue;
    }

    throwError (msg) {
        this.parser().throwError(msg);
    }

    interpreteProgram () {
        this.parser().pushToBlockTypeStack(constants.PROGRAM);
        while (this.parser().isNotEndOfFile()) {
            this.evaluateNode(this.parser().parseAst());
        }
        this.parser().popBlockTypeStack();
    }

    interpreteImportedProgram (parser) {
        new MainInterpreter(this.environment(), parser).interpreteProgram();
    }
}

module.exports = MainInterpreter;
