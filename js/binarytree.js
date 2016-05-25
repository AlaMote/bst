/**
 * base node object
 */
Node = function(key, value){
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.count = 0;
    this.x = 0;
    this.y = 0;
    this.level = 1;
};

BinaryTree = function(){};

/**
 * reference to root node
 */
BinaryTree.prototype.root = null;

/**
 * adding node, public interface
 */
BinaryTree.prototype.addNode = function(key, value){
    this.root = putNode( this.root, key, value );
};

/**
 * node search
 */
BinaryTree.prototype.getNode = function(key){

    var currentNode = this.root;

    while (currentNode != null){
        if (currentNode.key > key) currentNode = currentNode.left;
        else if (currentNode.key < key) currentNode = currentNode.right;
        else if (currentNode.key == key ) return currentNode;
    }

    return null;
};

/**
 * get minimum node
 */
BinaryTree.prototype.getMinNode = function(){
    return getMin(this.root);
};

/**
 * returns max node
 */
BinaryTree.prototype.getMaxNode = function(){
    return getMax(this.root);
};

/**
 * delete minimum node
 */
BinaryTree.prototype.deleteMin = function(){
    deleteMin(this.root);
};

/**
 * finding max e<= key
 */
BinaryTree.prototype.floor = function(key){
    var n = getFloor(this.root, key);
    return n;
};

/**
 * finding min e >= key
 */
BinaryTree.prototype.ceil = function(key){
    var n = getCeil(this.root, key);
    return n;
};

/**
 * deletes the node
 */
BinaryTree.prototype.deleteNode = function(key){
    this.root = deleteNode(this.root, key);
};

/**
 * pre order traversing
 */
BinaryTree.prototype.preOrder = function() {
    preOrder(this.root);
};

/**
 * in order traversing
 */
BinaryTree.prototype.inOrder = function() {
    inOrder(this.root);
};

/**
 * post order traversing
 */
BinaryTree.prototype.postOrder = function() {
    postOrder(this.root);
};

/**
 * post order traversing
 */
BinaryTree.prototype.bfs = function() {
    return bfs(this.root);
};

function preOrder(node){
    if (node == null) return;
    nodes.push(node);
    preOrder(node.left);
    preOrder(node.right);
}

function inOrder(node){
    if (node == null) return;
    inOrder(node.left);
    nodes.push(node);
    inOrder(node.right);
}

function postOrder(node){
    if (node == null) return;
    postOrder(node.left);
    postOrder(node.right);
    nodes.push(node);
}

function bfs(node){
    var queue = [];
    var values = [];
    queue.push(node);

    while(queue.length > 0){
        var tempNode = queue.shift();
        values.push(tempNode.value);
        if (tempNode.left){
            queue.push(tempNode.left);
        }

        if (tempNode.right){
            queue.push(tempNode.right);
        }
    }

    return values;
}

/**
 * deletes node
 */
function deleteNode(node, key){
    if (!node)
        return null;
    if (node.key > key)
        node.left = deleteNode(node.left, key);
    else if (node.key < key)
        node.right = deleteNode(node.right, key);
    else {
        if (!node.right)
            return node.left;
        if (!node.left)
            return node.right;
        var t = node;
        node = getMin(t.right);
        node.right = deleteMin(t.right);
        node.left = t.left;
    }
    node.count = 1 + getSize(node.left) + getSize(node.right);
    return node;
}

/**
 * recursive function used to delete minimal item in the tree
 * recuresively we are checking if node has left child. if no - return right child.
 * @param  {node} node object.
 */
function deleteMin(node){
    if (node.left == null) return node.right;

    node.left = deleteMin(node.left);
    node.count = 1 + getSize(node.left) + getSize(node.right);

    return node;
}

/**
 * recursively search for node with minimum key
 */
function getMin(node){

    if (!node.left) return node;

    return getMin(node.left);
}


/**
 * recursively search for node with maximum key
 */
