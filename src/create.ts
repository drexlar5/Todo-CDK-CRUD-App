import db from '../dynamo';
import { Header, Todo, ApiGatewayResp } from './types';
import {v4 as uuidv4} from 'uuid';

const TABLE_NAME = process.env.TABLE_NAME || '';

type ApiGatewayReq = {
  header: Header,
  body: string
}

const decodeBody = <Body>(body?: string): Body => {
  try {
    return JSON.parse(body as string);
  } catch (e) {
    throw { statusCode: 400, body: "Bad Request." };
  }
}


export const handler = async (event: ApiGatewayReq): Promise<ApiGatewayResp> => {

  try {
    let task = decodeBody<Todo>(event.body);

    task.PRIMARY_KEY = uuidv4();

    const params = {
      TableName: TABLE_NAME,
      Item: task
    };

    await db.put(params).promise();

    return { 
      statusCode: 201,
      header: {
        'Content-Type': 'text/plain'
      },
      body: '' 
    };

  } catch (error) {
    console.log(error);
    return { 
      statusCode: 500,
      header: {
        'Content-Type': 'text/plain'
      },
      body: "internal server error" 
    };
  }
};