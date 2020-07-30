# Ecommerce

## POST /user/login
Login to BUY products

### Properties
- email (string)
- password (string)

### Response
Status 200
``` javascript
{
  "msg": "successfully login",
  "token": "<user_token>"
}
```
Status 400
``` javascript
{
    "errors": [
      "error name"
    ]
}
```

Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## Register /user/register
Register to BUY products

### Properties
- email (string)
- password (string)

### Response
Status 200
``` javascript
{
  "msg": "successfully register"
}
```
Status 400
``` javascript
{
    "errors": [
      "error name"
    ]
}
```

Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## GET /shops
Display All product

### Response
Status 200
``` javascript
{
    "data": {
        "id": "user_id",
        "name": "name",
        "image_url": "image_url",
        "stock": 10,
        "price": 10000
        "createdAt": "2020-07-20T11:12:05.376Z",
        "updatedAt": "2020-07-20T11:13:16.220Z"
    }
}
```
Status 400
``` javascript
{
    "errors": [
      "error_name"
    ]
}
```
Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## POST /shops/id
Add user Product to cart

### Properties
- userId (Integer)
- productId (Integer)
- status (Boolean)
- quantity (Integer)

## Request Header
``` javascript
{
   "token" : "<user_token>" 
}
```

## Request Params
- id (integer)

## Request Body
``` javascript
{
  "data": {
    "userId": (Integer),
    "productId": (Integer),
    "status": (Boolean),
    "quantity": (Integer),
  }
}
```

### Response
Status 201
``` javascript
{
    "data": {
        "id": "user_id",
        "userId": "userId",
        "productId": "productId",
        "status": "status",
        "quantity": "quantity",
        "createdAt": "2020-07-20T11:12:05.376Z",
        "updatedAt": "2020-07-20T11:13:16.220Z"
    }
}
```
Status 400
``` javascript
{
    "errors": [
      "error_name"
    ]
}
```
Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## GET /shops/detail
Display User Cart

## Request Header
``` javascript
{
   "token" : "<user_token>" 
}
```

### Response
Status 200
``` javascript
{
    "data": [
        "id": "user_id",
        "userId": "userId",
        "productId": "productId",
        "status": "status",
        "quantity": "quantity",
        "createdAt": "2020-07-20T11:12:05.376Z",
        "updatedAt": "2020-07-20T11:13:16.220Z"
      ],
    "price": "price"
}
```
Status 400
``` javascript
{
    "errors": [
      "error_name"
    ]
}
```
Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## PUT /shops/detail/id
Update User Cart Quantity

### Properties
- Quantity (Integer)

## Request Params
- id (integer)

## Request Header
``` javascript
{
   "token" : "<user_token>" 
}
```

## Request Body
``` javascript
{
    "data": {
      "quantity": "quantity"
    }
}
```

### Response
Status 200
``` javascript
{
  msg:'successfully edit'
}
```
Status 400
``` javascript
{
    "errors": [
      "error_name"
    ]
}
```
Status 404
``` javascript
{
    "errors": [
      "ERROR! Not Found"
    ]
}
```

Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## DELETE /shops/detail/id
Delete User Cart

## Request Params
- id (integer)

## Request Header
``` javascript
{
   "token" : "<user_token>" 
}
```

## Request Params
``` javascript
{
  "id": "user_id",
}
```

### Response
Status 200
``` javascript
{
  msg:'successfully delete'
}
```
Status 400
``` javascript
{
    "errors": [
      "error_name"
    ]
}
```
Status 404
``` javascript
{
    "errors": [
      "ERROR! Not Found"
    ]
}
```

Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>

## POST /payment
Checkout User Cart

## Request Header
``` javascript
{
   "token" : "<user_token>" 
}
```

### Response
Status 200
``` javascript
[
    {
        "id": 3,
        "name": "Jordan 1 Retro High Bred Toe",
        "image_url": "https://stockx-360.imgix.net//Air-Jordan-1-Retro-High-Bred-Toe/Images/Air-Jordan-1-Retro-High-Bred-Toe/Lv2/img01.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1538080256",
        "price": 12000000,
        "stock": 148,
        "createdAt": "2020-07-30T01:31:54.884Z",
        "updatedAt": "2020-07-30T01:50:15.462Z"
    },
    {
        "id": 4,
        "name": "Adidas Yeezy Boost 350 V2 Zebra",
        "image_url": "https://stockx.imgix.net/Adidas-Yeezy-Boost-350-V2-Zebra-Product-1.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1578503931",
        "price": 7000000,
        "stock": 298,
        "createdAt": "2020-07-30T01:31:54.884Z",
        "updatedAt": "2020-07-30T01:50:26.156Z"
    },
    {
        "id": 5,
        "name": "Ace Canvas Printed Sneakers",
        "image_url": "https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/3b/P00365265.jpg",
        "price": 14000000,
        "stock": 78,
        "createdAt": "2020-07-30T01:31:54.884Z",
        "updatedAt": "2020-07-30T01:50:43.363Z"
    },
    {
        "id": 1,
        "name": "Balenciaga Triple S",
        "image_url": "https://www.balenciaga.com/66/11/11534492qi_12_a_f.jpg",
        "price": 15000000,
        "stock": 97,
        "createdAt": "2020-07-30T01:31:54.884Z",
        "updatedAt": "2020-07-30T01:51:54.268Z"
    },
    {
        "id": 2,
        "name": "Nike Kobe 10 Elite Low Opening Night",
        "image_url": "https://stockx-360.imgix.net//Nike-Kobe-10-Opening-Night/Images/Nike-Kobe-10-Opening-Night/Lv2/img01.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1582323566",
        "price": 6800000,
        "stock": 43,
        "createdAt": "2020-07-30T01:31:54.884Z",
        "updatedAt": "2020-07-30T04:10:47.425Z"
    }
]
```
Status 400
``` javascript
{
    "errors": [
      "error_name"
    ]
}
```
Status 404
``` javascript
{
    "errors": [
      "ERROR! Not Found"
    ]
}
```

Status 500
``` javascript
{
    "errors": {
      "internal server error"
    }
}
```
<br>
