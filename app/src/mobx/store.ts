import { createContext } from "react";
import { observable } from "mobx";

export class Store {
  @observable id?: string;
  @observable typescript = TypescriptPlaceholder;
}

export const StoreContext = createContext(new Store());

const TypescriptPlaceholder = `// This is where you can paste in your TypeScript interfaces

interface User {
  name: string
  age: number
}
`;
