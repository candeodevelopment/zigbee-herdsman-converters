import * as exposes from "../lib/exposes";
import * as legacy from "../lib/legacy";
import * as tuya from "../lib/tuya";
import type {DefinitionWithExtend} from "../lib/types";

const e = exposes.presets;
const ea = exposes.access;

export const definitions: DefinitionWithExtend[] = [
    {
        fingerprint: tuya.fingerprint("TS0601", ["_TZE200_wt9agwf3", "_TZE200_5uodvhgc", "_TZE200_1n2zev06"]),
        model: "FK_V02",
        vendor: "FrankEver",
        description: "Zigbee smart water valve",
        fromZigbee: [legacy.fz.frankever_valve],
        toZigbee: [legacy.tz.tuya_switch_state, legacy.tz.frankever_threshold, legacy.tz.frankever_timer],
        exposes: [
            e.switch().setAccess("state", ea.STATE_SET),
            e
                .numeric("threshold", exposes.access.STATE_SET)
                .withValueMin(0)
                .withValueMax(100)
                .withUnit("%")
                .withDescription("Valve open percentage (multiple of 10)"),
            e
                .numeric("timer", exposes.access.STATE_SET)
                .withValueMin(0)
                .withValueMax(600)
                .withUnit("min")
                .withDescription("Countdown timer in minutes"),
        ],
    },
];
