
declare var jquery: any;
declare var moment: any;
declare var $: any;
// declare var ClassicEditor
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';


declare var SIR: Function

const delay = ms => new Promise(res => setTimeout(res, ms));


export class DOM_UTIL {

    static modal = {
        login: "login",
        addtournament: "add-tournament",
        addmatch: "add-match",
        playersignup: "player-signup",
        playerlogin: "player-login",
        adduser:"add-user",
        tnmanetregisteruser:"tnmanetregister-user",
        addbonus:"add-bonus",
        addannouncement:'add-announcement',
        updatetransation:'update-transation'
    
    }

    static DOM_VAR = {
        interval: 2500,
        activeMenu: 0
    }

    /**
     * 
     * @param selector  : SelectorName
     * @description
     * Return element list
     */
     static querySel(selector) {
        return document.querySelector(selector);
    }

     /**
     * 
     * @param selector : Selector Name.
     * @description
     * Returns all element by selector Name.
     */
      static querySelAll(selector) {
        return document.querySelectorAll(selector);
    }

       /**
     * 
     * @param domId : DOM Class Name
     * @description
     * Returns element by class name
     */
        static byClass(domId) {
            return document.getElementsByClassName(domId);
        }

     /**
     * 
     * @param domId : DOM ElementId
     * Returns element by elementId
     */
      static byId(domId) {
        return document.getElementById(domId);
    }
     /**
     * 
     * @param message : Mesasage.
     * @description
     * Global method to show toaster success message.
     */
      static success(message) {
        console.log("call",message)
      
        DOM_UTIL.querySel('.success-msg').innerHTML = message;
        DOM_UTIL.querySel('.app-success').classList.add('on');
        DOM_UTIL.querySel('.app-success').classList.add('show');
        DOM_UTIL.querySel('.app-success').classList.remove('hide');
        setTimeout(() => { DOM_UTIL.close().success() }, DOM_UTIL.DOM_VAR.interval)
        // setTimeout(() => { DOM_UTIL.close().success() }, 200000)
    }

    /**
    * 
    * @param message : Mesasage.
    * @description
    * Global method to show toaster error message.
    */
    static error(message) {
        console.log("ERORRRR",message)

        DOM_UTIL.querySel('.error-msg').innerHTML = message;
        DOM_UTIL.querySel('.app-error').classList.add('on');
        DOM_UTIL.querySel('.app-error').classList.add('show')
        DOM_UTIL.querySel('.app-error').classList.remove('hide');
        setTimeout(() => { DOM_UTIL.close().error() }, DOM_UTIL.DOM_VAR.interval)
        // setTimeout(() => { DOM_UTIL.close().error() }, 50000)
    }

    /**
    * 
    * @param message : Mesasage.
    * @description
    * Global method to show toaster warning message.
    */
    static warning(message) {
        DOM_UTIL.querySel('.warning-msg').innerHTML = message;
        DOM_UTIL.querySel('.app-warning').classList.add('on');
        DOM_UTIL.querySel('.app-warning').classList.add('show')
        DOM_UTIL.querySel('.app-warning').classList.remove('hide');
        setTimeout(() => { DOM_UTIL.close().warning() }, DOM_UTIL.DOM_VAR.interval)
    }


    /**
     * @ignore
     */
    static close() {

        console.log("close")
        function success() {
            DOM_UTIL.querySel('.app-success').classList.remove('on');
            DOM_UTIL.querySel('.app-success').classList.add('hide');
        }
        function error() {
            DOM_UTIL.querySel('.app-error').classList.remove('on');
            DOM_UTIL.querySel('.app-error').classList.add('hide');
        }
        function warning() {
            DOM_UTIL.querySel('.app-warning').classList.remove('on');
            DOM_UTIL.querySel('.app-warning').classList.add('hide');
        }

        return {
            success: success,
            error: error,
            warning: warning
        }
    }


     /**
     * 
     * @param domId : Modal Id
     * @description
     * Global function to show popup modal
     */
      static showModal(domId) {
        // $(`#${domId}`).modal();
        $('#'+domId).modal('show'); 
    }


    /**
     * 
     * @param domId : Modal Id
     * @description
     * Global function to hide popup modal
     */
     static hideModal(domId) {
        try {
            $(`#${domId}`).modal('hide');
            $("body").removeClass('modal-open');
        } catch (error) {

        }

    }   

}