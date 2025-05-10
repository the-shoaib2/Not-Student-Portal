import { proxyRequest } from './proxyUtils';
import { Semester } from './proxy-api';

const semesterService = {
  getSemesterList: async (): Promise<Semester[] | null> => {
    try {
      const token = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger/semesterList',
        headers: {
          'Accept': '*/*'
        }
      });

      return token;
    } catch (error) {
      console.error('Error fetching semester list:', error);
      return null;
    }
  },
};

export default semesterService;
