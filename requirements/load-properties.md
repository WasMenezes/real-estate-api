# List Properties

>> ## Success Case

1. ⛔ Receive a **GET** request on route **/api/properties**
2. ⛔ If query params exists, validate according to the PropertiesFilterModel
2. ⛔ Validates if the request was made by a **user**
3. ⛔ Returns **204** if you have no poll
4. ⛔ Returns **200** with survey data

>> ## Exceptions

1. ⛔ Returns error **404 ** if the API does not exist
2. ⛔ Returns error **403 ** if not a user
3. ⛔ Returns error **500 ** if there is an error when trying to list the polls