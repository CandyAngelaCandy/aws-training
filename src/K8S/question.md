1.执行`kubectl apply -f pod.yaml`命令时候，报错
error: error validating "pod.yaml": error validating data: the server could not find the requested resource; if you choose to ignore these errors, turn validation off with --validate=false
若执行`kubectl apply -f pod.yaml --validate=false`，则pod创建成功
2.执行`kubectl apply -f deployment.yaml`命令时候，报错    
error: unable to decode "deployment.yaml": no kind "Deployment" is registered for version "apps/v1"
原因：使用`brew install minikube` 安装的`kubectl version --client`版本太低。
3. 通过Ingress  curl a.demo.kuboard.cn  报404错误，即访问
原因：解析一个不存在的域名到Ingress controller所在的节点，进行访问，页面如下
4.如何找到Ingress 分配的Ip去访问service?
为了让 Ingress 资源工作，集群必须有一个正在运行的 Ingress 控制器。
5.minikube addons enable ingress运行报错
   
   ❌  Exiting due to MK_USAGE: Due to networking limitations of driver docker on darwin, ingress addon is not supported.
   Alternatively to use this addon you can use a vm-based driver:

   'minikube start --vm=true'

To track the update on this work in progress feature please check:
https://github.com/kubernetes/minikube/issues/7332   

运行下面的命令：minikube stop && minikube delete && minikube start --vm=true --driver=hyperkit
6.cronjob运行



