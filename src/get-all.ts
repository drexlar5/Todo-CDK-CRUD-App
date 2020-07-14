import db from '../dynamo';
import { ApiGatewayResp } from './types';

const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler = async (): Promise<ApiGatewayResp> => {

  try {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: ``,
    };

    const response = await db.query(params).promise();

    return {
      statusCode: 200,
      header: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(response.Items)
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      header: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(error)
    };
  }
};