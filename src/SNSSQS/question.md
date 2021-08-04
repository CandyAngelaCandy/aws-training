1.Targets中的ID指的是？

TOdo:
1.add delete policy
sns-> sqs 不通。

知识点：
1.Lambda设置dlq的用途？
https://docs.aws.amazon.com/zh_cn/whitepapers/latest/serverless-architectures-lambda/dead-letter-queues.html
比如你更新了lambda的代码，导致它不能正确解析SNS或者SQS发过来的message,或者AWS的运维系统出现问题，导致lambda不能正确被调。
如果在调用lambda时，发生异常，调用会尝试两次及以上。三次尝试过后，该event会被放到DLQ里面。

2.关于服务之间访问的权限？
权限设置是双向的，比如SNS可以访问Lambda, SNS有权限Invoke lambda, 同时lambda有permission可以接受sns的消息。

3.本地去deploy stack

4.如何自定义定时的cloudwatch的event内容，现在是使用系统默认的message？

5.sqs
关注消息的生产者和消费者
sqs消息的留存时间从1minute到14days。默认是4天。一旦留存时间到了，消息就会被自动删除。默认是4天。
sqs的VisibilityTimeout含义：消费者收到消息后，消息将立即保留在队列中。为防止其他用户再次处理消息，
Amazon SQS 会将可见性超时，*Amazon SQS 阻止其他用户接收并处理消息的一段时间*。消息的默认可见性超时为 *30 秒*。最短为 0 秒。最长时间为 12 小时。
一般怎么设置：您应将可见性超时设置为您的*应用程序处理消息并从队列中删除消息所需的最长时间*。一旦过了VisibilityTimeout，则其他使用者将可以看到该消息并且再次接收该消息。

6.sqs不能接受到sns的消息？
权限问题。

7.单独对某些资源配置权限

8.trigger lambdas三次失败，看dlq里面有没有消息 ？
没有信息为什么？可能失败触发的不对，可能500 error才能触发。

9.如何验证filter policy， 不匹配是收不到，但是怎么让他匹配呢？
filter policy 验证格式有问题。

10.研究IAM的principle 如何配置？

11.配置cmk for sns/sqs


培训总结：
1. 所有的aws命令都要指定profile，并不会给生成一个默认的profile，显式指定profile是一个好习惯
2. AWS的所有权限认证是双向的。比如sqs订阅sns，sqs需要有访问sns的权限，sns也需要有访问sqs的权限。






