({
    doHandle : function(component, event, helper) {
        alert('From Aura Method');
        const msg = event.getParams('message');
        alert("msg is ",msg);
        console.log('mesg from lwc ',msg);
    }
})