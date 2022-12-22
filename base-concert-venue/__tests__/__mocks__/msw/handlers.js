import { rest } from 'msw'

import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations.ts";

export const handlers = [
    rest.get('http://localhost:3000/api/shows/:showId', async (req, res, context) => {

        const { fakeShows } = await readFakeData();
        const { showId } = req.params
        // if id === 0 - shows display, id === 1 no shows display 
        return res(context.json({show: fakeShows[Number(showId)]}));
    }),

    rest.get('http://localhost:3000/api/users/:userId/reservations', async (req, res, context) => {
        const { userId } = req.params;
        // if id > 0 fakeUsers else id === 0, empty []
        return res(context.json({userReservations: userId > 0 ? fakeUserReservations : []}))
    })
];