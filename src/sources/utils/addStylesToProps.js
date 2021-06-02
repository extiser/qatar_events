import { cloneElement } from "react";

export default function addStylesToProps(node, propName, value) {
    let oldRender = node.prototype.render;
    node.prototype.render = function (...args) {
        let origin = oldRender.call(this, ...args);
        return cloneElement(origin, {
            [propName]: [origin.props[propName], value]
        });
    };
}