function getMax(node){

    if (!node.right) return node;

    return getMax(node.right);
}

/**
 * get floor element
 */
function getFloor(node, key){
    if ( node == null ) return null;

    if (node.key == key ) return node;

    if (node.key > key) return getFloor(node.left, key);

    var x = getFloor(node.right, key);

    if (x) return x;

    return node;
}

/**
 * get ceil element
 */
function getCeil(node, key){

    if ( node == null ) return null;

    if (node.key == key ) return node;

    if (node.key < key) return getCeil(node.right, key);

    var x = getCeil(node.left, key);

    if (x) return x;

    return node;
}

/**
 * adding node, by recursively finding it's place using key value
 */
function putNode(node, key, value){
    if ( !node ) return new Node(key, value);

    if (node.key > key ){
        node.left = putNode( node.left, key, value);
    } else if (node.key < key) {
        node.right = putNode(node.right, key, value);
    } else if (node.key == key){
        node.value = value;
    }

    node.count = 1 + getSize(node.left) + getSize(node.right);

    return node;
}

/**
 * gets node rank
 */
function getSize(node){
    if (!node) return 0;

    return node.count;
}

function makeTree(tree, array, iBegin, iEnd) {


    var iMiddle = Math.floor((iBegin + iEnd) / 2);

    tree.addNode(array[iMiddle], array[iMiddle]);

    //отработаем левый участок
    if (iBegin != iMiddle)
        makeTree(tree, array, iBegin, iMiddle);
    //правый участок
    if (iEnd > iMiddle + 1)
        makeTree(tree, array, iMiddle + 1, iEnd);

    return tree;
}

