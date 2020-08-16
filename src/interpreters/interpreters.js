const constants = require("../constants.js");

const interpreters = {};
interpreters[constants.SYM.PLUS] = require("./inodeplus.js");
interpreters[constants.SYM.MINUS] = require("./inodeminus.js");
interpreters[constants.SYM.DIVIDE] = require("./inodedivide.js");
interpreters[constants.SYM.MULTIPLY] = require("./inodemultiply.js");
interpreters[constants.SYM.REMAINDER] = require("./inoderemainder.js");
interpreters[constants.SYM.ASSIGN] = require("./inodejeki.js");
interpreters[constants.SYM.EQ] = require("./inodeequals.js");
interpreters[constants.SYM.G_THAN] = require("./inodegthan.js");
interpreters[constants.SYM.OR] = require("./inodeor.js");
interpreters[constants.SYM.AND] = require("./inodeand.js");
interpreters[constants.SYM.L_THAN] = require("./inodelthan.js");
interpreters[constants.SYM.G_THAN_OR_EQ] = require("./inodegthanoreq.js");
interpreters[constants.SYM.L_THAN_OR_EQ] = require("./inodelthanoreq.js");
interpreters[constants.SYM.NOT_EQ] = require("./inodenoteq.js");
interpreters[constants.SYM.EXCLAMATION_POINT] = require("./inodenotoperator.js");

interpreters[constants.KW.ANDIKA] = require("./inodesope.js");
interpreters[constants.KW.KAMA] = require("./inodese.js");
interpreters[constants.KW.WAKATI] = require("./inodenigbati.js");
interpreters[constants.KW.VUNJA] = require("./inodekuro.js");
interpreters[constants.KW.HAKIKA] = require("./inodefun.js");
interpreters[constants.KW.BAD] = require("./inodeyi.js");
interpreters[constants.KW.KAZI] = require("./inodeise.js");
interpreters[constants.KW.PADA] = require("./inodepada.js");
interpreters[constants.KW.LETE] = require("./inodegbewole.js");
interpreters[constants.KW.ITA] = require("./inodewoke.js");

interpreters[constants.CALL_ISE] = require("./inodecallise.js");
interpreters[constants.GET_JEKI] = require("./inodegetjeki.js");
interpreters[constants.ARRAY] = require("./inodearray.js");
interpreters[constants.ARRAY_ELEM] = require("./inodearrayelem.js");
interpreters[constants.NEGATE_EXPRESSION] = require("./inodenegateexpression.js");

module.exports = interpreters;
