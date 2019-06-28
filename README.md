# Build-Your-Own-Backend

## Countries

### GET /api/v1/countries

#### Response 

#### Status OK

#### Link: [http://localhost:3000/api/v1/countries]

`[
    {
        "id": 227,
        "country": "AT",
        "bike_id": 16,
        "created_at": "2019-06-26T17:33:44.309Z",
        "updated_at": "2019-06-26T17:33:44.309Z"
    },
    {
        "id": 226,
        "country": "DE",
        "bike_id": 16,
        "created_at": "2019-06-26T17:33:44.309Z",
        "updated_at": "2019-06-26T17:33:44.309Z"
    },
    {
        "id": 236,
        "country": "WS",
        "bike_id": 16,
        "created_at": "2019-06-26T17:33:44.317Z",
        "updated_at": "2019-06-26T17:33:44.317Z"
    }
   ] 
   `
   
   ### GET /api/v1/countries/:id

#### Response 

#### Status OK

#### Link: [http://localhost:3000/api/v1/countries/]

`[
    {
        "id": 17,
        "country": "DE",
        "city": "Nürnberg",
        "created_at": "2019-06-27T18:38:10.353Z",
        "updated_at": "2019-06-27T18:38:10.353Z"
    }
]
`

#### Status 404 Not found

#### Link: [http://localhost:3000/api/v1/countries/17567]

`{
    "error": "Could not find country with id: 17567"
}`



   

