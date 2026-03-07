let chart;
let originalGraphData = null;
let selectedNodeId = null;
let expandedNodeId = null; // 记录已展开的主节点
let graphData = {
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
      "description": "大模型不仅懂文字，还懂视频、音频、图表。就像人不仅能看书，还能看图、听音乐、看电影一样，AI也能同时处理多种类型的信息。"
    },
    {
      "id": "prompt",
      "name": "提示词",
      "label": "提示词",
      "category": "sub",
      "description": "怎么描述才能让AI听得懂，干得好。就像跟人说话一样，怎么说、怎么问，AI的回答质量就会不一样。好的提示词能让AI更好地理解你的需求。"
    },
    {
      "id": "prompt_engineering",
      "name": "提示词工程",
      "label": "提示词工程",
      "category": "sub-sub",
      "description": "专门研究怎么写好提示词的技术。通过精心设计提示词，可以让AI输出更准确、更符合预期的结果。"
    },
    {
      "id": "structured_prompt",
      "name": "结构化提示词",
      "label": "结构化提示词",
      "category": "sub-sub",
      "description": "用固定格式写提示词，让AI更容易理解。比如用JSON格式、表格格式等，让AI知道你想要什么样的输出。"
    },
    {
      "id": "context",
      "name": "上下文",
      "label": "上下文",
      "category": "sub",
      "description": "就像人的'工作记忆'。上下文越长，你能跟它聊的天就越长，它越不会聊着聊着就忘了前面说过什么。就像你跟人聊天，对方记得你们之前聊过什么。"
    },
    {
      "id": "hallucination",
      "name": "幻觉",
      "label": "幻觉",
      "category": "sub",
      "description": "当AI不知道答案时，它可能会编造一个看起来非常真实但实际上错误的事实。AI有时候会一本正经胡说八道。就像考试时不会做，但为了得分硬编了一个看起来很合理的答案。"
    },
    {
      "id": "model_products",
      "name": "模型产品",
      "label": "模型产品",
      "category": "main",
      "description": "这些是你能直接使用的AI产品，就像不同品牌的手机，各有各的特点。"
    },
    {
      "id": "foreign_models",
      "name": "国外模型",
      "label": "国外模型",
      "category": "sub",
      "description": "国外公司开发的AI产品"
    },
    {
      "id": "gpt",
      "name": "GPT系列",
      "label": "GPT系列",
      "category": "sub-sub",
      "description": "OpenAI开发的，最早火起来的AI。GPT-3、GPT-4等版本，是目前最强大的大语言模型之一。"
    },
    {
      "id": "claude",
      "name": "Claude系列",
      "label": "Claude系列",
      "category": "sub-sub",
      "description": "Anthropic开发的，以安全性著称。Claude在处理长文本、安全性方面表现优秀。"
    },
    {
      "id": "gemini",
      "name": "Gemini",
      "label": "Gemini",
      "category": "sub-sub",
      "description": "Google开发的，搜索功能很强。Gemini整合了Google的搜索能力，在获取最新信息方面有优势。"
    },
    {
      "id": "llama",
      "name": "Llama",
      "label": "Llama",
      "category": "sub-sub",
      "description": "Meta开源的，免费给开发者用。Llama系列是开源社区最活跃的大语言模型之一。"
    },
    {
      "id": "domestic_models",
      "name": "国内模型",
      "label": "国内模型",
      "category": "sub",
      "description": "国内公司开发的AI产品"
    },
    {
      "id": "wenxin",
      "name": "文心一言",
      "label": "文心一言",
      "category": "sub-sub",
      "description": "百度开发的，中文理解能力强。基于百度的知识图谱和搜索技术，在中文处理方面有优势。"
    },
    {
      "id": "tongyi",
      "name": "通义千问",
      "label": "通义千问",
      "category": "sub-sub",
      "description": "阿里巴巴开发的，办公场景好用。整合了阿里巴巴的办公生态，适合文档处理、数据分析等场景。"
    },
    {
      "id": "kimi",
      "name": "Kimi",
      "label": "Kimi",
      "category": "sub-sub",
      "description": "月之暗面开发的，长文本处理能力强。支持超长上下文，可以处理几十万字的文档。"
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "label": "DeepSeek",
      "category": "sub-sub",
      "description": "深度求索开发的，开源且性价比高。DeepSeek系列模型在开源社区很受欢迎，性能强且成本低。"
    },
    {
      "id": "zhipu",
      "name": "智谱清言",
      "label": "智谱清言",
      "category": "sub-sub",
      "description": "智谱AI开发的，学术研究能力强。基于清华大学的GLM系列，在学术和专业领域表现优秀。"
    },
    {
      "id": "doubao",
      "name": "豆包",
      "label": "豆包",
      "category": "sub-sub",
      "description": "字节跳动开发的，年轻化、娱乐化。界面友好，适合日常使用和娱乐场景。"
    },
    {
      "id": "data_enhancement",
      "name": "数据增强与优化",
      "label": "数据增强与优化",
      "category": "main",
      "description": "就像给AI补充知识，让它更专业、更懂你的需求。"
    },
    {
      "id": "rag",
      "name": "RAG",
      "label": "RAG (检索增强生成)",
      "category": "sub",
      "description": "AI开卷考。在回答问题前，先去指定的知识库（如公司文档、最新新闻）里查找资料，然后基于查到的资料回答，而不是仅靠脑子背。用来解决AI不知道公司内部数据或特定领域发生事情的问题。"
    },
    {
      "id": "vector_db",
      "name": "向量数据库",
      "label": "向量数据库",
      "category": "sub-sub",
      "description": "AI专用的图书索引系统。它把文字、图片转换成数学上的'向量'（一串数字），让AI能通过'意思相似'而不是'关键词匹配'来快速找到资料。传统搜索是找'包含'苹果'这个词的文件'；向量搜索是找'关于水果、科技公司或牛顿故事'的文件，哪怕文件里没出现'苹果'二字。"
    },
    {
      "id": "knowledge_base",
      "name": "知识库",
      "label": "知识库",
      "category": "sub-sub",
      "description": "存放AI可以查阅的资料的地方，就像图书馆。可以是公司文档、产品手册、技术文档等。"
    },
    {
      "id": "fine_tuning",
      "name": "微调",
      "label": "微调",
      "category": "sub",
      "description": "给AI大脑做专科培训。在通用大模型的基础上，用特定领域的数据（如医疗、法律）再训练一次，让它成为该领域的专家。LLM是'全科医生'，微调后变成了'心脏外科专家'。"
    },
    {
      "id": "full_finetuning",
      "name": "全量微调",
      "label": "全量微调",
      "category": "sub-sub",
      "description": "从头到尾重新训练一遍，效果好但成本高。需要大量的计算资源和时间，但能让模型在特定领域达到最佳效果。"
    },
    {
      "id": "lora",
      "name": "LoRA微调",
      "label": "LoRA微调",
      "category": "sub-sub",
      "description": "只训练一小部分参数，成本低但效果也不错。LoRA是一种高效微调方法，只需要很少的计算资源就能达到接近全量微调的效果。"
    },
    {
      "id": "peft",
      "name": "PEFT",
      "label": "PEFT (参数高效微调)",
      "category": "sub-sub",
      "description": "用最少的训练量达到最好的效果。PEFT是一系列参数高效微调方法的统称，包括LoRA、Prefix Tuning等。"
    },
    {
      "id": "model_compression",
      "name": "模型压缩",
      "label": "模型压缩",
      "category": "sub",
      "description": "让大模型变小，运行更快。就像把高清视频压缩成标清，画质损失不大但文件小了很多。"
    },
    {
      "id": "quantization",
      "name": "量化",
      "label": "量化",
      "category": "sub-sub",
      "description": "把数字精度降低，模型变小但影响不大。比如把32位浮点数变成8位整数，模型大小减少75%，但性能损失很小。"
    },
    {
      "id": "distillation",
      "name": "蒸馏",
      "label": "蒸馏",
      "category": "sub-sub",
      "description": "把大模型的知识教给小模型。让大模型（老师）训练小模型（学生），小模型能学到大部分知识，但运行速度快很多。"
    },
    {
      "id": "pruning",
      "name": "剪枝",
      "label": "剪枝",
      "category": "sub-sub",
      "description": "把模型中不重要的部分删掉。就像修剪树枝，去掉不重要的连接，让模型更精简、更高效。"
    },
    {
      "id": "agent",
      "name": "智能体",
      "label": "智能体",
      "category": "main",
      "description": "能自主干活的AI。以前的AI是'顾问'（只给建议），Agent是'助理'（给建议并帮你把事办了）。"
    },
    {
      "id": "core_capabilities",
      "name": "核心能力",
      "label": "核心能力",
      "category": "sub",
      "description": "智能体必备的本领"
    },
    {
      "id": "function_calling",
      "name": "函数调用",
      "label": "函数调用",
      "category": "sub-sub",
      "description": "AI大脑决定'我要查天气'，通过函数调用这个'手'去点击了天气软件的查询按钮。让AI能够调用外部工具和服务。"
    },
    {
      "id": "workflow",
      "name": "工作流",
      "label": "工作流",
      "category": "sub-sub",
      "description": "AI任务流水线，将一个大任务拆解成多个步骤，按顺序或条件自动执行。就像工厂的组装线。第一步AI写大纲 -> 第二步AI查资料 -> 第三步AI写正文 -> 第四步AI配图。"
    },
    {
      "id": "planning",
      "name": "规划能力",
      "label": "规划能力",
      "category": "sub-sub",
      "description": "AI能自己想清楚先做什么后做什么。面对复杂任务，Agent能够分解任务、制定计划、按步骤执行。"
    },
    {
      "id": "memory",
      "name": "记忆能力",
      "label": "记忆能力",
      "category": "sub-sub",
      "description": "AI能记住之前的对话和任务，不会忘事。就像人的长期记忆，Agent可以记住重要信息，在后续对话中使用。"
    },
    {
      "id": "skills_ecosystem",
      "name": "技能生态",
      "label": "技能生态",
      "category": "sub",
      "description": "就像给智能体准备各种工具，让它能干更多事。"
    },
    {
      "id": "skills",
      "name": "Skills",
      "label": "Skills (技能包)",
      "category": "sub-sub",
      "description": "如果Agent是一个全能员工，那么Skill就是他掌握的具体单项手艺，比如'查天气'、'读PDF'、'搜索谷歌'、'发送钉钉消息'。现在的开发模式不再是训练一个大模型，而是像搭积木一样，把各种现成的Skills组装给Agent。开发者社区充满了共享的Skill库（类似App Store，但是是给AI用的）。"
    },
    {
      "id": "mcp",
      "name": "MCP",
      "label": "MCP (模型上下文协议)",
      "category": "sub-sub",
      "description": "一种统一的沟通标准协议，让任何AI模型都能轻松连接到任何数据源或工具。就像USB接口，不管什么设备都能插。"
    },
    {
      "id": "plugin",
      "name": "插件系统",
      "label": "插件系统",
      "category": "sub-sub",
      "description": "给AI安装各种插件，扩展它的功能。就像给浏览器安装插件，可以让AI具备更多能力。"
    },
    {
      "id": "dev_tools",
      "name": "开发工具",
      "label": "开发工具",
      "category": "sub",
      "description": "用AI来写代码的工具"
    },
    {
      "id": "claude_code",
      "name": "Claude Code",
      "label": "Claude Code",
      "category": "sub-sub",
      "description": "编程最强智能体，能帮你写代码、改代码、运行代码。Claude Code是Anthropic推出的AI编程助手。"
    },
    {
      "id": "cursor",
      "name": "Cursor",
      "label": "Cursor",
      "category": "sub-sub",
      "description": "vibe coding编程开发环境，用AI辅助写代码，体验很酷。Cursor是一个AI原生的代码编辑器。"
    },
    {
      "id": "trae",
      "name": "Trae",
      "label": "Trae",
      "category": "sub-sub",
      "description": "新一代AI原生的集成开发环境，国产IDE，算是Cursor的竞品。Trae是国产的AI编程工具。"
    },
    {
      "id": "openclaw",
      "name": "OpenClaw",
      "label": "OpenClaw",
      "category": "sub-sub",
      "description": "今年开年火的一塌糊涂的AI编程工具。OpenClaw是一款新兴的AI编程助手，功能强大。"
    }
  ],
  "links": [
    {
      "source": "llm",
      "target": "multimodal",
      "relation": "包含"
    },
    {
      "source": "llm",
      "target": "prompt",
      "relation": "包含"
    },
    {
      "source": "prompt",
      "target": "prompt_engineering",
      "relation": "包含"
    },
    {
      "source": "prompt",
      "target": "structured_prompt",
      "relation": "包含"
    },
    {
      "source": "llm",
      "target": "context",
      "relation": "包含"
    },
    {
      "source": "llm",
      "target": "hallucination",
      "relation": "包含"
    },
    {
      "source": "model_products",
      "target": "foreign_models",
      "relation": "包含"
    },
    {
      "source": "foreign_models",
      "target": "gpt",
      "relation": "包含"
    },
    {
      "source": "foreign_models",
      "target": "claude",
      "relation": "包含"
    },
    {
      "source": "foreign_models",
      "target": "gemini",
      "relation": "包含"
    },
    {
      "source": "foreign_models",
      "target": "llama",
      "relation": "包含"
    },
    {
      "source": "model_products",
      "target": "domestic_models",
      "relation": "包含"
    },
    {
      "source": "domestic_models",
      "target": "wenxin",
      "relation": "包含"
    },
    {
      "source": "domestic_models",
      "target": "tongyi",
      "relation": "包含"
    },
    {
      "source": "domestic_models",
      "target": "kimi",
      "relation": "包含"
    },
    {
      "source": "domestic_models",
      "target": "deepseek",
      "relation": "包含"
    },
    {
      "source": "domestic_models",
      "target": "zhipu",
      "relation": "包含"
    },
    {
      "source": "domestic_models",
      "target": "doubao",
      "relation": "包含"
    },
    {
      "source": "data_enhancement",
      "target": "rag",
      "relation": "包含"
    },
    {
      "source": "rag",
      "target": "vector_db",
      "relation": "包含"
    },
    {
      "source": "rag",
      "target": "knowledge_base",
      "relation": "包含"
    },
    {
      "source": "data_enhancement",
      "target": "fine_tuning",
      "relation": "包含"
    },
    {
      "source": "fine_tuning",
      "target": "full_finetuning",
      "relation": "包含"
    },
    {
      "source": "fine_tuning",
      "target": "lora",
      "relation": "包含"
    },
    {
      "source": "fine_tuning",
      "target": "peft",
      "relation": "包含"
    },
    {
      "source": "data_enhancement",
      "target": "model_compression",
      "relation": "包含"
    },
    {
      "source": "model_compression",
      "target": "quantization",
      "relation": "包含"
    },
    {
      "source": "model_compression",
      "target": "distillation",
      "relation": "包含"
    },
    {
      "source": "model_compression",
      "target": "pruning",
      "relation": "包含"
    },
    {
      "source": "agent",
      "target": "core_capabilities",
      "relation": "包含"
    },
    {
      "source": "core_capabilities",
      "target": "function_calling",
      "relation": "包含"
    },
    {
      "source": "core_capabilities",
      "target": "workflow",
      "relation": "包含"
    },
    {
      "source": "core_capabilities",
      "target": "planning",
      "relation": "包含"
    },
    {
      "source": "core_capabilities",
      "target": "memory",
      "relation": "包含"
    },
    {
      "source": "agent",
      "target": "skills_ecosystem",
      "relation": "包含"
    },
    {
      "source": "skills_ecosystem",
      "target": "skills",
      "relation": "包含"
    },
    {
      "source": "skills_ecosystem",
      "target": "mcp",
      "relation": "包含"
    },
    {
      "source": "skills_ecosystem",
      "target": "plugin",
      "relation": "包含"
    },
    {
      "source": "agent",
      "target": "dev_tools",
      "relation": "包含"
    },
    {
      "source": "dev_tools",
      "target": "claude_code",
      "relation": "包含"
    },
    {
      "source": "dev_tools",
      "target": "cursor",
      "relation": "包含"
    },
    {
      "source": "dev_tools",
      "target": "trae",
      "relation": "包含"
    },
    {
      "source": "dev_tools",
      "target": "openclaw",
      "relation": "包含"
    }
  ]
};