$(document).ready(function() {
    el_drawType_circle = $('#drawType_circle');
    el_drawType_rect = $('#drawType_rect');
    el_numberOfNodes = $('#numberOfNodes');
    el_radius = $('#radius');
    el_widthOfNode = $('#widthOfNode');
    el_heightOfNode = $('#heightOfNode');

    el_controls = $('#controls');
    el_show_controls = $('#show_controls');
    el_add_node = $('#addNode');
    el_add_node_but = $('#addNodeBut');
    el_pop_up_message = $('#popUpMessage');
    el_pop_up_menu = $('#popUpMenu');
    el_del_node = $('#delNode');
    el_change_node = $('#changeNode');
    el_change_node_val = $('#changeNode_val');

    el_plus = $('#plus');
    el_minus = $('#minus');
    el_sort = $('#sort');

    can = $('#can');

    if (getCookie("doSort"))
        doSort = getCookie("doSort");
    else
        doSort = "true";

    el_sort.css("opacity", 0);
    el_sort.hover(function() {
        el_sort.animate({
            opacity: 1
        }, 100);
    });
    el_sort.mouseout(function() {
        el_sort.animate({
            opacity: 0
        }, 100);
    });
    el_sort.click(function() {
        if (doSort == "true")
            doSort = "false";
        else
            doSort = "true";

        var date = new Date;
        date.setDate(date.getDate() + 100);
        setCookie("doSort", doSort, date.toUTCString());
    });

    el_controls.draggable({
        stop: function(event, ui) {
            var date = new Date;
            date.setDate(date.getDate() + 100);
            setCookie("controls_x", el_controls.css("left"), date.toUTCString());
            setCookie("controls_y", el_controls.css("top"), date.toUTCString());
        }
    });
    el_plus.click(function() {
        var num = parseInt(el_numberOfNodes.val());
        el_numberOfNodes.val(num + 1);
        numChange();
    });
    el_minus.click(function() {
        var num = parseInt(el_numberOfNodes.val());
        el_numberOfNodes.val(num - 1);
        numChange();
    });
    el_add_node_but.click(function() {
        if (array.indexOf(parseInt(el_add_node.val())) == -1) {
            array.push(parseInt(el_add_node.val()));
            numOfNodes++;
            el_numberOfNodes.val(numOfNodes);

            sendPopUpMessage("Додано вузол " + parseInt(el_add_node.val()));

            sortArray();
            reBuildTree();

            var rand_num = Math.floor(Math.random() * 2000 - 1000);

            while (array.indexOf(rand_num) != -1)
                rand_num = Math.floor(Math.random() * 2000 - 1000);

            el_add_node.val(rand_num);


            var date = new Date;
            date.setDate(date.getDate() + 100);
            setCookie("numOfNodes", numOfNodes, date.toUTCString());

        }
        else
            sendPopUpMessage("Вузел зі значенням " + parseInt(el_add_node.val()) + " вже є в дереві!");



    });
    el_show_controls.hover(function(e) {
        e.target.src = e.target.src.substring(0, e.target.src.length - 5) + '2.png';
    });
    el_show_controls.mouseout(function(e) {
        if (e.target.alt == 'Показати налаштування')
            e.target.src = e.target.src.substring(0, e.target.src.length - 5) + '1.png';
    });
    el_show_controls.click(function(e) {
        if (e.target.alt == 'Показати налаштування') {
            e.target.src = e.target.src.substring(0, e.target.src.length - 5) + '2.png';
            e.target.alt = 'Скрыти налаштування';

            var date = new Date;
            date.setDate(date.getDate() + 100);
            setCookie("controls_show", "true", date.toUTCString());

            el_controls.show("slow");
        }
        else {
            e.target.src = e.target.src.substring(0, e.target.src.length - 5) + '1.png';
            e.target.alt = 'Показати налаштування';

            date = new Date;
            date.setDate(date.getDate() + 100);
            setCookie("controls_show", "false", date.toUTCString());

            el_controls.hide("slow");
        }
    });
    el_radius.change(function() {
        radius = parseInt(el_radius.val());
        makeAll();

        sendPopUpMessage("Радіус змінено на " + radius);
    });
    el_numberOfNodes.change(function() {

        numChange();

    });
    el_widthOfNode.change(function() {
        widthOfNode = parseInt(el_widthOfNode.val());
        makeAll();
        sendPopUpMessage("Ширина вузла змінена на " + widthOfNode);
    });
    el_heightOfNode.change(function() {
        heightOfNode = parseInt(el_heightOfNode.val());
        makeAll();
        sendPopUpMessage("Висота вузла змінена на " + heightOfNode);
    });
    el_drawType_circle.change(function() {
        drawType = $('#drawType_circle').prop("checked") ? 'circle' : 'rect';
        makeAll();

        hideElements();
        sendPopUpMessage("Тип відображення - " + drawType);
    });
    el_drawType_rect.change(function() {
        drawType = $('#drawType_circle').prop("checked") ? 'circle' : 'rect';
        makeAll();
        hideElements();
        sendPopUpMessage("Тип відображення - " + drawType);
    });
    $("#close_controls").click(function (e) {
        el_show_controls.prop("src", el_show_controls.prop("src").substring(0, el_show_controls.prop("src").length - 5) + '1.png');
        el_show_controls.prop("alt", 'Показати налаштування');

        date = new Date;
        date.setDate(date.getDate() + 100);
        setCookie("controls_show", "false", date.toUTCString());

        el_controls.hide("slow");
    });
    can.click(function(e) {
        editnode = getNodeByCoords(e.pageX, e.pageY, radius);

        el_pop_up_menu.hide();
        el_change_node_val.val("");
        el_change_node_val.hide();
        el_del_node.show();
        el_change_node.val("Змінити вузол");

        if (editnode != undefined) {

            if (numOfNodes == 1) {
                el_del_node.hide();
            }

            el_pop_up_menu.css("left", editnode.x + radius + 5);
            el_pop_up_menu.css("top", editnode.y);

            //alert(el_pop_up_menu.css("left") + " " + el_pop_up_menu.css("top"));

            el_pop_up_menu.show("fast");

        }
    });
    el_del_node.click(function() {
        delNode(editnode);
        el_pop_up_menu.hide("slow");
    });
    el_change_node.click(function() {

        el_change_node_val.show("fast");

        if (el_change_node.val() == "OK") {

            var new_val = parseInt(el_change_node_val.val());
            if (isNaN(new_val)) {
                sendPopUpMessage("Некоректне нове значення вузла!");
                return;
            }
            if (array.indexOf(new_val) != -1) {
                sendPopUpMessage("Такий вузол вже є в дереві!");
                return;
            }

            changeNode(editnode, new_val);
            el_pop_up_menu.hide("slow");

            el_change_node_val.val("");
            el_change_node_val.hide();
            el_change_node.val("Змінити вузол");
            return;
        }

        el_change_node.val("OK");
    });
    el_controls.hide();


    el_widthOfNode.prop("disabled", true);
    el_heightOfNode.prop("disabled", true);
    $("#widthOfNode_label").prop("disabled", true);
    $("#heightOfNode_label").prop("disabled", true);
    el_pop_up_message.hide();
    el_pop_up_menu.hide();
    el_change_node_val.hide();

    if (!navigator.cookieEnabled) {
        alert( 'Включите cookie для комфортной работы.' );
    }

    if (getCookie("controls_x")) {
        el_controls.css("left", getCookie("controls_x"));
    }
    if (getCookie("controls_y")) {
        el_controls.css("top", getCookie("controls_y"));
    }
    if (getCookie("controls_show") == "true") {
        el_controls.show();
        el_show_controls.prop("src", el_show_controls.prop("src").substring(0, el_show_controls.prop("src").length - 5) + '2.png');
        el_show_controls.prop("alt", 'Сховати налаштування');

    }
    if (getCookie("numOfNodes")) {
        el_numberOfNodes.val(getCookie("numOfNodes"));
    }

    el_add_node.val(Math.floor(Math.random() * 2000 - 1000));

    array = [];
    binary_tree = new BinaryTree();

    nodes = [];
    typeOfOrder = 'pre';
    var c = document.getElementById('can');
    cx = c.getContext("2d");
    factorOfZoom = [];

    drawType = el_drawType_circle.prop("checked") ? 'circle' : 'rect';

    numOfNodes = parseInt(el_numberOfNodes.val());
    radius = parseInt(el_radius.val());
    widthOfNode = parseInt(el_widthOfNode.val());
    heightOfNode = parseInt(el_heightOfNode.val());
    widthOfLastLevel = drawType == 'circle' ? radius / 2 : widthOfNode / 2;

    factorOfZoom['circle'] = radius / 20;
    factorOfZoom['rect'] = (widthOfNode + heightOfNode) / 2 / 80;

    factorOfExtension = 1.5 * factorOfZoom[drawType];

    randomValuesForTree(numOfNodes, -500, 500);
    sortArray();
    makeTree(binary_tree, array, 0, numOfNodes);

    switch (typeOfOrder) {
        case 'in':
            binary_tree.inOrder();
            break;
        case 'pre':
            binary_tree.preOrder();
            break;
        case 'post':
            binary_tree.postOrder();
            break;
        default:
            binary_tree.inOrder();
            break;
    }

    makeAll();

});

