import { Route } from '@angular/router';

export interface JWT {
    roles: string,
    userName: string,
    appSkin: string,
    acceptAnyOdds:boolean,
    acceptAnyOdd: Array<any>,
    pinItems: Array<String>,
    stakes: {
        backend: Array<string>
        frontend: {
            price: Number,
            val: String
        }[]
    },
    isUserLogin: boolean,
    timeZone: string,
    _id: any,
    ipAddress: any,
    childRole: Array<any>,
    canCreateMaster: any,
    isPlayer: boolean,
    isSupAdmin: any,
    isSupMaster: any;
    isPlayerAllow: any,
    balance: Number,
    isSupORAdmin: boolean,
    isSUpandAdmin: boolean,
    isMaster: boolean,
    tokenSession:number,
    isAdmin: boolean,
    writeprivilege: boolean,
    canCreateAdmin: boolean,
    exposureExist: boolean,
    isFancyAdmin: boolean,
    isOwner: boolean,
    isTrManager: boolean,
    isTrader: boolean,
    canAddMarket:boolean,
    canCreateFancy:boolean,
    isOwnerTrTrm:boolean,
    isTrTrm:boolean,
    isOwnerTrm:boolean,
    loginAttempts:any,
    aliiAdmin:any,
    suspended:any
    isTrCM:boolean,
    isVisible:boolean,
    isAssociate:boolean,
    associate:boolean,
    tnc:any,
    adminLevel:boolean,
    ownerLevel:boolean,
    tokenExpTime:number,
    canEditMarket:boolean,
    canCreateSuperAdmin:boolean,
    canCreateTrader:boolean,
    canAccessCasinoMGT:boolean,
    canAccessAccessMGT:boolean,
    canChangeAccStatus:boolean,
    canUpdatePassword:boolean,
    user_TntId:any,
    isMasterAgent: boolean,
    isBrandManager: any,
    canCreateSAdmin: boolean,
    

}

export interface prjectname {
    iceExchange:boolean,
    a2zbet:boolean,
}


export interface prjectname {
    iceExchange:boolean,
    a2zbet:boolean,
}

// Admin API
export interface userAccountDetail {
    id: number,
    exposure: number,
    balance: number,
    refPnL: number,
    availableBalance: number,
    exposureLimit: number,
    creditRef: number,
    totalBalance?: number,
    totalExposure?: number,
    totalAvailBal?: number,
    totalRefPnl?: number,
    availBal?: number,
    status?: any
    activePlayers?:any
}

// Admin API
export interface UserActivePlayers {
    active?:any
}
// Admin API
export interface userDetail {
    id: number,
    name: string,
    exposure: number,
    balance: number,
    refPnL: number,
    availableBalance: number,
    exposureLimit: number,
    creditRef: number,
    userId?: number,
    roleAlias?: any,
    parentId?: number,
    role?: any,
    availBal?:number
    userName?: string,
    childUsers?: Array<any>,
    bankingOption?: number,
    userDetails?: [userDetail]
    clickable?: any,
    parentUsers?:[],
    settledOnly?:any
}

// User Login API

export interface login {
    usernameOrEmail: string,
    password: string
}

// Admin user Add

export interface userAdd {
    username: string,
    name: string,
    exposureLimit: number,
    phoneNo: string,
    email: string,
    password: string,
    cPassword: string,
    commission: string,
    roleName: string,
    balance: number,
    creditRef: number,
    timeZone: string,
    currencyType: string,
    masterPrivileges: any,
    alias:any
}

// Role API

export interface userRole {
    id: number,
    name: string
}

export interface roleList extends Array<userRole> { };

// Competition List

export interface competitionEvent {
    betfairId: string,
    name: string,
    type: number,
    active: boolean,
    customized: boolean,
    checked: boolean,
    uiDisabled: boolean
}

export interface competitionEventList extends menu {
    parentData?: menu,
    addedData?: any,
    newData?: any
};

export interface menu {
    id?: number,
    name?: string,
    parentId?: number,
    level?: string,
    betfairId?: string,
    type?: number,
    active?: any,
    customized?: any,
    visibleToPl?: boolean,
    canBet?: boolean,
    marketId?: any;
    eventDateTime?: any;
    eventStatus?:any;
    //rule?:any;
    stream?:any;
    maxStake?:any;
    maxMktStake?:number;
    orderPxDelay?:number;
    nwicketSub?:string;
    wicketMarket?:boolean;
    eventTypeId?:string
}

export interface updateMenu extends menu, competitionEventList {
    parent: menu,
    childrenData: competitionEventList
}

export interface eventTypeId {
    eventTypeIds?: Array<any>
    competitionIds?: Array<any>
    eventIds?: Array<any>
    etId?: Array<any>
}

