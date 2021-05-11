1.必须拥有一个 Kubernetes 的集群,同时你的 Kubernetes 集群必须带有 kubectl 命令行工具,
可以通过 Minikube 构建一 个你自己的集群
2.Minikube的作用  
Minikube是一种可以让您在本地轻松运行 Kubernetes 的工具。Minikube 在笔记本电脑上的虚拟机（VM）中
运行单节点 Kubernetes 集群，供那些希望尝试 Kubernetes 或进行日常开发的用户使用。
3.`minikube start`  
启动 Minikube 并创建一个集群

minikube start 命令可用于启动集群。
此命令将创建并配置一台虚拟机，使其运行单节点 Kubernetes 集群。
此命令还会配置您的 kubectl 安装，以便使其能与您的 Kubernetes 集群正确通信。

`minikube start --kubernetes-version v1.18.17`
将 --kubernetes-version 字符串添加到 `minikube start` 命令
来指定要用于 Minikube 的 Kubernetes 版本。
`minikube start --vm-driver=<driver_name>`
将 --vm-driver=<enter_driver_name> 参数添加到 minikube start 来更改 VM 驱动程序。
4.停止集群
minikube stop 命令可用于停止集群。
此命令关闭 Minikube 虚拟机，但保留*所有集群状态和数据*。
再次启动集群会将其恢复到以前的状态。
5.删除集群
minikube delete 命令可用于删除集群。
此命令将关闭并删除 Minikube 虚拟机，*不保留任何数据或状态*。
6.现在可以使用您可以使用 kubectl 与集群进行交互
7. Pod 运行异常的排错方法
https://feisky.gitbooks.io/kubernetes/content/troubleshooting/pod.html
8.   

