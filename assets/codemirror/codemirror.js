(function(b, a) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = a() : typeof define === "function" && define.amd ? define(a) : (b.CodeMirror = a())
}(this, (function() {
    var eb = navigator.userAgent;
    var em = navigator.platform;
    var cu = /gecko\/\d/i.test(eb);
    var e2 = /MSIE \d/.test(eb);
    var bN = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(eb);
    var dT = e2 || bN;
    var l = dT && (e2 ? document.documentMode || 6 : bN[1]);
    var c7 = /WebKit\//.test(eb);
    var dW = c7 && /Qt\/\d+\.\d+/.test(eb);
    var dl = /Chrome\//.test(eb);
    var ed = /Opera\//.test(eb);
    var aD = /Apple Computer/.test(navigator.vendor);
    var de = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(eb);
    var fN = /PhantomJS/.test(eb);
    var fk = /AppleWebKit/.test(eb) && /Mobile\/\w+/.test(eb);
    var es = fk || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(eb);
    var cc = fk || /Mac/.test(em);
    var f6 = /\bCrOS\b/.test(eb);
    var aQ = /win/i.test(em);
    var a0 = ed && eb.match(/Version\/(\d*\.\d*)/);
    if (a0) {
        a0 = Number(a0[1])
    }
    if (a0 && a0 >= 15) {
        ed = false;
        c7 = true
    }
    var bU = cc && (dW || ed && (a0 == null || a0 < 12.11));
    var gC = cu || (dT && l >= 9);

    function S(i) {
        return new RegExp("(^|\\s)" + i + "(?:$|\\s)\\s*")
    }
    var h = function(gO, i) {
        var gP = gO.className;
        var gN = S(i).exec(gP);
        if (gN) {
            var gQ = gP.slice(gN.index + gN[0].length);
            gO.className = gP.slice(0, gN.index) + (gQ ? gN[1] + gQ : "")
        }
    };

    function ec(gN) {
        for (var i = gN.childNodes.length; i > 0; --i) {
            gN.removeChild(gN.firstChild)
        }
        return gN
    }

    function bW(i, gN) {
        return ec(i).appendChild(gN)
    }

    function gv(gN, gR, gQ, gP) {
        var gS = document.createElement(gN);
        if (gQ) {
            gS.className = gQ
        }
        if (gP) {
            gS.style.cssText = gP
        }
        if (typeof gR == "string") {
            gS.appendChild(document.createTextNode(gR))
        } else {
            if (gR) {
                for (var gO = 0; gO < gR.length; ++gO) {
                    gS.appendChild(gR[gO])
                }
            }
        }
        return gS
    }
    var cs;
    if (document.createRange) {
        cs = function(gP, gQ, gN, i) {
            var gO = document.createRange();
            gO.setEnd(i || gP, gN);
            gO.setStart(gP, gQ);
            return gO
        }
    } else {
        cs = function(gO, gQ, i) {
            var gN = document.body.createTextRange();
            try {
                gN.moveToElementText(gO.parentNode)
            } catch (gP) {
                return gN
            }
            gN.collapse(true);
            gN.moveEnd("character", i);
            gN.moveStart("character", gQ);
            return gN
        }
    }

    function gD(i, gN) {
        if (gN.nodeType == 3) {
            gN = gN.parentNode
        }
        if (i.contains) {
            return i.contains(gN)
        }
        do {
            if (gN.nodeType == 11) {
                gN = gN.host
            }
            if (gN == i) {
                return true
            }
        } while (gN = gN.parentNode)
    }

    function dX() {
        var i;
        try {
            i = document.activeElement
        } catch (gN) {
            i = document.body || null
        }
        while (i && i.root && i.root.activeElement) {
            i = i.root.activeElement
        }
        return i
    }

    function fW(gN, i) {
        var gO = gN.className;
        if (!S(i).test(gO)) {
            gN.className += (gO ? " " : "") + i
        }
    }

    function gl(gP, gN) {
        var gO = gP.split(" ");
        for (var gQ = 0; gQ < gO.length; gQ++) {
            if (gO[gQ] && !S(gO[gQ]).test(gN)) {
                gN += " " + gO[gQ]
            }
        }
        return gN
    }
    var dU = function(i) {
        i.select()
    };
    if (fk) {
        dU = function(i) {
            i.selectionStart = 0;
            i.selectionEnd = i.value.length
        }
    } else {
        if (dT) {
            dU = function(gN) {
                try {
                    gN.select()
                } catch (i) {}
            }
        }
    }

    function cB(gN) {
        var i = Array.prototype.slice.call(arguments, 1);
        return function() {
            return gN.apply(null, i)
        }
    }

    function aO(gO, gN, i) {
        if (!gN) {
            gN = {}
        }
        for (var gP in gO) {
            if (gO.hasOwnProperty(gP) && (i !== false || !gN.hasOwnProperty(gP))) {
                gN[gP] = gO[gP]
            }
        }
        return gN
    }

    function bV(gQ, gO, gS, gT, gP) {
        if (gO == null) {
            gO = gQ.search(/[^\s\u00a0]/);
            if (gO == -1) {
                gO = gQ.length
            }
        }
        for (var gR = gT || 0, gU = gP || 0;;) {
            var gN = gQ.indexOf("\t", gR);
            if (gN < 0 || gN >= gO) {
                return gU + (gO - gR)
            }
            gU += gN - gR;
            gU += gS - (gU % gS);
            gR = gN + 1
        }
    }

    function gM() {
        this.id = null
    }
    gM.prototype.set = function(i, gN) {
        clearTimeout(this.id);
        this.id = setTimeout(gN, i)
    };

    function ds(gP, gN) {
        for (var gO = 0; gO < gP.length; ++gO) {
            if (gP[gO] == gN) {
                return gO
            }
        }
        return -1
    }
    var dS = 30;
    var ch = {
        toString: function() {
            return "CodeMirror.Pass"
        }
    };
    var Z = {
        scroll: false
    };
    var M = {
        origin: "*mouse"
    };
    var c3 = {
        origin: "+move"
    };

    function eD(gQ, gP, gR) {
        for (var gS = 0, gO = 0;;) {
            var gN = gQ.indexOf("\t", gS);
            if (gN == -1) {
                gN = gQ.length
            }
            var i = gN - gS;
            if (gN == gQ.length || gO + i >= gP) {
                return gS + Math.min(i, gP - gO)
            }
            gO += gN - gS;
            gO += gR - (gO % gR);
            gS = gN + 1;
            if (gO >= gP) {
                return gS
            }
        }
    }
    var a1 = [""];

    function cv(i) {
        while (a1.length <= i) {
            a1.push(f2(a1) + " ")
        }
        return a1[i]
    }

    function f2(i) {
        return i[i.length - 1]
    }

    function bX(gQ, gP) {
        var gN = [];
        for (var gO = 0; gO < gQ.length; gO++) {
            gN[gO] = gP(gQ[gO], gO)
        }
        return gN
    }

    function cf(gQ, gN, gO) {
        var gP = 0,
            i = gO(gN);
        while (gP < gQ.length && gO(gQ[gP]) <= i) {
            gP++
        }
        gQ.splice(gP, 0, gN)
    }

    function gm() {}

    function cq(gO, i) {
        var gN;
        if (Object.create) {
            gN = Object.create(gO)
        } else {
            gm.prototype = gO;
            gN = new gm()
        }
        if (i) {
            aO(i, gN)
        }
        return gN
    }
    var bd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

    function fZ(i) {
        return /\w/.test(i) || i > "\x80" && (i.toUpperCase() != i.toLowerCase() || bd.test(i))
    }

    function cG(i, gN) {
        if (!gN) {
            return fZ(i)
        }
        if (gN.source.indexOf("\\w") > -1 && fZ(i)) {
            return true
        }
        return gN.test(i)
    }

    function fd(i) {
        for (var gN in i) {
            if (i.hasOwnProperty(gN) && i[gN]) {
                return false
            }
        }
        return true
    }
    var e1 = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

    function fI(i) {
        return i.charCodeAt(0) >= 768 && e1.test(i)
    }

    function eZ(i, gO, gN) {
        var gP = this;
        this.input = gN;
        gP.scrollbarFiller = gv("div", null, "CodeMirror-scrollbar-filler");
        gP.scrollbarFiller.setAttribute("cm-not-content", "true");
        gP.gutterFiller = gv("div", null, "CodeMirror-gutter-filler");
        gP.gutterFiller.setAttribute("cm-not-content", "true");
        gP.lineDiv = gv("div", null, "CodeMirror-code");
        gP.selectionDiv = gv("div", null, null, "position: relative; z-index: 1");
        gP.cursorDiv = gv("div", null, "CodeMirror-cursors");
        gP.measure = gv("div", null, "CodeMirror-measure");
        gP.lineMeasure = gv("div", null, "CodeMirror-measure");
        gP.lineSpace = gv("div", [gP.measure, gP.lineMeasure, gP.selectionDiv, gP.cursorDiv, gP.lineDiv], null, "position: relative; outline: none");
        gP.mover = gv("div", [gv("div", [gP.lineSpace], "CodeMirror-lines")], null, "position: relative");
        gP.sizer = gv("div", [gP.mover], "CodeMirror-sizer");
        gP.sizerWidth = null;
        gP.heightForcer = gv("div", null, null, "position: absolute; height: " + dS + "px; width: 1px;");
        gP.gutters = gv("div", null, "CodeMirror-gutters");
        gP.lineGutter = null;
        gP.scroller = gv("div", [gP.sizer, gP.heightForcer, gP.gutters], "CodeMirror-scroll");
        gP.scroller.setAttribute("tabIndex", "-1");
        gP.wrapper = gv("div", [gP.scrollbarFiller, gP.gutterFiller, gP.scroller], "CodeMirror");
        if (dT && l < 8) {
            gP.gutters.style.zIndex = -1;
            gP.scroller.style.paddingRight = 0
        }
        if (!c7 && !(cu && es)) {
            gP.scroller.draggable = true
        }
        if (i) {
            if (i.appendChild) {
                i.appendChild(gP.wrapper)
            } else {
                i(gP.wrapper)
            }
        }
        gP.viewFrom = gP.viewTo = gO.first;
        gP.reportedViewFrom = gP.reportedViewTo = gO.first;
        gP.view = [];
        gP.renderedView = null;
        gP.externalMeasured = null;
        gP.viewOffset = 0;
        gP.lastWrapHeight = gP.lastWrapWidth = 0;
        gP.updateLineNumbers = null;
        gP.nativeBarWidth = gP.barHeight = gP.barWidth = 0;
        gP.scrollbarsClipped = false;
        gP.lineNumWidth = gP.lineNumInnerWidth = gP.lineNumChars = null;
        gP.alignWidgets = false;
        gP.cachedCharWidth = gP.cachedTextHeight = gP.cachedPaddingH = null;
        gP.maxLine = null;
        gP.maxLineLength = 0;
        gP.maxLineChanged = false;
        gP.wheelDX = gP.wheelDY = gP.wheelStartX = gP.wheelStartY = null;
        gP.shift = false;
        gP.selForContextMenu = null;
        gP.activeTouch = null;
        gN.init(gP)
    }

    function fy(gQ, gS) {
        gS -= gQ.first;
        if (gS < 0 || gS >= gQ.size) {
            throw new Error("There is no line " + (gS + gQ.first) + " in the document.")
        }
        var gN = gQ;
        while (!gN.lines) {
            for (var gO = 0;; ++gO) {
                var gR = gN.children[gO],
                    gP = gR.chunkSize();
                if (gS < gP) {
                    gN = gR;
                    break
                }
                gS -= gP
            }
        }
        return gN.lines[gS]
    }

    function gw(gO, gQ, i) {
        var gN = [],
            gP = gQ.line;
        gO.iter(gQ.line, i.line + 1, function(gR) {
            var gS = gR.text;
            if (gP == i.line) {
                gS = gS.slice(0, i.ch)
            }
            if (gP == gQ.line) {
                gS = gS.slice(gQ.ch)
            }
            gN.push(gS);
            ++gP
        });
        return gN
    }

    function a3(gN, gP, gO) {
        var i = [];
        gN.iter(gP, gO, function(gQ) {
            i.push(gQ.text)
        });
        return i
    }

    function gz(gN, i) {
        var gO = i - gN.height;
        if (gO) {
            for (var gP = gN; gP; gP = gP.parent) {
                gP.height += gO
            }
        }
    }

    function bR(gN) {
        if (gN.parent == null) {
            return null
        }
        var gR = gN.parent,
            gQ = ds(gR.lines, gN);
        for (var gO = gR.parent; gO; gR = gO, gO = gO.parent) {
            for (var gP = 0;; ++gP) {
                if (gO.children[gP] == gR) {
                    break
                }
                gQ += gO.children[gP].chunkSize()
            }
        }
        return gQ + gR.first
    }

    function bL(gT, gS) {
        var gQ = gT.first;
        outer: do {
            for (var gP = 0; gP < gT.children.length; ++gP) {
                var gO = gT.children[gP],
                    gN = gO.height;
                if (gS < gN) {
                    gT = gO;
                    continue outer
                }
                gS -= gN;
                gQ += gO.chunkSize()
            }
            return gQ
        } while (!gT.lines);
        var gR = 0;
        for (; gR < gT.lines.length; ++gR) {
            var gV = gT.lines[gR],
                gU = gV.height;
            if (gS < gU) {
                break
            }
            gS -= gU
        }
        return gQ + gR
    }

    function ce(gN, i) {
        return i >= gN.first && i < gN.first + gN.size
    }

    function eG(gN, gO) {
        return String(gN.lineNumberFormatter(gO + gN.firstLineNumber))
    }

    function W(i, gN) {
        if (!(this instanceof W)) {
            return new W(i, gN)
        }
        this.line = i;
        this.ch = gN
    }

    function cl(gN, i) {
        return gN.line - i.line || gN.ch - i.ch
    }

    function co(i) {
        return W(i.line, i.ch)
    }

    function bB(gN, i) {
        return cl(gN, i) < 0 ? i : gN
    }

    function ar(gN, i) {
        return cl(gN, i) < 0 ? gN : i
    }

    function dc(i, gN) {
        return Math.max(i.first, Math.min(gN, i.first + i.size - 1))
    }

    function f7(gN, gO) {
        if (gO.line < gN.first) {
            return W(gN.first, 0)
        }
        var i = gN.first + gN.size - 1;
        if (gO.line > i) {
            return W(i, fy(gN, i).text.length)
        }
        return fL(gO, fy(gN, gO.line).text.length)
    }

    function fL(gO, gN) {
        var i = gO.ch;
        if (i == null || i > gN) {
            return W(gO.line, gN)
        } else {
            if (i < 0) {
                return W(gO.line, 0)
            } else {
                return gO
            }
        }
    }

    function ea(gP, gQ) {
        var gN = [];
        for (var gO = 0; gO < gQ.length; gO++) {
            gN[gO] = f7(gP, gQ[gO])
        }
        return gN
    }
    var gG = false;
    var a8 = false;

    function fU() {
        gG = true
    }

    function bA() {
        a8 = true
    }

    function ev(i, gO, gN) {
        this.marker = i;
        this.from = gO;
        this.to = gN
    }

    function ft(gP, gN) {
        if (gP) {
            for (var gO = 0; gO < gP.length; ++gO) {
                var gQ = gP[gO];
                if (gQ.marker == gN) {
                    return gQ
                }
            }
        }
    }

    function eY(gO, gP) {
        var gQ;
        for (var gN = 0; gN < gO.length; ++gN) {
            if (gO[gN] != gP) {
                (gQ || (gQ = [])).push(gO[gN])
            }
        }
        return gQ
    }

    function cj(i, gN) {
        i.markedSpans = i.markedSpans ? i.markedSpans.concat([gN]) : [gN];
        gN.marker.attachLine(i)
    }

    function aR(gO, gP, gT) {
        var gU;
        if (gO) {
            for (var gR = 0; gR < gO.length; ++gR) {
                var gV = gO[gR],
                    gS = gV.marker;
                var gN = gV.from == null || (gS.inclusiveLeft ? gV.from <= gP : gV.from < gP);
                if (gN || gV.from == gP && gS.type == "bookmark" && (!gT || !gV.marker.insertLeft)) {
                    var gQ = gV.to == null || (gS.inclusiveRight ? gV.to >= gP : gV.to > gP);
                    (gU || (gU = [])).push(new ev(gS, gV.from, gQ ? null : gV.to))
                }
            }
        }
        return gU
    }

    function aC(gO, gQ, gT) {
        var gU;
        if (gO) {
            for (var gR = 0; gR < gO.length; ++gR) {
                var gV = gO[gR],
                    gS = gV.marker;
                var gP = gV.to == null || (gS.inclusiveRight ? gV.to >= gQ : gV.to > gQ);
                if (gP || gV.from == gQ && gS.type == "bookmark" && (!gT || gV.marker.insertLeft)) {
                    var gN = gV.from == null || (gS.inclusiveLeft ? gV.from <= gQ : gV.from < gQ);
                    (gU || (gU = [])).push(new ev(gS, gN ? null : gV.from - gQ, gV.to == null ? null : gV.to - gQ))
                }
            }
        }
        return gU
    }

    function ew(g8, gY) {
        if (gY.full) {
            return null
        }
        var gP = ce(g8, gY.from.line) && fy(g8, gY.from.line).markedSpans;
        var gW = ce(g8, gY.to.line) && fy(g8, gY.to.line).markedSpans;
        if (!gP && !gW) {
            return null
        }
        var gV = gY.from.ch,
            g3 = gY.to.ch,
            g0 = cl(gY.from, gY.to) == 0;
        var gU = aR(gP, gV, g0);
        var gX = aC(gW, g3, g0);
        var g1 = gY.text.length == 1,
            gS = f2(gY.text).length + (g1 ? gV : 0);
        if (gU) {
            for (var g6 = 0; g6 < gU.length; ++g6) {
                var g5 = gU[g6];
                if (g5.to == null) {
                    var gZ = ft(gX, g5.marker);
                    if (!gZ) {
                        g5.to = gV
                    } else {
                        if (g1) {
                            g5.to = gZ.to == null ? null : gZ.to + gS
                        }
                    }
                }
            }
        }
        if (gX) {
            for (var gT = 0; gT < gX.length; ++gT) {
                var g4 = gX[gT];
                if (g4.to != null) {
                    g4.to += gS
                }
                if (g4.from == null) {
                    var gO = ft(gU, g4.marker);
                    if (!gO) {
                        g4.from = gS;
                        if (g1) {
                            (gU || (gU = [])).push(g4)
                        }
                    }
                } else {
                    g4.from += gS;
                    if (g1) {
                        (gU || (gU = [])).push(g4)
                    }
                }
            }
        }
        if (gU) {
            gU = r(gU)
        }
        if (gX && gX != gU) {
            gX = r(gX)
        }
        var g7 = [gU];
        if (!g1) {
            var g2 = gY.text.length - 2,
                gN;
            if (g2 > 0 && gU) {
                for (var gR = 0; gR < gU.length; ++gR) {
                    if (gU[gR].to == null) {
                        (gN || (gN = [])).push(new ev(gU[gR].marker, null, null))
                    }
                }
            }
            for (var gQ = 0; gQ < g2; ++gQ) {
                g7.push(gN)
            }
            g7.push(gX)
        }
        return g7
    }

    function r(gO) {
        for (var gN = 0; gN < gO.length; ++gN) {
            var gP = gO[gN];
            if (gP.from != null && gP.from == gP.to && gP.marker.clearWhenEmpty !== false) {
                gO.splice(gN--, 1)
            }
        }
        if (!gO.length) {
            return null
        }
        return gO
    }

    function cO(gZ, gX, gY) {
        var gR = null;
        gZ.iter(gX.line, gY.line + 1, function(g0) {
            if (g0.markedSpans) {
                for (var g1 = 0; g1 < g0.markedSpans.length; ++g1) {
                    var g2 = g0.markedSpans[g1].marker;
                    if (g2.readOnly && (!gR || ds(gR, g2) == -1)) {
                        (gR || (gR = [])).push(g2)
                    }
                }
            }
        });
        if (!gR) {
            return null
        }
        var gS = [{
            from: gX,
            to: gY
        }];
        for (var gT = 0; gT < gR.length; ++gT) {
            var gU = gR[gT],
                gP = gU.find(0);
            for (var gQ = 0; gQ < gS.length; ++gQ) {
                var gO = gS[gQ];
                if (cl(gO.to, gP.from) < 0 || cl(gO.from, gP.to) > 0) {
                    continue
                }
                var gW = [gQ, 1],
                    gN = cl(gO.from, gP.from),
                    gV = cl(gO.to, gP.to);
                if (gN < 0 || !gU.inclusiveLeft && !gN) {
                    gW.push({
                        from: gO.from,
                        to: gP.from
                    })
                }
                if (gV > 0 || !gU.inclusiveRight && !gV) {
                    gW.push({
                        from: gP.to,
                        to: gO.to
                    })
                }
                gS.splice.apply(gS, gW);
                gQ += gW.length - 1
            }
        }
        return gS
    }

    function gB(gN) {
        var gP = gN.markedSpans;
        if (!gP) {
            return
        }
        for (var gO = 0; gO < gP.length; ++gO) {
            gP[gO].marker.detachLine(gN)
        }
        gN.markedSpans = null
    }

    function da(gN, gP) {
        if (!gP) {
            return
        }
        for (var gO = 0; gO < gP.length; ++gO) {
            gP[gO].marker.attachLine(gN)
        }
        gN.markedSpans = gP
    }

    function v(i) {
        return i.inclusiveLeft ? -1 : 0
    }

    function b0(i) {
        return i.inclusiveRight ? 1 : 0
    }

    function d1(gP, gN) {
        var gR = gP.lines.length - gN.lines.length;
        if (gR != 0) {
            return gR
        }
        var gO = gP.find(),
            gS = gN.find();
        var i = cl(gO.from, gS.from) || v(gP) - v(gN);
        if (i) {
            return -i
        }
        var gQ = cl(gO.to, gS.to) || b0(gP) - b0(gN);
        if (gQ) {
            return gQ
        }
        return gN.id - gP.id
    }

    function a7(gO, gS) {
        var gN = a8 && gO.markedSpans,
            gR;
        if (gN) {
            for (var gQ = (void 0), gP = 0; gP < gN.length; ++gP) {
                gQ = gN[gP];
                if (gQ.marker.collapsed && (gS ? gQ.from : gQ.to) == null && (!gR || d1(gR, gQ.marker) < 0)) {
                    gR = gQ.marker
                }
            }
        }
        return gR
    }

    function e7(i) {
        return a7(i, true)
    }

    function eK(i) {
        return a7(i, false)
    }

    function z(gV, gP, gT, gU, gR) {
        var gY = fy(gV, gP);
        var gN = a8 && gY.markedSpans;
        if (gN) {
            for (var gQ = 0; gQ < gN.length; ++gQ) {
                var gO = gN[gQ];
                if (!gO.marker.collapsed) {
                    continue
                }
                var gX = gO.marker.find(0);
                var gW = cl(gX.from, gT) || v(gO.marker) - v(gR);
                var gS = cl(gX.to, gU) || b0(gO.marker) - b0(gR);
                if (gW >= 0 && gS <= 0 || gW <= 0 && gS >= 0) {
                    continue
                }
                if (gW <= 0 && (gO.marker.inclusiveRight && gR.inclusiveLeft ? cl(gX.to, gT) >= 0 : cl(gX.to, gT) > 0) || gW >= 0 && (gO.marker.inclusiveRight && gR.inclusiveLeft ? cl(gX.from, gU) <= 0 : cl(gX.from, gU) < 0)) {
                    return true
                }
            }
        }
    }

    function y(gN) {
        var i;
        while (i = e7(gN)) {
            gN = i.find(-1, true).line
        }
        return gN
    }

    function g(gO) {
        var i, gN;
        while (i = eK(gO)) {
            gO = i.find(1, true).line;
            (gN || (gN = [])).push(gO)
        }
        return gN
    }

    function aX(gP, gN) {
        var i = fy(gP, gN),
            gO = y(i);
        if (i == gO) {
            return gN
        }
        return bR(gO)
    }

    function ee(gP, gO) {
        if (gO > gP.lastLine()) {
            return gO
        }
        var gN = fy(gP, gO),
            i;
        if (!fP(gP, gN)) {
            return gO
        }
        while (i = eK(gN)) {
            gN = i.find(1, true).line
        }
        return bR(gN) + 1
    }

    function fP(gR, gO) {
        var gN = a8 && gO.markedSpans;
        if (gN) {
            for (var gQ = (void 0), gP = 0; gP < gN.length; ++gP) {
                gQ = gN[gP];
                if (!gQ.marker.collapsed) {
                    continue
                }
                if (gQ.from == null) {
                    return true
                }
                if (gQ.marker.widgetNode) {
                    continue
                }
                if (gQ.from == 0 && gQ.marker.inclusiveLeft && T(gR, gO, gQ)) {
                    return true
                }
            }
        }
    }

    function T(gS, gO, gQ) {
        if (gQ.to == null) {
            var gN = gQ.marker.find(1, true);
            return T(gS, gN.line, ft(gN.line.markedSpans, gQ.marker))
        }
        if (gQ.marker.inclusiveRight && gQ.to == gO.text.length) {
            return true
        }
        for (var gR = (void 0), gP = 0; gP < gO.markedSpans.length; ++gP) {
            gR = gO.markedSpans[gP];
            if (gR.marker.collapsed && !gR.marker.widgetNode && gR.from == gQ.to && (gR.to == null || gR.to != gQ.from) && (gR.marker.inclusiveLeft || gQ.marker.inclusiveRight) && T(gS, gO, gR)) {
                return true
            }
        }
    }

    function bQ(gP) {
        gP = y(gP);
        var gR = 0,
            gO = gP.parent;
        for (var gQ = 0; gQ < gO.lines.length; ++gQ) {
            var gN = gO.lines[gQ];
            if (gN == gP) {
                break
            } else {
                gR += gN.height
            }
        }
        for (var gS = gO.parent; gS; gO = gS, gS = gO.parent) {
            for (var gU = 0; gU < gS.children.length; ++gU) {
                var gT = gS.children[gU];
                if (gT == gO) {
                    break
                } else {
                    gR += gT.height
                }
            }
        }
        return gR
    }

    function ez(gO) {
        if (gO.height == 0) {
            return 0
        }
        var gN = gO.text.length,
            i, gR = gO;
        while (i = e7(gR)) {
            var gP = i.find(0, true);
            gR = gP.from.line;
            gN += gP.from.ch - gP.to.ch
        }
        gR = gO;
        while (i = eK(gR)) {
            var gQ = i.find(0, true);
            gN -= gR.text.length - gQ.from.ch;
            gR = gQ.to.line;
            gN += gR.text.length - gQ.to.ch
        }
        return gN
    }

    function f(i) {
        var gO = i.display,
            gN = i.doc;
        gO.maxLine = fy(gN, gN.first);
        gO.maxLineLength = ez(gO.maxLine);
        gO.maxLineChanged = true;
        gN.iter(function(gQ) {
            var gP = ez(gQ);
            if (gP > gO.maxLineLength) {
                gO.maxLineLength = gP;
                gO.maxLine = gQ
            }
        })
    }

    function ef(gN, gT, gS, gR) {
        if (!gN) {
            return gR(gT, gS, "ltr")
        }
        var gQ = false;
        for (var gP = 0; gP < gN.length; ++gP) {
            var gO = gN[gP];
            if (gO.from < gS && gO.to > gT || gT == gS && gO.to == gT) {
                gR(Math.max(gO.from, gT), Math.min(gO.to, gS), gO.level == 1 ? "rtl" : "ltr");
                gQ = true
            }
        }
        if (!gQ) {
            gR(gT, gS, "ltr")
        }
    }

    function dI(i) {
        return i.level % 2 ? i.to : i.from
    }

    function gH(i) {
        return i.level % 2 ? i.from : i.to
    }

    function cK(gN) {
        var i = a(gN);
        return i ? dI(i[0]) : 0
    }

    function cZ(gN) {
        var i = a(gN);
        if (!i) {
            return gN.text.length
        }
        return gH(f2(i))
    }

    function an(gN, gO, i) {
        var gP = gN[0].level;
        if (gO == gP) {
            return true
        }
        if (i == gP) {
            return false
        }
        return gO < i
    }
    var fm = null;

    function aI(gN, gR) {
        var gP;
        fm = null;
        for (var gO = 0; gO < gN.length; ++gO) {
            var gQ = gN[gO];
            if (gQ.from < gR && gQ.to > gR) {
                return gO
            }
            if ((gQ.from == gR || gQ.to == gR)) {
                if (gP == null) {
                    gP = gO
                } else {
                    if (an(gN, gQ.level, gN[gP].level)) {
                        if (gQ.from != gQ.to) {
                            fm = gP
                        }
                        return gO
                    } else {
                        if (gQ.from != gQ.to) {
                            fm = gO
                        }
                        return gP
                    }
                }
            }
        }
        return gP
    }

    function fz(i, gP, gN, gO) {
        if (!gO) {
            return gP + gN
        }
        do {
            gP += gN
        } while (gP > 0 && fI(i.text.charAt(gP)));
        return gP
    }

    function u(i, gT, gO, gP) {
        var gQ = a(i);
        if (!gQ) {
            return ai(i, gT, gO, gP)
        }
        var gS = aI(gQ, gT),
            gN = gQ[gS];
        var gR = fz(i, gT, gN.level % 2 ? -gO : gO, gP);
        for (;;) {
            if (gR > gN.from && gR < gN.to) {
                return gR
            }
            if (gR == gN.from || gR == gN.to) {
                if (aI(gQ, gR) == gS) {
                    return gR
                }
                gN = gQ[gS += gO];
                return (gO > 0) == gN.level % 2 ? gN.to : gN.from
            } else {
                gN = gQ[gS += gO];
                if (!gN) {
                    return null
                }
                if ((gO > 0) == gN.level % 2) {
                    gR = fz(i, gN.to, -1, gP)
                } else {
                    gR = fz(i, gN.from, 1, gP)
                }
            }
        }
    }

    function ai(i, gQ, gN, gO) {
        var gP = gQ + gN;
        if (gO) {
            while (gP > 0 && fI(i.text.charAt(gP))) {
                gP += gN
            }
        }
        return gP < 0 || gP > i.text.length ? null : gP
    }
    var bj = (function() {
        var gS = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        var gQ = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";

        function gP(gW) {
            if (gW <= 247) {
                return gS.charAt(gW)
            } else {
                if (1424 <= gW && gW <= 1524) {
                    return "R"
                } else {
                    if (1536 <= gW && gW <= 1785) {
                        return gQ.charAt(gW - 1536)
                    } else {
                        if (1774 <= gW && gW <= 2220) {
                            return "r"
                        } else {
                            if (8192 <= gW && gW <= 8203) {
                                return "w"
                            } else {
                                if (gW == 8204) {
                                    return "b"
                                } else {
                                    return "L"
                                }
                            }
                        }
                    }
                }
            }
        }
        var i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var gV = /[stwN]/,
            gO = /[LRr]/,
            gN = /[Lb1n]/,
            gR = /[1n]/;
        var gU = "L";

        function gT(gY, gX, gW) {
            this.level = gY;
            this.from = gX;
            this.to = gW
        }
        return function(hk) {
            if (!i.test(hk)) {
                return false
            }
            var hr = hk.length,
                hb = [];
            for (var hp = 0; hp < hr; ++hp) {
                hb.push(gP(hk.charCodeAt(hp)))
            }
            for (var g9 = 0, hf = gU; g9 < hr; ++g9) {
                var g0 = hb[g9];
                if (g0 == "m") {
                    hb[g9] = hf
                } else {
                    hf = g0
                }
            }
            for (var g7 = 0, gY = gU; g7 < hr; ++g7) {
                var hl = hb[g7];
                if (hl == "1" && gY == "r") {
                    hb[g7] = "n"
                } else {
                    if (gO.test(hl)) {
                        gY = hl;
                        if (hl == "r") {
                            hb[g7] = "R"
                        }
                    }
                }
            }
            for (var g6 = 1, hg = hb[0]; g6 < hr - 1; ++g6) {
                var hi = hb[g6];
                if (hi == "+" && hg == "1" && hb[g6 + 1] == "1") {
                    hb[g6] = "1"
                } else {
                    if (hi == "," && hg == hb[g6 + 1] && (hg == "1" || hg == "n")) {
                        hb[g6] = hg
                    }
                }
                hg = hi
            }
            for (var g5 = 0; g5 < hr; ++g5) {
                var hh = hb[g5];
                if (hh == ",") {
                    hb[g5] = "N"
                } else {
                    if (hh == "%") {
                        var g1 = (void 0);
                        for (g1 = g5 + 1; g1 < hr && hb[g1] == "%"; ++g1) {}
                        var hu = (g5 && hb[g5 - 1] == "!") || (g1 < hr && hb[g1] == "1") ? "1" : "N";
                        for (var ho = g5; ho < g1; ++ho) {
                            hb[ho] = hu
                        }
                        g5 = g1 - 1
                    }
                }
            }
            for (var g2 = 0, hq = gU; g2 < hr; ++g2) {
                var he = hb[g2];
                if (hq == "L" && he == "1") {
                    hb[g2] = "L"
                } else {
                    if (gO.test(he)) {
                        hq = he
                    }
                }
            }
            for (var gZ = 0; gZ < hr; ++gZ) {
                if (gV.test(hb[gZ])) {
                    var g4 = (void 0);
                    for (g4 = gZ + 1; g4 < hr && gV.test(hb[g4]); ++g4) {}
                    var hc = (gZ ? hb[gZ - 1] : gU) == "L";
                    var gX = (g4 < hr ? hb[g4] : gU) == "L";
                    var ha = hc || gX ? "L" : "R";
                    for (var ht = gZ; ht < g4; ++ht) {
                        hb[ht] = ha
                    }
                    gZ = g4 - 1
                }
            }
            var hn = [],
                hj;
            for (var gW = 0; gW < hr;) {
                if (gN.test(hb[gW])) {
                    var g3 = gW;
                    for (++gW; gW < hr && gN.test(hb[gW]); ++gW) {}
                    hn.push(new gT(0, g3, gW))
                } else {
                    var g8 = gW,
                        hd = hn.length;
                    for (++gW; gW < hr && hb[gW] != "L"; ++gW) {}
                    for (var hs = g8; hs < gW;) {
                        if (gR.test(hb[hs])) {
                            if (g8 < hs) {
                                hn.splice(hd, 0, new gT(1, g8, hs))
                            }
                            var hm = hs;
                            for (++hs; hs < gW && gR.test(hb[hs]); ++hs) {}
                            hn.splice(hd, 0, new gT(2, hm, hs));
                            g8 = hs
                        } else {
                            ++hs
                        }
                    }
                    if (g8 < gW) {
                        hn.splice(hd, 0, new gT(1, g8, gW))
                    }
                }
            }
            if (hn[0].level == 1 && (hj = hk.match(/^\s+/))) {
                hn[0].from = hj[0].length;
                hn.unshift(new gT(0, 0, hj[0].length))
            }
            if (f2(hn).level == 1 && (hj = hk.match(/\s+$/))) {
                f2(hn).to -= hj[0].length;
                hn.push(new gT(0, hr - hj[0].length, hr))
            }
            if (hn[0].level == 2) {
                hn.unshift(new gT(1, hn[0].to, hn[0].to))
            }
            if (hn[0].level != f2(hn).level) {
                hn.push(new gT(hn[0].level, hr, hr))
            }
            return hn
        }
    })();

    function a(gN) {
        var i = gN.order;
        if (i == null) {
            i = gN.order = bj(gN.text)
        }
        return i
    }
    var fp = [];
    var b1 = function(gO, i, gN) {
        if (gO.addEventListener) {
            gO.addEventListener(i, gN, false)
        } else {
            if (gO.attachEvent) {
                gO.attachEvent("on" + i, gN)
            } else {
                var gP = gO._handlers || (gO._handlers = {});
                gP[i] = (gP[i] || fp).concat(gN)
            }
        }
    };

    function ex(gN, i) {
        return gN._handlers && gN._handlers[i] || fp
    }

    function er(gQ, gO, gP) {
        if (gQ.removeEventListener) {
            gQ.removeEventListener(gO, gP, false)
        } else {
            if (gQ.detachEvent) {
                gQ.detachEvent("on" + gO, gP)
            } else {
                var gR = gQ._handlers,
                    i = gR && gR[gO];
                if (i) {
                    var gN = ds(i, gP);
                    if (gN > -1) {
                        gR[gO] = i.slice(0, gN).concat(i.slice(gN + 1))
                    }
                }
            }
        }
    }

    function aF(gR, gQ) {
        var gN = ex(gR, gQ);
        if (!gN.length) {
            return
        }
        var gO = Array.prototype.slice.call(arguments, 2);
        for (var gP = 0; gP < gN.length; ++gP) {
            gN[gP].apply(null, gO)
        }
    }

    function aS(i, gO, gN) {
        if (typeof gO == "string") {
            gO = {
                type: gO,
                preventDefault: function() {
                    this.defaultPrevented = true
                }
            }
        }
        aF(i, gN || gO.type, i, gO);
        return bP(gO) || gO.codemirrorIgnore
    }

    function V(gO) {
        var gN = gO._handlers && gO._handlers.cursorActivity;
        if (!gN) {
            return
        }
        var gQ = gO.curOp.cursorActivityHandlers || (gO.curOp.cursorActivityHandlers = []);
        for (var gP = 0; gP < gN.length; ++gP) {
            if (ds(gQ, gN[gP]) == -1) {
                gQ.push(gN[gP])
            }
        }
    }

    function fE(gN, i) {
        return ex(gN, i).length > 0
    }

    function bD(i) {
        i.prototype.on = function(gN, gO) {
            b1(this, gN, gO)
        };
        i.prototype.off = function(gN, gO) {
            er(this, gN, gO)
        }
    }

    function cM(i) {
        if (i.preventDefault) {
            i.preventDefault()
        } else {
            i.returnValue = false
        }
    }

    function dz(i) {
        if (i.stopPropagation) {
            i.stopPropagation()
        } else {
            i.cancelBubble = true
        }
    }

    function bP(i) {
        return i.defaultPrevented != null ? i.defaultPrevented : i.returnValue == false
    }

    function eE(i) {
        cM(i);
        dz(i)
    }

    function L(i) {
        return i.target || i.srcElement
    }

    function gc(gN) {
        var i = gN.which;
        if (i == null) {
            if (gN.button & 1) {
                i = 1
            } else {
                if (gN.button & 2) {
                    i = 3
                } else {
                    if (gN.button & 4) {
                        i = 2
                    }
                }
            }
        }
        if (cc && gN.ctrlKey && i == 1) {
            i = 3
        }
        return i
    }
    var e3 = function() {
        if (dT && l < 9) {
            return false
        }
        var i = gv("div");
        return "draggable" in i || "dragDrop" in i
    }();
    var ga;

    function bq(i) {
        if (ga == null) {
            var gO = gv("span", "\u200b");
            bW(i, gv("span", [gO, document.createTextNode("x")]));
            if (i.firstChild.offsetHeight != 0) {
                ga = gO.offsetWidth <= 1 && gO.offsetHeight > 2 && !(dT && l < 8)
            }
        }
        var gN = ga ? gv("span", "\u200b") : gv("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
        gN.setAttribute("cm-text", "");
        return gN
    }
    var gb;

    function bS(gP) {
        if (gb != null) {
            return gb
        }
        var i = bW(gP, document.createTextNode("A\u062eA"));
        var gO = cs(i, 0, 1).getBoundingClientRect();
        var gN = cs(i, 1, 2).getBoundingClientRect();
        ec(gP);
        if (!gO || gO.left == gO.right) {
            return false
        }
        return gb = (gN.right - gO.right < 3)
    }
    var gh = "\n\nb".split(/\n/).length != 3 ? function(gR) {
        var gS = 0,
            i = [],
            gQ = gR.length;
        while (gS <= gQ) {
            var gP = gR.indexOf("\n", gS);
            if (gP == -1) {
                gP = gR.length
            }
            var gO = gR.slice(gS, gR.charAt(gP - 1) == "\r" ? gP - 1 : gP);
            var gN = gO.indexOf("\r");
            if (gN != -1) {
                i.push(gO.slice(0, gN));
                gS += gN + 1
            } else {
                i.push(gO);
                gS = gP + 1
            }
        }
        return i
    } : function(i) {
        return i.split(/\r\n?|\n/)
    };
    var bv = window.getSelection ? function(gN) {
        try {
            return gN.selectionStart != gN.selectionEnd
        } catch (i) {
            return false
        }
    } : function(gO) {
        var i;
        try {
            i = gO.ownerDocument.selection.createRange()
        } catch (gN) {}
        if (!i || i.parentElement() != gO) {
            return false
        }
        return i.compareEndPoints("StartToEnd", i) != 0
    };
    var di = (function() {
        var i = gv("div");
        if ("oncopy" in i) {
            return true
        }
        i.setAttribute("oncopy", "return;");
        return typeof i.oncopy == "function"
    })();
    var fq = null;

    function aM(gN) {
        if (fq != null) {
            return fq
        }
        var gO = bW(gN, gv("span", "x"));
        var gP = gO.getBoundingClientRect();
        var i = cs(gO, 0, 1).getBoundingClientRect();
        return fq = Math.abs(gP.left - i.left) > 1
    }
    var dB = {};
    var aT = {};

    function eH(i, gN) {
        if (arguments.length > 2) {
            gN.dependencies = Array.prototype.slice.call(arguments, 2)
        }
        dB[i] = gN
    }

    function bp(gN, i) {
        aT[gN] = i
    }

    function gE(i) {
        if (typeof i == "string" && aT.hasOwnProperty(i)) {
            i = aT[i]
        } else {
            if (i && typeof i.name == "string" && aT.hasOwnProperty(i.name)) {
                var gN = aT[i.name];
                if (typeof gN == "string") {
                    gN = {
                        name: gN
                    }
                }
                i = cq(gN, i);
                i.name = gN.name
            } else {
                if (typeof i == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(i)) {
                    return gE("application/xml")
                } else {
                    if (typeof i == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(i)) {
                        return gE("application/json")
                    }
                }
            }
        }
        if (typeof i == "string") {
            return {
                name: i
            }
        } else {
            return i || {
                name: "null"
            }
        }
    }

    function fV(gO, gN) {
        gN = gE(gN);
        var gQ = dB[gN.name];
        if (!gQ) {
            return fV(gO, "text/plain")
        }
        var gR = gQ(gO, gN);
        if (dy.hasOwnProperty(gN.name)) {
            var gP = dy[gN.name];
            for (var gS in gP) {
                if (!gP.hasOwnProperty(gS)) {
                    continue
                }
                if (gR.hasOwnProperty(gS)) {
                    gR["_" + gS] = gR[gS]
                }
                gR[gS] = gP[gS]
            }
        }
        gR.name = gN.name;
        if (gN.helperType) {
            gR.helperType = gN.helperType
        }
        if (gN.modeProps) {
            for (var i in gN.modeProps) {
                gR[i] = gN.modeProps[i]
            }
        }
        return gR
    }
    var dy = {};

    function eT(gO, gN) {
        var i = dy.hasOwnProperty(gO) ? dy[gO] : (dy[gO] = {});
        aO(gN, i)
    }

    function b8(gP, i) {
        if (i === true) {
            return i
        }
        if (gP.copyState) {
            return gP.copyState(i)
        }
        var gO = {};
        for (var gQ in i) {
            var gN = i[gQ];
            if (gN instanceof Array) {
                gN = gN.concat([])
            }
            gO[gQ] = gN
        }
        return gO
    }

    function gA(gO, i) {
        var gN;
        while (gO.innerMode) {
            gN = gO.innerMode(i);
            if (!gN || gN.mode == gO) {
                break
            }
            i = gN.state;
            gO = gN.mode
        }
        return gN || {
            mode: gO,
            state: i
        }
    }

    function b5(gO, gN, i) {
        return gO.startState ? gO.startState(gN, i) : true
    }
    var fc = function(i, gN) {
        this.pos = this.start = 0;
        this.string = i;
        this.tabSize = gN || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0
    };
    fc.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == this.lineStart
        },
        peek: function() {
            return this.string.charAt(this.pos) || undefined
        },
        next: function() {
            if (this.pos < this.string.length) {
                return this.string.charAt(this.pos++)
            }
        },
        eat: function(i) {
            var gO = this.string.charAt(this.pos);
            var gN;
            if (typeof i == "string") {
                gN = gO == i
            } else {
                gN = gO && (i.test ? i.test(gO) : i(gO))
            }
            if (gN) {
                ++this.pos;
                return gO
            }
        },
        eatWhile: function(i) {
            var gN = this.pos;
            while (this.eat(i)) {}
            return this.pos > gN
        },
        eatSpace: function() {
            var gN = this;
            var i = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
                ++gN.pos
            }
            return this.pos > i
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(i) {
            var gN = this.string.indexOf(i, this.pos);
            if (gN > -1) {
                this.pos = gN;
                return true
            }
        },
        backUp: function(i) {
            this.pos -= i
        },
        column: function() {
            if (this.lastColumnPos < this.start) {
                this.lastColumnValue = bV(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
                this.lastColumnPos = this.start
            }
            return this.lastColumnValue - (this.lineStart ? bV(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function() {
            return bV(this.string, null, this.tabSize) - (this.lineStart ? bV(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function(gQ, gN, i) {
            if (typeof gQ == "string") {
                var gR = function(gS) {
                    return i ? gS.toLowerCase() : gS
                };
                var gP = this.string.substr(this.pos, gQ.length);
                if (gR(gP) == gR(gQ)) {
                    if (gN !== false) {
                        this.pos += gQ.length
                    }
                    return true
                }
            } else {
                var gO = this.string.slice(this.pos).match(gQ);
                if (gO && gO.index > 0) {
                    return null
                }
                if (gO && gN !== false) {
                    this.pos += gO[0].length
                }
                return gO
            }
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function(gN, i) {
            this.lineStart += gN;
            try {
                return i()
            } finally {
                this.lineStart -= gN
            }
        }
    };

    function fT(i, gO, gS, gR) {
        var gQ = [i.state.modeGen],
            gP = {};
        w(i, gO.text, i.doc.mode, gS, function(gU, gV) {
            return gQ.push(gU, gV)
        }, gP, gR);
        var gN = function(gX) {
            var gV = i.state.overlays[gX],
                gW = 1,
                gU = 0;
            w(i, gO.text, gV.mode, true, function(gY, g0) {
                var g2 = gW;
                while (gU < gY) {
                    var gZ = gQ[gW];
                    if (gZ > gY) {
                        gQ.splice(gW, 1, gY, gQ[gW + 1], gZ)
                    }
                    gW += 2;
                    gU = Math.min(gY, gZ)
                }
                if (!g0) {
                    return
                }
                if (gV.opaque) {
                    gQ.splice(g2, gW - g2, gY, "overlay " + g0);
                    gW = g2 + 2
                } else {
                    for (; g2 < gW; g2 += 2) {
                        var g1 = gQ[g2 + 1];
                        gQ[g2 + 1] = (g1 ? g1 + " " : "") + "overlay " + g0
                    }
                }
            }, gP)
        };
        for (var gT = 0; gT < i.state.overlays.length; ++gT) {
            gN(gT)
        }
        return {
            styles: gQ,
            classes: gP.bgClass || gP.textClass ? gP : null
        }
    }

    function df(gN, gO, gQ) {
        if (!gO.styles || gO.styles[0] != gN.state.modeGen) {
            var gP = dL(gN, bR(gO));
            var i = fT(gN, gO, gO.text.length > gN.options.maxHighlightLength ? b8(gN.doc.mode, gP) : gP);
            gO.stateAfter = gP;
            gO.styles = i.styles;
            if (i.classes) {
                gO.styleClasses = i.classes
            } else {
                if (gO.styleClasses) {
                    gO.styleClasses = null
                }
            }
            if (gQ === gN.doc.frontier) {
                gN.doc.frontier++
            }
        }
        return gO.styles
    }

    function dL(i, gS, gN) {
        var gQ = i.doc,
            gP = i.display;
        if (!gQ.mode.startState) {
            return true
        }
        var gR = cE(i, gS, gN),
            gO = gR > gQ.first && fy(gQ, gR - 1).stateAfter;
        if (!gO) {
            gO = b5(gQ.mode)
        } else {
            gO = b8(gQ.mode, gO)
        }
        gQ.iter(gR, gS, function(gT) {
            dG(i, gT.text, gO);
            var gU = gR == gS - 1 || gR % 5 == 0 || gR >= gP.viewFrom && gR < gP.viewTo;
            gT.stateAfter = gU ? b8(gQ.mode, gO) : null;
            ++gR
        });
        if (gN) {
            gQ.frontier = gR
        }
        return gO
    }

    function dG(i, gR, gO, gN) {
        var gQ = i.doc.mode;
        var gP = new fc(gR, i.options.tabSize);
        gP.start = gP.pos = gN || 0;
        if (gR == "") {
            fJ(gQ, gO)
        }
        while (!gP.eol()) {
            eR(gQ, gP, gO);
            gP.start = gP.pos
        }
    }

    function fJ(gO, gN) {
        if (gO.blankLine) {
            return gO.blankLine(gN)
        }
        if (!gO.innerMode) {
            return
        }
        var i = gA(gO, gN);
        if (i.mode.blankLine) {
            return i.mode.blankLine(i.state)
        }
    }

    function eR(gS, gR, gQ, gN) {
        for (var gO = 0; gO < 10; gO++) {
            if (gN) {
                gN[0] = gA(gS, gQ).mode
            }
            var gP = gS.token(gR, gQ);
            if (gR.pos > gR.start) {
                return gP
            }
        }
        throw new Error("Mode " + gS.name + " failed to advance stream.")
    }

    function cw(gV, gT, gQ, gP) {
        var i = function(gY) {
            return ({
                start: gW.start,
                end: gW.pos,
                string: gW.current(),
                type: gO || null,
                state: gY ? b8(gU.mode, gN) : gN
            })
        };
        var gU = gV.doc,
            gR = gU.mode,
            gO;
        gT = f7(gU, gT);
        var gX = fy(gU, gT.line),
            gN = dL(gV, gT.line, gQ);
        var gW = new fc(gX.text, gV.options.tabSize),
            gS;
        if (gP) {
            gS = []
        }
        while ((gP || gW.pos < gT.ch) && !gW.eol()) {
            gW.start = gW.pos;
            gO = eR(gR, gW, gN);
            if (gP) {
                gS.push(i(true))
            }
        }
        return gP ? gS : i()
    }

    function dt(gO, gN) {
        if (gO) {
            for (;;) {
                var i = gO.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!i) {
                    break
                }
                gO = gO.slice(0, i.index) + gO.slice(i.index + i[0].length);
                var gP = i[1] ? "bgClass" : "textClass";
                if (gN[gP] == null) {
                    gN[gP] = i[2]
                } else {
                    if (!(new RegExp("(?:^|s)" + i[2] + "(?:$|s)")).test(gN[gP])) {
                        gN[gP] += " " + i[2]
                    }
                }
            }
        }
        return gO
    }

    function w(gW, gY, gR, gN, gS, gP, gQ) {
        var gO = gR.flattenSpans;
        if (gO == null) {
            gO = gW.options.flattenSpans
        }
        var gU = 0,
            gT = null;
        var gX = new fc(gY, gW.options.tabSize),
            i;
        var g0 = gW.options.addModeClass && [null];
        if (gY == "") {
            dt(fJ(gR, gN), gP)
        }
        while (!gX.eol()) {
            if (gX.pos > gW.options.maxHighlightLength) {
                gO = false;
                if (gQ) {
                    dG(gW, gY, gN, gX.pos)
                }
                gX.pos = gY.length;
                i = null
            } else {
                i = dt(eR(gR, gX, gN, g0), gP)
            }
            if (g0) {
                var gZ = g0[0].name;
                if (gZ) {
                    i = "m-" + (i ? gZ + " " + i : gZ)
                }
            }
            if (!gO || gT != i) {
                while (gU < gX.start) {
                    gU = Math.min(gX.start, gU + 5000);
                    gS(gU, gT)
                }
                gT = i
            }
            gX.start = gX.pos
        }
        while (gU < gX.pos) {
            var gV = Math.min(gX.pos, gU + 5000);
            gS(gV, gT);
            gU = gV
        }
    }

    function cE(gS, i, gP) {
        var gN, gQ, gR = gS.doc;
        var gO = gP ? -1 : i - (gS.doc.mode.innerMode ? 1000 : 100);
        for (var gV = i; gV > gO; --gV) {
            if (gV <= gR.first) {
                return gR.first
            }
            var gU = fy(gR, gV - 1);
            if (gU.stateAfter && (!gP || gV <= gR.frontier)) {
                return gV
            }
            var gT = bV(gU.text, null, gS.options.tabSize);
            if (gQ == null || gN > gT) {
                gQ = gV - 1;
                gN = gT
            }
        }
        return gQ
    }

    function gy(gO, gN, i) {
        this.text = gO;
        da(this, gN);
        this.height = i ? i(this) : 1
    }
    bD(gy);
    gy.prototype.lineNo = function() {
        return bR(this)
    };

    function eA(gN, gQ, gO, i) {
        gN.text = gQ;
        if (gN.stateAfter) {
            gN.stateAfter = null
        }
        if (gN.styles) {
            gN.styles = null
        }
        if (gN.order != null) {
            gN.order = null
        }
        gB(gN);
        da(gN, gO);
        var gP = i ? i(gN) : 1;
        if (gP != gN.height) {
            gz(gN, gP)
        }
    }

    function bF(i) {
        i.parent = null;
        gB(i)
    }
    var d6 = {};
    var b7 = {};

    function ff(gO, gN) {
        if (!gO || /^\s*$/.test(gO)) {
            return null
        }
        var i = gN.addModeClass ? b7 : d6;
        return i[gO] || (i[gO] = gO.replace(/\S+/g, "cm-$&"))
    }

    function fa(gT, gS) {
        var gR = gv("span", null, null, c7 ? "padding-right: .1px" : null);
        var gQ = {
            pre: gv("pre", [gR], "CodeMirror-line"),
            content: gR,
            col: 0,
            pos: 0,
            cm: gT,
            trailingSpace: false,
            splitSpaces: (dT || c7) && gT.getOption("lineWrapping")
        };
        gR.setAttribute("role", "presentation");
        gQ.pre.setAttribute("role", "presentation");
        gS.measure = {};
        for (var gP = 0; gP <= (gS.rest ? gS.rest.length : 0); gP++) {
            var gV = gP ? gS.rest[gP - 1] : gS.line,
                gO = (void 0);
            gQ.pos = 0;
            gQ.addToken = t;
            if (bS(gT.display.measure) && (gO = a(gV))) {
                gQ.addToken = U(gQ.addToken, gO)
            }
            gQ.map = [];
            var gN = gS != gT.display.externalMeasured && bR(gV);
            br(gV, gQ, df(gT, gV, gN));
            if (gV.styleClasses) {
                if (gV.styleClasses.bgClass) {
                    gQ.bgClass = gl(gV.styleClasses.bgClass, gQ.bgClass || "")
                }
                if (gV.styleClasses.textClass) {
                    gQ.textClass = gl(gV.styleClasses.textClass, gQ.textClass || "")
                }
            }
            if (gQ.map.length == 0) {
                gQ.map.push(0, 0, gQ.content.appendChild(bq(gT.display.measure)))
            }
            if (gP == 0) {
                gS.measure.map = gQ.map;
                gS.measure.cache = {}
            } else {
                (gS.measure.maps || (gS.measure.maps = [])).push(gQ.map);
                (gS.measure.caches || (gS.measure.caches = [])).push({})
            }
        }
        if (c7) {
            var gU = gQ.content.lastChild;
            if (/\bcm-tab\b/.test(gU.className) || (gU.querySelector && gU.querySelector(".cm-tab"))) {
                gQ.content.className = "cm-tab-wrap-hack"
            }
        }
        aF(gT, "renderLine", gT, gS.line, gQ.pre);
        if (gQ.pre.className) {
            gQ.textClass = gl(gQ.pre.className, gQ.textClass || "")
        }
        return gQ
    }

    function fx(gN) {
        var i = gv("span", "\u2022", "cm-invalidchar");
        i.title = "\\u" + gN.charCodeAt(0).toString(16);
        i.setAttribute("aria-label", i.title);
        return i
    }

    function t(gX, gS, g2, gZ, gV, g5, gR) {
        if (!gS) {
            return
        }
        var g1 = gX.splitSpaces ? cL(gS, gX.trailingSpace) : gS;
        var i = gX.cm.state.specialChars,
            gN = false;
        var g0;
        if (!i.test(gS)) {
            gX.col += gS.length;
            g0 = document.createTextNode(g1);
            gX.map.push(gX.pos, gX.pos + gS.length, g0);
            if (dT && l < 9) {
                gN = true
            }
            gX.pos += gS.length
        } else {
            g0 = document.createDocumentFragment();
            var gP = 0;
            while (true) {
                i.lastIndex = gP;
                var gY = i.exec(gS);
                var g4 = gY ? gY.index - gP : gS.length - gP;
                if (g4) {
                    var gU = document.createTextNode(g1.slice(gP, gP + g4));
                    if (dT && l < 9) {
                        g0.appendChild(gv("span", [gU]))
                    } else {
                        g0.appendChild(gU)
                    }
                    gX.map.push(gX.pos, gX.pos + g4, gU);
                    gX.col += g4;
                    gX.pos += g4
                }
                if (!gY) {
                    break
                }
                gP += g4 + 1;
                var g3 = (void 0);
                if (gY[0] == "\t") {
                    var gW = gX.cm.options.tabSize,
                        gT = gW - gX.col % gW;
                    g3 = g0.appendChild(gv("span", cv(gT), "cm-tab"));
                    g3.setAttribute("role", "presentation");
                    g3.setAttribute("cm-text", "\t");
                    gX.col += gT
                } else {
                    if (gY[0] == "\r" || gY[0] == "\n") {
                        g3 = g0.appendChild(gv("span", gY[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
                        g3.setAttribute("cm-text", gY[0]);
                        gX.col += 1
                    } else {
                        g3 = gX.cm.options.specialCharPlaceholder(gY[0]);
                        g3.setAttribute("cm-text", gY[0]);
                        if (dT && l < 9) {
                            g0.appendChild(gv("span", [g3]))
                        } else {
                            g0.appendChild(g3)
                        }
                        gX.col += 1
                    }
                }
                gX.map.push(gX.pos, gX.pos + 1, g3);
                gX.pos++
            }
        }
        gX.trailingSpace = g1.charCodeAt(gS.length - 1) == 32;
        if (g2 || gZ || gV || gN || gR) {
            var gO = g2 || "";
            if (gZ) {
                gO += gZ
            }
            if (gV) {
                gO += gV
            }
            var gQ = gv("span", [g0], gO, gR);
            if (g5) {
                gQ.title = g5
            }
            return gX.content.appendChild(gQ)
        }
        gX.content.appendChild(g0)
    }

    function cL(gS, gR) {
        if (gS.length > 1 && !/  /.test(gS)) {
            return gS
        }
        var gO = gR,
            gN = "";
        for (var gP = 0; gP < gS.length; gP++) {
            var gQ = gS.charAt(gP);
            if (gQ == " " && gO && (gP == gS.length - 1 || gS.charCodeAt(gP + 1) == 32)) {
                gQ = "\u00a0"
            }
            gN += gQ;
            gO = gQ == " "
        }
        return gN
    }

    function U(gN, i) {
        return function(gV, gX, gO, gS, gY, gW, gU) {
            gO = gO ? gO + " cm-force-border" : "cm-force-border";
            var gP = gV.pos,
                gR = gP + gX.length;
            for (;;) {
                var gQ = (void 0);
                for (var gT = 0; gT < i.length; gT++) {
                    gQ = i[gT];
                    if (gQ.to > gP && gQ.from <= gP) {
                        break
                    }
                }
                if (gQ.to >= gR) {
                    return gN(gV, gX, gO, gS, gY, gW, gU)
                }
                gN(gV, gX.slice(0, gQ.to - gP), gO, gS, null, gW, gU);
                gS = null;
                gX = gX.slice(gQ.to - gP);
                gP = gQ.to
            }
        }
    }

    function ad(gN, gP, i, gO) {
        var gQ = !gO && i.widgetNode;
        if (gQ) {
            gN.map.push(gN.pos, gN.pos + gP, gQ)
        }
        if (!gO && gN.cm.display.input.needsContentAttribute) {
            if (!gQ) {
                gQ = gN.content.appendChild(document.createElement("span"))
            }
            gQ.setAttribute("cm-marker", i.id)
        }
        if (gQ) {
            gN.cm.display.input.setUneditable(gQ);
            gN.content.appendChild(gQ)
        }
        gN.pos += gP;
        gN.trailingSpace = false
    }

    function br(gY, g5, gX) {
        var gS = gY.markedSpans,
            gV = gY.text,
            g3 = 0;
        if (!gS) {
            for (var gT = 1; gT < gX.length; gT += 2) {
                g5.addToken(g5, gV.slice(g3, g3 = gX[gT]), ff(gX[gT + 1], g5.cm.options))
            }
            return
        }
        var g9 = gV.length,
            gR = 0,
            g8 = 1,
            g1 = "",
            ha, gZ;
        var he = 0,
            gN, hd, g2, hf, gP;
        for (;;) {
            if (he == gR) {
                gN = hd = g2 = hf = gZ = "";
                gP = null;
                he = Infinity;
                var gU = [],
                    gW = (void 0);
                for (var g6 = 0; g6 < gS.length; ++g6) {
                    var g7 = gS[g6],
                        g4 = g7.marker;
                    if (g4.type == "bookmark" && g7.from == gR && g4.widgetNode) {
                        gU.push(g4)
                    } else {
                        if (g7.from <= gR && (g7.to == null || g7.to > gR || g4.collapsed && g7.to == gR && g7.from == gR)) {
                            if (g7.to != null && g7.to != gR && he > g7.to) {
                                he = g7.to;
                                hd = ""
                            }
                            if (g4.className) {
                                gN += " " + g4.className
                            }
                            if (g4.css) {
                                gZ = (gZ ? gZ + ";" : "") + g4.css
                            }
                            if (g4.startStyle && g7.from == gR) {
                                g2 += " " + g4.startStyle
                            }
                            if (g4.endStyle && g7.to == he) {
                                (gW || (gW = [])).push(g4.endStyle, g7.to)
                            }
                            if (g4.title && !hf) {
                                hf = g4.title
                            }
                            if (g4.collapsed && (!gP || d1(gP.marker, g4) < 0)) {
                                gP = g7
                            }
                        } else {
                            if (g7.from > gR && he > g7.from) {
                                he = g7.from
                            }
                        }
                    }
                }
                if (gW) {
                    for (var hc = 0; hc < gW.length; hc += 2) {
                        if (gW[hc + 1] == he) {
                            hd += " " + gW[hc]
                        }
                    }
                }
                if (!gP || gP.from == gR) {
                    for (var hb = 0; hb < gU.length; ++hb) {
                        ad(g5, 0, gU[hb])
                    }
                }
                if (gP && (gP.from || 0) == gR) {
                    ad(g5, (gP.to == null ? g9 + 1 : gP.to) - gR, gP.marker, gP.from == null);
                    if (gP.to == null) {
                        return
                    }
                    if (gP.to == gR) {
                        gP = false
                    }
                }
            }
            if (gR >= g9) {
                break
            }
            var g0 = Math.min(g9, he);
            while (true) {
                if (g1) {
                    var gO = gR + g1.length;
                    if (!gP) {
                        var gQ = gO > g0 ? g1.slice(0, g0 - gR) : g1;
                        g5.addToken(g5, gQ, ha ? ha + gN : gN, g2, gR + gQ.length == he ? hd : "", hf, gZ)
                    }
                    if (gO >= g0) {
                        g1 = g1.slice(g0 - gR);
                        gR = g0;
                        break
                    }
                    gR = gO;
                    g2 = ""
                }
                g1 = gV.slice(g3, g3 = gX[g8++]);
                ha = ff(gX[g8++], g5.cm.options)
            }
        }
    }

    function by(gO, i, gN) {
        this.line = i;
        this.rest = g(i);
        this.size = this.rest ? bR(f2(this.rest)) - gN + 1 : 1;
        this.node = this.text = null;
        this.hidden = fP(gO, i)
    }

    function fe(i, gS, gR) {
        var gQ = [],
            gO;
        for (var gP = gS; gP < gR; gP = gO) {
            var gN = new by(i.doc, fy(i.doc, gP), gP);
            gO = gP + gN.size;
            gQ.push(gN)
        }
        return gQ
    }
    var bs = null;

    function eN(i) {
        if (bs) {
            bs.ops.push(i)
        } else {
            i.ownsGroup = bs = {
                ops: [i],
                delayedCallbacks: []
            }
        }
    }

    function c1(gQ) {
        var gP = gQ.delayedCallbacks,
            gO = 0;
        do {
            for (; gO < gP.length; gO++) {
                gP[gO].call(null)
            }
            for (var gN = 0; gN < gQ.ops.length; gN++) {
                var gR = gQ.ops[gN];
                if (gR.cursorActivityHandlers) {
                    while (gR.cursorActivityCalled < gR.cursorActivityHandlers.length) {
                        gR.cursorActivityHandlers[gR.cursorActivityCalled++].call(null, gR.cm)
                    }
                }
            }
        } while (gO < gP.length)
    }

    function b2(gO, gN) {
        var i = gO.ownsGroup;
        if (!i) {
            return
        }
        try {
            c1(i)
        } finally {
            bs = null;
            gN(i)
        }
    }
    var bC = null;

    function ae(gT, gR) {
        var gN = ex(gT, gR);
        if (!gN.length) {
            return
        }
        var gP = Array.prototype.slice.call(arguments, 2),
            gS;
        if (bs) {
            gS = bs.delayedCallbacks
        } else {
            if (bC) {
                gS = bC
            } else {
                gS = bC = [];
                setTimeout(aN, 0)
            }
        }
        var gO = function(gU) {
            gS.push(function() {
                return gN[gU].apply(null, gP)
            })
        };
        for (var gQ = 0; gQ < gN.length; ++gQ) {
            gO(gQ)
        }
    }

    function aN() {
        var gN = bC;
        bC = null;
        for (var gO = 0; gO < gN.length; ++gO) {
            gN[gO]()
        }
    }

    function ab(i, gO, gQ, gR) {
        for (var gN = 0; gN < gO.changes.length; gN++) {
            var gP = gO.changes[gN];
            if (gP == "text") {
                fF(i, gO)
            } else {
                if (gP == "gutter") {
                    dp(i, gO, gQ, gR)
                } else {
                    if (gP == "class") {
                        dP(gO)
                    } else {
                        if (gP == "widget") {
                            ao(i, gO, gR)
                        }
                    }
                }
            }
        }
        gO.changes = null
    }

    function f4(i) {
        if (i.node == i.text) {
            i.node = gv("div", null, null, "position: relative");
            if (i.text.parentNode) {
                i.text.parentNode.replaceChild(i.node, i.text)
            }
            i.node.appendChild(i.text);
            if (dT && l < 8) {
                i.node.style.zIndex = 2
            }
        }
        return i.node
    }

    function eJ(gN) {
        var i = gN.bgClass ? gN.bgClass + " " + (gN.line.bgClass || "") : gN.line.bgClass;
        if (i) {
            i += " CodeMirror-linebackground"
        }
        if (gN.background) {
            if (i) {
                gN.background.className = i
            } else {
                gN.background.parentNode.removeChild(gN.background);
                gN.background = null
            }
        } else {
            if (i) {
                var gO = f4(gN);
                gN.background = gO.insertBefore(gv("div", null, i), gO.firstChild)
            }
        }
    }

    function d5(i, gN) {
        var gO = i.display.externalMeasured;
        if (gO && gO.line == gN.line) {
            i.display.externalMeasured = null;
            gN.measure = gO.measure;
            return gO.built
        }
        return fa(i, gN)
    }

    function fF(i, gP) {
        var gN = gP.text.className;
        var gO = d5(i, gP);
        if (gP.text == gP.node) {
            gP.node = gO.pre
        }
        gP.text.parentNode.replaceChild(gO.pre, gP.text);
        gP.text = gO.pre;
        if (gO.bgClass != gP.bgClass || gO.textClass != gP.textClass) {
            gP.bgClass = gO.bgClass;
            gP.textClass = gO.textClass;
            dP(gP)
        } else {
            if (gN) {
                gP.text.className = gN
            }
        }
    }

    function dP(gN) {
        eJ(gN);
        if (gN.line.wrapClass) {
            f4(gN).className = gN.line.wrapClass
        } else {
            if (gN.node != gN.text) {
                gN.node.className = ""
            }
        }
        var i = gN.textClass ? gN.textClass + " " + (gN.line.textClass || "") : gN.line.textClass;
        gN.text.className = i || ""
    }

    function dp(gU, gS, gR, gT) {
        if (gS.gutter) {
            gS.node.removeChild(gS.gutter);
            gS.gutter = null
        }
        if (gS.gutterBackground) {
            gS.node.removeChild(gS.gutterBackground);
            gS.gutterBackground = null
        }
        if (gS.line.gutterClass) {
            var gN = f4(gS);
            gS.gutterBackground = gv("div", null, "CodeMirror-gutter-background " + gS.line.gutterClass, ("left: " + (gU.options.fixedGutter ? gT.fixedPos : -gT.gutterTotalWidth) + "px; width: " + (gT.gutterTotalWidth) + "px"));
            gN.insertBefore(gS.gutterBackground, gS.text)
        }
        var gP = gS.line.gutterMarkers;
        if (gU.options.lineNumbers || gP) {
            var gV = f4(gS);
            var gQ = gS.gutter = gv("div", null, "CodeMirror-gutter-wrapper", ("left: " + (gU.options.fixedGutter ? gT.fixedPos : -gT.gutterTotalWidth) + "px"));
            gU.display.input.setUneditable(gQ);
            gV.insertBefore(gQ, gS.text);
            if (gS.line.gutterClass) {
                gQ.className += " " + gS.line.gutterClass
            }
            if (gU.options.lineNumbers && (!gP || !gP["CodeMirror-linenumbers"])) {
                gS.lineNumber = gQ.appendChild(gv("div", eG(gU.options, gR), "CodeMirror-linenumber CodeMirror-gutter-elt", ("left: " + (gT.gutterLeft["CodeMirror-linenumbers"]) + "px; width: " + (gU.display.lineNumInnerWidth) + "px")))
            }
            if (gP) {
                for (var gO = 0; gO < gU.options.gutters.length; ++gO) {
                    var i = gU.options.gutters[gO],
                        gW = gP.hasOwnProperty(i) && gP[i];
                    if (gW) {
                        gQ.appendChild(gv("div", [gW], "CodeMirror-gutter-elt", ("left: " + (gT.gutterLeft[i]) + "px; width: " + (gT.gutterWidth[i]) + "px")))
                    }
                }
            }
        }
    }

    function ao(i, gN, gQ) {
        if (gN.alignable) {
            gN.alignable = null
        }
        for (var gP = gN.node.firstChild, gO = (void 0); gP; gP = gO) {
            gO = gP.nextSibling;
            if (gP.className == "CodeMirror-linewidget") {
                gN.node.removeChild(gP)
            }
        }
        fM(i, gN, gQ)
    }

    function aG(i, gO, gP, gQ) {
        var gN = d5(i, gO);
        gO.text = gO.node = gN.pre;
        if (gN.bgClass) {
            gO.bgClass = gN.bgClass
        }
        if (gN.textClass) {
            gO.textClass = gN.textClass
        }
        dP(gO);
        dp(i, gO, gP, gQ);
        fM(i, gO, gQ);
        return gO.node
    }

    function fM(gN, gP, gQ) {
        gx(gN, gP.line, gP, gQ, true);
        if (gP.rest) {
            for (var gO = 0; gO < gP.rest.length; gO++) {
                gx(gN, gP.rest[gO], gP, gQ, false)
            }
        }
    }

    function gx(gV, gW, gS, gU, gQ) {
        if (!gW.widgets) {
            return
        }
        var gN = f4(gS);
        for (var gP = 0, gT = gW.widgets; gP < gT.length; ++gP) {
            var gR = gT[gP],
                gO = gv("div", [gR.node], "CodeMirror-linewidget");
            if (!gR.handleMouseEvents) {
                gO.setAttribute("cm-ignore-events", "true")
            }
            bJ(gR, gO, gS, gU);
            gV.display.input.setUneditable(gO);
            if (gQ && gR.above) {
                gN.insertBefore(gO, gS.gutter || gS.text)
            } else {
                gN.appendChild(gO)
            }
            ae(gR, "redraw")
        }
    }

    function bJ(gP, gO, i, gQ) {
        if (gP.noHScroll) {
            (i.alignable || (i.alignable = [])).push(gO);
            var gN = gQ.wrapperWidth;
            gO.style.left = gQ.fixedPos + "px";
            if (!gP.coverGutter) {
                gN -= gQ.gutterTotalWidth;
                gO.style.paddingLeft = gQ.gutterTotalWidth + "px"
            }
            gO.style.width = gN + "px"
        }
        if (gP.coverGutter) {
            gO.style.zIndex = 5;
            gO.style.position = "relative";
            if (!gP.noHScroll) {
                gO.style.marginLeft = -gQ.gutterTotalWidth + "px"
            }
        }
    }

    function c5(gO) {
        if (gO.height != null) {
            return gO.height
        }
        var i = gO.doc.cm;
        if (!i) {
            return 0
        }
        if (!gD(document.body, gO.node)) {
            var gN = "position: relative;";
            if (gO.coverGutter) {
                gN += "margin-left: -" + i.display.gutters.offsetWidth + "px;"
            }
            if (gO.noHScroll) {
                gN += "width: " + i.display.wrapper.clientWidth + "px;"
            }
            bW(i.display.measure, gv("div", [gO.node], null, gN))
        }
        return gO.height = gO.node.parentNode.offsetHeight
    }

    function bc(gN, i) {
        for (var gO = L(i); gO != gN.wrapper; gO = gO.parentNode) {
            if (!gO || (gO.nodeType == 1 && gO.getAttribute("cm-ignore-events") == "true") || (gO.parentNode == gN.sizer && gO != gN.mover)) {
                return true
            }
        }
    }

    function fs(i) {
        return i.lineSpace.offsetTop
    }

    function bM(i) {
        return i.mover.offsetHeight - i.lineSpace.offsetHeight
    }

    function fo(gP) {
        if (gP.cachedPaddingH) {
            return gP.cachedPaddingH
        }
        var gO = bW(gP.measure, gv("pre", "x"));
        var i = window.getComputedStyle ? window.getComputedStyle(gO) : gO.currentStyle;
        var gN = {
            left: parseInt(i.paddingLeft),
            right: parseInt(i.paddingRight)
        };
        if (!isNaN(gN.left) && !isNaN(gN.right)) {
            gP.cachedPaddingH = gN
        }
        return gN
    }

    function c0(i) {
        return dS - i.display.nativeBarWidth
    }

    function dv(i) {
        return i.display.scroller.clientWidth - c0(i) - i.display.barWidth
    }

    function c2(i) {
        return i.display.scroller.clientHeight - c0(i) - i.display.barHeight
    }

    function cn(gU, gQ, gT) {
        var gP = gU.options.lineWrapping;
        var gR = gP && dv(gU);
        if (!gQ.measure.heights || gP && gQ.measure.width != gR) {
            var gS = gQ.measure.heights = [];
            if (gP) {
                gQ.measure.width = gR;
                var gW = gQ.text.firstChild.getClientRects();
                for (var gN = 0; gN < gW.length - 1; gN++) {
                    var gV = gW[gN],
                        gO = gW[gN + 1];
                    if (Math.abs(gV.bottom - gO.bottom) > 2) {
                        gS.push((gV.bottom + gO.top) / 2 - gT.top)
                    }
                }
            }
            gS.push(gT.bottom - gT.top)
        }
    }

    function cz(gP, gN, gQ) {
        if (gP.line == gN) {
            return {
                map: gP.measure.map,
                cache: gP.measure.cache
            }
        }
        for (var gO = 0; gO < gP.rest.length; gO++) {
            if (gP.rest[gO] == gN) {
                return {
                    map: gP.measure.maps[gO],
                    cache: gP.measure.caches[gO]
                }
            }
        }
        for (var gR = 0; gR < gP.rest.length; gR++) {
            if (bR(gP.rest[gR]) > gQ) {
                return {
                    map: gP.measure.maps[gR],
                    cache: gP.measure.caches[gR],
                    before: true
                }
            }
        }
    }

    function c9(i, gO) {
        gO = y(gO);
        var gQ = bR(gO);
        var gN = i.display.externalMeasured = new by(i.doc, gO, gQ);
        gN.lineN = gQ;
        var gP = gN.built = fa(i, gN);
        gN.text = gP.pre;
        bW(i.display.lineMeasure, gP.pre);
        return gN
    }

    function et(i, gN, gP, gO) {
        return C(i, a6(i, gN), gP, gO)
    }

    function fv(i, gO) {
        if (gO >= i.display.viewFrom && gO < i.display.viewTo) {
            return i.display.view[dA(i, gO)]
        }
        var gN = i.display.externalMeasured;
        if (gN && gO >= gN.lineN && gO < gN.lineN + gN.size) {
            return gN
        }
    }

    function a6(i, gO) {
        var gP = bR(gO);
        var gN = fv(i, gP);
        if (gN && !gN.text) {
            gN = null
        } else {
            if (gN && gN.changes) {
                ab(i, gN, gP, fw(i));
                i.curOp.forceUpdate = true
            }
        }
        if (!gN) {
            gN = c9(i, gO)
        }
        var gQ = cz(gN, gO, gP);
        return {
            line: gO,
            view: gN,
            rect: null,
            map: gQ.map,
            cache: gQ.cache,
            before: gQ.before,
            hasHeights: false
        }
    }

    function C(i, gS, gQ, gN, gP) {
        if (gS.before) {
            gQ = -1
        }
        var gO = gQ + (gN || ""),
            gR;
        if (gS.cache.hasOwnProperty(gO)) {
            gR = gS.cache[gO]
        } else {
            if (!gS.rect) {
                gS.rect = gS.view.text.getBoundingClientRect()
            }
            if (!gS.hasHeights) {
                cn(i, gS.view, gS.rect);
                gS.hasHeights = true
            }
            gR = k(i, gS, gQ, gN);
            if (!gR.bogus) {
                gS.cache[gO] = gR
            }
        }
        return {
            left: gR.left,
            right: gR.right,
            top: gP ? gR.rtop : gR.top,
            bottom: gP ? gR.rbottom : gR.bottom
        }
    }
    var eQ = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    function aL(gO, gN, gU) {
        var gQ, gP, gS, gV, gR, gW;
        for (var gT = 0; gT < gO.length; gT += 3) {
            gR = gO[gT];
            gW = gO[gT + 1];
            if (gN < gR) {
                gP = 0;
                gS = 1;
                gV = "left"
            } else {
                if (gN < gW) {
                    gP = gN - gR;
                    gS = gP + 1
                } else {
                    if (gT == gO.length - 3 || gN == gW && gO[gT + 3] > gN) {
                        gS = gW - gR;
                        gP = gS - 1;
                        if (gN >= gW) {
                            gV = "right"
                        }
                    }
                }
            }
            if (gP != null) {
                gQ = gO[gT + 2];
                if (gR == gW && gU == (gQ.insertLeft ? "left" : "right")) {
                    gV = gU
                }
                if (gU == "left" && gP == 0) {
                    while (gT && gO[gT - 2] == gO[gT - 3] && gO[gT - 1].insertLeft) {
                        gQ = gO[(gT -= 3) + 2];
                        gV = "left"
                    }
                }
                if (gU == "right" && gP == gW - gR) {
                    while (gT < gO.length - 3 && gO[gT + 3] == gO[gT + 4] && !gO[gT + 5].insertLeft) {
                        gQ = gO[(gT += 3) + 2];
                        gV = "right"
                    }
                }
                break
            }
        }
        return {
            node: gQ,
            start: gP,
            end: gS,
            collapse: gV,
            coverStart: gR,
            coverEnd: gW
        }
    }

    function fb(gO, gN) {
        var gQ = eQ;
        if (gN == "left") {
            for (var gP = 0; gP < gO.length; gP++) {
                if ((gQ = gO[gP]).left != gQ.right) {
                    break
                }
            }
        } else {
            for (var gR = gO.length - 1; gR >= 0; gR--) {
                if ((gQ = gO[gR]).left != gQ.right) {
                    break
                }
            }
        }
        return gQ
    }

    function k(gV, g5, gY, gS) {
        var gW = aL(g5.map, gY, gS);
        var g3 = gW.node,
            gR = gW.start,
            gQ = gW.end,
            gN = gW.collapse;
        var gO;
        if (g3.nodeType == 3) {
            for (var gT = 0; gT < 4; gT++) {
                while (gR && fI(g5.line.text.charAt(gW.coverStart + gR))) {
                    --gR
                }
                while (gW.coverStart + gQ < gW.coverEnd && fI(g5.line.text.charAt(gW.coverStart + gQ))) {
                    ++gQ
                }
                if (dT && l < 9 && gR == 0 && gQ == gW.coverEnd - gW.coverStart) {
                    gO = g3.parentNode.getBoundingClientRect()
                } else {
                    gO = fb(cs(g3, gR, gQ).getClientRects(), gS)
                }
                if (gO.left || gO.right || gR == 0) {
                    break
                }
                gQ = gR;
                gR = gR - 1;
                gN = "right"
            }
            if (dT && l < 11) {
                gO = e5(gV.display.measure, gO)
            }
        } else {
            if (gR > 0) {
                gN = gS = "right"
            }
            var gP;
            if (gV.options.lineWrapping && (gP = g3.getClientRects()).length > 1) {
                gO = gP[gS == "right" ? gP.length - 1 : 0]
            } else {
                gO = g3.getBoundingClientRect()
            }
        }
        if (dT && l < 9 && !gR && (!gO || !gO.left && !gO.right)) {
            var gU = g3.parentNode.getClientRects()[0];
            if (gU) {
                gO = {
                    left: gU.left,
                    right: gU.left + dM(gV.display),
                    top: gU.top,
                    bottom: gU.bottom
                }
            } else {
                gO = eQ
            }
        }
        var g1 = gO.top - g5.rect.top,
            gZ = gO.bottom - g5.rect.top;
        var g7 = (g1 + gZ) / 2;
        var g6 = g5.view.measure.heights;
        var g4 = 0;
        for (; g4 < g6.length - 1; g4++) {
            if (g7 < g6[g4]) {
                break
            }
        }
        var g2 = g4 ? g6[g4 - 1] : 0,
            g0 = g6[g4];
        var gX = {
            left: (gN == "right" ? gO.right : gO.left) - g5.rect.left,
            right: (gN == "left" ? gO.left : gO.right) - g5.rect.left,
            top: g2,
            bottom: g0
        };
        if (!gO.left && !gO.right) {
            gX.bogus = true
        }
        if (!gV.options.singleCursorHeightPerLine) {
            gX.rtop = g1;
            gX.rbottom = gZ
        }
        return gX
    }

    function e5(gO, gP) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !aM(gO)) {
            return gP
        }
        var gN = screen.logicalXDPI / screen.deviceXDPI;
        var i = screen.logicalYDPI / screen.deviceYDPI;
        return {
            left: gP.left * gN,
            right: gP.right * gN,
            top: gP.top * i,
            bottom: gP.bottom * i
        }
    }

    function av(gO) {
        if (gO.measure) {
            gO.measure.cache = {};
            gO.measure.heights = null;
            if (gO.rest) {
                for (var gN = 0; gN < gO.rest.length; gN++) {
                    gO.measure.caches[gN] = {}
                }
            }
        }
    }

    function aP(gN) {
        gN.display.externalMeasure = null;
        ec(gN.display.lineMeasure);
        for (var gO = 0; gO < gN.display.view.length; gO++) {
            av(gN.display.view[gO])
        }
    }

    function aj(i) {
        aP(i);
        i.display.cachedCharWidth = i.display.cachedTextHeight = i.display.cachedPaddingH = null;
        if (!i.options.lineWrapping) {
            i.display.maxLineChanged = true
        }
        i.display.lineNumChars = null
    }

    function cA() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function cy() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function e8(gU, gR, gT, gO, gQ) {
        if (!gQ && gR.widgets) {
            for (var gP = 0; gP < gR.widgets.length; ++gP) {
                if (gR.widgets[gP].above) {
                    var gW = c5(gR.widgets[gP]);
                    gT.top += gW;
                    gT.bottom += gW
                }
            }
        }
        if (gO == "line") {
            return gT
        }
        if (!gO) {
            gO = "local"
        }
        var gS = bQ(gR);
        if (gO == "local") {
            gS += fs(gU.display)
        } else {
            gS -= gU.display.viewOffset
        }
        if (gO == "page" || gO == "window") {
            var gN = gU.display.lineSpace.getBoundingClientRect();
            gS += gN.top + (gO == "window" ? 0 : cy());
            var gV = gN.left + (gO == "window" ? 0 : cA());
            gT.left += gV;
            gT.right += gV
        }
        gT.top += gS;
        gT.bottom += gS;
        return gT
    }

    function gI(gN, gQ, gO) {
        if (gO == "div") {
            return gQ
        }
        var gS = gQ.left,
            gR = gQ.top;
        if (gO == "page") {
            gS -= cA();
            gR -= cy()
        } else {
            if (gO == "local" || !gO) {
                var gP = gN.display.sizer.getBoundingClientRect();
                gS += gP.left;
                gR += gP.top
            }
        }
        var i = gN.display.lineSpace.getBoundingClientRect();
        return {
            left: gS - i.left,
            top: gR - i.top
        }
    }

    function cQ(i, gQ, gP, gO, gN) {
        if (!gO) {
            gO = fy(i.doc, gQ.line)
        }
        return e8(i, gO, et(i, gO, gQ.ch, gN), gP)
    }

    function d4(gV, gU, gO, gS, gX, gT) {
        gS = gS || fy(gV.doc, gU.line);
        if (!gX) {
            gX = a6(gV, gS)
        }

        function gQ(g0, gZ) {
            var gY = C(gV, gX, g0, gZ ? "right" : "left", gT);
            if (gZ) {
                gY.left = gY.right
            } else {
                gY.right = gY.left
            }
            return e8(gV, gS, gY, gO)
        }

        function gW(g1, gY) {
            var gZ = gR[gY],
                g0 = gZ.level % 2;
            if (g1 == dI(gZ) && gY && gZ.level < gR[gY - 1].level) {
                gZ = gR[--gY];
                g1 = gH(gZ) - (gZ.level % 2 ? 0 : 1);
                g0 = true
            } else {
                if (g1 == gH(gZ) && gY < gR.length - 1 && gZ.level < gR[gY + 1].level) {
                    gZ = gR[++gY];
                    g1 = dI(gZ) - gZ.level % 2;
                    g0 = false
                }
            }
            if (g0 && g1 == gZ.to && g1 > gZ.from) {
                return gQ(g1 - 1)
            }
            return gQ(g1, g0)
        }
        var gR = a(gS),
            i = gU.ch;
        if (!gR) {
            return gQ(i)
        }
        var gN = aI(gR, i);
        var gP = gW(i, gN);
        if (fm != null) {
            gP.other = gW(i, fm)
        }
        return gP
    }

    function dQ(i, gQ) {
        var gP = 0;
        gQ = f7(i.doc, gQ);
        if (!i.options.lineWrapping) {
            gP = dM(i.display) * gQ.ch
        }
        var gN = fy(i.doc, gQ.line);
        var gO = bQ(gN) + fs(i.display);
        return {
            left: gP,
            right: gP,
            top: gO,
            bottom: gO + gN.height
        }
    }

    function gt(i, gN, gO, gQ) {
        var gP = W(i, gN);
        gP.xRel = gQ;
        if (gO) {
            gP.outside = true
        }
        return gP
    }

    function ge(gT, gQ, gP) {
        var gS = gT.doc;
        gP += gT.display.viewOffset;
        if (gP < 0) {
            return gt(gS.first, 0, true, -1)
        }
        var gO = bL(gS, gP),
            gU = gS.first + gS.size - 1;
        if (gO > gU) {
            return gt(gS.first + gS.size - 1, fy(gS, gU).text.length, true, 1)
        }
        if (gQ < 0) {
            gQ = 0
        }
        var gN = fy(gS, gO);
        for (;;) {
            var gV = c6(gT, gN, gO, gQ, gP);
            var gR = eK(gN);
            var i = gR && gR.find(0, true);
            if (gR && (gV.ch > i.from.ch || gV.ch == i.from.ch && gV.xRel > 0)) {
                gO = bR(gN = i.to.line)
            } else {
                return gV
            }
        }
    }

    function c6(gX, gP, g0, gZ, gY) {
        var gW = gY - bQ(gP);
        var gT = false,
            g6 = 2 * gX.display.wrapper.clientWidth;
        var g3 = a6(gX, gP);

        function hb(i) {
            var he = d4(gX, W(g0, i), "line", gP, g3);
            gT = true;
            if (gW > he.bottom) {
                return he.left - g6
            } else {
                if (gW < he.top) {
                    return he.left + g6
                } else {
                    gT = false
                }
            }
            return he.left
        }
        var g2 = a(gP),
            g5 = gP.text.length;
        var g7 = cK(gP),
            gQ = cZ(gP);
        var g4 = hb(g7),
            gN = gT,
            gO = hb(gQ),
            gS = gT;
        if (gZ > gO) {
            return gt(g0, gQ, gS, 1)
        }
        for (;;) {
            if (g2 ? gQ == g7 || gQ == u(gP, g7, 1) : gQ - g7 <= 1) {
                var g1 = gZ < g4 || gZ - g4 <= gO - gZ ? g7 : gQ;
                var hc = g1 == g7 ? gN : gS;
                var ha = gZ - (g1 == g7 ? g4 : gO);
                if (gS && !g2 && !/\s/.test(gP.text.charAt(g1)) && ha > 0 && g1 < gP.text.length && g3.view.measure.heights.length > 1) {
                    var g8 = C(gX, g3, g1, "right");
                    if (gW <= g8.bottom && gW >= g8.top && Math.abs(gZ - g8.right) < ha) {
                        hc = false;
                        g1++;
                        ha = gZ - g8.right
                    }
                }
                while (fI(gP.text.charAt(g1))) {
                    ++g1
                }
                var gV = gt(g0, g1, hc, ha < -1 ? -1 : ha > 1 ? 1 : 0);
                return gV
            }
            var gU = Math.ceil(g5 / 2),
                hd = g7 + gU;
            if (g2) {
                hd = g7;
                for (var g9 = 0; g9 < gU; ++g9) {
                    hd = u(gP, hd, 1)
                }
            }
            var gR = hb(hd);
            if (gR > gZ) {
                gQ = hd;
                gO = gR;
                if (gS = gT) {
                    gO += 1000
                }
                g5 = gU
            } else {
                g7 = hd;
                g4 = gR;
                gN = gT;
                g5 -= gU
            }
        }
    }
    var aH;

    function aZ(gP) {
        if (gP.cachedTextHeight != null) {
            return gP.cachedTextHeight
        }
        if (aH == null) {
            aH = gv("pre");
            for (var gO = 0; gO < 49; ++gO) {
                aH.appendChild(document.createTextNode("x"));
                aH.appendChild(gv("br"))
            }
            aH.appendChild(document.createTextNode("x"))
        }
        bW(gP.measure, aH);
        var gN = aH.offsetHeight / 50;
        if (gN > 3) {
            gP.cachedTextHeight = gN
        }
        ec(gP.measure);
        return gN || 1
    }

    function dM(gQ) {
        if (gQ.cachedCharWidth != null) {
            return gQ.cachedCharWidth
        }
        var i = gv("span", "xxxxxxxxxx");
        var gP = gv("pre", [i]);
        bW(gQ.measure, gP);
        var gO = i.getBoundingClientRect(),
            gN = (gO.right - gO.left) / 10;
        if (gN > 2) {
            gQ.cachedCharWidth = gN
        }
        return gN || 10
    }

    function fw(gN) {
        var gS = gN.display,
            gQ = {},
            gP = {};
        var gR = gS.gutters.clientLeft;
        for (var gT = gS.gutters.firstChild, gO = 0; gT; gT = gT.nextSibling, ++gO) {
            gQ[gN.options.gutters[gO]] = gT.offsetLeft + gT.clientLeft + gR;
            gP[gN.options.gutters[gO]] = gT.clientWidth
        }
        return {
            fixedPos: d8(gS),
            gutterTotalWidth: gS.gutters.offsetWidth,
            gutterLeft: gQ,
            gutterWidth: gP,
            wrapperWidth: gS.wrapper.clientWidth
        }
    }

    function d8(i) {
        return i.scroller.getBoundingClientRect().left - i.sizer.getBoundingClientRect().left
    }

    function bf(i) {
        var gO = aZ(i.display),
            gN = i.options.lineWrapping;
        var gP = gN && Math.max(5, i.display.scroller.clientWidth / dM(i.display) - 3);
        return function(gR) {
            if (fP(i.doc, gR)) {
                return 0
            }
            var gQ = 0;
            if (gR.widgets) {
                for (var gS = 0; gS < gR.widgets.length; gS++) {
                    if (gR.widgets[gS].height) {
                        gQ += gR.widgets[gS].height
                    }
                }
            }
            if (gN) {
                return gQ + (Math.ceil(gR.text.length / gP) || 1) * gO
            } else {
                return gQ + gO
            }
        }
    }

    function Y(i) {
        var gO = i.doc,
            gN = bf(i);
        gO.iter(function(gP) {
            var gQ = gN(gP);
            if (gQ != gP.height) {
                gz(gP, gQ)
            }
        })
    }

    function ct(gV, gQ, gN, gO) {
        var gR = gV.display;
        if (!gN && L(gQ).getAttribute("cm-not-content") == "true") {
            return null
        }
        var gU, gS, i = gR.lineSpace.getBoundingClientRect();
        try {
            gU = gQ.clientX - i.left;
            gS = gQ.clientY - i.top
        } catch (gQ) {
            return null
        }
        var gT = ge(gV, gU, gS),
            gW;
        if (gO && gT.xRel == 1 && (gW = fy(gV.doc, gT.line).text).length == gT.ch) {
            var gP = bV(gW, gW.length, gV.options.tabSize) - gW.length;
            gT = W(gT.line, Math.max(0, Math.round((gU - fo(gV.display).left) / dM(gV.display)) - gP))
        }
        return gT
    }

    function dA(gN, gQ) {
        if (gQ >= gN.display.viewTo) {
            return null
        }
        gQ -= gN.display.viewFrom;
        if (gQ < 0) {
            return null
        }
        var gO = gN.display.view;
        for (var gP = 0; gP < gO.length; gP++) {
            gQ -= gO[gP].size;
            if (gQ < 0) {
                return gP
            }
        }
    }

    function bG(i) {
        i.display.input.showSelection(i.display.input.prepareSelection())
    }

    function f5(gU, gN) {
        var gT = gU.doc,
            gV = {};
        var gS = gV.cursors = document.createDocumentFragment();
        var gO = gV.selection = document.createDocumentFragment();
        for (var gQ = 0; gQ < gT.sel.ranges.length; gQ++) {
            if (gN === false && gQ == gT.sel.primIndex) {
                continue
            }
            var gR = gT.sel.ranges[gQ];
            if (gR.from().line >= gU.display.viewTo || gR.to().line < gU.display.viewFrom) {
                continue
            }
            var gP = gR.empty();
            if (gP || gU.options.showCursorWhenSelecting) {
                A(gU, gR.head, gS)
            }
            if (!gP) {
                bH(gU, gR, gO)
            }
        }
        return gV
    }

    function A(i, gP, gO) {
        var gR = d4(i, gP, "div", null, null, !i.options.singleCursorHeightPerLine);
        var gQ = gO.appendChild(gv("div", "\u00a0", "CodeMirror-cursor"));
        gQ.style.left = gR.left + "px";
        gQ.style.top = gR.top + "px";
        gQ.style.height = Math.max(0, gR.bottom - gR.top) * i.options.cursorHeight + "px";
        if (gR.other) {
            var gN = gO.appendChild(gv("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
            gN.style.display = "";
            gN.style.left = gR.other.left + "px";
            gN.style.top = gR.other.top + "px";
            gN.style.height = (gR.other.bottom - gR.other.top) * 0.85 + "px"
        }
    }

    function bH(gQ, gW, gR) {
        var gZ = gQ.display,
            g3 = gQ.doc;
        var i = document.createDocumentFragment();
        var gV = fo(gQ.display),
            gP = gV.left;
        var g0 = Math.max(gZ.sizerWidth, dv(gQ) - gZ.sizer.offsetLeft) - gV.right;

        function gX(g7, g6, g5, g4) {
            if (g6 < 0) {
                g6 = 0
            }
            g6 = Math.round(g6);
            g4 = Math.round(g4);
            i.appendChild(gv("div", null, "CodeMirror-selected", ("position: absolute; left: " + g7 + "px;\n                             top: " + g6 + "px; width: " + (g5 == null ? g0 - g7 : g5) + "px;\n                             height: " + (g4 - g6) + "px")))
        }

        function gN(g5, g7, ha) {
            var g6 = fy(g3, g5);
            var g8 = g6.text.length;
            var hb, g4;

            function g9(hd, hc) {
                return cQ(gQ, W(g5, hd), "div", g6, hc)
            }
            ef(a(g6), g7 || 0, ha == null ? g8 : ha, function(hj, hi, hc) {
                var hf = g9(hj, "left"),
                    hg, hh, he;
                if (hj == hi) {
                    hg = hf;
                    hh = he = hf.left
                } else {
                    hg = g9(hi - 1, "right");
                    if (hc == "rtl") {
                        var hd = hf;
                        hf = hg;
                        hg = hd
                    }
                    hh = hf.left;
                    he = hg.right
                }
                if (g7 == null && hj == 0) {
                    hh = gP
                }
                if (hg.top - hf.top > 3) {
                    gX(hh, hf.top, null, hf.bottom);
                    hh = gP;
                    if (hf.bottom < hg.top) {
                        gX(hh, hf.bottom, null, hg.top)
                    }
                }
                if (ha == null && hi == g8) {
                    he = g0
                }
                if (!hb || hf.top < hb.top || hf.top == hb.top && hf.left < hb.left) {
                    hb = hf
                }
                if (!g4 || hg.bottom > g4.bottom || hg.bottom == g4.bottom && hg.right > g4.right) {
                    g4 = hg
                }
                if (hh < gP + 1) {
                    hh = gP
                }
                gX(hh, hg.top, he - hh, hg.bottom)
            });
            return {
                start: hb,
                end: g4
            }
        }
        var g2 = gW.from(),
            g1 = gW.to();
        if (g2.line == g1.line) {
            gN(g2.line, g2.ch, g1.ch)
        } else {
            var gO = fy(g3, g2.line),
                gT = fy(g3, g1.line);
            var gS = y(gO) == y(gT);
            var gU = gN(g2.line, g2.ch, gS ? gO.text.length + 1 : null).end;
            var gY = gN(g1.line, gS ? 0 : null, g1.ch).start;
            if (gS) {
                if (gU.top < gY.top - 2) {
                    gX(gU.right, gU.top, null, gU.bottom);
                    gX(gP, gY.top, gY.left, gY.bottom)
                } else {
                    gX(gU.right, gU.top, gY.left - gU.right, gU.bottom)
                }
            }
            if (gU.bottom < gY.top) {
                gX(gP, gU.bottom, null, gY.top)
            }
        }
        gR.appendChild(i)
    }

    function p(i) {
        if (!i.state.focused) {
            return
        }
        var gO = i.display;
        clearInterval(gO.blinker);
        var gN = true;
        gO.cursorDiv.style.visibility = "";
        if (i.options.cursorBlinkRate > 0) {
            gO.blinker = setInterval(function() {
                return gO.cursorDiv.style.visibility = (gN = !gN) ? "" : "hidden"
            }, i.options.cursorBlinkRate)
        } else {
            if (i.options.cursorBlinkRate < 0) {
                gO.cursorDiv.style.visibility = "hidden"
            }
        }
    }

    function s(i) {
        if (!i.state.focused) {
            i.display.input.focus();
            cH(i)
        }
    }

    function ak(i) {
        i.state.delayingBlurEvent = true;
        setTimeout(function() {
            if (i.state.delayingBlurEvent) {
                i.state.delayingBlurEvent = false;
                aW(i)
            }
        }, 100)
    }

    function cH(i, gN) {
        if (i.state.delayingBlurEvent) {
            i.state.delayingBlurEvent = false
        }
        if (i.options.readOnly == "nocursor") {
            return
        }
        if (!i.state.focused) {
            aF(i, "focus", i, gN);
            i.state.focused = true;
            fW(i.display.wrapper, "CodeMirror-focused");
            if (!i.curOp && i.display.selForContextMenu != i.doc.sel) {
                i.display.input.reset();
                if (c7) {
                    setTimeout(function() {
                        return i.display.input.reset(true)
                    }, 20)
                }
            }
            i.display.input.receivedFocus()
        }
        p(i)
    }

    function aW(i, gN) {
        if (i.state.delayingBlurEvent) {
            return
        }
        if (i.state.focused) {
            aF(i, "blur", i, gN);
            i.state.focused = false;
            h(i.display.wrapper, "CodeMirror-focused")
        }
        clearInterval(i.display.blinker);
        setTimeout(function() {
            if (!i.state.focused) {
                i.display.shift = false
            }
        }, 150)
    }

    function eU(gV) {
        var gT = gV.display,
            gU = gT.view;
        if (!gT.alignWidgets && (!gT.gutters.firstChild || !gV.options.fixedGutter)) {
            return
        }
        var gR = d8(gT) - gT.scroller.scrollLeft + gV.doc.scrollLeft;
        var gN = gT.gutters.offsetWidth,
            gO = gR + "px";
        for (var gQ = 0; gQ < gU.length; gQ++) {
            if (!gU[gQ].hidden) {
                if (gV.options.fixedGutter) {
                    if (gU[gQ].gutter) {
                        gU[gQ].gutter.style.left = gO
                    }
                    if (gU[gQ].gutterBackground) {
                        gU[gQ].gutterBackground.style.left = gO
                    }
                }
                var gS = gU[gQ].alignable;
                if (gS) {
                    for (var gP = 0; gP < gS.length; gP++) {
                        gS[gP].style.left = gO
                    }
                }
            }
        }
        if (gV.options.fixedGutter) {
            gT.gutters.style.left = (gR + gN) + "px"
        }
    }

    function eg(i) {
        if (!i.options.lineNumbers) {
            return false
        }
        var gR = i.doc,
            gN = eG(i.options, gR.first + gR.size - 1),
            gQ = i.display;
        if (gN.length != gQ.lineNumChars) {
            var gS = gQ.measure.appendChild(gv("div", [gv("div", gN)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
            var gO = gS.firstChild.offsetWidth,
                gP = gS.offsetWidth - gO;
            gQ.lineGutter.style.width = "";
            gQ.lineNumInnerWidth = Math.max(gO, gQ.lineGutter.offsetWidth - gP) + 1;
            gQ.lineNumWidth = gQ.lineNumInnerWidth + gP;
            gQ.lineNumChars = gQ.lineNumInnerWidth ? gN.length : -1;
            gQ.lineGutter.style.width = gQ.lineNumWidth + "px";
            db(i);
            return true
        }
        return false
    }

    function ba(gU) {
        var gS = gU.display;
        var gO = gS.lineDiv.offsetTop;
        for (var gP = 0; gP < gS.view.length; gP++) {
            var gV = gS.view[gP],
                gW = (void 0);
            if (gV.hidden) {
                continue
            }
            if (dT && l < 8) {
                var gR = gV.node.offsetTop + gV.node.offsetHeight;
                gW = gR - gO;
                gO = gR
            } else {
                var gQ = gV.node.getBoundingClientRect();
                gW = gQ.bottom - gQ.top
            }
            var gT = gV.line.height - gW;
            if (gW < 2) {
                gW = aZ(gS)
            }
            if (gT > 0.001 || gT < -0.001) {
                gz(gV.line, gW);
                cg(gV.line);
                if (gV.rest) {
                    for (var gN = 0; gN < gV.rest.length; gN++) {
                        cg(gV.rest[gN])
                    }
                }
            }
        }
    }

    function cg(gN) {
        if (gN.widgets) {
            for (var gO = 0; gO < gN.widgets.length; ++gO) {
                gN.widgets[gO].height = gN.widgets[gO].node.parentNode.offsetHeight
            }
        }
    }

    function cb(gP, gT, gO) {
        var gQ = gO && gO.top != null ? Math.max(0, gO.top) : gP.scroller.scrollTop;
        gQ = Math.floor(gQ - fs(gP));
        var i = gO && gO.bottom != null ? gO.bottom : gQ + gP.wrapper.clientHeight;
        var gR = bL(gT, gQ),
            gS = bL(gT, i);
        if (gO && gO.ensure) {
            var gN = gO.ensure.from.line,
                gU = gO.ensure.to.line;
            if (gN < gR) {
                gR = gN;
                gS = bL(gT, bQ(fy(gT, gN)) + gP.wrapper.clientHeight)
            } else {
                if (Math.min(gU, gT.lastLine()) >= gS) {
                    gR = bL(gT, bQ(fy(gT, gU)) - gP.wrapper.clientHeight);
                    gS = gU
                }
            }
        }
        return {
            from: gR,
            to: Math.max(gS, gR + 1)
        }
    }

    function O(i, gN) {
        if (Math.abs(i.doc.scrollTop - gN) < 2) {
            return
        }
        i.doc.scrollTop = gN;
        if (!cu) {
            d3(i, {
                top: gN
            })
        }
        if (i.display.scroller.scrollTop != gN) {
            i.display.scroller.scrollTop = gN
        }
        i.display.scrollbars.setScrollTop(gN);
        if (cu) {
            d3(i)
        }
        eq(i, 100)
    }

    function bI(i, gO, gN) {
        if (gN ? gO == i.doc.scrollLeft : Math.abs(i.doc.scrollLeft - gO) < 2) {
            return
        }
        gO = Math.min(gO, i.display.scroller.scrollWidth - i.display.scroller.clientWidth);
        i.doc.scrollLeft = gO;
        eU(i);
        if (i.display.scroller.scrollLeft != gO) {
            i.display.scroller.scrollLeft = gO
        }
        i.display.scrollbars.setScrollLeft(gO)
    }
    var fG = 0;
    var cm = null;
    if (dT) {
        cm = -0.53
    } else {
        if (cu) {
            cm = 15
        } else {
            if (dl) {
                cm = -0.7
            } else {
                if (aD) {
                    cm = -1 / 3
                }
            }
        }
    }

    function cX(gO) {
        var gN = gO.wheelDeltaX,
            i = gO.wheelDeltaY;
        if (gN == null && gO.detail && gO.axis == gO.HORIZONTAL_AXIS) {
            gN = gO.detail
        }
        if (i == null && gO.detail && gO.axis == gO.VERTICAL_AXIS) {
            i = gO.detail
        } else {
            if (i == null) {
                i = gO.wheelDelta
            }
        }
        return {
            x: gN,
            y: i
        }
    }

    function aA(i) {
        var gN = cX(i);
        gN.x *= cm;
        gN.y *= cm;
        return gN
    }

    function c(gX, gR) {
        var gZ = cX(gR),
            g1 = gZ.x,
            g0 = gZ.y;
        var gT = gX.display,
            gW = gT.scroller;
        var gQ = gW.scrollWidth > gW.clientWidth;
        var gP = gW.scrollHeight > gW.clientHeight;
        if (!(g1 && gQ || g0 && gP)) {
            return
        }
        if (g0 && cc && c7) {
            outer: for (var gY = gR.target, gV = gT.view; gY != gW; gY = gY.parentNode) {
                for (var gO = 0; gO < gV.length; gO++) {
                    if (gV[gO].node == gY) {
                        gX.display.currentWheelTarget = gY;
                        break outer
                    }
                }
            }
        }
        if (g1 && !cu && !ed && cm != null) {
            if (g0 && gP) {
                O(gX, Math.max(0, Math.min(gW.scrollTop + g0 * cm, gW.scrollHeight - gW.clientHeight)))
            }
            bI(gX, Math.max(0, Math.min(gW.scrollLeft + g1 * cm, gW.scrollWidth - gW.clientWidth)));
            if (!g0 || (g0 && gP)) {
                cM(gR)
            }
            gT.wheelStartX = null;
            return
        }
        if (g0 && cm != null) {
            var gN = g0 * cm;
            var gU = gX.doc.scrollTop,
                gS = gU + gT.wrapper.clientHeight;
            if (gN < 0) {
                gU = Math.max(0, gU + gN - 50)
            } else {
                gS = Math.min(gX.doc.height, gS + gN + 50)
            }
            d3(gX, {
                top: gU,
                bottom: gS
            })
        }
        if (fG < 20) {
            if (gT.wheelStartX == null) {
                gT.wheelStartX = gW.scrollLeft;
                gT.wheelStartY = gW.scrollTop;
                gT.wheelDX = g1;
                gT.wheelDY = g0;
                setTimeout(function() {
                    if (gT.wheelStartX == null) {
                        return
                    }
                    var i = gW.scrollLeft - gT.wheelStartX;
                    var g3 = gW.scrollTop - gT.wheelStartY;
                    var g2 = (g3 && gT.wheelDY && g3 / gT.wheelDY) || (i && gT.wheelDX && i / gT.wheelDX);
                    gT.wheelStartX = gT.wheelStartY = null;
                    if (!g2) {
                        return
                    }
                    cm = (cm * fG + g2) / (fG + 1);
                    ++fG
                }, 200)
            } else {
                gT.wheelDX += g1;
                gT.wheelDY += g0
            }
        }
    }

    function dJ(i) {
        var gP = i.display,
            gO = gP.gutters.offsetWidth;
        var gN = Math.round(i.doc.height + bM(i.display));
        return {
            clientHeight: gP.scroller.clientHeight,
            viewHeight: gP.wrapper.clientHeight,
            scrollWidth: gP.scroller.scrollWidth,
            clientWidth: gP.scroller.clientWidth,
            viewWidth: gP.wrapper.clientWidth,
            barLeft: i.options.fixedGutter ? gO : 0,
            docHeight: gN,
            scrollHeight: gN + c0(i) + gP.barHeight,
            nativeBarWidth: gP.nativeBarWidth,
            gutterWidth: gO
        }
    }
    var du = function(gO, gN, i) {
        this.cm = i;
        var gP = this.vert = gv("div", [gv("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
        var gQ = this.horiz = gv("div", [gv("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        gO(gP);
        gO(gQ);
        b1(gP, "scroll", function() {
            if (gP.clientHeight) {
                gN(gP.scrollTop, "vertical")
            }
        });
        b1(gQ, "scroll", function() {
            if (gQ.clientWidth) {
                gN(gQ.scrollLeft, "horizontal")
            }
        });
        this.checkedZeroWidth = false;
        if (dT && l < 8) {
            this.horiz.style.minHeight = this.vert.style.minWidth = "18px"
        }
    };
    du.prototype.update = function(gP) {
        var gQ = gP.scrollWidth > gP.clientWidth + 1;
        var gO = gP.scrollHeight > gP.clientHeight + 1;
        var gR = gP.nativeBarWidth;
        if (gO) {
            this.vert.style.display = "block";
            this.vert.style.bottom = gQ ? gR + "px" : "0";
            var gN = gP.viewHeight - (gQ ? gR : 0);
            this.vert.firstChild.style.height = Math.max(0, gP.scrollHeight - gP.clientHeight + gN) + "px"
        } else {
            this.vert.style.display = "";
            this.vert.firstChild.style.height = "0"
        }
        if (gQ) {
            this.horiz.style.display = "block";
            this.horiz.style.right = gO ? gR + "px" : "0";
            this.horiz.style.left = gP.barLeft + "px";
            var i = gP.viewWidth - gP.barLeft - (gO ? gR : 0);
            this.horiz.firstChild.style.width = (gP.scrollWidth - gP.clientWidth + i) + "px"
        } else {
            this.horiz.style.display = "";
            this.horiz.firstChild.style.width = "0"
        }
        if (!this.checkedZeroWidth && gP.clientHeight > 0) {
            if (gR == 0) {
                this.zeroWidthHack()
            }
            this.checkedZeroWidth = true
        }
        return {
            right: gO ? gR : 0,
            bottom: gQ ? gR : 0
        }
    };
    du.prototype.setScrollLeft = function(i) {
        if (this.horiz.scrollLeft != i) {
            this.horiz.scrollLeft = i
        }
        if (this.disableHoriz) {
            this.enableZeroWidthBar(this.horiz, this.disableHoriz)
        }
    };
    du.prototype.setScrollTop = function(i) {
        if (this.vert.scrollTop != i) {
            this.vert.scrollTop = i
        }
        if (this.disableVert) {
            this.enableZeroWidthBar(this.vert, this.disableVert)
        }
    };
    du.prototype.zeroWidthHack = function() {
        var i = cc && !de ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = i;
        this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
        this.disableHoriz = new gM;
        this.disableVert = new gM
    };
    du.prototype.enableZeroWidthBar = function(gN, i) {
        gN.style.pointerEvents = "auto";

        function gO() {
            var gQ = gN.getBoundingClientRect();
            var gP = document.elementFromPoint(gQ.left + 1, gQ.bottom - 1);
            if (gP != gN) {
                gN.style.pointerEvents = "none"
            } else {
                i.set(1000, gO)
            }
        }
        i.set(1000, gO)
    };
    du.prototype.clear = function() {
        var i = this.horiz.parentNode;
        i.removeChild(this.horiz);
        i.removeChild(this.vert)
    };
    var fn = function() {};
    fn.prototype.update = function() {
        return {
            bottom: 0,
            right: 0
        }
    };
    fn.prototype.setScrollLeft = function() {};
    fn.prototype.setScrollTop = function() {};
    fn.prototype.clear = function() {};

    function fh(gP, gR) {
        if (!gR) {
            gR = dJ(gP)
        }
        var gO = gP.display.barWidth,
            gN = gP.display.barHeight;
        aV(gP, gR);
        for (var gQ = 0; gQ < 4 && gO != gP.display.barWidth || gN != gP.display.barHeight; gQ++) {
            if (gO != gP.display.barWidth && gP.options.lineWrapping) {
                ba(gP)
            }
            aV(gP, dJ(gP));
            gO = gP.display.barWidth;
            gN = gP.display.barHeight
        }
    }

    function aV(i, gN) {
        var gP = i.display;
        var gO = gP.scrollbars.update(gN);
        gP.sizer.style.paddingRight = (gP.barWidth = gO.right) + "px";
        gP.sizer.style.paddingBottom = (gP.barHeight = gO.bottom) + "px";
        gP.heightForcer.style.borderBottom = gO.bottom + "px solid transparent";
        if (gO.right && gO.bottom) {
            gP.scrollbarFiller.style.display = "block";
            gP.scrollbarFiller.style.height = gO.bottom + "px";
            gP.scrollbarFiller.style.width = gO.right + "px"
        } else {
            gP.scrollbarFiller.style.display = ""
        }
        if (gO.bottom && i.options.coverGutterNextToScrollbar && i.options.fixedGutter) {
            gP.gutterFiller.style.display = "block";
            gP.gutterFiller.style.height = gO.bottom + "px";
            gP.gutterFiller.style.width = gN.gutterWidth + "px"
        } else {
            gP.gutterFiller.style.display = ""
        }
    }
    var bo = {
        "native": du,
        "null": fn
    };

    function aE(i) {
        if (i.display.scrollbars) {
            i.display.scrollbars.clear();
            if (i.display.scrollbars.addClass) {
                h(i.display.wrapper, i.display.scrollbars.addClass)
            }
        }
        i.display.scrollbars = new bo[i.options.scrollbarStyle](function(gN) {
            i.display.wrapper.insertBefore(gN, i.display.scrollbarFiller);
            b1(gN, "mousedown", function() {
                if (i.state.focused) {
                    setTimeout(function() {
                        return i.display.input.focus()
                    }, 0)
                }
            });
            gN.setAttribute("cm-not-content", "true")
        }, function(gO, gN) {
            if (gN == "horizontal") {
                bI(i, gO)
            } else {
                O(i, gO)
            }
        }, i);
        if (i.display.scrollbars.addClass) {
            fW(i.display.wrapper, i.display.scrollbars.addClass)
        }
    }

    function eh(gN, gQ) {
        if (aS(gN, "scrollCursorIntoView")) {
            return
        }
        var gR = gN.display,
            gO = gR.sizer.getBoundingClientRect(),
            i = null;
        if (gQ.top + gO.top < 0) {
            i = true
        } else {
            if (gQ.bottom + gO.top > (window.innerHeight || document.documentElement.clientHeight)) {
                i = false
            }
        }
        if (i != null && !fN) {
            var gP = gv("div", "\u200b", null, ("position: absolute;\n                         top: " + (gQ.top - gR.viewOffset - fs(gN.display)) + "px;\n                         height: " + (gQ.bottom - gQ.top + c0(gN) + gR.barHeight) + "px;\n                         left: " + (gQ.left) + "px; width: 2px;"));
            gN.display.lineSpace.appendChild(gP);
            gP.scrollIntoView(i);
            gN.display.lineSpace.removeChild(gP)
        }
    }

    function D(gW, gU, gQ, gP) {
        if (gP == null) {
            gP = 0
        }
        var gV;
        for (var gR = 0; gR < 5; gR++) {
            var gS = false;
            gV = d4(gW, gU);
            var i = !gQ || gQ == gU ? gV : d4(gW, gQ);
            var gO = H(gW, Math.min(gV.left, i.left), Math.min(gV.top, i.top) - gP, Math.max(gV.left, i.left), Math.max(gV.bottom, i.bottom) + gP);
            var gT = gW.doc.scrollTop,
                gN = gW.doc.scrollLeft;
            if (gO.scrollTop != null) {
                O(gW, gO.scrollTop);
                if (Math.abs(gW.doc.scrollTop - gT) > 1) {
                    gS = true
                }
            }
            if (gO.scrollLeft != null) {
                bI(gW, gO.scrollLeft);
                if (Math.abs(gW.doc.scrollLeft - gN) > 1) {
                    gS = true
                }
            }
            if (!gS) {
                break
            }
        }
        return gV
    }

    function E(i, gO, gQ, gN, gP) {
        var gR = H(i, gO, gQ, gN, gP);
        if (gR.scrollTop != null) {
            O(i, gR.scrollTop)
        }
        if (gR.scrollLeft != null) {
            bI(i, gR.scrollLeft)
        }
    }

    function H(gY, gP, gX, gN, gW) {
        var gU = gY.display,
            gS = aZ(gY.display);
        if (gX < 0) {
            gX = 0
        }
        var gQ = gY.curOp && gY.curOp.scrollTop != null ? gY.curOp.scrollTop : gU.scroller.scrollTop;
        var g0 = c2(gY),
            g2 = {};
        if (gW - gX > g0) {
            gW = gX + g0
        }
        var gO = gY.doc.height + bM(gU);
        var i = gX < gS,
            gT = gW > gO - gS;
        if (gX < gQ) {
            g2.scrollTop = i ? 0 : gX
        } else {
            if (gW > gQ + g0) {
                var gV = Math.min(gX, (gT ? gO : gW) - g0);
                if (gV != gQ) {
                    g2.scrollTop = gV
                }
            }
        }
        var g1 = gY.curOp && gY.curOp.scrollLeft != null ? gY.curOp.scrollLeft : gU.scroller.scrollLeft;
        var gZ = dv(gY) - (gY.options.fixedGutter ? gU.gutters.offsetWidth : 0);
        var gR = gN - gP > gZ;
        if (gR) {
            gN = gP + gZ
        }
        if (gP < 10) {
            g2.scrollLeft = 0
        } else {
            if (gP < g1) {
                g2.scrollLeft = Math.max(0, gP - (gR ? 0 : 10))
            } else {
                if (gN > gZ + g1 - 3) {
                    g2.scrollLeft = gN + (gR ? 0 : 10) - gZ
                }
            }
        }
        return g2
    }

    function cS(i, gO, gN) {
        if (gO != null || gN != null) {
            fY(i)
        }
        if (gO != null) {
            i.curOp.scrollLeft = (i.curOp.scrollLeft == null ? i.doc.scrollLeft : i.curOp.scrollLeft) + gO
        }
        if (gN != null) {
            i.curOp.scrollTop = (i.curOp.scrollTop == null ? i.doc.scrollTop : i.curOp.scrollTop) + gN
        }
    }

    function f1(i) {
        fY(i);
        var gN = i.getCursor(),
            gP = gN,
            gO = gN;
        if (!i.options.lineWrapping) {
            gP = gN.ch ? W(gN.line, gN.ch - 1) : gN;
            gO = W(gN.line, gN.ch + 1)
        }
        i.curOp.scrollToPos = {
            from: gP,
            to: gO,
            margin: i.options.cursorScrollMargin,
            isCursor: true
        }
    }

    function fY(i) {
        var gO = i.curOp.scrollToPos;
        if (gO) {
            i.curOp.scrollToPos = null;
            var gQ = dQ(i, gO.from),
                gP = dQ(i, gO.to);
            var gN = H(i, Math.min(gQ.left, gP.left), Math.min(gQ.top, gP.top) - gO.margin, Math.max(gQ.right, gP.right), Math.max(gQ.bottom, gP.bottom) + gO.margin);
            i.scrollTo(gN.scrollLeft, gN.scrollTop);
        }
    }
    var el = 0;

    function cP(i) {
        i.curOp = {
            cm: i,
            viewChanged: false,
            startHeight: i.doc.height,
            forceUpdate: false,
            updateInput: null,
            typing: false,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: false,
            updateMaxLine: false,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: false,
            id: ++el
        };
        eN(i.curOp)
    }

    function am(i) {
        var gN = i.curOp;
        b2(gN, function(gP) {
            for (var gO = 0; gO < gP.ops.length; gO++) {
                gP.ops[gO].cm.curOp = null
            }
            cR(gP)
        })
    }

    function cR(gS) {
        var gO = gS.ops;
        for (var gN = 0; gN < gO.length; gN++) {
            ca(gO[gN])
        }
        for (var gT = 0; gT < gO.length; gT++) {
            aq(gO[gT])
        }
        for (var gR = 0; gR < gO.length; gR++) {
            b6(gO[gR])
        }
        for (var gQ = 0; gQ < gO.length; gQ++) {
            ap(gO[gQ])
        }
        for (var gP = 0; gP < gO.length; gP++) {
            fj(gO[gP])
        }
    }

    function ca(gO) {
        var i = gO.cm,
            gN = i.display;
        J(i);
        if (gO.updateMaxLine) {
            f(i)
        }
        gO.mustUpdate = gO.viewChanged || gO.forceUpdate || gO.scrollTop != null || gO.scrollToPos && (gO.scrollToPos.from.line < gN.viewFrom || gO.scrollToPos.to.line >= gN.viewTo) || gN.maxLineChanged && i.options.lineWrapping;
        gO.update = gO.mustUpdate && new aK(i, gO.mustUpdate && {
            top: gO.scrollTop,
            ensure: gO.scrollToPos
        }, gO.forceUpdate)
    }

    function aq(i) {
        i.updatedDisplay = i.mustUpdate && B(i.cm, i.update)
    }

    function b6(gO) {
        var i = gO.cm,
            gN = i.display;
        if (gO.updatedDisplay) {
            ba(i)
        }
        gO.barMeasure = dJ(i);
        if (gN.maxLineChanged && !i.options.lineWrapping) {
            gO.adjustWidthTo = et(i, gN.maxLine, gN.maxLine.text.length).left + 3;
            i.display.sizerWidth = gO.adjustWidthTo;
            gO.barMeasure.scrollWidth = Math.max(gN.scroller.clientWidth, gN.sizer.offsetLeft + gO.adjustWidthTo + c0(i) + i.display.barWidth);
            gO.maxScrollLeft = Math.max(0, gN.sizer.offsetLeft + gO.adjustWidthTo - dv(i))
        }
        if (gO.updatedDisplay || gO.selectionChanged) {
            gO.preparedSelection = gN.input.prepareSelection(gO.focus)
        }
    }

    function ap(gO) {
        var i = gO.cm;
        if (gO.adjustWidthTo != null) {
            i.display.sizer.style.minWidth = gO.adjustWidthTo + "px";
            if (gO.maxScrollLeft < i.doc.scrollLeft) {
                bI(i, Math.min(i.display.scroller.scrollLeft, gO.maxScrollLeft), true)
            }
            i.display.maxLineChanged = false
        }
        var gN = gO.focus && gO.focus == dX() && (!document.hasFocus || document.hasFocus());
        if (gO.preparedSelection) {
            i.display.input.showSelection(gO.preparedSelection, gN)
        }
        if (gO.updatedDisplay || gO.startHeight != i.doc.height) {
            fh(i, gO.barMeasure)
        }
        if (gO.updatedDisplay) {
            dH(i, gO.barMeasure)
        }
        if (gO.selectionChanged) {
            p(i)
        }
        if (i.state.focused && gO.updateInput) {
            i.display.input.reset(gO.typing)
        }
        if (gN) {
            s(gO.cm)
        }
    }

    function fj(gQ) {
        var gV = gQ.cm,
            gS = gV.display,
            gU = gV.doc;
        if (gQ.updatedDisplay) {
            cp(gV, gQ.update)
        }
        if (gS.wheelStartX != null && (gQ.scrollTop != null || gQ.scrollLeft != null || gQ.scrollToPos)) {
            gS.wheelStartX = gS.wheelStartY = null
        }
        if (gQ.scrollTop != null && (gS.scroller.scrollTop != gQ.scrollTop || gQ.forceScroll)) {
            gU.scrollTop = Math.max(0, Math.min(gS.scroller.scrollHeight - gS.scroller.clientHeight, gQ.scrollTop));
            gS.scrollbars.setScrollTop(gU.scrollTop);
            gS.scroller.scrollTop = gU.scrollTop
        }
        if (gQ.scrollLeft != null && (gS.scroller.scrollLeft != gQ.scrollLeft || gQ.forceScroll)) {
            gU.scrollLeft = Math.max(0, Math.min(gS.scroller.scrollWidth - gS.scroller.clientWidth, gQ.scrollLeft));
            gS.scrollbars.setScrollLeft(gU.scrollLeft);
            gS.scroller.scrollLeft = gU.scrollLeft;
            eU(gV)
        }
        if (gQ.scrollToPos) {
            var gT = D(gV, f7(gU, gQ.scrollToPos.from), f7(gU, gQ.scrollToPos.to), gQ.scrollToPos.margin);
            if (gQ.scrollToPos.isCursor && gV.state.focused) {
                eh(gV, gT)
            }
        }
        var gR = gQ.maybeHiddenMarkers,
            gN = gQ.maybeUnhiddenMarkers;
        if (gR) {
            for (var gP = 0; gP < gR.length; ++gP) {
                if (!gR[gP].lines.length) {
                    aF(gR[gP], "hide")
                }
            }
        }
        if (gN) {
            for (var gO = 0; gO < gN.length; ++gO) {
                if (gN[gO].lines.length) {
                    aF(gN[gO], "unhide")
                }
            }
        }
        if (gS.wrapper.offsetHeight) {
            gU.scrollTop = gV.display.scroller.scrollTop
        }
        if (gQ.changeObjs) {
            aF(gV, "changes", gV, gQ.changeObjs)
        }
        if (gQ.update) {
            gQ.update.finish()
        }
    }

    function cT(i, gN) {
        if (i.curOp) {
            return gN()
        }
        cP(i);
        try {
            return gN()
        } finally {
            am(i)
        }
    }

    function c8(i, gN) {
        return function() {
            if (i.curOp) {
                return gN.apply(i, arguments)
            }
            cP(i);
            try {
                return gN.apply(i, arguments)
            } finally {
                am(i)
            }
        }
    }

    function dh(i) {
        return function() {
            if (this.curOp) {
                return i.apply(this, arguments)
            }
            cP(this);
            try {
                return i.apply(this, arguments)
            } finally {
                am(this)
            }
        }
    }

    function cJ(i) {
        return function() {
            var gN = this.cm;
            if (!gN || gN.curOp) {
                return i.apply(this, arguments)
            }
            cP(gN);
            try {
                return i.apply(this, arguments)
            } finally {
                am(gN)
            }
        }
    }

    function ah(gU, gS, gT, gV) {
        if (gS == null) {
            gS = gU.doc.first
        }
        if (gT == null) {
            gT = gU.doc.first + gU.doc.size
        }
        if (!gV) {
            gV = 0
        }
        var gP = gU.display;
        if (gV && gT < gP.viewTo && (gP.updateLineNumbers == null || gP.updateLineNumbers > gS)) {
            gP.updateLineNumbers = gS
        }
        gU.curOp.viewChanged = true;
        if (gS >= gP.viewTo) {
            if (a8 && aX(gU.doc, gS) < gP.viewTo) {
                eL(gU)
            }
        } else {
            if (gT <= gP.viewFrom) {
                if (a8 && ee(gU.doc, gT + gV) > gP.viewFrom) {
                    eL(gU)
                } else {
                    gP.viewFrom += gV;
                    gP.viewTo += gV
                }
            } else {
                if (gS <= gP.viewFrom && gT >= gP.viewTo) {
                    eL(gU)
                } else {
                    if (gS <= gP.viewFrom) {
                        var gR = dn(gU, gT, gT + gV, 1);
                        if (gR) {
                            gP.view = gP.view.slice(gR.index);
                            gP.viewFrom = gR.lineN;
                            gP.viewTo += gV
                        } else {
                            eL(gU)
                        }
                    } else {
                        if (gT >= gP.viewTo) {
                            var gN = dn(gU, gS, gS, -1);
                            if (gN) {
                                gP.view = gP.view.slice(0, gN.index);
                                gP.viewTo = gN.lineN
                            } else {
                                eL(gU)
                            }
                        } else {
                            var gQ = dn(gU, gS, gS, -1);
                            var gO = dn(gU, gT, gT + gV, 1);
                            if (gQ && gO) {
                                gP.view = gP.view.slice(0, gQ.index).concat(fe(gU, gQ.lineN, gO.lineN)).concat(gP.view.slice(gO.index));
                                gP.viewTo += gV
                            } else {
                                eL(gU)
                            }
                        }
                    }
                }
            }
        }
        var i = gP.externalMeasured;
        if (i) {
            if (gT < i.lineN) {
                i.lineN += gV
            } else {
                if (gS < i.lineN + i.size) {
                    gP.externalMeasured = null
                }
            }
        }
    }

    function R(gN, gO, gR) {
        gN.curOp.viewChanged = true;
        var gS = gN.display,
            gQ = gN.display.externalMeasured;
        if (gQ && gO >= gQ.lineN && gO < gQ.lineN + gQ.size) {
            gS.externalMeasured = null
        }
        if (gO < gS.viewFrom || gO >= gS.viewTo) {
            return
        }
        var gP = gS.view[dA(gN, gO)];
        if (gP.node == null) {
            return
        }
        var i = gP.changes || (gP.changes = []);
        if (ds(i, gR) == -1) {
            i.push(gR)
        }
    }

    function eL(i) {
        i.display.viewFrom = i.display.viewTo = i.doc.first;
        i.display.view = [];
        i.display.viewOffset = 0
    }

    function dn(gV, gP, gR, gO) {
        var gS = dA(gV, gP),
            gU, gT = gV.display.view;
        if (!a8 || gR == gV.doc.first + gV.doc.size) {
            return {
                index: gS,
                lineN: gR
            }
        }
        var gN = gV.display.viewFrom;
        for (var gQ = 0; gQ < gS; gQ++) {
            gN += gT[gQ].size
        }
        if (gN != gP) {
            if (gO > 0) {
                if (gS == gT.length - 1) {
                    return null
                }
                gU = (gN + gT[gS].size) - gP;
                gS++
            } else {
                gU = gN - gP
            }
            gP += gU;
            gR += gU
        }
        while (aX(gV.doc, gR) != gR) {
            if (gS == (gO < 0 ? 0 : gT.length - 1)) {
                return null
            }
            gR += gO * gT[gS - (gO < 0 ? 1 : 0)].size;
            gS += gO
        }
        return {
            index: gS,
            lineN: gR
        }
    }

    function cY(i, gQ, gP) {
        var gO = i.display,
            gN = gO.view;
        if (gN.length == 0 || gQ >= gO.viewTo || gP <= gO.viewFrom) {
            gO.view = fe(i, gQ, gP);
            gO.viewFrom = gQ
        } else {
            if (gO.viewFrom > gQ) {
                gO.view = fe(i, gQ, gO.viewFrom).concat(gO.view)
            } else {
                if (gO.viewFrom < gQ) {
                    gO.view = gO.view.slice(dA(i, gQ))
                }
            }
            gO.viewFrom = gQ;
            if (gO.viewTo < gP) {
                gO.view = gO.view.concat(fe(i, gO.viewTo, gP))
            } else {
                if (gO.viewTo > gP) {
                    gO.view = gO.view.slice(0, dA(i, gP))
                }
            }
        }
        gO.viewTo = gP
    }

    function dk(gN) {
        var gO = gN.display.view,
            gR = 0;
        for (var gQ = 0; gQ < gO.length; gQ++) {
            var gP = gO[gQ];
            if (!gP.hidden && (!gP.node || gP.changes)) {
                ++gR
            }
        }
        return gR
    }

    function eq(i, gN) {
        if (i.doc.mode.startState && i.doc.frontier < i.display.viewTo) {
            i.state.highlight.set(gN, cB(cW, i))
        }
    }

    function cW(i) {
        var gQ = i.doc;
        if (gQ.frontier < gQ.first) {
            gQ.frontier = gQ.first
        }
        if (gQ.frontier >= i.display.viewTo) {
            return
        }
        var gO = +new Date + i.options.workTime;
        var gP = b8(gQ.mode, dL(i, gQ.frontier));
        var gN = [];
        gQ.iter(gQ.frontier, Math.min(gQ.first + gQ.size, i.display.viewTo + 500), function(gR) {
            if (gQ.frontier >= i.display.viewFrom) {
                var gU = gR.styles,
                    gY = gR.text.length > i.options.maxHighlightLength;
                var gW = fT(i, gR, gY ? b8(gQ.mode, gP) : gP, true);
                gR.styles = gW.styles;
                var gT = gR.styleClasses,
                    gV = gW.classes;
                if (gV) {
                    gR.styleClasses = gV
                } else {
                    if (gT) {
                        gR.styleClasses = null
                    }
                }
                var gX = !gU || gU.length != gR.styles.length || gT != gV && (!gT || !gV || gT.bgClass != gV.bgClass || gT.textClass != gV.textClass);
                for (var gS = 0; !gX && gS < gU.length; ++gS) {
                    gX = gU[gS] != gR.styles[gS]
                }
                if (gX) {
                    gN.push(gQ.frontier)
                }
                gR.stateAfter = gY ? gP : b8(gQ.mode, gP)
            } else {
                if (gR.text.length <= i.options.maxHighlightLength) {
                    dG(i, gR.text, gP)
                }
                gR.stateAfter = gQ.frontier % 5 == 0 ? b8(gQ.mode, gP) : null
            }++gQ.frontier;
            if (+new Date > gO) {
                eq(i, i.options.workDelay);
                return true
            }
        });
        if (gN.length) {
            cT(i, function() {
                for (var gR = 0; gR < gN.length; gR++) {
                    R(i, gN[gR], "text")
                }
            })
        }
    }
    var aK = function(gN, i, gO) {
        var gP = gN.display;
        this.viewport = i;
        this.visible = cb(gP, gN.doc, i);
        this.editorIsHidden = !gP.wrapper.offsetWidth;
        this.wrapperHeight = gP.wrapper.clientHeight;
        this.wrapperWidth = gP.wrapper.clientWidth;
        this.oldDisplayWidth = dv(gN);
        this.force = gO;
        this.dims = fw(gN);
        this.events = []
    };
    aK.prototype.signal = function(gN, i) {
        if (fE(gN, i)) {
            this.events.push(arguments)
        }
    };
    aK.prototype.finish = function() {
        var gO = this;
        for (var gN = 0; gN < this.events.length; gN++) {
            aF.apply(null, gO.events[gN])
        }
    };

    function J(i) {
        var gN = i.display;
        if (!gN.scrollbarsClipped && gN.scroller.offsetWidth) {
            gN.nativeBarWidth = gN.scroller.offsetWidth - gN.scroller.clientWidth;
            gN.heightForcer.style.height = c0(i) + "px";
            gN.sizer.style.marginBottom = -gN.nativeBarWidth + "px";
            gN.sizer.style.borderRightWidth = c0(i) + "px";
            gN.scrollbarsClipped = true
        }
    }

    function B(gV, gP) {
        var gQ = gV.display,
            gU = gV.doc;
        if (gP.editorIsHidden) {
            eL(gV);
            return false
        }
        if (!gP.force && gP.visible.from >= gQ.viewFrom && gP.visible.to <= gQ.viewTo && (gQ.updateLineNumbers == null || gQ.updateLineNumbers >= gQ.viewTo) && gQ.renderedView == gQ.view && dk(gV) == 0) {
            return false
        }
        if (eg(gV)) {
            eL(gV);
            gP.dims = fw(gV)
        }
        var gO = gU.first + gU.size;
        var gS = Math.max(gP.visible.from - gV.options.viewportMargin, gU.first);
        var gT = Math.min(gO, gP.visible.to + gV.options.viewportMargin);
        if (gQ.viewFrom < gS && gS - gQ.viewFrom < 20) {
            gS = Math.max(gU.first, gQ.viewFrom)
        }
        if (gQ.viewTo > gT && gQ.viewTo - gT < 20) {
            gT = Math.min(gO, gQ.viewTo)
        }
        if (a8) {
            gS = aX(gV.doc, gS);
            gT = ee(gV.doc, gT)
        }
        var gN = gS != gQ.viewFrom || gT != gQ.viewTo || gQ.lastWrapHeight != gP.wrapperHeight || gQ.lastWrapWidth != gP.wrapperWidth;
        cY(gV, gS, gT);
        gQ.viewOffset = bQ(fy(gV.doc, gQ.viewFrom));
        gV.display.mover.style.top = gQ.viewOffset + "px";
        var i = dk(gV);
        if (!gN && i == 0 && !gP.force && gQ.renderedView == gQ.view && (gQ.updateLineNumbers == null || gQ.updateLineNumbers >= gQ.viewTo)) {
            return false
        }
        var gR = dX();
        if (i > 4) {
            gQ.lineDiv.style.display = "none"
        }
        cr(gV, gQ.updateLineNumbers, gP.dims);
        if (i > 4) {
            gQ.lineDiv.style.display = ""
        }
        gQ.renderedView = gQ.view;
        if (gR && dX() != gR && gR.offsetHeight) {
            gR.focus()
        }
        ec(gQ.cursorDiv);
        ec(gQ.selectionDiv);
        gQ.gutters.style.height = gQ.sizer.style.minHeight = 0;
        if (gN) {
            gQ.lastWrapHeight = gP.wrapperHeight;
            gQ.lastWrapWidth = gP.wrapperWidth;
            eq(gV, 400)
        }
        gQ.updateLineNumbers = null;
        return true
    }

    function cp(gN, gQ) {
        var i = gQ.viewport;
        for (var gP = true;; gP = false) {
            if (!gP || !gN.options.lineWrapping || gQ.oldDisplayWidth == dv(gN)) {
                if (i && i.top != null) {
                    i = {
                        top: Math.min(gN.doc.height + bM(gN.display) - c2(gN), i.top)
                    }
                }
                gQ.visible = cb(gN.display, gN.doc, i);
                if (gQ.visible.from >= gN.display.viewFrom && gQ.visible.to <= gN.display.viewTo) {
                    break
                }
            }
            if (!B(gN, gQ)) {
                break
            }
            ba(gN);
            var gO = dJ(gN);
            bG(gN);
            fh(gN, gO);
            dH(gN, gO)
        }
        gQ.signal(gN, "update", gN);
        if (gN.display.viewFrom != gN.display.reportedViewFrom || gN.display.viewTo != gN.display.reportedViewTo) {
            gQ.signal(gN, "viewportChange", gN, gN.display.viewFrom, gN.display.viewTo);
            gN.display.reportedViewFrom = gN.display.viewFrom;
            gN.display.reportedViewTo = gN.display.viewTo
        }
    }

    function d3(gN, i) {
        var gP = new aK(gN, i);
        if (B(gN, gP)) {
            ba(gN);
            cp(gN, gP);
            var gO = dJ(gN);
            bG(gN);
            fh(gN, gO);
            dH(gN, gO);
            gP.finish()
        }
    }

    function cr(gY, gP, gX) {
        var gU = gY.display,
            g0 = gY.options.lineNumbers;
        var gN = gU.lineDiv,
            gZ = gN.firstChild;

        function gT(g1) {
            var i = g1.nextSibling;
            if (c7 && cc && gY.display.currentWheelTarget == g1) {
                g1.style.display = "none"
            } else {
                g1.parentNode.removeChild(g1)
            }
            return i
        }
        var gV = gU.view,
            gS = gU.viewFrom;
        for (var gQ = 0; gQ < gV.length; gQ++) {
            var gR = gV[gQ];
            if (gR.hidden) {} else {
                if (!gR.node || gR.node.parentNode != gN) {
                    var gO = aG(gY, gR, gS, gX);
                    gN.insertBefore(gO, gZ)
                } else {
                    while (gZ != gR.node) {
                        gZ = gT(gZ)
                    }
                    var gW = g0 && gP != null && gP <= gS && gR.lineNumber;
                    if (gR.changes) {
                        if (ds(gR.changes, "gutter") > -1) {
                            gW = false
                        }
                        ab(gY, gR, gS, gX)
                    }
                    if (gW) {
                        ec(gR.lineNumber);
                        gR.lineNumber.appendChild(document.createTextNode(eG(gY.options, gS)))
                    }
                    gZ = gR.node.nextSibling
                }
            }
            gS += gR.size
        }
        while (gZ) {
            gZ = gT(gZ)
        }
    }

    function db(i) {
        var gN = i.display.gutters.offsetWidth;
        i.display.sizer.style.marginLeft = gN + "px"
    }

    function dH(i, gN) {
        i.display.sizer.style.minHeight = gN.docHeight + "px";
        i.display.heightForcer.style.top = gN.docHeight + "px";
        i.display.gutters.style.height = (gN.docHeight + i.display.barHeight + c0(i)) + "px"
    }

    function eo(gN) {
        var gO = gN.display.gutters,
            gS = gN.options.gutters;
        ec(gO);
        var gP = 0;
        for (; gP < gS.length; ++gP) {
            var gQ = gS[gP];
            var gR = gO.appendChild(gv("div", null, "CodeMirror-gutter " + gQ));
            if (gQ == "CodeMirror-linenumbers") {
                gN.display.lineGutter = gR;
                gR.style.width = (gN.display.lineNumWidth || 1) + "px"
            }
        }
        gO.style.display = gP ? "" : "none";
        db(gN)
    }

    function ck(i) {
        var gN = ds(i.gutters, "CodeMirror-linenumbers");
        if (gN == -1 && i.lineNumbers) {
            i.gutters = i.gutters.concat(["CodeMirror-linenumbers"])
        } else {
            if (gN > -1 && !i.lineNumbers) {
                i.gutters = i.gutters.slice(0);
                i.gutters.splice(gN, 1)
            }
        }
    }

    function gu(i, gN) {
        this.ranges = i;
        this.primIndex = gN
    }
    gu.prototype = {
        primary: function() {
            return this.ranges[this.primIndex]
        },
        equals: function(gN) {
            var gR = this;
            if (gN == this) {
                return true
            }
            if (gN.primIndex != this.primIndex || gN.ranges.length != this.ranges.length) {
                return false
            }
            for (var gP = 0; gP < this.ranges.length; gP++) {
                var gO = gR.ranges[gP],
                    gQ = gN.ranges[gP];
                if (cl(gO.anchor, gQ.anchor) != 0 || cl(gO.head, gQ.head) != 0) {
                    return false
                }
            }
            return true
        },
        deepCopy: function() {
            var gP = this;
            var gN = [];
            for (var gO = 0; gO < this.ranges.length; gO++) {
                gN[gO] = new d7(co(gP.ranges[gO].anchor), co(gP.ranges[gO].head))
            }
            return new gu(gN, this.primIndex)
        },
        somethingSelected: function() {
            var gO = this;
            for (var gN = 0; gN < this.ranges.length; gN++) {
                if (!gO.ranges[gN].empty()) {
                    return true
                }
            }
            return false
        },
        contains: function(gR, gN) {
            var gQ = this;
            if (!gN) {
                gN = gR
            }
            for (var gP = 0; gP < this.ranges.length; gP++) {
                var gO = gQ.ranges[gP];
                if (cl(gN, gO.from()) >= 0 && cl(gR, gO.to()) <= 0) {
                    return gP
                }
            }
            return -1
        }
    };

    function d7(i, gN) {
        this.anchor = i;
        this.head = gN
    }
    d7.prototype = {
        from: function() {
            return ar(this.anchor, this.head)
        },
        to: function() {
            return bB(this.anchor, this.head)
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };

    function cC(gN, gU) {
        var gP = gN[gU];
        gN.sort(function(gW, i) {
            return cl(gW.from(), i.from())
        });
        gU = ds(gN, gP);
        for (var gR = 1; gR < gN.length; gR++) {
            var gV = gN[gR],
                gO = gN[gR - 1];
            if (cl(gO.to(), gV.from()) >= 0) {
                var gS = ar(gO.from(), gV.from()),
                    gT = bB(gO.to(), gV.to());
                var gQ = gO.empty() ? gV.from() == gV.head : gO.from() == gO.head;
                if (gR <= gU) {
                    --gU
                }
                gN.splice(--gR, 2, new d7(gQ ? gT : gS, gQ ? gS : gT))
            }
        }
        return new gu(gN, gU)
    }

    function e9(i, gN) {
        return new gu([new d7(i, gN || i)], 0)
    }

    function c4(i) {
        if (!i.text) {
            return i.to
        }
        return W(i.from.line + i.text.length - 1, f2(i.text).length + (i.text.length == 1 ? i.from.ch : 0))
    }

    function b4(gP, gO) {
        if (cl(gP, gO.from) < 0) {
            return gP
        }
        if (cl(gP, gO.to) <= 0) {
            return c4(gO)
        }
        var i = gP.line + gO.text.length - (gO.to.line - gO.from.line) - 1,
            gN = gP.ch;
        if (gP.line == gO.to.line) {
            gN += c4(gO).ch - gO.to.ch
        }
        return W(i, gN)
    }

    function fD(gQ, gR) {
        var gO = [];
        for (var gP = 0; gP < gQ.sel.ranges.length; gP++) {
            var gN = gQ.sel.ranges[gP];
            gO.push(new d7(b4(gN.anchor, gR), b4(gN.head, gR)))
        }
        return cC(gO, gQ.sel.primIndex)
    }

    function bx(gO, gN, i) {
        if (gO.line == gN.line) {
            return W(i.line, gO.ch - gN.ch + i.ch)
        } else {
            return W(i.line + (gO.line - gN.line), gO.ch)
        }
    }

    function af(gX, gU, gO) {
        var gP = [];
        var gN = W(gX.first, 0),
            gY = gN;
        for (var gR = 0; gR < gU.length; gR++) {
            var gT = gU[gR];
            var gW = bx(gT.from, gN, gY);
            var gV = bx(c4(gT), gN, gY);
            gN = gT.to;
            gY = gV;
            if (gO == "around") {
                var gS = gX.sel.ranges[gR],
                    gQ = cl(gS.head, gS.anchor) < 0;
                gP[gR] = new d7(gQ ? gV : gW, gQ ? gW : gV)
            } else {
                gP[gR] = new d7(gW, gW)
            }
        }
        return new gu(gP, gX.sel.primIndex)
    }

    function bu(i) {
        i.doc.mode = fV(i.options, i.doc.modeOption);
        ey(i)
    }

    function ey(i) {
        i.doc.iter(function(gN) {
            if (gN.stateAfter) {
                gN.stateAfter = null
            }
            if (gN.styles) {
                gN.styles = null
            }
        });
        i.doc.frontier = i.doc.first;
        eq(i, 100);
        i.state.modeGen++;
        if (i.curOp) {
            ah(i)
        }
    }

    function d2(i, gN) {
        return gN.from.ch == 0 && gN.to.ch == 0 && f2(gN.text) == "" && (!i.cm || i.cm.options.wholeLineUpdateBefore)
    }

    function fS(g3, gW, gQ, gU) {
        function gP(g4) {
            return gQ ? gQ[g4] : null
        }

        function gV(g4, g6, g5) {
            eA(g4, g6, g5, gU);
            ae(g4, "change", g4, gW)
        }

        function g0(g7, g5) {
            var g4 = [];
            for (var g6 = g7; g6 < g5; ++g6) {
                g4.push(new gy(gY[g6], gP(g6), gU))
            }
            return g4
        }
        var g1 = gW.from,
            gN = gW.to,
            gY = gW.text;
        var gX = fy(g3, g1.line),
            i = fy(g3, gN.line);
        var gO = f2(gY),
            g2 = gP(gY.length - 1),
            gZ = gN.line - g1.line;
        if (gW.full) {
            g3.insert(0, g0(0, gY.length));
            g3.remove(gY.length, g3.size - gY.length)
        } else {
            if (d2(g3, gW)) {
                var gT = g0(0, gY.length - 1);
                gV(i, i.text, g2);
                if (gZ) {
                    g3.remove(g1.line, gZ)
                }
                if (gT.length) {
                    g3.insert(g1.line, gT)
                }
            } else {
                if (gX == i) {
                    if (gY.length == 1) {
                        gV(gX, gX.text.slice(0, g1.ch) + gO + gX.text.slice(gN.ch), g2)
                    } else {
                        var gS = g0(1, gY.length - 1);
                        gS.push(new gy(gO + gX.text.slice(gN.ch), g2, gU));
                        gV(gX, gX.text.slice(0, g1.ch) + gY[0], gP(0));
                        g3.insert(g1.line + 1, gS)
                    }
                } else {
                    if (gY.length == 1) {
                        gV(gX, gX.text.slice(0, g1.ch) + gY[0] + i.text.slice(gN.ch), gP(0));
                        g3.remove(g1.line + 1, gZ)
                    } else {
                        gV(gX, gX.text.slice(0, g1.ch) + gY[0], gP(0));
                        gV(i, gO + i.text.slice(gN.ch), g2);
                        var gR = g0(1, gY.length - 1);
                        if (gZ > 1) {
                            g3.remove(g1.line + 1, gZ - 1)
                        }
                        g3.insert(g1.line + 1, gR)
                    }
                }
            }
        }
        ae(g3, "change", g3, gW)
    }

    function ei(gP, gO, gN) {
        function i(gV, gT, gR) {
            if (gV.linked) {
                for (var gS = 0; gS < gV.linked.length; ++gS) {
                    var gQ = gV.linked[gS];
                    if (gQ.doc == gT) {
                        continue
                    }
                    var gU = gR && gQ.sharedHist;
                    if (gN && !gU) {
                        continue
                    }
                    gO(gQ.doc, gU);
                    i(gQ.doc, gV, gU)
                }
            }
        }
        i(gP, null, true)
    }

    function en(i, gN) {
        if (gN.cm) {
            throw new Error("This document is already in use.")
        }
        i.doc = gN;
        gN.cm = i;
        Y(i);
        bu(i);
        if (!i.options.lineWrapping) {
            f(i)
        }
        i.options.mode = gN.modeOption;
        ah(i)
    }

    function gk(i) {
        this.done = [];
        this.undone = [];
        this.undoDepth = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = this.lastSelOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = i || 1
    }

    function dE(i, gO) {
        var gN = {
            from: co(gO.from),
            to: c4(gO),
            text: gw(i, gO.from, gO.to)
        };
        b3(i, gN, gO.from.line, gO.to.line + 1);
        ei(i, function(gP) {
            return b3(gP, gN, gO.from.line, gO.to.line + 1)
        }, true);
        return gN
    }

    function fX(gN) {
        while (gN.length) {
            var i = f2(gN);
            if (i.ranges) {
                gN.pop()
            } else {
                break
            }
        }
    }

    function e4(gN, i) {
        if (i) {
            fX(gN.done);
            return f2(gN.done)
        } else {
            if (gN.done.length && !f2(gN.done).ranges) {
                return f2(gN.done)
            } else {
                if (gN.done.length > 1 && !gN.done[gN.done.length - 2].ranges) {
                    gN.done.pop();
                    return f2(gN.done)
                }
            }
        }
    }

    function f9(gS, gQ, i, gP) {
        var gO = gS.history;
        gO.undone.length = 0;
        var gN = +new Date,
            gT;
        var gU;
        if ((gO.lastOp == gP || gO.lastOrigin == gQ.origin && gQ.origin && ((gQ.origin.charAt(0) == "+" && gS.cm && gO.lastModTime > gN - gS.cm.options.historyEventDelay) || gQ.origin.charAt(0) == "*")) && (gT = e4(gO, gO.lastOp == gP))) {
            gU = f2(gT.changes);
            if (cl(gQ.from, gQ.to) == 0 && cl(gQ.from, gU.to) == 0) {
                gU.to = c4(gQ)
            } else {
                gT.changes.push(dE(gS, gQ))
            }
        } else {
            var gR = f2(gO.done);
            if (!gR || !gR.ranges) {
                cV(gS.sel, gO.done)
            }
            gT = {
                changes: [dE(gS, gQ)],
                generation: gO.generation
            };
            gO.done.push(gT);
            while (gO.done.length > gO.undoDepth) {
                gO.done.shift();
                if (!gO.done[0].ranges) {
                    gO.done.shift()
                }
            }
        }
        gO.done.push(i);
        gO.generation = ++gO.maxGeneration;
        gO.lastModTime = gO.lastSelTime = gN;
        gO.lastOp = gO.lastSelOp = gP;
        gO.lastOrigin = gO.lastSelOrigin = gQ.origin;
        if (!gU) {
            aF(gS, "historyAdded")
        }
    }

    function bE(gQ, i, gO, gP) {
        var gN = i.charAt(0);
        return gN == "*" || gN == "+" && gO.ranges.length == gP.ranges.length && gO.somethingSelected() == gP.somethingSelected() && new Date - gQ.history.lastSelTime <= (gQ.cm ? gQ.cm.options.historyEventDelay : 500)
    }

    function gF(gR, gP, i, gO) {
        var gQ = gR.history,
            gN = gO && gO.origin;
        if (i == gQ.lastSelOp || (gN && gQ.lastSelOrigin == gN && (gQ.lastModTime == gQ.lastSelTime && gQ.lastOrigin == gN || bE(gR, gN, f2(gQ.done), gP)))) {
            gQ.done[gQ.done.length - 1] = gP
        } else {
            cV(gP, gQ.done)
        }
        gQ.lastSelTime = +new Date;
        gQ.lastSelOrigin = gN;
        gQ.lastSelOp = i;
        if (gO && gO.clearRedo !== false) {
            fX(gQ.undone)
        }
    }

    function cV(gN, i) {
        var gO = f2(i);
        if (!(gO && gO.ranges && gO.equals(gN))) {
            i.push(gN)
        }
    }

    function b3(gN, gR, gQ, gP) {
        var i = gR["spans_" + gN.id],
            gO = 0;
        gN.iter(Math.max(gN.first, gQ), Math.min(gN.first + gN.size, gP), function(gS) {
            if (gS.markedSpans) {
                (i || (i = gR["spans_" + gN.id] = {}))[gO] = gS.markedSpans
            }++gO
        })
    }

    function bm(gP) {
        if (!gP) {
            return null
        }
        var gN;
        for (var gO = 0; gO < gP.length; ++gO) {
            if (gP[gO].marker.explicitlyCleared) {
                if (!gN) {
                    gN = gP.slice(0, gO)
                }
            } else {
                if (gN) {
                    gN.push(gP[gO])
                }
            }
        }
        return !gN ? gP : gN.length ? gN : null
    }

    function b9(gQ, gR) {
        var gP = gR["spans_" + gQ.id];
        if (!gP) {
            return null
        }
        var gN = [];
        for (var gO = 0; gO < gR.text.length; ++gO) {
            gN.push(bm(gP[gO]))
        }
        return gN
    }

    function ek(gV, gT) {
        var gN = b9(gV, gT);
        var gW = ew(gV, gT);
        if (!gN) {
            return gW
        }
        if (!gW) {
            return gN
        }
        for (var gQ = 0; gQ < gN.length; ++gQ) {
            var gR = gN[gQ],
                gS = gW[gQ];
            if (gR && gS) {
                spans: for (var gP = 0; gP < gS.length; ++gP) {
                    var gU = gS[gP];
                    for (var gO = 0; gO < gR.length; ++gO) {
                        if (gR[gO].marker == gU.marker) {
                            continue spans
                        }
                    }
                    gR.push(gU)
                }
            }
            else {
                if (gS) {
                    gN[gQ] = gS
                }
            }
        }
        return gN
    }

    function bT(gY, gQ, gX) {
        var gO = [];
        for (var gT = 0; gT < gY.length; ++gT) {
            var gP = gY[gT];
            if (gP.ranges) {
                gO.push(gX ? gu.prototype.deepCopy.call(gP) : gP);
                continue
            }
            var gV = gP.changes,
                gW = [];
            gO.push({
                changes: gW
            });
            for (var gS = 0; gS < gV.length; ++gS) {
                var gU = gV[gS],
                    gR = (void 0);
                gW.push({
                    from: gU.from,
                    to: gU.to,
                    text: gU.text
                });
                if (gQ) {
                    for (var gN in gU) {
                        if (gR = gN.match(/^spans_(\d+)$/)) {
                            if (ds(gQ, Number(gR[1])) > -1) {
                                f2(gW)[gN] = gU[gN];
                                delete gU[gN]
                            }
                        }
                    }
                }
            }
        }
        return gO
    }

    function fO(gR, gN, gQ, i) {
        if (gR.cm && gR.cm.display.shift || gR.extend) {
            var gP = gN.anchor;
            if (i) {
                var gO = cl(gQ, gP) < 0;
                if (gO != (cl(i, gP) < 0)) {
                    gP = gQ;
                    gQ = i
                } else {
                    if (gO != (cl(gQ, i) < 0)) {
                        gQ = i
                    }
                }
            }
            return new d7(gP, gQ)
        } else {
            return new d7(i || gQ, gQ)
        }
    }

    function gp(gP, gO, i, gN) {
        bY(gP, new gu([fO(gP, gP.sel.primary(), gO, i)], 0), gN)
    }

    function aw(gS, gR, gP) {
        var gO = [];
        for (var gQ = 0; gQ < gS.sel.ranges.length; gQ++) {
            gO[gQ] = fO(gS, gS.sel.ranges[gQ], gR[gQ], null)
        }
        var gN = cC(gO, gS.sel.primIndex);
        bY(gS, gN, gP)
    }

    function e(gR, gQ, gO, gP) {
        var gN = gR.sel.ranges.slice(0);
        gN[gQ] = gO;
        bY(gR, cC(gN, gR.sel.primIndex), gP)
    }

    function F(gP, gN, gO, i) {
        bY(gP, e9(gN, gO), i)
    }

    function b(gP, gN, i) {
        var gO = {
            ranges: gN.ranges,
            update: function(gQ) {
                var gS = this;
                this.ranges = [];
                for (var gR = 0; gR < gQ.length; gR++) {
                    gS.ranges[gR] = new d7(f7(gP, gQ[gR].anchor), f7(gP, gQ[gR].head))
                }
            },
            origin: i && i.origin
        };
        aF(gP, "beforeSelectionChange", gP, gO);
        if (gP.cm) {
            aF(gP.cm, "beforeSelectionChange", gP.cm, gO)
        }
        if (gO.ranges != gN.ranges) {
            return cC(gO.ranges, gO.ranges.length - 1)
        } else {
            return gN
        }
    }

    function fr(gQ, gP, gN) {
        var i = gQ.history.done,
            gO = f2(i);
        if (gO && gO.ranges) {
            i[i.length - 1] = gP;
            eC(gQ, gP, gN)
        } else {
            bY(gQ, gP, gN)
        }
    }

    function bY(gO, gN, i) {
        eC(gO, gN, i);
        gF(gO, gO.sel, gO.cm ? gO.cm.curOp.id : NaN, i)
    }

    function eC(gP, gO, gN) {
        if (fE(gP, "beforeSelectionChange") || gP.cm && fE(gP.cm, "beforeSelectionChange")) {
            gO = b(gP, gO, gN)
        }
        var i = gN && gN.bias || (cl(gO.primary().head, gP.sel.primary().head) < 0 ? -1 : 1);
        dg(gP, o(gP, gO, i, true));
        if (!(gN && gN.scroll === false) && gP.cm) {
            f1(gP.cm)
        }
    }

    function dg(gN, i) {
        if (i.equals(gN.sel)) {
            return
        }
        gN.sel = i;
        if (gN.cm) {
            gN.cm.curOp.updateInput = gN.cm.curOp.selectionChanged = true;
            V(gN.cm)
        }
        ae(gN, "cursorActivity", gN)
    }

    function eM(i) {
        dg(i, o(i, i.sel, null, false), Z)
    }

    function o(gW, gN, gT, gU) {
        var gQ;
        for (var gR = 0; gR < gN.ranges.length; gR++) {
            var gS = gN.ranges[gR];
            var gO = gN.ranges.length == gW.sel.ranges.length && gW.sel.ranges[gR];
            var gV = bZ(gW, gS.anchor, gO && gO.anchor, gT, gU);
            var gP = bZ(gW, gS.head, gO && gO.head, gT, gU);
            if (gQ || gV != gS.anchor || gP != gS.head) {
                if (!gQ) {
                    gQ = gN.ranges.slice(0, gR)
                }
                gQ[gR] = new d7(gV, gP)
            }
        }
        return gQ ? cC(gQ, gN.primIndex) : gN
    }

    function e0(gX, gV, gQ, gP, gT) {
        var gY = fy(gX, gV.line);
        if (gY.markedSpans) {
            for (var gR = 0; gR < gY.markedSpans.length; ++gR) {
                var gN = gY.markedSpans[gR],
                    gO = gN.marker;
                if ((gN.from == null || (gO.inclusiveLeft ? gN.from <= gV.ch : gN.from < gV.ch)) && (gN.to == null || (gO.inclusiveRight ? gN.to >= gV.ch : gN.to > gV.ch))) {
                    if (gT) {
                        aF(gO, "beforeCursorEnter");
                        if (gO.explicitlyCleared) {
                            if (!gY.markedSpans) {
                                break
                            } else {
                                --gR;
                                continue
                            }
                        }
                    }
                    if (!gO.atomic) {
                        continue
                    }
                    if (gQ) {
                        var gU = gO.find(gP < 0 ? 1 : -1),
                            gW = (void 0);
                        if (gP < 0 ? gO.inclusiveRight : gO.inclusiveLeft) {
                            gU = gJ(gX, gU, -gP, gU && gU.line == gV.line ? gY : null)
                        }
                        if (gU && gU.line == gV.line && (gW = cl(gU, gQ)) && (gP < 0 ? gW < 0 : gW > 0)) {
                            return e0(gX, gU, gV, gP, gT)
                        }
                    }
                    var gS = gO.find(gP < 0 ? -1 : 1);
                    if (gP < 0 ? gO.inclusiveLeft : gO.inclusiveRight) {
                        gS = gJ(gX, gS, gP, gS.line == gV.line ? gY : null)
                    }
                    return gS ? e0(gX, gS, gV, gP, gT) : null
                }
            }
        }
        return gV
    }

    function bZ(gR, gS, gP, gN, i) {
        var gO = gN || 1;
        var gQ = e0(gR, gS, gP, gO, i) || (!i && e0(gR, gS, gP, gO, true)) || e0(gR, gS, gP, -gO, i) || (!i && e0(gR, gS, gP, -gO, true));
        if (!gQ) {
            gR.cantEdit = true;
            return W(gR.first, 0)
        }
        return gQ
    }

    function gJ(gO, gP, gN, i) {
        if (gN < 0 && gP.ch == 0) {
            if (gP.line > gO.first) {
                return f7(gO, W(gP.line - 1))
            } else {
                return null
            }
        } else {
            if (gN > 0 && gP.ch == (i || fy(gO, gP.line)).text.length) {
                if (gP.line < gO.first + gO.size - 1) {
                    return W(gP.line + 1, 0)
                } else {
                    return null
                }
            } else {
                return new W(gP.line, gP.ch + gN)
            }
        }
    }

    function al(i) {
        i.setSelection(W(i.firstLine(), 0), W(i.lastLine()), Z)
    }

    function d0(gN, gP, gO) {
        var i = {
            canceled: false,
            from: gP.from,
            to: gP.to,
            text: gP.text,
            origin: gP.origin,
            cancel: function() {
                return i.canceled = true
            }
        };
        if (gO) {
            i.update = function(gT, gS, gR, gQ) {
                if (gT) {
                    i.from = f7(gN, gT)
                }
                if (gS) {
                    i.to = f7(gN, gS)
                }
                if (gR) {
                    i.text = gR
                }
                if (gQ !== undefined) {
                    i.origin = gQ
                }
            }
        }
        aF(gN, "beforeChange", gN, i);
        if (gN.cm) {
            aF(gN.cm, "beforeChange", gN.cm, i)
        }
        if (i.canceled) {
            return null
        }
        return {
            from: i.from,
            to: i.to,
            text: i.text,
            origin: i.origin
        }
    }

    function bh(gQ, gR, gP) {
        if (gQ.cm) {
            if (!gQ.cm.curOp) {
                return c8(gQ.cm, bh)(gQ, gR, gP)
            }
            if (gQ.cm.state.suppressEdits) {
                return
            }
        }
        if (fE(gQ, "beforeChange") || gQ.cm && fE(gQ.cm, "beforeChange")) {
            gR = d0(gQ, gR, true);
            if (!gR) {
                return
            }
        }
        var gO = gG && !gP && cO(gQ, gR.from, gR.to);
        if (gO) {
            for (var gN = gO.length - 1; gN >= 0; --gN) {
                K(gQ, {
                    from: gO[gN].from,
                    to: gO[gN].to,
                    text: gN ? [""] : gR.text
                })
            }
        } else {
            K(gQ, gR)
        }
    }

    function K(gO, gP) {
        if (gP.text.length == 1 && gP.text[0] == "" && cl(gP.from, gP.to) == 0) {
            return
        }
        var gN = fD(gO, gP);
        f9(gO, gP, gN, gO.cm ? gO.cm.curOp.id : NaN);
        ep(gO, gP, gN, ew(gO, gP));
        var i = [];
        ei(gO, function(gR, gQ) {
            if (!gQ && ds(i, gR.history) == -1) {
                dN(gR.history, gP);
                i.push(gR.history)
            }
            ep(gR, gP, null, ew(gR, gP))
        })
    }

    function cd(gY, gX, g0) {
        if (gY.cm && gY.cm.state.suppressEdits && !g0) {
            return
        }
        var gW = gY.history,
            gO, gQ = gY.sel;
        var gN = gX == "undo" ? gW.done : gW.undone,
            gZ = gX == "undo" ? gW.undone : gW.done;
        var gT = 0;
        for (; gT < gN.length; gT++) {
            gO = gN[gT];
            if (g0 ? gO.ranges && !gO.equals(gY.sel) : !gO.ranges) {
                break
            }
        }
        if (gT == gN.length) {
            return
        }
        gW.lastOrigin = gW.lastSelOrigin = null;
        for (;;) {
            gO = gN.pop();
            if (gO.ranges) {
                cV(gO, gZ);
                if (g0 && !gO.equals(gY.sel)) {
                    bY(gY, gO, {
                        clearRedo: false
                    });
                    return
                }
                gQ = gO
            } else {
                break
            }
        }
        var gV = [];
        cV(gQ, gZ);
        gZ.push({
            changes: gV,
            generation: gW.generation
        });
        gW.generation = gO.generation || ++gW.maxGeneration;
        var gP = fE(gY, "beforeChange") || gY.cm && fE(gY.cm, "beforeChange");
        var gU = function(g1) {
            var g4 = gO.changes[g1];
            g4.origin = gX;
            if (gP && !d0(gY, g4, false)) {
                gN.length = 0;
                return {}
            }
            gV.push(dE(gY, g4));
            var g3 = g1 ? fD(gY, g4) : f2(gN);
            ep(gY, g4, g3, ek(gY, g4));
            if (!g1 && gY.cm) {
                gY.cm.scrollIntoView({
                    from: g4.from,
                    to: c4(g4)
                })
            }
            var g2 = [];
            ei(gY, function(g5, i) {
                if (!i && ds(g2, g5.history) == -1) {
                    dN(g5.history, g4);
                    g2.push(g5.history)
                }
                ep(g5, g4, null, ek(g5, g4))
            })
        };
        for (var gR = gO.changes.length - 1; gR >= 0; --gR) {
            var gS = gU(gR);
            if (gS) {
                return gS.v
            }
        }
    }

    function fH(gN, gP) {
        if (gP == 0) {
            return
        }
        gN.first += gP;
        gN.sel = new gu(bX(gN.sel.ranges, function(gQ) {
            return new d7(W(gQ.anchor.line + gP, gQ.anchor.ch), W(gQ.head.line + gP, gQ.head.ch))
        }), gN.sel.primIndex);
        if (gN.cm) {
            ah(gN.cm, gN.first, gN.first - gP, gP);
            for (var gO = gN.cm.display, i = gO.viewFrom; i < gO.viewTo; i++) {
                R(gN.cm, i, "gutter")
            }
        }
    }

    function ep(gQ, gR, gP, gN) {
        if (gQ.cm && !gQ.cm.curOp) {
            return c8(gQ.cm, ep)(gQ, gR, gP, gN)
        }
        if (gR.to.line < gQ.first) {
            fH(gQ, gR.text.length - 1 - (gR.to.line - gR.from.line));
            return
        }
        if (gR.from.line > gQ.lastLine()) {
            return
        }
        if (gR.from.line < gQ.first) {
            var i = gR.text.length - 1 - (gQ.first - gR.from.line);
            fH(gQ, i);
            gR = {
                from: W(gQ.first, 0),
                to: W(gR.to.line + i, gR.to.ch),
                text: [f2(gR.text)],
                origin: gR.origin
            }
        }
        var gO = gQ.lastLine();
        if (gR.to.line > gO) {
            gR = {
                from: gR.from,
                to: W(gO, fy(gQ, gO).text.length),
                text: [gR.text[0]],
                origin: gR.origin
            }
        }
        gR.removed = gw(gQ, gR.from, gR.to);
        if (!gP) {
            gP = fD(gQ, gR)
        }
        if (gQ.cm) {
            aJ(gQ.cm, gR, gN)
        } else {
            fS(gQ, gR, gN)
        }
        eC(gQ, gP, Z)
    }

    function aJ(gX, gT, gR) {
        var gW = gX.doc,
            gS = gX.display,
            gU = gT.from,
            gV = gT.to;
        var i = false,
            gQ = gU.line;
        if (!gX.options.lineWrapping) {
            gQ = bR(y(fy(gW, gU.line)));
            gW.iter(gQ, gV.line + 1, function(gZ) {
                if (gZ == gS.maxLine) {
                    i = true;
                    return true
                }
            })
        }
        if (gW.sel.contains(gT.from, gT.to) > -1) {
            V(gX)
        }
        fS(gW, gT, gR, bf(gX));
        if (!gX.options.lineWrapping) {
            gW.iter(gQ, gU.line + gT.text.length, function(g0) {
                var gZ = ez(g0);
                if (gZ > gS.maxLineLength) {
                    gS.maxLine = g0;
                    gS.maxLineLength = gZ;
                    gS.maxLineChanged = true;
                    i = false
                }
            });
            if (i) {
                gX.curOp.updateMaxLine = true
            }
        }
        gW.frontier = Math.min(gW.frontier, gU.line);
        eq(gX, 400);
        var gY = gT.text.length - (gV.line - gU.line) - 1;
        if (gT.full) {
            ah(gX)
        } else {
            if (gU.line == gV.line && gT.text.length == 1 && !d2(gX.doc, gT)) {
                R(gX, gU.line, "text")
            } else {
                ah(gX, gU.line, gV.line + 1, gY)
            }
        }
        var gO = fE(gX, "changes"),
            gP = fE(gX, "change");
        if (gP || gO) {
            var gN = {
                from: gU,
                to: gV,
                text: gT.text,
                removed: gT.removed,
                origin: gT.origin
            };
            if (gP) {
                ae(gX, "change", gX, gN)
            }
            if (gO) {
                (gX.curOp.changeObjs || (gX.curOp.changeObjs = [])).push(gN)
            }
        }
        gX.display.selForContextMenu = null
    }

    function a2(gP, gO, gR, gQ, i) {
        if (!gQ) {
            gQ = gR
        }
        if (cl(gQ, gR) < 0) {
            var gN = gQ;
            gQ = gR;
            gR = gN
        }
        if (typeof gO == "string") {
            gO = gP.splitLines(gO)
        }
        bh(gP, {
            from: gR,
            to: gQ,
            text: gO,
            origin: i
        })
    }

    function I(gP, gO, gN, i) {
        if (gN < gP.line) {
            gP.line += i
        } else {
            if (gO < gP.line) {
                gP.line = gO;
                gP.ch = 0
            }
        }
    }

    function fB(gR, gT, gU, gV) {
        for (var gQ = 0; gQ < gR.length; ++gQ) {
            var gN = gR[gQ],
                gS = true;
            if (gN.ranges) {
                if (!gN.copied) {
                    gN = gR[gQ] = gN.deepCopy();
                    gN.copied = true
                }
                for (var gP = 0; gP < gN.ranges.length; gP++) {
                    I(gN.ranges[gP].anchor, gT, gU, gV);
                    I(gN.ranges[gP].head, gT, gU, gV)
                }
                continue
            }
            for (var gO = 0; gO < gN.changes.length; ++gO) {
                var gW = gN.changes[gO];
                if (gU < gW.from.line) {
                    gW.from = W(gW.from.line + gV, gW.from.ch);
                    gW.to = W(gW.to.line + gV, gW.to.ch)
                } else {
                    if (gT <= gW.to.line) {
                        gS = false;
                        break
                    }
                }
            }
            if (!gS) {
                gR.splice(0, gQ + 1);
                gQ = 0
            }
        }
    }

    function dN(gN, gQ) {
        var gP = gQ.from.line,
            gO = gQ.to.line,
            i = gQ.text.length - (gO - gP) - 1;
        fB(gN.done, gP, gO, i);
        fB(gN.undone, gP, gO, i)
    }

    function eO(gP, gO, i, gR) {
        var gQ = gO,
            gN = gO;
        if (typeof gO == "number") {
            gN = fy(gP, dc(gP, gO))
        } else {
            gQ = bR(gO)
        }
        if (gQ == null) {
            return null
        }
        if (gR(gN, gQ) && gP.cm) {
            R(gP.cm, gQ, i)
        }
        return gN
    }

    function fi(gO) {
        var gQ = this;
        this.lines = gO;
        this.parent = null;
        var gN = 0;
        for (var gP = 0; gP < gO.length; ++gP) {
            gO[gP].parent = gQ;
            gN += gO[gP].height
        }
        this.height = gN
    }
    fi.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(gN, gS) {
            var gR = this;
            for (var gP = gN, gQ = gN + gS; gP < gQ; ++gP) {
                var gO = gR.lines[gP];
                gR.height -= gO.height;
                bF(gO);
                ae(gO, "delete")
            }
            this.lines.splice(gN, gS)
        },
        collapse: function(i) {
            i.push.apply(i, this.lines)
        },
        insertInner: function(gO, gP, gN) {
            var gR = this;
            this.height += gN;
            this.lines = this.lines.slice(0, gO).concat(gP).concat(this.lines.slice(gO));
            for (var gQ = 0; gQ < gP.length; ++gQ) {
                gP[gQ].parent = gR
            }
        },
        iterN: function(i, gQ, gP) {
            var gO = this;
            for (var gN = i + gQ; i < gN; ++i) {
                if (gP(gO.lines[i])) {
                    return true
                }
            }
        }
    };

    function fR(gQ) {
        var gS = this;
        this.children = gQ;
        var gP = 0,
            gN = 0;
        for (var gO = 0; gO < gQ.length; ++gO) {
            var gR = gQ[gO];
            gP += gR.chunkSize();
            gN += gR.height;
            gR.parent = gS
        }
        this.size = gP;
        this.height = gN;
        this.parent = null
    }
    fR.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(gP, gO) {
            var gR = this;
            this.size -= gO;
            for (var gQ = 0; gQ < this.children.length; ++gQ) {
                var gN = gR.children[gQ],
                    gT = gN.chunkSize();
                if (gP < gT) {
                    var gS = Math.min(gO, gT - gP),
                        gU = gN.height;
                    gN.removeInner(gP, gS);
                    gR.height -= gU - gN.height;
                    if (gT == gS) {
                        gR.children.splice(gQ--, 1);
                        gN.parent = null
                    }
                    if ((gO -= gS) == 0) {
                        break
                    }
                    gP = 0
                } else {
                    gP -= gT
                }
            }
            if (this.size - gO < 25 && (this.children.length > 1 || !(this.children[0] instanceof fi))) {
                var gV = [];
                this.collapse(gV);
                this.children = [new fi(gV)];
                this.children[0].parent = this
            }
        },
        collapse: function(gN) {
            var gP = this;
            for (var gO = 0; gO < this.children.length; ++gO) {
                gP.children[gO].collapse(gN)
            }
        },
        insertInner: function(gO, gW, gV) {
            var gR = this;
            this.size += gW.length;
            this.height += gV;
            for (var gQ = 0; gQ < this.children.length; ++gQ) {
                var gN = gR.children[gQ],
                    gT = gN.chunkSize();
                if (gO <= gT) {
                    gN.insertInner(gO, gW, gV);
                    if (gN.lines && gN.lines.length > 50) {
                        var gP = gN.lines.length % 25 + 25;
                        for (var gU = gP; gU < gN.lines.length;) {
                            var gS = new fi(gN.lines.slice(gU, gU += 25));
                            gN.height -= gS.height;
                            gR.children.splice(++gQ, 0, gS);
                            gS.parent = gR
                        }
                        gN.lines = gN.lines.slice(0, gP);
                        gR.maybeSpill()
                    }
                    break
                }
                gO -= gT
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) {
                return
            }
            var gP = this;
            do {
                var gN = gP.children.splice(gP.children.length - 5, 5);
                var gO = new fR(gN);
                if (!gP.parent) {
                    var gQ = new fR(gP.children);
                    gQ.parent = gP;
                    gP.children = [gQ, gO];
                    gP = gQ
                } else {
                    gP.size -= gO.size;
                    gP.height -= gO.height;
                    var i = ds(gP.parent.children, gP);
                    gP.parent.children.splice(i + 1, 0, gO)
                }
                gO.parent = gP.parent
            } while (gP.children.length > 10);
            gP.parent.maybeSpill()
        },
        iterN: function(gN, gU, gT) {
            var gS = this;
            for (var gO = 0; gO < this.children.length; ++gO) {
                var gR = gS.children[gO],
                    gQ = gR.chunkSize();
                if (gN < gQ) {
                    var gP = Math.min(gU, gQ - gN);
                    if (gR.iterN(gN, gP, gT)) {
                        return true
                    }
                    if ((gU -= gP) == 0) {
                        break
                    }
                    gN = 0
                } else {
                    gN -= gQ
                }
            }
        }
    };

    function dK(gP, gO, i) {
        var gQ = this;
        if (i) {
            for (var gN in i) {
                if (i.hasOwnProperty(gN)) {
                    gQ[gN] = i[gN]
                }
            }
        }
        this.doc = gP;
        this.node = gO
    }
    bD(dK);

    function d9(i, gN, gO) {
        if (bQ(gN) < ((i.curOp && i.curOp.scrollTop) || i.doc.scrollTop)) {
            cS(i, null, gO)
        }
    }
    dK.prototype.clear = function() {
        var gT = this;
        var gO = this.doc.cm,
            gQ = this.line.widgets,
            gP = this.line,
            gS = bR(gP);
        if (gS == null || !gQ) {
            return
        }
        for (var gR = 0; gR < gQ.length; ++gR) {
            if (gQ[gR] == gT) {
                gQ.splice(gR--, 1)
            }
        }
        if (!gQ.length) {
            gP.widgets = null
        }
        var gN = c5(this);
        gz(gP, Math.max(0, gP.height - gN));
        if (gO) {
            cT(gO, function() {
                d9(gO, gP, -gN);
                R(gO, gS, "widget")
            })
        }
    };
    dK.prototype.changed = function() {
        var gN = this.height,
            i = this.doc.cm,
            gO = this.line;
        this.height = null;
        var gP = c5(this) - gN;
        if (!gP) {
            return
        }
        gz(gO, gO.height + gP);
        if (i) {
            cT(i, function() {
                i.curOp.forceUpdate = true;
                d9(i, gO, gP)
            })
        }
    };

    function bK(gR, gQ, gO, gN) {
        var gP = new dK(gR, gO, gN);
        var i = gR.cm;
        if (i && gP.noHScroll) {
            i.display.alignWidgets = true
        }
        eO(gR, gQ, "widget", function(gT) {
            var gU = gT.widgets || (gT.widgets = []);
            if (gP.insertAt == null) {
                gU.push(gP)
            } else {
                gU.splice(Math.min(gU.length - 1, Math.max(0, gP.insertAt)), 0, gP)
            }
            gP.line = gT;
            if (i && !fP(gR, gT)) {
                var gS = bQ(gT) < gR.scrollTop;
                gz(gT, gT.height + c5(gP));
                if (gS) {
                    cS(i, null, gP.height)
                }
                i.curOp.forceUpdate = true
            }
            return true
        });
        return gP
    }
    var a5 = 0;

    function Q(gN, i) {
        this.lines = [];
        this.type = i;
        this.doc = gN;
        this.id = ++a5
    }
    bD(Q);
    Q.prototype.clear = function() {
        var gS = this;
        if (this.explicitlyCleared) {
            return
        }
        var gW = this.doc.cm,
            gP = gW && !gW.curOp;
        if (gP) {
            cP(gW)
        }
        if (fE(this, "clear")) {
            var gX = this.find();
            if (gX) {
                ae(this, "clear", gX.from, gX.to)
            }
        }
        var gQ = null,
            gU = null;
        for (var gR = 0; gR < this.lines.length; ++gR) {
            var gY = gS.lines[gR];
            var gV = ft(gY.markedSpans, gS);
            if (gW && !gS.collapsed) {
                R(gW, bR(gY), "text")
            } else {
                if (gW) {
                    if (gV.to != null) {
                        gU = bR(gY)
                    }
                    if (gV.from != null) {
                        gQ = bR(gY)
                    }
                }
            }
            gY.markedSpans = eY(gY.markedSpans, gV);
            if (gV.from == null && gS.collapsed && !fP(gS.doc, gY) && gW) {
                gz(gY, aZ(gW.display))
            }
        }
        if (gW && this.collapsed && !gW.options.lineWrapping) {
            for (var gO = 0; gO < this.lines.length; ++gO) {
                var gN = y(gS.lines[gO]),
                    gT = ez(gN);
                if (gT > gW.display.maxLineLength) {
                    gW.display.maxLine = gN;
                    gW.display.maxLineLength = gT;
                    gW.display.maxLineChanged = true
                }
            }
        }
        if (gQ != null && gW && this.collapsed) {
            ah(gW, gQ, gU + 1)
        }
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
            this.doc.cantEdit = false;
            if (gW) {
                eM(gW.doc)
            }
        }
        if (gW) {
            ae(gW, "markerCleared", gW, this)
        }
        if (gP) {
            am(gW)
        }
        if (this.parent) {
            this.parent.clear()
        }
    };
    Q.prototype.find = function(gQ, gO) {
        var gU = this;
        if (gQ == null && this.type == "bookmark") {
            gQ = 1
        }
        var gT, gS;
        for (var gP = 0; gP < this.lines.length; ++gP) {
            var gN = gU.lines[gP];
            var gR = ft(gN.markedSpans, gU);
            if (gR.from != null) {
                gT = W(gO ? gN : bR(gN), gR.from);
                if (gQ == -1) {
                    return gT
                }
            }
            if (gR.to != null) {
                gS = W(gO ? gN : bR(gN), gR.to);
                if (gQ == 1) {
                    return gS
                }
            }
        }
        return gT && {
            from: gT,
            to: gS
        }
    };
    Q.prototype.changed = function() {
        var gO = this.find(-1, true),
            gN = this,
            i = this.doc.cm;
        if (!gO || !i) {
            return
        }
        cT(i, function() {
            var gQ = gO.line,
                gR = bR(gO.line);
            var gP = fv(i, gR);
            if (gP) {
                av(gP);
                i.curOp.selectionChanged = i.curOp.forceUpdate = true
            }
            i.curOp.updateMaxLine = true;
            if (!fP(gN.doc, gQ) && gN.height != null) {
                var gT = gN.height;
                gN.height = null;
                var gS = c5(gN) - gT;
                if (gS) {
                    gz(gQ, gQ.height + gS)
                }
            }
        })
    };
    Q.prototype.attachLine = function(i) {
        if (!this.lines.length && this.doc.cm) {
            var gN = this.doc.cm.curOp;
            if (!gN.maybeHiddenMarkers || ds(gN.maybeHiddenMarkers, this) == -1) {
                (gN.maybeUnhiddenMarkers || (gN.maybeUnhiddenMarkers = [])).push(this)
            }
        }
        this.lines.push(i)
    };
    Q.prototype.detachLine = function(i) {
        this.lines.splice(ds(this.lines, i), 1);
        if (!this.lines.length && this.doc.cm) {
            var gN = this.doc.cm.curOp;
            (gN.maybeHiddenMarkers || (gN.maybeHiddenMarkers = [])).push(this)
        }
    };

    function eV(gV, gT, gU, gX, gR) {
        if (gX && gX.shared) {
            return N(gV, gT, gU, gX, gR)
        }
        if (gV.cm && !gV.cm.curOp) {
            return c8(gV.cm, eV)(gV, gT, gU, gX, gR)
        }
        var gQ = new Q(gV, gR),
            gW = cl(gT, gU);
        if (gX) {
            aO(gX, gQ, false)
        }
        if (gW > 0 || gW == 0 && gQ.clearWhenEmpty !== false) {
            return gQ
        }
        if (gQ.replacedWith) {
            gQ.collapsed = true;
            gQ.widgetNode = gv("span", [gQ.replacedWith], "CodeMirror-widget");
            gQ.widgetNode.setAttribute("role", "presentation");
            if (!gX.handleMouseEvents) {
                gQ.widgetNode.setAttribute("cm-ignore-events", "true")
            }
            if (gX.insertLeft) {
                gQ.widgetNode.insertLeft = true
            }
        }
        if (gQ.collapsed) {
            if (z(gV, gT.line, gT, gU, gQ) || gT.line != gU.line && z(gV, gU.line, gT, gU, gQ)) {
                throw new Error("Inserting collapsed marker partially overlapping an existing one")
            }
            bA()
        }
        if (gQ.addToHistory) {
            f9(gV, {
                from: gT,
                to: gU,
                origin: "markText"
            }, gV.sel, NaN)
        }
        var gO = gT.line,
            gS = gV.cm,
            gN;
        gV.iter(gO, gU.line + 1, function(i) {
            if (gS && gQ.collapsed && !gS.options.lineWrapping && y(i) == gS.display.maxLine) {
                gN = true
            }
            if (gQ.collapsed && gO != gT.line) {
                gz(i, 0)
            }
            cj(i, new ev(gQ, gO == gT.line ? gT.ch : null, gO == gU.line ? gU.ch : null));
            ++gO
        });
        if (gQ.collapsed) {
            gV.iter(gT.line, gU.line + 1, function(i) {
                if (fP(gV, i)) {
                    gz(i, 0)
                }
            })
        }
        if (gQ.clearOnEnter) {
            b1(gQ, "beforeCursorEnter", function() {
                return gQ.clear()
            })
        }
        if (gQ.readOnly) {
            fU();
            if (gV.history.done.length || gV.history.undone.length) {
                gV.clearHistory()
            }
        }
        if (gQ.collapsed) {
            gQ.id = ++a5;
            gQ.atomic = true
        }
        if (gS) {
            if (gN) {
                gS.curOp.updateMaxLine = true
            }
            if (gQ.collapsed) {
                ah(gS, gT.line, gU.line + 1)
            } else {
                if (gQ.className || gQ.title || gQ.startStyle || gQ.endStyle || gQ.css) {
                    for (var gP = gT.line; gP <= gU.line; gP++) {
                        R(gS, gP, "text")
                    }
                }
            }
            if (gQ.atomic) {
                eM(gS.doc)
            }
            ae(gS, "markerAdded", gS, gQ)
        }
        return gQ
    }

    function x(gP, gO) {
        var gQ = this;
        this.markers = gP;
        this.primary = gO;
        for (var gN = 0; gN < gP.length; ++gN) {
            gP[gN].parent = gQ
        }
    }
    bD(x);
    x.prototype.clear = function() {
        var gO = this;
        if (this.explicitlyCleared) {
            return
        }
        this.explicitlyCleared = true;
        for (var gN = 0; gN < this.markers.length; ++gN) {
            gO.markers[gN].clear()
        }
        ae(this, "clear")
    };
    x.prototype.find = function(gN, i) {
        return this.primary.find(gN, i)
    };

    function N(gQ, gT, gS, i, gO) {
        i = aO(i);
        i.shared = false;
        var gR = [eV(gQ, gT, gS, i, gO)],
            gN = gR[0];
        var gP = i.widgetNode;
        ei(gQ, function(gV) {
            if (gP) {
                i.widgetNode = gP.cloneNode(true)
            }
            gR.push(eV(gV, f7(gV, gT), f7(gV, gS), i, gO));
            for (var gU = 0; gU < gV.linked.length; ++gU) {
                if (gV.linked[gU].isParent) {
                    return
                }
            }
            gN = f2(gR)
        });
        return new x(gR, gN)
    }

    function e6(i) {
        return i.findMarks(W(i.first, 0), i.clipPos(W(i.lastLine())), function(gN) {
            return gN.parent
        })
    }

    function dO(gS, gT) {
        for (var gQ = 0; gQ < gT.length; gQ++) {
            var gO = gT[gQ],
                gU = gO.find();
            var gN = gS.clipPos(gU.from),
                gR = gS.clipPos(gU.to);
            if (cl(gN, gR)) {
                var gP = eV(gS, gN, gR, gO.primary, gO.primary.type);
                gO.markers.push(gP);
                gP.parent = gO
            }
        }
    }

    function eB(gP) {
        var gN = function(gS) {
            var gQ = gP[gS],
                gU = [gQ.primary.doc];
            ei(gQ.primary.doc, function(i) {
                return gU.push(i)
            });
            for (var gR = 0; gR < gQ.markers.length; gR++) {
                var gT = gQ.markers[gR];
                if (ds(gU, gT.doc) == -1) {
                    gT.parent = null;
                    gQ.markers.splice(gR--, 1)
                }
            }
        };
        for (var gO = 0; gO < gP.length; gO++) {
            gN(gO)
        }
    }
    var cx = 0;
    var au = function(gP, gO, i, gN) {
        if (!(this instanceof au)) {
            return new au(gP, gO, i, gN)
        }
        if (i == null) {
            i = 0
        }
        fR.call(this, [new fi([new gy("", null)])]);
        this.first = i;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.frontier = i;
        var gQ = W(i, 0);
        this.sel = e9(gQ);
        this.history = new gk(null);
        this.id = ++cx;
        this.modeOption = gO;
        this.lineSep = gN;
        this.extend = false;
        if (typeof gP == "string") {
            gP = this.splitLines(gP)
        }
        fS(this, {
            from: gQ,
            to: gQ,
            text: gP
        });
        bY(this, e9(gQ), Z)
    };
    au.prototype = cq(fR.prototype, {
        constructor: au,
        iter: function(gO, gN, i) {
            if (i) {
                this.iterN(gO - this.first, gN - gO, i)
            } else {
                this.iterN(this.first, this.first + this.size, gO)
            }
        },
        insert: function(gO, gP) {
            var gN = 0;
            for (var gQ = 0; gQ < gP.length; ++gQ) {
                gN += gP[gQ].height
            }
            this.insertInner(gO - this.first, gP, gN)
        },
        remove: function(i, gN) {
            this.removeInner(i - this.first, gN)
        },
        getValue: function(gN) {
            var i = a3(this, this.first, this.first + this.size);
            if (gN === false) {
                return i
            }
            return i.join(gN || this.lineSeparator())
        },
        setValue: cJ(function(gN) {
            var gO = W(this.first, 0),
                i = this.first + this.size - 1;
            bh(this, {
                from: gO,
                to: W(i, fy(this, i).text.length),
                text: this.splitLines(gN),
                origin: "setValue",
                full: true
            }, true);
            bY(this, e9(gO))
        }),
        replaceRange: function(gN, gP, gO, i) {
            gP = f7(this, gP);
            gO = gO ? f7(this, gO) : gP;
            a2(this, gN, gP, gO, i)
        },
        getRange: function(gP, gO, gN) {
            var i = gw(this, f7(this, gP), f7(this, gO));
            if (gN === false) {
                return i
            }
            return i.join(gN || this.lineSeparator())
        },
        getLine: function(gN) {
            var i = this.getLineHandle(gN);
            return i && i.text
        },
        getLineHandle: function(i) {
            if (ce(this, i)) {
                return fy(this, i)
            }
        },
        getLineNumber: function(i) {
            return bR(i)
        },
        getLineHandleVisualStart: function(i) {
            if (typeof i == "number") {
                i = fy(this, i)
            }
            return y(i)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(i) {
            return f7(this, i)
        },
        getCursor: function(gO) {
            var i = this.sel.primary(),
                gN;
            if (gO == null || gO == "head") {
                gN = i.head
            } else {
                if (gO == "anchor") {
                    gN = i.anchor
                } else {
                    if (gO == "end" || gO == "to" || gO === false) {
                        gN = i.to()
                    } else {
                        gN = i.from()
                    }
                }
            }
            return gN
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: cJ(function(i, gO, gN) {
            F(this, f7(this, typeof i == "number" ? W(i, gO || 0) : i), null, gN)
        }),
        setSelection: cJ(function(gN, gO, i) {
            F(this, f7(this, gN), f7(this, gO || gN), i)
        }),
        extendSelection: cJ(function(gO, i, gN) {
            gp(this, f7(this, gO), i && f7(this, i), gN)
        }),
        extendSelections: cJ(function(gN, i) {
            aw(this, ea(this, gN), i)
        }),
        extendSelectionsBy: cJ(function(gO, i) {
            var gN = bX(this.sel.ranges, gO);
            aw(this, ea(this, gN), i)
        }),
        setSelections: cJ(function(gN, gR, gP) {
            var gS = this;
            if (!gN.length) {
                return
            }
            var gO = [];
            for (var gQ = 0; gQ < gN.length; gQ++) {
                gO[gQ] = new d7(f7(gS, gN[gQ].anchor), f7(gS, gN[gQ].head))
            }
            if (gR == null) {
                gR = Math.min(gN.length - 1, this.sel.primIndex)
            }
            bY(this, cC(gO, gR), gP)
        }),
        addSelection: cJ(function(gO, gP, gN) {
            var i = this.sel.ranges.slice(0);
            i.push(new d7(f7(this, gO), f7(this, gP || gO)));
            bY(this, cC(i, i.length - 1), gN)
        }),
        getSelection: function(gR) {
            var gS = this;
            var gO = this.sel.ranges,
                gN;
            for (var gP = 0; gP < gO.length; gP++) {
                var gQ = gw(gS, gO[gP].from(), gO[gP].to());
                gN = gN ? gN.concat(gQ) : gQ
            }
            if (gR === false) {
                return gN
            } else {
                return gN.join(gR || this.lineSeparator())
            }
        },
        getSelections: function(gR) {
            var gS = this;
            var gQ = [],
                gN = this.sel.ranges;
            for (var gO = 0; gO < gN.length; gO++) {
                var gP = gw(gS, gN[gO].from(), gN[gO].to());
                if (gR !== false) {
                    gP = gP.join(gR || gS.lineSeparator())
                }
                gQ[gO] = gP
            }
            return gQ
        },
        replaceSelection: function(gP, gR, gN) {
            var gQ = [];
            for (var gO = 0; gO < this.sel.ranges.length; gO++) {
                gQ[gO] = gP
            }
            this.replaceSelections(gQ, gR, gN || "+input")
        },
        replaceSelections: cJ(function(gO, gU, gW) {
            var gS = this;
            var gV = [],
                gQ = this.sel;
            for (var gR = 0; gR < gQ.ranges.length; gR++) {
                var gT = gQ.ranges[gR];
                gV[gR] = {
                    from: gT.from(),
                    to: gT.to(),
                    text: gS.splitLines(gO[gR]),
                    origin: gW
                }
            }
            var gN = gU && gU != "end" && af(this, gV, gU);
            for (var gP = gV.length - 1; gP >= 0; gP--) {
                bh(gS, gV[gP])
            }
            if (gN) {
                fr(this, gN)
            } else {
                if (this.cm) {
                    f1(this.cm)
                }
            }
        }),
        undo: cJ(function() {
            cd(this, "undo")
        }),
        redo: cJ(function() {
            cd(this, "redo")
        }),
        undoSelection: cJ(function() {
            cd(this, "undo", true)
        }),
        redoSelection: cJ(function() {
            cd(this, "redo", true)
        }),
        setExtending: function(i) {
            this.extend = i
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            var gQ = this.history,
                gN = 0,
                gP = 0;
            for (var gO = 0; gO < gQ.done.length; gO++) {
                if (!gQ.done[gO].ranges) {
                    ++gN
                }
            }
            for (var gR = 0; gR < gQ.undone.length; gR++) {
                if (!gQ.undone[gR].ranges) {
                    ++gP
                }
            }
            return {
                undo: gN,
                redo: gP
            }
        },
        clearHistory: function() {
            this.history = new gk(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(true)
        },
        changeGeneration: function(i) {
            if (i) {
                this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null
            }
            return this.history.generation
        },
        isClean: function(i) {
            return this.history.generation == (i || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: bT(this.history.done),
                undone: bT(this.history.undone)
            }
        },
        setHistory: function(gN) {
            var i = this.history = new gk(this.history.maxGeneration);
            i.done = bT(gN.done.slice(0), null, true);
            i.undone = bT(gN.undone.slice(0), null, true)
        },
        setGutterMarker: cJ(function(i, gN, gO) {
            return eO(this, i, "gutter", function(gP) {
                var gQ = gP.gutterMarkers || (gP.gutterMarkers = {});
                gQ[gN] = gO;
                if (!gO && fd(gQ)) {
                    gP.gutterMarkers = null
                }
                return true
            })
        }),
        clearGutter: cJ(function(i) {
            var gN = this;
            this.iter(function(gO) {
                if (gO.gutterMarkers && gO.gutterMarkers[i]) {
                    eO(gN, gO, "gutter", function() {
                        gO.gutterMarkers[i] = null;
                        if (fd(gO.gutterMarkers)) {
                            gO.gutterMarkers = null
                        }
                        return true
                    })
                }
            })
        }),
        lineInfo: function(i) {
            var gN;
            if (typeof i == "number") {
                if (!ce(this, i)) {
                    return null
                }
                gN = i;
                i = fy(this, i);
                if (!i) {
                    return null
                }
            } else {
                gN = bR(i);
                if (gN == null) {
                    return null
                }
            }
            return {
                line: gN,
                handle: i,
                text: i.text,
                gutterMarkers: i.gutterMarkers,
                textClass: i.textClass,
                bgClass: i.bgClass,
                wrapClass: i.wrapClass,
                widgets: i.widgets
            }
        },
        addLineClass: cJ(function(gO, gN, i) {
            return eO(this, gO, gN == "gutter" ? "gutter" : "class", function(gP) {
                var gQ = gN == "text" ? "textClass" : gN == "background" ? "bgClass" : gN == "gutter" ? "gutterClass" : "wrapClass";
                if (!gP[gQ]) {
                    gP[gQ] = i
                } else {
                    if (S(i).test(gP[gQ])) {
                        return false
                    } else {
                        gP[gQ] += " " + i
                    }
                }
                return true
            })
        }),
        removeLineClass: cJ(function(gO, gN, i) {
            return eO(this, gO, gN == "gutter" ? "gutter" : "class", function(gQ) {
                var gT = gN == "text" ? "textClass" : gN == "background" ? "bgClass" : gN == "gutter" ? "gutterClass" : "wrapClass";
                var gS = gQ[gT];
                if (!gS) {
                    return false
                } else {
                    if (i == null) {
                        gQ[gT] = null
                    } else {
                        var gR = gS.match(S(i));
                        if (!gR) {
                            return false
                        }
                        var gP = gR.index + gR[0].length;
                        gQ[gT] = gS.slice(0, gR.index) + (!gR.index || gP == gS.length ? "" : " ") + gS.slice(gP) || null
                    }
                }
                return true
            })
        }),
        addLineWidget: cJ(function(gO, gN, i) {
            return bK(this, gO, gN, i)
        }),
        removeLineWidget: function(i) {
            i.clear()
        },
        markText: function(gO, gN, i) {
            return eV(this, f7(this, gO), f7(this, gN), i, i && i.type || "range")
        },
        setBookmark: function(gO, i) {
            var gN = {
                replacedWith: i && (i.nodeType == null ? i.widget : i),
                insertLeft: i && i.insertLeft,
                clearWhenEmpty: false,
                shared: i && i.shared,
                handleMouseEvents: i && i.handleMouseEvents
            };
            gO = f7(this, gO);
            return eV(this, gO, gO, gN, "bookmark")
        },
        findMarksAt: function(gR) {
            gR = f7(this, gR);
            var gQ = [],
                gO = fy(this, gR.line).markedSpans;
            if (gO) {
                for (var gN = 0; gN < gO.length; ++gN) {
                    var gP = gO[gN];
                    if ((gP.from == null || gP.from <= gR.ch) && (gP.to == null || gP.to >= gR.ch)) {
                        gQ.push(gP.marker.parent || gP.marker)
                    }
                }
            }
            return gQ
        },
        findMarks: function(gQ, gP, i) {
            gQ = f7(this, gQ);
            gP = f7(this, gP);
            var gN = [],
                gO = gQ.line;
            this.iter(gQ.line, gP.line + 1, function(gR) {
                var gT = gR.markedSpans;
                if (gT) {
                    for (var gS = 0; gS < gT.length; gS++) {
                        var gU = gT[gS];
                        if (!(gU.to != null && gO == gQ.line && gQ.ch >= gU.to || gU.from == null && gO != gQ.line || gU.from != null && gO == gP.line && gU.from >= gP.ch) && (!i || i(gU.marker))) {
                            gN.push(gU.marker.parent || gU.marker)
                        }
                    }
                }++gO
            });
            return gN
        },
        getAllMarks: function() {
            var i = [];
            this.iter(function(gO) {
                var gN = gO.markedSpans;
                if (gN) {
                    for (var gP = 0; gP < gN.length; ++gP) {
                        if (gN[gP].from != null) {
                            i.push(gN[gP].marker)
                        }
                    }
                }
            });
            return i
        },
        posFromIndex: function(gO) {
            var i, gP = this.first,
                gN = this.lineSeparator().length;
            this.iter(function(gQ) {
                var gR = gQ.text.length + gN;
                if (gR > gO) {
                    i = gO;
                    return true
                }
                gO -= gR;
                ++gP
            });
            return f7(this, W(gP, i))
        },
        indexFromPos: function(gO) {
            gO = f7(this, gO);
            var i = gO.ch;
            if (gO.line < this.first || gO.ch < 0) {
                return 0
            }
            var gN = this.lineSeparator().length;
            this.iter(this.first, gO.line, function(gP) {
                i += gP.text.length + gN
            });
            return i
        },
        copy: function(i) {
            var gN = new au(a3(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep);
            gN.scrollTop = this.scrollTop;
            gN.scrollLeft = this.scrollLeft;
            gN.sel = this.sel;
            gN.extend = false;
            if (i) {
                gN.history.undoDepth = this.history.undoDepth;
                gN.setHistory(this.getHistory())
            }
            return gN
        },
        linkedDoc: function(i) {
            if (!i) {
                i = {}
            }
            var gP = this.first,
                gO = this.first + this.size;
            if (i.from != null && i.from > gP) {
                gP = i.from
            }
            if (i.to != null && i.to < gO) {
                gO = i.to
            }
            var gN = new au(a3(this, gP, gO), i.mode || this.modeOption, gP, this.lineSep);
            if (i.sharedHist) {
                gN.history = this.history
            }(this.linked || (this.linked = [])).push({
                doc: gN,
                sharedHist: i.sharedHist
            });
            gN.linked = [{
                doc: this,
                isParent: true,
                sharedHist: i.sharedHist
            }];
            dO(gN, e6(this));
            return gN
        },
        unlinkDoc: function(gO) {
            var gR = this;
            if (gO instanceof G) {
                gO = gO.doc
            }
            if (this.linked) {
                for (var gP = 0; gP < this.linked.length; ++gP) {
                    var gQ = gR.linked[gP];
                    if (gQ.doc != gO) {
                        continue
                    }
                    gR.linked.splice(gP, 1);
                    gO.unlinkDoc(gR);
                    eB(e6(gR));
                    break
                }
            }
            if (gO.history == this.history) {
                var gN = [gO.id];
                ei(gO, function(i) {
                    return gN.push(i.id)
                }, true);
                gO.history = new gk(null);
                gO.history.done = bT(this.history.done, gN);
                gO.history.undone = bT(this.history.undone, gN)
            }
        },
        iterLinkedDocs: function(i) {
            ei(this, i)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        },
        splitLines: function(i) {
            if (this.lineSep) {
                return i.split(this.lineSep)
            }
            return gh(i)
        },
        lineSeparator: function() {
            return this.lineSep || "\n"
        }
    });
    au.prototype.eachLine = au.prototype.iter;
    var ag = 0;

    function bl(gV) {
        var gX = this;
        dj(gX);
        if (aS(gX, gV) || bc(gX.display, gV)) {
            return
        }
        cM(gV);
        if (dT) {
            ag = +new Date
        }
        var gW = ct(gX, gV, true),
            gO = gV.dataTransfer.files;
        if (!gW || gX.isReadOnly()) {
            return
        }
        if (gO && gO.length && window.FileReader && window.File) {
            var gR = gO.length,
                gY = Array(gR),
                gP = 0;
            var gT = function(g1, g0) {
                if (gX.options.allowDropFileTypes && ds(gX.options.allowDropFileTypes, g1.type) == -1) {
                    return
                }
                var gZ = new FileReader;
                gZ.onload = c8(gX, function() {
                    var i = gZ.result;
                    if (/[\x00-\x08\x0e-\x1f]{2}/.test(i)) {
                        i = ""
                    }
                    gY[g0] = i;
                    if (++gP == gR) {
                        gW = f7(gX.doc, gW);
                        var g2 = {
                            from: gW,
                            to: gW,
                            text: gX.doc.splitLines(gY.join(gX.doc.lineSeparator())),
                            origin: "paste"
                        };
                        bh(gX.doc, g2);
                        fr(gX.doc, e9(gW, c4(g2)))
                    }
                });
                gZ.readAsText(g1)
            };
            for (var gU = 0; gU < gR; ++gU) {
                gT(gO[gU], gU)
            }
        } else {
            if (gX.state.draggingText && gX.doc.sel.contains(gW) > -1) {
                gX.state.draggingText(gV);
                setTimeout(function() {
                    return gX.display.input.focus()
                }, 20);
                return
            }
            try {
                var gN = gV.dataTransfer.getData("Text");
                if (gN) {
                    var gS;
                    if (gX.state.draggingText && !gX.state.draggingText.copy) {
                        gS = gX.listSelections()
                    }
                    eC(gX.doc, e9(gW, gW));
                    if (gS) {
                        for (var gQ = 0; gQ < gS.length; ++gQ) {
                            a2(gX.doc, "", gS[gQ].anchor, gS[gQ].head, "drag")
                        }
                    }
                    gX.replaceSelection(gN, "around", "paste");
                    gX.display.input.focus()
                }
            } catch (gV) {}
        }
    }

    function P(i, gO) {
        if (dT && (!i.state.draggingText || +new Date - ag < 100)) {
            eE(gO);
            return
        }
        if (aS(i, gO) || bc(i.display, gO)) {
            return
        }
        gO.dataTransfer.setData("Text", i.getSelection());
        gO.dataTransfer.effectAllowed = "copyMove";
        if (gO.dataTransfer.setDragImage && !aD) {
            var gN = gv("img", null, null, "position: fixed; left: 0; top: 0;");
            gN.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            if (ed) {
                gN.width = gN.height = 1;
                i.display.wrapper.appendChild(gN);
                gN._top = gN.offsetTop
            }
            gO.dataTransfer.setDragImage(gN, 0, 0);
            if (ed) {
                gN.parentNode.removeChild(gN)
            }
        }
    }

    function gK(i, gN) {
        var gP = ct(i, gN);
        if (!gP) {
            return
        }
        var gO = document.createDocumentFragment();
        A(i, gP, gO);
        if (!i.display.dragCursor) {
            i.display.dragCursor = gv("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
            i.display.lineSpace.insertBefore(i.display.dragCursor, i.display.cursorDiv)
        }
        bW(i.display.dragCursor, gO)
    }

    function dj(i) {
        if (i.display.dragCursor) {
            i.display.lineSpace.removeChild(i.display.dragCursor);
            i.display.dragCursor = null
        }
    }

    function aB(gQ) {
        if (!document.body.getElementsByClassName) {
            return
        }
        var gP = document.body.getElementsByClassName("CodeMirror");
        for (var gO = 0; gO < gP.length; gO++) {
            var gN = gP[gO].CodeMirror;
            if (gN) {
                gQ(gN)
            }
        }
    }
    var cI = false;

    function bk() {
        if (cI) {
            return
        }
        f0();
        cI = true
    }

    function f0() {
        var i;
        b1(window, "resize", function() {
            if (i == null) {
                i = setTimeout(function() {
                    i = null;
                    aB(aU)
                }, 100)
            }
        });
        b1(window, "blur", function() {
            return aB(aW)
        })
    }

    function aU(i) {
        var gN = i.display;
        if (gN.lastWrapHeight == gN.wrapper.clientHeight && gN.lastWrapWidth == gN.wrapper.clientWidth) {
            return
        }
        gN.cachedCharWidth = gN.cachedTextHeight = gN.cachedPaddingH = null;
        gN.scrollbarsClipped = false;
        i.setSize()
    }
    var fA = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        127: "Delete",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    };
    for (var fQ = 0; fQ < 10; fQ++) {
        fA[fQ + 48] = fA[fQ + 96] = String(fQ)
    }
    for (var gj = 65; gj <= 90; gj++) {
        fA[gj] = String.fromCharCode(gj)
    }
    for (var gi = 1; gi <= 12; gi++) {
        fA[gi + 111] = fA[gi + 63235] = "F" + gi
    }
    var fu = {};
    fu.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    };
    fu.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    };
    fu.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
    };
    fu.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
    };
    fu["default"] = cc ? fu.macDefault : fu.pcDefault;

    function dC(gO) {
        var gU = gO.split(/-(?!$)/);
        gO = gU[gU.length - 1];
        var gT, gS, gN, gR;
        for (var gQ = 0; gQ < gU.length - 1; gQ++) {
            var gP = gU[gQ];
            if (/^(cmd|meta|m)$/i.test(gP)) {
                gR = true
            } else {
                if (/^a(lt)?$/i.test(gP)) {
                    gT = true
                } else {
                    if (/^(c|ctrl|control)$/i.test(gP)) {
                        gS = true
                    } else {
                        if (/^s(hift)?$/i.test(gP)) {
                            gN = true
                        } else {
                            throw new Error("Unrecognized modifier name: " + gP)
                        }
                    }
                }
            }
        }
        if (gT) {
            gO = "Alt-" + gO
        }
        if (gS) {
            gO = "Ctrl-" + gO
        }
        if (gR) {
            gO = "Cmd-" + gO
        }
        if (gN) {
            gO = "Shift-" + gO
        }
        return gO
    }

    function cN(gU) {
        var gO = {};
        for (var gT in gU) {
            if (gU.hasOwnProperty(gT)) {
                var gV = gU[gT];
                if (/^(name|fallthrough|(de|at)tach)$/.test(gT)) {
                    continue
                }
                if (gV == "...") {
                    delete gU[gT];
                    continue
                }
                var gW = bX(gT.split(" "), dC);
                for (var gS = 0; gS < gW.length; gS++) {
                    var gQ = (void 0),
                        gP = (void 0);
                    if (gS == gW.length - 1) {
                        gP = gW.join(" ");
                        gQ = gV
                    } else {
                        gP = gW.slice(0, gS + 1).join(" ");
                        gQ = "..."
                    }
                    var gR = gO[gP];
                    if (!gR) {
                        gO[gP] = gQ
                    } else {
                        if (gR != gQ) {
                            throw new Error("Inconsistent bindings for " + gP)
                        }
                    }
                }
                delete gU[gT]
            }
        }
        for (var gN in gO) {
            gU[gN] = gO[gN]
        }
        return gU
    }

    function j(gQ, gT, gS, gP) {
        gT = go(gT);
        var gR = gT.call ? gT.call(gQ, gP) : gT[gQ];
        if (gR === false) {
            return "nothing"
        }
        if (gR === "...") {
            return "multi"
        }
        if (gR != null && gS(gR)) {
            return "handled"
        }
        if (gT.fallthrough) {
            if (Object.prototype.toString.call(gT.fallthrough) != "[object Array]") {
                return j(gQ, gT.fallthrough, gS, gP)
            }
            for (var gO = 0; gO < gT.fallthrough.length; gO++) {
                var gN = j(gQ, gT.fallthrough[gO], gS, gP);
                if (gN) {
                    return gN
                }
            }
        }
    }

    function eP(gN) {
        var i = typeof gN == "string" ? gN : fA[gN.keyCode];
        return i == "Ctrl" || i == "Alt" || i == "Shift" || i == "Mod"
    }

    function fK(gN, gP) {
        if (ed && gN.keyCode == 34 && gN["char"]) {
            return false
        }
        var gO = fA[gN.keyCode],
            i = gO;
        if (i == null || gN.altGraphKey) {
            return false
        }
        if (gN.altKey && gO != "Alt") {
            i = "Alt-" + i
        }
        if ((bU ? gN.metaKey : gN.ctrlKey) && gO != "Ctrl") {
            i = "Ctrl-" + i
        }
        if ((bU ? gN.ctrlKey : gN.metaKey) && gO != "Cmd") {
            i = "Cmd-" + i
        }
        if (!gP && gN.shiftKey && gO != "Shift") {
            i = "Shift-" + i
        }
        return i
    }

    function go(i) {
        return typeof i == "string" ? fu[i] : i
    }

    function fg(gN, gT) {
        var gO = gN.doc.sel.ranges,
            gR = [];
        for (var gQ = 0; gQ < gO.length; gQ++) {
            var gP = gT(gO[gQ]);
            while (gR.length && cl(gP.from, f2(gR).to) <= 0) {
                var gS = gR.pop();
                if (cl(gS.from, gP.from) < 0) {
                    gP.from = gS.from;
                    break
                }
            }
            gR.push(gP)
        }
        cT(gN, function() {
            for (var gU = gR.length - 1; gU >= 0; gU--) {
                a2(gN.doc, "", gR[gU].from, gR[gU].to, "+delete")
            }
            f1(gN)
        })
    }
    var eS = {
        selectAll: al,
        singleSelection: function(i) {
            return i.setSelection(i.getCursor("anchor"), i.getCursor("head"), Z)
        },
        killLine: function(i) {
            return fg(i, function(gO) {
                if (gO.empty()) {
                    var gN = fy(i.doc, gO.head.line).text.length;
                    if (gO.head.ch == gN && gO.head.line < i.lastLine()) {
                        return {
                            from: gO.head,
                            to: W(gO.head.line + 1, 0)
                        }
                    } else {
                        return {
                            from: gO.head,
                            to: W(gO.head.line, gN)
                        }
                    }
                } else {
                    return {
                        from: gO.from(),
                        to: gO.to()
                    }
                }
            })
        },
        deleteLine: function(i) {
            return fg(i, function(gN) {
                return ({
                    from: W(gN.from().line, 0),
                    to: f7(i.doc, W(gN.to().line + 1, 0))
                })
            })
        },
        delLineLeft: function(i) {
            return fg(i, function(gN) {
                return ({
                    from: W(gN.from().line, 0),
                    to: gN.from()
                })
            })
        },
        delWrappedLineLeft: function(i) {
            return fg(i, function(gN) {
                var gP = i.charCoords(gN.head, "div").top + 5;
                var gO = i.coordsChar({
                    left: 0,
                    top: gP
                }, "div");
                return {
                    from: gO,
                    to: gN.from()
                }
            })
        },
        delWrappedLineRight: function(i) {
            return fg(i, function(gN) {
                var gP = i.charCoords(gN.head, "div").top + 5;
                var gO = i.coordsChar({
                    left: i.display.lineDiv.offsetWidth + 100,
                    top: gP
                }, "div");
                return {
                    from: gN.from(),
                    to: gO
                }
            })
        },
        undo: function(i) {
            return i.undo()
        },
        redo: function(i) {
            return i.redo()
        },
        undoSelection: function(i) {
            return i.undoSelection()
        },
        redoSelection: function(i) {
            return i.redoSelection()
        },
        goDocStart: function(i) {
            return i.extendSelection(W(i.firstLine(), 0))
        },
        goDocEnd: function(i) {
            return i.extendSelection(W(i.lastLine()))
        },
        goLineStart: function(i) {
            return i.extendSelectionsBy(function(gN) {
                return bw(i, gN.head.line)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineStartSmart: function(i) {
            return i.extendSelectionsBy(function(gN) {
                return dR(i, gN.head)
            }, {
                origin: "+move",
                bias: 1
            })
        },
        goLineEnd: function(i) {
            return i.extendSelectionsBy(function(gN) {
                return dZ(i, gN.head.line)
            }, {
                origin: "+move",
                bias: -1
            })
        },
        goLineRight: function(i) {
            return i.extendSelectionsBy(function(gN) {
                var gO = i.charCoords(gN.head, "div").top + 5;
                return i.coordsChar({
                    left: i.display.lineDiv.offsetWidth + 100,
                    top: gO
                }, "div")
            }, c3)
        },
        goLineLeft: function(i) {
            return i.extendSelectionsBy(function(gN) {
                var gO = i.charCoords(gN.head, "div").top + 5;
                return i.coordsChar({
                    left: 0,
                    top: gO
                }, "div")
            }, c3)
        },
        goLineLeftSmart: function(i) {
            return i.extendSelectionsBy(function(gN) {
                var gO = i.charCoords(gN.head, "div").top + 5;
                var gP = i.coordsChar({
                    left: 0,
                    top: gO
                }, "div");
                if (gP.ch < i.getLine(gP.line).search(/\S/)) {
                    return dR(i, gN.head)
                }
                return gP
            }, c3)
        },
        goLineUp: function(i) {
            return i.moveV(-1, "line")
        },
        goLineDown: function(i) {
            return i.moveV(1, "line")
        },
        goPageUp: function(i) {
            return i.moveV(-1, "page")
        },
        goPageDown: function(i) {
            return i.moveV(1, "page")
        },
        goCharLeft: function(i) {
            return i.moveH(-1, "char")
        },
        goCharRight: function(i) {
            return i.moveH(1, "char")
        },
        goColumnLeft: function(i) {
            return i.moveH(-1, "column")
        },
        goColumnRight: function(i) {
            return i.moveH(1, "column")
        },
        goWordLeft: function(i) {
            return i.moveH(-1, "word")
        },
        goGroupRight: function(i) {
            return i.moveH(1, "group")
        },
        goGroupLeft: function(i) {
            return i.moveH(-1, "group")
        },
        goWordRight: function(i) {
            return i.moveH(1, "word")
        },
        delCharBefore: function(i) {
            return i.deleteH(-1, "char")
        },
        delCharAfter: function(i) {
            return i.deleteH(1, "char")
        },
        delWordBefore: function(i) {
            return i.deleteH(-1, "word")
        },
        delWordAfter: function(i) {
            return i.deleteH(1, "word")
        },
        delGroupBefore: function(i) {
            return i.deleteH(-1, "group")
        },
        delGroupAfter: function(i) {
            return i.deleteH(1, "group")
        },
        indentAuto: function(i) {
            return i.indentSelection("smart")
        },
        indentMore: function(i) {
            return i.indentSelection("add")
        },
        indentLess: function(i) {
            return i.indentSelection("subtract")
        },
        insertTab: function(i) {
            return i.replaceSelection("\t")
        },
        insertSoftTab: function(gN) {
            var gP = [],
                gO = gN.listSelections(),
                gS = gN.options.tabSize;
            for (var gR = 0; gR < gO.length; gR++) {
                var gT = gO[gR].from();
                var gQ = bV(gN.getLine(gT.line), gT.ch, gS);
                gP.push(cv(gS - gQ % gS))
            }
            gN.replaceSelections(gP)
        },
        defaultTab: function(i) {
            if (i.somethingSelected()) {
                i.indentSelection("add")
            } else {
                i.execCommand("insertTab")
            }
        },
        transposeChars: function(i) {
            return cT(i, function() {
                var gP = i.listSelections(),
                    gO = [];
                for (var gQ = 0; gQ < gP.length; gQ++) {
                    if (!gP[gQ].empty()) {
                        continue
                    }
                    var gS = gP[gQ].head,
                        gN = fy(i.doc, gS.line).text;
                    if (gN) {
                        if (gS.ch == gN.length) {
                            gS = new W(gS.line, gS.ch - 1)
                        }
                        if (gS.ch > 0) {
                            gS = new W(gS.line, gS.ch + 1);
                            i.replaceRange(gN.charAt(gS.ch - 1) + gN.charAt(gS.ch - 2), W(gS.line, gS.ch - 2), gS, "+transpose")
                        } else {
                            if (gS.line > i.doc.first) {
                                var gR = fy(i.doc, gS.line - 1).text;
                                if (gR) {
                                    gS = new W(gS.line, 1);
                                    i.replaceRange(gN.charAt(0) + i.doc.lineSeparator() + gR.charAt(gR.length - 1), W(gS.line - 1, gR.length - 1), gS, "+transpose")
                                }
                            }
                        }
                    }
                    gO.push(new d7(gS, gS))
                }
                i.setSelections(gO)
            })
        },
        newlineAndIndent: function(i) {
            return cT(i, function() {
                var gN = i.listSelections();
                for (var gO = gN.length - 1; gO >= 0; gO--) {
                    i.replaceRange(i.doc.lineSeparator(), gN[gO].anchor, gN[gO].head, "+input")
                }
                gN = i.listSelections();
                for (var gP = 0; gP < gN.length; gP++) {
                    i.indentLine(gN[gP].from().line, null, true)
                }
                f1(i)
            })
        },
        openLine: function(i) {
            return i.replaceSelection("\n", "start")
        },
        toggleOverwrite: function(i) {
            return i.toggleOverwrite()
        }
    };

    function bw(gN, gQ) {
        var gO = fy(gN.doc, gQ);
        var gR = y(gO);
        if (gR != gO) {
            gQ = bR(gR)
        }
        var i = a(gR);
        var gP = !i ? 0 : i[0].level % 2 ? cZ(gR) : cK(gR);
        return W(gQ, gP)
    }

    function dZ(gO, gR) {
        var gN, gP = fy(gO.doc, gR);
        while (gN = eK(gP)) {
            gP = gN.find(1, true).line;
            gR = null
        }
        var i = a(gP);
        var gQ = !i ? gP.text.length : i[0].level % 2 ? cK(gP) : cZ(gP);
        return W(gR == null ? bR(gP) : gR, gQ)
    }

    function dR(gN, gS) {
        var gR = bw(gN, gS.line);
        var gO = fy(gN.doc, gR.line);
        var i = a(gO);
        if (!i || i[0].level == 0) {
            var gQ = Math.max(0, gO.text.search(/\S/));
            var gP = gS.line == gR.line && gS.ch <= gQ && gS.ch;
            return W(gR.line, gP ? 0 : gQ)
        }
        return gR
    }

    function gg(gN, gQ, i) {
        if (typeof gQ == "string") {
            gQ = eS[gQ];
            if (!gQ) {
                return false
            }
        }
        gN.display.input.ensurePolled();
        var gP = gN.display.shift,
            gO = false;
        try {
            if (gN.isReadOnly()) {
                gN.state.suppressEdits = true
            }
            if (i) {
                gN.display.shift = false
            }
            gO = gQ(gN) != ch
        } finally {
            gN.display.shift = gP;
            gN.state.suppressEdits = false
        }
        return gO
    }

    function ej(gO, gP, gR) {
        for (var gQ = 0; gQ < gO.state.keyMaps.length; gQ++) {
            var gN = j(gP, gO.state.keyMaps[gQ], gR, gO);
            if (gN) {
                return gN
            }
        }
        return (gO.options.extraKeys && j(gP, gO.options.extraKeys, gR, gO)) || j(gP, gO.options.keyMap, gR, gO)
    }
    var dV = new gM;

    function be(gN, gP, gR, gQ) {
        var gO = gN.state.keySeq;
        if (gO) {
            if (eP(gP)) {
                return "handled"
            }
            dV.set(50, function() {
                if (gN.state.keySeq == gO) {
                    gN.state.keySeq = null;
                    gN.display.input.reset()
                }
            });
            gP = gO + " " + gP
        }
        var i = ej(gN, gP, gQ);
        if (i == "multi") {
            gN.state.keySeq = gP
        }
        if (i == "handled") {
            ae(gN, "keyHandled", gN, gP, gR)
        }
        if (i == "handled" || i == "multi") {
            cM(gR);
            p(gN)
        }
        if (gO && !i && /\'$/.test(gP)) {
            cM(gR);
            return true
        }
        return !!i
    }

    function fC(i, gO) {
        var gN = fK(gO, true);
        if (!gN) {
            return false
        }
        if (gO.shiftKey && !i.state.keySeq) {
            return be(i, "Shift-" + gN, gO, function(gP) {
                return gg(i, gP, true)
            }) || be(i, gN, gO, function(gP) {
                if (typeof gP == "string" ? /^go[A-Z]/.test(gP) : gP.motion) {
                    return gg(i, gP)
                }
            })
        } else {
            return be(i, gN, gO, function(gP) {
                return gg(i, gP)
            })
        }
    }

    function eu(i, gO, gN) {
        return be(i, "'" + gN + "'", gO, function(gP) {
            return gg(i, gP, true)
        })
    }
    var dx = null;

    function q(gP) {
        var i = this;
        i.curOp.focus = dX();
        if (aS(i, gP)) {
            return
        }
        if (dT && l < 11 && gP.keyCode == 27) {
            gP.returnValue = false
        }
        var gN = gP.keyCode;
        i.display.shift = gN == 16 || gP.shiftKey;
        var gO = fC(i, gP);
        if (ed) {
            dx = gO ? gN : null;
            if (!gO && gN == 88 && !di && (cc ? gP.metaKey : gP.ctrlKey)) {
                i.replaceSelection("", null, "cut")
            }
        }
        if (gN == 18 && !/\bCodeMirror-crosshair\b/.test(i.display.lineDiv.className)) {
            at(i)
        }
    }

    function at(gN) {
        var gO = gN.display.lineDiv;
        fW(gO, "CodeMirror-crosshair");

        function i(gP) {
            if (gP.keyCode == 18 || !gP.altKey) {
                h(gO, "CodeMirror-crosshair");
                er(document, "keyup", i);
                er(document, "mouseover", i)
            }
        }
        b1(document, "keyup", i);
        b1(document, "mouseover", i)
    }

    function bi(i) {
        if (i.keyCode == 16) {
            this.doc.sel.shift = false
        }
        aS(this, i)
    }

    function cD(gQ) {
        var i = this;
        if (bc(i.display, gQ) || aS(i, gQ) || gQ.ctrlKey && !gQ.altKey || cc && gQ.metaKey) {
            return
        }
        var gP = gQ.keyCode,
            gN = gQ.charCode;
        if (ed && gP == dx) {
            dx = null;
            cM(gQ);
            return
        }
        if ((ed && (!gQ.which || gQ.which < 10)) && fC(i, gQ)) {
            return
        }
        var gO = String.fromCharCode(gN == null ? gP : gN);
        if (gO == "\x08") {
            return
        }
        if (eu(i, gQ, gO)) {
            return
        }
        i.display.input.onKeyPress(gQ)
    }

    function eI(gO) {
        var i = this,
            gN = i.display;
        if (aS(i, gO) || gN.activeTouch && gN.input.supportsTouch()) {
            return
        }
        gN.input.ensurePolled();
        gN.shift = gO.shiftKey;
        if (bc(gN, gO)) {
            if (!c7) {
                gN.scroller.draggable = false;
                setTimeout(function() {
                    return gN.scroller.draggable = true
                }, 100)
            }
            return
        }
        if (m(i, gO)) {
            return
        }
        var gP = ct(i, gO);
        window.focus();
        switch (gc(gO)) {
            case 1:
                if (i.state.selectingText) {
                    i.state.selectingText(gO)
                } else {
                    if (gP) {
                        ax(i, gO, gP)
                    } else {
                        if (L(gO) == gN.scroller) {
                            cM(gO)
                        }
                    }
                }
                break;
            case 2:
                if (c7) {
                    i.state.lastMiddleDown = +new Date
                }
                if (gP) {
                    gp(i.doc, gP)
                }
                setTimeout(function() {
                    return gN.input.focus()
                }, 20);
                cM(gO);
                break;
            case 3:
                if (gC) {
                    ay(i, gO)
                } else {
                    ak(i)
                }
                break
        }
    }
    var dw;
    var dm;

    function ax(gN, gS, gT) {
        if (dT) {
            setTimeout(cB(s, gN), 0)
        } else {
            gN.curOp.focus = dX()
        }
        var gO = +new Date,
            gQ;
        if (dm && dm.time > gO - 400 && cl(dm.pos, gT) == 0) {
            gQ = "triple"
        } else {
            if (dw && dw.time > gO - 400 && cl(dw.pos, gT) == 0) {
                gQ = "double";
                dm = {
                    time: gO,
                    pos: gT
                }
            } else {
                gQ = "single";
                dw = {
                    time: gO,
                    pos: gT
                }
            }
        }
        var gR = gN.doc.sel,
            i = cc ? gS.metaKey : gS.ctrlKey,
            gP;
        if (gN.options.dragDrop && e3 && !gN.isReadOnly() && gQ == "single" && (gP = gR.contains(gT)) > -1 && (cl((gP = gR.ranges[gP]).from(), gT) < 0 || gT.xRel > 0) && (cl(gP.to(), gT) > 0 || gT.xRel < 0)) {
            a4(gN, gS, gT, i)
        } else {
            n(gN, gS, gT, gQ, i)
        }
    }

    function a4(gO, gR, gS, gN) {
        var gQ = gO.display,
            gP = +new Date;
        var i = c8(gO, function(gT) {
            if (c7) {
                gQ.scroller.draggable = false
            }
            gO.state.draggingText = false;
            er(document, "mouseup", i);
            er(gQ.scroller, "drop", i);
            if (Math.abs(gR.clientX - gT.clientX) + Math.abs(gR.clientY - gT.clientY) < 10) {
                cM(gT);
                if (!gN && +new Date - 200 < gP) {
                    gp(gO.doc, gS)
                }
                if (c7 || dT && l == 9) {
                    setTimeout(function() {
                        document.body.focus();
                        gQ.input.focus()
                    }, 20)
                } else {
                    gQ.input.focus()
                }
            }
        });
        if (c7) {
            gQ.scroller.draggable = true
        }
        gO.state.draggingText = i;
        i.copy = cc ? gR.altKey : gR.ctrlKey;
        if (gQ.scroller.dragDrop) {
            gQ.scroller.dragDrop()
        }
        b1(document, "mouseup", i);
        b1(gQ.scroller, "drop", i)
    }

    function n(gQ, g4, gP, gN, gS) {
        var g1 = gQ.display,
            g6 = gQ.doc;
        cM(g4);
        var gO, g5, gR = g6.sel,
            i = gR.ranges;
        if (gS && !g4.shiftKey) {
            g5 = g6.sel.contains(gP);
            if (g5 > -1) {
                gO = i[g5]
            } else {
                gO = new d7(gP, gP)
            }
        } else {
            gO = g6.sel.primary();
            g5 = g6.sel.primIndex
        }
        if (f6 ? g4.shiftKey && g4.metaKey : g4.altKey) {
            gN = "rect";
            if (!gS) {
                gO = new d7(gP, gP)
            }
            gP = ct(gQ, g4, true, true);
            g5 = -1
        } else {
            if (gN == "double") {
                var g2 = gQ.findWordAt(gP);
                if (gQ.display.shift || g6.extend) {
                    gO = fO(g6, gO, g2.anchor, g2.head)
                } else {
                    gO = g2
                }
            } else {
                if (gN == "triple") {
                    var gV = new d7(W(gP.line, 0), f7(g6, W(gP.line + 1, 0)));
                    if (gQ.display.shift || g6.extend) {
                        gO = fO(g6, gO, gV.anchor, gV.head)
                    } else {
                        gO = gV
                    }
                } else {
                    gO = fO(g6, gO, gP)
                }
            }
        }
        if (!gS) {
            g5 = 0;
            bY(g6, new gu([gO], 0), M);
            gR = g6.sel
        } else {
            if (g5 == -1) {
                g5 = i.length;
                bY(g6, cC(i.concat([gO]), g5), {
                    scroll: false,
                    origin: "*mouse"
                })
            } else {
                if (i.length > 1 && i[g5].empty() && gN == "single" && !g4.shiftKey) {
                    bY(g6, cC(i.slice(0, g5).concat(i.slice(g5 + 1)), 0), {
                        scroll: false,
                        origin: "*mouse"
                    });
                    gR = g6.sel
                } else {
                    e(g6, g5, gO, M)
                }
            }
        }
        var g0 = gP;

        function gZ(hi) {
            if (cl(g0, hi) == 0) {
                return
            }
            g0 = hi;
            if (gN == "rect") {
                var g9 = [],
                    hf = gQ.options.tabSize;
                var g8 = bV(fy(g6, gP.line).text, gP.ch, hf);
                var hl = bV(fy(g6, hi.line).text, hi.ch, hf);
                var ha = Math.min(g8, hl),
                    hj = Math.max(g8, hl);
                for (var hm = Math.min(gP.line, hi.line), hc = Math.min(gQ.lastLine(), Math.max(gP.line, hi.line)); hm <= hc; hm++) {
                    var hk = fy(g6, hm).text,
                        hb = eD(hk, ha, hf);
                    if (ha == hj) {
                        g9.push(new d7(W(hm, hb), W(hm, hb)))
                    } else {
                        if (hk.length > hb) {
                            g9.push(new d7(W(hm, hb), W(hm, eD(hk, hj, hf))))
                        }
                    }
                }
                if (!g9.length) {
                    g9.push(new d7(gP, gP))
                }
                bY(g6, cC(gR.ranges.slice(0, g5).concat(g9), g5), {
                    origin: "*mouse",
                    scroll: false
                });
                gQ.scrollIntoView(hi)
            } else {
                var hg = gO;
                var hd = hg.anchor,
                    hh = hi;
                if (gN != "single") {
                    var he;
                    if (gN == "double") {
                        he = gQ.findWordAt(hi)
                    } else {
                        he = new d7(W(hi.line, 0), f7(g6, W(hi.line + 1, 0)))
                    }
                    if (cl(he.anchor, hd) > 0) {
                        hh = he.head;
                        hd = ar(hg.from(), he.anchor)
                    } else {
                        hh = he.anchor;
                        hd = bB(hg.to(), he.head)
                    }
                }
                var g7 = gR.ranges.slice(0);
                g7[g5] = new d7(f7(g6, hd), hh);
                bY(g6, cC(g7, g5), M)
            }
        }
        var gX = g1.wrapper.getBoundingClientRect();
        var gT = 0;

        function g3(g9) {
            var g7 = ++gT;
            var hb = ct(gQ, g9, true, gN == "rect");
            if (!hb) {
                return
            }
            if (cl(hb, g0) != 0) {
                gQ.curOp.focus = dX();
                gZ(hb);
                var ha = cb(g1, g6);
                if (hb.line >= ha.to || hb.line < ha.from) {
                    setTimeout(c8(gQ, function() {
                        if (gT == g7) {
                            g3(g9)
                        }
                    }), 150)
                }
            } else {
                var g8 = g9.clientY < gX.top ? -20 : g9.clientY > gX.bottom ? 20 : 0;
                if (g8) {
                    setTimeout(c8(gQ, function() {
                        if (gT != g7) {
                            return
                        }
                        g1.scroller.scrollTop += g8;
                        g3(g9)
                    }), 50)
                }
            }
        }

        function gW(g7) {
            gQ.state.selectingText = false;
            gT = Infinity;
            cM(g7);
            g1.input.focus();
            er(document, "mousemove", gY);
            er(document, "mouseup", gU);
            g6.history.lastSelOrigin = null
        }
        var gY = c8(gQ, function(g7) {
            if (!gc(g7)) {
                gW(g7)
            } else {
                g3(g7)
            }
        });
        var gU = c8(gQ, gW);
        gQ.state.selectingText = gU;
        b1(document, "mousemove", gY);
        b1(document, "mouseup", gU)
    }

    function gL(gX, gT, gV, gW) {
        var gO, gN;
        try {
            gO = gT.clientX;
            gN = gT.clientY
        } catch (gT) {
            return false
        }
        if (gO >= Math.floor(gX.display.gutters.getBoundingClientRect().right)) {
            return false
        }
        if (gW) {
            cM(gT)
        }
        var gU = gX.display;
        var gS = gU.lineDiv.getBoundingClientRect();
        if (gN > gS.bottom || !fE(gX, gV)) {
            return bP(gT)
        }
        gN -= gS.top - gU.viewOffset;
        for (var gQ = 0; gQ < gX.options.gutters.length; ++gQ) {
            var gR = gU.gutters.childNodes[gQ];
            if (gR && gR.getBoundingClientRect().right >= gO) {
                var gY = bL(gX.doc, gN);
                var gP = gX.options.gutters[gQ];
                aF(gX, gV, gX, gY, gP, gT);
                return bP(gT)
            }
        }
    }

    function m(i, gN) {
        return gL(i, gN, "gutterClick", true)
    }

    function ay(i, gN) {
        if (bc(i.display, gN) || dq(i, gN)) {
            return
        }
        if (aS(i, gN, "contextmenu")) {
            return
        }
        i.display.input.onContextMenu(gN)
    }

    function dq(i, gN) {
        if (!fE(i, "gutterContextMenu")) {
            return false
        }
        return gL(i, gN, "gutterContextMenu", false)
    }

    function cU(i) {
        i.display.wrapper.className = i.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + i.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        aj(i)
    }
    var ci = {
        toString: function() {
            return "CodeMirror.Init"
        }
    };
    var fl = {};
    var bg = {};

    function eX(i) {
        var gO = i.optionHandlers;

        function gN(gP, gS, gR, gQ) {
            i.defaults[gP] = gS;
            if (gR) {
                gO[gP] = gQ ? function(gT, gV, gU) {
                    if (gU != ci) {
                        gR(gT, gV, gU)
                    }
                } : gR
            }
        }
        i.defineOption = gN;
        i.Init = ci;
        gN("value", "", function(gP, gQ) {
            return gP.setValue(gQ)
        }, true);
        gN("mode", null, function(gP, gQ) {
            gP.doc.modeOption = gQ;
            bu(gP)
        }, true);
        gN("indentUnit", 2, bu, true);
        gN("indentWithTabs", false);
        gN("smartIndent", true);
        gN("tabSize", 4, function(gP) {
            ey(gP);
            aj(gP);
            ah(gP)
        }, true);
        gN("lineSeparator", null, function(gP, gS) {
            gP.doc.lineSep = gS;
            if (!gS) {
                return
            }
            var gR = [],
                gT = gP.doc.first;
            gP.doc.iter(function(gU) {
                for (var gW = 0;;) {
                    var gV = gU.text.indexOf(gS, gW);
                    if (gV == -1) {
                        break
                    }
                    gW = gV + gS.length;
                    gR.push(W(gT, gV))
                }
                gT++
            });
            for (var gQ = gR.length - 1; gQ >= 0; gQ--) {
                a2(gP.doc, gS, gR[gQ], W(gR[gQ].line, gR[gQ].ch + gS.length))
            }
        });
        gN("specialChars", /[\u0000-\u001f\u007f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function(gP, gR, gQ) {
            gP.state.specialChars = new RegExp(gR.source + (gR.test("\t") ? "" : "|\t"), "g");
            if (gQ != ci) {
                gP.refresh()
            }
        });
        gN("specialCharPlaceholder", fx, function(gP) {
            return gP.refresh()
        }, true);
        gN("electricChars", true);
        gN("inputStyle", es ? "contenteditable" : "textarea", function() {
            throw new Error("inputStyle can not (yet) be changed in a running editor")
        }, true);
        gN("spellcheck", false, function(gP, gQ) {
            return gP.getInputField().spellcheck = gQ
        }, true);
        gN("rtlMoveVisually", !aQ);
        gN("wholeLineUpdateBefore", true);
        gN("theme", "default", function(gP) {
            cU(gP);
            dF(gP)
        }, true);
        gN("keyMap", "default", function(gP, gT, gQ) {
            var gR = go(gT);
            var gS = gQ != ci && go(gQ);
            if (gS && gS.detach) {
                gS.detach(gP, gR)
            }
            if (gR.attach) {
                gR.attach(gP, gS || null)
            }
        });
        gN("extraKeys", null);
        gN("lineWrapping", false, eW, true);
        gN("gutters", [], function(gP) {
            ck(gP.options);
            dF(gP)
        }, true);
        gN("fixedGutter", true, function(gP, gQ) {
            gP.display.gutters.style.left = gQ ? d8(gP.display) + "px" : "0";
            gP.refresh()
        }, true);
        gN("coverGutterNextToScrollbar", false, function(gP) {
            return fh(gP)
        }, true);
        gN("scrollbarStyle", "native", function(gP) {
            aE(gP);
            fh(gP);
            gP.display.scrollbars.setScrollTop(gP.doc.scrollTop);
            gP.display.scrollbars.setScrollLeft(gP.doc.scrollLeft)
        }, true);
        gN("lineNumbers", false, function(gP) {
            ck(gP.options);
            dF(gP)
        }, true);
        gN("firstLineNumber", 1, dF, true);
        gN("lineNumberFormatter", function(gP) {
            return gP
        }, dF, true);
        gN("showCursorWhenSelecting", false, bG, true);
        gN("resetSelectionOnContextMenu", true);
        gN("lineWiseCopyCut", true);
        gN("readOnly", false, function(gP, gQ) {
            if (gQ == "nocursor") {
                aW(gP);
                gP.display.input.blur();
                gP.display.disabled = true
            } else {
                gP.display.disabled = false
            }
            gP.display.input.readOnlyChanged(gQ)
        });
        gN("disableInput", false, function(gP, gQ) {
            if (!gQ) {
                gP.display.input.reset()
            }
        }, true);
        gN("dragDrop", true, gs);
        gN("allowDropFileTypes", null);
        gN("cursorBlinkRate", 530);
        gN("cursorScrollMargin", 25);
        gN("cursorHeight", 1, bG, true);
        gN("singleCursorHeightPerLine", true, bG, true);
        gN("workTime", 100);
        gN("workDelay", 100);
        gN("flattenSpans", true, ey, true);
        gN("addModeClass", false, ey, true);
        gN("pollInterval", 100);
        gN("undoDepth", 200, function(gP, gQ) {
            return gP.doc.history.undoDepth = gQ
        });
        gN("historyEventDelay", 1250);
        gN("viewportMargin", 10, function(gP) {
            return gP.refresh()
        }, true);
        gN("maxHighlightLength", 10000, ey, true);
        gN("moveInputWithCursor", true, function(gP, gQ) {
            if (!gQ) {
                gP.display.input.resetPosition()
            }
        });
        gN("tabindex", null, function(gP, gQ) {
            return gP.display.input.getField().tabIndex = gQ || ""
        });
        gN("autofocus", null)
    }

    function dF(i) {
        eo(i);
        ah(i);
        eU(i)
    }

    function gs(gN, gQ, gO) {
        var gR = gO && gO != ci;
        if (!gQ != !gR) {
            var gP = gN.display.dragFunctions;
            var i = gQ ? b1 : er;
            i(gN.display.scroller, "dragstart", gP.start);
            i(gN.display.scroller, "dragenter", gP.enter);
            i(gN.display.scroller, "dragover", gP.over);
            i(gN.display.scroller, "dragleave", gP.leave);
            i(gN.display.scroller, "drop", gP.drop)
        }
    }

    function eW(i) {
        if (i.options.lineWrapping) {
            fW(i.display.wrapper, "CodeMirror-wrap");
            i.display.sizer.style.minWidth = "";
            i.display.sizerWidth = null
        } else {
            h(i.display.wrapper, "CodeMirror-wrap");
            f(i)
        }
        Y(i);
        ah(i);
        aj(i);
        setTimeout(function() {
            return fh(i)
        }, 100)
    }

    function G(gN, gP) {
        var gU = this;
        if (!(this instanceof G)) {
            return new G(gN, gP)
        }
        this.options = gP = gP ? aO(gP) : {};
        aO(fl, gP, false);
        ck(gP);
        var gT = gP.value;
        if (typeof gT == "string") {
            gT = new au(gT, gP.mode, null, gP.lineSeparator)
        }
        this.doc = gT;
        var gO = new G.inputStyles[gP.inputStyle](this);
        var gS = this.display = new eZ(gN, gT, gO);
        gS.wrapper.CodeMirror = this;
        eo(this);
        cU(this);
        if (gP.lineWrapping) {
            this.display.wrapper.className += " CodeMirror-wrap"
        }
        aE(this);
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: false,
            delayingBlurEvent: false,
            focused: false,
            suppressEdits: false,
            pasteIncoming: false,
            cutIncoming: false,
            selectingText: false,
            draggingText: false,
            highlight: new gM(),
            keySeq: null,
            specialChars: null
        };
        if (gP.autofocus && !es) {
            gS.input.focus()
        }
        if (dT && l < 11) {
            setTimeout(function() {
                return gU.display.input.reset(true)
            }, 20)
        }
        gf(this);
        bk();
        cP(this);
        this.curOp.forceUpdate = true;
        en(this, gT);
        if ((gP.autofocus && !es) || this.hasFocus()) {
            setTimeout(cB(cH, this), 20)
        } else {
            aW(this)
        }
        for (var gR in bg) {
            if (bg.hasOwnProperty(gR)) {
                bg[gR](gU, gP[gR], ci)
            }
        }
        eg(this);
        if (gP.finishInit) {
            gP.finishInit(this)
        }
        for (var gQ = 0; gQ < a9.length; ++gQ) {
            a9[gQ](gU)
        }
        am(this);
        if (c7 && gP.lineWrapping && getComputedStyle(gS.lineDiv).textRendering == "optimizelegibility") {
            gS.lineDiv.style.textRendering = "auto"
        }
    }
    G.defaults = fl;
    G.optionHandlers = bg;

    function gf(gN) {
        var gR = gN.display;
        b1(gR.scroller, "mousedown", c8(gN, eI));
        if (dT && l < 11) {
            b1(gR.scroller, "dblclick", c8(gN, function(gV) {
                if (aS(gN, gV)) {
                    return
                }
                var gW = ct(gN, gV);
                if (!gW || m(gN, gV) || bc(gN.display, gV)) {
                    return
                }
                cM(gV);
                var gU = gN.findWordAt(gW);
                gp(gN.doc, gU.anchor, gU.head)
            }))
        } else {
            b1(gR.scroller, "dblclick", function(gU) {
                return aS(gN, gU) || cM(gU)
            })
        }
        if (!gC) {
            b1(gR.scroller, "contextmenu", function(gU) {
                return ay(gN, gU)
            })
        }
        var gT, i = {
            end: 0
        };

        function gS() {
            if (gR.activeTouch) {
                gT = setTimeout(function() {
                    return gR.activeTouch = null
                }, 1000);
                i = gR.activeTouch;
                i.end = +new Date
            }
        }

        function gP(gU) {
            if (gU.touches.length != 1) {
                return false
            }
            var gV = gU.touches[0];
            return gV.radiusX <= 1 && gV.radiusY <= 1
        }

        function gO(gX, gU) {
            if (gU.left == null) {
                return true
            }
            var gW = gU.left - gX.left,
                gV = gU.top - gX.top;
            return gW * gW + gV * gV > 20 * 20
        }
        b1(gR.scroller, "touchstart", function(gV) {
            if (!aS(gN, gV) && !gP(gV)) {
                gR.input.ensurePolled();
                clearTimeout(gT);
                var gU = +new Date;
                gR.activeTouch = {
                    start: gU,
                    moved: false,
                    prev: gU - i.end <= 300 ? i : null
                };
                if (gV.touches.length == 1) {
                    gR.activeTouch.left = gV.touches[0].pageX;
                    gR.activeTouch.top = gV.touches[0].pageY
                }
            }
        });
        b1(gR.scroller, "touchmove", function() {
            if (gR.activeTouch) {
                gR.activeTouch.moved = true
            }
        });
        b1(gR.scroller, "touchend", function(gV) {
            var gX = gR.activeTouch;
            if (gX && !bc(gR, gV) && gX.left != null && !gX.moved && new Date - gX.start < 300) {
                var gW = gN.coordsChar(gR.activeTouch, "page"),
                    gU;
                if (!gX.prev || gO(gX, gX.prev)) {
                    gU = new d7(gW, gW)
                } else {
                    if (!gX.prev.prev || gO(gX, gX.prev.prev)) {
                        gU = gN.findWordAt(gW)
                    } else {
                        gU = new d7(W(gW.line, 0), f7(gN.doc, W(gW.line + 1, 0)))
                    }
                }
                gN.setSelection(gU.anchor, gU.head);
                gN.focus();
                cM(gV)
            }
            gS()
        });
        b1(gR.scroller, "touchcancel", gS);
        b1(gR.scroller, "scroll", function() {
            if (gR.scroller.clientHeight) {
                O(gN, gR.scroller.scrollTop);
                bI(gN, gR.scroller.scrollLeft, true);
                aF(gN, "scroll", gN)
            }
        });
        b1(gR.scroller, "mousewheel", function(gU) {
            return c(gN, gU)
        });
        b1(gR.scroller, "DOMMouseScroll", function(gU) {
            return c(gN, gU)
        });
        b1(gR.wrapper, "scroll", function() {
            return gR.wrapper.scrollTop = gR.wrapper.scrollLeft = 0
        });
        gR.dragFunctions = {
            enter: function(gU) {
                if (!aS(gN, gU)) {
                    eE(gU)
                }
            },
            over: function(gU) {
                if (!aS(gN, gU)) {
                    gK(gN, gU);
                    eE(gU)
                }
            },
            start: function(gU) {
                return P(gN, gU)
            },
            drop: c8(gN, bl),
            leave: function(gU) {
                if (!aS(gN, gU)) {
                    dj(gN)
                }
            }
        };
        var gQ = gR.input.getField();
        b1(gQ, "keyup", function(gU) {
            return bi.call(gN, gU)
        });
        b1(gQ, "keydown", c8(gN, q));
        b1(gQ, "keypress", c8(gN, cD));
        b1(gQ, "focus", function(gU) {
            return cH(gN, gU)
        });
        b1(gQ, "blur", function(gU) {
            return aW(gN, gU)
        })
    }
    var a9 = [];
    G.defineInitHook = function(i) {
        return a9.push(i)
    };

    function ac(g2, gR, g1, gP) {
        var g0 = g2.doc,
            gO;
        if (g1 == null) {
            g1 = "add"
        }
        if (g1 == "smart") {
            if (!g0.mode.indent) {
                g1 = "prev"
            } else {
                gO = dL(g2, gR)
            }
        }
        var gV = g2.options.tabSize;
        var g3 = fy(g0, gR),
            gU = bV(g3.text, null, gV);
        if (g3.stateAfter) {
            g3.stateAfter = null
        }
        var gN = g3.text.match(/^\s*/)[0],
            gY;
        if (!gP && !/\S/.test(g3.text)) {
            gY = 0;
            g1 = "not"
        } else {
            if (g1 == "smart") {
                gY = g0.mode.indent(gO, g3.text.slice(gN.length), g3.text);
                if (gY == ch || gY > 150) {
                    if (!gP) {
                        return
                    }
                    g1 = "prev"
                }
            }
        }
        if (g1 == "prev") {
            if (gR > g0.first) {
                gY = bV(fy(g0, gR - 1).text, null, gV)
            } else {
                gY = 0
            }
        } else {
            if (g1 == "add") {
                gY = gU + g2.options.indentUnit
            } else {
                if (g1 == "subtract") {
                    gY = gU - g2.options.indentUnit
                } else {
                    if (typeof g1 == "number") {
                        gY = gU + g1
                    }
                }
            }
        }
        gY = Math.max(0, gY);
        var gZ = "",
            gX = 0;
        if (g2.options.indentWithTabs) {
            for (var gS = Math.floor(gY / gV); gS; --gS) {
                gX += gV;
                gZ += "\t"
            }
        }
        if (gX < gY) {
            gZ += cv(gY - gX)
        }
        if (gZ != gN) {
            a2(g0, gZ, W(gR, 0), W(gR, gN.length), "+input");
            g3.stateAfter = null;
            return true
        } else {
            for (var gQ = 0; gQ < g0.sel.ranges.length; gQ++) {
                var gT = g0.sel.ranges[gQ];
                if (gT.head.line == gR && gT.head.ch < gN.length) {
                    var gW = W(gR, gN.length);
                    e(g0, gQ, new d7(gW, gW));
                    break
                }
            }
        }
    }
    var bn = null;

    function dd(i) {
        bn = i
    }

    function gq(g2, gS, gQ, gP, g1) {
        var g0 = g2.doc;
        g2.display.shift = false;
        if (!gP) {
            gP = g0.sel
        }
        var gR = g2.state.pasteIncoming || g1 == "paste";
        var gV = gh(gS),
            gN = null;
        if (gR && gP.ranges.length > 1) {
            if (bn && bn.text.join("\n") == gS) {
                if (gP.ranges.length % bn.text.length == 0) {
                    gN = [];
                    for (var gT = 0; gT < bn.text.length; gT++) {
                        gN.push(g0.splitLines(bn.text[gT]))
                    }
                }
            } else {
                if (gV.length == gP.ranges.length) {
                    gN = bX(gV, function(i) {
                        return [i]
                    })
                }
            }
        }
        var gW;
        for (var gO = gP.ranges.length - 1; gO >= 0; gO--) {
            var gU = gP.ranges[gO];
            var gZ = gU.from(),
                gY = gU.to();
            if (gU.empty()) {
                if (gQ && gQ > 0) {
                    gZ = W(gZ.line, gZ.ch - gQ)
                } else {
                    if (g2.state.overwrite && !gR) {
                        gY = W(gY.line, Math.min(fy(g0, gY.line).text.length, gY.ch + f2(gV).length))
                    } else {
                        if (bn && bn.lineWise && bn.text.join("\n") == gS) {
                            gZ = gY = W(gZ.line, 0)
                        }
                    }
                }
            }
            gW = g2.curOp.updateInput;
            var gX = {
                from: gZ,
                to: gY,
                text: gN ? gN[gO % gN.length] : gV,
                origin: g1 || (gR ? "paste" : g2.state.cutIncoming ? "cut" : "+input")
            };
            bh(g2.doc, gX);
            ae(g2, "inputRead", g2, gX)
        }
        if (gS && !gR) {
            gn(g2, gS)
        }
        f1(g2);
        g2.curOp.updateInput = gW;
        g2.curOp.typing = true;
        g2.state.pasteIncoming = g2.state.cutIncoming = false
    }

    function bb(gO, i) {
        var gN = gO.clipboardData && gO.clipboardData.getData("Text");
        if (gN) {
            gO.preventDefault();
            if (!i.isReadOnly() && !i.options.disableInput) {
                cT(i, function() {
                    return gq(i, gN, 0, null, "paste")
                })
            }
            return true
        }
    }

    function gn(gN, gR) {
        if (!gN.options.electricChars || !gN.options.smartIndent) {
            return
        }
        var gS = gN.doc.sel;
        for (var gQ = gS.ranges.length - 1; gQ >= 0; gQ--) {
            var gO = gS.ranges[gQ];
            if (gO.head.ch > 100 || (gQ && gS.ranges[gQ - 1].head.line == gO.head.line)) {
                continue
            }
            var gT = gN.getModeAt(gO.head);
            var gU = false;
            if (gT.electricChars) {
                for (var gP = 0; gP < gT.electricChars.length; gP++) {
                    if (gR.indexOf(gT.electricChars.charAt(gP)) > -1) {
                        gU = ac(gN, gO.head.line, "smart");
                        break
                    }
                }
            } else {
                if (gT.electricInput) {
                    if (gT.electricInput.test(fy(gN.doc, gO.head.line).text.slice(0, gO.head.ch))) {
                        gU = ac(gN, gO.head.line, "smart")
                    }
                }
            }
            if (gU) {
                ae(gN, "electricInput", gN, gO.head.line)
            }
        }
    }

    function dr(gN) {
        var gS = [],
            gP = [];
        for (var gQ = 0; gQ < gN.doc.sel.ranges.length; gQ++) {
            var gO = gN.doc.sel.ranges[gQ].head.line;
            var gR = {
                anchor: W(gO, 0),
                head: W(gO + 1, 0)
            };
            gP.push(gR);
            gS.push(gN.getRange(gR.anchor, gR.head))
        }
        return {
            text: gS,
            ranges: gP
        }
    }

    function gd(gN, i) {
        gN.setAttribute("autocorrect", "off");
        gN.setAttribute("autocapitalize", "off");
        gN.setAttribute("spellcheck", !!i)
    }

    function aY() {
        var i = gv("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
        var gN = gv("div", [i], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        if (c7) {
            i.style.width = "1000px"
        } else {
            i.setAttribute("wrap", "off")
        }
        if (fk) {
            i.style.border = "1px solid black"
        }
        gd(i);
        return gN
    }

    function dY(i) {
        var gN = i.optionHandlers;
        var gO = i.helpers = {};
        i.prototype = {
            constructor: i,
            focus: function() {
                window.focus();
                this.display.input.focus()
            },
            setOption: function(gR, gS) {
                var gQ = this.options,
                    gP = gQ[gR];
                if (gQ[gR] == gS && gR != "mode") {
                    return
                }
                gQ[gR] = gS;
                if (gN.hasOwnProperty(gR)) {
                    c8(this, gN[gR])(this, gS, gP)
                }
                aF(this, "optionChange", this, gR)
            },
            getOption: function(gP) {
                return this.options[gP]
            },
            getDoc: function() {
                return this.doc
            },
            addKeyMap: function(gQ, gP) {
                this.state.keyMaps[gP ? "push" : "unshift"](go(gQ))
            },
            removeKeyMap: function(gQ) {
                var gR = this.state.keyMaps;
                for (var gP = 0; gP < gR.length; ++gP) {
                    if (gR[gP] == gQ || gR[gP].name == gQ) {
                        gR.splice(gP, 1);
                        return true
                    }
                }
            },
            addOverlay: dh(function(gP, gQ) {
                var gR = gP.token ? gP : i.getMode(this.options, gP);
                if (gR.startState) {
                    throw new Error("Overlays may not be stateful.")
                }
                cf(this.state.overlays, {
                    mode: gR,
                    modeSpec: gP,
                    opaque: gQ && gQ.opaque,
                    priority: (gQ && gQ.priority) || 0
                }, function(gS) {
                    return gS.priority
                });
                this.state.modeGen++;
                ah(this)
            }),
            removeOverlay: dh(function(gP) {
                var gT = this;
                var gR = this.state.overlays;
                for (var gQ = 0; gQ < gR.length; ++gQ) {
                    var gS = gR[gQ].modeSpec;
                    if (gS == gP || typeof gP == "string" && gS.name == gP) {
                        gR.splice(gQ, 1);
                        gT.state.modeGen++;
                        ah(gT);
                        return
                    }
                }
            }),
            indentLine: dh(function(gR, gP, gQ) {
                if (typeof gP != "string" && typeof gP != "number") {
                    if (gP == null) {
                        gP = this.options.smartIndent ? "smart" : "prev"
                    } else {
                        gP = gP ? "add" : "subtract"
                    }
                }
                if (ce(this.doc, gR)) {
                    ac(this, gR, gP, gQ)
                }
            }),
            indentSelection: dh(function(gZ) {
                var gV = this;
                var gP = this.doc.sel.ranges,
                    gS = -1;
                for (var gU = 0; gU < gP.length; gU++) {
                    var gW = gP[gU];
                    if (!gW.empty()) {
                        var gX = gW.from(),
                            gY = gW.to();
                        var gQ = Math.max(gS, gX.line);
                        gS = Math.min(gV.lastLine(), gY.line - (gY.ch ? 0 : 1)) + 1;
                        for (var gT = gQ; gT < gS; ++gT) {
                            ac(gV, gT, gZ)
                        }
                        var gR = gV.doc.sel.ranges;
                        if (gX.ch == 0 && gP.length == gR.length && gR[gU].from().ch > 0) {
                            e(gV.doc, gU, new d7(gX, gR[gU].to()), Z)
                        }
                    } else {
                        if (gW.head.line > gS) {
                            ac(gV, gW.head.line, gZ, true);
                            gS = gW.head.line;
                            if (gU == gV.doc.sel.primIndex) {
                                f1(gV)
                            }
                        }
                    }
                }
            }),
            getTokenAt: function(gQ, gP) {
                return cw(this, gQ, gP)
            },
            getLineTokens: function(gQ, gP) {
                return cw(this, W(gQ), gP, true)
            },
            getTokenTypeAt: function(gW) {
                gW = f7(this.doc, gW);
                var gS = df(this, fy(this.doc, gW.line));
                var gU = 0,
                    gV = (gS.length - 1) / 2,
                    gR = gW.ch;
                var gQ;
                if (gR == 0) {
                    gQ = gS[2]
                } else {
                    for (;;) {
                        var gP = (gU + gV) >> 1;
                        if ((gP ? gS[gP * 2 - 1] : 0) >= gR) {
                            gV = gP
                        } else {
                            if (gS[gP * 2 + 1] < gR) {
                                gU = gP + 1
                            } else {
                                gQ = gS[gP * 2 + 2];
                                break
                            }
                        }
                    }
                }
                var gT = gQ ? gQ.indexOf("overlay ") : -1;
                return gT < 0 ? gQ : gT == 0 ? null : gQ.slice(0, gT - 1)
            },
            getModeAt: function(gQ) {
                var gP = this.doc.mode;
                if (!gP.innerMode) {
                    return gP
                }
                return i.innerMode(gP, this.getTokenAt(gQ).state).mode
            },
            getHelper: function(gQ, gP) {
                return this.getHelpers(gQ, gP)[0]
            },
            getHelpers: function(gW, gV) {
                var gT = this;
                var gY = [];
                if (!gO.hasOwnProperty(gV)) {
                    return gY
                }
                var gR = gO[gV],
                    gU = this.getModeAt(gW);
                if (typeof gU[gV] == "string") {
                    if (gR[gU[gV]]) {
                        gY.push(gR[gU[gV]])
                    }
                } else {
                    if (gU[gV]) {
                        for (var gS = 0; gS < gU[gV].length; gS++) {
                            var gQ = gR[gU[gV][gS]];
                            if (gQ) {
                                gY.push(gQ)
                            }
                        }
                    } else {
                        if (gU.helperType && gR[gU.helperType]) {
                            gY.push(gR[gU.helperType])
                        } else {
                            if (gR[gU.name]) {
                                gY.push(gR[gU.name])
                            }
                        }
                    }
                }
                for (var gP = 0; gP < gR._global.length; gP++) {
                    var gX = gR._global[gP];
                    if (gX.pred(gU, gT) && ds(gY, gX.val) == -1) {
                        gY.push(gX.val)
                    }
                }
                return gY
            },
            getStateAfter: function(gQ, gP) {
                var gR = this.doc;
                gQ = dc(gR, gQ == null ? gR.first + gR.size - 1 : gQ);
                return dL(this, gQ + 1, gP)
            },
            cursorCoords: function(gS, gQ) {
                var gR, gP = this.doc.sel.primary();
                if (gS == null) {
                    gR = gP.head
                } else {
                    if (typeof gS == "object") {
                        gR = f7(this.doc, gS)
                    } else {
                        gR = gS ? gP.from() : gP.to()
                    }
                }
                return d4(this, gR, gQ || "page")
            },
            charCoords: function(gQ, gP) {
                return cQ(this, f7(this.doc, gQ), gP || "page")
            },
            coordsChar: function(gP, gQ) {
                gP = gI(this, gP, gQ || "page");
                return ge(this, gP.left, gP.top)
            },
            lineAtHeight: function(gP, gQ) {
                gP = gI(this, {
                    top: gP,
                    left: 0
                }, gQ || "page").top;
                return bL(this.doc, gP + this.display.viewOffset)
            },
            heightAtLine: function(gQ, gU, gT) {
                var gP = false,
                    gR;
                if (typeof gQ == "number") {
                    var gS = this.doc.first + this.doc.size - 1;
                    if (gQ < this.doc.first) {
                        gQ = this.doc.first
                    } else {
                        if (gQ > gS) {
                            gQ = gS;
                            gP = true
                        }
                    }
                    gR = fy(this.doc, gQ)
                } else {
                    gR = gQ
                }
                return e8(this, gR, {
                    top: 0,
                    left: 0
                }, gU || "page", gT).top + (gP ? this.doc.height - bQ(gR) : 0)
            },
            defaultTextHeight: function() {
                return aZ(this.display)
            },
            defaultCharWidth: function() {
                return dM(this.display)
            },
            getViewport: function() {
                return {
                    from: this.display.viewFrom,
                    to: this.display.viewTo
                }
            },
            addWidget: function(gU, gR, gW, gS, gY) {
                var gT = this.display;
                gU = d4(this, f7(this.doc, gU));
                var gV = gU.bottom,
                    gQ = gU.left;
                gR.style.position = "absolute";
                gR.setAttribute("cm-ignore-events", "true");
                this.display.input.setUneditable(gR);
                gT.sizer.appendChild(gR);
                if (gS == "over") {
                    gV = gU.top
                } else {
                    if (gS == "above" || gS == "near") {
                        var gP = Math.max(gT.wrapper.clientHeight, this.doc.height),
                            gX = Math.max(gT.sizer.clientWidth, gT.lineSpace.clientWidth);
                        if ((gS == "above" || gU.bottom + gR.offsetHeight > gP) && gU.top > gR.offsetHeight) {
                            gV = gU.top - gR.offsetHeight
                        } else {
                            if (gU.bottom + gR.offsetHeight <= gP) {
                                gV = gU.bottom
                            }
                        }
                        if (gQ + gR.offsetWidth > gX) {
                            gQ = gX - gR.offsetWidth
                        }
                    }
                }
                gR.style.top = gV + "px";
                gR.style.left = gR.style.right = "";
                if (gY == "right") {
                    gQ = gT.sizer.clientWidth - gR.offsetWidth;
                    gR.style.right = "0px"
                } else {
                    if (gY == "left") {
                        gQ = 0
                    } else {
                        if (gY == "middle") {
                            gQ = (gT.sizer.clientWidth - gR.offsetWidth) / 2
                        }
                    }
                    gR.style.left = gQ + "px"
                }
                if (gW) {
                    E(this, gQ, gV, gQ + gR.offsetWidth, gV + gR.offsetHeight)
                }
            },
            triggerOnKeyDown: dh(q),
            triggerOnKeyPress: dh(cD),
            triggerOnKeyUp: bi,
            execCommand: function(gP) {
                if (eS.hasOwnProperty(gP)) {
                    return eS[gP].call(null, this)
                }
            },
            triggerElectric: dh(function(gP) {
                gn(this, gP)
            }),
            findPosH: function(gW, gS, gT, gQ) {
                var gV = this;
                var gP = 1;
                if (gS < 0) {
                    gP = -1;
                    gS = -gS
                }
                var gU = f7(this.doc, gW);
                for (var gR = 0; gR < gS; ++gR) {
                    gU = bz(gV.doc, gU, gP, gT, gQ);
                    if (gU.hitSide) {
                        break
                    }
                }
                return gU
            },
            moveH: dh(function(gP, gQ) {
                var gR = this;
                this.extendSelectionsBy(function(gS) {
                    if (gR.display.shift || gR.doc.extend || gS.empty()) {
                        return bz(gR.doc, gS.head, gP, gQ, gR.options.rtlMoveVisually)
                    } else {
                        return gP < 0 ? gS.from() : gS.to()
                    }
                }, c3)
            }),
            deleteH: dh(function(gP, gQ) {
                var gR = this.doc.sel,
                    gS = this.doc;
                if (gR.somethingSelected()) {
                    gS.replaceSelection("", null, "+delete")
                } else {
                    fg(this, function(gU) {
                        var gT = bz(gS, gU.head, gP, gQ, false);
                        return gP < 0 ? {
                            from: gT,
                            to: gU.head
                        } : {
                            from: gU.head,
                            to: gT
                        }
                    })
                }
            }),
            findPosV: function(gV, gS, gW, gY) {
                var gR = this;
                var gP = 1,
                    gU = gY;
                if (gS < 0) {
                    gP = -1;
                    gS = -gS
                }
                var gX = f7(this.doc, gV);
                for (var gQ = 0; gQ < gS; ++gQ) {
                    var gT = d4(gR, gX, "div");
                    if (gU == null) {
                        gU = gT.left
                    } else {
                        gT.left = gU
                    }
                    gX = bt(gR, gT, gP, gW);
                    if (gX.hitSide) {
                        break
                    }
                }
                return gX
            },
            moveV: dh(function(gP, gR) {
                var gV = this;
                var gT = this.doc,
                    gS = [];
                var gU = !this.display.shift && !gT.extend && gT.sel.somethingSelected();
                gT.extendSelectionsBy(function(gW) {
                    if (gU) {
                        return gP < 0 ? gW.from() : gW.to()
                    }
                    var gY = d4(gV, gW.head, "div");
                    if (gW.goalColumn != null) {
                        gY.left = gW.goalColumn
                    }
                    gS.push(gY.left);
                    var gX = bt(gV, gY, gP, gR);
                    if (gR == "page" && gW == gT.sel.primary()) {
                        cS(gV, null, cQ(gV, gX, "div").top - gY.top)
                    }
                    return gX
                }, c3);
                if (gS.length) {
                    for (var gQ = 0; gQ < gT.sel.ranges.length; gQ++) {
                        gT.sel.ranges[gQ].goalColumn = gS[gQ]
                    }
                }
            }),
            findWordAt: function(gW) {
                var gU = this.doc,
                    gS = fy(gU, gW.line).text;
                var gV = gW.ch,
                    gR = gW.ch;
                if (gS) {
                    var gT = this.getHelper(gW, "wordChars");
                    if ((gW.xRel < 0 || gR == gS.length) && gV) {
                        --gV
                    } else {
                        ++gR
                    }
                    var gQ = gS.charAt(gV);
                    var gP = cG(gQ, gT) ? function(gX) {
                        return cG(gX, gT)
                    } : /\s/.test(gQ) ? function(gX) {
                        return /\s/.test(gX)
                    } : function(gX) {
                        return (!/\s/.test(gX) && !cG(gX))
                    };
                    while (gV > 0 && gP(gS.charAt(gV - 1))) {
                        --gV
                    }
                    while (gR < gS.length && gP(gS.charAt(gR))) {
                        ++gR
                    }
                }
                return new d7(W(gW.line, gV), W(gW.line, gR))
            },
            toggleOverwrite: function(gP) {
                if (gP != null && gP == this.state.overwrite) {
                    return
                }
                if (this.state.overwrite = !this.state.overwrite) {
                    fW(this.display.cursorDiv, "CodeMirror-overwrite")
                } else {
                    h(this.display.cursorDiv, "CodeMirror-overwrite")
                }
                aF(this, "overwriteToggle", this, this.state.overwrite)
            },
            hasFocus: function() {
                return this.display.input.getField() == dX()
            },
            isReadOnly: function() {
                return !!(this.options.readOnly || this.doc.cantEdit)
            },
            scrollTo: dh(function(gP, gQ) {
                if (gP != null || gQ != null) {
                    fY(this)
                }
                if (gP != null) {
                    this.curOp.scrollLeft = gP
                }
                if (gQ != null) {
                    this.curOp.scrollTop = gQ
                }
            }),
            getScrollInfo: function() {
                var gP = this.display.scroller;
                return {
                    left: gP.scrollLeft,
                    top: gP.scrollTop,
                    height: gP.scrollHeight - c0(this) - this.display.barHeight,
                    width: gP.scrollWidth - c0(this) - this.display.barWidth,
                    clientHeight: c2(this),
                    clientWidth: dv(this)
                }
            },
            scrollIntoView: dh(function(gQ, gR) {
                if (gQ == null) {
                    gQ = {
                        from: this.doc.sel.primary().head,
                        to: null
                    };

                    if (gR == null) {
                        gR = this.options.cursorScrollMargin

                    }
                } else {
                    if (typeof gQ == "number") {
                        gQ = {
                            from: W(gQ, 0),
                            to: null
                        }

                    } else {
                        if (gQ.from == null) {
                            gQ = {
                                from: gQ,
                                to: null
                            }
                        }
                    }
                }
                if (!gQ.to) {
                    gQ.to = gQ.from;
                }
                gQ.margin = gR || 0;
                if (gQ.from.line != null) {
                    fY(this);
                    this.curOp.scrollToPos = gQ;
                } else {
                    var gP = H(this, Math.min(gQ.from.left, gQ.to.left), Math.min(gQ.from.top, gQ.to.top) - gQ.margin, Math.max(gQ.from.right, gQ.to.right), Math.max(gQ.from.bottom, gQ.to.bottom) + gQ.margin);
                    this.scrollTo(gP.scrollLeft, gP.scrollTop);
                }
                
            }),
            setSize: dh(function(gR, gP) {
                var gT = this;
                var gQ = function(gU) {
                    return typeof gU == "number" || /^\d+$/.test(String(gU)) ? gU + "px" : gU
                };
                if (gR != null) {
                    this.display.wrapper.style.width = gQ(gR)
                }
                if (gP != null) {
                    this.display.wrapper.style.height = gQ(gP)
                }
                if (this.options.lineWrapping) {
                    aP(this)
                }
                var gS = this.display.viewFrom;
                this.doc.iter(gS, this.display.viewTo, function(gU) {
                    if (gU.widgets) {
                        for (var gV = 0; gV < gU.widgets.length; gV++) {
                            if (gU.widgets[gV].noHScroll) {
                                R(gT, gS, "widget");
                                break
                            }
                        }
                    }++gS
                });
                this.curOp.forceUpdate = true;
                aF(this, "refresh", this)
            }),
            operation: function(gP) {
                return cT(this, gP)
            },
            refresh: dh(function() {
                var gP = this.display.cachedTextHeight;
                ah(this);
                this.curOp.forceUpdate = true;
                aj(this);
                this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
                db(this);
                if (gP == null || Math.abs(gP - aZ(this.display)) > 0.5) {
                    Y(this)
                }
                aF(this, "refresh", this)
            }),
            swapDoc: dh(function(gQ) {
                var gP = this.doc;
                gP.cm = null;
                en(this, gQ);
                aj(this);
                this.display.input.reset();
                this.scrollTo(gQ.scrollLeft, gQ.scrollTop);
                this.curOp.forceScroll = true;
                ae(this, "swapDoc", this, gP);
                return gP
            }),
            getInputField: function() {
                return this.display.input.getField()
            },
            getWrapperElement: function() {
                return this.display.wrapper
            },
            getScrollerElement: function() {
                return this.display.scroller
            },
            getGutterElement: function() {
                return this.display.gutters
            }
        };
        bD(i);
        i.registerHelper = function(gQ, gP, gR) {
            if (!gO.hasOwnProperty(gQ)) {
                gO[gQ] = i[gQ] = {
                    _global: []
                }
            }
            gO[gQ][gP] = gR
        };
        i.registerGlobalHelper = function(gR, gQ, gP, gS) {
            i.registerHelper(gR, gQ, gS);
            gO[gR]._global.push({
                pred: gP,
                val: gS
            })
        }
    }

    function bz(g3, gQ, gY, gX, gS) {
        var gV = gQ.line,
            gW = gQ.ch,
            g2 = gY;
        var gN = fy(g3, gV);

        function g1() {
            var g4 = gV + gY;
            if (g4 < g3.first || g4 >= g3.first + g3.size) {
                return false
            }
            gV = g4;
            return gN = fy(g3, g4)
        }

        function g0(g5) {
            var g4 = (gS ? u : ai)(gN, gW, gY, true);
            if (g4 == null) {
                if (!g5 && g1()) {
                    if (gS) {
                        gW = (gY < 0 ? cZ : cK)(gN)
                    } else {
                        gW = gY < 0 ? gN.text.length : 0
                    }
                } else {
                    return false
                }
            } else {
                gW = g4
            }
            return true
        }
        if (gX == "char") {
            g0()
        } else {
            if (gX == "column") {
                g0(true)
            } else {
                if (gX == "word" || gX == "group") {
                    var gZ = null,
                        gT = gX == "group";
                    var i = g3.cm && g3.cm.getHelper(gQ, "wordChars");
                    for (var gR = true;; gR = false) {
                        if (gY < 0 && !g0(!gR)) {
                            break
                        }
                        var gO = gN.text.charAt(gW) || "\n";
                        var gP = cG(gO, i) ? "w" : gT && gO == "\n" ? "n" : !gT || /\s/.test(gO) ? null : "p";
                        if (gT && !gR && !gP) {
                            gP = "s"
                        }
                        if (gZ && gZ != gP) {
                            if (gY < 0) {
                                gY = 1;
                                g0()
                            }
                            break
                        }
                        if (gP) {
                            gZ = gP
                        }
                        if (gY > 0 && !g0(!gR)) {
                            break
                        }
                    }
                }
            }
        }
        var gU = bZ(g3, W(gV, gW), gQ, g2, true);
        if (!cl(gQ, gU)) {
            gU.hitSide = true
        }
        return gU
    }

    function bt(gV, gQ, gN, gU) {
        var gT = gV.doc,
            gS = gQ.left,
            gR;
        if (gU == "page") {
            var gP = Math.min(gV.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            var i = Math.max(gP - 0.5 * aZ(gV.display), 3);
            gR = (gN > 0 ? gQ.bottom : gQ.top) + gN * i
        } else {
            if (gU == "line") {
                gR = gN > 0 ? gQ.bottom + 3 : gQ.top - 3
            }
        }
        var gO;
        for (;;) {
            gO = ge(gV, gS, gR);
            if (!gO.outside) {
                break
            }
            if (gN < 0 ? gR <= 0 : gR >= gT.height) {
                gO.hitSide = true;
                break
            }
            gR += gN * 5
        }
        return gO
    }
    var dD = function(i) {
        this.cm = i;
        this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
        this.polling = new gM();
        this.composing = null;
        this.gracePeriod = false;
        this.readDOMTimeout = null
    };
    dD.prototype.init = function(gP) {
        var gR = this;
        var gO = this,
            i = gO.cm;
        var gQ = gO.div = gP.lineDiv;
        gd(gQ, i.options.spellcheck);
        b1(gQ, "paste", function(gS) {
            if (aS(i, gS) || bb(gS, i)) {
                return
            }
            if (l <= 11) {
                setTimeout(c8(i, function() {
                    if (!gO.pollContent()) {
                        ah(i)
                    }
                }), 20)
            }
        });
        b1(gQ, "compositionstart", function(gS) {
            gR.composing = {
                data: gS.data,
                done: false
            }
        });
        b1(gQ, "compositionupdate", function(gS) {
            if (!gR.composing) {
                gR.composing = {
                    data: gS.data,
                    done: false
                }
            }
        });
        b1(gQ, "compositionend", function(gS) {
            if (gR.composing) {
                if (gS.data != gR.composing.data) {
                    gR.readFromDOMSoon()
                }
                gR.composing.done = true
            }
        });
        b1(gQ, "touchstart", function() {
            return gO.forceCompositionEnd()
        });
        b1(gQ, "input", function() {
            if (!gR.composing) {
                gR.readFromDOMSoon()
            }
        });

        function gN(gW) {
            if (aS(i, gW)) {
                return
            }
            if (i.somethingSelected()) {
                dd({
                    lineWise: false,
                    text: i.getSelections()
                });
                if (gW.type == "cut") {
                    i.replaceSelection("", null, "cut")
                }
            } else {
                if (!i.options.lineWiseCopyCut) {
                    return
                } else {
                    var gT = dr(i);
                    dd({
                        lineWise: true,
                        text: gT.text
                    });
                    if (gW.type == "cut") {
                        i.operation(function() {
                            i.setSelections(gT.ranges, 0, Z);
                            i.replaceSelection("", null, "cut")
                        })
                    }
                }
            }
            if (gW.clipboardData) {
                gW.clipboardData.clearData();
                var gV = bn.text.join("\n");
                gW.clipboardData.setData("Text", gV);
                if (gW.clipboardData.getData("Text") == gV) {
                    gW.preventDefault();
                    return
                }
            }
            var gU = aY(),
                gX = gU.firstChild;
            i.display.lineSpace.insertBefore(gU, i.display.lineSpace.firstChild);
            gX.value = bn.text.join("\n");
            var gS = document.activeElement;
            dU(gX);
            setTimeout(function() {
                i.display.lineSpace.removeChild(gU);
                gS.focus();
                if (gS == gQ) {
                    gO.showPrimarySelection()
                }
            }, 50)
        }
        b1(gQ, "copy", gN);
        b1(gQ, "cut", gN)
    };
    dD.prototype.prepareSelection = function() {
        var i = f5(this.cm, false);
        i.focus = this.cm.state.focused;
        return i
    };
    dD.prototype.showSelection = function(gN, i) {
        if (!gN || !this.cm.display.view.length) {
            return
        }
        if (gN.focus || i) {
            this.showPrimarySelection()
        }
        this.showMultipleSelections(gN)
    };
    dD.prototype.showPrimarySelection = function() {
        var gQ = window.getSelection(),
            gT = this.cm.doc.sel.primary();
        var gR = az(this.cm, gQ.anchorNode, gQ.anchorOffset);
        var gV = az(this.cm, gQ.focusNode, gQ.focusOffset);
        if (gR && !gR.bad && gV && !gV.bad && cl(ar(gR, gV), gT.from()) == 0 && cl(bB(gR, gV), gT.to()) == 0) {
            return
        }
        var gP = cF(this.cm, gT.from());
        var gU = cF(this.cm, gT.to());
        if (!gP && !gU) {
            return
        }
        var gX = this.cm.display.view;
        var gS = gQ.rangeCount && gQ.getRangeAt(0);
        if (!gP) {
            gP = {
                node: gX[0].measure.map[2],
                offset: 0
            }
        } else {
            if (!gU) {
                var gO = gX[gX.length - 1].measure;
                var gN = gO.maps ? gO.maps[gO.maps.length - 1] : gO.map;
                gU = {
                    node: gN[gN.length - 1],
                    offset: gN[gN.length - 2] - gN[gN.length - 3]
                }
            }
        }
        var i;
        try {
            i = cs(gP.node, gP.offset, gU.offset, gU.node)
        } catch (gW) {}
        if (i) {
            if (!cu && this.cm.state.focused) {
                gQ.collapse(gP.node, gP.offset);
                if (!i.collapsed) {
                    gQ.removeAllRanges();
                    gQ.addRange(i)
                }
            } else {
                gQ.removeAllRanges();
                gQ.addRange(i)
            }
            if (gS && gQ.anchorNode == null) {
                gQ.addRange(gS)
            } else {
                if (cu) {
                    this.startGracePeriod()
                }
            }
        }
        this.rememberSelection()
    };
    dD.prototype.startGracePeriod = function() {
        var i = this;
        clearTimeout(this.gracePeriod);
        this.gracePeriod = setTimeout(function() {
            i.gracePeriod = false;
            if (i.selectionChanged()) {
                i.cm.operation(function() {
                    return i.cm.curOp.selectionChanged = true
                })
            }
        }, 20)
    };
    dD.prototype.showMultipleSelections = function(i) {
        bW(this.cm.display.cursorDiv, i.cursors);
        bW(this.cm.display.selectionDiv, i.selection)
    };
    dD.prototype.rememberSelection = function() {
        var i = window.getSelection();
        this.lastAnchorNode = i.anchorNode;
        this.lastAnchorOffset = i.anchorOffset;
        this.lastFocusNode = i.focusNode;
        this.lastFocusOffset = i.focusOffset
    };
    dD.prototype.selectionInEditor = function() {
        var gN = window.getSelection();
        if (!gN.rangeCount) {
            return false
        }
        var i = gN.getRangeAt(0).commonAncestorContainer;
        return gD(this.div, i)
    };
    dD.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor") {
            if (!this.selectionInEditor()) {
                this.showSelection(this.prepareSelection(), true)
            }
            this.div.focus()
        }
    };
    dD.prototype.blur = function() {
        this.div.blur()
    };
    dD.prototype.getField = function() {
        return this.div
    };
    dD.prototype.supportsTouch = function() {
        return true
    };
    dD.prototype.receivedFocus = function() {
        var i = this;
        if (this.selectionInEditor()) {
            this.pollSelection()
        } else {
            cT(this.cm, function() {
                return i.cm.curOp.selectionChanged = true
            })
        }

        function gN() {
            if (i.cm.state.focused) {
                i.pollSelection();
                i.polling.set(i.cm.options.pollInterval, gN)
            }
        }
        this.polling.set(this.cm.options.pollInterval, gN)
    };
    dD.prototype.selectionChanged = function() {
        var i = window.getSelection();
        return i.anchorNode != this.lastAnchorNode || i.anchorOffset != this.lastAnchorOffset || i.focusNode != this.lastFocusNode || i.focusOffset != this.lastFocusOffset
    };
    dD.prototype.pollSelection = function() {
        if (!this.composing && this.readDOMTimeout == null && !this.gracePeriod && this.selectionChanged()) {
            var gP = window.getSelection(),
                i = this.cm;
            this.rememberSelection();
            var gN = az(i, gP.anchorNode, gP.anchorOffset);
            var gO = az(i, gP.focusNode, gP.focusOffset);
            if (gN && gO) {
                cT(i, function() {
                    bY(i.doc, e9(gN, gO), Z);
                    if (gN.bad || gO.bad) {
                        i.curOp.selectionChanged = true
                    }
                })
            }
        }
    };
    dD.prototype.pollContent = function() {
        if (this.readDOMTimeout != null) {
            clearTimeout(this.readDOMTimeout);
            this.readDOMTimeout = null
        }
        var gW = this.cm,
            g6 = gW.display,
            g4 = gW.doc.sel.primary();
        var g5 = g4.from(),
            gQ = g4.to();
        if (g5.ch == 0 && g5.line > gW.firstLine()) {
            g5 = W(g5.line - 1, fy(gW.doc, g5.line - 1).length)
        }
        if (gQ.ch == fy(gW.doc, gQ.line).text.length && gQ.line < gW.lastLine()) {
            gQ = W(gQ.line + 1, 0)
        }
        if (g5.line < g6.viewFrom || gQ.line > g6.viewTo - 1) {
            return false
        }
        var gT, gR, gV;
        if (g5.line == g6.viewFrom || (gT = dA(gW, g5.line)) == 0) {
            gR = bR(g6.view[0].line);
            gV = g6.view[0].node
        } else {
            gR = bR(g6.view[gT].line);
            gV = g6.view[gT - 1].node.nextSibling
        }
        var g3 = dA(gW, gQ.line);
        var gY, g1;
        if (g3 == g6.view.length - 1) {
            gY = g6.viewTo - 1;
            g1 = g6.lineDiv.lastChild
        } else {
            gY = bR(g6.view[g3 + 1].line) - 1;
            g1 = g6.view[g3 + 1].node.previousSibling
        }
        if (!gV) {
            return false
        }
        var g7 = gW.doc.splitLines(gr(gW, gV, g1, gR, gY));
        var g0 = gw(gW.doc, W(gR, 0), W(gY, fy(gW.doc, gY).text.length));
        while (g7.length > 1 && g0.length > 1) {
            if (f2(g7) == f2(g0)) {
                g7.pop();
                g0.pop();
                gY--
            } else {
                if (g7[0] == g0[0]) {
                    g7.shift();
                    g0.shift();
                    gR++
                } else {
                    break
                }
            }
        }
        var g2 = 0,
            gO = 0;
        var gX = g7[0],
            gN = g0[0],
            i = Math.min(gX.length, gN.length);
        while (g2 < i && gX.charCodeAt(g2) == gN.charCodeAt(g2)) {
            ++g2
        }
        var gU = f2(g7),
            g8 = f2(g0);
        var gP = Math.min(gU.length - (g7.length == 1 ? g2 : 0), g8.length - (g0.length == 1 ? g2 : 0));
        while (gO < gP && gU.charCodeAt(gU.length - gO - 1) == g8.charCodeAt(g8.length - gO - 1)) {
            ++gO
        }
        g7[g7.length - 1] = gU.slice(0, gU.length - gO).replace(/^\u200b+/, "");
        g7[0] = g7[0].slice(g2).replace(/\u200b+$/, "");
        var gS = W(gR, g2);
        var gZ = W(gY, g0.length ? f2(g0).length - gO : 0);
        if (g7.length > 1 || g7[0] || cl(gS, gZ)) {
            a2(gW.doc, g7, gS, gZ, "+input");
            return true
        }
    };
    dD.prototype.ensurePolled = function() {
        this.forceCompositionEnd()
    };
    dD.prototype.reset = function() {
        this.forceCompositionEnd()
    };
    dD.prototype.forceCompositionEnd = function() {
        if (!this.composing) {
            return
        }
        clearTimeout(this.readDOMTimeout);
        this.composing = null;
        if (!this.pollContent()) {
            ah(this.cm)
        }
        this.div.blur();
        this.div.focus()
    };
    dD.prototype.readFromDOMSoon = function() {
        var i = this;
        if (this.readDOMTimeout != null) {
            return
        }
        this.readDOMTimeout = setTimeout(function() {
            i.readDOMTimeout = null;
            if (i.composing) {
                if (i.composing.done) {
                    i.composing = null
                } else {
                    return
                }
            }
            if (i.cm.isReadOnly() || !i.pollContent()) {
                cT(i.cm, function() {
                    return ah(i.cm)
                })
            }
        }, 80)
    };
    dD.prototype.setUneditable = function(i) {
        i.contentEditable = "false"
    };
    dD.prototype.onKeyPress = function(i) {
        i.preventDefault();
        if (!this.cm.isReadOnly()) {
            c8(this.cm, gq)(this.cm, String.fromCharCode(i.charCode == null ? i.keyCode : i.charCode), 0)
        }
    };
    dD.prototype.readOnlyChanged = function(i) {
        this.div.contentEditable = String(i != "nocursor")
    };
    dD.prototype.onContextMenu = function() {};
    dD.prototype.resetPosition = function() {};
    dD.prototype.needsContentAttribute = true;

    function cF(gS, gQ) {
        var gR = fv(gS, gQ.line);
        if (!gR || gR.hidden) {
            return null
        }
        var gU = fy(gS.doc, gQ.line);
        var gN = cz(gR, gU, gQ.line);
        var gO = a(gU),
            gP = "left";
        if (gO) {
            var i = aI(gO, gQ.ch);
            gP = i % 2 ? "right" : "left"
        }
        var gT = aL(gN.map, gQ.ch, gP);
        gT.offset = gT.collapse == "right" ? gT.end : gT.start;
        return gT
    }

    function eF(gN, i) {
        if (i) {
            gN.bad = true
        }
        return gN
    }

    function gr(gU, gS, gT, gP, gN) {
        var gV = "",
            gO = false,
            i = gU.doc.lineSeparator();

        function gQ(gW) {
            return function(gX) {
                return gX.id == gW
            }
        }

        function gR(g0) {
            if (g0.nodeType == 1) {
                var gX = g0.getAttribute("cm-text");
                if (gX != null) {
                    if (gX == "") {
                        gV += g0.textContent.replace(/\u200b/g, "")
                    } else {
                        gV += gX
                    }
                    return
                }
                var gZ = g0.getAttribute("cm-marker"),
                    gW;
                if (gZ) {
                    var g1 = gU.findMarks(W(gP, 0), W(gN + 1, 0), gQ(+gZ));
                    if (g1.length && (gW = g1[0].find())) {
                        gV += gw(gU.doc, gW.from, gW.to).join(i)
                    }
                    return
                }
                if (g0.getAttribute("contenteditable") == "false") {
                    return
                }
                for (var gY = 0; gY < g0.childNodes.length; gY++) {
                    gR(g0.childNodes[gY])
                }
                if (/^(pre|div|p)$/i.test(g0.nodeName)) {
                    gO = true
                }
            } else {
                if (g0.nodeType == 3) {
                    var g2 = g0.nodeValue;
                    if (!g2) {
                        return
                    }
                    if (gO) {
                        gV += i;
                        gO = false
                    }
                    gV += g2
                }
            }
        }
        for (;;) {
            gR(gS);
            if (gS == gT) {
                break
            }
            gS = gS.nextSibling
        }
        return gV
    }

    function az(gN, gQ, gS) {
        var gR;
        if (gQ == gN.display.lineDiv) {
            gR = gN.display.lineDiv.childNodes[gS];
            if (!gR) {
                return eF(gN.clipPos(W(gN.display.viewTo - 1)), true)
            }
            gQ = null;
            gS = 0
        } else {
            for (gR = gQ;; gR = gR.parentNode) {
                if (!gR || gR == gN.display.lineDiv) {
                    return null
                }
                if (gR.parentNode && gR.parentNode == gN.display.lineDiv) {
                    break
                }
            }
        }
        for (var gP = 0; gP < gN.display.view.length; gP++) {
            var gO = gN.display.view[gP];
            if (gO.node == gR) {
                return aa(gO, gQ, gS)
            }
        }
    }

    function aa(gV, gR, gT) {
        var gO = gV.text.firstChild,
            gQ = false;
        if (!gR || !gD(gO, gR)) {
            return eF(W(bR(gV.line), 0), true)
        }
        if (gR == gO) {
            gQ = true;
            gR = gO.childNodes[gT];
            gT = 0;
            if (!gR) {
                var g1 = gV.rest ? f2(gV.rest) : gV.line;
                return eF(W(bR(g1), g1.text.length), gQ)
            }
        }
        var gS = gR.nodeType == 3 ? gR : null,
            gZ = gR;
        if (!gS && gR.childNodes.length == 1 && gR.firstChild.nodeType == 3) {
            gS = gR.firstChild;
            if (gT) {
                gT = gS.nodeValue.length
            }
        }
        while (gZ.parentNode != gO) {
            gZ = gZ.parentNode
        }
        var gN = gV.measure,
            gX = gN.maps;

        function gU(g4, g9, g6) {
            for (var g8 = -1; g8 < (gX ? gX.length : 0); g8++) {
                var g3 = g8 < 0 ? gN.map : gX[g8];
                for (var g7 = 0; g7 < g3.length; g7 += 3) {
                    var g5 = g3[g7 + 2];
                    if (g5 == g4 || g5 == g9) {
                        var ha = bR(g8 < 0 ? gV.line : gV.rest[g8]);
                        var g2 = g3[g7] + g6;
                        if (g6 < 0 || g5 != g4) {
                            g2 = g3[g7 + (g6 ? 1 : 0)]
                        }
                        return W(ha, g2)
                    }
                }
            }
        }
        var g0 = gU(gS, gZ, gT);
        if (g0) {
            return eF(g0, gQ)
        }
        for (var i = gZ.nextSibling, gW = gS ? gS.nodeValue.length - gT : 0; i; i = i.nextSibling) {
            g0 = gU(i, i.firstChild, 0);
            if (g0) {
                return eF(W(g0.line, g0.ch - gW), gQ)
            } else {
                gW += i.textContent.length
            }
        }
        for (var gY = gZ.previousSibling, gP = gT; gY; gY = gY.previousSibling) {
            g0 = gU(gY, gY.firstChild, -1);
            if (g0) {
                return eF(W(g0.line, g0.ch + gP), gQ)
            } else {
                gP += gY.textContent.length
            }
        }
    }
    var X = function(i) {
        this.cm = i;
        this.prevInput = "";
        this.pollingFast = false;
        this.polling = new gM();
        this.inaccurateSelection = false;
        this.hasSelection = false;
        this.composing = null
    };
    X.prototype.init = function(gO) {
        var gS = this;
        var gN = this,
            i = this.cm;
        var gR = this.wrapper = aY();
        var gP = this.textarea = gR.firstChild;
        gO.wrapper.insertBefore(gR, gO.wrapper.firstChild);
        if (fk) {
            gP.style.width = "0px"
        }
        b1(gP, "input", function() {
            if (dT && l >= 9 && gS.hasSelection) {
                gS.hasSelection = null
            }
            gN.poll()
        });
        b1(gP, "paste", function(gT) {
            if (aS(i, gT) || bb(gT, i)) {
                return
            }
            i.state.pasteIncoming = true;
            gN.fastPoll()
        });

        function gQ(gU) {
            if (aS(i, gU)) {
                return
            }
            if (i.somethingSelected()) {
                dd({
                    lineWise: false,
                    text: i.getSelections()
                });
                if (gN.inaccurateSelection) {
                    gN.prevInput = "";
                    gN.inaccurateSelection = false;
                    gP.value = bn.text.join("\n");
                    dU(gP)
                }
            } else {
                if (!i.options.lineWiseCopyCut) {
                    return
                } else {
                    var gT = dr(i);
                    dd({
                        lineWise: true,
                        text: gT.text
                    });
                    if (gU.type == "cut") {
                        i.setSelections(gT.ranges, null, Z)
                    } else {
                        gN.prevInput = "";
                        gP.value = gT.text.join("\n");
                        dU(gP)
                    }
                }
            }
            if (gU.type == "cut") {
                i.state.cutIncoming = true
            }
        }
        b1(gP, "cut", gQ);
        b1(gP, "copy", gQ);
        b1(gO.scroller, "paste", function(gT) {
            if (bc(gO, gT) || aS(i, gT)) {
                return
            }
            i.state.pasteIncoming = true;
            gN.focus()
        });
        b1(gO.lineSpace, "selectstart", function(gT) {
            if (!bc(gO, gT)) {
                cM(gT)
            }
        });
        b1(gP, "compositionstart", function() {
            var gT = i.getCursor("from");
            if (gN.composing) {
                gN.composing.range.clear()
            }
            gN.composing = {
                start: gT,
                range: i.markText(gT, i.getCursor("to"), {
                    className: "CodeMirror-composing"
                })
            }
        });
        b1(gP, "compositionend", function() {
            if (gN.composing) {
                gN.poll();
                gN.composing.range.clear();
                gN.composing = null
            }
        })
    };
    X.prototype.prepareSelection = function() {
        var gN = this.cm,
            gR = gN.display,
            gQ = gN.doc;
        var i = f5(gN);
        if (gN.options.moveInputWithCursor) {
            var gS = d4(gN, gQ.sel.primary().head, "div");
            var gO = gR.wrapper.getBoundingClientRect(),
                gP = gR.lineDiv.getBoundingClientRect();
            i.teTop = Math.max(0, Math.min(gR.wrapper.clientHeight - 10, gS.top + gP.top - gO.top));
            i.teLeft = Math.max(0, Math.min(gR.wrapper.clientWidth - 10, gS.left + gP.left - gO.left))
        }
        return i
    };
    X.prototype.showSelection = function(gO) {
        var i = this.cm,
            gN = i.display;
        bW(gN.cursorDiv, gO.cursors);
        bW(gN.selectionDiv, gO.selection);
        if (gO.teTop != null) {
            this.wrapper.style.top = gO.teTop + "px";
            this.wrapper.style.left = gO.teLeft + "px"
        }
    };
    X.prototype.reset = function(gQ) {
        if (this.contextMenuPending) {
            return
        }
        var gN, gP, i = this.cm,
            gS = i.doc;
        if (i.somethingSelected()) {
            this.prevInput = "";
            var gO = gS.sel.primary();
            gN = di && (gO.to().line - gO.from().line > 100 || (gP = i.getSelection()).length > 1000);
            var gR = gN ? "-" : gP || i.getSelection();
            this.textarea.value = gR;
            if (i.state.focused) {
                dU(this.textarea)
            }
            if (dT && l >= 9) {
                this.hasSelection = gR
            }
        } else {
            if (!gQ) {
                this.prevInput = this.textarea.value = "";
                if (dT && l >= 9) {
                    this.hasSelection = null
                }
            }
        }
        this.inaccurateSelection = gN
    };
    X.prototype.getField = function() {
        return this.textarea
    };
    X.prototype.supportsTouch = function() {
        return false
    };
    X.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!es || dX() != this.textarea)) {
            try {
                this.textarea.focus()
            } catch (i) {}
        }
    };
    X.prototype.blur = function() {
        this.textarea.blur()
    };
    X.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0
    };
    X.prototype.receivedFocus = function() {
        this.slowPoll()
    };
    X.prototype.slowPoll = function() {
        var i = this;
        if (this.pollingFast) {
            return
        }
        this.polling.set(this.cm.options.pollInterval, function() {
            i.poll();
            if (i.cm.state.focused) {
                i.slowPoll()
            }
        })
    };
    X.prototype.fastPoll = function() {
        var gN = false,
            i = this;
        i.pollingFast = true;

        function gO() {
            var gP = i.poll();
            if (!gP && !gN) {
                gN = true;
                i.polling.set(60, gO)
            } else {
                i.pollingFast = false;
                i.slowPoll()
            }
        }
        i.polling.set(20, gO)
    };
    X.prototype.poll = function() {
        var gT = this;
        var i = this.cm,
            gO = this.textarea,
            gP = this.prevInput;
        if (this.contextMenuPending || !i.state.focused || (bv(gO) && !gP && !this.composing) || i.isReadOnly() || i.options.disableInput || i.state.keySeq) {
            return false
        }
        var gR = gO.value;
        if (gR == gP && !i.somethingSelected()) {
            return false
        }
        if (dT && l >= 9 && this.hasSelection === gR || cc && /[\uf700-\uf7ff]/.test(gR)) {
            i.display.input.reset();
            return false
        }
        if (i.doc.sel == i.display.selForContextMenu) {
            var gQ = gR.charCodeAt(0);
            if (gQ == 8203 && !gP) {
                gP = "\u200b"
            }
            if (gQ == 8666) {
                this.reset();
                return this.cm.execCommand("undo")
            }
        }
        var gS = 0,
            gN = Math.min(gP.length, gR.length);
        while (gS < gN && gP.charCodeAt(gS) == gR.charCodeAt(gS)) {
            ++gS
        }
        cT(i, function() {
            gq(i, gR.slice(gS), gP.length - gS, null, gT.composing ? "*compose" : null);
            if (gR.length > 1000 || gR.indexOf("\n") > -1) {
                gO.value = gT.prevInput = ""
            } else {
                gT.prevInput = gR
            }
            if (gT.composing) {
                gT.composing.range.clear();
                gT.composing.range = i.markText(gT.composing.start, i.getCursor("to"), {
                    className: "CodeMirror-composing"
                })
            }
        });
        return true
    };
    X.prototype.ensurePolled = function() {
        if (this.pollingFast && this.poll()) {
            this.pollingFast = false
        }
    };
    X.prototype.onKeyPress = function() {
        if (dT && l >= 9) {
            this.hasSelection = null
        }
        this.fastPoll()
    };
    X.prototype.onContextMenu = function(gR) {
        var gW = this,
            gX = gW.cm,
            gT = gX.display,
            gN = gW.textarea;
        var gV = ct(gX, gR),
            i = gT.scroller.scrollTop;
        if (!gV || ed) {
            return
        }
        var gQ = gX.options.resetSelectionOnContextMenu;
        if (gQ && gX.doc.sel.contains(gV) == -1) {
            c8(gX, bY)(gX.doc, e9(gV), Z)
        }
        var gS = gN.style.cssText,
            g0 = gW.wrapper.style.cssText;
        gW.wrapper.style.cssText = "position: absolute";
        var gZ = gW.wrapper.getBoundingClientRect();
        gN.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (gR.clientY - gZ.top - 5) + "px; left: " + (gR.clientX - gZ.left - 5) + "px;\n      z-index: 1000; background: " + (dT ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
        var gY;
        if (c7) {
            gY = window.scrollY
        }
        gT.input.focus();
        if (c7) {
            window.scrollTo(null, gY)
        }
        gT.input.reset();
        if (!gX.somethingSelected()) {
            gN.value = gW.prevInput = " "
        }
        gW.contextMenuPending = true;
        gT.selForContextMenu = gX.doc.sel;
        clearTimeout(gT.detectingSelectAll);

        function gP() {
            if (gN.selectionStart != null) {
                var g1 = gX.somethingSelected();
                var g2 = "\u200b" + (g1 ? gN.value : "");
                gN.value = "\u21da";
                gN.value = g2;
                gW.prevInput = g1 ? "" : "\u200b";
                gN.selectionStart = 1;
                gN.selectionEnd = g2.length;
                gT.selForContextMenu = gX.doc.sel
            }
        }

        function gU() {
            gW.contextMenuPending = false;
            gW.wrapper.style.cssText = g0;
            gN.style.cssText = gS;
            if (dT && l < 9) {
                gT.scrollbars.setScrollTop(gT.scroller.scrollTop = i)
            }
            if (gN.selectionStart != null) {
                if (!dT || (dT && l < 9)) {
                    gP()
                }
                var g1 = 0,
                    g2 = function() {
                        if (gT.selForContextMenu == gX.doc.sel && gN.selectionStart == 0 && gN.selectionEnd > 0 && gW.prevInput == "\u200b") {
                            c8(gX, al)(gX)
                        } else {
                            if (g1++ < 10) {
                                gT.detectingSelectAll = setTimeout(g2, 500)
                            } else {
                                gT.input.reset()
                            }
                        }
                    };
                gT.detectingSelectAll = setTimeout(g2, 200)
            }
        }
        if (dT && l >= 9) {
            gP()
        }
        if (gC) {
            eE(gR);
            var gO = function() {
                er(window, "mouseup", gO);
                setTimeout(gU, 20)
            };
            b1(window, "mouseup", gO)
        } else {
            setTimeout(gU, 50)
        }
    };
    X.prototype.readOnlyChanged = function(i) {
        if (!i) {
            this.reset()
        }
    };
    X.prototype.setUneditable = function() {};
    X.prototype.needsContentAttribute = false;

    function f3(gT, gU) {
        gU = gU ? aO(gU) : {};
        gU.value = gT.value;
        if (!gU.tabindex && gT.tabIndex) {
            gU.tabindex = gT.tabIndex
        }
        if (!gU.placeholder && gT.placeholder) {
            gU.placeholder = gT.placeholder
        }
        if (gU.autofocus == null) {
            var i = dX();
            gU.autofocus = i == gT || gT.getAttribute("autofocus") != null && i == document.body
        }

        function gQ() {
            gT.value = gS.getValue()
        }
        var gR;
        if (gT.form) {
            b1(gT.form, "submit", gQ);
            if (!gU.leaveSubmitMethodAlone) {
                var gN = gT.form;
                gR = gN.submit;
                try {
                    var gP = gN.submit = function() {
                        gQ();
                        gN.submit = gR;
                        gN.submit();
                        gN.submit = gP
                    }
                } catch (gO) {}
            }
        }
        gU.finishInit = function(gV) {
            gV.save = gQ;
            gV.getTextArea = function() {
                return gT
            };
            gV.toTextArea = function() {
                gV.toTextArea = isNaN;
                gQ();
                gT.parentNode.removeChild(gV.getWrapperElement());
                gT.style.display = "";
                if (gT.form) {
                    er(gT.form, "submit", gQ);
                    if (typeof gT.form.submit == "function") {
                        gT.form.submit = gR
                    }
                }
            }
        };
        gT.style.display = "none";
        var gS = G(function(gV) {
            return gT.parentNode.insertBefore(gV, gT.nextSibling)
        }, gU);
        return gS
    }

    function f8(i) {
        i.off = er;
        i.on = b1;
        i.wheelEventPixels = aA;
        i.Doc = au;
        i.splitLines = gh;
        i.countColumn = bV;
        i.findColumn = eD;
        i.isWordChar = fZ;
        i.Pass = ch;
        i.signal = aF;
        i.Line = gy;
        i.changeEnd = c4;
        i.scrollbarModel = bo;
        i.Pos = W;
        i.cmpPos = cl;
        i.modes = dB;
        i.mimeModes = aT;
        i.resolveMode = gE;
        i.getMode = fV;
        i.modeExtensions = dy;
        i.extendMode = eT;
        i.copyState = b8;
        i.startState = b5;
        i.innerMode = gA;
        i.commands = eS;
        i.keyMap = fu;
        i.keyName = fK;
        i.isModifierKey = eP;
        i.lookupKey = j;
        i.normalizeKeyMap = cN;
        i.StringStream = fc;
        i.SharedTextMarker = x;
        i.TextMarker = Q;
        i.LineWidget = dK;
        i.e_preventDefault = cM;
        i.e_stopPropagation = dz;
        i.e_stop = eE;
        i.addClass = fW;
        i.contains = gD;
        i.rmClass = h;
        i.keyNames = fA
    }
    eX(G);
    dY(G);
    var d = "iter insert remove copy getEditor constructor".split(" ");
    for (var bO in au.prototype) {
        if (au.prototype.hasOwnProperty(bO) && ds(d, bO) < 0) {
            G.prototype[bO] = (function(i) {
                return function() {
                    return i.apply(this.doc, arguments)
                }
            })(au.prototype[bO])
        }
    }
    bD(au);
    G.inputStyles = {
        textarea: X,
        contenteditable: dD
    };
    G.defineMode = function(i) {
        if (!G.defaults.mode && i != "null") {
            G.defaults.mode = i
        }
        eH.apply(this, arguments)
    };
    G.defineMIME = bp;
    G.defineMode("null", function() {
        return ({
            token: function(i) {
                return i.skipToEnd()
            }
        })
    });
    G.defineMIME("text/plain", "null");
    G.defineExtension = function(i, gN) {
        G.prototype[i] = gN
    };
    G.defineDocExtension = function(i, gN) {
        au.prototype[i] = gN
    };
    G.fromTextArea = f3;
    f8(G);
    G.version = "5.23.0";
    return G
})));
