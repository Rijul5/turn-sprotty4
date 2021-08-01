"use strict";
/*
 * Copyright (C) 2017-2020 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TURNModelFactory = void 0;
var sprotty_1 = require("sprotty");
var TURNModelFactory = /** @class */ (function (_super) {
    __extends(TURNModelFactory, _super);
    function TURNModelFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SQRT_5 = Math.sqrt(5);
        _this.SQRT_7_5 = Math.sqrt(1 * 1 + 2.5 * 2.5);
        return _this;
    }
    TURNModelFactory.prototype.createElement = function (schema, parent) {
        var element = _super.prototype.createElement.call(this, schema, parent);
        if (element instanceof sprotty_1.SEdge) {
            switch (sprotty_1.getSubType(schema)) {
                case 'composition':
                    element.sourceAnchorCorrection = this.SQRT_5;
                    break;
                case 'import':
                    element.sourceAnchorCorrection = this.SQRT_7_5;
                    break;
                case 'uses':
                case 'augments':
                    element.targetAnchorCorrection = this.SQRT_7_5;
                    break;
            }
        }
        return element;
    };
    return TURNModelFactory;
}(sprotty_1.SGraphFactory));
exports.TURNModelFactory = TURNModelFactory;
//# sourceMappingURL=model-factory.js.map