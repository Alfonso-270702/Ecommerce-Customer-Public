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
