1.执行`kubectl apply -f pod.yaml`命令时候，报错
error: error validating "pod.yaml": error validating data: the server could not find the requested resource; if you choose to ignore these errors, turn validation off with --validate=false
若执行`kubectl apply -f pod.yaml --validate=false`，则pod创建成功
2.执行`kubectl apply -f deployment.yaml`命令时候，报错    
error: unable to decode "deployment.yaml": no kind "Deployment" is registered for version "apps/v1"
原因：使用`brew install minikube` 安装的`kubectl version --client`版本太低。


