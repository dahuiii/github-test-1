# Git版本管理 - 小白入门指南

> 专为代码0基础用户设计的Git使用教程

---

## 1. 什么是Git？

### 1.1 通俗解释

**Git是什么？**
- Git是一个"时光机"
- 它可以记录你代码的所有变化
- 你可以随时回到之前的任何一个版本
- 就像玩游戏时的"存档"和"读档"

**为什么需要Git？**
- 误删了代码？可以恢复
- 改错了代码？可以撤销
- 想知道改了什么？可以查看历史
- 多人协作？可以合并代码

**Git和GitHub的区别？**
- Git：工具，安装在本地电脑上
- GitHub：网站，用于存储Git的代码仓库
- 关系：Git把代码上传到GitHub

---

## 2. 在Trae IDE中使用Git的步骤

### 2.1 第一步：检查Git是否已安装

在Trae IDE的终端中输入以下命令：

```bash
git --version
```

**如果看到版本号**（例如：git version 2.39.0），说明Git已经安装好了。

**如果提示"找不到命令"**，说明Git没有安装，需要先安装Git。

### 2.2 第二步：配置Git信息（只需要配置一次）

Git需要知道你是谁，这样它才能记录是谁修改了代码。

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

**示例**：
```bash
git config --global user.name "张三"
git config --global user.email "zhangsan@example.com"
```

**注意**：
- 名字可以是中文或英文
- 邮箱建议使用真实的邮箱
- 这个配置只需要做一次

### 2.3 第三步：初始化Git仓库

在项目文件夹中初始化Git。

```bash
cd d:\Trae_Project\05_I_have_an_idea
git init
```

**说明**：
- `cd`：进入项目文件夹
- `git init`：初始化Git仓库
- 执行后，项目文件夹中会多一个`.git`文件夹（隐藏的）

### 2.4 第四步：添加文件到Git

把文件添加到Git的跟踪范围。

```bash
git add .
```

**说明**：
- `git add .`：添加当前文件夹下的所有文件
- 也可以指定具体文件，例如：`git add index.html`
- 这个命令只是把文件放到"暂存区"，还没有真正保存

### 2.5 第五步：提交代码

把暂存区的文件保存到Git仓库。

```bash
git commit -m "第一次提交"
```

**说明**：
- `git commit`：提交代码
- `-m`：添加提交说明
- `"第一次提交"`：提交说明，说明这次提交做了什么

**提交说明的规范**：
- 简洁明了，说明这次做了什么
- 示例：
  - "添加项目文档"
  - "修复图谱显示bug"
  - "更新数据文件"

### 2.6 第六步：查看提交历史

查看所有的提交记录。

```bash
git log
```

**说明**：
- 会显示所有的提交记录
- 包括提交ID、作者、时间、说明等
- 按`q`键退出

---

## 3. Git的常用操作

### 3.1 查看当前状态

```bash
git status
```

**说明**：
- 查看哪些文件被修改了
- 查看哪些文件在暂存区
- 查看哪些文件还没有被Git跟踪

### 3.2 查看文件的变化

```bash
git diff
```

**说明**：
- 查看文件具体改了什么
- 显示删除的内容（红色）和新增的内容（绿色）
- 按`q`键退出

### 3.3 撤销未提交的修改

```bash
git checkout -- 文件名
```

**示例**：
```bash
git checkout -- index.html
```

**说明**：
- 撤销对某个文件的修改
- 恢复到上一次提交的状态
- 注意：这个操作不可逆，要谨慎使用

### 3.4 回退到之前的版本

```bash
git reset --hard 提交ID
```

**示例**：
```bash
git reset --hard abc1234
```

**说明**：
- 回退到指定的提交版本
- `--hard`：完全回退，包括工作区和暂存区
- 注意：这个操作不可逆，要谨慎使用

---

## 4. 在Trae IDE中使用Git的图形界面

Trae IDE可能提供了图形界面来使用Git，操作更简单。

### 4.1 查看Git面板

在Trae IDE中：
- 查看左侧或右侧是否有Git相关的面板
- 通常显示为"源代码管理"或"Git"图标
- 点击可以打开Git面板

### 4.2 使用Git面板

**提交代码**：
1. 在Git面板中查看修改的文件
2. 勾选要提交的文件
3. 在输入框中输入提交说明
4. 点击"提交"按钮

**查看历史**：
1. 在Git面板中点击"历史"或"日志"
2. 查看所有的提交记录
3. 可以点击某个提交查看详细信息

