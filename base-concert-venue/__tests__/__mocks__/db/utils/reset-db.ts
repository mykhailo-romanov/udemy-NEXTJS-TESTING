import { readFakeData } from "../../fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

export const resetDB = async () => {
    const safeToReset = process.env.NODE_ENV === "test";

    if (!safeToReset) {
        console.log("WARNING NOT TEST ENV")

        return;
    }

    const { fakeShows, fakeBands, fakeReservations, fakeUsers } = await readFakeData();

    //overwrite data in files
    await Promise.all([
        writeJSONToFile(filenames.bands, fakeBands),
        writeJSONToFile(filenames.shows, fakeShows),
        writeJSONToFile(filenames.reservations, fakeReservations),
        writeJSONToFile(filenames.users, fakeUsers),
    ])
}