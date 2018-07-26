const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    let responseBody = '';
    const dbClient = new AWS.DynamoDB.DocumentClient();
    var cdate = '2018-07-10'; //TODO update with the current date
    console.log("event: ", event);
    cdate = event.event_date;
    var params = {
        TableName: 'AWS-project',
        FilterExpression: 'event_date = :cdate',
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
            //console.log("counter " + data.Items[0].counter);
            updateCounter(data.Items[0], callback);
        }
    });
};

function updateCounter(myRecord, callback){
  const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  dynamodb.putItem({
        TableName: "AWS-project",
        Item: {
            "event_name": {
                S: myRecord.event_name
            },
            "event_date": {
                S: myRecord.event_date
            },
            "counter": {
                N: '' + (myRecord.counter + 1)
            },
            "event_address": {
                S: myRecord.event_address
            },
            "event_capacity": {
                S: myRecord.event_capacity
            },
            "event_description": {
                S: myRecord.event_description
            },
        }
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(null, {
                statusCode: '500',
                body: err
            });
        } else {
            callback(null, {
                statusCode: '200',
                body: 'ok added +1 to : ' + myRecord.event_name + '!'
            });
        }
    })
}

/* Example test for EnrollEvent
{
    "event_date": "2018/10/10"
  }*/