$(window).resize(function(){
    makeAll();
});

function sortArray () {
    if (doSort == "true") {
        array.sort(function(a,b){return a-b;});
    }
}

function numChange() {
    plus_numOfNodes = parseInt(el_numberOfNodes.val()) - numOfNodes;
    numOfNodes = parseInt(el_numberOfNodes.val());

    if (numOfNodes <= 0) {
        numOfNodes = 1;
        array = [];
        array.push(Math.floor(Math.random() * 1000) - 500);
        reBuildTree();
        sendPopUpMessage("Некоректне кількість вузлів!");
        el_numberOfNodes.val(1);
        return;
    }

    if (plus_numOfNodes > 0) {
        sendPopUpMessage("Додано " + plus_numOfNodes + " вузлів! Дерево перебудовано!");
        for (k = 0; k < plus_numOfNodes; k++)
            array.push(Math.floor(Math.random() * 1000) - 500);
    }
    else {
        sendPopUpMessage("Видалено " + Math.abs(plus_numOfNodes) + " вузлів! Дерево перебудовано!");
        for (k = 0; k < Math.abs(plus_numOfNodes); k++)
            array.pop();
    }

    sortArray();

    var date = new Date;
    date.setDate(date.getDate() + 100);
    setCookie("numOfNodes", numOfNodes, date.toUTCString());

    reBuildTree();
}

