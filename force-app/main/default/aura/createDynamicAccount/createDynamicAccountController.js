({
    addRow : function(component, event, helper) {
        var accountList=component.get('v.accountList');
        accountList.push({
            'sobjectType': 'Account',
            'Name': '',
            'Phone': '',
            'Email__c':''
        });
        component.set('v.accountList',accountList);
    },
    removeRecord: function(component, event, helper) {
        var accountList = component.get('v.accountList');
        var currentTarget = event.currentTarget;
        var index =currentTarget.dataset.record;
        accountList.splice(index,1);
        component.set('v.accountList',accountList);
    },
    saveAccounts: function(component, event, helper) {
        if(helper.valideRecords(component,helper,event)){
        var action = component.get("c.insertAccount");
        action.setParams({
            accList:component.get("v.accountList")
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var returnValue = response.getReturnValue();
                console.log('ReturnValues ',JSON.stringify(returnValue));
                  var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The record has been created successfully."
                });
                toastEvent.fire();
            }
            else{
                console.log('Error ',response.getError());
            }
        });
            $A.enqueueAction(action);
        }
        //component.set('v.dissableRow',true);
        
    }
})