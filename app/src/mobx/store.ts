import { createContext } from "react";
import { action, computed, observable, runInAction } from "mobx";
import Ajv from "ajv";

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
export class Store {
  constructor(id: string) {
    this.id = id;
  }

  @observable id: string;
  @observable typescript = TypescriptPlaceholder;
  @observable schema = SchemaPlaceholder;
  @observable json: string = "{}";
  @observable startedEditingData = false;

  @action async restoreIfExist() {
    const response = await fetch(`/api/values/${this.id}`);
    if (!response.ok) {
      return;
    }
    const { source, schema, value } = await response.json();
    runInAction(() => {
      this.typescript = source;
      this.schema = schema;
      this.json = value;
      this.startedEditingData = true;
    });
  }

  @computed get editorLink() {
    return `/${this.id}/editJson`;
  }

  jsonAPILink(key: string) {
    return `/api/json/${key}`;
  }

  async getIdentifiers() {
    const response = await fetch("/api/identifiers", {
      method: "POST",
      body: this.typescript
    });
    return await response.json();
  }

  @action
  async generateSchema(root: string) {
    const response = await fetch("/api/schema", {
      method: "POST",
      body: this.typescript,
      headers: {
        SchemaRootType: root
      }
    });
    const schema = JSON.stringify(await response.json(), null, 4);
    runInAction(() => {
      this.schema = schema;
    });
  }

  verifyJSONData() {
    const ajv = new Ajv();
    const value = JSON.parse(this.json);
    const valid = ajv.validate(JSON.parse(this.schema), value);
    if (!valid) {
      throw new Error("Your json value does not confirm to the schema");
    }
  }

  @action
  async saveToCloud() {
    const response = await fetch(`/api/values/${this.id}`, {
      method: "POST",
      body: JSON.stringify({
        source: this.typescript,
        schema: this.schema,
        value: this.json
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()).retrieveKey;
  }

  @action
  async startedEditing() {
    this.startedEditingData = true;
    await this.saveToCloud();
  }
}

export const StoreContext = createContext(new Store(""));
