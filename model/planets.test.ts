/**
 * Deno includes:
 * 
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library.
 * 3. Built-in test fixtures with Deno.test().
**/

import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";
import { filterHabitablePlanets } from "./planets.ts";

const HABITABLE_PLANET = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1",
    koi_srad: "1",
    koi_smass: "1"
};

const NOT_CONFIRMED = {
    koi_disposition: "FALSE POSITIVE",
    koi_prad: "1",
    koi_srad: "1",
    koi_smass: "1"
};

const TOO_LARGE_PRAD = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1.5",
    koi_srad: "1",
    koi_smass: "1"
};

const TOO_LARGE_SRAD = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1",
    koi_srad: "1.01",
    koi_smass: "1"
};

const TOO_LARGE_SMASS = {
    koi_disposition: "CONFIRMED",
    koi_prad: "1",
    koi_srad: "1",
    koi_smass: "1.04"
};

//TODO: add more test cases to check the lower bounds

Deno.test("filter only habitable planets", () => {
    const filtered = filterHabitablePlanets([
        HABITABLE_PLANET,
        NOT_CONFIRMED,
        TOO_LARGE_PRAD,
        TOO_LARGE_SRAD,
        TOO_LARGE_SMASS
    ]);
    assertEquals(filtered, [HABITABLE_PLANET]);
});

/// Testing documentation
/* import { assertEquals, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("short example test", () => {
    assertEquals("deno", "deno");
    assertNotEquals({
        runtime: "deno",
    }, {
        runtime: "node",
    });
});

Deno.test({
    name: "long example test",
    ignore: Deno.build.os === "linux",
    fn() {
        assertEquals("deno", "deno");
        assertNotEquals({
            runtime: "deno",
        }, {
            runtime: "node",
        });
    }
});

Deno.test({
    name: "ops leak",
    sanitizeOps: false, //ignore ops leaks check
    fn() {
        setTimeout(log.info, 10000);
    }
});

Deno.test({
    name: "resource leak",
    sanitizeResources: false, //ignore resource leaks check
    async fn() {
        await Deno.open("./model/planets.ts");
    }
});
 */