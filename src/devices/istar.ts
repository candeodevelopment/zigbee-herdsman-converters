import * as m from "../lib/modernExtend";
import type {DefinitionWithExtend} from "../lib/types";

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["iStar DIM Light"],
        model: "SCCV2401-1",
        vendor: "iStar",
        description: "Zigbee 3.0 LED controller, dimmable white 12-36V DC max. 5A",
        extend: [m.light({turnsOffAtBrightness1: true})],
    },
    {
        zigbeeModel: ["iStar CCT Light"],
        model: "SCCV2403-2",
        vendor: "iStar",
        description: "Zigbee 3.0 LED controller, dimmable white spectrum",
        extend: [m.light({colorTemp: {range: [153, 370]}, turnsOffAtBrightness1: true})],
    },
];
