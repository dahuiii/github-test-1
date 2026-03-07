# AI术语关联图谱 - 轻量架构设计文档

> 专为代码0基础用户设计的简单架构

---

## 1. 项目目录结构

### 1.1 最简化的目录结构

```
ai-terms-graph/
├── index.html          # 主页面（双击即可运行）
├── css/
│   └── style.css       # 样式文件
└── js/
    └── app.js          # 业务逻辑代码（包含内嵌的graphData数据）
```

### 1.2 目录说明

**index.html**
- 网页的主文件
- 包含页面的HTML结构
- 引入ECharts的CDN链接
- 双击这个文件就可以在浏览器中打开

**css/style.css**
- 存储页面的样式
- 控制颜色、字体、布局等
- 让页面看起来更美观

**js/app.js**
- 存储页面的功能代码
- 包含内嵌的graphData数据（AI术语数据）
- 控制图谱的显示、交互等
- 实现悬停显示解释、节点筛选等功能

**数据存储说明**
- 数据直接内嵌在app.js中，而不是单独的data.json文件
- 这样可以避免浏览器安全限制，支持直接打开HTML文件（file://协议）
- 修改数据时，直接编辑app.js中的graphData对象

---

## 2. 核心模块划分

### 2.1 模块概览

考虑到代码0基础，我们将整个项目分为3个核心模块：

```
项目
├── 数据模块（app.js中的graphData对象）
├── 视图模块（index.html + style.css）
└── 控制模块（app.js中的交互逻辑）
```

### 2.2 数据模块

**文件**：app.js（内嵌的graphData对象）

**功能**：
- 存储所有AI术语的数据
- 定义术语之间的关联关系
- 提供术语的通俗解释

**数据结构**：
```javascript
let graphData = {
  "nodes": [
    {
      "id": "llm",
      "name": "LLM",
      "label": "LLM (大语言模型)",
      "category": "main",
      "description": "AI大脑，它是一个阅读了互联网上几乎所有文本的'超级博学家'..."
    }
  ],
  "links": [
    {
      "source": "llm",
      "target": "multimodal",
      "relation": "包含"
    }
  ]
};
```

**为什么这样设计**：
- 简单直观，容易理解和修改
- 数据内嵌在代码中，避免浏览器安全限制
- 支持直接打开HTML文件（file://协议）
- 修改数据时直接编辑app.js即可

### 2.3 视图模块

**文件**：index.html + style.css

**功能**：
- index.html：定义页面的结构（标题、图谱容器等）
- style.css：定义页面的样式（颜色、字体、布局）

**index.html 结构**：
```html
<!DOCTYPE html>
<html>
<head>
  <title>AI术语关联图谱</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>AI术语关联图谱</h1>
  <div id="graph"></div>
  <script src="js/app.js"></script>
</body>
</html>
```

**style.css 结构**：
```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
}

#graph {
  width: 100%;
  height: 600px;
}
```

**为什么这样设计**：
- HTML和CSS分离，结构清晰
- 样式独立，修改样式不影响功能
- 符合Web开发的标准做法

### 2.4 控制模块

**文件**：js/app.js

**功能**：
- 读取data.json中的数据
- 使用ECharts绘制图谱
- 处理用户的交互（悬停、点击等）

