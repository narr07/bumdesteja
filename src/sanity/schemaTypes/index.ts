import { type SchemaTypeDefinition } from "sanity";
import { homeType } from "./homeType";
import { programType } from "./programType";
import { umkmType } from "./umkmType";
import { wisataType } from "./wisataType";
export const schema: { types: SchemaTypeDefinition[] } = {
	types: [homeType, programType, umkmType, wisataType],
};
