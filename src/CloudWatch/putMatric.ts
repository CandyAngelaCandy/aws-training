import { CloudWatch } from 'aws-sdk';

const cloudWatch = new CloudWatch();

const cloudWatchRequest = (namespace: string, metricName: string): CloudWatch.PutMetricDataInput => ({
    Namespace: namespace,
    MetricData: [{
        MetricName: metricName,
        Value: 1
    }]
});

const putMetric = (metricName: string, namespace: string) => {
    const request = cloudWatchRequest(namespace, metricName);
    try {
        cloudWatch.putMetricData(request);
    } catch(e) {
        console.log("put metric failed", e)
    }
};

putMetric("metricName", "aws/sns");
