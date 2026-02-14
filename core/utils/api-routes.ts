import { UrlHandlingStrategy } from '@angular/router'

export const URL_PATH = {
    BASE_PATH           : "/api/tournament/",


}


export const URL = {
    IP_ADDRESS                              : "https://api.ipify.org/?format=json", //old url
    login                                   : URL_PATH.BASE_PATH+"user/login",
    adminlogin                                   : URL_PATH.BASE_PATH+"admin/login",
    signUp                                  : "api/auth/signup",
  
    
    ownergetallUser                         : URL_PATH.BASE_PATH+"owner-operations/getallUser",
    ownergetselfAccount                     : URL_PATH.BASE_PATH+"owner-operations/getselfAccount",
    owneraddnewUser                         : URL_PATH.BASE_PATH+"owner-operations/addnewUser",
    ownerupdateUser                         : URL_PATH.BASE_PATH+"owner-operations/updateUser",
    ownerdeleteuser                         : URL_PATH.BASE_PATH+"owner-operations/deleteuser",

    admingetallUser                         : URL_PATH.BASE_PATH+"admin-operations/getallUser",
    admingetselfAccount                     : URL_PATH.BASE_PATH+"admin-operations/getselfAccount",
    adminaddnewUser                         : URL_PATH.BASE_PATH+"admin-operations/addnewUser",
    adminupdateUser                         : URL_PATH.BASE_PATH+"admin-operations/updateUser",
    admindeleteuser                         : URL_PATH.BASE_PATH+"admin-operations/deleteuser",
    admingetallTournament                   : URL_PATH.BASE_PATH+"admin-operations/getallTournament",
    adminaddnewTournament                   : URL_PATH.BASE_PATH+"admin-operations/addnewTournament",
    adminupdateTournament                   : URL_PATH.BASE_PATH+"admin-operations/updateTournament",
    admindeleteTournament                   : URL_PATH.BASE_PATH+"admin-operations/deleteTournament",
    admingetTournamentdata                  : URL_PATH.BASE_PATH+"admin-operations/getTournamentdata",
    adminupdateTournamentSetting            : URL_PATH.BASE_PATH+"admin-operations/updateTournamentSetting",
    adminupdateregisterTournament           : URL_PATH.BASE_PATH+"admin-operations/updateregisterTournament",

    admingetallMatch                       : URL_PATH.BASE_PATH+"admin-operations/getallMatch",
    adminaddnewMatch                       : URL_PATH.BASE_PATH+"admin-operations/addnewMatch",
    adminupdateMatch                       : URL_PATH.BASE_PATH+"admin-operations/updateMatch",
    admindeleteMatch                       : URL_PATH.BASE_PATH+"admin-operations/deleteMatch",
    admindeleteallMatch                       : URL_PATH.BASE_PATH+"admin-operations/alldeleteMatch",
    admingetMatchdata                      : URL_PATH.BASE_PATH+"admin-operations/getMatchdata",
    admingettrnamentMatch                  : URL_PATH.BASE_PATH+"admin-operations/gettrnamentMatch",
    adminsetresultMatch                    : URL_PATH.BASE_PATH+"admin-operations/setresultMatch",
    adminBanking                           : URL_PATH.BASE_PATH+"admin-operations/banking",
    adminUpdateInfoBanking                 : URL_PATH.BASE_PATH+"admin-operations/updateInfoBanking",

    admingetallBonus                       : URL_PATH.BASE_PATH+"admin-operations/getallBonus",
    admincreateBonus                       : URL_PATH.BASE_PATH+"admin-operations/createBonus",
    adminupdateBonus                       : URL_PATH.BASE_PATH+"admin-operations/updateBonus",
    admingetallRegisterTeam                : URL_PATH.BASE_PATH+"admin-operations/getallRegisterTeam",
    gettrnamentRegisterPlayer              : URL_PATH.BASE_PATH+"admin-operations/gettrnamentRegisterPlayer",

    admingetUserdetail                     : URL_PATH.BASE_PATH+"admin-operations/getUserdetail",
    adminusergetregisterTeam               : URL_PATH.BASE_PATH+"admin-operations/getregisterTeam",
    admingetalltrnamentRegisterPlayer      : URL_PATH.BASE_PATH+"admin-operations/getalltrnamentRegisterPlayer",
    admingetPlayerAccountStament           : URL_PATH.BASE_PATH+"admin-operations/getPlayerAccountStament",
    
    createannouncement                      : URL_PATH.BASE_PATH+"admin-operations/createannouncement",
    updateannouncement                      : URL_PATH.BASE_PATH+"admin-operations/updateannouncement",
    deleteannouncement                      : URL_PATH.BASE_PATH+"admin-operations/deleteannouncement",
    getannouncement                         : URL_PATH.BASE_PATH+"admin-operations/getannouncement",
  
    admingetwalletTransactionStatus         : URL_PATH.BASE_PATH+"admin-operations/getwalletTransactionStatus",
    adminwalletTransactionStatus            : URL_PATH.BASE_PATH+"admin-operations/walletTransactionStatus",
    admingetwalletTransaction               : URL_PATH.BASE_PATH+"admin-operations/getwalletTransaction",

    usersignup                              : URL_PATH.BASE_PATH+"user-operations/signup",
    usergetselfAccount                      : URL_PATH.BASE_PATH+"user-operations/getselfAccount",
    usergetallTournament                    : URL_PATH.BASE_PATH+"user-operations/getallTournament",
    usergetTournamentdata                   : URL_PATH.BASE_PATH+"user-operations/getTournamentdata",
    userregisterTeam                        : URL_PATH.BASE_PATH+"user-operations/registerTeam",
    usergetregisterTeam                     : URL_PATH.BASE_PATH+"user-operations/getregisterTeam",
    userupdateTeam                          : URL_PATH.BASE_PATH+"user-operations/updateTeam",
    userregisterTournament                  : URL_PATH.BASE_PATH+"user-operations/registerTournament",
    usercancelegisterTournament             : URL_PATH.BASE_PATH+"user-operations/cancelegisterTournament",
    usergettrnamentMatch                    : URL_PATH.BASE_PATH+"user-operations/gettrnamentMatch",
    userchangepassword                      : URL_PATH.BASE_PATH+"user-operations/changepassword",

    gettrnamentPlayerRegister               : URL_PATH.BASE_PATH+"user-operations/gettrnamentPlayerRegister",

    userwalletdepositTransaction            :URL_PATH.BASE_PATH+"user-operations/walletdepositTransaction",
    userwalletWithdrawTransaction           :URL_PATH.BASE_PATH+"user-operations/walletWithdrawTransaction",
    usergetwalletTransaction                :URL_PATH.BASE_PATH+"user-operations/getwalletTransaction",

    //-----------------------------------END of third party URL------------------------------------------//

 
}

export const UI_URL = {
    user : {
        root            : "/",
        login           : "/login",
        eventDetail     : "/event-detail",
        admin           : "/admin",
        pinned          : "/sport/pinned",
        betSlip         : "/sport/betslip",


    },

    admin : {

        root : "/admin/",
        login : "/admin/login",
        downLineList : "/admin/down-line-list",
        myAccount:"/admin/profile/balance-overview",
        myReportByDownline:"/admin/my-report/downline-report",



        
 


    }
}
