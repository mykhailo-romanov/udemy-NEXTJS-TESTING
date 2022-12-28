import bands from "@/pages/api/bands/index";
import { testApiHandler } from "next-test-api-route-handler";

test("last Band test with 401 secret error !KEK YRAAA", async ()=> {
    await testApiHandler({
        handler: bands,
        paramsPatcher: (params) => {
            params.queryStringURLParams = {secret: "not real secret"};
        },
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST"})

            expect(res.status).toBe(401);
            const json = await res.json()

            // console.log(json)
            expect(json.message).toEqual('Invalid revalidation token')
        }
    })
})