//SET METHODS
public class ApexCollections {
    //Collections 
    //Set - Its not content dupliate element,indexcing not available,and its content unorder data
    //List - contains duplicate elements ,we can access record using index,its contain record in order
    //Map - stored data in key and value pair,key will be a unique
    
    public static void setMetodsAdd(){
        Set <String>  setMethods = new Set<String>();
        setMethods.add('A');  //Used to add data into set
        setMethods.add('B'); 
        setMethods.add('C'); 
        setMethods.add('C'); 
        System.debug('setMethods ' + setMethods);
        System.debug('setMethodsSize ' + setMethods.size());
    }
    public static void setMetodsaddAll(){
        /* Set <String>  setMethods = new Set<String>({'Test1','Test2','Test3','Test4'});
Set <String> set2 = new Set<String>(setMethods);
System.debug('set2 ' + set2);*/
        List<String> strList = new List<String>();
        Set<String> setStr = new Set<String>();
        strList.add('Test1');
        strList.add('Test1');
        strList.add('Test2');
        strList.add('Test3');
        System.debug('strList '+strList);
        setStr.addAll(strList);       
        System.debug('setStr '+setStr);
        
    }
    public static void setMethodsClear(){
        Set<String>  setStr = new Set<String>();
        setStr.add('1');
        setStr.add('2');
        setStr.add('3');
        System.debug('setStrClear 36 '+setStr);
        setStr.clear();
        setStr.add('4');
        setStr.add('5');
        System.debug('setStrClear 40 '+setStr);        
    }
    
    public static void setMethodsContains(){
        Set<String>  setStr = new Set<String>();
        setStr.add('1');
        setStr.add('2');
        setStr.add('3');
        setStr.add('5');
        Boolean isContain = setStr.contains('2');
        System.debug('isContain '+isContain);
        Boolean isContain1 = setStr.contains('4');
        System.debug('isContain1 '+isContain1);
        if(setStr.contains('5')){
            System.debug('Istrue ');
        }
        else{
            System.debug('notTrue ');
        }
    }
    public static void setMethodsContainsAll(){
        Set<String>  setStr1 = new Set<String>();
        setStr1.add('1');
        setStr1.add('2');
        setStr1.add('3');
        setStr1.add('5');
        
        Set<String>  setStr2 = new Set<String>();
        setStr2.add('1');
        setStr2.add('2');
        setStr2.add('3');
        setStr2.add('6');
        
        Boolean isContain = setStr1.containsAll(setStr2);
        System.debug('isContain '+isContain);
        if(setStr1.containsAll(setStr2)){
            System.debug('Istrue ');
        }
        else{
            System.debug('notTrue ');
        }
    }
    public static void setMethodsEquals(){
        Set<String>  setStr1 = new Set<String>();
        setStr1.add('1');
        setStr1.add('2');
        setStr1.add('3');
        setStr1.add('5');
        
        Set<String>  setStr2 = new Set<String>();
        setStr2.add('1');
        setStr2.add('2');
        setStr2.add('3');
        setStr2.add('6');
        
        Boolean isContain = setStr1.equals(setStr2);
        System.debug('isContain '+isContain);
        if(setStr1.equals(setStr2)){
            System.debug('Istrue ');
        }
        else{
            System.debug('notTrue ');
        }
    }
    public static void setMethodsRemove(){
        Set<String>  setStr1 = new Set<String>();
        setStr1.add('1');
        setStr1.add('2');
        setStr1.add('3');
        setStr1.add('5');
        System.debug('setStr1 '+setStr1 + ' Size '+setStr1.size());
        setStr1.remove('2');
        
        System.debug('setStr1 '+setStr1 + ' Size '+setStr1.size());
        
    }
    public static void setMethodsRemoveAll(){
        Set<String> setStr2 = new Set<String>();
        setStr2.add('1');
        setStr2.add('2');
        setStr2.add('3');
        setStr2.add('6');
        System.debug('setStr2 '+setStr2);
        
        Set<String>  setStr1 = new Set<String>();
        setStr1.add('1');
        setStr1.add('2');
        setStr1.add('3');
        setStr1.add('5');
        
        setStr2.removeAll(setStr1);
        System.debug('setStr2 '+setStr2);
        
    }
     public static void setMethodsisEmpty(){
        Set<String> setStr2 = new Set<String>();
        setStr2.add('1');
        setStr2.add('2');
        setStr2.add('3');
        setStr2.add('6');
        System.debug('setStr2 '+setStr2);
        Boolean isEMpty = setStr2.isEMpty(); //Return true,bcoz set has a record
         System.debug('isEMpty '+isEMpty);
        Set<String>  setStr1 = new Set<String>();
         Boolean isEMpty1 = setStr1.isEMpty(); //Return false bcoz set has no records
        System.debug('isEMpty1 '+isEMpty1);
        
    }
}