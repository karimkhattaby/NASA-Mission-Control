import { flatMap , log } from "../deps.ts";

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

async function fetchData(URL: string) {
    return fetch(URL)
    .then(response => {
        if(!response.ok) {
            log.warning("Problem downloading launch data.");
            throw new Error("Launch data download failed.");
        }
        return response.json();
    })
    .catch(err => {throw new Error(err.message)})
}

export async function downloadLaunchData() {
    log.info("Downloading launch data.");

    const launchData = await fetchData("https://api.spacexdata.com/v4/launches");
    const payloadsData = await fetchData("https://api.spacexdata.com/v4/payloads");
    const rocketsData = await fetchData("https://api.spacexdata.com/v4/rockets");

    for (const launch of launchData) {
        //launch["payloads"] =>  Array of payloads IDs
        //const payloads = launch["rocket"]["second_stage"]["payloads"];
        const payloads = launch["payloads"];
        
        //query to each payload ID and get customers
        const customers = flatMap(payloads, (payloadID: string) => {
            return payloadsData.filter((element: any) => element["id"]==payloadID)[0]["customers"];
        });
        
        const rocket = rocketsData.filter((element: any) => element["id"]==launch["rocket"])[0]["name"];
        /* console.log(customers);
        console.log(rocket);
        console.log("STOP HERE"); */

        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["name"],
            rocket: rocket,
            launchDate: launch["date_unix"],
            upcoming: launch["upcoming"],
            success: launch["success"],
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

export function getOne(id : number) {
    if (launches.has(id)) {
        return launches.get(id);
    }
    return null;
}

export function addOne(data : Launch) {
    launches.set(data.flightNumber, Object.assign(data, {
        upcoming: true,
        customers: ["Zero To Mastery","NASA"],
    }));
}

export function removeOne(id : number) {
    const aborted = launches.get(id);
    if (aborted) {
        aborted.upcoming = false;
        aborted.success = false;
    }
    return aborted;
}