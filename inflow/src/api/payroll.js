import apiClient from "@/api/axios";

apiClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

/* 1. 사원별 연월별 급여 명세서 조회 */
export const getPaymentByEmployeeIdAndYearAndMonth = async(eid, year, month) => {
  if (!eid || !year || !month) {
    throw new Error(`유효하지 않은 파라미터: eid=${eid}, year=${year}, month=${month}`);
  }
  try {
    const response = await apiClient.get(`/payrolls/details/${eid}`, {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    console.error('getPaymentByEmployeeIdAndYearAndMonth 에러: ', error);
    throw error;
  }
};

export const getAllPayments = async(employeeId, page) => {
  if (!employeeId || !page) {
    throw new Error(`유효하지 않은 파라미터: employeeId=${employeeId}, page=${page}`);
  }
  try {
    const response = await apiClient.get(`/payrolls/all/${employeeId}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('getAllPayments 에러: ', error);
    throw error;
  }
};

export const getEstimateWorkingDays = async(employeeId) => {
  if (!employeeId) {
    throw new Error(`유효하지 않은 파라미터: employeeId=${employeeId}`);
  }
  try {
    const response = await apiClient.get(`/severance-pay/estimate/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('getEstimateWorkingDays 에러: ', error);
    throw error;
  }
};

export const calculateSeverancePay = async(employeeId) => {
  if (!employeeId) {
    throw new Error(`유효하지 않은 파라미터: employeeId=${employeeId}`);
  }
  try {
    const response = await apiClient.get(`/severance-pay/calculate/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('calculateSeverancePay 에러: ', error);
    throw error;
  }
};
