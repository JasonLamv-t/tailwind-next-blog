---
title: Docker 限制与性能测试
date: '2021-08-16'
tags: ['Docker', 'Docker-Engine-API', 'Serverless', 'Serverless-Devs']
draft: false
summary: 本文创作于Serverless-Devs开发时，为实现生成容器资源限制而进行的探究
images: []
layout: PostLayout
canonicalUrl:
---

## Benchmark and description

宿主机使用 htop 及 ctop 查看进程及占用

![image-20210902054450846](https://tva1.sinaimg.cn/large/008i3skNgy1gu1ujhfwgsj60q704z0te02.jpg)

![image-20210902054532064](https://tva1.sinaimg.cn/large/008i3skNgy1gu1uk5tj9tj60q603474i02.jpg)

Docker 限制：4Core/2G

容器使用 stress 及 hardinfo 进行测试

## E1-512MB

### stress -c 1/2/3/4(approximate result)

![image-20210902062258023](https://tva1.sinaimg.cn/large/008i3skNgy1gu1vn4bne5j60q902x74j02.jpg)

![image-20210902062407650](https://tva1.sinaimg.cn/large/008i3skNgy1gu1vobcpt6j60qb050dgv02.jpg)

### stress -c 1 --vm 1 --vm-bytes 500M --vm-keep

![image-20210902062909238](https://tva1.sinaimg.cn/large/008i3skNgy1gu1vtk2ccpj60q7031mxg02.jpg)

![image-20210902062938947](https://tva1.sinaimg.cn/large/008i3skNgy1gu1vu2n9rij60q804zwfh02.jpg)

### hardinfo -m benchmark.so -a

```bash
CPU Blowfish
------------

-CPU Blowfish-
<big><b>This Machine</b></big>	3100 MHz	24.643
Intel(R) Celeron(R) M processor         1.50GHz	(null)	26.1876862
PowerPC 740/750 (280.00MHz)	(null)	172.816713

CPU CryptoHash
--------------

-CPU CryptoHash-
<big><b>This Machine</b></big>	3100 MHz	68.646

CPU Fibonacci
-------------

-CPU Fibonacci-
<big><b>This Machine</b></big>	3100 MHz	3.646
Intel(R) Celeron(R) M processor         1.50GHz	(null)	8.1375674
PowerPC 740/750 (280.00MHz)	(null)	58.07682

CPU N-Queens
------------

-CPU N-Queens-
<big><b>This Machine</b></big>	3100 MHz	9.097

FPU FFT
-------

-FPU FFT-
<big><b>This Machine</b></big>	3100 MHz	2.284

FPU Raytracing
--------------

-FPU Raytracing-
<big><b>This Machine</b></big>	3100 MHz	10.704
Intel(R) Celeron(R) M processor         1.50GHz	(null)	40.8816714
PowerPC 740/750 (280.00MHz)	(null)	161.312647
```

## E1-2048MB

### stress -c 1

![image-20210902064216456](https://tva1.sinaimg.cn/large/008i3skNgy1gu1w775nn6j60q50313yr02.jpg)

![image-20210902064229313](/Users/linjiaxiang/Library/Application Support/typora-user-images/image-20210902064229313.png)

### stress -c 2/3/4(approximate result)

![image-20210902064306454](https://tva1.sinaimg.cn/large/008i3skNgy1gu1w82jja4j60q802xjrn02.jpg)

![image-20210902064330554](https://tva1.sinaimg.cn/large/008i3skNgy1gu1w8hj6prj60qb050ab602.jpg)

### stress -c 1 --vm 4 --vm-bytes 500M --vm-keep

![image-20210902064622133](https://tva1.sinaimg.cn/large/008i3skNgy1gu1wbgqbnoj60q902vaac02.jpg)

![image-20210902064637917](https://tva1.sinaimg.cn/large/008i3skNgy1gu1wbqkn7uj60q804zdh702.jpg)

Cpu usage 200%-300% on the host

### hardinfo -m benchmark.so -a

```bash
CPU Blowfish
------------

-CPU Blowfish-
<big><b>This Machine</b></big>	3100 MHz	6.055
Intel(R) Celeron(R) M processor         1.50GHz	(null)	26.1876862
PowerPC 740/750 (280.00MHz)	(null)	172.816713

CPU CryptoHash
--------------

-CPU CryptoHash-
<big><b>This Machine</b></big>	3100 MHz	274.023

CPU Fibonacci
-------------

-CPU Fibonacci-
<big><b>This Machine</b></big>	3100 MHz	1.239
Intel(R) Celeron(R) M processor         1.50GHz	(null)	8.1375674
PowerPC 740/750 (280.00MHz)	(null)	58.07682

CPU N-Queens
------------

-CPU N-Queens-
<big><b>This Machine</b></big>	3100 MHz	6.633

FPU FFT
-------

-FPU FFT-
<big><b>This Machine</b></big>	3100 MHz	0.692

FPU Raytracing
--------------

-FPU Raytracing-
<big><b>This Machine</b></big>	3100 MHz	6.301
Intel(R) Celeron(R) M processor         1.50GHz	(null)	40.8816714
PowerPC 740/750 (280.00MHz)	(null)	161.312647
```

## E1-3072MB

### stress -c 1

![image-20210902054728161](https://tva1.sinaimg.cn/large/008i3skNgy1gu1um6k81hj60q803haac02.jpg)

![image-20210902054802486](https://tva1.sinaimg.cn/large/008i3skNgy1gu1umv7d52j60qa051q4102.jpg)

### stress -c 2/3/4(approximate result)

![image-20210902054900735](https://tva1.sinaimg.cn/large/008i3skNgy1gu1uns0euwj60qc02zaaa02.jpg)

![image-20210902054918690](https://tva1.sinaimg.cn/large/008i3skNgy1gu1uo39fbnj60qa053jsf02.jpg)

### stress -c 1 --vm 4 --vm-bytes 500M --vm-keep

![image-20210902060507293](https://tva1.sinaimg.cn/large/008i3skNgy1gu1v4jn7u9j60q402zwer02.jpg)

![image-20210902060551944](https://tva1.sinaimg.cn/large/008i3skNgy1gu1v5bs66kj60q704wmyi02.jpg)

Cpu usage 300%-400% on the host

### hardinfo -m benchmark.so -a

```bash
CPU Blowfish
------------

-CPU Blowfish-
<big><b>This Machine</b></big>	3100 MHz	4.016
Intel(R) Celeron(R) M processor         1.50GHz	(null)	26.1876862
PowerPC 740/750 (280.00MHz)	(null)	172.816713

CPU CryptoHash
--------------

-CPU CryptoHash-
<big><b>This Machine</b></big>	3100 MHz	369.231

CPU Fibonacci
-------------

-CPU Fibonacci-
<big><b>This Machine</b></big>	3100 MHz	1.305
Intel(R) Celeron(R) M processor         1.50GHz	(null)	8.1375674
PowerPC 740/750 (280.00MHz)	(null)	58.07682

CPU N-Queens
------------

-CPU N-Queens-
<big><b>This Machine</b></big>	3100 MHz	4.748

FPU FFT
-------

-FPU FFT-
<big><b>This Machine</b></big>	3100 MHz	0.723

FPU Raytracing
--------------

-FPU Raytracing-
<big><b>This Machine</b></big>	3100 MHz	4.317
Intel(R) Celeron(R) M processor         1.50GHz	(null)	40.8816714
PowerPC 740/750 (280.00MHz)	(null)	161.312647
```

## C1-2048MB

### stress -c 1/2/3/4(approximate result)

![image-20210902070439847](https://tva1.sinaimg.cn/large/008i3skNgy1gu1wuhu81zj60qb037aab02.jpg)

![image-20210902070453132](https://tva1.sinaimg.cn/large/008i3skNgy1gu1wuq5appj60q704z75e02.jpg)

### stress -c 1 --vm 4 --vm-bytes 500M --vm-keep

![image-20210902070550389](https://tva1.sinaimg.cn/large/008i3skNgy1gu1wvq8rmdj60q90380t102.jpg)

![image-20210902070604889](https://tva1.sinaimg.cn/large/008i3skNgy1gu1wvz4ndgj60q70533zs02.jpg)

Cpu usage 200%-300% on the host

### hardinfo -m benchmark.so -a

```bash
CPU Blowfish
------------

-CPU Blowfish-
<big><b>This Machine</b></big>	3100 MHz	8.323
Intel(R) Celeron(R) M processor         1.50GHz	(null)	26.1876862
PowerPC 740/750 (280.00MHz)	(null)	172.816713

CPU CryptoHash
--------------

-CPU CryptoHash-
<big><b>This Machine</b></big>	3100 MHz	204.086

CPU Fibonacci
-------------

-CPU Fibonacci-
<big><b>This Machine</b></big>	3100 MHz	1.253
Intel(R) Celeron(R) M processor         1.50GHz	(null)	8.1375674
PowerPC 740/750 (280.00MHz)	(null)	58.07682

CPU N-Queens
------------

-CPU N-Queens-
<big><b>This Machine</b></big>	3100 MHz	2.982

FPU FFT
-------

-FPU FFT-
<big><b>This Machine</b></big>	3100 MHz	0.718

FPU Raytracing
--------------

-FPU Raytracing-
<big><b>This Machine</b></big>	3100 MHz	3.430
Intel(R) Celeron(R) M processor         1.50GHz	(null)	40.8816714
PowerPC 740/750 (280.00MHz)	(null)	161.312647
```

## Data analysis and conclusion

|                              | E1-512M | E1-2048M  | E1-3072M  | C1-2048M  |
| ---------------------------- | ------- | --------- | --------- | --------- |
| CPU(only) maximum usage      | 32%/45% | 100%/110% | 200%/202% | 100%/105% |
| CPU(with RAM) maximum usage  | 32%/45% | 136%/140% | 200%/400% | 80%/300%  |
| CPU Blowfish(less is better) | 24.643  | 6.055     | 4.016     | 8.323     |

通过对比宿主机 CPU 使用，发现当容器负载增加时，所有核心的负载都有所上升，0，2，4，6 核心尤为显著，docker 指定 cpuset 似乎失效。

通过 cpuperiod 和 cpuquota 可以控制 cpu 性能和内存大小成正比，对应比例与[issue](https://github.com/devsapp/fc/issues/80)给出比例相同；当容器分配性能为 1 核时，尽管负载平均分配到了宿主机的所有可用核心，但是容器性能仍为宿主机 1 核。

存在反复大量使用内存的进程时，宿主机的负载会超过存 CPU 负载极限，推测是 docker 在调配内存资源时需要额外占用 CPU 性能。
