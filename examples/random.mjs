import fs from "node:fs/promises";
import { $init, dtCore, dtBreed, dtItem } from "../dist/dtmath-js/dtmath.js";

const [lang, _$init] = await Promise.all([fs.readFile("./dist/english.json").then(JSON.parse).catch(() => ({})), $init]);

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

const breeds = dtCore.breedList();
const { key: breed_key, name: breed_name } = breeds[randomInt(breeds.length)];
const breed = dtBreed.new(breed_key);
console.log("  breed");
console.log("breed_key:", breed_key);
if (lang[breed_name]) {
    console.log("breed_name:", lang[breed_name]);
}
console.log("breed_health:", dtBreed.health(breed, "damnation"));
console.log();

const weapons = dtCore.weaponList();
const weapon = weapons[randomInt(weapons.length)];

const item = dtItem.new(weapon.key);

const available_stats = dtItem.availableStats(item);
if (available_stats) {
    // set all stats to 80%
    const stats = Array.from(available_stats).map(({ key }) => [key, 0.8]);
    dtItem.setStats(item, stats);
}

const actions = dtItem.actionList(item);
const action = actions[randomInt(actions.length)];
if (action) {
    // can either be a breed or an armor type for damage calculation
    const target = {
        //tag: "armor",
        //val: "unarmored",
        tag: "breed",
        val: breed,
    }

    const damage = dtItem.calculate(item, action.key, target);
    const first_target = damage[0];

    const cleave = dtItem.cleave(item, action.key)

    console.log("  weapon"); lang[weapon.name]
    console.log("weapon_key:", weapon.key);
    if (lang[weapon.name]) {
        // some localizations have control characters which String.trim can remove
        const weapon_name = lang[weapon.name].trim();
        console.log("weapon_name:", lang[weapon.name].trim());
    }
    console.log("action_label:", action.displayName);
    console.log("action_cleave:", cleave);
    console.log("first_target:", first_target);
} else {
    // not every weapon has actions supported by dtmath
    console.log("no supported attacks for weapon " + weapon.key);
}

// objects will leak memory unless freed
dtBreed.free(breed);
dtItem.free(item);