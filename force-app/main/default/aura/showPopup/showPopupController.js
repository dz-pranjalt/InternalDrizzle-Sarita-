({
    doinit : function(component, event, helper) {
        var action = component.get('c.getLead');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                component.set('v.mydata', allValues);
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                    }
                }
                else{
                }
            }
        });
        $A.enqueueAction(action);
    },
    onChange: function(component, event, helper) {
        var select1 = component.find("select1").get("v.value") 
        component.set("v.optionsVal",select1);
    },
    handleShowPopover : function(component, event, helper){
        var accId = event.currentTarget.dataset.id;
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
        component.set("v.leadId",accId)
    },
    handleSubmit: function(component, event, helper){
        console.log(component.get("v.comments") ,component.get("v.name"),component.get("v.optionsVal"),component.get("v.leadId"));
        var inputName = component.find("inputName");
        /*var nameVal = inputName.get("v.value");
         if (nameVal =='') {inputName.setCustomValidity("Please enter the value");}
        else {inputName.setCustomValidity("");}
        inputName.reportValidity(); 
        
        var areaComments = component.find("areacomments");
        var commentsVal = areaComments.get("v.value");
        if (commentsVal =='') {areaComments.setCustomValidity("Please enter the value");}
        else {areaComments.setCustomValidity("");}
        areaComments.reportValidity(); */
        
        var action = component.get('c.getTask');
        action.setParams({
            description:component.get("v.comments"),
            name :component.get("v.name"),
            subject :component.get("v.optionsVal"),
            LeadId : component.get("v.leadId")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                console.log("response value " + allValues);
                
                //Show Toast Event of Log Created
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success Message',
                    message: 'Log a Call Record has been created successfully for the '+component.get("v.name")+' Lead',
                    messageTemplate: 'Record {0} created! See it {1}!',
                    duration:' 1000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                toastEvent.fire();
                
                //Navigate to Lead Activity Page where Log has been created
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": 'https://d5i000006kzhjeas-dev-ed.lightning.force.com/lightning/r/Lead/'+component.get("v.leadId")+'/view'
                });
                urlEvent.fire();
                
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error Message',
                    message: 'Error while creating log a call is '+errors,
                    messageTemplate: 'Record {0} created! See it {1}!',
                    duration:' 1000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    closeModal : function(component, event, helper){
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
    }
})