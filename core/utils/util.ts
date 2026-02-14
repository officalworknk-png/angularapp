import { Constants } from "./constants";
import { NumberFormatPipe } from "./pipes/pipe-tranform/number-format.pipe";
import { DatePipe } from '@angular/common';
import { DownlineNumerFormat } from "./pipes/pipe-tranform/downline.pipe";
import { RemoveSign } from "./pipes/pipe-tranform/removeSign.pipe";
declare var CryptoJS:any
export class Util extends Constants {

    static async storeState(key, value) {
        return localStorage.setItem(key, value);
    }
    static async removeState(key) {
        return localStorage.removeItem(key);
    }

    static getStore(key) {
        return localStorage.getItem(key);
    }

    /**
     * Default stake for betlslip
     */
    static frontend: [
        {
            price: 50,
            val: "+50"
        },
        {
            price: 100,
            val: "+100"
        }, {
            price: 500,
            val: "+500"
        }, {
            price: 1000,
            val: "+1000"
        }, {
            price: 5000,
            val: "+5000"
        }, {
            price: 10000,
            val: "+10000"
        }, {
            price: 25000,
            val: "+25000"
        },
    ]

    /**
     * Funtion is used to get the custom bet
     */
    static getCustomBet() {
        if (localStorage.getItem("customBet") == null) {
            return localStorage.setItem("customBet", JSON.stringify(this.frontend))
        }
        return localStorage.getItem("customBet");
    }

    /**
     * funtion to set Custom bet 
     * @param key 
     * @param value 
     */
    static setCustomBet(key, value) {
        return localStorage.setItem(key, value);
    }


    /**
     * Function to clear sotorage
     */
    static clearStore() {
        return localStorage.clear()
    }

    /**
     * This Function returns parse string into object formate
     * @param stringify 
     */
    static parse(stringify) {
        return JSON.parse(stringify);
    }

    /**
     * Function to get stringfy object
     * @param object 
     */
    static stringify(object) {
        return JSON.stringify(object);
    }

    /**
     * Funtion to get the new date();
     */
    static getDate() {
        return new Date();
    }

    static inspect() {
        function log(key, val) {
            // console.log(key, val)
        }
        function warn(key, val) {
            // console.warn(key, val)
        }
        function error(key, val) {
            // console.error(key, val)
        }
        return {
            log: log,
            warn: warn,
            error: error
        }
    }

    /**
     * Function to get the deep copy of object
     * @param {any} json 
     */
    static deepCopy(json: any) {
        return Util.parse(Util.stringify(json))
    }

    /**
     * Description : funtion to parse jwt token
     * @param token 
     */
    static parseJwt(token) {
        if (Util.isNullOrUndefined(token)) {
            Util.inspect().log("Token", payload);
            return;
        }
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var payload = Util.parse(jsonPayload);

        if (payload.sub) {
            payload.sub = Util.parse(payload.sub);
        } else {
            payload.sub = {
                roles: ''
            }
        }
        //Util.inspect().log("Token", payload);
        return {
            payload: payload
        }
    }

      /**
     * Description : funtion to parse jwt token
     * @param token 
     */
      static parseJwtBetReder(token) {
        if (Util.isNullOrUndefined(token)) {
            Util.inspect().log("Token", payload);
            return;
        }
        // console.log("TOKEN=======",token)

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var payload = Util.parse(jsonPayload);
        // console.log("TOKEN===++++====",payload)
        return {
            payload: payload
        }
    }


    static getsignature(token){
        let getvalue= token.split('.')[2];
         return getvalue
    }
    /**
     * Function to check string is null or undefined
     * @param {string} str 
     */
    static isNullOrUndefined(str: any) {
        if (str === null || str === "null") {
            return true;
        }
        if (str == undefined || str === "undefined") {
            return true;
        }
        if (str.length == 0) {
            return true;
        }
        return false;
    }

    /**
     * Funtion for pdf excel json for banking
     * @param {any} list 
     */
    static updateChildBankingListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Username = element.userName;
                // currentChild.phoneNo = element.phoneNo ? element.phoneNo: '-';
                currentChild.Balance = Math.round(element.balance);
                if(element.riskRating){currentChild.Rating = element.riskRating;}
                currentChild['Available D/W'] = element.availableDW;
                currentChild.Currency = element.currency;
                currentChild.Exposure = Math.round(element.exposure);
                currentChild.Rate = element.rate;
                currentChild.CreditRef = element.creditRef;
                currentChild.RefPnL = Math.round(element.refPnL * 10) / 10;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for downline
     * @param {any} list 
     */
    static updateDownlineChildUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Username = element.userName;
                currentChild.Currency = element.currency;
                currentChild.CreditRef = element.creditRef ? this.downlineNumberPipe(element.creditRef) : 0;
                currentChild.Balance = !isNaN(element.balance) ? this.downlineNumberPipe(element.balance) : 0;
                // currentChild.RefPnL = !isNaN(element.refPnL) ? Math.round(element.refPnL) : 0;
                currentChild.RefPnL = this.downlineNumberPipe(element.refPnL);

                currentChild.Exposure = !isNaN(element.exposure) ? this.downlineNumberPipe(element.exposure) : 0;
                currentChild.Rate = element.rate ? element.rate : 0;
                currentChild.AvailBal = !isNaN(element.availBal) ? this.downlineNumberPipe(element.availBal) : 0;
                currentChild.PlayerBalance = !isNaN(element.playerBalance) ? this.downlineNumberPipe(element.playerBalance) : 0;
                currentChild.Status = element.status;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for betlist
     * @param {any} list 
     */
    static updateBetListUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.PlayerId = element.playerName;
                currentChild.Parent = element.parent;
                currentChild.Currency = element.currency ? element.currency: '-';
                currentChild.roundId = element.roundId ? element.roundId :'-';
                currentChild.BetId = element.betId;
                currentChild.IpAddress = element.ipAddress ? element.ipAddress : '-'
                currentChild.Provider = element.eventTypeName ? element.eventTypeName :'-'
                currentChild.Game = element.eventName ? element.eventName : '-'
                currentChild.provider = element.eventTypeName;  //small p for casino
                //small g for casino
                currentChild.game = element.eventName ? element.eventName : '-';
                // currentChild.Market = element.marketName
                // currentChild.eventType = element.eventTypeName
                // currentChild.eventName = element.eventName
                currentChild.Market = element.eventTypeName + '>' + element.eventName + (element.marketName? ('>' + element.marketName): '');
                currentChild.Selection = (element.selectionName) ? element.selectionName : element.marketName;
                currentChild.Type = element.sideType;
                currentChild.BetResult = element.betResult ? element.betResult:'-';
                currentChild.OddReq = element.oddReq;
                currentChild.BetStake = element.owStakes ? element.owStakes : element.exchangeStakes;
                currentChild.Exposure = element.owExposure ? Math.round(element.owExposure * 10) / 10 : Math.round(element.exposure * 10) / 10;
                currentChild.ProfitAndLoss = element.owPnl ? (element.owPnl ? Math.round(element.owPnl * 10) / 10 : 0) : (element.pnl ? Math.round(element.pnl * 10) / 10 : 0);

