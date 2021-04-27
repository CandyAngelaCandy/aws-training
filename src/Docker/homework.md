Basic

AC:
[x] **至少自己 build 2 个 docker images (Dockerfile)**
[x] **使用 docker-compose 管理 docker container**
[x] **画出架构图**
[x] **描述Docker的网络模式以及区别，使用场景？**


Advanced

AC:
简要描述AUFS文件系统的特点以及优缺点，如何解决性能问题，如何实现数据持久化（如数据库重启后数据不丢失），并在作业中体现
[x] 至少使用4个docker containers并分布在不同network，要求可以实现：nginx容器可以外部访问，nginx可以访问后端服务，后端服务可以访问数据库，nginx不能访问数据库
简要描述Docker和虚拟机的对比
将自己的docker image放在Docker hub / AWS ECR，image一定不要包含敏感信息，注意private和public权限
思考：容器如何实现高可用（optional）
