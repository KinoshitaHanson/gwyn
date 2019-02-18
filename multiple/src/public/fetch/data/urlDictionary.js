import * as conf from 'public/config/api';

const TDL =
  /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/.test(location.host) || location.host.indexOf(
      'localhost') > -1 ? conf.TDL : location.host
      .split('.')
      .slice(-2)
      .join('.');

export const URL_ENUM = {
    BASE_DATA: 'javaBd',
    APP_ADMIN: 'appAdmin',
    USER: 'user',
    ORDER: 'javaOrder',
    AGENCY: 'agency',
    INFO_API: 'infoApi',
    CHAT_REPORT: 'chatReportApi',
    RP_RAIN: 'rpRain',
    TRADE: 'javaTride',
    CJK: 'javaCjk',
    MASTER: 'javaMaster',
    HD: 'javaHd'
};

export const urlDictionary = {
    [URL_ENUM.BASE_DATA]: `//bd-api.${TDL}/basedata/public/securityMobileHandler`,
    [URL_ENUM.APP_ADMIN]: `//appadmin-api.${TDL}/public/station/securityMobileHandler`,
    [URL_ENUM.USER]: `//user-api.${TDL}/user/public/safeMobileHandler`,
    [URL_ENUM.ORDER]: `//order-api.${TDL}/order/public/securityApiHandler.do`,
    [URL_ENUM.AGENCY]: `//agency-api.${TDL}/agency/public/securityMobileHandler`,
    [URL_ENUM.INFO_API]: `//info-api.${TDL}/info/public/safeMobileHandler.do`,
    [URL_ENUM.CHAT_REPORT]: `//chat.${TDL}/chat/public/complaint.do`,
    [URL_ENUM.RP_RAIN]: `//activity-api-rp-rain.${TDL}/activity/public/mobileHandler.do`, // 红包雨
    [URL_ENUM.TRADE]: `//trade-api.${TDL}/trade/public/securityApiHandler.do`, // 交易
    [URL_ENUM.CJK]: `//rp-api.${TDL}/redpacket/public/handselMobileHandler.do`, // 彩金卡
    [URL_ENUM.MASTER]: `//master-api.${TDL}/master/public/securityMobileHandler.do`, // 大神
    [URL_ENUM.HD]: `//act-api.${TDL}/public/user/securityMobileHandler.do`, // 活动
};

