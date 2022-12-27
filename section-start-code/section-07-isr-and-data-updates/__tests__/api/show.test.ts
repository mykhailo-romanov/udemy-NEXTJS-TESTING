import { testApiHandler } from "next-test-api-route-handler";

import { readFakeData } from "../__mocks__/fakeData";

import showsHandler from "../../pages/api/shows/index";
import showID from "../../pages/api/shows/[showId]";


it('test api api/shows', async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET'});
      expect(res.status).toBe(200);

      const json = await res.json();

      const { fakeShows } = await readFakeData();
      expect(json).toEqual({shows: fakeShows});

    }
  });
})

  it('test api api/shows ID', async () => {
    await testApiHandler({
      handler: showID,
      paramsPatcher: (params) => {
        params.showId = 0;
      },
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET'});
        expect(res.status).toBe(200);
  
        const json = await res.json();
  
        const { fakeShows } = await readFakeData();
        expect(json).toEqual({show: fakeShows[0]});
  
      }
    });

// //   // NTARH also supports typed response data via TypeScript generics:
// //   await testApiHandler<{ hello: string }>({
// //     // The next line would cause TypeScript to complain:
// //     // handler: (_, res) => res.status(200).send({ hello: false }),
// //     handler: (_, res) => res.status(200).send({ hello: 'world' }),
// //     requestPatcher: (req) => (req.headers = { key: process.env.SPECIAL_TOKEN }),
// //     test: async ({ fetch }) => {
// //       const res = await fetch({ method: 'POST', body: 'data' });
// //       // The next line would cause TypeScript to complain:
// //       // const { goodbye: hello } = await res.json();
// //       const { hello } = await res.json();
// //       expect(hello).toBe('world'); // ◄ Passes!
// //     }
//   });
})