
<!--
    Візуалізація зображень дерев бінарного пошуку
-->


<!DOCTYPE html>
<html lang="en">
<head>
    <title>Візуалізація зображень дерев бінарного пошуку</title>
    <link rel="shortcut icon" href="../res/icon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/main_css.css" type="text/css">
    <link rel="stylesheet" href="../css/binarytree.css" type="text/css">
    <script src="../js/general.js"></script>
    <script src="../js/jquery-1.11.3.min.js"></script>
    <script src="../js/cookies.js"></script>
    <script src="../js/jquery-ui.min.js"></script>
    <script src="../js/jCanvaScript.js"></script>
    <script src="../js/binarytree.js"></script>

</head>
<body>

    <canvas id="can"></canvas>

    <div id="controls">

        <img src="../res/minus.png" id="minus" alt="Зменшити" class="pm" width="30">
        <img src="../res/plus.png" id="plus" alt="Збільшити" class="pm" width="30">

        <br>
        <img src="../res/close.png" id="close_controls" alt="Закрити" width="30"><br>

        <label>Відображення вузлів</label><br>
        <input type="radio" class="radio" id="drawType_circle" name="drawType" checked>
        <label for="drawType_circle">Колами</label><br>
        <input type="radio" class="radio" id="drawType_rect" name="drawType">
        <label for="drawType_rect">Квадратами</label><br>

        <label for="radius" id="radius_label">Радіус вузла</label><br>
        <input type="text" id="radius" name="radius" min="10" max="100" value="25"><br>

        <label for="widthOfNode" id="widthOfNode_label">Ширина вузла</label><br>
        <input type="text" id="widthOfNode" name="widthOfNode" min="10" max="100" value="60"><br>
        <label for="heightOfNode" id="heightOfNode_label">Висота вузла</label><br>
        <input type="text" id="heightOfNode" name="heightOfNode" min="10" max="100" value="60"><br>

        <label for="numberOfNodes">Кількість вузлів</label><br>
        <input type="text" id="numberOfNodes" name="numberOfNodes" min="1" max="1024" value="25"><br><br>

        <label for="addNode">Добавить узел</label><br>
        <input type="text" id="addNode" name="addNode"><br>
        <input type="button" id="addNodeBut" value="Добавить">

    </div>


    <div id="popUpMenu">
        <input type="button" id="delNode" value="Удалить узел"><br>
        <input type="button" id="changeNode" value="Изменить узел"><br>
        <input type="text" id="changeNode_val" value="">
    </div>

    <div id="popUpMessage">
        <label id="popUpMessage_label"></label>
    </div>

    <img src="../res/sets_1.png" id="show_controls" alt="Показать настройки">

</body>
</html>