({
	childFire : function(component, event, helper) {
		/*var action = component.get("c.getAccountList");*/
        console.log('get 4 ',component.get("v.inputVal"));
        var inputValue = component.get("v.inputVal")
        console.log('inputValue ',inputValue);
        var cmpEvt = component.getEvent("childEvt");
        alert('cmpEvt ',cmpEvt);
        //cmpEvt.setParams({"passingValue" : "component evt fire"});
        cmpEvt.setParams({"passingValue" : inputValue});
        cmpEvt.fire();
	},
    handleChange: function(component, event, helper) {
        component.set("v.inputVal",component.get("v.firstName"))
        console.log('get ',component.get("v.firstName"));
}
})