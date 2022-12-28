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

      // const { fakeShows } = await readFakeData();
      // expect(json).toEqual({shows: fakeShows});

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
  
        // const { fakeShows } = await readFakeData();
        // expect(json).toEqual({show: fakeShows[0]});
  
      }
    });
})


it('NEW 401 test with not valid Secret', async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = {secret: "not real secret"};
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'POST'});
      expect(res.status).toBe(401);

      // const json = await res.json();

      // const { fakeShows } = await readFakeData();
      // expect(json).toEqual({show: fakeShows[0]});

    }
  });
})