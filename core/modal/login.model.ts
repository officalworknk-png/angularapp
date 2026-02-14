import { Constants } from 'core/utils/constants';
import { JWT, prjectname } from './generic.model';
import { Util } from 'core/utils/util';

export class LoginModel {

    public state: JWT = {
        isUserLogin: false,
        appSkin: "skin-1",
        acceptAnyOdds:false,
        acceptAnyOdd:[],
        pinItems: Util.parse(Util.getStore(this.constant.STORAGE.pinned)),
        stakes: {
            backend:[],
            frontend: [
                {
                    price: 50,
                    val: "+50"
                },
                {
                    price: 100,
                    val: "+100"
                },
                {
                    price: 500,
                    val: "+500"
                },
                {
                    price: 1000,
                    val: "+1000"
                },
                {
                    price: 5000,
                    val: "+5000"
                }, 
                {
                    price: 10000,
                    val: "+10000"
                }, 
                {
                    price: 25000,
                    val: "+25000"
                },
                {
                    price: 0,
                    val: "clear"
                }
            ]
        },
        
        roles: null,
        userName: "-",
        timeZone: Util.getDate().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1],
        _id: 0,
        ipAddress: 0,
        childRole: [],
        isPlayer: false,
        canCreateMaster: '',
        isSupAdmin: '',
        isSupMaster: false,
        isPlayerAllow: '',
        balance: 0,
        isSupORAdmin: false,
        isMaster: false,
        isAdmin: false,
        writeprivilege: false,
        isSUpandAdmin: false,
        canCreateAdmin: false,
        exposureExist: false,
        isFancyAdmin: false,
        isOwner: false,
        isTrManager: false,
        tokenSession:0,
        isTrader: false,
        canAddMarket:false,
        canCreateFancy:false,
        isOwnerTrTrm:false,
        isTrTrm:false,
        isOwnerTrm:false,
        loginAttempts:null,
        aliiAdmin:false,
        suspended:'',
        isTrCM:false,
        isVisible:false,
        isAssociate:false,
        associate:false,
        tnc:null,
        adminLevel:false,
        ownerLevel:false,
        tokenExpTime:0,
        canEditMarket:false,
        canCreateSuperAdmin:false,
        canCreateTrader:false,
        canAccessCasinoMGT:false,
        canAccessAccessMGT:false,
        canChangeAccStatus:false,
        canUpdatePassword:false,
        user_TntId:null,
        isMasterAgent: false,
        isBrandManager: '',
        canCreateSAdmin: false

    }

    public project: prjectname = {
    iceExchange:false,
    a2zbet:false
    }

    constructor(public constant: Constants) {
        this.checkSkin();
    }

    setIsLogin(isUserLogin: boolean) {
        this.state.isUserLogin = isUserLogin;
        return this;
    }

    getIsLogin() {
        if (Util.getStore(this.constant.STORAGE.token) == null) {
            this.setIsLogin(false);
        } else {
            this.setIsLogin(true);
        }
        return this.state.isUserLogin;
    }

    setAppSkin(appSkin: string) {
        this.state.appSkin = appSkin;
        return this;
    }

    getAppSkin() {
        return this.state.appSkin;
    }

    checkSkin() {
        if (Util.getStore(this.constant.STORAGE.theme) == null) {
            Util.storeState(this.constant.STORAGE.theme, 'skin-1');
            this.state.appSkin = Util.getStore(this.constant.STORAGE.theme);
        } else {
            this.state.appSkin = Util.getStore(this.constant.STORAGE.theme);
        }
    }

    getBackendStakes() {
        let onlyVal = [];
        this.state.stakes.frontend.forEach((el) => {
            onlyVal.push(el.val);
        })

        this.state.stakes.backend = onlyVal
    }

}
