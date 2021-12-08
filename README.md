## Payments-App

Practice React-Project to learn testing of React-Apps using React Testing Library, Jest & Cypress

### Commands :

    1. npm i -g yarn
    2. yarn install
    3. yarn dev

### Sample Creds :

    username : johndoe
    password : s3cret

### Types of testing :

    1. Unit Testing
    2. Integration Testing
    3. End-to-End Testing ( Cypress )

### Testing Priority:

    1. High Value Features should be tested first
    2. Edge Cases in high Value Features ( find out sad paths of features )
    3. Things that are easy to break
    4. Basic React Testing
    	- user interactions
    	- conditional rendering
    	- utils / hooks

### While Writing test follow this pattern:

    1. Arrange ( getting the components , providing props if needed)
    2. Act ( perform user events like clicking , typing and all)
    3. test ( create assertions )

### Command to run unit/integration tests :

     1. yarn test

### Cypress for end to end testing :

    1. yarn add -D cypress @testing-library/cypress
    2. yarn run cypress open