export interface masterMenu {
    orgLoadMenu: any,
    loadMenu: any,
    menuTypes: any,
    childMenu: any,
    selectedChildMenu: any,
    prevSelectedChildMenu: any,
    selectedCompetition: menu
    childMenuSubscribe: any,
    selectedParentMenu?: any
}

export interface response {
    error: Array<any>,
    success: Array<any>,
    warn: Array<any>
}

export interface bankingLog {
    amount: number,
    fromName: string,
    toName: string,
    createDate: Date,
    balance: number,
    withdrawAmt: number,
    depositAmt: string,
    transactionLogsList?: any
}


export interface BroadcastEvent {
    key: any;
    data?: any;
}

export interface BroadCastSubscription {
    betSlip?: any,
    sseSubscribe?: any,
}

export interface creditReference {
    userId: Number,
    bankingOption: Number,
    creditRef: Number,
    remark?: String,
    amount?: Number,
    password?: String,
    rate?: Number
}

export interface changeUserAccStatus {
    userId: Number,
    enabled: any,
    accSuspended: any,
    accLocked: any,
    trashUser?:any,
    remarks:any
}

export interface changeBetStatus{
    accSuspendedByOwner?: boolean,
	remarks?: string,
	betId?: number,
    userId?:number ,
    gameType?:string,
}
export interface creditRefLogs {

}

export interface roleWiseBreadCrumb {
    userId: Number,
    alias: string,
    name: string,
    order: Number,
    clickable: boolean,
    eventId?:Number
}

export interface roleWiseBreadCrumbArr extends Array<roleWiseBreadCrumb> {

}

export interface timezone {
    name: string,
    value: string
    default: Boolean
}


export interface timezoneList extends Array<timezone> { }

export interface ChangePassword {
    confirmPass: String
    newPwd: String
    password: String,
    userId: number,
    changePassword?: String
}

export interface updatePlayerStatus{
    userId:number,
	accSuspendedByOwner:boolean
}
export interface betSlip {
    match?: any,
    selectionId?: number,
    odds?: number,
    exchangeStake?: number,
    eventType?: string,
    eventId?: string,
    marketId?: string,
    sideType?: number,
    action?: string,
    marketType?: string,
    isFancy?: boolean,
    id?: number,
    runs?: number,
    oddsType?: any,
    runnersNo?: any,
    runnerName?:any,
    oddType?: any,
    maxStake?:number,
    minStake?:number,
    showMinMax?:boolean,
    fancyMarketCategory?: any,
    marketDisc?:number,
    fancyPlayerBook?: Array<any>;
    acceptAnyOdd?:boolean,
    backRuns?:number,
    meter?:number,
    eventName?:string,
    allRunnerInfo?:Array<any>;
    maxMktStake?:number
    volume?:number
}

export interface fancyPlayerBook {
    amount: "0",
    run: "0"
}

export interface fancyBetSlip {
    match?: any,
    sideType: number,
    marketType: string,
    runs: number,
    exchangeStake: number,
    eventType: string,
    marketId: number,
    eventId: number,
    selectionId: number,
    odds: number,
    fancyMarketCategory: string
    action: string,
    isFancy: boolean,
    oddType: any,
    runnersNo: any,

}
export interface betSlipAbstract {
    betslipDataMatch: any;
    betslipDataUnMatch: any;
    playerSlipList?: {
        matchedTicketsByEvents: Array<any>,
        unMatchedTicketsByEvents: Array<any>,
        userId: Number

    },
    slipList?: Array<any>;
    orgSlipList?: Array<any>;
    savePoints?: any;
    betPriceList?: any;
    customBetList?: any;
}

export interface CancelAll {
    userId: any,
    creditRef: any
}

export interface CancelAllList extends Array<CancelAll> { }

export declare interface RouteData {
    excel: boolean,
    pdf: boolean,
    priviledgeKey?:string
}

export declare interface ExtendedRoute extends Route {
    data: RouteData
}

export interface ReportByDL {
    userId?: number,
    dateRange: string,
    currency: string,
    gameType:string
    pageNo:number
    size:number
    isVolume:boolean,
    provider?:string,
    eventTypeName?:string,
    tableCount1:number,
    tableCount2:number,
    aggregator?:string

}

export interface BetHistoryKeys {
    id: number,
    eventName: string,
    eventTypeName: string,
    sideType: number,
    placeDate: string,
    odds: string,
    exchangeStake: number,
    averagePriceMatched: number,
    profitNLose: number
}
export interface PdfTableRecord {
    account: string,
    currency: string,
    creditRef: number,
    exposure: number,
    AvilBal: number,
    playerBal: number,
    refPl: number,
    status: string,
}