**代码结构**：
```javascript
// 1. 数据已内嵌在graphData变量中
let graphData = { /* ... 数据 ... */ };
let originalGraphData = null;  // 保存原始数据用于恢复
let selectedNodeId = null;     // 记录当前选中的节点

// 2. 初始化ECharts
const chart = echarts.init(document.getElementById('graph'));

// 3. 配置图谱选项
const option = {
  tooltip: { /* 悬停提示配置 */ },
  series: [{
    type: 'graph',
    data: graphData.nodes,
    links: graphData.links,
    // ... 其他配置
  }]
};

// 4. 渲染图谱
chart.setOption(option);

// 5. 处理交互
// 悬停显示解释
// 点击节点处理
chart.on('click', function(params) {
  if (params.dataType === 'node') {
    const node = params.data;
    
    if (selectedNodeId === node.id) {
      // 如果点击的是已选中的节点
      if (node.category === 'main' && expandedNodeId !== node.id) {
        // 主节点第二次点击：展开关联下的所有节点
        expandAllRelatedNodes(node.id);
      } else {
        // 恢复所有节点
        restoreAllNodes();
      }
    } else {
      // 显示相关节点（第一次点击）
      showRelatedNodes(node.id);
    }
  }
});

// 点击空白处恢复所有节点
chart.getZr().on('click', function(params) {
  if (!params.target) {
    restoreAllNodes();
  }
});

// 显示相关节点（直接相连）
function showRelatedNodes(nodeId) {
  // 找到直接相连的节点并更新图表
}

// 展开所有关联节点（包括间接关联）
function expandAllRelatedNodes(nodeId) {
  // 使用广度优先搜索找到所有关联节点
  // 更新图表显示所有关联节点
}

// 恢复所有节点
function restoreAllNodes() {
  // 恢复显示完整图谱
}
```

**为什么这样设计**：
- 代码逻辑清晰，容易理解
- 功能集中在一个文件中，便于管理
- 使用ECharts提供的API，简化开发
- 支持节点筛选交互，提升用户体验

---

## 3. 数据模型设计

### 3.1 数据模型概览

整个数据模型包含两个核心部分：
- **nodes（节点）**：表示AI术语
- **links（连线）**：表示术语之间的关联关系

### 3.2 节点（Node）模型

**节点结构**：
```json
{
  "id": "llm",                    // 节点的唯一标识
  "name": "LLM",                  // 节点显示的名称
  "label": "LLM (大语言模型)",     // 节点的完整标签
  "category": "main",             // 节点类别（main/sub/sub-sub）
  "description": "AI大脑，它是一个阅读了互联网上几乎所有文本的'超级博学家'..."  // 术语解释
}
```

**字段说明**：
- **id**：节点的唯一标识，不能重复
- **name**：节点在图谱中显示的简短名称
- **label**：节点的完整标签，用于详细信息展示
- **category**：节点类别，用于区分主节点、次节点、次次节点
- **description**：术语的通俗解释

**为什么这样设计**：
- id用于建立节点之间的关联关系
- name和label分离，图谱显示简短，详细信息显示完整
- category用于区分不同层级的节点，方便设置不同的样式
- description存储术语解释，悬停时显示

### 3.3 连线（Link）模型

**连线结构**：
```json
{
  "source": "llm",      // 起始节点的id
  "target": "multimodal", // 目标节点的id
  "relation": "包含"     // 关联关系的描述
}
```

**字段说明**：
- **source**：起始节点的id
- **target**：目标节点的id
- **relation**：关联关系的描述（可选）

**为什么这样设计**：
- 使用节点id建立关联，而不是节点名称，更稳定
- relation字段用于描述关联关系，便于理解

### 3.4 完整数据示例

```json
{
  "nodes": [
    {
      "id": "llm",
      "name": "LLM",
      "label": "LLM (大语言模型)",
      "category": "main",
      "description": "AI大脑，它是一个阅读了互联网上几乎所有文本的'超级博学家'。它不仅能聊天，还能写代码、推理、翻译等等。"
    },
    {
      "id": "multimodal",
      "name": "多模态",
      "label": "多模态",
      "category": "sub",
      "description": "大模型不仅懂文字，还懂视频、音频、图表。"
    }
  ],
  "links": [
    {
      "source": "llm",
      "target": "multimodal",
      "relation": "包含"
    }
  ]
}
```

---

## 4. 代码规范建议

### 4.1 命名规范

**文件命名**：
- 使用小写字母
- 多个单词用连字符（-）连接
- 示例：`style.css`、`app.js`、`data.json`

**变量命名**：
- 使用驼峰命名法（camelCase）
- 第一个单词首字母小写，后续单词首字母大写
- 示例：`userName`、`graphData`、`chartInstance`

