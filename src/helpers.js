const {objectId} = require('mongodb');

module.exports = {
    checkId(id, varName){
        if(!id){
            throw "Error: you must provide a " + varName;
        }
        if(typeof id !== 'string'){
            throw "Error: " + varName + " must be of type string";
        }
        id = id.trim();
        if(id.length === 0){
            throw "Error: " + varName + " cannot be an empty string or just spaces";
        }
        return id;
    },

    checkString(str, varName){
        if(!str){
            throw "Error: you must provide a " + varName;
        }
        if(typeof str !== 'string'){
            throw "Error: " + varName + " must be of type string";
        }
        str = str.trim();
        if(str.length === 0){
            throw "Error: " + varName + " cannot be an empty string or just spaces";
        }
    },

    checkBool(bool, varName){
        if(!bool){
            throw "Error: you must provide a " + varName;
        }
        if(typeof bool !== 'boolean'){
            throw "Error " + varName + " must be of type boolean";
        }
    }
}