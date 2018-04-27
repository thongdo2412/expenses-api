# Expenses Input API

Backend API for Expenses Input.

## Installation

This project requires Node.js v6 and up

```shell
# install yarn
npm install -g yarn

# install awscli
sudo pip install awscli

# configure aws cli. region: us-east-1, default output: json
aws configure

# install packages
yarn
```

## Start Service

```shell
# start the local Lambda, this one requires the aws-sam-local 0.2.4, install npm install -g aws-sam-local@0.2.4 - the latest sam version 0.2.11 won't work for current template.yml
yarn start

# get the Net Worth number!
curl -i -H "Accept: application/json" "localhost:3000/api/expense{'email':'replace with-email-address'}" 
```

## Testing

```shell
# lint
yarn lint

# test
yarn test
```

## Endpoints

| Endpoint | Methods | Descriptions
| --- | --- | --- |
| /getexpenses | POST | get expenses based on email |
| /addexpense | POST | add expense to DB |

## Notes
The API is hosted by AWS Lambda (Public API)

and it will work with curl or httpie with the body param

The architecture is Serverless Application Model, utilizing AWS microservices: S3, CF, APIGateway, Lambda (Node.js as backend language), DynamoDB as DB

DynamoDB has the schema:

- email address (hash key)
- added_date (range key) - this is generated when the item is added to DB
- value of the expense
- date of expense
- reason of the expense

## TODO

- Need to build UI with SPA framework for this API. The UI will have the email address logged in at first, and the form to add expense with at least 3 input fields: value of the expense, date of the expense, reason of the expense
- Need to add user-pool with AWS Cognito and therefore add API key for the API
