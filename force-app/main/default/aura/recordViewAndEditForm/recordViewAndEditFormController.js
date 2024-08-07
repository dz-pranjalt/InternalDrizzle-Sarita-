({
	getContactsList : function(component, event, helper) {
		helper.fetchContact(component,event,helper);
	},
    newContact: function(component, event, helper) {
        var createContact = $A.get("e.force:createRecord");
        createContact.setParams({
            "entityApiName":"Contact",
            "defaultFieldValues":{
                "AccountId":component.get('v.recordId')
            }
        });
        createContact.fire();
	},
    editContacts: function(component, event, helper) {
		var btn = event.getSource();
        console.log('Btn ',btn);
        var name = btn.get('v.name');
        console.log('name ',name);
        
        var recordViewForm = component.find('recordViewForm');
        var recordEditForm = component.find('recordEditForm');
        
        if(name=='edit'){
            $A.util.addClass(recordViewForm,'formHide');
            $A.util.removeClass(recordEditForm,'formHide');
            btn.set('v.name','save');
            btn.set('v.lable','Save');
        }
        else if(name=='save'){
            helper.saveContact(component,event,helper);
        }
	},
})