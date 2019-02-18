import { browser } from 'public/utils/browser';
// import { getParamsCode } from 'public/utils/getParamsCode';
import DownloadGuide from 'public/components/download-guide';
import { getTDL } from '../utils/utils';
import bridge from '../bridge';

export default function (iosUrl, _cmdID, closeGuidCb) {
    // 如果是android的微信、QQ
    if (!(browser().ios || browser().iPhone || browser().iPad) && (browser().weixin || browser().QQBrowse)) {
        DownloadGuide(closeGuidCb);
    } else {
        if (browser().ios || browser().iPhone || browser().iPad) {
            // 苹果设备
            let downloadAddress;
            if (iosUrl) {
                downloadAddress = iosUrl;
            } else if (BRAND_CONFIG.iosDownloadUrl) {
                downloadAddress = BRAND_CONFIG.iosDownloadUrl;
            } else {
                return;
            }
            let elA = document.createElement('A');

            elA.href = downloadAddress;
            elA.setAttribute('target', '_blank');
            elA.click();

        } else {
            // 安卓设备
            let cmdID = _cmdID;
            let href;
            if (cmdID && cmdID.indexOf('://') > -1) {
                href = cmdID;
            } else {
                href = BRAND_CONFIG.androidDownloadUrl.replace('{TDL}', getTDL());
            }
            if (browser().isPureApp) {
                bridge.social.gotoBrowser(href);
            } else {
                location.href = href;
            }

        }
    }
}
