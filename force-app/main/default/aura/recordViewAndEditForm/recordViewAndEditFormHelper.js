({
	fetchContact : function(component,event,helper) {
		var action = component.get('c.getContact');
        var accountId = component.get('v.recordId');
        action.setParams({
            accId : accountId
        });
        action.setCallback(this,function(response){
                  var state = response.getState();
            if(state === 'SUCCESS'){
                var contactList = response.getReturnValue();
                component.set('v.contactList',contactList);
            }
            else{
                alert('Errors is ',error.getMessage());
            }
            });
        $A.enqueueAction(action);
	},
    saveContact : function(component,event,helper) {
        var contactList = component.get('v.contactList');
        var recordViewForm = component.find('recordViewForm');
        var recordEditForm = component.find('recordEditForm'); 
        var toastEvent = $A.get('e.force:showToast');
        var action = component.get('c.saveContact');
        action.setParams({ conList : contactList});
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var contactList = response.getReturnValue();
                if(contactList.status=='success'){
                     $A.util.removeClass(recordViewForm,'formHide');
                    $A.util.addClass(recordEditForm,'formHide');
                    var btn = component.getSource();
                    btn.set('v.name','edit');
                    btn.set('v.label','Edit');
                    toastEvent.setParams({
                        'title' : 'success!',
                        'type':'success',
                        'mode':'dimissable',
                        'message':'contactList.message'
                    });
                    toastEvent.fire();
                }
            }
        })
    }
})