function init() {
  try {
    // 保存原始数据
    originalGraphData = JSON.parse(JSON.stringify(graphData));
    renderGraph();
    setupEventListeners();
  } catch (error) {
    console.error('初始化失败:', error);
    document.getElementById('graph').innerHTML = '<div style="text-align:center; padding:50px; color:#666;">加载失败，请检查浏览器控制台查看错误信息</div>';
  }
}

function renderGraph() {
  const graphContainer = document.getElementById('graph');
  chart = echarts.init(graphContainer);
  
  const categories = [
    { name: '主节点', itemStyle: { color: '#667eea' } },
    { name: '次节点', itemStyle: { color: '#764ba2' } },
    { name: '次次节点', itemStyle: { color: '#f093fb' } }
  ];
  
  const option = {
    title: {
      show: false
    },
    tooltip: {
      show: true,
      trigger: 'item',
      confine: true,
      enterable: true,
      position: function(point, params, dom, rect, size) {
        var obj = {top: 60};
        obj[['left', 'right'][+(point[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      formatter: function(params) {
        if (params.dataType === 'node') {
          const label = typeof params.data.label === 'string' ? params.data.label : params.data.name;
          const desc = typeof params.data.description === 'string' ? params.data.description : '';
          return `<div style="padding:12px;max-width:320px;word-break:break-all;white-space:normal;">
            <strong style="color:#667eea;font-size:15px;display:block;margin-bottom:10px;">${label}</strong>
            <div style="font-size:13px;color:#555;line-height:1.7;word-break:break-all;white-space:normal;">
              ${desc}
            </div>
          </div>`;
        }
        return '';
      },
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderColor: '#667eea',
      borderWidth: 1,
      textStyle: {
        color: '#333',
        width: 320
      },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 8px;max-width:350px;overflow-wrap:break-word;'
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: graphData.nodes.map(node => ({
          ...node,
          symbolSize: getNodeSize(node.category),
          itemStyle: {
            color: getNodeColor(node.category),
            borderColor: '#fff',
            borderWidth: 2,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontSize: getLabelSize(node.category),
            color: '#333',
            fontWeight: node.category === 'main' ? 'bold' : 'normal'
          }
        })),
        links: graphData.links.map(link => ({
          ...link,
          lineStyle: {
            color: '#ccc',
            width: 1.5,
            curveness: 0.3
          },
          label: {
            show: false
          }
        })),
        categories: categories,
        roam: true,
        label: {
          show: true,
          position: 'right'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 3
          }
        },
        force: {
          repulsion: 300,
          edgeLength: 120,
          gravity: 0.1,
          layoutAnimation: true
        },
        draggable: true
      }
    ]
  };
  
  chart.setOption(option);
}

function getNodeSize(category) {
  switch (category) {
    case 'main':
      return 40;
    case 'sub':
      return 30;
    case 'sub-sub':
      return 20;
    default:
      return 25;
  }
}

function getNodeColor(category) {
  switch (category) {
    case 'main':
      return '#667eea';
    case 'sub':
      return '#764ba2';
    case 'sub-sub':
      return '#f093fb';
    default:
      return '#667eea';
  }
}

function getLabelSize(category) {
  switch (category) {
    case 'main':
      return 14;
    case 'sub':
      return 12;
    case 'sub-sub':
      return 11;
    default:
      return 12;
  }
}

function setupEventListeners() {
  // 点击节点时显示相关节点
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
  
  window.addEventListener('resize', function() {
    chart.resize();
  });
}

function showRelatedNodes(nodeId) {
  selectedNodeId = nodeId;
  expandedNodeId = null; // 重置展开状态
  
  // 找到所有相关节点ID（直接相连的节点）
  const relatedNodeIds = new Set([nodeId]);
  const relatedLinks = [];
  
  // 找到直接相连的节点
  originalGraphData.links.forEach(link => {
    if (link.source === nodeId) {
      relatedNodeIds.add(link.target);
      relatedLinks.push(link);
    } else if (link.target === nodeId) {
      relatedNodeIds.add(link.source);
      relatedLinks.push(link);
    }
  });
  
  // 过滤节点和连线
  const filteredNodes = originalGraphData.nodes.filter(node => relatedNodeIds.has(node.id));
  const filteredLinks = relatedLinks;
  
  // 更新图表
  updateGraph(filteredNodes, filteredLinks);
}

function expandAllRelatedNodes(nodeId) {
  expandedNodeId = nodeId;
  
  // 找到该节点下的所有关联节点（包括间接关联）
  const relatedNodeIds = new Set([nodeId]);
  const relatedLinks = [];
  const nodesToProcess = [nodeId];
  
  // 使用广度优先搜索找到所有关联节点
  while (nodesToProcess.length > 0) {
    const currentId = nodesToProcess.shift();
    
    originalGraphData.links.forEach(link => {
      if (link.source === currentId && !relatedNodeIds.has(link.target)) {
        relatedNodeIds.add(link.target);
        relatedLinks.push(link);
        nodesToProcess.push(link.target);
      } else if (link.target === currentId && !relatedNodeIds.has(link.source)) {
        relatedNodeIds.add(link.source);
        relatedLinks.push(link);
        nodesToProcess.push(link.source);
      }
    });
  }
  
  // 过滤节点和连线
  const filteredNodes = originalGraphData.nodes.filter(node => relatedNodeIds.has(node.id));
  
  // 更新图表
  updateGraph(filteredNodes, relatedLinks);
}

function restoreAllNodes() {
  selectedNodeId = null;
  expandedNodeId = null;
  updateGraph(originalGraphData.nodes, originalGraphData.links);
}

function updateGraph(nodes, links) {
  const categories = [
    { name: '主节点', itemStyle: { color: '#667eea' } },
    { name: '次节点', itemStyle: { color: '#764ba2' } },
    { name: '次次节点', itemStyle: { color: '#f093fb' } }
  ];
  
  const option = {
    series: [{
      data: nodes.map(node => ({
        ...node,
        symbolSize: getNodeSize(node.category),
        itemStyle: {
          color: getNodeColor(node.category),
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          fontSize: getLabelSize(node.category),
          color: '#333',
          fontWeight: node.category === 'main' ? 'bold' : 'normal'
        }
      })),
      links: links.map(link => ({
        ...link,
        lineStyle: {
          color: '#ccc',
          width: 1.5,
          curveness: 0.3
        }
      }))
    }]
  };
  
  chart.setOption(option);
}

function showInfoPanel(nodeData) {
  const infoPanel = document.getElementById('infoPanel');
  const infoTitle = document.getElementById('infoTitle');
  const infoDescription = document.getElementById('infoDescription');
  
  infoTitle.textContent = nodeData.label;
  infoDescription.textContent = nodeData.description;
  
  infoPanel.classList.add('active');
  
  setTimeout(() => {
    infoPanel.classList.remove('active');
  }, 10000);
}

document.addEventListener('DOMContentLoaded', init);
