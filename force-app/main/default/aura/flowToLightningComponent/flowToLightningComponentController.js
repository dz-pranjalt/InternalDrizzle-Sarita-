({
	invoke : function(component, event, helper) {
        //Thie will fetch the case record Id
		var record = component.get("v.recordId");
        console.log('record ',record);
        
        //To redirect oncase created Record
        var navigateUrl = $A.get("e.force:navigateToSObject");
        navigateUrl.setParams({
            "recordId" : record
        });
        //Open record
        navigateUrl.fire();
	}
})