function delNode(node) {
    numOfNodes -= 1;
    el_numberOfNodes.val(numOfNodes);

    array.splice(array.indexOf(node.value), 1);

    var date = new Date;
    date.setDate(date.getDate() + 100);
    setCookie("numOfNodes", numOfNodes, date.toUTCString());

    reBuildTree();

    sendPopUpMessage("Вузол " + node.value + " видалено! Дерево перебудовано!");
}

function changeNode(node, val) {

    array[array.indexOf(node.value)] = val;
    sortArray();

    reBuildTree();

    sendPopUpMessage("Вузел " + node.value + " замінено на " + val + "! Дерево перебудовано!");
}

function reBuildTree() {
    delete binary_tree;

    nodes = [];

    binary_tree = new BinaryTree();
    makeTree(binary_tree, array, 0, numOfNodes);

    binary_tree.preOrder();

    makeAll();
}

function hideElements() {
    if (drawType == 'circle') {
        el_radius.prop("disabled", false);
        el_widthOfNode.prop("disabled", true);
        el_heightOfNode.prop("disabled", true);

        $("#radius_label").prop("disabled", false);//show();
        $("#widthOfNode_label").prop("disabled", true);//hide();
        $("#heightOfNode_label").prop("disabled", true);//hide();
    }
    else {
        el_radius.prop("disabled", true);
        el_widthOfNode.prop("disabled", false);
        el_heightOfNode.prop("disabled", false);

        $("#radius_label").prop("disabled", true);
        $("#widthOfNode_label").prop("disabled", false);
        $("#heightOfNode_label").prop("disabled", false);
    }
}

function randomValuesForTree (numOfNodes, min, max) {
    for (var i = 0; i < numOfNodes; i++) {
        var tmp = Math.floor(min + Math.random() * (max - min));
        if (array.indexOf(tmp) == -1)
            array.push(tmp);
        else
            i--;
    }
}

function setLevelsToNodes (nodes, binary_tree, maxLevel) {
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].left)
            binary_tree.getNode(nodes[i].left.value).level = nodes[i].level + 1;

        if (nodes[i].right)
            binary_tree.getNode(nodes[i].right.value).level = nodes[i].level + 1;;

        if (maxLevel < nodes[i].level)
            maxLevel = nodes[i].level;
    }

    return maxLevel;
}

function setCanvasHeightAndWidth (FOE, HON, radius, ML, WOLL, widthOfNode) {

    var wOfNode = [];
    wOfNode['rect'] = widthOfNode;
    wOfNode['circle'] = radius;

    var hOfNode = [];
    hOfNode['rect'] = HON;
    hOfNode['circle'] = radius * 2;

    can.attr('height', getValidHeight(FOE, hOfNode[drawType], ML));
    can.attr('width', getValidWidth(wOfNode[drawType], WOLL, ML));
}

