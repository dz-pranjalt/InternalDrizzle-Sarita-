({
	   handleComponentEvent1 : function(component, event, helper) {
           var evt = event.getParam("leadRecId");
           alert('evt',evt)
           if(!$A.util.isUndefinedOrNull(evt)){
               component.set("v.leadId", evt);
           }
           
    }
})