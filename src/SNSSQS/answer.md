## SNS & SQS

### Basic
Event schedule 定时触发 SNS，SNS 收到消息后会发邮件，触发Lambda,也会将消息发送到 SQS 中，SQS 收到消息后触发 Lambda
ACs
每 5 mins 自动触发SNS的Topic
Create a topic
然后通过cloudwatch 创建一个event，然后自动触发SNS事件

SNS 自动发送邮件，邮件内容包含所有 event 的内容
1.
2.
SNS 会触发Lambda，Lambda将event的所有内容输出到CloudWatch log中
SNS 向订阅的 SQS中发送消息
SQS要有retention(7days) / timeout(5mins)
SQS自动触发Lambda运行，Lambda将event的所有内容输出到CloudWatch log中

https://docs.aws.amazon.com/sns/latest/dg/welcome.html
https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html
https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/Create-CloudWatch-Events-Scheduled-Rule.html

Advanced



以 As Code（Cloudformation）的形式完成 Basic 的内容, 并且配置Dead Letter Queue, IAM以及KMS加密；并且添加监控，并在异常时触发警报；利用MessageAttributes进行过滤

ACs
有可部署 Basic 中内容的 Cloudformation
对比SNS->Lambda和SNS->SQS->Lambda的区别
区别：sqs可以设置visibilityTimeout, 在消息没被消费前，不允许被其他用户消费。sns->lambda没有。SNS->Lambda消息可以有多个出口，而SNS->SQS->Lambda，
lambda接收到的消息只有一个出口。

sqs->lambda, 队列消息有保留时间。
1.适用场景？？


同时对于 SQS和Lambda 要有 DLQ(dead letter queue)
使用 IAM 控制 访问权限
为 SNS 添加 tag（eg. Project code, owner)
使用KMS对SQS/SNS进行加密
使用cloudwatch监控DLQ,在DLQ中有消息时发送通知邮件
为SNS中的message部分添加MessageAttributes,并为Subscription增加过滤条件，每个consumer只接收部分消息(可以使用CLI或者Console来发送消息,进行验证)

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_SNS.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_SQS.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html
https://docs.aws.amazon.com/sns/latest/dg/sns-enable-encryption-for-topic-sqs-queue-subscriptions.html
https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html
https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/set-cloudwatch-alarms-for-metrics.html
https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html#how-to-monitor-log-dead-letter-queues

