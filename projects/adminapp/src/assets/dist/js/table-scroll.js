var fixedColumns=null; 
var trackobitVehicleTable=null;
var gaiSelected = [];
var vehicleList=[]
var clientList=[];
var deviceList=[];
var companyList=[];
var transporterList=[];
var searchTransporter="";
var vehicleUploadData=[];
var vehicleButtons=[];
var transporterLockEnable={};
var createdForCustomFieldMap=new Map();
var technicianList=[];

var BUCKET_URL="https://tbdocs2020.s3.ap-southeast-1.amazonaws.com/";
var IMAGE_KEYS=["chassisNoImg","engineNoImg","imeiNoImg","vehicleNoImg"]
const rolesAndAuthorities={};
$(document).ready(function() {
	
	var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var deviceTypeArray=[];
	var deviceTypeNameArray=[];
	var vehicleStateArray=[];
	var vehicleStateNameArray=[];
	var yearWiseVehicleAddedArray=[];
	var yearWiseVehicleSubscriptionStartArray=[];
	var yearWiseVehicleSubscriptionDueArray=[];
	var yearWiseInactiveVehicleArray=[];
	var yearWiseModifiedVehicleArray=[];
	var isColumnReordered=false;
	
	
	
	
   $('#enabled-filter').on('select2:select', function (e) {
	  applyVehicleFilterData();
   })
  
   function getenabledFilterData(transporterVehicleList){
	  var state=$("#enabled-filter").val();
	  if(state=="Active"){
		return transporterVehicleList.filter(function (value, index ){
			return(state===value.vehicleStatus)? true : false;
		});
	  }else if(state=="Inactive"){
		return transporterVehicleList.filter(function (value, index ){
			return(state===value.vehicleStatus)? true : false;
		});  
	  }else{
		  return transporterVehicleList;
	  }
   }
  
 
  
   function getMonthFilterData(enabledVehicleList){
	  var month=$("#month-filter").val();
	  if(isNotValid(month)){
		  return enabledVehicleList;
	  }else{
		  return enabledVehicleList.filter(function (value, index ){
			  return(value.added.indexOf(month) !== -1)? true : false;
		  });
	  }
   }
   

   

   



	$('#scroll-vehicle-table-right').on('click',function(){
		let leftPos = $(".dataTables_scrollBody").scrollLeft();
		let elem=$('.dataTables_scrollBody')
		let width=elem.outerWidth();
		let	scrollWidth=elem.get(0).scrollWidth;
		if (scrollWidth-leftPos < width) {
			$('#scroll-vehicle-table-right').addClass('hide');
		}
		$(".dataTables_scrollBody").animate({scrollLeft: leftPos + 300}, 50);
	})

	$('#vehicle-list-table-div,#scroll-vehicle-table-right,#scroll-vehicle-table-left').mouseenter(function(){
		let leftPos = $(".dataTables_scrollBody").scrollLeft();
		if(leftPos>0){
			$('#scroll-vehicle-table-left').removeClass('hide');
		}
		let elem=$('.dataTables_scrollBody')
		let width=elem.outerWidth();
		let	scrollWidth=elem.get(0).scrollWidth;
		if (scrollWidth-leftPos > width) {
			$('#scroll-vehicle-table-right').removeClass('hide');
		}
	})
	$('#vehicle-list-table-div,#scroll-vehicle-table-right,#scroll-vehicle-table-left').mouseleave(function(){
		$('#scroll-vehicle-table-left').addClass('hide');
		$('#scroll-vehicle-table-right').addClass('hide');
	})

	function setTransporterBillingDetailData(data){
		let billingDetail=data.billingDetail;
		$('#edit-billing-transporter-username').val(data.username);
		if(isNotValid(billingDetail)){
			return;
		}
		//
		$("#edit-transporter-billing-detail-companyName").val(billingDetail.transporterCompanyName);
		$("#edit-transporter-billing-detail-contact").val(billingDetail.transporterContact);
		$("#edit-transporter-billing-detail-email").val(billingDetail.transporterEmail);
		$("#edit-transporter-billing-detail-website").val(billingDetail.transporterWebsite);
		$("#edit-transporter-billing-detail-gstin").val(billingDetail.transporterGSTIN);
		$("#edit-transporter-billing-detail-address").val(billingDetail.transporterAddress);
		$("#edit-transporter-billing-detail-state").val(billingDetail.transporterState).change();
	}

	$("#edit-transporter-billing-detail-form").submit(function(e){
		let name=$('#edit-billing-transporter-username').val();
		console.log(name)
		if(isNotValid(name)){
			return;
		}
		let form=$('#edit-transporter-billing-detail-form').serialize();
		form=form+"&transporterUsername="+name;
		ajaxApiPostCall(transporterBillingDetailSaveApiUrl,form).then(function(result){
            if (result.data != null) {
                $('#edit-transporter-modal').modal('hide');
            }
        })
    });
    $('#edit-transporter-modal').on('hide.bs.modal', function () {
        $("#trackobitUserId").val("");
        formReset();
        $('[href="#edit-transporter-tab"]').trigger('click');
    });

    $('#add-transporter-is-subscriptionOverwriteAllVehicles, #edit-transporter-is-subscriptionOverwriteAllVehicles').on('change', function () {
        if ($(this).is(':checked')) {
            let overwriteSubscriptionCheckbox = $(this);
            let message = confirmation_overwrite_sub_for_all_vehicles_msg;
            createConfirmationDialog(message).then(function (result) {
                if (!result.value) {
                    overwriteSubscriptionCheckbox.prop('checked', false);
                }
            });
        }
    });

    $('#add-transporter-is-inactiveVehicle, #edit-transporter-is-inactiveVehicle').on('change', function () {
        if ($(this).is(':checked')) {
            let inactiveVehiclesCheckbox = $(this);
            let message = confirmation_should_vehicle_inactive_on_sub_exp_msg;
            createConfirmationDialog(message).then(function (result) {
                if (!result.value) {
                    inactiveVehiclesCheckbox.prop('checked', false);
                }
            });
        }
    });

})
