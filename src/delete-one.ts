import db from '../dynamo';
import { ApiGatewayReq, ApiGatewayResp } from './types';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';



export const handler = async (event: ApiGatewayReq) : Promise <ApiGatewayResp> => {

  try {
    const requestedTaskId = event.pathParameters?.id;

    if (!requestedTaskId) {
      return { 
        statusCode: 400, 
        header: {
          'Content-Type': 'text/plain'
        },
        body: `Error: You are missing the path parameter id` };
    }

    const params = {
      TableName: TABLE_NAME,
      Key: {
        [PRIMARY_KEY]: requestedTaskId
      }
    };

    await db.delete(params).promise();

    return { 
      statusCode: 200,
      header: {
        'Content-Type': 'text/plain'
      },
      body: '' };

  } catch (error) {
    console.log(error)
    return { 
      statusCode: 500,
      header: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(error) };
  }
};