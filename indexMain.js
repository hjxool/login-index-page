index.timer = setInterval(index.getTime, 1000);
function checkPlaceAndRefresh() {
    if (index.tags.length != 0) {
        if (index.placeId) {
            index.resPlaceDeviceList();
            index.request('post', index.sceneDetailUrl, { placeId: index.placeId }, "74935343174538", index.loginToken, index.sceneDetail);
        }
    }
}
setInterval(checkPlaceAndRefresh, 2000);
// // 动态生成索引
// function _index(obj) {
//     let index = 0;
//     while (obj && (obj = obj.previousElementSibling)) {
//         index++;
//     }
//     return index;
// }
// // 添加动画及删除旧动画
// function _animate(preRect, obj) {
//     let currentRect = obj.getBoundingClientRect();

//     obj.style.transform = 'translate(' + (preRect.left - currentRect.left) + 'px,' + (preRect.top - currentRect.top) + 'px)';
//     // 触发重绘制
//     obj.offsetWidth;
//     obj.style.transition='all 300ms';
//     obj.style.transform='translate(0,0)';
//     // 定时清除动画
//     obj.animated = setTimeout(function() {
//         obj.style.transition = '';
//         obj.style.transform = '';
//         obj.animated = false;
//     }, 300);
// }
// var frame = $(".frame");
// var itemScene = $('itemScene');
// 正在拖拽的对象
// var draging = null;

// frame.ondragstart = function(e) {
//     e.dataTransfer.setData('text/plain', e.target.id);
//     draging = e.target;
//     console.log("设备栏拖拽开始")
// }
// frame.ondragover = function(e) {
//     e.preventDefault();
//     console.log("正在设备栏拖拽")
    // let target = e.target;
    // if (target.className === "cardBag" && target !== draging) {
    //     // 获取移动前位置坐标
    //     var targetRect = target.getBoundingClientRect();
    //     var dragingRect = draging.getBoundingClientRect();
    //     // 判断是否已添加动画
    //     if (target.animated) {
    //         return;
    //     }
    //     if (_index(draging) < _index(target)) {
    //         target.parentNode.insertBefore(draging, target.nextSibling);
    //     } else {
    //         target.parentNode.insertBefore(draging, target);
    //     }
    //     _animate(dragingRect, draging);
    //     _animate(targetRect, target);
    // }
// }
// frame.ondrop = function(e) {
//     e.preventDefault();
//     console.log("放在设备栏")
//     console.log(e.target.classList)
//     if (e.target.classList[0] === "frame") {
//         e.target.appendChild(draging);
//     }
// }
// itemScene.ondragstart = function(e) {
//     e.dataTransfer.setData('text/plain', e.target.innerText);
//     draging = e.target;
//     console.log("场景栏拖拽开始")
// }
// itemScene.ondragover = function(e) {
//     e.preventDefault();
//     console.log("正在场景里拖拽")
//     let target = e.target;
//     if (target.className === "deviceImg" && target !== draging) {
//         var targetRect = target.getBoundingClientRect();
//         var dragingRect = draging.getBoundingClientRect();
//         if (target.animated) {
//             return;
//         }
//         if (_index(draging) < _index(target)) {
//             target.parentNode.insertBefore(draging, target.nextSibling);
//         } else {
//             target.parentNode.insertBefore(draging, target);
//         }
//         _animate(dragingRect, draging);
//         _animate(targetRect, target);
//     }
// }
// itemScene.ondrop = function(e) {
//     e.preventDefault();
//     console.log("放在场景里")
//     if (e.target.id === "itemScene") {
//         e.target.appendChild(draging);
//     }
// }