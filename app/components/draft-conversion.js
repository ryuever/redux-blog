function compare(a,b) {
  if (a.startPosition < b.startPosition)
    return -1;
  else if (a.startPosition > b.startPosition)
    return 1;
  else {
    if (a.endPosition < b.endPosition)
      return -1;
    else if (a.endPosition > b.endPosition)
      return 1;
    else
      return 0;
  }
}

function xcompare(a,b) {
  if (a.startPosition < b.startPosition)
    return -1;
  else if (a.startPosition > b.startPosition)
    return 1;
  else {
    if (a.endPosition < b.endPosition)
      return -1;
    else if (a.endPosition > b.endPosition)
      return 1;
    else
      return 0;
  }
}

function buildMarkdown(rawJSData, innerHTMLTags, blockHTMLTags){
  var blocks = rawJSData.blocks;

  var multipleLine = {
    type: '',
    content: []
  }

  var totalBlock = [];

  var isMultiProcessing = function() {
    return multipleLine.type ? true : false;
  }

  var typeSets = {
    'code-block': {left: '', right: '', pleft: '<pre><code>', pright: '</code></pre>'},
    'ordered-list-item': {left: '<li>', right: '</li>', pleft: '<ol>', pright: '</ol>'},
    'unordered-list-item': {left: '<li>', right: '</li>', pleft: '<ul>', pright: '</ul>'},
    'blockquote': {left: '', right: '', pleft: '<blockquote>', pright: '</blockquote>'}
  };

  var shouldIntegrateSelection = function(blockType) {
    if (Object.keys(typeSets).indexOf(blockType) < 0) {
      return false
    } else {
      return true;
    }
  }

  var newBlock = blocks.forEach(function(block) {
    var outputBlock = [];

    // 每一行中的每一段inline style都会被解析成一个对象；一行可以是
    // 多个inline style对象的数组
    var styleRanges = block.inlineStyleRanges;

    if (!isMultiProcessing()) {
      if (shouldIntegrateSelection(block.type)) {
        // multipleLine.content.push('```\n');
        multipleLine.content.push(typeSets[block.type].pleft);
        multipleLine.type = block.type;
      }
    } else {
      // 上一次的连续结束
      if (block.type !== multipleLine.type) {
        if (shouldIntegrateSelection(multipleLine.type)) {
          // multipleLine.content.push('\n```\n');
          multipleLine.content.push(typeSets[multipleLine.type].pright);
        } else {
          multipleLine.content.push('\n');
        }

        totalBlock.push(multipleLine.content.join(''));

        multipleLine.type = '';
        multipleLine.content = [];
      }
    }

    // 根据blockType来进行标签的替换，但是有个问题就是假如说是多行连续的code的话，需要被封装到
    // 一个<pre><code>...</code></pre>, 但是最基础的<span>是不能能够更改；
    if (blockHTMLTags[block.type]) {
      outputBlock.push(blockHTMLTags[block.type][0]);
    } else if (block.type === 'image') {
      outputBlock.push('<img style= "max-width: 500px; max-height: 680px;" src="')
    } else {
      outputBlock.push("\n");
    }

    var styleRangesPosition = styleRanges.map(function(styleRange){
      return ({
        startPosition: styleRange.offset,
        endPosition: styleRange.offset + styleRange.length,
        style: styleRange.style
      });
    });

    var sortByLeftTag = styleRangesPosition.sort(compare);
    var tmp = {};

    sortByLeftTag.map(function(leftTag){
      var position = leftTag.startPosition.toString();
      tmp[position] = tmp[position] ? tmp[position] : {};
      tmp[position].left = tmp[position].left ? tmp[position].left : [];
      tmp[position].left.push(innerHTMLTags[leftTag.style][0]);
    })

    sortByLeftTag.map(function(rightTag){
      var position = rightTag.endPosition.toString();
      tmp[position] = tmp[position] ? tmp[position] : {};
      tmp[position].right = tmp[position].right ? tmp[position].right : [];
      tmp[position].right.push(innerHTMLTags[rightTag.style][1]);
    })

    var currentPosition = 0;
    var previousPosition = 0;

    for (var position in tmp){
      currentPosition = position;
      outputBlock.push(block.text.substr(previousPosition, currentPosition-previousPosition ));
      previousPosition = currentPosition;

      while (tmp[position].hasOwnProperty('right') && tmp[position].right.length > 0){
        outputBlock.push(tmp[position].right.pop());
      }

      while (tmp[position].hasOwnProperty('left') && tmp[position].left.length > 0){
        outputBlock.push(tmp[position].left.shift());
      }
    }

    if (currentPosition < block.text.length)
      outputBlock.push(block.text.substr(currentPosition, block.text.length - currentPosition));

    // finally
    if (blockHTMLTags[block.type]) {
      outputBlock.push(blockHTMLTags[block.type][1]);
      outputBlock.push('\n');
    } else if (block.type === 'image') {
      outputBlock.push('">\n');
    } else {
      outputBlock.push("\n");
    }

    if (isMultiProcessing()) {
      multipleLine.content.push(outputBlock.join(''))
    } else {
      totalBlock.push(outputBlock.join(''));
    }
  });

  if (isMultiProcessing()) {
    if (multipleLine.type) {
      // multipleLine.content.push(' \n```\n');
      multipleLine.content.push(typeSets[multipleLine.type].pright);
      totalBlock.push(multipleLine.content.join(''));

      multipleLine.type = '';
      multipleLine.content = [];
    }
  }

  return totalBlock.join('');
}

module.exports = buildMarkdown;
