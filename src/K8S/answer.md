Basic
## 1.在本地安装 kubectl 命令行以及任意 k8s 运行环境（MiniKube / Docker Desktop / 其他）
安装minikube  
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64 \
&& sudo install minikube-darwin-amd64 /usr/local/bin/minikube

安装kubectl 命令行  
curl -LO "https://dl.k8s.io/release/v1.21.0/bin/darwin/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
sudo chown root: /usr/local/bin/kubectl
kubectl version --client

## 2.简述 kubectl log / describe / apply / delete 命令的功能
- kubectl logs
  可以查看正在运行的pod的日志 
- kubectl describe
  查看一个pod的运行状态
- kubectl apply
  在集群中创建和更新资源
  Kubernetes 配置可以用 YAML 或 JSON 定义
  1.kubectl apply -f ./my-manifest.yaml   通过my-manifest.yaml对资源进行配置，如果资源不存在，将会创建资源
- kubectl delete
  删掉部署在集群中的资源

## 3.将示例中的 Node.js 应用（或自定义其他工程）通过 Deployment 部署，
经过Service组织后由Ingress暴露出可被访问的API（使用kubectl apply)

## 4.使用 kubectl get查看本地运行的所有pod，deployment，service，使用kubectl describe查看pod，deployment的详细信息
kubectl get pods -o wide -l 'app=node-express'
kubectl get deploy node-express-deployment
kubectl get svc nginx-service -o wide
kubectl get ingress -o wide

kubectl describe pod node-express
kubectl describe deploy node-express-deployment
kubectl describe svc nginx-service
kubectl describe ingress node-express-ingress

## 5.使用 kubectl logs 查看正在运行的pod的日志
kubectl logs node-express
日志： Example app listening at http://localhost:8080

## 6.使用 kubectl port-forward 命令将本地请求直接转发到 pod
一条 k8s 命令来将指定的 pod 端口映射到本地的端口上
kubectl port-forward <资源类型>/<资源名> <本机端口>:<资源端口>
有个 pod 叫做pod/node-express ，它通过8080端口对外提供服务，
使用kubectl port-forward pod/node-express 8081:8080将其映射到本机的80端口上
使用 curl http://localhost:8081 
日志： Hello World!%


Advanced
## 1.安装 k8s dashboard，通过 dashboard 进行扩容 / 收缩；使用kubectl scale命令对deployment进行扩容 / 收缩
参考： https://kuboard.cn/install/install-k8s-dashboard.html#%E8%AE%BF%E9%97%AE
访问： http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/overview?namespace=default
命令： kubectl scale deployment node-express-deployment --replicas 4

## 2.简单描述 Pod, Node, Deployment, Service, Ingress, ReplicaSet, Namespace 概念
pod: k8s中可被调度的最小单位，k8s在进行workload调度的最小单元。 pod中只run一个或多个容器
deployment: 控制pod以怎样的形式被创建或者更新，不是直接管理Pod，是通过一层replicaset。
service: 控制服务之间通信，干一件事件的一堆pod。
ingress: 控制service之间和service与外部的通信。
namespace: 用来做k8s资源的逻辑隔离， 怎么划分namespace？一般根据业务场景。

## 3.创建一个kubernetes cronjob（扩展 Node.js 应用或使用其他工程）

  

