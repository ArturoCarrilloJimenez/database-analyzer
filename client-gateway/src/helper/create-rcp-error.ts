import { RpcException } from '@nestjs/microservices';

export function createRpcError(error: any): RpcException {
  if (error instanceof RpcException) {
    return error;
  }

  if (error instanceof Error) {
    return new RpcException({ status: 500, message: error.message });
  }

  if (typeof error === 'object' && error !== null) {
    return new RpcException(error);
  }

  return new RpcException({ status: 500, message: String(error) });
}
