//1 step - create store

const store = {};


//step 2 Create subscribe method
const subscribe =(eventName,callback)=>{
    if(!store[eventName]){
        store[eventName] = new Set();
    }
    store[eventName].add(callback);
}

//step 3 Create publish method

const publish = (eventName,payload)=>{
    if(store[eventName]){
        store[eventName].forEach(callback => {
            try{
                callback(payload)
            }catch(error){
                console.error('error ',error)
            }
        });
    }
}
    //step 4 Create unsubscribe method
    const unsubscribe = (eventName,callback)=>{
        if(store[eventName]){
            store[eventName].delete(callback)
        }
    }
    export default {
        subscribe,
        unsubscribe,
        publish
    }