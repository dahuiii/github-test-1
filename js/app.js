let chart;
let graphData;

async function init() {
  try {
    graphData = await loadGraphData();
    renderGraph();
    setupEventListeners();
  } catch (error) {
    console.error('初始化失败:', error);
    document.getElementById('graph').innerHTML = '<div style="text-align:center; padding:50px; color:#666;">加载失败，请检查data.json文件是否存在</div>';
  }
}

async function loadGraphData() {
  const response = await fetch('data.json');
  if (!response.ok) {
    throw new Error('无法加载数据文件');
  }
  return await response.json();
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
      formatter: function(params) {
        if (params.dataType === 'node') {
          return `<div style="padding:8px;">
            <strong style="color:#667eea;font-size:14px;">${params.data.label}</strong>
            <div style="margin-top:6px;font-size:12px;color:#666;max-width:300px;line-height:1.6;">
              ${params.data.description.substring(0, 100)}${params.data.description.length > 100 ? '...' : ''}
            </div>
          </div>`;
        }
        return '';
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#667eea',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 8px;'
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
  chart.on('mouseover', function(params) {
    if (params.dataType === 'node') {
      showInfoPanel(params.data);
    }
  });
  
  chart.on('click', function(params) {
    if (params.dataType === 'node') {
      showInfoPanel(params.data);
    }
  });
  
  window.addEventListener('resize', function() {
    chart.resize();
  });
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
