## CloudWatch

Basic
### CloudWatch 是什么？我们为什么要使用CloudWatch？ 
AWS官方提供的monitor工具。
CloudWatch是监控服务，用来收集和追踪metrics, 收集和监控日志文件，设置alarm,会自动对AWS其他的一些服务的变化做出响应。

使用CloudWatch是监控、存储和访问来自EC2实例的日志文件。
因为CloudWatch监控使用日志数据的应用程序和系统，跟踪应用程序日志中的错误数，并在错误率超过指定阈值时向用户发送通知。

_为什么使用_  
一般用CloudWatch优化资源利用率，应用性能，运维的健壮性。使用CloudWatch**监控**使应用顺利运行。
CloudWatch会提供报表帮助分析趋势和应用的状态。结合报表优化性能和可使用性。例子：使用CloudWatch可以对EC2的CPU使用率进行监控，从而进行自动缩容。

CloudWatch主要有两大功能，metrics service和 log service.
### CloudWatch中的metrics是什么？包括哪些种类？我们可以如何使用metrics？
metrics代表一个发布到CloudWatch的时间排序的数据点集。 理解：可将指标视为要**监控的变量**，而数据点代表该变量随时间变化的值。
比如：特定EC2 实例的**CPU使用率**是 Amazon EC2 提供的一个指标。数据点本身可来自于您从中收集数据的任何**应用程序或业务活动**。
种类：免费指标和收费后的自定义指标。

如何使用？  
指标是通过一个名称、一个命名空间以及零个或多个维度进行唯一定义的

**tips:**
- metrics不能被删除，若没有新数据发布，15个月之后就会自动过期。
- 一个metrics是通过名字，命名空间和纬度三部分结合起来定义。
- 一个metrics最多分配10个维度。
### CloudWatch Events是什么？可以应用在那些场景。
Amazon CloudWatch Events 提供几乎实时的**系统事件流**，这些事件描述 Amazon Web Services 中的更改（AWS) 资源的费用。
通过使用可快速设置的简单规则，您可以匹配事件并将事件路由到一个或多个目标函数或流。CloudWatch 事件会随着运营变化的发生而感知这些变化。
CloudWatch Events 将响应这些操作更改并在必要时采取纠正措施，方式是发送消息以响应环境、激活函数、进行更改并捕获状态信息。

每个应用程序时刻都在产生事件，Amazon CloudWatch Events能帮助您针对应用的事件进行有针对性的响应和处理，及时响应，
并处理错误事件，存储和分析潜在的告警信息。

场景：可以用CloudWatch Events监控您应用的安全。比如你有一些应用服务器群，可以将各自的事件发送给CloudWatch Events，在CloudWatch Events
中设置Rule来进行区分，并将**对应的事件**发送相应的目标，如Lambda，SNS，SQS。目标在收到事件后进行相应的处理。

### 相关概念理解：metrics，periods，namespace，count，dimensions，statistics。
参考：https://docs.aws.amazon.com/zh_cn/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html

- metrics
  metrics代表一个发布到CloudWatch的时间排序的数据点集。 指标是通过一个名称、一个命名空间以及零个或多个维度进行唯一定义的
- periods
  Period是与特定 Amazon CloudWatch 统计信息关联的**时间的长度**。每项统计信息代表在指定时间段内对收集的指标数据的聚合。
  时间段以秒为单位定义，时间段的有效值为 1、5、10、30 或 60 的任意倍数。例如，要指定六分钟的时间段，时间段的值应为 360。
  通过改变时间段的长度可以调整数据聚合的方式。时间段可短至一秒，也可长至一天 (86400 秒)。默认值为 60 秒。
- namespace
  命名空间是 **CloudWatch 指标的容器**。不同**命名空间**中的指标彼此独立，因此来自不同应用程序的指标不会被错误地聚合到相同的统计信息中。
  
  无默认命名空间。您必须为发布到 CloudWatch 的每个数据点指定**命名空间**。在创建指标时，您可以指定命名空间名称。
- count
  SampleCount, 数据点计数 (数量) 用于统计信息的计算。
  
- dimensions
  维度是一个**名称/值对**，它是指标标识的一部分。您可以为一个指标分配最多 10 个维度。
  ```
  Dimensions: Server=Prod, Domain=Frankfurt
  ```
- statistics
  统计数据是指定时间段内的指标数据汇总。CloudWatch 提供统计数据的依据是您的自定义数据所提供的指标数据点，或其他AWS服务添加到 CloudWatch。  
  
Practice
### 创建cloudwatch event rule每分钟自动触发Lambda（Lambda功能需要自己实现，向cloudwatch metrics里push自定义的metrics），
设置alarm检测task中定义的metric，自定义并监控条件使alarm触发阈值，alarm触发SNS，SNS发告警到邮箱。

- PermissionForEventsToInvokeLambda resource grants EventBridge permission to invoke the associated function.

### 创建cloudwatch event rules，每分钟自动触发Lambda（输出固定格式的log message）。为lambda log创建metric filter，匹配log message，
创建新的metric，自定义并监控条件使alarm触发阈值，alarm出发SNS，SNS发告警到邮箱。

Output：
### 两个cloudformation文件
### 部署cloudformation后，功能完整，邮箱可以收到报警

Reference：
https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/working_with_metrics.html
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-cloudwatch.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-sns.html
https://aws.amazon.com/cloudwatch/faqs/

