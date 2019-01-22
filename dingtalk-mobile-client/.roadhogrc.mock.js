import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {

};

export default (noProxy
  ? {
      'POST /api/(.*)': '/server/api/index/',
      'PUT /api/(.*)': '/server/api/index/',
      'DELETE /api/(.*)': '/server/api/index/',
      'GET /api/(.*)': '/server/api/index/',
    }
  : delay(proxy, 1000));