                currentChild.BetTaken = element.placeDate;
                currentChild.PlaceTime = element.placeDate
                currentChild.UpdateAt = element.updateAt;

                currentChild.Status = element.orderStatus ? element.orderStatus : element.betResult
                currentChild.PLBetStake = element.exchangeStakes ? Math.round(element.exchangeStakes * 10) / 10 : 0;
                currentChild.PLExposure = element.exposure ? Math.round(element.exposure * 10) / 10 : 0;
                currentChild.PLProfitAndLoss = element.pnl ? Math.round(element.pnl * 10) / 10 : 0;
                updateChildDetails.push(currentChild);
            });
        }
        // console.log("-->",updateChildDetails)
        return updateChildDetails;
    }

       /**
     * Function for pdf excel json for betlist
     * @param {any} list 
     */
        static updateRiskmgmtBetListUserListForExport(list: any,isadminLevel) {
            let updateChildDetails: object[] = [];
            if (list) {
                list.forEach(element => {
                    let currentChild: any = {};
                    currentChild.PlayerId = element.playerName;
                    currentChild.Parent = element.parent;
                    currentChild.BetId = element.betId;
                    currentChild.IpAddress = element.ipAddress ? element.ipAddress : '-'
                    currentChild.Market = element.marketName + '>' + element.eventTypeName + '>' + element.eventName;
                    currentChild.Selection = (element.selectionName) ? element.selectionName : element.marketName;
                    currentChild.Type = element.sideType;
                    currentChild.OddReq = element.oddReq;
                    currentChild.BetStake = element.owStakes ? element.owStakes : element.exchangeStakes;
                    currentChild.Exposure = element.owExposure ? Math.round(element.owExposure * 10) / 10 : Math.round(element.exposure * 10) / 10;
                    currentChild.BetTaken = element.placeDate;
                    currentChild.Status = element.orderStatus ? element.orderStatus : element.betResult
                    currentChild.PLBetStake = element.exchangeStakes ? Math.round(element.exchangeStakes * 10) / 10 : 0;
                    currentChild.PLExposure = element.exposure ? Math.round(element.exposure * 10) / 10 : 0;
                    updateChildDetails.push(currentChild);
                });

                if(isadminLevel){
                    updateChildDetails.forEach((el:any)=>{
                        delete el.BetStake
                        delete el.Exposure
                    })
                }
            }
            return updateChildDetails;
        }

    /**
     * Funtion for pdf excel json for bethistory
     * @param {any} list 
     */
    static updateBetHistoryUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.BetId = element.id;
                currentChild.roundId = element.roundId ? element.roundId :'-'
                currentChild.Provider = element.eventTypeName ? element.eventTypeName :'-'
                currentChild.Game = element.eventName
                currentChild.provider = element.eventName //small p for casino
                currentChild.Market = element.marketName + '>' + element.eventTypeName + '>' + element.eventName;
                currentChild.game = element.marketName; //smalll etter  g market for casino format
                currentChild.Selection = element.selectionName ? element.selectionName : '-';
                // currentChild.OddReq = element.runs ? element.runs + '/' +  element.odds :element.odds;
                currentChild.Time = this.DateformatePipeformate(element.placeDate,'dd/MM/yyy HH:mm:ss')
                currentChild.BetStake = element.exchangeStake ?this.numberformatePipe(element.exchangeStake) : 0;
                currentChild.Exposure = element.exposure ? Math.round(element.exposure * 10) / 10 : 0;
                currentChild.PorfitAndLoss = element.profitNLose ? Number((element.profitNLose>0 ? '+':'-')+this.numberformatePipe(this.removeSignPipe(element.profitNLose))) : '-';

                currentChild.PL_Stake = element.plExchangeStake ? Math.round(element.plExchangeStake * 10) / 10 : 0;
                currentChild.PL_Exposure = element.plExposure ? Math.round(element.plExposure * 10) / 10 : 0;
                currentChild.PL_PorfitAndLoss = element.plProfitNLose ? Number((element.plProfitNLose>0 ? '+':'-')+this.numberformatePipe(this.removeSignPipe(element.plProfitNLose))) : '-';
                currentChild.Type = element.sideTypeName;
                currentChild.BetTaken = this.DateformatePipeformate(element.placeDate,'dd/MM/yyy HH:mm:ss')
                currentChild.OddReq = element.oddReq ? element.oddReq : element.odds;
                currentChild.BetResult = element.betResult ? element.betResult : '-';
                currentChild.Remark = element.voidRemarks
                currentChild.Status = element.orderStatus ? element.orderStatus : element.betResult;
                currentChild.IpAddress = element.ipAddress ? element.ipAddress : '-'
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for profit and loss
     * @param {any} list 
     */
    static updateProfitAndLossUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.BetId = element.id;
                currentChild.Provider = element.eventTypeName ? element.eventTypeName :'-'
                currentChild.Game = element.eventName
                currentChild.BetStake = element.exchangeStake ? Number(element.exchangeStake) : 0;
                currentChild.Market = element.marketType + '>' + element.eventTypeName + '>' + element.eventName;
                // currentChild.ProfitAndLoss = (element.profitNLoss ? Math.round(element.profitNLoss * 10) / 10 : element.netProfitNLoss ? element.netProfitNLoss : 0);
                currentChild.MarketName = element.marketName
                currentChild.PlaceTime = this.DateformatePipeformate(element.placeDate,'dd/MM/yyy HH:mm:ss')
                currentChild.StartTime = this.DateformatePipeformate(element.marketTime,'dd/MM/yyy HH:mm:ss')
                currentChild.SettleTime = this.DateformatePipeformate(element.settleTime,'dd/MM/yyy HH:mm:ss')
                currentChild.Result = element.result
                currentChild.OwnerPnl = element.netMarketTotal? (!isNaN(element.netMarketTotal) ? Math.round(element.netMarketTotal * 10) / 10 : 0): Math.round(element.ownerProfitNLoss * 10)/10 
                currentChild.Odds = element.odds ? element.odds : '-'
                currentChild.PlayerPnL = element.profitNLoss? Number((element.profitNLoss>0 ? '+':'-')+this.numberformatePipe(this.removeSignPipe(element.profitNLoss))) :0
                // currentChild.Pl = !isNaN(element.netProfitNLoss) ? Math.round(element.netProfitNLoss * 10) / 10 : 0
                currentChild.Status = element.betResult ? element.betResult : '-'
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for profit and loss for expended table
     * @param {any} list 
     */
    static updatesportProfitAndLossUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Market = element.marketType + '>' + element.eventTypeName + '>' + element.eventName;
                currentChild.StartTime = this.DateformatePipeformate(element.marketTime,'dd/MM/yyy HH:mm:ss');
                currentChild.SettleTime = this.DateformatePipeformate(element.settleTime,'dd/MM/yyy HH:mm:ss');
                currentChild.Result = element.result
                currentChild.OwnerPnl = !isNaN(element.netMarketTotal) ? Math.round(element.netMarketTotal * 10) / 10 : 0
                currentChild.PlayerPnL = element.profitNLoss
                currentChild.Children = element.tableExpend ? element.orderDetailsList : []
                if (element.tableExpend && element.orderDetailsList) {
                    element.orderDetailsList.forEach(ele => {
                        ele.selectionName = ele.selectionNames ? ele.selectionNames : '-';
                        ele.oddReq = ele.odds ? ele.odds : '-';
                        ele.marketName = ele.marketName ? ele.marketName : '-';
                        ele.exchangeStake = Number(ele.exchangeStakes);
                        ele.profitNLoss = Math.round(ele.profitNLoss * 10) / 10;
                        ele.remark = ele.remark ? ele.remark:'-';
                    });
                }
                // else{
                //     element.orderDetailsList=[]
                // }
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for acc statment
     * @param {any} list 
     */
    static updateAccStamentUserListForExport(list: any,isSelfDetail) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {

                let currentChild: any = {};
                currentChild.DateTime = this.DateformatePipeformate(element.createDate,'dd/MM/yyy HH:mm:ss')
                currentChild.Deposit = element.depositAmt != '-' ? Math.round(element.depositAmt * 10) / 10 : 0;
                currentChild.withdraw = element.withdrawAmt != '-' ? Math.round(element.withdrawAmt * 10) / 10 : 0;
                currentChild.balance = element.balance ? Math.round(element.balance * 10) / 10 : 0;
                currentChild.Oldbalance = element.oldBalance ? Math.round(element.oldBalance * 10) / 10 : 0;
                currentChild.Parentbalance = element.parentBalance ? (element.parentBalance == '-' ? '-' : Math.round(element.parentBalance * 10) / 10) : 0;
                currentChild.ParentOldbalance = element.parentOldBalance ? (element.parentOldBalance == '-' ? '-' : Math.round(element.parentOldBalance * 10) / 10) : 0;
                currentChild.CreditRef = element.creditRef ? Math.round(element.creditRef * 10) / 10 : '-';
                currentChild.oldCreditRef = element.oldCreditRef != '-' ? Math.round(element.oldCreditRef * 10) / 10 : '-'  ;
                currentChild.remark = element.remark ? element.remark : '-';
                currentChild.RefPL = element.refPnl ? Math.round(element.refPnl * 10) / 10 : '-';
                currentChild.To = (element.toName ? element.toName : '-')
                // (element.fromName ? element.fromName+ '/' :'')  + 
                updateChildDetails.push(currentChild);
            });
            if(!isSelfDetail){ //pranat column not show for admin self acc stmt
                updateChildDetails.forEach((el:any)=>{
                    delete el.Parentbalance
                    delete el.ParentOldbalance
                })
            }
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for acc statment
     * @param {any} list 
     */
    static updatePlayerAccStamentUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {

                let currentChild: any = {};
                currentChild.DateTime = typeof element.createDate == "object"? this.DateformatePipeformate(element.createDate,'dd/MM/yyy HH:mm:ss') : element.createDate;
                currentChild.Deposit = element.depositAmt != '-' ? Math.round(element.depositAmt * 10) / 10 : 0;
                currentChild.Withdraw = element.withdrawAmt != '-' ? Math.round(element.withdrawAmt * 10) / 10 : 0;
                currentChild.Balance = element.balance ? Math.round(element.balance * 10) / 10 : 0;
                currentChild.Remark = element.remark ? element.remark : '-'
                // currentChild.FromTo = (element.fromName ? element.fromName+ '/'  : '') + element.toName
                currentChild.Oldbalance = element.oldBalance ? Math.round(element.oldBalance * 10) / 10 : '-';
                currentChild.CreditRef = element.creditRef ? Math.round(element.creditRef * 10) / 10 : '-';
                currentChild.oldCreditRef = element.oldCreditRef != '-' ? Math.round(element.oldCreditRef * 10) / 10 : '-'  ;
                currentChild.RefPL = element.refPnl ? Math.round(element.refPnl * 10) / 10 : '-';
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
 * Funtion for pdf excel json for payment transaction
 * @param {any} list 
 */
    static updatePlayerTransectioUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {

                let currentChild: any = {};
                currentChild.Type = element.type
                currentChild.RecordID = element.id
                currentChild.UTRNumber = element.type == 'DEPOSIT' ? (element.txnId ? element.txnId :'-') : '-';
                currentChild.Date = this.DateformatePipeformate(element.createDateTime,'dd/MM/yyy HH:mm:ss');
                // currentChild.Mode = element.modes;
                currentChild['Req. Amount'] = element.amnt ? Math.round(element.amnt * 10) / 10 : '-'
                currentChild['Approv. Amount'] = element.appAmnt ? Math.round(element.appAmnt * 10) / 10 : '-'
                currentChild.Merchant = element.merchant;
                currentChild.BankName = element.bankName;
                currentChild['Acc Holder Name'] = element.accName;
                currentChild['Account No'] = element.type == 'WITHDRAW' ? element.accNo : '-';
                currentChild['IFSC/SWIFT'] = element.ifsc;
                currentChild.Remark = element.rmk ? element.rmk : '-';
                currentChild.status = element.status;
                currentChild.UpdatedTime = element.appTi ? this.DateformatePipeformate(element.appTi,'dd/MM/yyy HH:mm:ss') : '-';
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for payment transaction
     * @param {any} list 
     */
    static updateAdminTransectioUserListForExport(list: any,isCheat) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {

                let currentChild: any = {};
                currentChild.recordId = element.id
                currentChild.UserName = element.usrn
                currentChild.NameLevel = element.nameLevel? element.nameLevel: '-'
                currentChild.Type = element.type
                currentChild.UTRNumber = element.type == 'DEPOSIT' ? (element.txnId ? element.txnId :'-') : '-';
                currentChild.SystemUtr = element.sysUtr ?element.sysUtr: '-'
                currentChild.SystemAmount = element.sysAmount ?element.sysAmount: '-'
                currentChild.AccountUser = element.accCount ?element.accCount: '-'
                currentChild.Rating = element.riskRating ? element.riskRating: '-'
                currentChild.AccountRating = element.accRating ? element.accRating: '-'
                currentChild.TransactionDate = element.createDateTime ? this.DateformatePipeformate(element.createDateTime,'dd/MM/yyy HH:mm:ss'): '-';
                currentChild['Req. Amount'] = element.amnt ? Math.round(element.amnt * 10) / 10 : '-'
                currentChild['Approv. Amount'] = element.appAmnt ? Math.round(element.appAmnt * 10) / 10 : '-'
                currentChild.Crypto = element.cryptoAmnt ? element.cryptoAmnt : '-';
                currentChild.BankName = element.bankName ? element.bankName : '-';
                currentChild.AccHolderName = element.accName ? element.accName : '-';
                currentChild['AccNo/UPI/Phone'] = element.accNo ? element.accNo : '-';
                currentChild['IFSC/SWIFT'] = element.ifsc ? element.ifsc : '-';
                currentChild.status = element.status;
                currentChild.Ref_code = element.maRefCode ? element.maRefCode :'-';
                currentChild['ApprovedPer(%)'] = element.appPer;
                currentChild['RejectedPer(%)'] = element.rejPer;
                currentChild.UpdatedBy = element.approvedBy;
                // currentChild.Modes = element.modes;
                currentChild.UpdatedTime = element.appTi =='null' ? '-' : element.appTi ? this.DateformatePipeformate(element.appTi,'dd/MM/yyy HH:mm:ss') : '-';
                currentChild.Merchant = element.merchant;
                currentChild.Remark = element.rmk ? element.rmk : '-';
                if(isCheat){
                    delete currentChild['Ref_code']
             }
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
 * Funtion for pdf excel json for payment transaction
 * @param {any} list 
 */
    static updateAdminDocumentUserListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {

                let currentChild: any = {};
                currentChild.UserName = element.username
                currentChild.Date = this.DateformatePipe(element.createdDate);
                currentChild['Document Type'] = element.dtyp; // #prev22022
                currentChild['Doc/Acc Holder name'] = element.dn // #prev22022
                // currentChild['Acc Holder name'] = element.dn
                currentChild['Bank Name'] = element.bankName ? element.bankName : '-'
                currentChild['Acc. No/Doc ID/Mobile no.'] = element.did // #prev22022
                // currentChild['Acc. No'] = element.did
                currentChild.Branch = element.branchName ? element.branchName : '-';
                currentChild['IFSC/SWIFT'] = element.extra ? element.extra : '-';
                currentChild.Remark = element.rmk ? element.rmk : '-';
                currentChild.status = element.status ? element.status : '-';
                currentChild.RefCode = element.refCode ? element.refCode : '-';
                currentChild.UpdatedBy = element.approvedBy;
                currentChild.UpdatedTime = element.updatedDate ? this.DateformatePipe(element.updatedDate) : '-';
                updateChildDetails.push(currentChild);
                // if(element.dtyp=='ID'){
                //     delete currentChild.Branch
                //     delete currentChild.IFSC
                //     delete currentChild['Bank Name']
                // }
            });
        }
        return updateChildDetails;
    }

    /**
* Funtion for pdf excel json for PaymentModes
* @param {any} list 
*/
    static updateSuperAdminPaymentModesListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild['Bank Name'] = element.bankName
                currentChild['Acc No/UPI/Mob No.'] = element.ano
                currentChild['Acc Holder Name'] = element.an;
                currentChild.Merchant = element.merchant;
                currentChild['IFSC/SWIFT'] = element.ifsc;
                currentChild.Active = element.active;
                // currentChild.Modes = element.modes;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }



    /**
* Funtion for pdf excel json for PaymentModes
* @param {any} list 
*/
static whitelabelListForExport(list: any) {
    let updateChildDetails: object[] = [];
    if (list) {
        list.forEach(element => {
            let currentChild: any = {};
            currentChild['Superadmin Username'] = element.username
            currentChild['Domain'] = element.domain
            currentChild['Tcm Username'] = element.tcmUsername;
            currentChild.status = element.status;
            // currentChild.Modes = element.modes;
            updateChildDetails.push(currentChild);
        });
    }
    return updateChildDetails;
}

                /**
     * Funtion for pdf excel json for PaymentModes
     * @param {any} list 
     */
     static updateSuperAdminBonusModesListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild['Name'] = element.name
                currentChild['Bonus Type'] = element.bonusType
                currentChild['Max Bonus Amount'] = element.maxBonusAmount
                // currentChild['RollingX'] = element.rollingX
                currentChild['Rate'] = element.rate
                // currentChild['Max Days'] = element.maxDays
                currentChild['Valid From'] = element.validFrom
                currentChild['Valid To'] = element.validTill
                currentChild['Status'] = element.active ? 'Active' : 'InActive'
                currentChild['Sequence'] = element.seq
                
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for notification
     * @param {any} list 
     */
    static updatePlayerNotificationListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.SettleTime = element.notificationTime
                currentChild.EventName = element.eventName ? element.eventName : 0;
                currentChild.PL = element.profitNLose ? Math.round(element.profitNLose * 10) / 10 : 0;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for ActivityLog
     * @param list 
     */
    static updatePlayerActivityLogForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.LoginDateTime = element.createDate
                currentChild.LoginStatus = element.loginStatus ? element.loginStatus : 0;
                currentChild.IpAddress = element.ipAddress ? element.ipAddress : 0;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for RollingHistory
     * @param list 
     */
     static updatePlayerRollingHistoryForExport(list:any){
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.LastRolling = element.previousTurnOver
                currentChild.Rolling = element.totalTurnOver
                currentChild.Date = element.createdDate
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for report by downline
     * @param {any} list 
     */
    static updateReportByMarketForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.UID = element.userName ? element.userName : element.eventName ? element.eventTypeName + '>' + element.eventName : element.eventTypeName;
                currentChild.Stake =  this.numberformatePipe(element.stake)
                currentChild.PlayerPL = element.playerPl > 0 ? Math.round(element.playerPl * 10) / 10 : 0 > element.playerPl ? Math.round(element.playerPl * 10) / 10 : 0;
                currentChild.UpLinePL = element.uplinePl > 0 ? Math.round(element.uplinePl * 10) / 10 : 0 > element.uplinePl ? Math.round(element.uplinePl * 10) / 10 : 0;
                currentChild.MoComm = element.moComm ? element.moComm : 0;
                currentChild.BmComm = element.bmComm ? element.bmComm : 0;
                currentChild.Children = element.children ? element.children : []
                currentChild.routeurl = element.pathurl ? element.pathurl : ''
                if (element.children) {
                    element.children.forEach(ele => {
                        ele.stake =  this.numberformatePipe(ele.stake)
                        ele.playerPl = parseFloat(( ele.playerPl>0 ? ''  : '-' )+this.numberformatePipe(ele.playerPl)) // after pipe conversion add + - and convert to
                        ele.uplinePl = parseFloat(( ele.uplinePl>0 ? ''  : '-' )+this.numberformatePipe( ele.uplinePl>0 ?  Number('-'+ele.uplinePl) :ele.uplinePl )) // after pipe conversion add + - and convert to number
                       
                        // ele.stake = Math.round(ele.stake * 10) / 10
                        // ele.playerPl = Math.round(ele.playerPl * 10) / 10
                        // ele.uplinePl = Math.round(ele.uplinePl * 10) / 10
                        ele.eventMrketName = ele.eventName ? ele.eventTypeName + '>' + ele.eventName : ele.eventTypeName
                    });
                }
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for report by market
     * @param {any} list 
     */
    static updateReportByMarketForUserExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};

                currentChild.Matches = element.eventName ? (element.eventTypeName ? element.eventTypeName + '>' :'') + element.eventName : element.eventTypeName;
                currentChild.Games = element.eventName ? (element.eventTypeName ? element.eventTypeName + '>' :'') + element.eventName : element.eventTypeName;

                currentChild.Stake = Math.round(element.stake * 10) / 10;
                currentChild.PlayerPL = element.playerPl > 0 ? Math.round(element.playerPl * 10) / 10 : 0 > element.playerPl ? Math.round(element.playerPl * 10) / 10 : 0;
                currentChild.UpLinePL = element.uplinePl > 0 ? Math.round(element.uplinePl * 10) / 10 : 0 > element.uplinePl ? Math.round(element.uplinePl * 10) / 10 : 0;
                // currentChild.loosingStake = element.loosingStake 
                // currentChild.Commission= element.commission > 0 ? Math.round(element.commission*10)/10 : 0 > element.commission ? Math.round(element.commission*10)/10 : '-';
                currentChild.MoComm = element.moComm ? element.moComm : 0;
                currentChild.BmComm = element.bmComm ? element.bmComm : 0;
                currentChild.settleTime = element.settleTime ? element.settleTime : '-'
                currentChild.Children = element.children ? element.children : []
                currentChild.routeurl = element.pathurl ? element.pathurl : ''

                //   for inner data
                if (element.children) {
                    element.children.forEach(ele => {
                        ele.stake = Math.round(ele.stake * 10) / 10
                        ele.playerPl = Math.round(ele.playerPl * 10) / 10
                        ele.uplinePl = Math.round(ele.uplinePl * 10) / 10
                        ele.commission = ele.commission
                        // ele.marketType=ele.eventTypeName ? ele.eventTypeName + '>'+ele.marketType :ele.marketType
                    });
                }
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function pdf excel json for report by downline for first time
     * @param {any} list 
     */
    static updateReportByDownlineForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Username = element.userName;
                currentChild.Stake = element.stake;
                currentChild.PlayerPL = element.playerPl > 0 ? '+' + element.playerPl : 0 > element.playerPl ? element.playerPl : '-';
                currentChild.UpLinePL = element.uplinePl > 0 ? '+' + element.uplinePl : 0 > element.uplinePl ? element.uplinePl : '-';
                // currentChild.DownLinePL = element.downlinePl >0 ? '+'+(element.downlinePl): 0 >element.downlinePl ? '-'+(element.downlinePl): '-';
                currentChild.routeurl = element.pathurl ? element.pathurl : ''
                currentChild.UID = element.userName
                updateChildDetails.push(currentChild);
            });

        }
        return updateChildDetails;
    }

    /**
     * Function pdf excel json for report by downline for first time
     * @param {any} list 
     */

    static updateReportByIpForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.IpAddress = element.ipAddress;
                currentChild.Counts = element.count;
                currentChild.Users = element.userNamesList[0];
                updateChildDetails.push(currentChild);
            });

        }
        return updateChildDetails;
    }

        /**
     * Function pdf excel json for report by downline for first time
     * @param {any} list 
     */

    static updateReportByAccountForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Account = element.docId;
                currentChild.WithdrawAmount = element.withAmt ? element.withAmt : '-';
                currentChild.userCount = element.noOfUsers ? element.noOfUsers : '-';
                currentChild.Users = element.userNames;
                updateChildDetails.push(currentChild);
            });

        }
        return updateChildDetails;
    }

    static updateReportByTransactionForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Username = element.username;
                currentChild.DepositAmount = element.depositAm;
                currentChild.DepositCount = element.depositCount;
                currentChild.DepositDate = element.lastDeposit;
                currentChild.UserLevel = element.nameLevel;
                updateChildDetails.push(currentChild);
            });

        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for trackier report
     * @param {any} list 
     */
    static TrackierReportForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.Username = element.userNames;
                currentChild.Source = element.source;
                currentChild.Code = element.code ? element.code:'-';
                currentChild.PhoneNo = element.phoneNo ? element.phoneNo:'-';
                currentChild.PubId = element.pubId ? element.pubId :'-';
                currentChild.AdvId = element.advId ? element.advId :'-'  ;
                currentChild.CampId = element.campId ? element.campId :'-';
                currentChild.CreatedOn = element.createDate;
                updateChildDetails.push(currentChild);
            });

        }
        return updateChildDetails;
    }

    /**
    * Function for pdf excel json for revenue report
    * @param {any} list 
    */
   static RevenueReportForExport(list: any,isadmin) {
       let updateChildDetails: object[] = [];
       if (list) {
           list.forEach(element => {
               let currentChild: any = {};
               currentChild.Username = element.username;
               currentChild.TotalStakes = element.totalStakes ? element.totalStakes:'0';
               currentChild['Revenue (%)'] = element.childRev ? element.childRev:'0';
               currentChild['Revenue Value'] = element.childPnl ? element.childPnl:'0';
               currentChild['Upline Revenue (%)'] = element.uplineRevPer ? element.uplineRevPer:'0';
               currentChild['Upline Revenue Value'] = element.uplineRev ? element.uplineRev :'0';
               currentChild['Upline P/L'] = element.uplinePnl ? element.uplinePnl :'0'  
               if(isadmin){
                       delete currentChild['Upline Revenue (%)']
                       delete currentChild['Upline Revenue Value']
                       delete currentChild['Upline P/L']
                }
                updateChildDetails.push(currentChild);
           });
       }
       return updateChildDetails;
   }

 /**
    * Function for pdf excel json for commission list
    * @param {any} list 
    */
 static CommissionListForExport(list: any) {
    let updateChildDetails: object[] = [];
    if (list) {
        list.forEach(element => {
            let currentChild: any = {};
            currentChild.Username = element.username;
            currentChild['Added Time'] = element.createdOn;
            currentChild.commission = element.commission ? element.commission:'-';
            updateChildDetails.push(currentChild);
        });

    }
    return updateChildDetails;
}


    /**
     * Function for pdf excel json for report by player
     * @param {any} list 
     */
    static updateReportByPlayerForExport(list: any) {
        let updateChildDetails: object[] = [];
        let userreport = [{ 'children': [], 'gametype': 'SPORTS' }, { 'children': [], 'gametype': 'SLOTS AND BINGO' }, { 'children': [], 'gametype': 'SPECIAL MARKET' }, { 'children': [], 'gametype': 'ACE CASINO' }, { 'children': [], 'gametype': 'VIRTUAL SPORTS' },{ 'children': [], 'gametype': 'SPORTS RADAR' }, { 'children': [], 'gametype': 'INTERNATIONAL CASINO' },{ 'children': [], 'gametype': 'SPORTS BOOK' },]
        // console.log("-->",list,userreport,updateChildDetails)
        // 
        // let userreport = [{ 'children': [], 'gametype': 'SPORTS' }, { 'children': [], 'gametype': 'INDIAN CASINO' }, { 'children': [], 'gametype': 'INTERNATIONAL CASINO' }, { 'children': [], 'gametype': 'SLOTS_AND_BINGO' }]
        if (list) {
            if (list.SPORTS) { //check list have data or not

                let index = 0;
                for (var event of Object.keys(list)) {  //loop for merge winner and losoer json
                    // if any issue or stuck uncomment this line align object same to this.userrport     // console.log(index,event)  
                    updateChildDetails = []

                    //align winner and looser in a single row for all gametype
                    //after alignment asign to main array according to view
                    //note : api's respose same as our userreport obj check api response not preview in console
                   
                    if (list[event].looser.length < list[event].winner.length) {
                    // console.log("RRRR+++-->",userreport[index], list[event])

                        list[event].winner.forEach(element => {
                            let currentChild: any = {};
                            currentChild.UID = element.userName;
                            currentChild.Currency = element.currency;
                            currentChild.PlayerPL = Math.round(element.profitNLoss * 10) / 10
                            currentChild.U_ID = '-';
                            currentChild.currency = '-'
                            currentChild.Player_PL = '-';
                            updateChildDetails.push(currentChild);
                        });
                        list[event].looser.forEach((el, i) => {
                            updateChildDetails[i]['U_ID'] = el.userName;
                            updateChildDetails[i]['currency'] = el.currency;
                            updateChildDetails[i]['Player_PL'] = Math.round(el.profitNLoss * 10) / 10
                        })
                    }
                    else {

                        list[event].looser.forEach(element => {
                            let currentChild: any = {};
                            currentChild.UID = '-';
                            currentChild.Currency = '-';
                            currentChild.PlayerPL = '-';
                            currentChild.U_ID = element.userName;
                            currentChild.currency = element.currency;
                            currentChild.Player_PL = Math.round(element.profitNLoss * 10) / 10;
                            updateChildDetails.push(currentChild);
                        });
                        list[event].winner.forEach((el, i) => { updateChildDetails[i]['UID'] = el.userName; updateChildDetails[i]['Currency'] = el.currency; updateChildDetails[i]['PlayerPL'] = Math.round(el.profitNLoss * 10) / 10 })
                    }

                    userreport[index].children = updateChildDetails;   //assign data to same event sport to sport and bingo to bingo and below change tha index to show like UI
                    // console.log(userreport)
                    index++
                }

            }
        }
        updateChildDetails = []
        if(userreport[5]? (userreport[5]).gametype == 'SPORTS RADAR':''){
            (userreport[5]).gametype = 'PREMIUM'
        }
        updateChildDetails[0] = userreport[0]   //assign on the base of index to arrange like sport > ice > int > bingo without index it will suffle
        updateChildDetails[1] = userreport[3]
        updateChildDetails[2] = userreport[5]
        updateChildDetails[3] = userreport[4]
        updateChildDetails[4] = userreport[1]
        updateChildDetails[5] = userreport[2]
        updateChildDetails[6] = userreport[6]
        updateChildDetails[7] = userreport[7]


        return updateChildDetails;
    }

    /**
     * Funtion for pdf excel json for ActivityLog
     * @param {any} list 
     */
    static groupbyUserForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.playerName = element.playerName
                currentChild.Parent = element.parent;
                currentChild.Stake = element.owStakes ? (Math.round(element.owStakes * 10) / 10) : (Math.round(element.exchangeStakes * 10) / 10);
                currentChild.Pnl = element.owPnl ? (Math.round(element.owPnl * 10) / 10) : (Math.round(element.pnl * 10) / 10);

                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }



    /**
     * Function for pdf excel json for profit and loss for expended table
     * @param {any} list 
     */
    static expendRowgroupbyUserForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.playerName = element.playerName
                currentChild.Parent = element.parent;
                currentChild.Stake = element.owStakes ? (Math.round(element.owStakes * 10) / 10) : (Math.round(element.exchangeStakes * 10) / 10);
                currentChild.Pnl = element.owPnl ? (Math.round(element.owPnl * 10) / 10) : (Math.round(element.pnl * 10) / 10);
                currentChild.Children = element.tableExpend ? element.betListResponseDTOList : []
                if (element.tableExpend) {
                    element.betListResponseDTOList.forEach(ele => {
                        delete ele.betListResponseDTOList
                        // delete ele.ipAddress
                        ele.ipAddress = ele.ipAddress ? ele.ipAddress : '-';
                        ele.BetId = ele.betId ? ele.betId : '-';
                        ele.marketName = ele.marketName ? ele.marketName : '-';
                        ele.selectionName = ele.selectionName ? ele.selectionName : '-';
                        ele.odds = ele.odds ? ele.odds : '-';
                        ele.Stakes = ele.exchangeStakes ? ele.exchangeStakes : '-';
                        ele.Type = ele.sideType ? ele.sideType : '-';
                        ele.Exposure = ele.exposure ? ele.exposure : '-';
                        ele.PlaceDate = ele.placeDate ? ele.placeDate : '-';
                        ele.profitNLoss = ele.pnl ? Math.round(ele.pnl * 10) / 10 : 0;
                        ele.currency = ele.currency?ele.currency:'-'
                    });
                }
                // else{
                //     element.orderDetailsList=[]
                // }
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
      * Function for pdf excel json for report by downline
      * @param {any} list 
      */
    static ClientDetailForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                currentChild.Sno = index + 1;
                currentChild.Id = String(element.uid);
                currentChild.ClientId = element.un;
                currentChild.PhoneNo = element.pn;
                currentChild.SignupDate = element.cdt;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

       /**
     * Function for pdf excel json for report by downline
     * @param {any} list 
     */
        static bonusDetailForExport(list: any) {
            let updateChildDetails: object[] = [];
            if (list) {
                list.forEach((element,index) => {
                    let currentChild: any = {};
                    currentChild.Sno = index+1;
                    currentChild.Id = element.id;
                    currentChild.BonusName = element.bonusName;
                    currentChild.UserName = element.userName;
                    currentChild.DepositAmount = element.depositAmount;
                    currentChild.BonusAmount = element.bonusAmount;
                    currentChild.Status = element.bonusStatus;
                    currentChild.AddedOn = element.addedOn;
                    currentChild.ExpireDate = element.expireDate;
                    currentChild.RemainingRolling = element.remainingRolling;
                    currentChild.CurrentRolling = element.currentRolling;
                    currentChild.TotalRolling = element.totalRolling;
                    updateChildDetails.push(currentChild);
                });
            }
            return updateChildDetails;
        }
    /**
  * Function for pdf excel json for report by rolling history
  * @param {any} list 
  */
    static rollingHistoryForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                // currentChild.Sno = index + 1;
                // currentChild.LastRolling = element.previousTurnOver;
                // currentChild.Rolling = element.totalTurnOver;
                currentChild.Id = element.bonusId;
                currentChild.BonusName = element.bonusName;
                currentChild.BonusType = element.type == 'DEPOSIT' ? 'Re Deposit':'Deposit';
                currentChild.BonusAmount = element.bonusAmount;
                currentChild.AppliedOn = element.addedOn;
                currentChild.ExpiredOn = element.expireDate;
                currentChild.Status = element.bonusStatus;
                currentChild.IsInstant = element.isInstant == false ? 'No' : 'Yes';
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

      /**
  * Function for pdf excel json for report by Bonus history
  * @param {any} list 
  */
      static bonusHistoryForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                currentChild.Sno = index + 1;
                // currentChild.LastRolling = element.previousTurnOver;
                // currentChild.Rolling = element.totalTurnOver;
                // currentChild.Id = element.bonusId;
                currentChild.Cricket = element.cricketRoll;
                currentChild.Soccer = element.soccerRoll;
                currentChild.Tennis = element.tennisRoll;
                currentChild.AceCasino = element.indCasinoTurnOver;
                currentChild.LiveCasino = element.interCasinoTurnOver;
                currentChild.VirtualSports = element.vsCasinoTurnOver;
                currentChild.Date = element.createdDate;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Function for pdf excel json for report by contest report
     * @param {any} list 
     */
    static contestReportForExcelPdf(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                currentChild.Sno = index + 1;
                currentChild.playerName = element.playerName;
                currentChild.nameLevel = element.nameLevel;
                currentChild.joinedDate = element.joinedDate;
                currentChild.optionValue = element.optionValue;
                currentChild.Pnl = element.pnl ? element.pnl : '-' ;
                currentChild.status = element.status;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }


    /**
     * Function for pdf excel json for report by contest report
     * @param {any} list 
     */
    static contestReportForExceluserLevelPdf(list: any,section) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                currentChild.Sno = index + 1;
                currentChild.BetId = element.id;
                currentChild.PlayerID = element.playerName;
                currentChild.Parant = element.nameLevel;
                currentChild.contestName = element.contestName;
                currentChild.joiningAmt = element.joiningAmt;
                currentChild.poolPrice = element.poolPrice;
                // currentChild.newPrice = element.newPrice;
                // currentChild.playerName = element.playerName;
                currentChild.joinedDate = element.joinedDate=='-' ? element.joinedDate : typeof element.joinedDate == "object" ? this.DateformatePipeformate(element.joinedDate,'dd/MM/yyy HH:mm:ss') : element.joinedDate;
                currentChild.settleDate = element.stDate=='-' ?  element.stDate : typeof element.stDate == "object" ? this.DateformatePipeformate(element.stDate,'dd/MM/yyy HH:mm:ss') : element.stDate;
                currentChild.optionValue = element.optionValue;
                currentChild.Pnl = element.pnl==0 ? '0': element.pnl ? element.pnl  : '-' ;
                currentChild.status = element.status;
                updateChildDetails.push(currentChild);
            });
            
        }
        if(section=='BETHISTORY'){
            updateChildDetails.forEach((el:any)=>{
                delete el.parent
                delete el.playerName
                delete el.Parant
                delete el.settleDate
                delete el.PlayerID

            })
        }
        else if(section=='PNL'){
            updateChildDetails.forEach((el:any)=>{
                delete el.parent
                delete el.playerName
                delete el.Parant
                delete el.PlayerID

            })
        }
        return updateChildDetails;
    }


        /**
     * Function for pdf excel json for bet history on player battle
     * @param {any} list 
     */
    static playerBattleBetHistoryForExcelPdf(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                currentChild.Sno = index + 1;
                currentChild.playerName = element.pn;
                currentChild.computerTotalScore = element.cts ? element.cts: '-';
                currentChild.playerTotalScore = element.uts ? element.uts: '-';
                currentChild.minStake = element.mistk;
                currentChild.maxStake = element.mxstk;
                currentChild.maxTopLossRun = element.mtlr;
                currentChild.placeDate = element.plDat
                currentChild.selection = element.plsecf;
                currentChild.stake = element.stk;
                currentChild.exposure = element.expo;
                currentChild.profitNLose = element.pnl;
                currentChild.runAdvantage = element.runAdv;
                currentChild.status = element.betr;

                let subChildren:any=[];
                if(element.children){

                    element.children.forEach(el => {
                        let subChild: any = {};
                        subChild.playerName = el.pn;
                        subChild.defaultRun = el.run;
                        subChild.finalScore = el.rnSc? el.rnSc : '-';
                        subChild.PlSelection = el.usrRnr;
                        // subChild.status = el.status;

                        subChildren.push(subChild);
                    });
                }

                currentChild.Children = subChildren;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

            /**
     * Function for pdf excel json for bet history on player battle
     * @param {any} list 
     */
    static playerBattleBetHistExcelPdf(list: any,section) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element, index) => {
                let currentChild: any = {};
                currentChild.Sno = index + 1;
                currentChild.BetId = element.id;
                currentChild.Username = element.pn;
                currentChild.parent = element.nameLevel;
                currentChild.EventName = element.en;
                currentChild.TeamName = element.tn;
                currentChild.maxTopLossRun = element.mtlr;
                currentChild.compTotalScore = element.cts ? element.cts: '-';
                currentChild.userTotalScore = element.uts ? element.uts: '-';
                // currentChild.minStake = element.minStake;
                // currentChild.maxStake = element.maxStake;
                currentChild.placeDate = element.plDat=='-' ?  element.plDat : typeof element.plDat == "object"? this.DateformatePipeformate(element.plDat,'dd/MM/yyy HH:mm:ss') : element.plDat;
                currentChild.settleDate = element.stDate=='-' ?  element.stDate : typeof element.stDate == "object"?  this.DateformatePipeformate(element.stDate,'dd/MM/yyy HH:mm:ss') :element.stDate;
                currentChild.selection = element.plsecf;
                currentChild.stake = element.stk;
                currentChild.exposure = element.expo;
                currentChild.profitNLoss = element.pnl;
                currentChild.runAdvantage = element.runAdv;
                currentChild.status = element.betr;

                let subChildren:any=[];
                if(element.fanSelcn && element.tableExpend){
                    element.fanSelcn.forEach(el => {
                        let subChild: any = {};
                        subChild.playerName = el.pn;
                        subChild.defaultRun = el.run;
                        subChild.finalScore = el.rnSc? el.rnSc : '-';
                        subChild.PlSelection = el.usrRnr;
                        subChild.status = el.status;
                        subChildren.push(subChild);
                    });
                }

                currentChild.Children = subChildren;
                updateChildDetails.push(currentChild);
            });
            //dyna,ic delete
            if(section=='BETHISTORY'){
                updateChildDetails.forEach((el:any)=>{
                    delete el.compTotalScore
                    delete el.userTotalScore
                    delete el.minStake
                    delete el.maxStake
                    delete el.settleDate
                    delete el.parent
                    delete el.Username
                })
            }
            else if(section=='PNL'){
                updateChildDetails.forEach((el:any)=>{
                    delete el.Username
                    delete el.parent
                })
            }
        }
        return updateChildDetails;
    }

    /**
 * Function for pdf excel json for bankingLog
 * @param {any} list 
 */
    static updateBankingLogListForExport(list: any) {

        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild.DateTime = element.createDate;
                currentChild.Uid = element.toName;
                currentChild.Deposit = element.depositAmt;
                currentChild.Withdraw = element.withdrawAmt;
                currentChild.Balance = element.balance;
                currentChild.RefPnl = element.refPnl;
                currentChild.CreditRef = element.creditRef;
                currentChild.OldBalance = element.oldBalance;
                currentChild.IpAddress = element.ipAddress;
                currentChild.Remark = element.remark;
                currentChild.To = element.fromto;
                
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }


    /**
     * Function for pdf excel json for report by Affiliate
     * @param {any} list 
     */
           static AffiliatesreportForExport(list: any) {
            let updateChildDetails: object[] = [];
            if (list) {
                list.forEach((element,index) => {
                    let currentChild: any = {};
                    currentChild.Sno = index+1;
                    currentChild.AffiliateName = element.username;
                    currentChild.AffiliateCode = element.refCode;
                    currentChild.PhoneNo =  element.mobileNo && element.mobileNo !='null' ? ((element.countryCode? element.countryCode:'') +element.mobileNo) : "-" 
                    currentChild.SignupBonusCoin = element.defaultCoin;
                    currentChild.ExposureLimit = element.exposureLimit;
                    currentChild.CreateOn = element.createOn;
                    currentChild.Status = element.status;
                    updateChildDetails.push(currentChild);
                });
            }
            return updateChildDetails;
        }

    /**
     * Function for pdf excel json for report by Affiliate
     * @param {any} list 
     */
               static AffiliatesPlayerlistForExport(list: any) {
                let updateChildDetails: object[] = [];
                if (list) {
                    list.forEach((element,index) => {
                        let currentChild: any = {};
                        currentChild.Sno = index+1;
                        currentChild.Player_Id = element.username;
                        currentChild.PhoneNo =  element.phoneNo && element.phoneNo !='null' ? ((element.countryCode? element.countryCode:'') +element.phoneNo) : '-' 
                        currentChild.CreatedOn = element.createDateTime;
                        currentChild.LastActivity = element.updateDateTime;
                        currentChild.Status = element.status;
                        updateChildDetails.push(currentChild);
                    });
                }
                return updateChildDetails;
            }    

       /**
     * Function for pdf excel json for report by Affiliate
     * @param {any} list 
     */
       static loosingStakelistForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach((element,index) => {
                let currentChild: any = {};
                currentChild.Date = element.date;
                currentChild.Match = element.match;
                currentChild['Match odds'] = element.matchOdds ? element.matchOdds : 0;
                currentChild['BM 0%'] = element.bm ? element.bm : 0;
                currentChild['BM 1%'] = element.bmDisc ? element.bmDisc : 0;
                currentChild.Sessions = element.sessions ? element.sessions : 0;
                currentChild.net = element.net ? element.net : 0;
                currentChild['LS match'] = element.lsMatch ? element.lsMatch : 0;
                currentChild['Comm match'] = element.commMatch ? element.commMatch : 0;
                currentChild['Other stakes'] = element.otherStakes ? element.otherStakes : 0;
                currentChild['others COMM'] = element.otherComm ? element.otherComm : 0;
                let subChildren:any=[];
                
                if(element.Children){
                    element.Children.forEach(ele => {
                        let subChild: any = {};

                        subChild.marketType = ele.marketType 
                        subChild.loosingStake = ele.loosingStake
                        subChild.playerPL = ele.playerPl
                        subChild.stake = ele.stake
                        subChild.uplinePL = ele.uplinePl
                        subChildren.push(subChild);
                        
                        // ele.marketType=ele.eventTypeName ? ele.eventTypeName + '>'+ele.marketType :ele.marketType
                    });
                }
                // currentChild.Children = element.Children ? element.Children : []
                

                currentChild.Children = subChildren;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }     

    /**
   * Funtion for pdf excel json for critical bank user
   * @param {any} list 
   */
    static criticalBankUserListForExport(res: any) {
        let list = res.users
        // let headingList = {key:['Account No:','Bank Name'],value:[res.docId,res.bankName]}
        let headingList = [{'Account No':res.docId},{'Bank Name':res.bankName}]

        let updateChildDetails: object[] = [];
        updateChildDetails.push(headingList)
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                currentChild['User Name'] = element.userName
                currentChild['Name Level'] = element.nameLevel
                currentChild['Rating'] = element.riskRating;
                currentChild['Status'] = element.status;
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }


    /**
       * @param list : List of negative report data
       * @description 
       * export childrens list to print excel and pdf.
       */
    static negativeReportListForExport(list: any) {

        let updateChildDetails: object[] = [];
        if (list) {
          list.forEach(element => {
            let currentChild: any = {};
            currentChild.Username = element.username ? element.username : '-';
            currentChild.nameLevel = element.nameLevel;
            currentChild.CreditRef = element.creditRef ? (element.creditRef).toFixed(2) : '-';
            currentChild.Balance = element.balance ? (element.balance).toFixed(2) : '-';
            currentChild.RefPnl = element.refPnl ? (element.refPnl).toFixed(2) : '-';
            currentChild.Exposure = element.exposure ? (element.exposure).toFixed(2) : '-';
            currentChild.AvailBalance = element.availBalance ? (element.availBalance).toFixed(2) : '-';
            updateChildDetails.push(currentChild);
          });
        }
        return updateChildDetails;
      }

    /**
       * @param list : List of negative settled report data
       * @description 
       * export childrens list to print excel and pdf.
       */
    static negativeSettledReportListForExport(list: any) {
        let updateChildDetails: object[] = [];
        if (list) {
          list.forEach(element => {
            let currentChild: any = {};
            currentChild.Username = element.username ? element.username : '-';
            currentChild.nameLevel = element.nameLevel;
            currentChild.settledAmount = element.balance ? (element.balance).toFixed(2) : '-';
            currentChild.settledDate = element.settledDate ? element.settledDate : '-';
            currentChild.UpdatedBy = element.updatedBy ? element.updatedBy : '-';
            currentChild.Remark = element.remark ? element.remark : '-';
            updateChildDetails.push(currentChild);
          });
        }
        return updateChildDetails;
    }

    /**
     * 
     * @param list is response data
     * @param table table from defination file
     * @returns 
     */
    static autoManagePdfExcelForExport(list: any,table:any) {
        let updateChildDetails: object[] = [];
        if (list) {
            list.forEach(element => {
                let currentChild: any = {};
                table.forEach(el=>{
                    if(el.prop!="sno"){
                        currentChild[el.name] = element[el.prop]
                    }
                })
                updateChildDetails.push(currentChild);
            });
        }
        return updateChildDetails;
    }

    /**
     * Number formate pipe for use in component
     * @param num 
     */
    static numberformatePipe(num) {
        let numberFormarpipe = new NumberFormatPipe();
        return Number(numberFormarpipe.transform(num))
    }

    /**
     * Number remove sign  pipe for use in component
     * @param num 
     */
    static removeSignPipe(num) {
        let removesignPipe = new RemoveSign();
        return Number(removesignPipe.transform(num))
    }

    /**
     * Number downlineNumberPipe pipe for use in component
     * @param num 
     */
    static downlineNumberPipe(num) {
        let downlineNumerFormat = new DownlineNumerFormat();
        if(num<0){
            return Number(downlineNumerFormat.transform(num))*-1
        }
        else{
            return Number(downlineNumerFormat.transform(num))
        }
    }

    /**
     * Number formate pipe for use in component
     * @param num 
     */
    static DateformatePipe(date: Date) {
        let dateFormatpipe = new DatePipe('en-US');
        return dateFormatpipe.transform(date, 'd/M/yy, h:mm a')
    }

    static DateformatePipeformate(date: Date,formate) {
        // let formate = 'dd/MM/yyyy HH:mm'
        let dateFormatpipe = new DatePipe('en-US');
        return dateFormatpipe.transform(date, formate)
    }

    // encrypt value from betslip 
    static getencustomedata(getobjvalue,key){
        var signedString = CryptoJS.HmacSHA256(getobjvalue,key);
        var resultSign = CryptoJS.enc.Hex.stringify(signedString);
        return resultSign
    }

    // create hash value for payload
    static transformObject(obj) {
        let objkeys=obj[0]
         var transformedObject = {
           eventId:objkeys.eventId,
           exchangeStake:objkeys.exchangeStake,
           marketId:objkeys.marketId,
           odds:objkeys.odds,
           selectionId:objkeys.selectionId,
           volume:objkeys.volume};
           const valuesArray = Object.values(transformedObject).map(value => value !== null ? String(value) : 'null');
          let finalTransformedObject = (valuesArray.join('|'));
          return finalTransformedObject;
       }
}
