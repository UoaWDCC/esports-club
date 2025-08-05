for the basics see
https://nextjs.org/docs/app/api-reference/file-conventions/route

in this repository, our standard api response is standardise with a route wrapper that passes session along side with request
see [wrapper.ts](../../libs/api/wrappers.ts)

there are 3 total wrappers with different level of access control
- routeWrapper, no authentication
- userRouteWrapper, login required
- staffRouteWrapper, login required + staff access 

### Example
```ts
export const GET = routeWrapper(async (req, session, context: RouteContext<"id">) => {
    const { id } = await context?.params;

    return NextResponse.json({
        message: "Hello from Next.js! This is a public route",
    });
});

```

reading collection

`route.all/` - getting all item of a collection
`route.get/` - getting a single item via some conditions
`route.list/` - getting an array of items via some conditions

creating collection

`route.create/` - creating an object of a collection

updating collection

`route.update/` - 

deleting collection

`route.delete/` - 