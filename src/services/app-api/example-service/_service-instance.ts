import { createAxiosService } from '@/libs/axios';
import { appApiIns } from '../api-instance';

const examService = createAxiosService(appApiIns, '/api');

export const fetchAll = () => examService.get('/all');
