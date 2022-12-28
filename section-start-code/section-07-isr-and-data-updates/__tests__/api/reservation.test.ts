import { testApiHandler } from "next-test-api-route-handler";
import makeReservations from "@/pages/api/reservations/[reservationId]";
import reservations from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

test("test POST create new reservation", async () => {
  await testApiHandler({
    handler: makeReservations,
    paramsPatcher: (params) => {
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json", // Must use correct content type
        },
        body: JSON.stringify({
          showId: 0,
          userId: 1,
          seatCount: 5,
        }),
      });

      expect(res.status).toBe(201);
      // res.status(201).json({ reservation: { ...reservation, show } });
      const json = await res.json();
      expect(json.reservation).toHaveProperty('show');
      console.log(json);
      // expect(json.)

    },
  });

  
  await testApiHandler({
    handler: reservations,
    paramsPatcher: (params) => {
      params.userId = 1;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toEqual(200);

      const json = await res.json();
      // console.log(json)
      expect(json.userReservations).toHaveLength(3);
    },
  });
});
