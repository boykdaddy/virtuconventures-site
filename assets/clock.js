(function () {
  var d = document.getElementById('clock-date'), t = document.getElementById('clock-time');
  if (!d || !t) return;
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var n = new Date();
    d.textContent = (n.getMonth() + 1) + '/' + n.getDate() + '/' + n.getFullYear();
    t.textContent = pad(n.getHours()) + ':' + pad(n.getMinutes()) + ':' + pad(n.getSeconds());
  }
  tick();
  setInterval(tick, 1000);
})();
