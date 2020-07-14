import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});

export default dynamodb;