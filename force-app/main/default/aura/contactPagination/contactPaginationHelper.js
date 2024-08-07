({
	getContactList : function(component,PageNumber,pageSize) {
		var action = component.get("c.getContactData");
        action.setParams({
            pageNumber:PageNumber,
            pageSize:pageSize
        });
        action.setCallback(this,function(a){
            var state = a.getState();
            if(component.isValid() && state === 'SUCCESS'){
                var returnValue = a.getReturnValue();
                console.log('returnValue ',returnValue);
                component.set("v.ContactList",returnValue.contactList);
                component.set("v.PageNumber",returnValue.pageNumber);
                component.set("v.TotalPages",Math.ceil(returnValue.totalRecords / pageSize));
                component.set("v.TotalRecords",returnValue.totalRecords);
                component.set("v.RecordStart",returnValue.recordStart);
                component.set("v.RecordEnd",returnValue.recordEnd);
            }
        });
        $A.enqueueAction(action);
	}
})