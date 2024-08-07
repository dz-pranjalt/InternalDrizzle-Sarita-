public class trailHeadQueueable implements Queueable {
    private List<Account> accounts;
    private ID parent;
    public trailHeadQueueable(List<Account> records, ID id) {
        this.accounts = records;
        this.parent = id;
    }
    public void execute(QueueableContext context) {
        for(Account acc : accounts){
            acc.parentId = parent;
        }
        update accounts;
    }
}