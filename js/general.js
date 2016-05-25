/*
function getClientWidth()
{
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

function getClientHeight()
{
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}*/

function getValidHeight (FOE, HON, ML) {
    var calcHeight = FOE * HON * ML + nodes[0].y;
    var clientHeight =
        document.compatMode == 'CSS1Compat' &&
        !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;

    //alert(calcHeight);
    if (calcHeight < (clientHeight - 10)) {
        calcHeight = (clientHeight - 10);
    }


    //alert(calcHeight);
    return calcHeight;
}

function getValidWidth (R, WOLL, ML) {
    var calcWidth = (2 * R + WOLL) * Math.pow(2, ML - 1) + WOLL * 2;
    var clientWidth =
        document.compatMode == 'CSS1Compat' &&
        !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;

    if (calcWidth < (clientWidth - 5)) {
        calcWidth = (clientWidth - 5);
    }

    return calcWidth;
}