type JsonNull = null;
type JsonPrimitive = string | number | boolean | JsonNull;
type JsonArray = InputJsonValue[];
type JsonObject = { [key: string]: InputJsonValue };
export type InputJsonValue = JsonPrimitive | JsonArray | JsonObject;
