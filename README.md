# A demo for Persnickety

https://github.com/miikaah/persnickety

Checkout and run `npm i && npm start`

Navigate to http://localhost:3001/api-docs to see SwaggerUI.

Navigate to http://localhost:3001/docs to see the generated OAS3 spec

Test curls

These work

```
curl -X PUT "http://localhost:3001/product/asd?randomizeSecondaryColor=true&optionalQueryParam=123" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"size\":\"string\",\"mainColor\":\"string\",\"secondaryColor\":\"asd\"}"

curl -X PUT "http://localhost:3001/product/asd?randomizeSecondaryColor=true" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"size\":\"string\",\"mainColor\":\"string\",\"secondaryColor\":\"asd\"}"
```

Fails on secondaryColor

```
curl -X PUT "http://localhost:3001/product/asd?randomizeSecondaryColor=true&optionalQueryParam=123" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"size\":\"string\",\"mainColor\":\"string\",\"secondaryColor\":0}"
```

Fails on optionalQueryParam

```
curl -X PUT "http://localhost:3001/product/asd?randomizeSecondaryColor=true&optionalQueryParam=asd" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"size\":\"string\",\"mainColor\":\"string\",\"secondaryColor\":0}"
```
