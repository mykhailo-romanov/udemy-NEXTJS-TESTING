import { testApiHandler } from "next-test-api-route-handler";
import userAuth from "../../pages/api/users/index";
import reservations from "@/pages/api/users/[userId]/reservations"
import { validateToken } from "@/lib/auth/utils"
const kek = validateToken as jest.Mock
jest.mock("@/lib/auth/utils")

it ("test user reservation GET?", async () => {
    await testApiHandler({
        handler: reservations,
        paramsPatcher: (params)=>{
            params.userId = 1
        },
        test: async ({fetch}) => {
            const res = await fetch({
                method: "GET"
            })
            expect(res.status).toEqual(200);

            
            const json = await res.json();
            // console.log(json)
            expect(json.userReservations).toHaveLength(3);
        }
    })
})

it("test POST api auntifications", async () => {
  await testApiHandler({
    handler: userAuth,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json", // Must use correct content type
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test",
        }),
      });
      expect(res.status).toBe(200);

      const json = await res.json();
    //   console.log(json)
      expect(json.user.email).toEqual('test@test.test');
      expect(json.user.id).toEqual(1);
      expect(json.user).toHaveProperty("token")
    },
  });
});

it("test get reservation with not valid user 0 reservation expected", async ()=> {
    await testApiHandler({
        handler: reservations,
        paramsPatcher: (params) => {
            params.userId = 4324
        },
        test: async ({fetch}) => {
            const res = await fetch({ method: "GET" })
            const json = await res.json();

            expect(res.status).toBe(200);
            expect(json.userReservations).toHaveLength(0);
            // expect(json.message).toBe("user not authenticated");
        }
    })
})

it("NEW NOT AUTH TEST", async ()=> {
  kek.mockResolvedValue(false);
  await testApiHandler({
      handler: reservations,
      paramsPatcher: (params) => {
          params.userId = 4324
      },
      test: async ({fetch}) => {
          const res = await fetch({ method: "GET" })

          expect(res.status).toBe(401);
      }
  })
})