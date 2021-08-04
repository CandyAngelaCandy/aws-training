### 五、总结
1.如何构造一个比较clean的镜像？  
基础镜像体积尽可能小  

2.Dockerfile中 RUN, entrypoint 和 CMD的区别  

作用：
从根本上说, ENTRYPOINT和CMD都是让用户指定一个可执行程序, 这个可执行程序在container启动后自动启动. 
实际上, 如果你想让自己制作的镜像自动运行程序(不需要在docker run后面添加命令行指定运行的命令), 你必须在Dockerfile里面, 使用ENTRYPOINT或者CMD命令

当Docker运行一个容器时，它会在其中运行一个镜像，这个镜像通常通过执行Docker指令构建。Docker指令在现有镜像之上添加层，
每个添加的层都会创建一个新镜像。
所有三个指令(RUN，CMD和ENTRYPOINT)都可以用shell形式或exec形式指定

- shell形式：
  `<instruction> <command>`

例如
```
RUN apt-get install python3
CMD echo "Hello world"
ENTRYPOINT echo "Hello world"
```
特点： 会调用/bin/sh -c 并进行正常的shell处理
```
ENV name John Dow
ENTRYPOINT echo "Hello, $name"
```
当容器运行docker run -it  时将输出`Hello, John Dow`

- exec形式
  这是CMD和ENTRYPOINT指令的首选形式。
  <instruction> ["executable", "param1", "param2", ...]
```
RUN ["apt-get", "install", "python3"]
CMD ["/bin/echo", "Hello world"]
ENTRYPOINT ["/bin/echo", "Hello world"]
```
当以exec形式执行指令时，它直接调用可执行文件，并且不会发生shell处理。例如，Dockerfile中的以下代码段
```
ENV name John Dow
ENTRYPOINT ["/bin/echo", "Hello, $name"]
```
当容器运行docker run -it  时将输出`Hello, $name`,变量名称未替换。

注意：使用exec形式与/bin/bash作为可执行文件。在这种情况下，将进行正常的shell处理。
``` 
ENV name John Dow
ENTRYPOINT ["/bin/bash", "-c", "echo Hello, $name"]
``` 
当容器运行docker run -it  时将输出`Hello, John Dow`

RUN 指令  
RUN指令允许您安装应用程序和程序包。它在当前镜像之上执行任何命令，并通过提交结果来创建新层。

RUN指令的一个很好的例子是安装多个版本控制系统包：
``` 
RUN apt-get update && apt-get install -y \
bzr \
cvs \
git \
mercurial \
subversion
```
建议多个指令用&&隔开在一个run中执行。

CMD 指令  
CMD指令允许您设置默认命令，该命令仅在您运行容器不指定命令时候运行。
如果Docker容器使用命令运行，则将忽略默认命令。如果Dockerfile具有多个CMD指令，则忽略除最后一个CMD指令之外的所有指令。

CMD指令是如何工作的。Dockerfile中的以下片段
```
CMD echo "Hello world"
```
当容器运行docker run -it  时将输出
```
Hello world
```

但是当容器使用命令运行时，例如，
```
docker run -it  /bin/bash，
```
忽略CMD并改为运行bash指令：
```
root@7de4bed89922:/#
```

ENTRYPOINT
ENTRYPOINT指令允许您配置将作为可执行文件运行的容器。它看起来类似于CMD，因为它还允许您使用参数指定命令。
区别在于当Docker容器使用命令行参数运行时，ENTRYPOINT命令不会忽略参数。
ENTRYPOINT的Exec形式允许您设置命令和参数，然后使用任一形式的CMD来设置更可能更改的其他参数。使用ENTRYPOINT参数，
而可以通过Docker容器运行时提供的命令行参数覆盖CMD。

ENTRYPOINT 的 Exec 格式用于设置容器启动时要执行的命令及其参数，同时可通过CMD命令或者命令行参数提供额外的参数。
ENTRYPOINT 中的参数始终会被使用，这是与CMD命令不同的一点。下面是一个例子：
例如，Dockerfile中的以下代码段
ENTRYPOINT ["/bin/echo", "Hello"]
CMD ["world"]
当容器运行docker run -it 时将输出
Hello world
但是当容器运行docker run -it  John时，将输出
Hello John
注意：ENTRYPOINT 中的参数始终会被使用，而 CMD 的额外参数可以在容器启动时动态替换掉。

