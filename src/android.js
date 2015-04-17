/**
 * Copyright (c) 2015 jguinto <uxcodes@gmail.com>
 * MIT License
 * @author jguinto
 */

(function() {
  var img, imgX, imgY, touch, touchPosX, touchPosY, moveOffsetX, moveOffsetY;

  function normalizeZIndex() {
    var imgs = document.querySelectorAll('.image');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.zIndex = 1;
    }
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/html', null); // For Firefox.
    img = e.target;
    normalizeZIndex();
    img.style.zIndex = 2;
    imgX = e.offsetX === undefined ? e.layerX : e.offsetX;
    imgY = e.offsetY === undefined ? e.layerY : e.offsetY;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    normalizeZIndex();
    img.style.zIndex = 2;
    img.style.left = e.pageX - imgX + 'px';
    img.style.top = e.pageY - imgY + 'px';
  }

  function handleTouchStart(e) {
    e.preventDefault();
    var img = e.target.parentNode.parentNode;
    var touch = e.touches[0];
    var touchOffsetX = img.offsetLeft - touch.pageX;
    var touchOffsetY = img.offsetTop - touch.pageY;
    img.style.zIndex = 10;

    img.addEventListener('touchmove', function(e) {
      var touch = e.touches[0]; // NEED this to be separate from above.
      var touchPosX = touch.pageX + touchOffsetX;
      var touchPosY = touch.pageY + touchOffsetY;
      img.style.zIndex = 2;
      img.style.left = touchPosX + 'px';
      img.style.top = touchPosY + 'px';
    }, false);
  }

  document.querySelector('body').addEventListener(
      'dragstart', handleDragStart, false);
  document.querySelector('body').addEventListener(
      'dragover', handleDragOver, false);
  document.querySelector('body').addEventListener(
      'drop', handleDrop, false);
  document.querySelector('body').addEventListener(
      'touchstart', handleTouchStart, false);

  document.getElementById('home').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
  document.getElementById('home').addEventListener('touchend', function() {
    window.location.href = 'index.html';
  });
})();
