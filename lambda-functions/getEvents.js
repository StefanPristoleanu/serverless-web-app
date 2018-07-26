exports.handler = (event, context, callback) => {
    let responseBody = '';
    var AWS = require('aws-sdk');
    var dbClient = new AWS.DynamoDB.DocumentClient();
    var cdate = '2018-07-10'; 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var cdate = yyyy + '-' + mm + '-' + dd;
    var params = {
        TableName: 'AWS-project',
        FilterExpression: 'event_date >= :cdate',
        ExpressionAttributeValues: {
        ':cdate': cdate
    }
    };
    dbClient.scan(params, function(err, data) {
    //ddClient.query(params, function(err, data) {
        if (err) {
            callback(err, null);
            //responseBody = err;
        }
        else {
            //callback(null, data.Items);
            responseBody = data.Items;
            var response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(responseBody),
                "isBase64Encoded": false
            };
            callback(null, response);
        }
    });
};
