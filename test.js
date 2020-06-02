// arguments[0] = 匹配到的标签 argument[1] 匹配到的标签名字

var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var startTagClose = /^\s*(\/?)>/; // />
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function start(tagName, attrs) {
  console.log('开始标签:', tagName, '属性是：', attrs);
}

function chars(text) {
  console.log('文本是：', text);
}

function end(tagName) {
  console.log('结束标签: ', tagName);
}

function parseHTML(html) {
  // 通过循环去不断的解析html字符串
  while(html) {
    console.log(html)
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      // 如果当前索引为0， 肯定是一个标签， 开始标签， 结束标签
      let startTagMatch = parseStartTag(); // 通过这个方法来获取匹配的结果  tagName, attrs
      if(startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);    
        continue; // 如果开始标签匹配完毕后 跳过下面的逻辑 进行下一次的匹配
      } 
      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }

    }

    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function advance(n) {
    html = html.substring(n);
  }

  function parseStartTag() {
    let start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length) // 将标签删除     
      let end, attr;
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 将属性去除
        advance(attr[0].length);
        match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]});
      }
      if (end) {  // 去除开始标签
        advance(end[0].length)
        return match;
      }
    }
  }
}


const template = "<div id='app'>  <p>hello</p></div>";
parseHTML(template);


