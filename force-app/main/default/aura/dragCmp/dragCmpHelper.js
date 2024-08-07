({
    updateDraggedAccount: function(component, event, helper,AccountId,rating) {
        var action = component.get("c.updateAccount");
        action.setParams({ AccountId : AccountId,
                          rating : rating });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('success resp ',response.getReturnValue());
                component.set('v.accountwrapper',response.getReturnValue())
            }
            
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log("Unknown error 22");
            }
        });
        $A.enqueueAction(action);
    },
    updateDraggedContact: function(component, event, helper,ContactId,LeadSource) {
        var action = component.get("c.updatecontact");
        action.setParams({ ContactId : ContactId,
                          LeadSource : LeadSource });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.contactwrapper',response.getReturnValue())
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log('error ',errors);
            }
        });
        $A.enqueueAction(action);
    }
})