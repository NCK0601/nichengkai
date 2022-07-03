# Express-TypeScript

> TypeScript 版本的 Express 框架，支持使用装饰器注册路由

## 安装

```bash
npm i @nichengkai/express-typescript -S
```

## 使用

### 注册路由

> 装饰器参数都为必填

#### 控制器装饰器

> 参数为跟路径

```TypeScript
@Controller('/root')
```

#### 路由装饰器

> 参数为 URL 地址

```TypeScript
@Get('/')
@Put('/')
@Post('/')
@Patch('/')
@Delete('/')
```

### 注册定时任务

#### 开启任务

> 写了以后才会执行任务

```TypeScript
@Task
```

#### 循环任务

> 可选单位 ms s min h D W M Y

```TypeScript
@Loop('100ms')
```

#### 定时任务

默认值：@Time('00:00:00'), 如果设置了 @Week 或者 @Month，没有设置 @Time, 则默认零点执行。

```TypeScript
// 设置时间
@Time('00:00')
@Time('00:00:00')
// 设置周
@Week('1')
// 设置月
@Month('15')
```

##### 使用试例

1. 每天下午一点执行

```TypeScript
@Time('13:00')
```

2. 每周一中午十二点执行

```TypeScript
@Week('1')
@Time('12:00')
```

1. 每个月 15 号上午十点执行

```TypeScript
@Month('15')
@Time('10:00')
```
