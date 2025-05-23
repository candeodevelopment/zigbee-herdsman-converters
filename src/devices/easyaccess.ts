import * as fz from "../converters/fromZigbee";
import * as tz from "../converters/toZigbee";
import * as exposes from "../lib/exposes";
import * as reporting from "../lib/reporting";
import type {DefinitionWithExtend} from "../lib/types";

const e = exposes.presets;
const ea = exposes.access;

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["EasyCode903G2.1"],
        model: "EasyCode903G2.1",
        vendor: "EasyAccess",
        description: "EasyFinger V2",
        fromZigbee: [fz.lock, fz.easycode_action, fz.battery],
        toZigbee: [tz.lock, tz.easycode_auto_relock, tz.lock_sound_volume],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(11);
            await reporting.bind(endpoint, coordinatorEndpoint, ["closuresDoorLock", "genPowerCfg"]);
            await reporting.lockState(endpoint);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [
            e.lock(),
            e.battery(),
            e.sound_volume(),
            e.action(["zigbee_unlock", "lock", "rfid_unlock", "keypad_unlock"]),
            e.binary("auto_relock", ea.STATE_SET, true, false).withDescription("Auto relock after 7 seconds."),
        ],
        whiteLabel: [{vendor: "Datek Wireless", model: "EasyCode903G2.1"}],
    },
];
