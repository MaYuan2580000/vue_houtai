import requset from '../utils/request'
import qs from 'qs'; //jquey

//登录接口
export const getlogin = (userName, pwd) => {
  return requset({
    method: 'get',
    url: '/winchem/loginController/login',
    params: {
      userName: userName,
      pwd: pwd
    }
  });
};

//查询公司集合接口
export const queryCompany = data => {
  return requset({
    method: 'get',
    url: '/winchem/reportController/queryCompany',
    params: data
  });
};
//查询部门集合接口
export const queryDepartment = (parentId) => {
  return requset({
    method: 'get',
    url: '/winchem/reportController/queryDepartment',
    params: {
      parentId: parentId
    }
  });
};
//拆装机列表展示的接口
export const getList = (companyId, departmentId, queryTime, userName, userCode) => {
  return requset({
    method: 'post',
    url: '/winchem/reportController/queryDismountingMachine',
    data: {
      companyId,
      departmentId,
      queryTime,
      userName,
      userCode
    }
  });
};

//拆装机当月详情的
export const dealiList = (name, queryTime) => {
  return requset({
    method: 'get',
    url: '/winchem/reportController/queryDismountingMachineDetails',
    params: {
      name: name,
      queryTime: queryTime,

    }
  });
};

//实收款列表展示的接口
export const priceList = (companyId, departmentId, queryTime, name, userCode) => {
  return requset({
    method: 'post',
    url: '/winchem/reportController/queryReceivables',
    data: {
      companyId,
      departmentId,
      queryTime,
      name,
      userCode
    }
  });
};

//实收款当月详情的
export const priceDelai = (name, queryTime) => {
  return requset({
    method: 'get',                  
    url: '/winchem/reportController/queryReceivablesDetails',
    params: {
      name: name,
      queryTime: queryTime,

    }
  });
};

