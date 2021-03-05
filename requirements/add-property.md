# Create Property
>> ## Models

### Property Category Model
 - **id** (number)
 - **description** (string)
 
### Property Type Model
 - **idCategory** (number)
 - **id** (number)
 - **description** (string)

### Localization Model
- **Zipcode** (string)
- **Street** (string)
- **Number** (number)
- **Complement** (string)
- **Neighborhood** (string)
- **State** (string)
- **City** (string)

### Property Model
- **Title** (string)
- **Description** (string)
- **Rent** (boolean)
- **Rent Price** (number) - **should be mandatory if the Rent field is true**
- **Sale** (boolean)
- **Sale Price ** (number) -  **should be mandatory if the Sale field is true**
- **Category** (PropertyCategoryModel)
Example:
 id: 1, description: Imóvel Residencial
 id: 2,  description: Comercial/Industrial
 id: 3,  description: Terreno
 
- **Type** (PropertyTypeModel) - Property Type
Example:
idCategory: 1, id: 1, description: Casa
idCategory: 1, id: 2, description: Apartamento 

- **Current Tribute Paid ** (boolean)
- **Tribute Belongs Owner ** (boolean)
- **Tribute** (IPTU) (number?)
- **Registered House Plan**(boolean)
- **Property Age**(number?)
- **Condominium** (number?)
- **Deed** (number?)
- **Suites** (number?)
- **Bathrooms** (number?)
- **Rooms** (number?)
- **Garage** (number?)
- **Garage Covered** (number?)
- **Area Total** (number?)
- **Area Util** (number?)
- **Air Conditioner** (boolean)
- **Bar** (boolean)
- **Library** (boolean)
- **Barbecue Grill** (boolean)
- **American Kitchen** (boolean)
- **Fitted Kitchen** (boolean)
- **Pantry** (boolean)
- **Edicule** (boolean)
- **Office** (boolean)
- **Bathtub** (boolean)
- **Fireplace** (boolean)
- **Lavatory** (boolean)
- **Furnished** (boolean)
- **Pool** (boolean)
- **Steam Room** (boolean)
- **Created at** (boolean)
- **Updated at** (boolean)



>> ## Success Case

1. ⛔ Receive a **POST** request on route **/api/properties**
2. ⛔ Validates if the request was made by an **admin**
3. ⛔ Validates mandatory data
4. ⛔ **Create** a poll with the data provided
5. ⛔ Returns **204**, without data

> ## Exceptions

1. ⛔ Returns error **404** if the API does not exist
2. ⛔ Returns error **403** if the user is not admin
3. ⛔ Returns error **400** if mandatory data are not provided by the client
4. ⛔ Returns error **500** if there is an error when trying to create the property