function setCoords (nodes, binary_tree, radius, widthOfNode, heightOfNode, factorOfExtension) {

    var shift = [];
    shift['rect'] = widthOfNode / 2;
    shift['circle'] = 0;

    var hOfNode = [];
    hOfNode['rect'] = heightOfNode * factorOfExtension;
    hOfNode['circle'] = radius * 3.5;

    //инициализация позиции корня
    nodes[0].x = (can.attr('width') / 2) - shift[drawType];
    nodes[0].y = hOfNode[drawType] / 3;

    for (i = 0; i < nodes.length; i++) {

        var xChange = (can.attr('width') / Math.pow(2, nodes[i].level + 1));
        //var xFactor = widthOfNode * factorOfExtension;

        if (nodes[i].left) {
            leftNode = binary_tree.getNode(nodes[i].left.value);

            leftNode.x = /*xChange > xFactor ?*/ nodes[i].x - xChange /*: nodes[i].x - xFactor*/;
            leftNode.y = nodes[i].y + hOfNode[drawType] /** factorOfExtension*/;

        }
        if (nodes[i].right) {
            rightNode = binary_tree.getNode(nodes[i].right.value);

            rightNode.x = /*xChange > xFactor ?*/ nodes[i].x + xChange /*: nodes[i].x + xFactor*/;
            rightNode.y = nodes[i].y + hOfNode[drawType] /** factorOfExtension*/;

        }

    }
}

function drawTree (nodes, binary_tree, cx, drawType, radius, widthOfNode, heightOfNode, factorOfZoom) {
    for (i = 0; i < nodes.length; i++) {

        //рисование связей между узлами
        drawRelations(binary_tree, nodes[i], cx, drawType, radius, widthOfNode, heightOfNode);

        /*if (nodes[i].x > maxX)
         maxX = nodes[i].x;*/

        //рисование узлов
        if (drawType == 'rect') {
            drawNodeRect(nodes[i].x, nodes[i].y, widthOfNode, heightOfNode, cx,
                nodes[i].value,
                nodes[i].level,
                nodes[i].left == null ? '' : nodes[i].left.value,
                nodes[i].right == null ? '' : nodes[i].right.value);
        }
        else if (drawType == 'circle') {
            drawNodeCircle(nodes[i], radius, cx, factorOfZoom);
        }
    }
}

function getNodeByCoords (x, y, radius) {
    var minXY = [];
    var maxXY = [];

    if (drawType == 'circle') {
        for (n = 0; n < nodes.length; n++) {
            minXY['x'] = nodes[n].x - radius;
            minXY['y'] = nodes[n].y - radius;

            maxXY['x'] = nodes[n].x + radius;
            maxXY['y'] = nodes[n].y + radius;

            if (x > minXY['x'] && x < maxXY['x'] &&
                y > minXY['y'] && y < maxXY['y']) {

                return nodes[n];
            }
        }
    }
    else {
        for (n = 0; n < nodes.length; n++) {
            minXY['x'] = nodes[n].x;
            minXY['y'] = nodes[n].y;

            maxXY['x'] = nodes[n].x + widthOfNode;
            maxXY['y'] = nodes[n].y + heightOfNode;

            if (x > minXY['x'] && x < maxXY['x'] &&
                y > minXY['y'] && y < maxXY['y']) {

                return nodes[n];
            }
        }
    }
}

function makeAll() {

    widthOfLastLevel = drawType == 'circle' ? radius / 2 : widthOfNode / 2;

    factorOfZoom['circle'] = radius / 20;
    factorOfZoom['rect'] = (heightOfNode /*+ heightOfNode*/) / heightOfNode;

    factorOfExtension = 1.5 * factorOfZoom[drawType];


    var maxLevel = setLevelsToNodes(nodes, binary_tree, -999);
    setCanvasHeightAndWidth(factorOfExtension, heightOfNode, radius, maxLevel, widthOfLastLevel, widthOfNode);
    setCoords(nodes, binary_tree, radius, widthOfNode, heightOfNode, factorOfExtension);
    drawTree(nodes, binary_tree, cx, drawType, radius, widthOfNode, heightOfNode, factorOfZoom);
}

function sendPopUpMessage (message) {
    var label = $('#popUpMessage_label');
    var el_pop_up_message = $('#popUpMessage');

    label.html(message);

    el_pop_up_message.stop();

    el_pop_up_message.fadeIn("fast");
    setTimeout(function() {
        el_pop_up_message.slideToggle("fast");
    }, 1000);

}

