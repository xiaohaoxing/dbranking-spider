function findModel(ele) {
    var firstLevel = [];
    var secondLevel = [];
    var thirdLevel = [];
    var nodes = ele.childNodes;
    for(var i=0;i<nodes.length;i++){
        if(nodes[i].nodeName == 'A') {
            firstLevel.push(nodes[i].innerText);
        } else if (nodes[i].nodeName == '#text') {
            firstLevel.push('Multi-model');
        } else if (nodes[i].nodeName == 'SPAN') {
            var l = nodes[i].childNodes[1].childNodes;
            for (var j=0;j<l.length;j++) {
                if(l[j].nodeName == 'B') {
                    secondLevel.push(l[j].innerText);
                } else if (l[j].nodeName == '#text') {
                    if(l[j].nodeValue ==',') {
                        continue;
                    }
                    thirdLevel.push(l[j].nodeValue);
                } else if (l[j].nodeName == 'BR') {
                    continue;
                } else {
                    console.log("unknow type" + l[j].nodeName);
                }
            }
        }
    }
    return [firstLevel, secondLevel, thirdLevel];
}

function calData(item){
    var result = {};
    result["rank"] = parseInt(item.children[0].innerText.replace(".", ""));
    result["name"] = item.children[3].children[0].innerText.trim();
    result["score"] = parseFloat(item.children[5].innerText);
    result["models"] = findModel(item.children[4]);
    return result;
}

var table = document.getElementsByClassName("dbi")[0];
var tbody = table.firstChild
var list = [];
for (var i = 3; i< tbody.childElementCount; i++) {
    list.push(tbody.children[i]);
}

var resultSet = []
for(var i=0;i<list.length;i++){
    resultSet.push(calData(list[i]));
}

JSON.stringify(resultSet);