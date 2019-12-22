import { createContext } from "react";
import { observable } from "mobx";

export class Store {
  @observable id?: string;
  @observable typescript = TypescriptPlaceholder;
  @observable schema = SchemaPlaceholder;
}

export const StoreContext = createContext(new Store());

const TypescriptPlaceholder = `// This is where you can paste in your TypeScript interfaces

export interface User2 {
  name: string
  age: number
}
export interface User {
  name: string
  age: number
}
`;

const SchemaPlaceholder = `
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/User",
    "definitions": {
        "User": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "age": {
                    "type": "number"
                }
            },
            "required": [
                "name",
                "age"
            ],
            "additionalProperties": false
        }
    }
}
`;
