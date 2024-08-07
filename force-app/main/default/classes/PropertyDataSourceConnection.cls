global class PropertyDataSourceConnection extends DataSource.Connection {
    private string BASE_URL='http://universities.hipolabs.com/search?country=United+States';
    private string COL_NAME='name';
    global PropertyDataSourceConnection(DataSource.ConnectionParams connectionParams)
    {
    }
    override global List<DataSource.Table> sync(){
        List<DataSource.Table> tables = new List<DataSource.Table>();
        list<DataSource.Column> columns =new list<DataSource.Column>();
        columns.add(DataSource.Column.text('Name',255));
        columns.add(DataSource.Column.text('ExternalId',255));
        columns.add(DataSource.Column.url('DisplayUrl'));
        DataSource.Table realatorTable =new DataSource.Table();
        realatorTable.labelSingular='realator';
        realatorTable.labelPlural='realators';
        realatorTable.name='realator';
        realatorTable.nameColumn='realator';
        realatorTable.Columns=columns;
        tables.add(realatorTable);
        return tables;
    }
    override global DataSource.TableResult query(DataSource.QueryContext context)
    {
        string table=context.tableSelection.tableSelected;
        return DataSource.TableResult.get(context,DataSource.QueryUtils.process(context,getRows(table)));
    }
    private list<map<String,object>> getRows(string table)
    {
        string url=BASE_URL;
        HttpResponse response = makeGetCallout(url);
        list<Object> dataList=(list<Object>)JSON.deserializeUntyped(response.getBody());
        list<map<String,object>> rows =new list<map<String,object>>();
           // map<String,object> row =(map<String,object>)dataList[0];
           // rows.add(table.equals('realator') ? PopulateRealatorRow(row):PopulateRealatorRow(row));
        /**/for(Object data:dataList)
        {
            map<String,object> row =(map<String,object>)data;
            rows.add(table.equals('realator') ? PopulateRealatorRow(row):PopulateRealatorRow(row));
        }
        return rows;
    }
    private static HttpResponse makeGetCallout(string url)
    {
        HttpRequest req =new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        return (new Http()).send(req);
    }
    private map<String,Object> PopulateRealatorRow(map<String,Object> newRows)
    {
        map<string,Object> row =new map<string,Object>();
        string id=string.valueOf(newRows.get('id'));
        row.put('ExternalId',string.valueOf(newRows.get('web_pages')));
        row.put('DisplayUrl',string.format(BASE_URL+'{0}',new string[]{id}));
        row.put('Name',string.valueOf(newRows.get('name')));
        return row;
    }
}