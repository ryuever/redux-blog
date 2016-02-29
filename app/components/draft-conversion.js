var _ = require('lodash');

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

var innerHTMLTags = {
  'BOLD': ['<strong>', '</strong>'],
  'ITALIC': ['<em>', '</em>'],
  'UNDERLINE': ['<b>', '</b>']
}

var blockHTMLTags = {
  'blockquote': ['<blockquote><p>', '</p></blockquote>']
}

function buildMarkdown(rawJSData, innerHTMLTags, blockHTMLTags){
  var blocks = rawJSData.blocks;

  var newBlock = blocks.map(function(block){
    var blockPlainText = block.text;
    var blockStyle = block.type;

    var outputBlock = [];

    var styleRanges = block.inlineStyleRanges;

    if (blockHTMLTags[block.type])
      outputBlock.push(blockHTMLTags[block.type][0]);
    else
      outputBlock.push("<p>");

    var styleRangesPosition = styleRanges.map(function(styleRange){
      return ({
        startPosition: styleRange.offset,
        endPosition: styleRange.offset + styleRange.length,
        style: styleRange.style
      });
    });

    console.log("style ranges position before sort : ", styleRangesPosition);

    var sortByLeftTag = styleRangesPosition.sort(compare);
    console.log('after sort left : ', sortByLeftTag);
    var tmp = {};

    sortByLeftTag.map(function(leftTag){
      var position = leftTag.startPosition.toString();
      console.log('postion :', position);
      tmp[position] = tmp[position] ? tmp[position] : {};
      console.log("tmp : ", tmp);
      tmp[position].left = tmp[position].left ? tmp[position].left : [];
      console.log("inner ", leftTag.style);
      tmp[position].left.push(innerHTMLTags[leftTag.style][0]);
    })
    console.log('temp after left : ', tmp);

    sortByLeftTag.map(function(rightTag){
      var position = rightTag.endPosition.toString();
      console.log('postion :', position);
      tmp[position] = tmp[position] ? tmp[position] : {};
      console.log("tmp : ", tmp);
      tmp[position].right = tmp[position].right ? tmp[position].right : [];
      console.log("inner ", rightTag.style);
      tmp[position].right.push(innerHTMLTags[rightTag.style][1]);
    })

    console.log('tmp after right : ', tmp);

    var currentPosition = 0;
    var previousPosition = 0;

    for (var position in tmp){
      // console.log('tm postion ', tmp[position], position);

      // if (tmp[position].right != [] && tmp[position].right !='undefined')
      //   console.log('pp ', tmp[position].right);

      currentPosition = position;
      outputBlock.push(block.text.substr(previousPosition, currentPosition-previousPosition ));
      previousPosition = currentPosition;

      while (tmp[position].hasOwnProperty('right') && tmp[position].right.length > 0){
        // console.log('pp ', tmp[position].right);
        // console.log('haha : ', position, tmp[position].right.pop());
        outputBlock.push(tmp[position].right.pop());
      }

      while (tmp[position].hasOwnProperty('left') && tmp[position].left.length > 0){
        // console.log('pp ', tmp[position].right);
        // console.log('haha : ', position, tmp[position].left.shift());
        outputBlock.push(tmp[position].left.shift());
      }


      // while (tmp[position].right != [] && tmp[position].right){
      //   console.log('me ', tmp[position].right);
      //   console.log('haha : ', tmp[position], tmp[position].right.pop());
      // }
      // while (tmp[position].left != [] && tmp[position].left);
      //   console.log('hahah : ', tmp[position], tmp[position].left.shift());
    }

    if (currentPosition < block.text.length)
      outputBlock.push(block.text.substr(currentPosition, block.text.length - currentPosition));

    // sortByLeftTag.map(function(rightTag){
    //   tmp[rightTag.endPosition.toString()].right.push(innerHTMLTags[rightTag.style][1]);
    // })
    // console.log('tmp after right : ', tmp);

    // finally
    if (blockHTMLTags[block.type])
      outputBlock.push(blockHTMLTags[block.type][1]);
    else
      outputBlock.push("</p>");
    console.log('output : ', outputBlock.join(''));
    return outputBlock.join('');
  });

  return newBlock.join('');
}

module.exports = buildMarkdown;
