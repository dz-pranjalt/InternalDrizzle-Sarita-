({
	myAction : function(component, event, helper) {
		
	},
     handleComponentEvent : function(component, event, helper) {
        component.set("v.accountId", event.getParam("recordId"));
    }
})