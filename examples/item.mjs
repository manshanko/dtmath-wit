import { $init, dtItem } from "../dist/dtmath-js/dtmath.js";

// javascript bindings built with `jsct --tla-compat` require waiting on the
// async $init promise export before use
await $init;

// create item from the weapon template of "autogun_p1_m1"
const weapon_key = process.argv[2] || "autogun_p1_m1";
let item;
try {
    item = dtItem.new(weapon_key);
}
catch(e) {
    console.error(`unknown weapon "${weapon_key}"`);
}

if (item) {
    const available_stats = dtItem.availableStats(item);
    if (available_stats) {
        // create list of stats at 80% (0.8)
        const stats = available_stats.map(({ key }) => [key, 0.8]);

        dtItem.setStats(item, stats);
    }

    // get list of supported attacks
    const actions = dtItem.actionList(item);
    const first_action = actions[0];

    if (first_action) {
        // measure damage dealt to super armor
        const target = {
            tag: "armor",
            val: "super-armor",
        };

        const damage = dtItem.calculate(item, first_action.key, target);
        const cleave = dtItem.cleave(item, first_action.key);

        console.log("weapon:", weapon_key);
        console.log("action:", first_action.displayName);
        console.log("cleave:", cleave);
        for (let i = 0; i < damage.length; i++) {
            const target = damage[i];
            console.log(`target ${i + 1}:`, target);
        }
    } else {
        console.log(weapon_key + " has no supported actions in dtmath");
    }

    // objects will leak memory unless freed
    dtItem.free(item);
}