**撤销修改**：
1. 在Git面板中右键点击文件
2. 选择"撤销修改"或"恢复"

---

## 5. 常见问题解决

### 5.1 问题1：Git提示"nothing to commit"

**原因**：没有文件需要提交

**解决**：
- 确保已经修改了文件
- 或者确保已经执行了`git add .`

### 5.2 问题2：Git提示"untracked files"

**原因**：有新文件还没有被Git跟踪

**解决**：
```bash
git add .
git commit -m "添加新文件"
```

### 5.3 问题3：Git提示"Changes not staged for commit"

**原因**：文件被修改了，但还没有添加到暂存区

**解决**：
```bash
git add .
git commit -m "更新文件"
```

### 5.4 问题4：忘记提交说明

**原因**：执行`git commit`时没有加`-m`参数

**解决**：
- Git会打开一个编辑器让你输入提交说明
- 输入说明后保存并退出
- 或者按`Ctrl+C`取消，重新执行`git commit -m "说明"`

---

## 6. Git工作流程总结

### 6.1 基本工作流程

```
1. 修改文件
   ↓
2. git add . （添加到暂存区）
   ↓
3. git commit -m "说明" （提交到本地仓库）
   ↓
4. git log （查看历史）
```

### 6.2 日常使用场景

**场景1：开始新项目**
```bash
cd 项目文件夹
git init
git add .
git commit -m "初始化项目"
```

**场景2：修改代码后保存**
```bash
git add .
git commit -m "添加新功能"
```

**场景3：查看历史**
```bash
git log
```

**场景4：误删文件恢复**
```bash
git checkout -- 被删除的文件名
```

---

## 7. Git的最佳实践

### 7.1 提交说明的规范

**好的提交说明**：
- "添加用户登录功能"
- "修复页面显示bug"
- "更新数据文件"

**不好的提交说明**：
- "update"
- "fix"
- "123"

### 7.2 提交的频率

- 建议：完成一个小功能就提交一次
- 不要：改了很多代码才提交一次
- 原因：小步提交，容易定位问题

### 7.3 不要提交的文件

有些文件不需要提交到Git，例如：
- 临时文件
- 系统生成的文件
- 包含密码的文件

**创建`.gitignore`文件**：
在项目根目录创建`.gitignore`文件，内容示例：
```
*.log
*.tmp
node_modules/
.DS_Store
```

---

## 8. 下一步学习

### 8.1 推荐学习资源

**Git官方文档**：
- Git官方文档（https://git-scm.com/doc）
- Git简明指南（https://rogerdudler.github.io/git-guide/index.zh.html）

**视频教程**：
- B站搜索"Git教程"
- YouTube搜索"Git tutorial for beginners"

**在线练习**：
- Learn Git Branching（https://learngitbranching.js.org/）

### 8.2 进阶学习

当你掌握了基础操作后，可以学习：
- 分支（branch）：并行开发多个功能
- 合并（merge）：合并不同的代码
- 远程仓库（remote）：与GitHub等平台交互
- 拉取（pull）和推送（push）：同步代码

---

## 9. 总结

### 9.1 Git的核心命令

| 命令 | 作用 |
|------|------|
| `git init` | 初始化Git仓库 |
| `git add .` | 添加所有文件到暂存区 |
| `git commit -m "说明"` | 提交代码 |
| `git status` | 查看当前状态 |
| `git log` | 查看提交历史 |
| `git diff` | 查看文件变化 |
| `git checkout -- 文件` | 撤销文件修改 |

### 9.2 给小白的建议

1. **不要害怕**：Git看起来复杂，但常用命令就几个
2. **多练习**：多使用Git，熟能生巧
3. **善用图形界面**：Trae IDE的图形界面更简单
4. **及时提交**：完成小功能就提交，不要积累
5. **写好说明**：提交说明要清晰，方便以后查看

### 9.3 常用命令速查

```bash
# 初始化
git init

# 配置
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 添加和提交
git add .
git commit -m "提交说明"

# 查看状态和历史
git status
git log

# 查看和撤销变化
git diff
git checkout -- 文件名
```

---

## 10. 快速开始

如果你想快速开始使用Git，按照以下步骤操作：

```bash
# 1. 进入项目文件夹
cd d:\Trae_Project\05_I_have_an_idea

# 2. 初始化Git
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "初始化项目"

# 5. 查看历史
git log
```

完成！现在你的项目已经使用Git进行版本管理了。

---

祝你使用Git顺利！如果遇到问题，随时问我。
