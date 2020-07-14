import db from '../dynamo';
import { ApiGatewayReq, ApiGatewayResp, Todo } from './types';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

type ApiGatewayReqWithBody = ApiGatewayReq & {
  body: Todo
}

export const handler = async (event: ApiGatewayReqWithBody): Promise<ApiGatewayResp> => {
  
  try {

    const editedTaskId = event.pathParameters?.id;

    if (!editedTaskId) {
      return {
        statusCode: 400,
        header: {
          'Content-Type': 'text/plain'
        },
        body: 'NO ID PARAMETER'
      };
    }

    const editedTask = JSON.parse(event.body.content);

    const editedTaskProperties = Object.keys(editedTask);

    if (!editedTask || editedTaskProperties.length < 1) {
      return {
        statusCode: 400,
        header: {
          'Content-Type': 'text/plain'
        },
        body: 'no arguments provided'
      };
    }

    const firstProperty = editedTaskProperties.splice(0, 1);

    const params = {
      TableName: TABLE_NAME,
      Key: {
        [PRIMARY_KEY]: editedTaskId
      },
      UpdateExpression: `set ${firstProperty} = :${firstProperty}`,
      ExpressionAttributeValues: {
        [`:${firstProperty}`] : editedTask[`${firstProperty}`]
      },
      ReturnValues: 'UPDATED_NEW'
    }

    editedTaskProperties.forEach(property => {
      params.UpdateExpression += `, ${property} = :${property}`;
      params.ExpressionAttributeValues[`:${property}`] = editedTask[property];
    });

    await db.update(params).promise();

    return {
      statusCode: 204,
      header: {
        'Content-Type': 'text/plain'
      }, body: 'Task Upated.'
    };

  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      header: {
        'Content-Type': 'text/plain'
      },
      body: error
    };
  }
};