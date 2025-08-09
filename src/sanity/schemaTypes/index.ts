import { type SchemaTypeDefinition } from "sanity";
import {homeType} from "./homeType";
import { programType } from "./programType";
export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homeType, programType],
};
