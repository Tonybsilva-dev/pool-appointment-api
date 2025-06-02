import { PrismaClient, Prisma } from '@prisma/client';

export const softDeleteMiddleware = async (params, next) => {
  if (params.model === 'User') {
    const deletedData = {
      deletedAt: new Date(),
      status: 'INACTIVE',
    };

    if (params.action === 'delete') {
      params.action = 'update';
      params.args['data'] = deletedData;
    }

    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (!params.args.data) {
        params.args['data'] = {};
      }
      params.args.data = {
        ...params.args.data,
        ...deletedData,
      };
    }
  }

  return next(params);
};