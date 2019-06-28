# Build-Your-Own-Backend

Heroku deployment: [build-your-own-backend](https://sh-build-your-own-backend.herokuapp.com/api/v1/countries)

## Countries

### GET /api/v1/countries

#### Response 

#### Status OK

#### Link: `http://localhost:3000/api/v1/countries`

```
[  
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
    }    
]   
   ``` 
   
### GET /api/v1/countries/:id

#### Response 

#### Status OK

#### Link: `http://localhost:3000/api/v1/countries/17`

```
[
    {
        "id": 17,
        "country": "DE",
        "city": "Nürnberg",
        "created_at": "2019-06-27T18:38:10.353Z",
        "updated_at": "2019-06-27T18:38:10.353Z"
    }
]
```

#### Response

#### Status 404 Not found

#### Link: `http://localhost:3000/api/v1/countries/17567`

```
{  
    "error": "Could not find country with id: 17567"  
}  
```

## Bikes

### GET /api/v1/bikes

#### Response 

#### Status OK

#### Link: `http://localhost:3000/api/v1/bikes`

```
[  
    {  
        "id": 46,    
        "bike_name": "NorisBike",   
        "country_id": 17,  
        "created_at": "2019-06-27T18:38:10.370Z",  
        "updated_at": "2019-06-27T18:38:10.370Z"  
    },  
    {  
        "id": 56,  
        "bike_name": "SiXT",  
        "country_id": 18,  
        "created_at": "2019-06-27T18:38:10.378Z",  
        "updated_at": "2019-06-27T18:38:10.378Z"  
    }  
  ]
  ```
  
### GET /api/v1/bikes/:id

#### Response 

#### Status OK

#### Link: `http://localhost:3000/api/v1/bikes/86`

```
[  
    {  
        "id": 86,  
        "bike_name": "Enna",  
        "country_id": 30,  
        "created_at": "2019-06-27T18:38:10.391Z",  
        "updated_at": "2019-06-27T18:38:10.391Z"  
    }  
]  
```

#### Response

#### Status 404 Not found

#### Link: `http://localhost:3000/api/v1/bikes/999`

```
{  
    "error": "Could not find bike with id: 999"  
}
```

## Countries

### POST /api/v1/countries

#### Link: `http://localhost:3000/api/v1/countries`

#### Required Parameters:

| Name         | Type           | Description   |
| :---         |     :---:      |          ---: |
| country      | string         | country name  |
| city         | string         | city name     |

##### Example:

```
{  
    "country": "GY", "city": "aserefssz" 
}
```

#### Response 

#### Status 201 Created

```
{   
"id": 34   
}
```

## Bikes

### POST /api/v1/bikes

#### Link: `http://localhost:3000/api/v1/bikes`

#### Required Parameters:

| Name         | Type           | Description   |
| :---         |     :---:      |          ---: |
| country      | string         | country name  |
| city         | string         | city name     |

##### Example:

```
{   
    "country": "GY",   
    "city": "aserefssz"   
}
```

#### Response 

#### Status 201 Created

```
{   
"id": 34   
}
```

## Countries

### DELETE /api/v1/countries/:id

#### Response 

#### Status 200 OK

#### Link: `http://localhost:3000/api/v1/countries/60`

```
"Deleted country 'TT' with id 60"
```

#### Response

#### Status 404 Not found

#### Link: `http://localhost:3000/api/v1/countries/60989`

```
{  
    "error": "Could not find country with an id: 60989"    
}
```





   