总结：
1.使用 RUN 指令安装应用和软件包，构建镜像。
2.如果想为容器设置默认的启动命令，可使用 CMD 指令。用户可在 docker run 命令行中替换此默认命令。在一个dockerfile中只有最后一个cmd 指令有效，因此一个dockerfile中只写一个cmd 指令。
3.如果 Docker 镜像的用途是运行应用程序或服务，比如运行一个 MySQL，
应该优先使用 Exec 格式的 ENTRYPOINT 指令。CMD 可为 ENTRYPOINT 提供额外的默认参数，
同时可利用 docker run 命令行替换默认参数。

对于 Dockerfile 来说，CMD 和 ENTRYPOINT 是非常重要的指令。它们不是在构建镜像的过程中执行，而是在启动容器时执行，
所以主要用来指定容器默认执行的命令。RUN命令在构建镜像时候执行。


同时使用 CMD 和 ENTRYPOINT 的情况
对于 CMD 和 ENTRYPOINT 的设计而言，多数情况下它们应该是单独使用的。当然，有一个例外是 CMD 为 ENTRYPOINT 提供默认的可选参数。
我们大概可以总结出下面几条规律：
• 如果 ENTRYPOINT 使用了 shell 模式，CMD 指令会被忽略。
• 如果 ENTRYPOINT 使用了 exec 模式，CMD 指定的内容被追加为 ENTRYPOINT 指定命令的参数。
• 如果 ENTRYPOINT 使用了 exec 模式，CMD 也应该使用 exec 模式。

参考：https://www.cnblogs.com/sparkdev/p/8461576.html


3.volumes的两种配法

4.volumes挂载在宿主机的目录，因为Mac和linux文件目录结构不同，linux能找到具体挂载的目录，
   但Mac找不到。

5.dockerfile实践
变化少的文件，应该放在dockerfile的上面  

6.ports功能  
docker-compose中有两种方式可以暴露容器的端口：ports和expose。
```
ports:
  - "80:80"         # 绑定容器的80端口到主机的80端口
  - "9000:80"       # 绑定容器的80端口到主机的9000端口
  - "443"           # 绑定容器的443端口到主机的任意端口，容器启动时随机分配绑定的主机端口号
```
不写port可以吗
不管是否指定主机端口，使用ports都会将端口暴露给主机和其他容器。  

7.expose  
expose暴露容器给link到当前容器的容器，或者暴露给同一个networks的容器，用法：
expose:
- "3000"
- "8000"
以上指令将当前容器的端口3000和8000暴露给其他容器。

和ports的区别是，expose不会将端口暴露给主机，主机无法访问expose的端口。

8.docker compose中的hostname

9.ADD 和copy的区别
两个命令都差不多，它们的语法都是COPY|ADD <src> <dst>。

但是ADD比COPY功能要丰富一些：

1.ADD允许<src>是一个URL。
2.ADD的另一个功能是能够自动解压缩压缩文件。如果参数是一个识别压缩格式（tar，gzip，bzip2等）的本地文件，那么它将被解压到容器文件系统中的指定处。
如果<src>是一个常见的压缩格式，如tar.gz。那么它会被解压。，

一般常用COPY。例如要复制xxx.tar.gz到容器，如果被解压可能会出乎你的意料
COPY实际上只是ADD的精简版本，旨在满足大部分“复制文件到容器”的使用案例而没有任何副作用。

10.volume的两种写法？

### 培训总结
1. Compose 里使用 image 或者 build，本地服务最好使用 build
2. 尽量使用 networks 而不是 links
3. 前端访问后端使用**主机的地址**而不是容器内的服务名称
4. RUN 后面，同类型的操作尽量使用 && 连接起来，只建立一层
5. EXPOSE 是个提示，容器内部同一个网端下所有端口是可以直接访问的
6. docker rmi 使用名称删除是基于 tag 进行删除的，使用 id 删除会删除镜像文件
7. 尽量少使用 restart=always