// -------------- draw-functions --------------

function drawNodeRect (x, y, width, height, context, value, level, left, right) {

    /*context.beginPath();
    context.arc(x, y, width / 3, 0, Math.PI*2, true);
    context.stroke();*/


    //прямоугольник
    context.strokeStyle = '#000';
    context.strokeRect(x, y, width, height);

    //линия, отделяющая значение узла
    context.strokeStyle = '#000';
    context.moveTo(x, y + (height / 5 * 2));
    context.lineTo(x + width, y + (height / 5 * 2));

    //центральная полоса
    context.strokeStyle = '#000';
    context.moveTo(x + (width / 2), y + (height / 5 * 2));
    context.lineTo(x + (width / 2), y + height);

    //уровень узла
    context.font = "bold " + 10 * factorOfZoom[drawType] + "px sans-serif";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(level, x + (width / 7), y + (height / 7));

    //значение узла
    context.font = "bold " + 12 * factorOfZoom[drawType] + "px sans-serif";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(value, x + (width / 2), y + (height / 6));

    //значение левого сына
    context.fillText(left, x + (width / 4), y + (height / 4 * 3));

    //значение правого сына
    context.fillText(right, x + (width / 4 * 3), y + (height / 4 * 3));

    //нарисовать линии
    context.stroke();

}

function drawNodeCircle (node, radius, context) {

    context.beginPath();
    context.arc(node.x, node.y, radius, 0, Math.PI*2, true);

    var color_level = Math.floor(255 * ((node.level < 10 ? node.level * 0.1 : 1)));

    context.fillStyle = "rgb(" + color_level + "," + color_level + "," + 255 + ")";
        //"#" + 11 * (node.level < 10 ? node.level : 9) + "FFFF";
    context.fill();

    //значение узла
    context.font = "bold " + Math.floor(12 * factorOfZoom[drawType]) + "px sans-serif";
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    color_level = node.level < 7 ? 255 : 0;//Math.floor(255 * (1 - (node.level < 10 ? node.level * 0.1 : 1)));

    context.fillStyle = "rgb(" + color_level + "," + color_level + "," + color_level + ")";
    context.fillText(node.value, node.x, node.y);


    context.stroke();

}

function drawRelations (binary_tree, node, cx, drawType, radius, widthOfNode, heightOfNode) {
    if (drawType == 'rect') {
        if (node.left) {
            cx.moveTo(node.x - (widthOfNode / 10), nodes[i].y + (heightOfNode / 4 * 3)  + (heightOfNode / 10));
            cx.lineTo(
                binary_tree.getNode(node.left.value).x + widthOfNode + (widthOfNode / 10),
                binary_tree.getNode(node.left.value).y + (heightOfNode / 6) - (heightOfNode / 10));
            cx.stroke();
        }
        if (node.right) {
            cx.moveTo(node.x + widthOfNode + (widthOfNode / 10), node.y + (heightOfNode / 4 * 3) + (heightOfNode / 10));
            cx.lineTo(
                binary_tree.getNode(node.right.value).x - (widthOfNode / 10),
                binary_tree.getNode(node.right.value).y + (heightOfNode / 6)- (heightOfNode / 10));
            cx.stroke();
        }
    }
    else if (drawType == 'circle') {
        if (node.left) {
            cx.moveTo(node.x - radius, node.y + radius);
            cx.lineTo(
                binary_tree.getNode(node.left.value).x,
                binary_tree.getNode(node.left.value).y - radius * 1.4);
            cx.stroke();
        }
        if (node.right) {
            cx.moveTo(node.x + radius, node.y + radius);
            cx.lineTo(
                binary_tree.getNode(node.right.value).x,
                binary_tree.getNode(node.right.value).y - radius * 1.4);
            cx.stroke();
        }
    }
}