(function () {
  // Fade-in: pages with the 3D logo are revealed by v3d.js after the logo appears.
  // Pages without it (contact) fade in right away. Safety net after 4s either way.
  var b = document.body;
  function ready() { b.classList.add('ready'); }
  setTimeout(ready, document.getElementById('v') ? 4000 : 150);

  // Clock locked to Miami (US Eastern) time.
  var d = document.getElementById('clock-date'), t = document.getElementById('clock-time');
  if (!d || !t) return;
  var fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  });
  function tick() {
    var p = {};
    fmt.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    d.textContent = p.month + '/' + p.day + '/' + p.year;
    t.textContent = p.hour + ':' + p.minute + ':' + p.second;
  }
  tick();
  setInterval(tick, 1000);
})();
