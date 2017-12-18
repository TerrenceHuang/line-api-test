"use strict";

exports.cloneObject = function (obj) {

  return JSON.parse(JSON.stringify(obj));
}