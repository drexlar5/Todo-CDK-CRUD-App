export type Header = {
  'Content-Type': 'text/plain'
}

export type Todo = {
  content: string
  PRIMARY_KEY?: string
}

type PathId = { id: string };

export type ApiGatewayReq = {
  header: Header,
  pathParameters: PathId
}

export type ApiGatewayResp = {
  statusCode: number,
  header: Header,
  body: string
}