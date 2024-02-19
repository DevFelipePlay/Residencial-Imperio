// import { apiMex } from '../apiMex';
// import { IReqPostImperioSendSms } from './IReqPostImperioSendSms';

// export const postImperioSendSms = async (req: IReqPostImperioSendSms) =>
//   (await apiMex.post('/shortcodeV2.aspx', req)).data;
// //

import { apiMex } from '../apiMex';
import { IReqPostImperioSendSms } from './IReqPostImperioSendSms';

export const getImperioSendSms = async (req: IReqPostImperioSendSms) => {
  const queryParams = `token=${req.token}&t=${req.t}&n=${req.n}&m=${req.m}`;

  // Concatenar os parâmetros da consulta à URL
  const apiUrl = `/shortcodeV2.aspx?${queryParams}`;

  // Fazer a requisição GET
  const response = await apiMex.get(apiUrl);

  return response.data;
};
