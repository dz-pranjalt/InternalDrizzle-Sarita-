//This class is for List mehods
public class ApexListMethods {
	//1)add()
	//2)addAll()
	//3)size()
	//4)clone
	//5)set
	//6)get
	//7)sort
	//8)remove
    
    public static void ListAddMethod(){
        //Its used to add a record at a time into the list
        List<Integer> intList = new List<Integer>();
        intList.add(1);
        intList.add(2);
        intList.add(3);
        intList.add(4);
        System.debug('List Element '+intList);
    }
    public static void ListAddAllMethod(){
        //Its used to add a record at a time into the list
        List<Integer> intList = new List<Integer>();
        intList.add(1);//0
        intList.add(2);//1
        intList.add(3);//2
        intList.add(4);//3
        intList.add(4);//4
        system.debug('intList '+intList[2]);
        /*system.debug('2 value '+intList[2]);
        List<Integer> intList1 = new List<Integer>();
        Boolean isEmp = intList1.isEmpty();
        system.debug('isEmp '+isEmp);
        System.debug('intList1 '+intList1+ ' intList1 size26 '+intList1.size());
        intList1.addAll(intList);
        System.debug('intList1 '+intList1+ ' intList1 size28 '+intList1.size());
        Boolean isEmp1 = intList1.isEmpty();
        system.debug('isEmp1 '+isEmp1);*/
        intList.set(2,9);
        system.debug('intList 38 '+intList[2]);
    }
     public static void ListClear(){
        //Its used to add a record at a time into the list
        //List<Account> listAcc=[select id from account];
        //List<Contact> = [select Id,Account from COntact where accountId =: listAcc[0].id]
        List<Integer> intList = new List<Integer>();
        intList.add(1);//0
        intList.add(2);//1
        intList.add(3);//2
        intList.add(4);//3
        intList.add(4);//4
        system.debug('intList '+intList.size());
         intList.clear();
         Boolean isEMp = intList.isEmpty();
         system.debug('isEMp '+isEMp);
         system.debug('intList '+intList.size());
         
     }
    public static void Listget(){
        List<String> strList = new List<String>();
        strList.add('x');
        strList.add('y');
        strList.add('z');
        system.debug('strList '+strList);
        system.debug('strList '+strList.get(2));
        system.debug('strList '+strList.get(3));
        
    }
    public static void Listremove(){
        List<String> strList = new List<String>();
        strList.add('x');
        strList.add('y');
        strList.add('z');
        system.debug('strList '+strList);
        strList.remove(2);
        system.debug('strList '+strList);
         //strList.remove(3);
        
    }
     public static void ListremoveAll(){
        List<String> strList = new List<String>();
        strList.add('x');
        strList.add('y');
        strList.add('z');
        system.debug('strList '+strList);
        system.debug('strList '+strList);
        
    }
    public static void ListSortMethod(){
        List<String> strList = new List<String>();
        strList.add('i');
        strList.add('l');
        strList.add('x');
        strList.add('y');
        strList.add('z');
        strList.add('a');
        strList.add('k');
        system.debug('strList '+strList);
        strList.sort();
        system.debug('strList '+strList);
        
    }
}