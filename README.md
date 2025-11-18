# BlogAPI

BlogAPI provides the backend API for these projects: 
1. https://github.com/JKanaiya/BlogAPIReader
2. https://github.com/JKanaiya/BlogWriter

## Usage

### Setup

1. Clone the repo
```bash
git clone https://github.com/JKanaiya/BlogAPI
cd BlogAPI
```
2. Install dependencies
```bash
npm install
```
3. Create and configure .env
```bash

echo "DATABASE_URL=<your_database_url> SECRET=<your_secret>" >> .env
```
4. Run the development server
```bash
npm run dev
```


## API Endpoints
### GET
|  Endpoint      |     Purpose   |
| ------------- | ------------- |
|   `/posts` | *get all available posts*|
|   `/log-out` | *logs the user out*|


### POST
|  Endpoint      |     Purpose   |
| ------------- | ------------- |
|   `/log-in` | *attempts to login the user with their email and password*|
|   `/sign-up` | *attempts to register the user with a provided email and password*|
|   `/comment` | *attempt to add a comment to its (specified?) parent*|
|   `/post` | **Writer Only**, *Attempt to create a post*|
|   `/update-post` | **Writer Only**, *Attempt to update a post*|
|   `/delete-comment` | **Writer Only**, *Attempt to delete a post*|


### PATCH
|  Endpoint      |     Purpose   |
| ------------- | ------------- |
|   `/comment` | *attempts to update a comment, this includes deleting the text in a comment*|

### DELETE
|  Endpoint      |     Purpose   |
| ------------- | ------------- |
|   `/post` | *attempts to delete a comment *|


--------
Features

- User authentication with JWT
- Error handling and validation
- Blog post management with create/update functionality
- 
- Comments    
    - Nested Comments
    - Editing Comments
    - Deleting Comment Text

License
-------

The project is licensed under the GPL license.