**函数命名**：
- 使用动词开头，描述函数的功能
- 示例：`loadData()`、`renderGraph()`、`handleHover()`

### 4.2 代码格式

**缩进**：
- 使用2个空格缩进
- 不要使用Tab键

**空格**：
- 操作符前后加空格
- 示例：`const a = 1 + 2;` 而不是 `const a=1+2;`

**换行**：
- 每行代码不要太长，建议不超过80个字符
- 适当换行，提高可读性

### 4.3 注释规范

**单行注释**：
- 使用 `//` 开头
- 放在代码上方或右侧
- 示例：
```javascript
// 读取数据文件
const data = fetch('data.json').then(res => res.json());
```

**多行注释**：
- 使用 `/* */` 包裹
- 用于解释复杂的逻辑
- 示例：
```javascript
/*
 * 初始化ECharts图表
 * 配置图谱的基本参数
 */
const chart = echarts.init(document.getElementById('graph'));
```

**注释原则**：
- 注释要简洁明了
- 不要注释显而易见的代码
- 注释"为什么"，而不是"是什么"

### 4.4 文件组织

**HTML文件**：
- `<!DOCTYPE html>` 在第一行
- `<head>` 中包含meta、title、link、script引用
- `<body>` 中包含页面内容

**CSS文件**：
- 先写通用样式（body、html）
- 再写组件样式
- 最后写工具类

**JavaScript文件**：
- 先定义常量和变量
- 再定义函数
- 最后执行主逻辑

### 4.5 调试建议

**使用浏览器开发者工具**：
- 按F12打开开发者工具
- 查看Console（控制台）的错误信息
- 使用console.log()输出调试信息

**常见错误**：
- 文件路径错误：检查文件名和路径是否正确
- 语法错误：检查括号、引号是否匹配
- 数据格式错误：检查JSON格式是否正确

**调试技巧**：
- 一步一步执行，逐步排查问题
- 使用console.log()输出中间结果
- 查看浏览器控制台的错误提示

---

## 5. 开发流程建议

### 5.1 开发步骤

**步骤1：创建项目目录**
```
ai-terms-graph/
├── index.html
├── data.json
├── css/
│   └── style.css
└── js/
    └── app.js
```

**步骤2：准备数据**
- 编辑app.js中的graphData对象，添加AI术语数据
- 确保JavaScript对象格式正确

**步骤3：编写HTML**
- 创建index.html
- 引入Vue和ECharts的CDN
- 创建图谱容器

**步骤4：编写CSS**
- 创建style.css
- 设置页面样式

**步骤5：编写JavaScript**
- 创建app.js
- 读取数据
- 初始化ECharts
- 配置图谱选项
- 处理交互

**步骤6：测试**
- 双击index.html打开页面
- 测试图谱显示
- 测试交互功能

### 5.2 学习资源

**HTML/CSS/JavaScript基础**：
- MDN Web文档（https://developer.mozilla.org/zh-CN/）
- W3School（https://www.w3school.com.cn/）

**Vue 3文档**：
- Vue 3官方文档（https://cn.vuejs.org/）

**ECharts文档**：
- ECharts官方文档（https://echarts.apache.org/zh/）

**在线学习平台**：
- 菜鸟教程（https://www.runoob.com/）
- 廖雪峰的官方网站（https://www.liaoxuefeng.com/）

---

## 6. 总结

这个轻量架构的特点：

1. **简单易懂**：目录结构清晰，模块划分明确
2. **易于上手**：不需要复杂的工具，双击即可运行
3. **易于维护**：数据和代码分离，修改方便
4. **易于扩展**：可以逐步添加新功能

对于代码0基础的用户，建议：
1. 先理解整体架构
2. 从简单的HTML开始
3. 逐步添加CSS和JavaScript
4. 遇到问题多查文档、多调试
5. 不要害怕出错，错误是学习的一部分

祝你开发顺利！
