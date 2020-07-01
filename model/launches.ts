import * as log from "https://deno.land/std/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    launchDate: number;
    upcoming: boolean;
    success?: boolean;
    target?: string;
    customers: Array<string>;
};

const launches = new Map<number, Launch>();

export async function downloadLaunchData() {
    log.info("Downloading launch data.");

    const response = await fetch("https://api.spacexdata.com/v3/launches", {
        method: "GET"
    });

    if (!response.ok) {
        log.warning("Problem downloading launch data.");
        throw new Error("Launch data download failed.");
    }

    const launchData = await response.json();
    for (const launch of launchData) {
        const payloads = launch["rocket"]["second_stage"]["payloads"];
        //log.warning("payloads");
        //log.warning(JSON.stringify(payloads));
        debugger;
        const customers = _.flatMap(payloads, (payload: any) => {
            return payload["customers"];
        });

        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
            rocket: launch["rocket"]["rocket_name"],
            launchDate: launch["launch_date_unix"],
            upcoming: launch["upcoming"],
            success: launch["launch_success"],
            customers: customers,
        };

        launches.set(flightData.flightNumber, flightData);
        log.info(JSON.stringify(flightData));
    }
}

await downloadLaunchData();
log.info(`Downloaded data for ${launches.size} SpaceX Launches.`);

export function getAll() {
    return Array.from(launches.values());
}

export function getOne(id: number) {
    if (launches.has(id)) {
        return launches.get(id);
    }
    return null;
}

/* async function exercise() {
    const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify({name: "Elon Musk", job: "billionaire"}),
        //headers ensure the server correctly reads our json
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    });

    const data = await response.json();
    console.log(data);
}

await exercise(); */