({
	handlerMethods : function(component, event, helper) {
		var childMsg =  event.getParam("passingValue");
        alert('childMsg ',childMsg);
        component.set("v.childValue",childMsg);
        
	}
})