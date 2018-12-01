// 判断大盘的涨跌
import { completeNum, formatDate } from './tool';

// 判断开盘时间

class Rest {
    openTime = {}

    tradeTime: {}

    isOpening(contract) {
        if (!contract) return false;

        if (this.isHoliday(contract)) {
            return false;
        }

        const now = new Date();
        // console.log(contract);
        const nowStr = formatDate('h:i', { date: now });

        if (now.getDay() === 6) {
            const nnClose = removeSecond(contract.niteCloseTime);

            if (nnClose > '12:00' || nowStr > nnClose) {
                return false;
            }
        }

        const amStart = removeSecond(contract.amOpenTime);
        const pmStart = removeSecond(contract.pmOpenTime);
        if (now.getDay() === 1) {
            if (nowStr < amStart) return false;
            if (amStart === '00:00' && nowStr < pmStart) return false;
        }

        if (!this.openTime[contract.code]) {
            this.openTime[contract.code] = this.getAllPoint(contract, false);
        }
        return this.openTime[contract.code].indexOf(nowStr) !== -1;
    }

    getAllPoint(contract, isTrade) {
        let amOpen; let amClose; let pmOpen; let pmClose; let nnOpen; let nnClose; const total = []; let
            all = [];
        if (isTrade) {
            amOpen = removeSecond(contract.amTradeTime);
            amClose = removeSecond(contract.amClearingTime);
            pmOpen = removeSecond(contract.pmTradeTime);
            pmClose = removeSecond(contract.pmClearingTime);
            nnOpen = removeSecond(contract.niteTradeTime);
            nnClose = removeSecond(contract.niteClearingTime);
        } else {
            amOpen = removeSecond(contract.amOpenTime);
            amClose = removeSecond(contract.amCloseTime);
            pmOpen = removeSecond(contract.pmOpenTime);
            pmClose = removeSecond(contract.pmCloseTime);
            nnOpen = removeSecond(contract.niteOpenTime);
            nnClose = removeSecond(contract.niteCloseTime);
        }

        let start; let end; let hour; let minute; let
            timeStr = '';
        for (let i = 0; i < 1440; i++) {
            hour = 0;
            minute = i % 60;
            if (i >= 60) {
                hour = (i - minute).div(60);
            }
            timeStr = `${completeNum(hour)}:${completeNum(minute)}`;
            total.push(timeStr);
        }
        if (!!amOpen && !!amClose) {
            start = total.indexOf(amOpen);
            end = total.indexOf(amClose);
            all = all.concat(total.slice(start, end + 1));
        }
        if (!!pmOpen && !!pmClose) {
            start = total.indexOf(pmOpen);
            end = total.indexOf(pmClose);
            all = all.concat(total.slice(start, end + 1));
        }
        if (!!nnOpen && !!nnClose) {
            start = total.indexOf(nnOpen);
            end = total.indexOf(nnClose);
            if (end >= start) {
                all = all.concat(total.slice(start, end + 1));
            } else {
                all = all.concat(total.slice(start, total.length + 1));
                all = all.concat(total.slice(0, end + 1));
            }
        }

        return all.unique();
    }

    isHoliday(contract) {
        let result = null; let holiday = contract.holiday; const
            data = new Date();
        let timeScope; let arr; let start; let
            end;
        if (holiday !== '' && holiday !== undefined) {
            holiday = holiday.split(';');
            result = holiday.find((e) => {
                timeScope = e.trim();
                if (timeScope !== '') {
                    arr = timeScope.split(',');
                    start = new Date(arr[0].trim());
                    end = new Date(arr[1].trim());
                    return data.getTime() > start.getTime() && data.getTime() < end.getTime();
                }
                return false;
            });
        }
        if (result === undefined) result = false;

        if (result === null) result = false;

        if (result !== false) result = result.trim().split(',').shift();

        return result;
    }
}


function removeSecond(str) {
    const val = str.valueOf();
    const l = val.split(':');
    let t = null;
    if (l.length === 3) {
        t = `${l[0]}:${l[1]}`;
    } else {
        t = val;
    }
    return t;
}
const rest = new Rest();
export default rest;