export interface FancyRunner {
    marketId: string,
    runners: Array<any>;

}
export interface casinoBetSlip{
    match?: any,
    sideType?: number,
    marketType?: string,
    runs?: number,
    exchangeStake?: number,
    eventType?: string,
    marketId?: number,
    eventId?: number,
    selectionId?: number,
    odds?: number,
    action?: string,
    fancyMarketCategory?:string,
    runnersNo?:string,
    runnerName?:string,
    isFancy?: boolean,
    isCasino?:boolean,
    maxStake?:number,
    minStake?:number,
    casinoRoundId?:number
    casinoSelectionId?:number
}
export interface FancyDropdown{
   minBet:Array<any>;
   maxBet: Array<any>;
   maxMarket: Array<any>;
   maxVolume: Array<any>;
   maxTotal: Array<any>;
   mktEventType?:Array<any>;


}

export interface Score{
    home:any,
    away:any
}
export  interface BetHistory extends Array<BetHistoryKeys>{}
export declare type ExtendedRoutes = ExtendedRoute[];

export interface DashboardManagement{
    annoncements:[],
    sportsBanner:{
    bannerImageurl:String,
    action:String,
    sportsList:[{
    eventTypeId:number,
    imageAction:String,
    imageUrl:String,
    eventTypeName:String,
    eventsCount:number,
    eventsList:[{
        name:String,
        action:String
        }],
    }]},
    casinoBanner:{
    imageUrl:String,
    action:String
    casinoGamesList:[
        {
        imageUrl:String,
        name:String,
        action:String
        }],
    },
    carousels:[
    {
    carouselImage:String,
    carouselAction:String
    }]




}

export interface Betlist{
    playerName:string,
    betId:number,
    selectionName:string,
    sideType:string,
    eventName:string,
    odds:string,
    exposure:string

}

export interface LoginGauth{
    userId?: Number,
    loginGauthRequired?: boolean
    totp?: boolean
}

export interface Accstatment{
    userId?: Number,
    dateRange?: string,
    pageNo?:Number,
    size?:Number,
    filterType?:string,
    // txnType?:string
}
export interface Transection{
    dateRange?: string,
    pageNo:Number,
    size:Number,
    type:string,
    status?:string,
    id?:string

}
export interface FilterType{
    userId?: number,
    dateRange?: string,
    gameType?: string,
    pageNo?: number,
    size?: number,
    eventTypeName?:string,
    provider?:string,
    tableCount1:number,
    tableCount2:number,
    aggregator?:string

}
export interface BetFilterType{
    userId?: number,
    dateRange?: string,
    gameType?: string,
    reqCurrentBets: boolean,
    pageNo: number,
    size: number,
    eventTypeName?:string,
    betStatus?:string,
    provider?:string,
    tableCount1:number,
    tableCount2:number,
    aggregator?:string

}
export interface ReportByIpType{
    dateRange?: string,
    pageNo:number,
    size:number,
    userName:string,
    ip:string,
    saName:string
}

export interface ReportByAccountType{
    dateRange?: string,
    pageNo:number,
    size:number,
    userName:string,
    docId:string
}

export interface EventReportByDL{
    currency?: string,
    dateRange?: string,
    userName?: string,
    userId:number,
    gameType?: string,
}

export interface MarketReportObj{
    currency?: string,
    dateRange?: string,
    eventId:string,
    gameType?: string,
    aggregator?:string
}

export interface betListdateRange{
    dateRange?: string,
    pageNo:number,
    size:number
    gameType?: string,
    stake?:number,
    eventTypeName?:string,
    betStatus?:string,
    isFilter?:boolean,
    currency?:string,
    provider?:String,
    dateType?:String,
}

export interface UserBetEventByDL{
    dateRange?: string,
    gameType?: string,
    pageNo?:number,
    size?:number,
    marketType?: string,
    userName?: string,
    eventTypeName?: string,
    eventName?: string
}

export interface FilterSport{
    eventTypeId?:number,
    eventTypeName?: string,
}

export interface BetObj{
    date?: string,
    gtype?: string,
    tab?:number,
}

export interface ExposureLimit{
    exposureLimit?:number,
    userId?:number,
    password?: string,
}

export interface UpdateBetDealy{
    betDelay?:number,
    userId?:number,
}
export interface DefaultCurrency{
    defaultCurrency?: string,
    userId?:string
}

export interface transectionObj{
    type:string,
    paymentMId:string,
    amount:number,
    imageUrl?:string,
    txnId?:string,
    modes:string,
    bonusId?:string,
    sysUtr?:string,
    sysAmount?:string,
    currencyPrice?:string,
    currencyTransfer?:string,
}

export interface signUpMaster{
    username?:string,
    bonusCoin?:number,
    mobileNo?:any,
    exposureLimit?:number,
    countryCode?:string,
    isUpdatedReq?:string,
    instagram?:string,
    facebook?:string,
    telegram?:string,
    
}
export interface SideMenu{
    ty:string,
    etid?:number,
    cid?:number,
    tid?:number
}

export interface graphValue{
    value:string,
    name:any,
}
export interface graphType{
    name:string,
    series:any,
}