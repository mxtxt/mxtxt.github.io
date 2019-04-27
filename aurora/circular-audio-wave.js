! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.echarts = {})
}(this, function(t) {
    "use strict";
    var e = 2311,
        i = function() {
            return e++
        },
        n = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? {
            browser: {},
            os: {},
            node: !1,
            wxa: !0,
            canvasSupported: !0,
            svgSupported: !1,
            touchEventsSupported: !0
        } : "undefined" == typeof document && "undefined" != typeof self ? {
            browser: {},
            os: {},
            node: !1,
            worker: !0,
            canvasSupported: !0
        } : "undefined" == typeof navigator ? {
            browser: {},
            os: {},
            node: !0,
            worker: !1,
            canvasSupported: !0,
            svgSupported: !0
        } : function(t) {
            var e = {},
                i = t.match(/Firefox\/([\d.]+)/),
                n = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/),
                r = t.match(/Edge\/([\d.]+)/),
                a = /micromessenger/i.test(t);
            i && (e.firefox = !0, e.version = i[1]);
            n && (e.ie = !0, e.version = n[1]);
            r && (e.edge = !0, e.version = r[1]);
            a && (e.weChat = !0);
            return {
                browser: e,
                os: {},
                node: !1,
                canvasSupported: !!document.createElement("canvas").getContext,
                svgSupported: "undefined" != typeof SVGRect,
                touchEventsSupported: "ontouchstart" in window && !e.ie && !e.edge,
                pointerEventsSupported: "onpointerdown" in window && (e.edge || e.ie && e.version >= 11)
            }
        }(navigator.userAgent);
    var r = {
            "[object Function]": 1,
            "[object RegExp]": 1,
            "[object Date]": 1,
            "[object Error]": 1,
            "[object CanvasGradient]": 1,
            "[object CanvasPattern]": 1,
            "[object Image]": 1,
            "[object Canvas]": 1
        },
        a = {
            "[object Int8Array]": 1,
            "[object Uint8Array]": 1,
            "[object Uint8ClampedArray]": 1,
            "[object Int16Array]": 1,
            "[object Uint16Array]": 1,
            "[object Int32Array]": 1,
            "[object Uint32Array]": 1,
            "[object Float32Array]": 1,
            "[object Float64Array]": 1
        },
        o = Object.prototype.toString,
        s = Array.prototype,
        l = s.forEach,
        h = s.filter,
        u = s.slice,
        c = s.map,
        d = s.reduce,
        f = {};

    function p(t) {
        if (null == t || "object" != typeof t) return t;
        var e = t,
            i = o.call(t);
        if ("[object Array]" === i) {
            if (!U(t)) {
                e = [];
                for (var n = 0, s = t.length; n < s; n++) e[n] = p(t[n])
            }
        } else if (a[i]) {
            if (!U(t)) {
                var l = t.constructor;
                if (t.constructor.from) e = l.from(t);
                else {
                    e = new l(t.length);
                    for (n = 0, s = t.length; n < s; n++) e[n] = p(t[n])
                }
            }
        } else if (!r[i] && !U(t) && !N(t))
            for (var h in e = {}, t) t.hasOwnProperty(h) && (e[h] = p(t[h]));
        return e
    }

    function g(t, e, i) {
        if (!L(e) || !L(t)) return i ? p(e) : t;
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = t[n],
                    a = e[n];
                !L(a) || !L(r) || D(a) || D(r) || N(a) || N(r) || O(a) || O(r) || U(a) || U(r) ? !i && n in t || (t[n] = p(e[n])) : g(r, a, i)
            }
        return t
    }

    function v(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t
    }

    function m(t, e, i) {
        for (var n in e) e.hasOwnProperty(n) && (i ? null != e[n] : null == t[n]) && (t[n] = e[n]);
        return t
    }
    var y, x = function() {
        return f.createCanvas()
    };

    function _(t, e) {
        if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var i = 0, n = t.length; i < n; i++)
                if (t[i] === e) return i
        }
        return -1
    }

    function w(t, e) {
        var i = t.prototype;

        function n() {}
        for (var r in n.prototype = e.prototype, t.prototype = new n, i) t.prototype[r] = i[r];
        t.prototype.constructor = t, t.superClass = e
    }

    function b(t, e, i) {
        m(t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, i)
    }

    function M(t) {
        if (t) return "string" != typeof t && "number" == typeof t.length
    }

    function S(t, e, i) {
        if (t && e)
            if (t.forEach && t.forEach === l) t.forEach(e, i);
            else if (t.length === +t.length)
            for (var n = 0, r = t.length; n < r; n++) e.call(i, t[n], n, t);
        else
            for (var a in t) t.hasOwnProperty(a) && e.call(i, t[a], a, t)
    }

    function T(t, e, i) {
        if (t && e) {
            if (t.map && t.map === c) return t.map(e, i);
            for (var n = [], r = 0, a = t.length; r < a; r++) n.push(e.call(i, t[r], r, t));
            return n
        }
    }

    function I(t, e, i) {
        if (t && e) {
            if (t.filter && t.filter === h) return t.filter(e, i);
            for (var n = [], r = 0, a = t.length; r < a; r++) e.call(i, t[r], r, t) && n.push(t[r]);
            return n
        }
    }

    function C(t, e) {
        var i = u.call(arguments, 2);
        return function() {
            return t.apply(e, i.concat(u.call(arguments)))
        }
    }

    function A(t) {
        var e = u.call(arguments, 1);
        return function() {
            return t.apply(this, e.concat(u.call(arguments)))
        }
    }

    function D(t) {
        return "[object Array]" === o.call(t)
    }

    function k(t) {
        return "function" == typeof t
    }

    function P(t) {
        return "[object String]" === o.call(t)
    }

    function L(t) {
        var e = typeof t;
        return "function" === e || !!t && "object" == e
    }

    function O(t) {
        return !!r[o.call(t)]
    }

    function E(t) {
        return !!a[o.call(t)]
    }

    function N(t) {
        return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
    }

    function R(t) {
        return t != t
    }

    function B(t) {
        for (var e = 0, i = arguments.length; e < i; e++)
            if (null != arguments[e]) return arguments[e]
    }

    function z(t, e) {
        return null != t ? t : e
    }

    function F(t, e, i) {
        return null != t ? t : null != e ? e : i
    }

    function V() {
        return Function.call.apply(u, arguments)
    }

    function H(t) {
        if ("number" == typeof t) return [t, t, t, t];
        var e = t.length;
        return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
    }

    function W(t, e) {
        if (!t) throw new Error(e)
    }

    function G(t) {
        return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }
    f.createCanvas = function() {
        return document.createElement("canvas")
    };
    var q = "__ec_primitive__";

    function X(t) {
        t[q] = !0
    }

    function U(t) {
        return t[q]
    }

    function Y(t) {
        var e = D(t),
            i = this;

        function n(t, n) {
            e ? i.set(t, n) : i.set(n, t)
        }
        t instanceof Y ? t.each(n) : t && S(t, n)
    }

    function Z(t) {
        return new Y(t)
    }

    function j() {}
    Y.prototype = {
        constructor: Y,
        get: function(t) {
            return this.hasOwnProperty(t) ? this[t] : null
        },
        set: function(t, e) {
            return this[t] = e
        },
        each: function(t, e) {
            for (var i in void 0 !== e && (t = C(t, e)), this) this.hasOwnProperty(i) && t(this[i], i)
        },
        removeKey: function(t) {
            delete this[t]
        }
    };
    var K = "undefined" == typeof Float32Array ? Array : Float32Array;

    function $(t, e) {
        var i = new K(2);
        return null == t && (t = 0), null == e && (e = 0), i[0] = t, i[1] = e, i
    }

    function Q(t) {
        var e = new K(2);
        return e[0] = t[0], e[1] = t[1], e
    }

    function J(t, e, i) {
        return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t
    }

    function tt(t, e, i) {
        return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t
    }

    function et(t, e, i) {
        return t[0] = e[0] * i, t[1] = e[1] * i, t
    }

    function it(t, e) {
        var i = function(t) {
            return Math.sqrt(function(t) {
                return t[0] * t[0] + t[1] * t[1]
            }(t))
        }(e);
        return 0 === i ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / i, t[1] = e[1] / i), t
    }

    function nt(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
    }
    var rt = nt;
    var at = function(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
    };

    function ot(t, e, i) {
        var n = e[0],
            r = e[1];
        return t[0] = i[0] * n + i[2] * r + i[4], t[1] = i[1] * n + i[3] * r + i[5], t
    }

    function st(t, e, i) {
        return t[0] = Math.min(e[0], i[0]), t[1] = Math.min(e[1], i[1]), t
    }

    function lt(t, e, i) {
        return t[0] = Math.max(e[0], i[0]), t[1] = Math.max(e[1], i[1]), t
    }

    function ht() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
    }

    function ut(t, e) {
        return {
            target: t,
            topTarget: e && e.topTarget
        }
    }
    ht.prototype = {
        constructor: ht,
        _dragStart: function(t) {
            var e = t.target;
            e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(ut(e, t), "dragstart", t.event))
        },
        _drag: function(t) {
            var e = this._draggingTarget;
            if (e) {
                var i = t.offsetX,
                    n = t.offsetY,
                    r = i - this._x,
                    a = n - this._y;
                this._x = i, this._y = n, e.drift(r, a, t), this.dispatchToElement(ut(e, t), "drag", t.event);
                var o = this.findHover(i, n, e).target,
                    s = this._dropTarget;
                this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(ut(s, t), "dragleave", t.event), o && o !== s && this.dispatchToElement(ut(o, t), "dragenter", t.event))
            }
        },
        _dragEnd: function(t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.dispatchToElement(ut(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(ut(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null
        }
    };
    var ct = Array.prototype.slice,
        dt = function() {
            this._$handlers = {}
        };
    dt.prototype = {
        constructor: dt,
        one: function(t, e, i) {
            var n = this._$handlers;
            if (!e || !t) return this;
            n[t] || (n[t] = []);
            for (var r = 0; r < n[t].length; r++)
                if (n[t][r].h === e) return this;
            return n[t].push({
                h: e,
                one: !0,
                ctx: i || this
            }), this
        },
        on: function(t, e, i) {
            var n = this._$handlers;
            if (!e || !t) return this;
            n[t] || (n[t] = []);
            for (var r = 0; r < n[t].length; r++)
                if (n[t][r].h === e) return this;
            return n[t].push({
                h: e,
                one: !1,
                ctx: i || this
            }), this
        },
        isSilent: function(t) {
            var e = this._$handlers;
            return e[t] && e[t].length
        },
        off: function(t, e) {
            var i = this._$handlers;
            if (!t) return this._$handlers = {}, this;
            if (e) {
                if (i[t]) {
                    for (var n = [], r = 0, a = i[t].length; r < a; r++) i[t][r].h != e && n.push(i[t][r]);
                    i[t] = n
                }
                i[t] && 0 === i[t].length && delete i[t]
            } else delete i[t];
            return this
        },
        trigger: function(t) {
            if (this._$handlers[t]) {
                var e = arguments,
                    i = e.length;
                i > 3 && (e = ct.call(e, 1));
                for (var n = this._$handlers[t], r = n.length, a = 0; a < r;) {
                    switch (i) {
                        case 1:
                            n[a].h.call(n[a].ctx);
                            break;
                        case 2:
                            n[a].h.call(n[a].ctx, e[1]);
                            break;
                        case 3:
                            n[a].h.call(n[a].ctx, e[1], e[2]);
                            break;
                        default:
                            n[a].h.apply(n[a].ctx, e)
                    }
                    n[a].one ? (n.splice(a, 1), r--) : a++
                }
            }
            return this
        },
        triggerWithContext: function(t) {
            if (this._$handlers[t]) {
                var e = arguments,
                    i = e.length;
                i > 4 && (e = ct.call(e, 1, e.length - 1));
                for (var n = e[e.length - 1], r = this._$handlers[t], a = r.length, o = 0; o < a;) {
                    switch (i) {
                        case 1:
                            r[o].h.call(n);
                            break;
                        case 2:
                            r[o].h.call(n, e[1]);
                            break;
                        case 3:
                            r[o].h.call(n, e[1], e[2]);
                            break;
                        default:
                            r[o].h.apply(n, e)
                    }
                    r[o].one ? (r.splice(o, 1), a--) : o++
                }
            }
            return this
        }
    };
    var ft = "silent";

    function pt() {}
    pt.prototype.dispose = function() {};
    var gt = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
        vt = function(t, e, i, n) {
            dt.call(this), this.storage = t, this.painter = e, this.painterRoot = n, i = i || new pt, this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, ht.call(this), this.setHandlerProxy(i)
        };

    function mt(t, e, i) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, i)) {
            for (var n, r = t; r;) {
                if (r.clipPath && !r.clipPath.contain(e, i)) return !1;
                r.silent && (n = !0), r = r.parent
            }
            return !n || ft
        }
        return !1
    }
    vt.prototype = {
        constructor: vt,
        setHandlerProxy: function(t) {
            this.proxy && this.proxy.dispose(), t && (S(gt, function(e) {
                t.on && t.on(e, this[e], this)
            }, this), t.handler = this), this.proxy = t
        },
        mousemove: function(t) {
            var e = t.zrX,
                i = t.zrY,
                n = this._hovered,
                r = n.target;
            r && !r.__zr && (r = (n = this.findHover(n.x, n.y)).target);
            var a = this._hovered = this.findHover(e, i),
                o = a.target,
                s = this.proxy;
            s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(n, "mouseout", t), this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t)
        },
        mouseout: function(t) {
            this.dispatchToElement(this._hovered, "mouseout", t);
            var e, i = t.toElement || t.relatedTarget;
            do {
                i = i && i.parentNode
            } while (i && 9 != i.nodeType && !(e = i === this.painterRoot));
            !e && this.trigger("globalout", {
                event: t
            })
        },
        resize: function(t) {
            this._hovered = {}
        },
        dispatch: function(t, e) {
            var i = this[t];
            i && i.call(this, e)
        },
        dispose: function() {
            this.proxy.dispose(), this.storage = this.proxy = this.painter = null
        },
        setCursorStyle: function(t) {
            var e = this.proxy;
            e.setCursor && e.setCursor(t)
        },
        dispatchToElement: function(t, e, i) {
            var n = (t = t || {}).target;
            if (!n || !n.silent) {
                for (var r = "on" + e, a = function(t, e, i) {
                        return {
                            type: t,
                            event: i,
                            target: e.target,
                            topTarget: e.topTarget,
                            cancelBubble: !1,
                            offsetX: i.zrX,
                            offsetY: i.zrY,
                            gestureEvent: i.gestureEvent,
                            pinchX: i.pinchX,
                            pinchY: i.pinchY,
                            pinchScale: i.pinchScale,
                            wheelDelta: i.zrDelta,
                            zrByTouch: i.zrByTouch,
                            which: i.which
                        }
                    }(e, t, i); n && (n[r] && (a.cancelBubble = n[r].call(n, a)), n.trigger(e, a), n = n.parent, !a.cancelBubble););
                a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function(t) {
                    "function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a)
                }))
            }
        },
        findHover: function(t, e, i) {
            for (var n = this.storage.getDisplayList(), r = {
                    x: t,
                    y: e
                }, a = n.length - 1; a >= 0; a--) {
                var o;
                if (n[a] !== i && !n[a].ignore && (o = mt(n[a], t, e)) && (!r.topTarget && (r.topTarget = n[a]), o !== ft)) {
                    r.target = n[a];
                    break
                }
            }
            return r
        }
    }, S(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(t) {
        vt.prototype[t] = function(e) {
            var i = this.findHover(e.zrX, e.zrY),
                n = i.target;
            if ("mousedown" === t) this._downEl = n, this._downPoint = [e.zrX, e.zrY], this._upEl = n;
            else if ("mouseup" === t) this._upEl = n;
            else if ("click" === t) {
                if (this._downEl !== this._upEl || !this._downPoint || rt(this._downPoint, [e.zrX, e.zrY]) > 4) return;
                this._downPoint = null
            }
            this.dispatchToElement(i, t, e)
        }
    }), b(vt, dt), b(vt, ht);
    var yt = "undefined" == typeof Float32Array ? Array : Float32Array;

    function xt() {
        var t = new yt(6);
        return _t(t), t
    }

    function _t(t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
    }

    function wt(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
    }

    function bt(t, e, i) {
        var n = e[0] * i[0] + e[2] * i[1],
            r = e[1] * i[0] + e[3] * i[1],
            a = e[0] * i[2] + e[2] * i[3],
            o = e[1] * i[2] + e[3] * i[3],
            s = e[0] * i[4] + e[2] * i[5] + e[4],
            l = e[1] * i[4] + e[3] * i[5] + e[5];
        return t[0] = n, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
    }

    function Mt(t, e, i) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + i[0], t[5] = e[5] + i[1], t
    }

    function St(t, e, i) {
        var n = e[0],
            r = e[2],
            a = e[4],
            o = e[1],
            s = e[3],
            l = e[5],
            h = Math.sin(i),
            u = Math.cos(i);
        return t[0] = n * u + o * h, t[1] = -n * h + o * u, t[2] = r * u + s * h, t[3] = -r * h + u * s, t[4] = u * a + h * l, t[5] = u * l - h * a, t
    }

    function Tt(t, e, i) {
        var n = i[0],
            r = i[1];
        return t[0] = e[0] * n, t[1] = e[1] * r, t[2] = e[2] * n, t[3] = e[3] * r, t[4] = e[4] * n, t[5] = e[5] * r, t
    }

    function It(t, e) {
        var i = e[0],
            n = e[2],
            r = e[4],
            a = e[1],
            o = e[3],
            s = e[5],
            l = i * o - a * n;
        return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -n * l, t[3] = i * l, t[4] = (n * s - o * r) * l, t[5] = (a * r - i * s) * l, t) : null
    }
    var Ct = _t,
        At = 5e-5;

    function Dt(t) {
        return t > At || t < -At
    }
    var kt = function(t) {
            (t = t || {}).position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
        },
        Pt = kt.prototype;
    Pt.transform = null, Pt.needLocalTransform = function() {
        return Dt(this.rotation) || Dt(this.position[0]) || Dt(this.position[1]) || Dt(this.scale[0] - 1) || Dt(this.scale[1] - 1)
    }, Pt.updateTransform = function() {
        var t = this.parent,
            e = t && t.transform,
            i = this.needLocalTransform(),
            n = this.transform;
        i || e ? (n = n || xt(), i ? this.getLocalTransform(n) : Ct(n), e && (i ? bt(n, t.transform, n) : wt(n, t.transform)), this.transform = n, this.invTransform = this.invTransform || xt(), It(this.invTransform, n)) : n && Ct(n)
    }, Pt.getLocalTransform = function(t) {
        return kt.getLocalTransform(this, t)
    }, Pt.setTransform = function(t) {
        var e = this.transform,
            i = t.dpr || 1;
        e ? t.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : t.setTransform(i, 0, 0, i, 0, 0)
    }, Pt.restoreTransform = function(t) {
        var e = t.dpr || 1;
        t.setTransform(e, 0, 0, e, 0, 0)
    };
    var Lt = [];
    Pt.decomposeTransform = function() {
        if (this.transform) {
            var t = this.parent,
                e = this.transform;
            t && t.transform && (bt(Lt, t.invTransform, e), e = Lt);
            var i = e[0] * e[0] + e[1] * e[1],
                n = e[2] * e[2] + e[3] * e[3],
                r = this.position,
                a = this.scale;
            Dt(i - 1) && (i = Math.sqrt(i)), Dt(n - 1) && (n = Math.sqrt(n)), e[0] < 0 && (i = -i), e[3] < 0 && (n = -n), r[0] = e[4], r[1] = e[5], a[0] = i, a[1] = n, this.rotation = Math.atan2(-e[1] / n, e[0] / i)
        }
    }, Pt.getGlobalScale = function() {
        var t = this.transform;
        if (!t) return [1, 1];
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]),
            i = Math.sqrt(t[2] * t[2] + t[3] * t[3]);
        return t[0] < 0 && (e = -e), t[3] < 0 && (i = -i), [e, i]
    }, Pt.transformCoordToLocal = function(t, e) {
        var i = [t, e],
            n = this.invTransform;
        return n && ot(i, i, n), i
    }, Pt.transformCoordToGlobal = function(t, e) {
        var i = [t, e],
            n = this.transform;
        return n && ot(i, i, n), i
    }, kt.getLocalTransform = function(t, e) {
        Ct(e = e || []);
        var i = t.origin,
            n = t.scale || [1, 1],
            r = t.rotation || 0,
            a = t.position || [0, 0];
        return i && (e[4] -= i[0], e[5] -= i[1]), Tt(e, e, n), r && St(e, e, r), i && (e[4] += i[0], e[5] += i[1]), e[4] += a[0], e[5] += a[1], e
    };
    var Ot = {
        linear: function(t) {
            return t
        },
        quadraticIn: function(t) {
            return t * t
        },
        quadraticOut: function(t) {
            return t * (2 - t)
        },
        quadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
        },
        cubicIn: function(t) {
            return t * t * t
        },
        cubicOut: function(t) {
            return --t * t * t + 1
        },
        cubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        },
        quarticIn: function(t) {
            return t * t * t * t
        },
        quarticOut: function(t) {
            return 1 - --t * t * t * t
        },
        quarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
        },
        quinticIn: function(t) {
            return t * t * t * t * t
        },
        quinticOut: function(t) {
            return --t * t * t * t * t + 1
        },
        quinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        },
        sinusoidalIn: function(t) {
            return 1 - Math.cos(t * Math.PI / 2)
        },
        sinusoidalOut: function(t) {
            return Math.sin(t * Math.PI / 2)
        },
        sinusoidalInOut: function(t) {
            return .5 * (1 - Math.cos(Math.PI * t))
        },
        exponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
        },
        exponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
        },
        exponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        },
        circularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t)
        },
        circularOut: function(t) {
            return Math.sqrt(1 - --t * t)
        },
        circularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        elasticIn: function(t) {
            var e, i = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = .1) : e = .4 * Math.asin(1 / i) / (2 * Math.PI), -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4))
        },
        elasticOut: function(t) {
            var e, i = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = .1) : e = .4 * Math.asin(1 / i) / (2 * Math.PI), i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1)
        },
        elasticInOut: function(t) {
            var e, i = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!i || i < 1 ? (i = 1, e = .1) : e = .4 * Math.asin(1 / i) / (2 * Math.PI), (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1)
        },
        backIn: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        },
        backOut: function(t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1
        },
        backInOut: function(t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
        },
        bounceIn: function(t) {
            return 1 - Ot.bounceOut(1 - t)
        },
        bounceOut: function(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        },
        bounceInOut: function(t) {
            return t < .5 ? .5 * Ot.bounceIn(2 * t) : .5 * Ot.bounceOut(2 * t - 1) + .5
        }
    };

    function Et(t) {
        this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
    }
    Et.prototype = {
        constructor: Et,
        step: function(t, e) {
            if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) this._pausedTime += e;
            else {
                var i = (t - this._startTime - this._pausedTime) / this._life;
                if (!(i < 0)) {
                    i = Math.min(i, 1);
                    var n = this.easing,
                        r = "string" == typeof n ? Ot[n] : n,
                        a = "function" == typeof r ? r(i) : i;
                    return this.fire("frame", a), 1 == i ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
                }
            }
        },
        restart: function(t) {
            var e = (t - this._startTime - this._pausedTime) % this._life;
            this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
        },
        fire: function(t, e) {
            this[t = "on" + t] && this[t](this._target, e)
        },
        pause: function() {
            this._paused = !0
        },
        resume: function() {
            this._paused = !1
        }
    };
    var Nt = function() {
            this.head = null, this.tail = null, this._len = 0
        },
        Rt = Nt.prototype;
    Rt.insert = function(t) {
        var e = new Bt(t);
        return this.insertEntry(e), e
    }, Rt.insertEntry = function(t) {
        this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++
    }, Rt.remove = function(t) {
        var e = t.prev,
            i = t.next;
        e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--
    }, Rt.len = function() {
        return this._len
    }, Rt.clear = function() {
        this.head = this.tail = null, this._len = 0
    };
    var Bt = function(t) {
            this.value = t, this.next, this.prev
        },
        zt = function(t) {
            this._list = new Nt, this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null
        },
        Ft = zt.prototype;
    Ft.put = function(t, e) {
        var i = this._list,
            n = this._map,
            r = null;
        if (null == n[t]) {
            var a = i.len(),
                o = this._lastRemovedEntry;
            if (a >= this._maxSize && a > 0) {
                var s = i.head;
                i.remove(s), delete n[s.key], r = s.value, this._lastRemovedEntry = s
            }
            o ? o.value = e : o = new Bt(e), o.key = t, i.insertEntry(o), n[t] = o
        }
        return r
    }, Ft.get = function(t) {
        var e = this._map[t],
            i = this._list;
        if (null != e) return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value
    }, Ft.clear = function() {
        this._list.clear(), this._map = {}
    };
    var Vt = {
        transparent: [0, 0, 0, 0],
        aliceblue: [240, 248, 255, 1],
        antiquewhite: [250, 235, 215, 1],
        aqua: [0, 255, 255, 1],
        aquamarine: [127, 255, 212, 1],
        azure: [240, 255, 255, 1],
        beige: [245, 245, 220, 1],
        bisque: [255, 228, 196, 1],
        black: [0, 0, 0, 1],
        blanchedalmond: [255, 235, 205, 1],
        blue: [0, 0, 255, 1],
        blueviolet: [138, 43, 226, 1],
        brown: [165, 42, 42, 1],
        burlywood: [222, 184, 135, 1],
        cadetblue: [95, 158, 160, 1],
        chartreuse: [127, 255, 0, 1],
        chocolate: [210, 105, 30, 1],
        coral: [255, 127, 80, 1],
        cornflowerblue: [100, 149, 237, 1],
        cornsilk: [255, 248, 220, 1],
        crimson: [220, 20, 60, 1],
        cyan: [0, 255, 255, 1],
        darkblue: [0, 0, 139, 1],
        darkcyan: [0, 139, 139, 1],
        darkgoldenrod: [184, 134, 11, 1],
        darkgray: [169, 169, 169, 1],
        darkgreen: [0, 100, 0, 1],
        darkgrey: [169, 169, 169, 1],
        darkkhaki: [189, 183, 107, 1],
        darkmagenta: [139, 0, 139, 1],
        darkolivegreen: [85, 107, 47, 1],
        darkorange: [255, 140, 0, 1],
        darkorchid: [153, 50, 204, 1],
        darkred: [139, 0, 0, 1],
        darksalmon: [233, 150, 122, 1],
        darkseagreen: [143, 188, 143, 1],
        darkslateblue: [72, 61, 139, 1],
        darkslategray: [47, 79, 79, 1],
        darkslategrey: [47, 79, 79, 1],
        darkturquoise: [0, 206, 209, 1],
        darkviolet: [148, 0, 211, 1],
        deeppink: [255, 20, 147, 1],
        deepskyblue: [0, 191, 255, 1],
        dimgray: [105, 105, 105, 1],
        dimgrey: [105, 105, 105, 1],
        dodgerblue: [30, 144, 255, 1],
        firebrick: [178, 34, 34, 1],
        floralwhite: [255, 250, 240, 1],
        forestgreen: [34, 139, 34, 1],
        fuchsia: [255, 0, 255, 1],
        gainsboro: [220, 220, 220, 1],
        ghostwhite: [248, 248, 255, 1],
        gold: [255, 215, 0, 1],
        goldenrod: [218, 165, 32, 1],
        gray: [128, 128, 128, 1],
        green: [0, 128, 0, 1],
        greenyellow: [173, 255, 47, 1],
        grey: [128, 128, 128, 1],
        honeydew: [240, 255, 240, 1],
        hotpink: [255, 105, 180, 1],
        indianred: [205, 92, 92, 1],
        indigo: [75, 0, 130, 1],
        ivory: [255, 255, 240, 1],
        khaki: [240, 230, 140, 1],
        lavender: [230, 230, 250, 1],
        lavenderblush: [255, 240, 245, 1],
        lawngreen: [124, 252, 0, 1],
        lemonchiffon: [255, 250, 205, 1],
        lightblue: [173, 216, 230, 1],
        lightcoral: [240, 128, 128, 1],
        lightcyan: [224, 255, 255, 1],
        lightgoldenrodyellow: [250, 250, 210, 1],
        lightgray: [211, 211, 211, 1],
        lightgreen: [144, 238, 144, 1],
        lightgrey: [211, 211, 211, 1],
        lightpink: [255, 182, 193, 1],
        lightsalmon: [255, 160, 122, 1],
        lightseagreen: [32, 178, 170, 1],
        lightskyblue: [135, 206, 250, 1],
        lightslategray: [119, 136, 153, 1],
        lightslategrey: [119, 136, 153, 1],
        lightsteelblue: [176, 196, 222, 1],
        lightyellow: [255, 255, 224, 1],
        lime: [0, 255, 0, 1],
        limegreen: [50, 205, 50, 1],
        linen: [250, 240, 230, 1],
        magenta: [255, 0, 255, 1],
        maroon: [128, 0, 0, 1],
        mediumaquamarine: [102, 205, 170, 1],
        mediumblue: [0, 0, 205, 1],
        mediumorchid: [186, 85, 211, 1],
        mediumpurple: [147, 112, 219, 1],
        mediumseagreen: [60, 179, 113, 1],
        mediumslateblue: [123, 104, 238, 1],
        mediumspringgreen: [0, 250, 154, 1],
        mediumturquoise: [72, 209, 204, 1],
        mediumvioletred: [199, 21, 133, 1],
        midnightblue: [25, 25, 112, 1],
        mintcream: [245, 255, 250, 1],
        mistyrose: [255, 228, 225, 1],
        moccasin: [255, 228, 181, 1],
        navajowhite: [255, 222, 173, 1],
        navy: [0, 0, 128, 1],
        oldlace: [253, 245, 230, 1],
        olive: [128, 128, 0, 1],
        olivedrab: [107, 142, 35, 1],
        orange: [255, 165, 0, 1],
        orangered: [255, 69, 0, 1],
        orchid: [218, 112, 214, 1],
        palegoldenrod: [238, 232, 170, 1],
        palegreen: [152, 251, 152, 1],
        paleturquoise: [175, 238, 238, 1],
        palevioletred: [219, 112, 147, 1],
        papayawhip: [255, 239, 213, 1],
        peachpuff: [255, 218, 185, 1],
        peru: [205, 133, 63, 1],
        pink: [255, 192, 203, 1],
        plum: [221, 160, 221, 1],
        powderblue: [176, 224, 230, 1],
        purple: [128, 0, 128, 1],
        red: [255, 0, 0, 1],
        rosybrown: [188, 143, 143, 1],
        royalblue: [65, 105, 225, 1],
        saddlebrown: [139, 69, 19, 1],
        salmon: [250, 128, 114, 1],
        sandybrown: [244, 164, 96, 1],
        seagreen: [46, 139, 87, 1],
        seashell: [255, 245, 238, 1],
        sienna: [160, 82, 45, 1],
        silver: [192, 192, 192, 1],
        skyblue: [135, 206, 235, 1],
        slateblue: [106, 90, 205, 1],
        slategray: [112, 128, 144, 1],
        slategrey: [112, 128, 144, 1],
        snow: [255, 250, 250, 1],
        springgreen: [0, 255, 127, 1],
        steelblue: [70, 130, 180, 1],
        tan: [210, 180, 140, 1],
        teal: [0, 128, 128, 1],
        thistle: [216, 191, 216, 1],
        tomato: [255, 99, 71, 1],
        turquoise: [64, 224, 208, 1],
        violet: [238, 130, 238, 1],
        wheat: [245, 222, 179, 1],
        white: [255, 255, 255, 1],
        whitesmoke: [245, 245, 245, 1],
        yellow: [255, 255, 0, 1],
        yellowgreen: [154, 205, 50, 1]
    };

    function Ht(t) {
        return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t
    }

    function Wt(t) {
        return t < 0 ? 0 : t > 1 ? 1 : t
    }

    function Gt(t) {
        return t.length && "%" === t.charAt(t.length - 1) ? Ht(parseFloat(t) / 100 * 255) : Ht(parseInt(t, 10))
    }

    function qt(t) {
        return t.length && "%" === t.charAt(t.length - 1) ? Wt(parseFloat(t) / 100) : Wt(parseFloat(t))
    }

    function Xt(t, e, i) {
        return i < 0 ? i += 1 : i > 1 && (i -= 1), 6 * i < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t
    }

    function Ut(t, e, i, n, r) {
        return t[0] = e, t[1] = i, t[2] = n, t[3] = r, t
    }

    function Yt(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
    }
    var Zt = new zt(20),
        jt = null;

    function Kt(t, e) {
        jt && Yt(jt, e), jt = Zt.put(t, jt || e.slice())
    }

    function $t(t, e) {
        if (t) {
            e = e || [];
            var i = Zt.get(t);
            if (i) return Yt(e, i);
            var n, r = (t += "").replace(/ /g, "").toLowerCase();
            if (r in Vt) return Yt(e, Vt[r]), Kt(t, e), e;
            if ("#" === r.charAt(0)) return 4 === r.length ? (n = parseInt(r.substr(1), 16)) >= 0 && n <= 4095 ? (Ut(e, (3840 & n) >> 4 | (3840 & n) >> 8, 240 & n | (240 & n) >> 4, 15 & n | (15 & n) << 4, 1), Kt(t, e), e) : void Ut(e, 0, 0, 0, 1) : 7 === r.length ? (n = parseInt(r.substr(1), 16)) >= 0 && n <= 16777215 ? (Ut(e, (16711680 & n) >> 16, (65280 & n) >> 8, 255 & n, 1), Kt(t, e), e) : void Ut(e, 0, 0, 0, 1) : void 0;
            var a = r.indexOf("("),
                o = r.indexOf(")");
            if (-1 !== a && o + 1 === r.length) {
                var s = r.substr(0, a),
                    l = r.substr(a + 1, o - (a + 1)).split(","),
                    h = 1;
                switch (s) {
                    case "rgba":
                        if (4 !== l.length) return void Ut(e, 0, 0, 0, 1);
                        h = qt(l.pop());
                    case "rgb":
                        return 3 !== l.length ? void Ut(e, 0, 0, 0, 1) : (Ut(e, Gt(l[0]), Gt(l[1]), Gt(l[2]), h), Kt(t, e), e);
                    case "hsla":
                        return 4 !== l.length ? void Ut(e, 0, 0, 0, 1) : (l[3] = qt(l[3]), Qt(l, e), Kt(t, e), e);
                    case "hsl":
                        return 3 !== l.length ? void Ut(e, 0, 0, 0, 1) : (Qt(l, e), Kt(t, e), e);
                    default:
                        return
                }
            }
            Ut(e, 0, 0, 0, 1)
        }
    }

    function Qt(t, e) {
        var i = (parseFloat(t[0]) % 360 + 360) % 360 / 360,
            n = qt(t[1]),
            r = qt(t[2]),
            a = r <= .5 ? r * (n + 1) : r + n - r * n,
            o = 2 * r - a;
        return Ut(e = e || [], Ht(255 * Xt(o, a, i + 1 / 3)), Ht(255 * Xt(o, a, i)), Ht(255 * Xt(o, a, i - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e
    }

    function Jt(t, e) {
        if (t && t.length) {
            var i = t[0] + "," + t[1] + "," + t[2];
            return "rgba" !== e && "hsva" !== e && "hsla" !== e || (i += "," + t[3]), e + "(" + i + ")"
        }
    }
    var te = Array.prototype.slice;

    function ee(t, e) {
        return t[e]
    }

    function ie(t, e, i) {
        t[e] = i
    }

    function ne(t, e, i) {
        return (e - t) * i + t
    }

    function re(t, e, i) {
        return i > .5 ? e : t
    }

    function ae(t, e, i, n, r) {
        var a = t.length;
        if (1 == r)
            for (var o = 0; o < a; o++) n[o] = ne(t[o], e[o], i);
        else {
            var s = a && t[0].length;
            for (o = 0; o < a; o++)
                for (var l = 0; l < s; l++) n[o][l] = ne(t[o][l], e[o][l], i)
        }
    }

    function oe(t, e, i) {
        var n = t.length,
            r = e.length;
        if (n !== r)
            if (n > r) t.length = r;
            else
                for (var a = n; a < r; a++) t.push(1 === i ? e[a] : te.call(e[a]));
        var o = t[0] && t[0].length;
        for (a = 0; a < t.length; a++)
            if (1 === i) isNaN(t[a]) && (t[a] = e[a]);
            else
                for (var s = 0; s < o; s++) isNaN(t[a][s]) && (t[a][s] = e[a][s])
    }

    function se(t, e, i) {
        if (t === e) return !0;
        var n = t.length;
        if (n !== e.length) return !1;
        if (1 === i) {
            for (var r = 0; r < n; r++)
                if (t[r] !== e[r]) return !1
        } else {
            var a = t[0].length;
            for (r = 0; r < n; r++)
                for (var o = 0; o < a; o++)
                    if (t[r][o] !== e[r][o]) return !1
        }
        return !0
    }

    function le(t, e, i, n, r, a, o, s, l) {
        var h = t.length;
        if (1 == l)
            for (var u = 0; u < h; u++) s[u] = he(t[u], e[u], i[u], n[u], r, a, o);
        else {
            var c = t[0].length;
            for (u = 0; u < h; u++)
                for (var d = 0; d < c; d++) s[u][d] = he(t[u][d], e[u][d], i[u][d], n[u][d], r, a, o)
        }
    }

    function he(t, e, i, n, r, a, o) {
        var s = .5 * (i - t),
            l = .5 * (n - e);
        return (2 * (e - i) + s + l) * o + (-3 * (e - i) - 2 * s - l) * a + s * r + e
    }

    function ue(t) {
        if (M(t)) {
            var e = t.length;
            if (M(t[0])) {
                for (var i = [], n = 0; n < e; n++) i.push(te.call(t[n]));
                return i
            }
            return te.call(t)
        }
        return t
    }

    function ce(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
    }

    function de(t, e, i, n, r, a) {
        var o = t._getter,
            s = t._setter,
            l = "spline" === e,
            h = n.length;
        if (h) {
            var u, c = M(n[0].value),
                d = !1,
                f = !1,
                p = c ? function(t) {
                    var e = t[t.length - 1].value;
                    return M(e && e[0]) ? 2 : 1
                }(n) : 0;
            n.sort(function(t, e) {
                return t.time - e.time
            }), u = n[h - 1].time;
            for (var g = [], v = [], m = n[0].value, y = !0, x = 0; x < h; x++) {
                g.push(n[x].time / u);
                var _ = n[x].value;
                if (c && se(_, m, p) || !c && _ === m || (y = !1), m = _, "string" == typeof _) {
                    var w = $t(_);
                    w ? (_ = w, d = !0) : f = !0
                }
                v.push(_)
            }
            if (a || !y) {
                var b = v[h - 1];
                for (x = 0; x < h - 1; x++) c ? oe(v[x], b, p) : !isNaN(v[x]) || isNaN(b) || f || d || (v[x] = b);
                c && oe(o(t._target, r), b, p);
                var S, T, I, C, A, D = 0,
                    k = 0;
                if (d) var P = [0, 0, 0, 0];
                var L = new Et({
                    target: t._target,
                    life: u,
                    loop: t._loop,
                    delay: t._delay,
                    onframe: function(t, e) {
                        var i;
                        if (e < 0) i = 0;
                        else if (e < k) {
                            for (i = Math.min(D + 1, h - 1); i >= 0 && !(g[i] <= e); i--);
                            i = Math.min(i, h - 2)
                        } else {
                            for (i = D; i < h && !(g[i] > e); i++);
                            i = Math.min(i - 1, h - 2)
                        }
                        D = i, k = e;
                        var n = g[i + 1] - g[i];
                        if (0 !== n)
                            if (S = (e - g[i]) / n, l)
                                if (I = v[i], T = v[0 === i ? i : i - 1], C = v[i > h - 2 ? h - 1 : i + 1], A = v[i > h - 3 ? h - 1 : i + 2], c) le(T, I, C, A, S, S * S, S * S * S, o(t, r), p);
                                else {
                                    if (d) a = le(T, I, C, A, S, S * S, S * S * S, P, 1), a = ce(P);
                                    else {
                                        if (f) return re(I, C, S);
                                        a = he(T, I, C, A, S, S * S, S * S * S)
                                    }
                                    s(t, r, a)
                                } else if (c) ae(v[i], v[i + 1], S, o(t, r), p);
                        else {
                            var a;
                            if (d) ae(v[i], v[i + 1], S, P, 1), a = ce(P);
                            else {
                                if (f) return re(v[i], v[i + 1], S);
                                a = ne(v[i], v[i + 1], S)
                            }
                            s(t, r, a)
                        }
                    },
                    ondestroy: i
                });
                return e && "spline" !== e && (L.easing = e), L
            }
        }
    }
    var fe = function(t, e, i, n) {
        this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = i || ee, this._setter = n || ie, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
    };
    fe.prototype = {
        when: function(t, e) {
            var i = this._tracks;
            for (var n in e)
                if (e.hasOwnProperty(n)) {
                    if (!i[n]) {
                        i[n] = [];
                        var r = this._getter(this._target, n);
                        if (null == r) continue;
                        0 !== t && i[n].push({
                            time: 0,
                            value: ue(r)
                        })
                    }
                    i[n].push({
                        time: t,
                        value: e[n]
                    })
                }
            return this
        },
        during: function(t) {
            return this._onframeList.push(t), this
        },
        pause: function() {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
            this._paused = !0
        },
        resume: function() {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
            this._paused = !1
        },
        isPaused: function() {
            return !!this._paused
        },
        _doneCallback: function() {
            this._tracks = {}, this._clipList.length = 0;
            for (var t = this._doneList, e = t.length, i = 0; i < e; i++) t[i].call(this)
        },
        start: function(t, e) {
            var i, n = this,
                r = 0,
                a = function() {
                    --r || n._doneCallback()
                };
            for (var o in this._tracks)
                if (this._tracks.hasOwnProperty(o)) {
                    var s = de(this, t, a, this._tracks[o], o, e);
                    s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), i = s)
                }
            if (i) {
                var l = i.onframe;
                i.onframe = function(t, e) {
                    l(t, e);
                    for (var i = 0; i < n._onframeList.length; i++) n._onframeList[i](t, e)
                }
            }
            return r || this._doneCallback(), this
        },
        stop: function(t) {
            for (var e = this._clipList, i = this.animation, n = 0; n < e.length; n++) {
                var r = e[n];
                t && r.onframe(this._target, 1), i && i.removeClip(r)
            }
            e.length = 0
        },
        delay: function(t) {
            return this._delay = t, this
        },
        done: function(t) {
            return t && this._doneList.push(t), this
        },
        getClips: function() {
            return this._clipList
        }
    };
    var pe = 1;
    "undefined" != typeof window && (pe = Math.max(window.devicePixelRatio || 1, 1));
    var ge = pe,
        ve = function() {};
    var me = ve,
        ye = function() {
            this.animators = []
        };
    ye.prototype = {
        constructor: ye,
        animate: function(t, e) {
            var i, n = !1,
                r = this,
                a = this.__zr;
            if (t) {
                var o = t.split("."),
                    s = r;
                n = "shape" === o[0];
                for (var l = 0, h = o.length; l < h; l++) s && (s = s[o[l]]);
                s && (i = s)
            } else i = r;
            if (i) {
                var u = r.animators,
                    c = new fe(i, e);
                return c.during(function(t) {
                    r.dirty(n)
                }).done(function() {
                    u.splice(_(u, c), 1)
                }), u.push(c), a && a.animation.addAnimator(c), c
            }
            me('Property "' + t + '" is not existed in element ' + r.id)
        },
        stopAnimation: function(t) {
            for (var e = this.animators, i = e.length, n = 0; n < i; n++) e[n].stop(t);
            return e.length = 0, this
        },
        animateTo: function(t, e, i, n, r, a) {
            P(i) ? (r = n, n = i, i = 0) : k(n) ? (r = n, n = "linear", i = 0) : k(i) ? (r = i, i = 0) : k(e) ? (r = e, e = 500) : e || (e = 500), this.stopAnimation(), this._animateToShallow("", this, t, e, i);
            var o = this.animators.slice(),
                s = o.length;

            function l() {
                --s || r && r()
            }
            s || r && r();
            for (var h = 0; h < o.length; h++) o[h].done(l).start(n, a)
        },
        _animateToShallow: function(t, e, i, n, r) {
            var a = {},
                o = 0;
            for (var s in i)
                if (i.hasOwnProperty(s))
                    if (null != e[s]) L(i[s]) && !M(i[s]) ? this._animateToShallow(t ? t + "." + s : s, e[s], i[s], n, r) : (a[s] = i[s], o++);
                    else if (null != i[s])
                if (t) {
                    var l = {};
                    l[t] = {}, l[t][s] = i[s], this.attr(l)
                } else this.attr(s, i[s]);
            return o > 0 && this.animate(t, !1).when(null == n ? 500 : n, a).delay(r || 0), this
        }
    };
    var xe = function(t) {
        kt.call(this, t), dt.call(this, t), ye.call(this, t), this.id = t.id || i()
    };
    xe.prototype = {
        type: "element",
        name: "",
        __zr: null,
        ignore: !1,
        clipPath: null,
        isGroup: !1,
        drift: function(t, e) {
            switch (this.draggable) {
                case "horizontal":
                    e = 0;
                    break;
                case "vertical":
                    t = 0
            }
            var i = this.transform;
            i || (i = this.transform = [1, 0, 0, 1, 0, 0]), i[4] += t, i[5] += e, this.decomposeTransform(), this.dirty(!1)
        },
        beforeUpdate: function() {},
        afterUpdate: function() {},
        update: function() {
            this.updateTransform()
        },
        traverse: function(t, e) {},
        attrKV: function(t, e) {
            if ("position" === t || "scale" === t || "origin" === t) {
                if (e) {
                    var i = this[t];
                    i || (i = this[t] = []), i[0] = e[0], i[1] = e[1]
                }
            } else this[t] = e
        },
        hide: function() {
            this.ignore = !0, this.__zr && this.__zr.refresh()
        },
        show: function() {
            this.ignore = !1, this.__zr && this.__zr.refresh()
        },
        attr: function(t, e) {
            if ("string" == typeof t) this.attrKV(t, e);
            else if (L(t))
                for (var i in t) t.hasOwnProperty(i) && this.attrKV(i, t[i]);
            return this.dirty(!1), this
        },
        setClipPath: function(t) {
            var e = this.__zr;
            e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
        },
        removeClipPath: function() {
            var t = this.clipPath;
            t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
        },
        addSelfToZr: function(t) {
            this.__zr = t;
            var e = this.animators;
            if (e)
                for (var i = 0; i < e.length; i++) t.animation.addAnimator(e[i]);
            this.clipPath && this.clipPath.addSelfToZr(t)
        },
        removeSelfFromZr: function(t) {
            this.__zr = null;
            var e = this.animators;
            if (e)
                for (var i = 0; i < e.length; i++) t.animation.removeAnimator(e[i]);
            this.clipPath && this.clipPath.removeSelfFromZr(t)
        }
    }, b(xe, ye), b(xe, kt), b(xe, dt);
    var _e, we, be, Me, Se = ot,
        Te = Math.min,
        Ie = Math.max;

    function Ce(t, e, i, n) {
        i < 0 && (t += i, i = -i), n < 0 && (e += n, n = -n), this.x = t, this.y = e, this.width = i, this.height = n
    }
    Ce.prototype = {
        constructor: Ce,
        union: function(t) {
            var e = Te(t.x, this.x),
                i = Te(t.y, this.y);
            this.width = Ie(t.x + t.width, this.x + this.width) - e, this.height = Ie(t.y + t.height, this.y + this.height) - i, this.x = e, this.y = i
        },
        applyTransform: (_e = [], we = [], be = [], Me = [], function(t) {
            if (t) {
                _e[0] = be[0] = this.x, _e[1] = Me[1] = this.y, we[0] = Me[0] = this.x + this.width, we[1] = be[1] = this.y + this.height, Se(_e, _e, t), Se(we, we, t), Se(be, be, t), Se(Me, Me, t), this.x = Te(_e[0], we[0], be[0], Me[0]), this.y = Te(_e[1], we[1], be[1], Me[1]);
                var e = Ie(_e[0], we[0], be[0], Me[0]),
                    i = Ie(_e[1], we[1], be[1], Me[1]);
                this.width = e - this.x, this.height = i - this.y
            }
        }),
        calculateTransform: function(t) {
            var e = this,
                i = t.width / e.width,
                n = t.height / e.height,
                r = xt();
            return Mt(r, r, [-e.x, -e.y]), Tt(r, r, [i, n]), Mt(r, r, [t.x, t.y]), r
        },
        intersect: function(t) {
            if (!t) return !1;
            t instanceof Ce || (t = Ce.create(t));
            var e = this,
                i = e.x,
                n = e.x + e.width,
                r = e.y,
                a = e.y + e.height,
                o = t.x,
                s = t.x + t.width,
                l = t.y,
                h = t.y + t.height;
            return !(n < o || s < i || a < l || h < r)
        },
        contain: function(t, e) {
            return t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height
        },
        clone: function() {
            return new Ce(this.x, this.y, this.width, this.height)
        },
        copy: function(t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
        },
        plain: function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        }
    }, Ce.create = function(t) {
        return new Ce(t.x, t.y, t.width, t.height)
    };
    var Ae = function(t) {
        for (var e in t = t || {}, xe.call(this, t), t) t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0
    };
    Ae.prototype = {
        constructor: Ae,
        isGroup: !0,
        type: "group",
        silent: !1,
        children: function() {
            return this._children.slice()
        },
        childAt: function(t) {
            return this._children[t]
        },
        childOfName: function(t) {
            for (var e = this._children, i = 0; i < e.length; i++)
                if (e[i].name === t) return e[i]
        },
        childCount: function() {
            return this._children.length
        },
        add: function(t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
        },
        addBefore: function(t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var i = this._children,
                    n = i.indexOf(e);
                n >= 0 && (i.splice(n, 0, t), this._doAdd(t))
            }
            return this
        },
        _doAdd: function(t) {
            t.parent && t.parent.remove(t), t.parent = this;
            var e = this.__storage,
                i = this.__zr;
            e && e !== t.__storage && (e.addToStorage(t), t instanceof Ae && t.addChildrenToStorage(e)), i && i.refresh()
        },
        remove: function(t) {
            var e = this.__zr,
                i = this.__storage,
                n = this._children,
                r = _(n, t);
            return r < 0 ? this : (n.splice(r, 1), t.parent = null, i && (i.delFromStorage(t), t instanceof Ae && t.delChildrenFromStorage(i)), e && e.refresh(), this)
        },
        removeAll: function() {
            var t, e, i = this._children,
                n = this.__storage;
            for (e = 0; e < i.length; e++) t = i[e], n && (n.delFromStorage(t), t instanceof Ae && t.delChildrenFromStorage(n)), t.parent = null;
            return i.length = 0, this
        },
        eachChild: function(t, e) {
            for (var i = this._children, n = 0; n < i.length; n++) {
                var r = i[n];
                t.call(e, r, n)
            }
            return this
        },
        traverse: function(t, e) {
            for (var i = 0; i < this._children.length; i++) {
                var n = this._children[i];
                t.call(e, n), "group" === n.type && n.traverse(t, e)
            }
            return this
        },
        addChildrenToStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.addToStorage(i), i instanceof Ae && i.addChildrenToStorage(t)
            }
        },
        delChildrenFromStorage: function(t) {
            for (var e = 0; e < this._children.length; e++) {
                var i = this._children[e];
                t.delFromStorage(i), i instanceof Ae && i.delChildrenFromStorage(t)
            }
        },
        dirty: function() {
            return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
        },
        getBoundingRect: function(t) {
            for (var e = null, i = new Ce(0, 0, 0, 0), n = t || this._children, r = [], a = 0; a < n.length; a++) {
                var o = n[a];
                if (!o.ignore && !o.invisible) {
                    var s = o.getBoundingRect(),
                        l = o.getLocalTransform(r);
                    l ? (i.copy(s), i.applyTransform(l), (e = e || i.clone()).union(i)) : (e = e || s.clone()).union(s)
                }
            }
            return e || i
        }
    }, w(Ae, xe);
    var De = 32,
        ke = 7;

    function Pe(t, e, i, n) {
        var r = e + 1;
        if (r === i) return 1;
        if (n(t[r++], t[e]) < 0) {
            for (; r < i && n(t[r], t[r - 1]) < 0;) r++;
            ! function(t, e, i) {
                i--;
                for (; e < i;) {
                    var n = t[e];
                    t[e++] = t[i], t[i--] = n
                }
            }(t, e, r)
        } else
            for (; r < i && n(t[r], t[r - 1]) >= 0;) r++;
        return r - e
    }

    function Le(t, e, i, n, r) {
        for (n === e && n++; n < i; n++) {
            for (var a, o = t[n], s = e, l = n; s < l;) r(o, t[a = s + l >>> 1]) < 0 ? l = a : s = a + 1;
            var h = n - s;
            switch (h) {
                case 3:
                    t[s + 3] = t[s + 2];
                case 2:
                    t[s + 2] = t[s + 1];
                case 1:
                    t[s + 1] = t[s];
                    break;
                default:
                    for (; h > 0;) t[s + h] = t[s + h - 1], h--
            }
            t[s] = o
        }
    }

    function Oe(t, e, i, n, r, a) {
        var o = 0,
            s = 0,
            l = 1;
        if (a(t, e[i + r]) > 0) {
            for (s = n - r; l < s && a(t, e[i + r + l]) > 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
            l > s && (l = s), o += r, l += r
        } else {
            for (s = r + 1; l < s && a(t, e[i + r - l]) <= 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
            l > s && (l = s);
            var h = o;
            o = r - l, l = r - h
        }
        for (o++; o < l;) {
            var u = o + (l - o >>> 1);
            a(t, e[i + u]) > 0 ? o = u + 1 : l = u
        }
        return l
    }

    function Ee(t, e, i, n, r, a) {
        var o = 0,
            s = 0,
            l = 1;
        if (a(t, e[i + r]) < 0) {
            for (s = r + 1; l < s && a(t, e[i + r - l]) < 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
            l > s && (l = s);
            var h = o;
            o = r - l, l = r - h
        } else {
            for (s = n - r; l < s && a(t, e[i + r + l]) >= 0;) o = l, (l = 1 + (l << 1)) <= 0 && (l = s);
            l > s && (l = s), o += r, l += r
        }
        for (o++; o < l;) {
            var u = o + (l - o >>> 1);
            a(t, e[i + u]) < 0 ? l = u : o = u + 1
        }
        return l
    }

    function Ne(t, e) {
        var i, n, r = ke,
            a = 0,
            o = [];

        function s(s) {
            var l = i[s],
                h = n[s],
                u = i[s + 1],
                c = n[s + 1];
            n[s] = h + c, s === a - 3 && (i[s + 1] = i[s + 2], n[s + 1] = n[s + 2]), a--;
            var d = Ee(t[u], t, l, h, 0, e);
            l += d, 0 !== (h -= d) && 0 !== (c = Oe(t[l + h - 1], t, u, c, c - 1, e)) && (h <= c ? function(i, n, a, s) {
                var l = 0;
                for (l = 0; l < n; l++) o[l] = t[i + l];
                var h = 0,
                    u = a,
                    c = i;
                if (t[c++] = t[u++], 0 == --s) {
                    for (l = 0; l < n; l++) t[c + l] = o[h + l];
                    return
                }
                if (1 === n) {
                    for (l = 0; l < s; l++) t[c + l] = t[u + l];
                    return void(t[c + s] = o[h])
                }
                var d, f, p, g = r;
                for (;;) {
                    d = 0, f = 0, p = !1;
                    do {
                        if (e(t[u], o[h]) < 0) {
                            if (t[c++] = t[u++], f++, d = 0, 0 == --s) {
                                p = !0;
                                break
                            }
                        } else if (t[c++] = o[h++], d++, f = 0, 1 == --n) {
                            p = !0;
                            break
                        }
                    } while ((d | f) < g);
                    if (p) break;
                    do {
                        if (0 !== (d = Ee(t[u], o, h, n, 0, e))) {
                            for (l = 0; l < d; l++) t[c + l] = o[h + l];
                            if (c += d, h += d, (n -= d) <= 1) {
                                p = !0;
                                break
                            }
                        }
                        if (t[c++] = t[u++], 0 == --s) {
                            p = !0;
                            break
                        }
                        if (0 !== (f = Oe(o[h], t, u, s, 0, e))) {
                            for (l = 0; l < f; l++) t[c + l] = t[u + l];
                            if (c += f, u += f, 0 === (s -= f)) {
                                p = !0;
                                break
                            }
                        }
                        if (t[c++] = o[h++], 1 == --n) {
                            p = !0;
                            break
                        }
                        g--
                    } while (d >= ke || f >= ke);
                    if (p) break;
                    g < 0 && (g = 0), g += 2
                }
                if ((r = g) < 1 && (r = 1), 1 === n) {
                    for (l = 0; l < s; l++) t[c + l] = t[u + l];
                    t[c + s] = o[h]
                } else {
                    if (0 === n) throw new Error;
                    for (l = 0; l < n; l++) t[c + l] = o[h + l]
                }
            }(l, h, u, c) : function(i, n, a, s) {
                var l = 0;
                for (l = 0; l < s; l++) o[l] = t[a + l];
                var h = i + n - 1,
                    u = s - 1,
                    c = a + s - 1,
                    d = 0,
                    f = 0;
                if (t[c--] = t[h--], 0 == --n) {
                    for (d = c - (s - 1), l = 0; l < s; l++) t[d + l] = o[l];
                    return
                }
                if (1 === s) {
                    for (f = (c -= n) + 1, d = (h -= n) + 1, l = n - 1; l >= 0; l--) t[f + l] = t[d + l];
                    return void(t[c] = o[u])
                }
                var p = r;
                for (;;) {
                    var g = 0,
                        v = 0,
                        m = !1;
                    do {
                        if (e(o[u], t[h]) < 0) {
                            if (t[c--] = t[h--], g++, v = 0, 0 == --n) {
                                m = !0;
                                break
                            }
                        } else if (t[c--] = o[u--], v++, g = 0, 1 == --s) {
                            m = !0;
                            break
                        }
                    } while ((g | v) < p);
                    if (m) break;
                    do {
                        if (0 !== (g = n - Ee(o[u], t, i, n, n - 1, e))) {
                            for (n -= g, f = (c -= g) + 1, d = (h -= g) + 1, l = g - 1; l >= 0; l--) t[f + l] = t[d + l];
                            if (0 === n) {
                                m = !0;
                                break
                            }
                        }
                        if (t[c--] = o[u--], 1 == --s) {
                            m = !0;
                            break
                        }
                        if (0 !== (v = s - Oe(t[h], o, 0, s, s - 1, e))) {
                            for (s -= v, f = (c -= v) + 1, d = (u -= v) + 1, l = 0; l < v; l++) t[f + l] = o[d + l];
                            if (s <= 1) {
                                m = !0;
                                break
                            }
                        }
                        if (t[c--] = t[h--], 0 == --n) {
                            m = !0;
                            break
                        }
                        p--
                    } while (g >= ke || v >= ke);
                    if (m) break;
                    p < 0 && (p = 0), p += 2
                }(r = p) < 1 && (r = 1);
                if (1 === s) {
                    for (f = (c -= n) + 1, d = (h -= n) + 1, l = n - 1; l >= 0; l--) t[f + l] = t[d + l];
                    t[c] = o[u]
                } else {
                    if (0 === s) throw new Error;
                    for (d = c - (s - 1), l = 0; l < s; l++) t[d + l] = o[l]
                }
            }(l, h, u, c))
        }
        i = [], n = [], this.mergeRuns = function() {
            for (; a > 1;) {
                var t = a - 2;
                if (t >= 1 && n[t - 1] <= n[t] + n[t + 1] || t >= 2 && n[t - 2] <= n[t] + n[t - 1]) n[t - 1] < n[t + 1] && t--;
                else if (n[t] > n[t + 1]) break;
                s(t)
            }
        }, this.forceMergeRuns = function() {
            for (; a > 1;) {
                var t = a - 2;
                t > 0 && n[t - 1] < n[t + 1] && t--, s(t)
            }
        }, this.pushRun = function(t, e) {
            i[a] = t, n[a] = e, a += 1
        }
    }

    function Re(t, e, i, n) {
        i || (i = 0), n || (n = t.length);
        var r = n - i;
        if (!(r < 2)) {
            var a = 0;
            if (r < De) Le(t, i, n, i + (a = Pe(t, i, n, e)), e);
            else {
                var o = new Ne(t, e),
                    s = function(t) {
                        for (var e = 0; t >= De;) e |= 1 & t, t >>= 1;
                        return t + e
                    }(r);
                do {
                    if ((a = Pe(t, i, n, e)) < s) {
                        var l = r;
                        l > s && (l = s), Le(t, i, i + l, i + a, e), a = l
                    }
                    o.pushRun(i, a), o.mergeRuns(), r -= a, i += a
                } while (0 !== r);
                o.forceMergeRuns()
            }
        }
    }

    function Be(t, e) {
        return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
    }
    var ze = function() {
        this._roots = [], this._displayList = [], this._displayListLen = 0
    };
    ze.prototype = {
        constructor: ze,
        traverse: function(t, e) {
            for (var i = 0; i < this._roots.length; i++) this._roots[i].traverse(t, e)
        },
        getDisplayList: function(t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList
        },
        updateDisplayList: function(t) {
            this._displayListLen = 0;
            for (var e = this._roots, i = this._displayList, r = 0, a = e.length; r < a; r++) this._updateAndAddDisplayable(e[r], null, t);
            i.length = this._displayListLen, n.canvasSupported && Re(i, Be)
        },
        _updateAndAddDisplayable: function(t, e, i) {
            if (!t.ignore || i) {
                t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                var n = t.clipPath;
                if (n) {
                    e = e ? e.slice() : [];
                    for (var r = n, a = t; r;) r.parent = a, r.updateTransform(), e.push(r), a = r, r = r.clipPath
                }
                if (t.isGroup) {
                    for (var o = t._children, s = 0; s < o.length; s++) {
                        var l = o[s];
                        t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, i)
                    }
                    t.__dirty = !1
                } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
            }
        },
        addRoot: function(t) {
            t.__storage !== this && (t instanceof Ae && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t))
        },
        delRoot: function(t) {
            if (null == t) {
                for (var e = 0; e < this._roots.length; e++) {
                    var i = this._roots[e];
                    i instanceof Ae && i.delChildrenFromStorage(this)
                }
                return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
            }
            if (t instanceof Array) {
                e = 0;
                for (var n = t.length; e < n; e++) this.delRoot(t[e])
            } else {
                var r = _(this._roots, t);
                r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof Ae && t.delChildrenFromStorage(this))
            }
        },
        addToStorage: function(t) {
            return t && (t.__storage = this, t.dirty(!1)), this
        },
        delFromStorage: function(t) {
            return t && (t.__storage = null), this
        },
        dispose: function() {
            this._renderList = this._roots = null
        },
        displayableSortFunc: Be
    };
    var Fe = {
            shadowBlur: 1,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            textShadowBlur: 1,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
            textBoxShadowBlur: 1,
            textBoxShadowOffsetX: 1,
            textBoxShadowOffsetY: 1
        },
        Ve = function(t, e, i) {
            return Fe.hasOwnProperty(e) ? i * t.dpr : i
        },
        He = [
            ["shadowBlur", 0],
            ["shadowOffsetX", 0],
            ["shadowOffsetY", 0],
            ["shadowColor", "#000"],
            ["lineCap", "butt"],
            ["lineJoin", "miter"],
            ["miterLimit", 10]
        ],
        We = function(t, e) {
            this.extendFrom(t, !1), this.host = e
        };

    function Ge(t, e, i) {
        var n = null == e.x ? 0 : e.x,
            r = null == e.x2 ? 1 : e.x2,
            a = null == e.y ? 0 : e.y,
            o = null == e.y2 ? 0 : e.y2;
        return e.global || (n = n * i.width + i.x, r = r * i.width + i.x, a = a * i.height + i.y, o = o * i.height + i.y), n = isNaN(n) ? 0 : n, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o, t.createLinearGradient(n, a, r, o)
    }

    function qe(t, e, i) {
        var n = i.width,
            r = i.height,
            a = Math.min(n, r),
            o = null == e.x ? .5 : e.x,
            s = null == e.y ? .5 : e.y,
            l = null == e.r ? .5 : e.r;
        return e.global || (o = o * n + i.x, s = s * r + i.y, l *= a), t.createRadialGradient(o, s, 0, o, s, l)
    }
    We.prototype = {
        constructor: We,
        host: null,
        fill: "#000",
        stroke: null,
        opacity: 1,
        lineDash: null,
        lineDashOffset: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineWidth: 1,
        strokeNoScale: !1,
        text: null,
        font: null,
        textFont: null,
        fontStyle: null,
        fontWeight: null,
        fontSize: null,
        fontFamily: null,
        textTag: null,
        textFill: "#000",
        textStroke: null,
        textWidth: null,
        textHeight: null,
        textStrokeWidth: 0,
        textLineHeight: null,
        textPosition: "inside",
        textRect: null,
        textOffset: null,
        textAlign: null,
        textVerticalAlign: null,
        textDistance: 5,
        textShadowColor: "transparent",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        textBoxShadowColor: "transparent",
        textBoxShadowBlur: 0,
        textBoxShadowOffsetX: 0,
        textBoxShadowOffsetY: 0,
        transformText: !1,
        textRotation: 0,
        textOrigin: null,
        textBackgroundColor: null,
        textBorderColor: null,
        textBorderWidth: 0,
        textBorderRadius: 0,
        textPadding: null,
        rich: null,
        truncate: null,
        blend: null,
        bind: function(t, e, i) {
            for (var n = i && i.style, r = !n, a = 0; a < He.length; a++) {
                var o = He[a],
                    s = o[0];
                (r || this[s] !== n[s]) && (t[s] = Ve(t, s, this[s] || o[1]))
            }
            if ((r || this.fill !== n.fill) && (t.fillStyle = this.fill), (r || this.stroke !== n.stroke) && (t.strokeStyle = this.stroke), (r || this.opacity !== n.opacity) && (t.globalAlpha = null == this.opacity ? 1 : this.opacity), (r || this.blend !== n.blend) && (t.globalCompositeOperation = this.blend || "source-over"), this.hasStroke()) {
                var l = this.lineWidth;
                t.lineWidth = l / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
            }
        },
        hasFill: function() {
            var t = this.fill;
            return null != t && "none" !== t
        },
        hasStroke: function() {
            var t = this.stroke;
            return null != t && "none" !== t && this.lineWidth > 0
        },
        extendFrom: function(t, e) {
            if (t)
                for (var i in t) !t.hasOwnProperty(i) || !0 !== e && (!1 === e ? this.hasOwnProperty(i) : null == t[i]) || (this[i] = t[i])
        },
        set: function(t, e) {
            "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
        },
        clone: function() {
            var t = new this.constructor;
            return t.extendFrom(this, !0), t
        },
        getGradient: function(t, e, i) {
            for (var n = ("radial" === e.type ? qe : Ge)(t, e, i), r = e.colorStops, a = 0; a < r.length; a++) n.addColorStop(r[a].offset, r[a].color);
            return n
        }
    };
    for (var Xe = We.prototype, Ue = 0; Ue < He.length; Ue++) {
        var Ye = He[Ue];
        Ye[0] in Xe || (Xe[Ye[0]] = Ye[1])
    }
    We.getGradient = Xe.getGradient;
    var Ze = function(t, e) {
        this.image = t, this.repeat = e, this.type = "pattern"
    };

    function je() {
        return !1
    }

    function Ke(t, e, i) {
        var n = x(),
            r = e.getWidth(),
            a = e.getHeight(),
            o = n.style;
        return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", o.height = a + "px", n.setAttribute("data-zr-dom-id", t)), n.width = r * i, n.height = a * i, n
    }
    Ze.prototype.getCanvasPattern = function(t) {
        return t.createPattern(this.image, this.repeat || "repeat")
    };
    var $e = function(t, e, i) {
        var n;
        i = i || ge, "string" == typeof t ? n = Ke(t, e, i) : L(t) && (t = (n = t).id), this.id = t, this.dom = n;
        var r = n.style;
        r && (n.onselectstart = je, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = i
    };
    $e.prototype = {
        constructor: $e,
        __dirty: !0,
        __used: !1,
        __drawIndex: 0,
        __startIndex: 0,
        __endIndex: 0,
        incremental: !1,
        getElementCount: function() {
            return this.__endIndex - this.__startIndex
        },
        initContext: function() {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
        },
        createBackBuffer: function() {
            var t = this.dpr;
            this.domBack = Ke("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 != t && this.ctxBack.scale(t, t)
        },
        resize: function(t, e) {
            var i = this.dpr,
                n = this.dom,
                r = n.style,
                a = this.domBack;
            r && (r.width = t + "px", r.height = e + "px"), n.width = t * i, n.height = e * i, a && (a.width = t * i, a.height = e * i, 1 != i && this.ctxBack.scale(i, i))
        },
        clear: function(t, e) {
            var i, n = this.dom,
                r = this.ctx,
                a = n.width,
                o = n.height,
                s = (e = e || this.clearColor, this.motionBlur && !t),
                l = this.lastFrameAlpha,
                h = this.dpr;
            (s && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n, 0, 0, a / h, o / h)), r.clearRect(0, 0, a, o), e && "transparent" !== e) && (e.colorStops ? (i = e.__canvasGradient || We.getGradient(r, e, {
                x: 0,
                y: 0,
                width: a,
                height: o
            }), e.__canvasGradient = i) : e.image && (i = Ze.prototype.getCanvasPattern.call(e, r)), r.save(), r.fillStyle = i || e, r.fillRect(0, 0, a, o), r.restore());
            if (s) {
                var u = this.domBack;
                r.save(), r.globalAlpha = l, r.drawImage(u, 0, 0, a, o), r.restore()
            }
        }
    };
    var Qe = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
            setTimeout(t, 16)
        },
        Je = new zt(50);

    function ti(t) {
        if ("string" == typeof t) {
            var e = Je.get(t);
            return e && e.image
        }
        return t
    }

    function ei(t, e, i, n, r) {
        if (t) {
            if ("string" == typeof t) {
                if (e && e.__zrImageSrc === t || !i) return e;
                var a = Je.get(t),
                    o = {
                        hostEl: i,
                        cb: n,
                        cbPayload: r
                    };
                return a ? !ni(e = a.image) && a.pending.push(o) : (!e && (e = new Image), e.onload = ii, Je.put(t, e.__cachedImgObj = {
                    image: e,
                    pending: [o]
                }), e.src = e.__zrImageSrc = t), e
            }
            return t
        }
        return e
    }

    function ii() {
        var t = this.__cachedImgObj;
        this.onload = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
            var i = t.pending[e],
                n = i.cb;
            n && n(this, i.cbPayload), i.hostEl.dirty()
        }
        t.pending.length = 0
    }

    function ni(t) {
        return t && t.width && t.height
    }
    var ri = {},
        ai = 0,
        oi = 5e3,
        si = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
        li = "12px sans-serif",
        hi = {};

    function ui(t, e) {
        var i = t + ":" + (e = e || li);
        if (ri[i]) return ri[i];
        for (var n = (t + "").split("\n"), r = 0, a = 0, o = n.length; a < o; a++) r = Math.max(xi(n[a], e).width, r);
        return ai > oi && (ai = 0, ri = {}), ai++, ri[i] = r, r
    }

    function ci(t, e, i, n, r, a, o) {
        return a ? function(t, e, i, n, r, a, o) {
            var s = wi(t, {
                    rich: a,
                    truncate: o,
                    font: e,
                    textAlign: i,
                    textPadding: r
                }),
                l = s.outerWidth,
                h = s.outerHeight,
                u = di(0, l, i),
                c = fi(0, h, n);
            return new Ce(u, c, l, h)
        }(t, e, i, n, r, a, o) : function(t, e, i, n, r, a) {
            var o = _i(t, e, r, a),
                s = ui(t, e);
            r && (s += r[1] + r[3]);
            var l = o.outerHeight,
                h = di(0, s, i),
                u = fi(0, l, n),
                c = new Ce(h, u, s, l);
            return c.lineHeight = o.lineHeight, c
        }(t, e, i, n, r, o)
    }

    function di(t, e, i) {
        return "right" === i ? t -= e : "center" === i && (t -= e / 2), t
    }

    function fi(t, e, i) {
        return "middle" === i ? t -= e / 2 : "bottom" === i && (t -= e), t
    }

    function pi(t, e, i, n, r) {
        if (!e) return "";
        var a = (t + "").split("\n");
        r = gi(e, i, n, r);
        for (var o = 0, s = a.length; o < s; o++) a[o] = vi(a[o], r);
        return a.join("\n")
    }

    function gi(t, e, i, n) {
        (n = v({}, n)).font = e;
        i = z(i, "...");
        n.maxIterations = z(n.maxIterations, 2);
        var r = n.minChar = z(n.minChar, 0);
        n.cnCharWidth = ui("国", e);
        var a = n.ascCharWidth = ui("a", e);
        n.placeholder = z(n.placeholder, "");
        for (var o = t = Math.max(0, t - 1), s = 0; s < r && o >= a; s++) o -= a;
        var l = ui(i);
        return l > o && (i = "", l = 0), o = t - l, n.ellipsis = i, n.ellipsisWidth = l, n.contentWidth = o, n.containerWidth = t, n
    }

    function vi(t, e) {
        var i = e.containerWidth,
            n = e.font,
            r = e.contentWidth;
        if (!i) return "";
        var a = ui(t, n);
        if (a <= i) return t;
        for (var o = 0;; o++) {
            if (a <= r || o >= e.maxIterations) {
                t += e.ellipsis;
                break
            }
            var s = 0 === o ? mi(t, r, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * r / a) : 0;
            a = ui(t = t.substr(0, s), n)
        }
        return "" === t && (t = e.placeholder), t
    }

    function mi(t, e, i, n) {
        for (var r = 0, a = 0, o = t.length; a < o && r < e; a++) {
            var s = t.charCodeAt(a);
            r += 0 <= s && s <= 127 ? i : n
        }
        return a
    }

    function yi(t) {
        return ui("国", t)
    }

    function xi(t, e) {
        return hi.measureText(t, e)
    }

    function _i(t, e, i, n) {
        null != t && (t += "");
        var r = yi(e),
            a = t ? t.split("\n") : [],
            o = a.length * r,
            s = o;
        if (i && (s += i[0] + i[2]), t && n) {
            var l = n.outerHeight,
                h = n.outerWidth;
            if (null != l && s > l) t = "", a = [];
            else if (null != h)
                for (var u = gi(h - (i ? i[1] + i[3] : 0), e, n.ellipsis, {
                        minChar: n.minChar,
                        placeholder: n.placeholder
                    }), c = 0, d = a.length; c < d; c++) a[c] = vi(a[c], u)
        }
        return {
            lines: a,
            height: o,
            outerHeight: s,
            lineHeight: r
        }
    }

    function wi(t, e) {
        var i = {
            lines: [],
            width: 0,
            height: 0
        };
        if (null != t && (t += ""), !t) return i;
        for (var n, r = si.lastIndex = 0; null != (n = si.exec(t));) {
            var a = n.index;
            a > r && bi(i, t.substring(r, a)), bi(i, n[2], n[1]), r = si.lastIndex
        }
        r < t.length && bi(i, t.substring(r, t.length));
        var o = i.lines,
            s = 0,
            l = 0,
            h = [],
            u = e.textPadding,
            c = e.truncate,
            d = c && c.outerWidth,
            f = c && c.outerHeight;
        u && (null != d && (d -= u[1] + u[3]), null != f && (f -= u[0] + u[2]));
        for (var p = 0; p < o.length; p++) {
            for (var g = o[p], v = 0, m = 0, y = 0; y < g.tokens.length; y++) {
                var x = (D = g.tokens[y]).styleName && e.rich[D.styleName] || {},
                    _ = D.textPadding = x.textPadding,
                    w = D.font = x.font || e.font,
                    b = D.textHeight = z(x.textHeight, yi(w));
                if (_ && (b += _[0] + _[2]), D.height = b, D.lineHeight = F(x.textLineHeight, e.textLineHeight, b), D.textAlign = x && x.textAlign || e.textAlign, D.textVerticalAlign = x && x.textVerticalAlign || "middle", null != f && s + D.lineHeight > f) return {
                    lines: [],
                    width: 0,
                    height: 0
                };
                D.textWidth = ui(D.text, w);
                var M = x.textWidth,
                    S = null == M || "auto" === M;
                if ("string" == typeof M && "%" === M.charAt(M.length - 1)) D.percentWidth = M, h.push(D), M = 0;
                else {
                    if (S) {
                        M = D.textWidth;
                        var T = x.textBackgroundColor,
                            I = T && T.image;
                        I && ni(I = ti(I)) && (M = Math.max(M, I.width * b / I.height))
                    }
                    var C = _ ? _[1] + _[3] : 0;
                    M += C;
                    var A = null != d ? d - m : null;
                    null != A && A < M && (!S || A < C ? (D.text = "", D.textWidth = M = 0) : (D.text = pi(D.text, A - C, w, c.ellipsis, {
                        minChar: c.minChar
                    }), D.textWidth = ui(D.text, w), M = D.textWidth + C))
                }
                m += D.width = M, x && (v = Math.max(v, D.lineHeight))
            }
            g.width = m, g.lineHeight = v, s += v, l = Math.max(l, m)
        }
        i.outerWidth = i.width = z(e.textWidth, l), i.outerHeight = i.height = z(e.textHeight, s), u && (i.outerWidth += u[1] + u[3], i.outerHeight += u[0] + u[2]);
        for (p = 0; p < h.length; p++) {
            var D, k = (D = h[p]).percentWidth;
            D.width = parseInt(k, 10) / 100 * l
        }
        return i
    }

    function bi(t, e, i) {
        for (var n = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
            var s = r[o],
                l = {
                    styleName: i,
                    text: s,
                    isLineHolder: !s && !n
                };
            if (o) a.push({
                tokens: [l]
            });
            else {
                var h = (a[a.length - 1] || (a[0] = {
                        tokens: []
                    })).tokens,
                    u = h.length;
                1 === u && h[0].isLineHolder ? h[0] = l : (s || !u || n) && h.push(l)
            }
        }
    }

    function Mi(t, e) {
        var i, n, r, a, o, s = e.x,
            l = e.y,
            h = e.width,
            u = e.height,
            c = e.r;
        h < 0 && (s += h, h = -h), u < 0 && (l += u, u = -u), "number" == typeof c ? i = n = r = a = c : c instanceof Array ? 1 === c.length ? i = n = r = a = c[0] : 2 === c.length ? (i = r = c[0], n = a = c[1]) : 3 === c.length ? (i = c[0], n = a = c[1], r = c[2]) : (i = c[0], n = c[1], r = c[2], a = c[3]) : i = n = r = a = 0, i + n > h && (i *= h / (o = i + n), n *= h / o), r + a > h && (r *= h / (o = r + a), a *= h / o), n + r > u && (n *= u / (o = n + r), r *= u / o), i + a > u && (i *= u / (o = i + a), a *= u / o), t.moveTo(s + i, l), t.lineTo(s + h - n, l), 0 !== n && t.arc(s + h - n, l + n, n, -Math.PI / 2, 0), t.lineTo(s + h, l + u - r), 0 !== r && t.arc(s + h - r, l + u - r, r, 0, Math.PI / 2), t.lineTo(s + a, l + u), 0 !== a && t.arc(s + a, l + u - a, a, Math.PI / 2, Math.PI), t.lineTo(s, l + i), 0 !== i && t.arc(s + i, l + i, i, Math.PI, 1.5 * Math.PI)
    }
    hi.measureText = function(t, e) {
        var i = (y || (y = x().getContext("2d")), y);
        return i.font = e || li, i.measureText(t)
    };
    var Si = {
            left: 1,
            right: 1,
            center: 1
        },
        Ti = {
            top: 1,
            bottom: 1,
            middle: 1
        };

    function Ii(t) {
        return Ci(t), S(t.rich, Ci), t
    }

    function Ci(t) {
        if (t) {
            t.font = function(t) {
                var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");
                return e && G(e) || t.textFont || t.font
            }(t);
            var e = t.textAlign;
            "middle" === e && (e = "center"), t.textAlign = null == e || Si[e] ? e : "left";
            var i = t.textVerticalAlign || t.textBaseline;
            "center" === i && (i = "middle"), t.textVerticalAlign = null == i || Ti[i] ? i : "top", t.textPadding && (t.textPadding = H(t.textPadding))
        }
    }

    function Ai(t, e, i, n, r) {
        n.rich ? function(t, e, i, n, r) {
            var a = t.__textCotentBlock;
            a && !t.__dirty || (a = t.__textCotentBlock = wi(i, n));
            ! function(t, e, i, n, r) {
                var a = i.width,
                    o = i.outerWidth,
                    s = i.outerHeight,
                    l = n.textPadding,
                    h = Ei(s, n, r),
                    u = h.baseX,
                    c = h.baseY,
                    d = h.textAlign,
                    f = h.textVerticalAlign;
                Di(e, n, r, u, c);
                var p = di(u, o, d),
                    g = fi(c, s, f),
                    v = p,
                    m = g;
                l && (v += l[3], m += l[0]);
                var y = v + a;
                Pi(n) && Li(t, e, n, p, g, o, s);
                for (var x = 0; x < i.lines.length; x++) {
                    for (var _, w = i.lines[x], b = w.tokens, M = b.length, S = w.lineHeight, T = w.width, I = 0, C = v, A = y, D = M - 1; I < M && (!(_ = b[I]).textAlign || "left" === _.textAlign);) ki(t, e, _, n, S, m, C, "left"), T -= _.width, C += _.width, I++;
                    for (; D >= 0 && "right" === (_ = b[D]).textAlign;) ki(t, e, _, n, S, m, A, "right"), T -= _.width, A -= _.width, D--;
                    for (C += (a - (C - v) - (y - A) - T) / 2; I <= D;) _ = b[I], ki(t, e, _, n, S, m, C + _.width / 2, "center"), C += _.width, I++;
                    m += S
                }
            }(t, e, a, n, r)
        }(t, e, i, n, r) : function(t, e, i, n, r) {
            var a = Ni(e, "font", n.font || li),
                o = n.textPadding,
                s = t.__textCotentBlock;
            s && !t.__dirty || (s = t.__textCotentBlock = _i(i, a, o, n.truncate));
            var l = s.outerHeight,
                h = s.lines,
                u = s.lineHeight,
                c = Ei(l, n, r),
                d = c.baseX,
                f = c.baseY,
                p = c.textAlign,
                g = c.textVerticalAlign;
            Di(e, n, r, d, f);
            var v = fi(f, l, g),
                m = d,
                y = v,
                x = Pi(n);
            if (x || o) {
                var _ = ui(i, a),
                    w = _;
                o && (w += o[1] + o[3]);
                var b = di(d, w, p);
                x && Li(t, e, n, b, v, w, l), o && (m = Fi(d, p, o), y += o[0])
            }
            Ni(e, "textAlign", p || "left"), Ni(e, "textBaseline", "middle"), Ni(e, "shadowBlur", n.textShadowBlur || 0), Ni(e, "shadowColor", n.textShadowColor || "transparent"), Ni(e, "shadowOffsetX", n.textShadowOffsetX || 0), Ni(e, "shadowOffsetY", n.textShadowOffsetY || 0), y += u / 2;
            var M = n.textStrokeWidth,
                S = Ri(n.textStroke, M),
                T = Bi(n.textFill);
            S && (Ni(e, "lineWidth", M), Ni(e, "strokeStyle", S));
            T && Ni(e, "fillStyle", T);
            for (var I = 0; I < h.length; I++) S && e.strokeText(h[I], m, y), T && e.fillText(h[I], m, y), y += u
        }(t, e, i, n, r)
    }

    function Di(t, e, i, n, r) {
        if (i && e.textRotation) {
            var a = e.textOrigin;
            "center" === a ? (n = i.width / 2 + i.x, r = i.height / 2 + i.y) : a && (n = a[0] + i.x, r = a[1] + i.y), t.translate(n, r), t.rotate(-e.textRotation), t.translate(-n, -r)
        }
    }

    function ki(t, e, i, n, r, a, o, s) {
        var l = n.rich[i.styleName] || {},
            h = i.textVerticalAlign,
            u = a + r / 2;
        "top" === h ? u = a + i.height / 2 : "bottom" === h && (u = a + r - i.height / 2), !i.isLineHolder && Pi(l) && Li(t, e, l, "right" === s ? o - i.width : "center" === s ? o - i.width / 2 : o, u - i.height / 2, i.width, i.height);
        var c = i.textPadding;
        c && (o = Fi(o, s, c), u -= i.height / 2 - c[2] - i.textHeight / 2), Ni(e, "shadowBlur", F(l.textShadowBlur, n.textShadowBlur, 0)), Ni(e, "shadowColor", l.textShadowColor || n.textShadowColor || "transparent"), Ni(e, "shadowOffsetX", F(l.textShadowOffsetX, n.textShadowOffsetX, 0)), Ni(e, "shadowOffsetY", F(l.textShadowOffsetY, n.textShadowOffsetY, 0)), Ni(e, "textAlign", s), Ni(e, "textBaseline", "middle"), Ni(e, "font", i.font || li);
        var d = Ri(l.textStroke || n.textStroke, p),
            f = Bi(l.textFill || n.textFill),
            p = z(l.textStrokeWidth, n.textStrokeWidth);
        d && (Ni(e, "lineWidth", p), Ni(e, "strokeStyle", d), e.strokeText(i.text, o, u)), f && (Ni(e, "fillStyle", f), e.fillText(i.text, o, u))
    }

    function Pi(t) {
        return t.textBackgroundColor || t.textBorderWidth && t.textBorderColor
    }

    function Li(t, e, i, n, r, a, o) {
        var s = i.textBackgroundColor,
            l = i.textBorderWidth,
            h = i.textBorderColor,
            u = P(s);
        if (Ni(e, "shadowBlur", i.textBoxShadowBlur || 0), Ni(e, "shadowColor", i.textBoxShadowColor || "transparent"), Ni(e, "shadowOffsetX", i.textBoxShadowOffsetX || 0), Ni(e, "shadowOffsetY", i.textBoxShadowOffsetY || 0), u || l && h) {
            e.beginPath();
            var c = i.textBorderRadius;
            c ? Mi(e, {
                x: n,
                y: r,
                width: a,
                height: o,
                r: c
            }) : e.rect(n, r, a, o), e.closePath()
        }
        if (u) Ni(e, "fillStyle", s), e.fill();
        else if (L(s)) {
            var d = s.image;
            (d = ei(d, null, t, Oi, s)) && ni(d) && e.drawImage(d, n, r, a, o)
        }
        l && h && (Ni(e, "lineWidth", l), Ni(e, "strokeStyle", h), e.stroke())
    }

    function Oi(t, e) {
        e.image = t
    }

    function Ei(t, e, i) {
        var n = e.x || 0,
            r = e.y || 0,
            a = e.textAlign,
            o = e.textVerticalAlign;
        if (i) {
            var s = e.textPosition;
            if (s instanceof Array) n = i.x + zi(s[0], i.width), r = i.y + zi(s[1], i.height);
            else {
                var l = function(t, e, i) {
                    var n = e.x,
                        r = e.y,
                        a = e.height,
                        o = e.width,
                        s = a / 2,
                        l = "left",
                        h = "top";
                    switch (t) {
                        case "left":
                            n -= i, r += s, l = "right", h = "middle";
                            break;
                        case "right":
                            n += i + o, r += s, h = "middle";
                            break;
                        case "top":
                            n += o / 2, r -= i, l = "center", h = "bottom";
                            break;
                        case "bottom":
                            n += o / 2, r += a + i, l = "center";
                            break;
                        case "inside":
                            n += o / 2, r += s, l = "center", h = "middle";
                            break;
                        case "insideLeft":
                            n += i, r += s, h = "middle";
                            break;
                        case "insideRight":
                            n += o - i, r += s, l = "right", h = "middle";
                            break;
                        case "insideTop":
                            n += o / 2, r += i, l = "center";
                            break;
                        case "insideBottom":
                            n += o / 2, r += a - i, l = "center", h = "bottom";
                            break;
                        case "insideTopLeft":
                            n += i, r += i;
                            break;
                        case "insideTopRight":
                            n += o - i, r += i, l = "right";
                            break;
                        case "insideBottomLeft":
                            n += i, r += a - i, h = "bottom";
                            break;
                        case "insideBottomRight":
                            n += o - i, r += a - i, l = "right", h = "bottom"
                    }
                    return {
                        x: n,
                        y: r,
                        textAlign: l,
                        textVerticalAlign: h
                    }
                }(s, i, e.textDistance);
                n = l.x, r = l.y, a = a || l.textAlign, o = o || l.textVerticalAlign
            }
            var h = e.textOffset;
            h && (n += h[0], r += h[1])
        }
        return {
            baseX: n,
            baseY: r,
            textAlign: a,
            textVerticalAlign: o
        }
    }

    function Ni(t, e, i) {
        return t[e] = Ve(t, e, i), t[e]
    }

    function Ri(t, e) {
        return null == t || e <= 0 || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
    }

    function Bi(t) {
        return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
    }

    function zi(t, e) {
        return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
    }

    function Fi(t, e, i) {
        return "right" === e ? t - i[1] : "center" === e ? t + i[3] / 2 - i[1] / 2 : t + i[3]
    }

    function Vi(t, e) {
        return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding)
    }
    var Hi = new Ce,
        Wi = function() {};

    function Gi(t) {
        for (var e in t = t || {}, xe.call(this, t), t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new We(t.style, this), this._rect = null, this.__clipPaths = []
    }

    function qi(t) {
        Gi.call(this, t)
    }
    Wi.prototype = {
        constructor: Wi,
        drawRectText: function(t, e) {
            var i = this.style;
            e = i.textRect || e, this.__dirty && Ii(i);
            var n = i.text;
            if (null != n && (n += ""), Vi(n, i)) {
                t.save();
                var r = this.transform;
                i.transformText ? this.setTransform(t) : r && (Hi.copy(e), Hi.applyTransform(r), e = Hi), Ai(this, t, n, i, e), t.restore()
            }
        }
    }, Gi.prototype = {
        constructor: Gi,
        type: "displayable",
        __dirty: !0,
        invisible: !1,
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: "pointer",
        rectHover: !1,
        progressive: !1,
        incremental: !1,
        inplace: !1,
        beforeBrush: function(t) {},
        afterBrush: function(t) {},
        brush: function(t, e) {},
        getBoundingRect: function() {},
        contain: function(t, e) {
            return this.rectContain(t, e)
        },
        traverse: function(t, e) {
            t.call(e, this)
        },
        rectContain: function(t, e) {
            var i = this.transformCoordToLocal(t, e);
            return this.getBoundingRect().contain(i[0], i[1])
        },
        dirty: function() {
            this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh()
        },
        animateStyle: function(t) {
            return this.animate("style", t)
        },
        attrKV: function(t, e) {
            "style" !== t ? xe.prototype.attrKV.call(this, t, e) : this.style.set(e)
        },
        setStyle: function(t, e) {
            return this.style.set(t, e), this.dirty(!1), this
        },
        useStyle: function(t) {
            return this.style = new We(t, this), this.dirty(!1), this
        }
    }, w(Gi, xe), b(Gi, Wi), qi.prototype = {
        constructor: qi,
        type: "image",
        brush: function(t, e) {
            var i = this.style,
                n = i.image;
            i.bind(t, this, e);
            var r = this._image = ei(n, this._image, this, this.onload);
            if (r && ni(r)) {
                var a = i.x || 0,
                    o = i.y || 0,
                    s = i.width,
                    l = i.height,
                    h = r.width / r.height;
                if (null == s && null != l ? s = l * h : null == l && null != s ? l = s / h : null == s && null == l && (s = r.width, l = r.height), this.setTransform(t), i.sWidth && i.sHeight) {
                    var u = i.sx || 0,
                        c = i.sy || 0;
                    t.drawImage(r, u, c, i.sWidth, i.sHeight, a, o, s, l)
                } else if (i.sx && i.sy) {
                    var d = s - (u = i.sx),
                        f = l - (c = i.sy);
                    t.drawImage(r, u, c, d, f, a, o, s, l)
                } else t.drawImage(r, a, o, s, l);
                null != i.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
            }
        },
        getBoundingRect: function() {
            var t = this.style;
            return this._rect || (this._rect = new Ce(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
        }
    }, w(qi, Gi);

    function Xi(t) {
        return parseInt(t, 10)
    }
    var Ui = new Ce(0, 0, 0, 0),
        Yi = new Ce(0, 0, 0, 0);
    var Zi = function(t, e, i) {
        this.type = "canvas";
        var n = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
        this._opts = i = v({}, i || {}), this.dpr = i.devicePixelRatio || ge, this._singleCanvas = n, this.root = t;
        var r = t.style;
        r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
        var a = this._zlevelList = [],
            o = this._layers = {};
        if (this._layerConfig = {}, this._needsManuallyCompositing = !1, n) {
            var s = t.width,
                l = t.height;
            null != i.width && (s = i.width), null != i.height && (l = i.height), this.dpr = i.devicePixelRatio || 1, t.width = s * this.dpr, t.height = l * this.dpr, this._width = s, this._height = l;
            var h = new $e(t, this, this.dpr);
            h.__builtin__ = !0, h.initContext(), o[314159] = h, h.zlevel = 314159, a.push(314159), this._domRoot = t
        } else {
            this._width = this._getSize(0), this._height = this._getSize(1);
            var u = this._domRoot = function(t, e) {
                var i = document.createElement("div");
                return i.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", i
            }(this._width, this._height);
            t.appendChild(u)
        }
        this._hoverlayer = null, this._hoverElements = []
    };
    Zi.prototype = {
        constructor: Zi,
        getType: function() {
            return "canvas"
        },
        isSingleCanvas: function() {
            return this._singleCanvas
        },
        getViewportRoot: function() {
            return this._domRoot
        },
        getViewportRootOffset: function() {
            var t = this.getViewportRoot();
            if (t) return {
                offsetLeft: t.offsetLeft || 0,
                offsetTop: t.offsetTop || 0
            }
        },
        refresh: function(t) {
            var e = this.storage.getDisplayList(!0),
                i = this._zlevelList;
            this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
            for (var n = 0; n < i.length; n++) {
                var r = i[n],
                    a = this._layers[r];
                if (!a.__builtin__ && a.refresh) {
                    var o = 0 === n ? this._backgroundColor : null;
                    a.refresh(o)
                }
            }
            return this.refreshHover(), this
        },
        addHover: function(t, e) {
            if (!t.__hoverMir) {
                var i = new t.constructor({
                    style: t.style,
                    shape: t.shape
                });
                i.__from = t, t.__hoverMir = i, i.setStyle(e), this._hoverElements.push(i)
            }
        },
        removeHover: function(t) {
            var e = t.__hoverMir,
                i = this._hoverElements,
                n = _(i, e);
            n >= 0 && i.splice(n, 1), t.__hoverMir = null
        },
        clearHover: function(t) {
            for (var e = this._hoverElements, i = 0; i < e.length; i++) {
                var n = e[i].__from;
                n && (n.__hoverMir = null)
            }
            e.length = 0
        },
        refreshHover: function() {
            var t = this._hoverElements,
                e = t.length,
                i = this._hoverlayer;
            if (i && i.clear(), e) {
                Re(t, this.storage.displayableSortFunc), i || (i = this._hoverlayer = this.getLayer(1e5));
                var n = {};
                i.ctx.save();
                for (var r = 0; r < e;) {
                    var a = t[r],
                        o = a.__from;
                    o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, i, !0, n))) : (t.splice(r, 1), o.__hoverMir = null, e--)
                }
                i.ctx.restore()
            }
        },
        getHoverLayer: function() {
            return this.getLayer(1e5)
        },
        _paintList: function(t, e, i) {
            if (this._redrawId === i) {
                e = e || !1, this._updateLayerStatus(t);
                var n = this._doPaintList(t, e);
                if (this._needsManuallyCompositing && this._compositeManually(), !n) {
                    var r = this;
                    Qe(function() {
                        r._paintList(t, e, i)
                    })
                }
            }
        },
        _compositeManually: function() {
            var t = this.getLayer(314159).ctx,
                e = this._domRoot.width,
                i = this._domRoot.height;
            t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(n) {
                n.virtual && t.drawImage(n.dom, 0, 0, e, i)
            })
        },
        _doPaintList: function(t, e) {
            for (var i = [], r = 0; r < this._zlevelList.length; r++) {
                var a = this._zlevelList[r];
                (l = this._layers[a]).__builtin__ && l !== this._hoverlayer && (l.__dirty || e) && i.push(l)
            }
            for (var o = !0, s = 0; s < i.length; s++) {
                var l, h = (l = i[s]).ctx,
                    u = {};
                h.save();
                var c = e ? l.__startIndex : l.__drawIndex,
                    d = !e && l.incremental && Date.now,
                    f = d && Date.now(),
                    p = l.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
                if (l.__startIndex === l.__endIndex) l.clear(!1, p);
                else if (c === l.__startIndex) {
                    var g = t[c];
                    g.incremental && g.notClear && !e || l.clear(!1, p)
                } - 1 === c && (console.error("For some unknown reason. drawIndex is -1"), c = l.__startIndex);
                for (var v = c; v < l.__endIndex; v++) {
                    var m = t[v];
                    if (this._doPaintEl(m, l, e, u), m.__dirty = !1, d)
                        if (Date.now() - f > 15) break
                }
                l.__drawIndex = v, l.__drawIndex < l.__endIndex && (o = !1), u.prevElClipPaths && h.restore(), h.restore()
            }
            return n.wxa && S(this._layers, function(t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw()
            }), o
        },
        _doPaintEl: function(t, e, i, n) {
            var r = e.ctx,
                a = t.transform;
            if ((e.__dirty || i) && !t.invisible && 0 !== t.style.opacity && (!a || a[0] || a[3]) && (!t.culling || ! function(t, e, i) {
                    return Ui.copy(t.getBoundingRect()), t.transform && Ui.applyTransform(t.transform), Yi.width = e, Yi.height = i, !Ui.intersect(Yi)
                }(t, this._width, this._height))) {
                var o = t.__clipPaths;
                n.prevElClipPaths && ! function(t, e) {
                    if (t == e) return !1;
                    if (!t || !e || t.length !== e.length) return !0;
                    for (var i = 0; i < t.length; i++)
                        if (t[i] !== e[i]) return !0
                }(o, n.prevElClipPaths) || (n.prevElClipPaths && (e.ctx.restore(), n.prevElClipPaths = null, n.prevEl = null), o && (r.save(), function(t, e) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.setTransform(e), e.beginPath(), n.buildPath(e, n.shape), e.clip(), n.restoreTransform(e)
                    }
                }(o, r), n.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, n.prevEl || null), n.prevEl = t, t.afterBrush && t.afterBrush(r)
            }
        },
        getLayer: function(t, e) {
            this._singleCanvas && !this._needsManuallyCompositing && (t = 314159);
            var i = this._layers[t];
            return i || ((i = new $e("zr_" + t, this, this.dpr)).zlevel = t, i.__builtin__ = !0, this._layerConfig[t] && g(i, this._layerConfig[t], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i
        },
        insertLayer: function(t, e) {
            var i = this._layers,
                n = this._zlevelList,
                r = n.length,
                a = null,
                o = -1,
                s = this._domRoot;
            if (i[t]) me("ZLevel " + t + " has been used already");
            else if (function(t) {
                    return !!t && (!!t.__builtin__ || "function" == typeof t.resize && "function" == typeof t.refresh)
                }(e)) {
                if (r > 0 && t > n[0]) {
                    for (o = 0; o < r - 1 && !(n[o] < t && n[o + 1] > t); o++);
                    a = i[n[o]]
                }
                if (n.splice(o + 1, 0, t), i[t] = e, !e.virtual)
                    if (a) {
                        var l = a.dom;
                        l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom)
                    } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom)
            } else me("Layer of zlevel " + t + " is not valid")
        },
        eachLayer: function(t, e) {
            var i, n, r = this._zlevelList;
            for (n = 0; n < r.length; n++) i = r[n], t.call(e, this._layers[i], i)
        },
        eachBuiltinLayer: function(t, e) {
            var i, n, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) n = a[r], (i = this._layers[n]).__builtin__ && t.call(e, i, n)
        },
        eachOtherLayer: function(t, e) {
            var i, n, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) n = a[r], (i = this._layers[n]).__builtin__ || t.call(e, i, n)
        },
        getLayers: function() {
            return this._layers
        },
        _updateLayerStatus: function(t) {
            function e(t) {
                n && (n.__endIndex !== t && (n.__dirty = !0), n.__endIndex = t)
            }
            if (this.eachBuiltinLayer(function(t, e) {
                    t.__dirty = t.__used = !1
                }), this._singleCanvas)
                for (var i = 1; i < t.length; i++) {
                    if ((a = t[i]).zlevel !== t[i - 1].zlevel || a.incremental) {
                        this._needsManuallyCompositing = !0;
                        break
                    }
                }
            var n = null,
                r = 0;
            for (i = 0; i < t.length; i++) {
                var a, o, s = (a = t[i]).zlevel;
                a.incremental ? ((o = this.getLayer(s + .001, this._needsManuallyCompositing)).incremental = !0, r = 1) : o = this.getLayer(s + (r > 0 ? .01 : 0), this._needsManuallyCompositing), o.__builtin__ || me("ZLevel " + s + " has been used by unkown layer " + o.id), o !== n && (o.__used = !0, o.__startIndex !== i && (o.__dirty = !0), o.__startIndex = i, o.incremental ? o.__drawIndex = -1 : o.__drawIndex = i, e(i), n = o), a.__dirty && (o.__dirty = !0, o.incremental && o.__drawIndex < 0 && (o.__drawIndex = i))
            }
            e(i), this.eachBuiltinLayer(function(t, e) {
                !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex)
            })
        },
        clear: function() {
            return this.eachBuiltinLayer(this._clearLayer), this
        },
        _clearLayer: function(t) {
            t.clear()
        },
        setBackgroundColor: function(t) {
            this._backgroundColor = t
        },
        configLayer: function(t, e) {
            if (e) {
                var i = this._layerConfig;
                i[t] ? g(i[t], e, !0) : i[t] = e;
                for (var n = 0; n < this._zlevelList.length; n++) {
                    var r = this._zlevelList[n];
                    if (r === t || r === t + .01) g(this._layers[r], i[t], !0)
                }
            }
        },
        delLayer: function(t) {
            var e = this._layers,
                i = this._zlevelList,
                n = e[t];
            n && (n.dom.parentNode.removeChild(n.dom), delete e[t], i.splice(_(i, t), 1))
        },
        resize: function(t, e) {
            if (this._domRoot.style) {
                var i = this._domRoot;
                i.style.display = "none";
                var n = this._opts;
                if (null != t && (n.width = t), null != e && (n.height = e), t = this._getSize(0), e = this._getSize(1), i.style.display = "", this._width != t || e != this._height) {
                    for (var r in i.style.width = t + "px", i.style.height = e + "px", this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);
                    S(this._progressiveLayers, function(i) {
                        i.resize(t, e)
                    }), this.refresh(!0)
                }
                this._width = t, this._height = e
            } else {
                if (null == t || null == e) return;
                this._width = t, this._height = e, this.getLayer(314159).resize(t, e)
            }
            return this
        },
        clearLayer: function(t) {
            var e = this._layers[t];
            e && e.clear()
        },
        dispose: function() {
            this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
        },
        getRenderedCanvas: function(t) {
            if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[314159].dom;
            var e = new $e("image", this, t.pixelRatio || this.dpr);
            if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
                this.refresh();
                var i = e.dom.width,
                    n = e.dom.height,
                    r = e.ctx;
                this.eachLayer(function(t) {
                    t.__builtin__ ? r.drawImage(t.dom, 0, 0, i, n) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore())
                })
            } else
                for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
                    var l = o[s];
                    this._doPaintEl(l, e, !0, a)
                }
            return e.dom
        },
        getWidth: function() {
            return this._width
        },
        getHeight: function() {
            return this._height
        },
        _getSize: function(t) {
            var e = this._opts,
                i = ["width", "height"][t],
                n = ["clientWidth", "clientHeight"][t],
                r = ["paddingLeft", "paddingTop"][t],
                a = ["paddingRight", "paddingBottom"][t];
            if (null != e[i] && "auto" !== e[i]) return parseFloat(e[i]);
            var o = this.root,
                s = document.defaultView.getComputedStyle(o);
            return (o[n] || Xi(s[i]) || Xi(o.style[i])) - (Xi(s[r]) || 0) - (Xi(s[a]) || 0) | 0
        },
        pathToImage: function(t, e) {
            e = e || this.dpr;
            var i = document.createElement("canvas"),
                n = i.getContext("2d"),
                r = t.getBoundingRect(),
                a = t.style,
                o = a.shadowBlur * e,
                s = a.shadowOffsetX * e,
                l = a.shadowOffsetY * e,
                h = a.hasStroke() ? a.lineWidth : 0,
                u = Math.max(h / 2, -s + o),
                c = Math.max(h / 2, s + o),
                d = Math.max(h / 2, -l + o),
                f = Math.max(h / 2, l + o),
                p = r.width + u + c,
                g = r.height + d + f;
            i.width = p * e, i.height = g * e, n.scale(e, e), n.clearRect(0, 0, p, g), n.dpr = e;
            var v = {
                position: t.position,
                rotation: t.rotation,
                scale: t.scale
            };
            t.position = [u - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(n);
            var m = new qi({
                style: {
                    x: 0,
                    y: 0,
                    image: i
                }
            });
            return null != v.position && (m.position = t.position = v.position), null != v.rotation && (m.rotation = t.rotation = v.rotation), null != v.scale && (m.scale = t.scale = v.scale), m
        }
    };
    var ji = "undefined" != typeof window && !!window.addEventListener,
        Ki = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;

    function $i(t, e, i, r) {
        return i = i || {}, r || !n.canvasSupported ? Qi(t, e, i) : n.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (i.zrX = e.layerX, i.zrY = e.layerY) : null != e.offsetX ? (i.zrX = e.offsetX, i.zrY = e.offsetY) : Qi(t, e, i), i
    }

    function Qi(t, e, i) {
        var n = function(t) {
            return t.getBoundingClientRect ? t.getBoundingClientRect() : {
                left: 0,
                top: 0
            }
        }(t);
        i.zrX = e.clientX - n.left, i.zrY = e.clientY - n.top
    }

    function Ji(t, e, i) {
        if (null != (e = e || window.event).zrX) return e;
        var n = e.type;
        if (n && n.indexOf("touch") >= 0) {
            var r = "touchend" != n ? e.targetTouches[0] : e.changedTouches[0];
            r && $i(t, r, e, i)
        } else $i(t, e, e, i), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
        var a = e.button;
        return null == e.which && void 0 !== a && Ki.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
    }

    function tn(t, e, i) {
        ji ? t.removeEventListener(e, i) : t.detachEvent("on" + e, i)
    }
    var en = ji ? function(t) {
            t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
        } : function(t) {
            t.returnValue = !1, t.cancelBubble = !0
        },
        nn = function(t) {
            t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function() {}, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, dt.call(this)
        };
    nn.prototype = {
        constructor: nn,
        addClip: function(t) {
            this._clips.push(t)
        },
        addAnimator: function(t) {
            t.animation = this;
            for (var e = t.getClips(), i = 0; i < e.length; i++) this.addClip(e[i])
        },
        removeClip: function(t) {
            var e = _(this._clips, t);
            e >= 0 && this._clips.splice(e, 1)
        },
        removeAnimator: function(t) {
            for (var e = t.getClips(), i = 0; i < e.length; i++) this.removeClip(e[i]);
            t.animation = null
        },
        _update: function() {
            for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, i = this._clips, n = i.length, r = [], a = [], o = 0; o < n; o++) {
                var s = i[o],
                    l = s.step(t, e);
                l && (r.push(l), a.push(s))
            }
            for (o = 0; o < n;) i[o]._needsRemove ? (i[o] = i[n - 1], i.pop(), n--) : o++;
            n = r.length;
            for (o = 0; o < n; o++) a[o].fire(r[o]);
            this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
        },
        _startLoop: function() {
            var t = this;
            this._running = !0, Qe(function e() {
                t._running && (Qe(e), !t._paused && t._update())
            })
        },
        start: function() {
            this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
        },
        stop: function() {
            this._running = !1
        },
        pause: function() {
            this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
        },
        resume: function() {
            this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
        },
        clear: function() {
            this._clips = []
        },
        isFinished: function() {
            return !this._clips.length
        },
        animate: function(t, e) {
            var i = new fe(t, (e = e || {}).loop, e.getter, e.setter);
            return this.addAnimator(i), i
        }
    }, b(nn, dt);
    var rn = function() {
        this._track = []
    };

    function an(t) {
        var e = t[1][0] - t[0][0],
            i = t[1][1] - t[0][1];
        return Math.sqrt(e * e + i * i)
    }
    rn.prototype = {
        constructor: rn,
        recognize: function(t, e, i) {
            return this._doTrack(t, e, i), this._recognize(t)
        },
        clear: function() {
            return this._track.length = 0, this
        },
        _doTrack: function(t, e, i) {
            var n = t.touches;
            if (n) {
                for (var r = {
                        points: [],
                        touches: [],
                        target: e,
                        event: t
                    }, a = 0, o = n.length; a < o; a++) {
                    var s = n[a],
                        l = $i(i, s, {});
                    r.points.push([l.zrX, l.zrY]), r.touches.push(s)
                }
                this._track.push(r)
            }
        },
        _recognize: function(t) {
            for (var e in on)
                if (on.hasOwnProperty(e)) {
                    var i = on[e](this._track, t);
                    if (i) return i
                }
        }
    };
    var on = {
            pinch: function(t, e) {
                var i = t.length;
                if (i) {
                    var n, r = (t[i - 1] || {}).points,
                        a = (t[i - 2] || {}).points || r;
                    if (a && a.length > 1 && r && r.length > 1) {
                        var o = an(r) / an(a);
                        !isFinite(o) && (o = 1), e.pinchScale = o;
                        var s = [((n = r)[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2];
                        return e.pinchX = s[0], e.pinchY = s[1], {
                            type: "pinch",
                            target: t[0].target,
                            event: e
                        }
                    }
                }
            }
        },
        sn = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
        ln = ["touchstart", "touchend", "touchmove"],
        hn = {
            pointerdown: 1,
            pointerup: 1,
            pointermove: 1,
            pointerout: 1
        },
        un = T(sn, function(t) {
            var e = t.replace("mouse", "pointer");
            return hn[e] ? e : t
        });

    function cn(t) {
        return "mousewheel" === t && n.browser.firefox ? "DOMMouseScroll" : t
    }

    function dn(t, e, i) {
        var n = t._gestureMgr;
        "start" === i && n.clear();
        var r = n.recognize(e, t.handler.findHover(e.zrX, e.zrY, null).target, t.dom);
        if ("end" === i && n.clear(), r) {
            var a = r.type;
            e.gestureEvent = a, t.handler.dispatchToElement({
                target: r.target
            }, a, r.event)
        }
    }

    function fn(t) {
        t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function() {
            t._touching = !1
        }, 700)
    }
    var pn = {
        mousemove: function(t) {
            t = Ji(this.dom, t), this.trigger("mousemove", t)
        },
        mouseout: function(t) {
            var e = (t = Ji(this.dom, t)).toElement || t.relatedTarget;
            if (e != this.dom)
                for (; e && 9 != e.nodeType;) {
                    if (e === this.dom) return;
                    e = e.parentNode
                }
            this.trigger("mouseout", t)
        },
        touchstart: function(t) {
            (t = Ji(this.dom, t)).zrByTouch = !0, this._lastTouchMoment = new Date, dn(this, t, "start"), pn.mousemove.call(this, t), pn.mousedown.call(this, t), fn(this)
        },
        touchmove: function(t) {
            (t = Ji(this.dom, t)).zrByTouch = !0, dn(this, t, "change"), pn.mousemove.call(this, t), fn(this)
        },
        touchend: function(t) {
            (t = Ji(this.dom, t)).zrByTouch = !0, dn(this, t, "end"), pn.mouseup.call(this, t), +new Date - this._lastTouchMoment < 300 && pn.click.call(this, t), fn(this)
        },
        pointerdown: function(t) {
            pn.mousedown.call(this, t)
        },
        pointermove: function(t) {
            gn(t) || pn.mousemove.call(this, t)
        },
        pointerup: function(t) {
            pn.mouseup.call(this, t)
        },
        pointerout: function(t) {
            gn(t) || pn.mouseout.call(this, t)
        }
    };

    function gn(t) {
        var e = t.pointerType;
        return "pen" === e || "touch" === e
    }

    function vn(t) {
        var e;

        function i(e, i) {
            S(e, function(e) {
                ! function(t, e, i) {
                    ji ? t.addEventListener(e, i) : t.attachEvent("on" + e, i)
                }(t, cn(e), i._handlers[e])
            }, i)
        }
        dt.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._gestureMgr = new rn, this._handlers = {}, e = this, S(ln, function(t) {
            e._handlers[t] = C(pn[t], e)
        }), S(un, function(t) {
            e._handlers[t] = C(pn[t], e)
        }), S(sn, function(t) {
            e._handlers[t] = function(t, e) {
                return function() {
                    if (!e._touching) return t.apply(e, arguments)
                }
            }(pn[t], e)
        }), n.pointerEventsSupported ? i(un, this) : (n.touchEventsSupported && i(ln, this), i(sn, this))
    }
    S(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(t) {
        pn[t] = function(e) {
            e = Ji(this.dom, e), this.trigger(t, e)
        }
    });
    var mn = vn.prototype;
    mn.dispose = function() {
        for (var t = sn.concat(ln), e = 0; e < t.length; e++) {
            var i = t[e];
            tn(this.dom, cn(i), this._handlers[i])
        }
    }, mn.setCursor = function(t) {
        this.dom.style && (this.dom.style.cursor = t || "default")
    }, b(vn, dt);
    var yn = !n.canvasSupported,
        xn = {
            canvas: Zi
        };

    function _n(t, e) {
        return new wn(i(), t, e)
    }
    var wn = function(t, e, i) {
        i = i || {}, this.dom = e, this.id = t;
        var r = this,
            a = new ze,
            o = i.renderer;
        if (yn) {
            if (!xn.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
            o = "vml"
        } else o && xn[o] || (o = "canvas");
        var s = new xn[o](e, a, i, t);
        this.storage = a, this.painter = s;
        var l = n.node || n.worker ? null : new vn(s.getViewportRoot());
        this.handler = new vt(a, s, l, s.root), this.animation = new nn({
            stage: {
                update: C(this.flush, this)
            }
        }), this.animation.start(), this._needsRefresh;
        var h = a.delFromStorage,
            u = a.addToStorage;
        a.delFromStorage = function(t) {
            h.call(a, t), t && t.removeSelfFromZr(r)
        }, a.addToStorage = function(t) {
            u.call(a, t), t.addSelfToZr(r)
        }
    };
    wn.prototype = {
        constructor: wn,
        getId: function() {
            return this.id
        },
        add: function(t) {
            this.storage.addRoot(t), this._needsRefresh = !0
        },
        remove: function(t) {
            this.storage.delRoot(t), this._needsRefresh = !0
        },
        configLayer: function(t, e) {
            this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0
        },
        setBackgroundColor: function(t) {
            this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0
        },
        refreshImmediately: function() {
            this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
        },
        refresh: function() {
            this._needsRefresh = !0
        },
        flush: function() {
            var t;
            this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered")
        },
        addHover: function(t, e) {
            this.painter.addHover && (this.painter.addHover(t, e), this.refreshHover())
        },
        removeHover: function(t) {
            this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
        },
        clearHover: function() {
            this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
        },
        refreshHover: function() {
            this._needsRefreshHover = !0
        },
        refreshHoverImmediately: function() {
            this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
        },
        resize: function(t) {
            t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
        },
        clearAnimation: function() {
            this.animation.clear()
        },
        getWidth: function() {
            return this.painter.getWidth()
        },
        getHeight: function() {
            return this.painter.getHeight()
        },
        pathToImage: function(t, e) {
            return this.painter.pathToImage(t, e)
        },
        setCursorStyle: function(t) {
            this.handler.setCursorStyle(t)
        },
        findHover: function(t, e) {
            return this.handler.findHover(t, e)
        },
        on: function(t, e, i) {
            this.handler.on(t, e, i)
        },
        off: function(t, e) {
            this.handler.off(t, e)
        },
        trigger: function(t, e) {
            this.handler.trigger(t, e)
        },
        clear: function() {
            this.storage.delRoot(), this.painter.clear()
        },
        dispose: function() {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null
        }
    };
    var bn = S,
        Mn = L,
        Sn = D,
        Tn = "series\0";

    function In(t) {
        return t instanceof Array ? t : null == t ? [] : [t]
    }

    function Cn(t, e, i) {
        if (t) {
            t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
            for (var n = 0, r = i.length; n < r; n++) {
                var a = i[n];
                !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
            }
        }
    }
    var An = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];

    function Dn(t) {
        return !Mn(t) || Sn(t) || t instanceof Date ? t : t.value
    }

    function kn(t, e) {
        e = (e || []).slice();
        var i = T(t || [], function(t, e) {
            return {
                exist: t
            }
        });
        return bn(e, function(t, n) {
            if (Mn(t)) {
                for (var r = 0; r < i.length; r++)
                    if (!i[r].option && null != t.id && i[r].exist.id === t.id + "") return i[r].option = t, void(e[n] = null);
                for (r = 0; r < i.length; r++) {
                    var a = i[r].exist;
                    if (!(i[r].option || null != a.id && null != t.id || null == t.name || Ln(t) || Ln(a) || a.name !== t.name + "")) return i[r].option = t, void(e[n] = null)
                }
            }
        }), bn(e, function(t, e) {
            if (Mn(t)) {
                for (var n = 0; n < i.length; n++) {
                    var r = i[n].exist;
                    if (!i[n].option && !Ln(r) && null == t.id) {
                        i[n].option = t;
                        break
                    }
                }
                n >= i.length && i.push({
                    option: t
                })
            }
        }), i
    }

    function Pn(t) {
        var e = t.name;
        return !(!e || !e.indexOf(Tn))
    }

    function Ln(t) {
        return Mn(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0")
    }

    function On(t, e) {
        return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? D(e.dataIndex) ? T(e.dataIndex, function(e) {
            return t.indexOfRawIndex(e)
        }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? D(e.name) ? T(e.name, function(e) {
            return t.indexOfName(e)
        }) : t.indexOfName(e.name) : void 0
    }

    function En() {
        var t = "__\0ec_inner_" + Nn++ + "_" + Math.random().toFixed(5);
        return function(e) {
            return e[t] || (e[t] = {})
        }
    }
    var Nn = 0;

    function Rn(t, e, i) {
        if (P(e)) {
            var n = {};
            n[e + "Index"] = 0, e = n
        }
        var r = i && i.defaultMainType;
        !r || Bn(e, r + "Index") || Bn(e, r + "Id") || Bn(e, r + "Name") || (e[r + "Index"] = 0);
        var a = {};
        return bn(e, function(n, r) {
            n = e[r];
            if ("dataIndex" !== r && "dataIndexInside" !== r) {
                var o = r.match(/^(\w+)(Index|Id|Name)$/) || [],
                    s = o[1],
                    l = (o[2] || "").toLowerCase();
                if (!(!s || !l || null == n || "index" === l && "none" === n || i && i.includeMainTypes && _(i.includeMainTypes, s) < 0)) {
                    var h = {
                        mainType: s
                    };
                    "index" === l && "all" === n || (h[l] = n);
                    var u = t.queryComponents(h);
                    a[s + "Models"] = u, a[s + "Model"] = u[0]
                }
            } else a[r] = n
        }), a
    }

    function Bn(t, e) {
        return t && t.hasOwnProperty(e)
    }

    function zn(t, e, i) {
        t.setAttribute ? t.setAttribute(e, i) : t[e] = i
    }
    var Fn = ".",
        Vn = "___EC__COMPONENT__CONTAINER___";

    function Hn(t) {
        var e = {
            main: "",
            sub: ""
        };
        return t && (t = t.split(Fn), e.main = t[0] || "", e.sub = t[1] || ""), e
    }

    function Wn(t, e) {
        t.$constructor = t, t.extend = function(t) {
            var e = this,
                i = function() {
                    t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments)
                };
            return v(i.prototype, t), i.extend = this.extend, i.superCall = Xn, i.superApply = Un, w(i, this), i.superClass = e, i
        }
    }
    var Gn = 0;

    function qn(t) {
        var e = ["__\0is_clz", Gn++, Math.random().toFixed(3)].join("_");
        t.prototype[e] = !0, t.isInstance = function(t) {
            return !(!t || !t[e])
        }
    }

    function Xn(t, e) {
        var i = V(arguments, 2);
        return this.superClass.prototype[e].apply(t, i)
    }

    function Un(t, e, i) {
        return this.superClass.prototype[e].apply(t, i)
    }

    function Yn(t, e) {
        e = e || {};
        var i = {};
        if (t.registerClass = function(t, e) {
                if (e)
                    if (function(t) {
                            W(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
                        }(e), (e = Hn(e)).sub) {
                        if (e.sub !== Vn) {
                            (function(t) {
                                var e = i[t.main];
                                e && e[Vn] || ((e = i[t.main] = {})[Vn] = !0);
                                return e
                            }(e))[e.sub] = t
                        }
                    } else i[e.main] = t;
                return t
            }, t.getClass = function(t, e, n) {
                var r = i[t];
                if (r && r[Vn] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
                return r
            }, t.getClassesByMainType = function(t) {
                t = Hn(t);
                var e = [],
                    n = i[t.main];
                return n && n[Vn] ? S(n, function(t, i) {
                    i !== Vn && e.push(t)
                }) : e.push(n), e
            }, t.hasClass = function(t) {
                return t = Hn(t), !!i[t.main]
            }, t.getAllClassMainTypes = function() {
                var t = [];
                return S(i, function(e, i) {
                    t.push(i)
                }), t
            }, t.hasSubTypes = function(t) {
                t = Hn(t);
                var e = i[t.main];
                return e && e[Vn]
            }, t.parseClassType = Hn, e.registerWhenExtend) {
            var n = t.extend;
            n && (t.extend = function(e) {
                var i = n.call(this, e);
                return t.registerClass(i, e.type)
            })
        }
        return t
    }
    var Zn = function(t) {
            for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);
            return function(e, i, n) {
                for (var r = {}, a = 0; a < t.length; a++) {
                    var o = t[a][1];
                    if (!(i && _(i, o) >= 0 || n && _(n, o) < 0)) {
                        var s = e.getShallow(o);
                        null != s && (r[t[a][0]] = s)
                    }
                }
                return r
            }
        },
        jn = Zn([
            ["lineWidth", "width"],
            ["stroke", "color"],
            ["opacity"],
            ["shadowBlur"],
            ["shadowOffsetX"],
            ["shadowOffsetY"],
            ["shadowColor"]
        ]),
        Kn = {
            getLineStyle: function(t) {
                var e = jn(this, t),
                    i = this.getLineDash(e.lineWidth);
                return i && (e.lineDash = i), e
            },
            getLineDash: function(t) {
                null == t && (t = 1);
                var e = this.get("type"),
                    i = Math.max(t, 2),
                    n = 4 * t;
                return "solid" === e || null == e ? null : "dashed" === e ? [n, n] : [i, i]
            }
        },
        $n = Zn([
            ["fill", "color"],
            ["shadowBlur"],
            ["shadowOffsetX"],
            ["shadowOffsetY"],
            ["opacity"],
            ["shadowColor"]
        ]),
        Qn = {
            getAreaStyle: function(t, e) {
                return $n(this, t, e)
            }
        },
        Jn = Math.pow,
        tr = Math.sqrt,
        er = 1e-8,
        ir = 1e-4,
        nr = tr(3),
        rr = 1 / 3,
        ar = $(),
        or = $(),
        sr = $();

    function lr(t) {
        return t > -er && t < er
    }

    function hr(t) {
        return t > er || t < -er
    }

    function ur(t, e, i, n, r) {
        var a = 1 - r;
        return a * a * (a * t + 3 * r * e) + r * r * (r * n + 3 * a * i)
    }

    function cr(t, e, i, n, r) {
        var a = 1 - r;
        return 3 * (((e - t) * a + 2 * (i - e) * r) * a + (n - i) * r * r)
    }

    function dr(t, e, i, n, r) {
        var a = 6 * i - 12 * e + 6 * t,
            o = 9 * e + 3 * n - 3 * t - 9 * i,
            s = 3 * e - 3 * t,
            l = 0;
        if (lr(o)) {
            if (hr(a))(u = -s / a) >= 0 && u <= 1 && (r[l++] = u)
        } else {
            var h = a * a - 4 * o * s;
            if (lr(h)) r[0] = -a / (2 * o);
            else if (h > 0) {
                var u, c = tr(h),
                    d = (-a - c) / (2 * o);
                (u = (-a + c) / (2 * o)) >= 0 && u <= 1 && (r[l++] = u), d >= 0 && d <= 1 && (r[l++] = d)
            }
        }
        return l
    }

    function fr(t, e, i, n, r, a) {
        var o = (e - t) * r + t,
            s = (i - e) * r + e,
            l = (n - i) * r + i,
            h = (s - o) * r + o,
            u = (l - s) * r + s,
            c = (u - h) * r + h;
        a[0] = t, a[1] = o, a[2] = h, a[3] = c, a[4] = c, a[5] = u, a[6] = l, a[7] = n
    }

    function pr(t, e, i, n) {
        var r = 1 - n;
        return r * (r * t + 2 * n * e) + n * n * i
    }

    function gr(t, e, i, n) {
        return 2 * ((1 - n) * (e - t) + n * (i - e))
    }

    function vr(t, e, i) {
        var n = t + i - 2 * e;
        return 0 === n ? .5 : (t - e) / n
    }

    function mr(t, e, i, n, r) {
        var a = (e - t) * n + t,
            o = (i - e) * n + e,
            s = (o - a) * n + a;
        r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = i
    }
    var yr = Math.min,
        xr = Math.max,
        _r = Math.sin,
        wr = Math.cos,
        br = 2 * Math.PI,
        Mr = $(),
        Sr = $(),
        Tr = $();

    function Ir(t, e, i, n, r, a) {
        r[0] = yr(t, i), r[1] = yr(e, n), a[0] = xr(t, i), a[1] = xr(e, n)
    }
    var Cr = [],
        Ar = [];

    function Dr(t, e, i, n, r, a, o, s, l, h) {
        var u, c = dr,
            d = ur,
            f = c(t, i, r, o, Cr);
        for (l[0] = 1 / 0, l[1] = 1 / 0, h[0] = -1 / 0, h[1] = -1 / 0, u = 0; u < f; u++) {
            var p = d(t, i, r, o, Cr[u]);
            l[0] = yr(p, l[0]), h[0] = xr(p, h[0])
        }
        for (f = c(e, n, a, s, Ar), u = 0; u < f; u++) {
            var g = d(e, n, a, s, Ar[u]);
            l[1] = yr(g, l[1]), h[1] = xr(g, h[1])
        }
        l[0] = yr(t, l[0]), h[0] = xr(t, h[0]), l[0] = yr(o, l[0]), h[0] = xr(o, h[0]), l[1] = yr(e, l[1]), h[1] = xr(e, h[1]), l[1] = yr(s, l[1]), h[1] = xr(s, h[1])
    }

    function kr(t, e, i, n, r, a, o, s) {
        var l = vr,
            h = pr,
            u = xr(yr(l(t, i, r), 1), 0),
            c = xr(yr(l(e, n, a), 1), 0),
            d = h(t, i, r, u),
            f = h(e, n, a, c);
        o[0] = yr(t, r, d), o[1] = yr(e, a, f), s[0] = xr(t, r, d), s[1] = xr(e, a, f)
    }

    function Pr(t, e, i, n, r, a, o, s, l) {
        var h = st,
            u = lt,
            c = Math.abs(r - a);
        if (c % br < 1e-4 && c > 1e-4) return s[0] = t - i, s[1] = e - n, l[0] = t + i, void(l[1] = e + n);
        if (Mr[0] = wr(r) * i + t, Mr[1] = _r(r) * n + e, Sr[0] = wr(a) * i + t, Sr[1] = _r(a) * n + e, h(s, Mr, Sr), u(l, Mr, Sr), (r %= br) < 0 && (r += br), (a %= br) < 0 && (a += br), r > a && !o ? a += br : r < a && o && (r += br), o) {
            var d = a;
            a = r, r = d
        }
        for (var f = 0; f < a; f += Math.PI / 2) f > r && (Tr[0] = wr(f) * i + t, Tr[1] = _r(f) * n + e, h(s, Tr, s), u(l, Tr, l))
    }
    var Lr = {
            M: 1,
            L: 2,
            C: 3,
            Q: 4,
            A: 5,
            Z: 6,
            R: 7
        },
        Or = [],
        Er = [],
        Nr = [],
        Rr = [],
        Br = Math.min,
        zr = Math.max,
        Fr = Math.cos,
        Vr = Math.sin,
        Hr = Math.sqrt,
        Wr = Math.abs,
        Gr = "undefined" != typeof Float32Array,
        qr = function(t) {
            this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
        };

    function Xr(t, e, i, n, r, a, o) {
        if (0 === r) return !1;
        var s = r,
            l = 0;
        if (o > e + s && o > n + s || o < e - s && o < n - s || a > t + s && a > i + s || a < t - s && a < i - s) return !1;
        if (t === i) return Math.abs(a - t) <= s / 2;
        var h = (l = (e - n) / (t - i)) * a - o + (t * n - i * e) / (t - i);
        return h * h / (l * l + 1) <= s / 2 * s / 2
    }

    function Ur(t, e, i, n, r, a, o, s, l, h, u) {
        if (0 === l) return !1;
        var c = l;
        return !(u > e + c && u > n + c && u > a + c && u > s + c || u < e - c && u < n - c && u < a - c && u < s - c || h > t + c && h > i + c && h > r + c && h > o + c || h < t - c && h < i - c && h < r - c && h < o - c) && function(t, e, i, n, r, a, o, s, l, h, u) {
            var c, d, f, p, g, v = .005,
                m = 1 / 0;
            ar[0] = l, ar[1] = h;
            for (var y = 0; y < 1; y += .05) or[0] = ur(t, i, r, o, y), or[1] = ur(e, n, a, s, y), (p = at(ar, or)) < m && (c = y, m = p);
            m = 1 / 0;
            for (var x = 0; x < 32 && !(v < ir); x++) d = c - v, f = c + v, or[0] = ur(t, i, r, o, d), or[1] = ur(e, n, a, s, d), p = at(or, ar), d >= 0 && p < m ? (c = d, m = p) : (sr[0] = ur(t, i, r, o, f), sr[1] = ur(e, n, a, s, f), g = at(sr, ar), f <= 1 && g < m ? (c = f, m = g) : v *= .5);
            return u && (u[0] = ur(t, i, r, o, c), u[1] = ur(e, n, a, s, c)), tr(m)
        }(t, e, i, n, r, a, o, s, h, u, null) <= c / 2
    }

    function Yr(t, e, i, n, r, a, o, s, l) {
        if (0 === o) return !1;
        var h = o;
        return !(l > e + h && l > n + h && l > a + h || l < e - h && l < n - h && l < a - h || s > t + h && s > i + h && s > r + h || s < t - h && s < i - h && s < r - h) && function(t, e, i, n, r, a, o, s, l) {
            var h, u = .005,
                c = 1 / 0;
            ar[0] = o, ar[1] = s;
            for (var d = 0; d < 1; d += .05) or[0] = pr(t, i, r, d), or[1] = pr(e, n, a, d), (v = at(ar, or)) < c && (h = d, c = v);
            c = 1 / 0;
            for (var f = 0; f < 32 && !(u < ir); f++) {
                var p = h - u,
                    g = h + u;
                or[0] = pr(t, i, r, p), or[1] = pr(e, n, a, p);
                var v = at(or, ar);
                if (p >= 0 && v < c) h = p, c = v;
                else {
                    sr[0] = pr(t, i, r, g), sr[1] = pr(e, n, a, g);
                    var m = at(sr, ar);
                    g <= 1 && m < c ? (h = g, c = m) : u *= .5
                }
            }
            return l && (l[0] = pr(t, i, r, h), l[1] = pr(e, n, a, h)), tr(c)
        }(t, e, i, n, r, a, s, l, null) <= h / 2
    }
    qr.prototype = {
        constructor: qr,
        _xi: 0,
        _yi: 0,
        _x0: 0,
        _y0: 0,
        _ux: 0,
        _uy: 0,
        _len: 0,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function(t, e) {
            this._ux = Wr(1 / ge / t) || 0, this._uy = Wr(1 / ge / e) || 0
        },
        getContext: function() {
            return this._ctx
        },
        beginPath: function(t) {
            return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
        },
        moveTo: function(t, e) {
            return this.addData(Lr.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
        },
        lineTo: function(t, e) {
            var i = Wr(t - this._xi) > this._ux || Wr(e - this._yi) > this._uy || this._len < 5;
            return this.addData(Lr.L, t, e), this._ctx && i && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), i && (this._xi = t, this._yi = e), this
        },
        bezierCurveTo: function(t, e, i, n, r, a) {
            return this.addData(Lr.C, t, e, i, n, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, i, n, r, a) : this._ctx.bezierCurveTo(t, e, i, n, r, a)), this._xi = r, this._yi = a, this
        },
        quadraticCurveTo: function(t, e, i, n) {
            return this.addData(Lr.Q, t, e, i, n), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, i, n) : this._ctx.quadraticCurveTo(t, e, i, n)), this._xi = i, this._yi = n, this
        },
        arc: function(t, e, i, n, r, a) {
            return this.addData(Lr.A, t, e, i, i, n, r - n, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, n, r, a), this._xi = Fr(r) * i + t, this._yi = Vr(r) * i + t, this
        },
        arcTo: function(t, e, i, n, r) {
            return this._ctx && this._ctx.arcTo(t, e, i, n, r), this
        },
        rect: function(t, e, i, n) {
            return this._ctx && this._ctx.rect(t, e, i, n), this.addData(Lr.R, t, e, i, n), this
        },
        closePath: function() {
            this.addData(Lr.Z);
            var t = this._ctx,
                e = this._x0,
                i = this._y0;
            return t && (this._needsDash() && this._dashedLineTo(e, i), t.closePath()), this._xi = e, this._yi = i, this
        },
        fill: function(t) {
            t && t.fill(), this.toStatic()
        },
        stroke: function(t) {
            t && t.stroke(), this.toStatic()
        },
        setLineDash: function(t) {
            if (t instanceof Array) {
                this._lineDash = t, this._dashIdx = 0;
                for (var e = 0, i = 0; i < t.length; i++) e += t[i];
                this._dashSum = e
            }
            return this
        },
        setLineDashOffset: function(t) {
            return this._dashOffset = t, this
        },
        len: function() {
            return this._len
        },
        setData: function(t) {
            var e = t.length;
            this.data && this.data.length == e || !Gr || (this.data = new Float32Array(e));
            for (var i = 0; i < e; i++) this.data[i] = t[i];
            this._len = e
        },
        appendPath: function(t) {
            t instanceof Array || (t = [t]);
            for (var e = t.length, i = 0, n = this._len, r = 0; r < e; r++) i += t[r].len();
            Gr && this.data instanceof Float32Array && (this.data = new Float32Array(n + i));
            for (r = 0; r < e; r++)
                for (var a = t[r].data, o = 0; o < a.length; o++) this.data[n++] = a[o];
            this._len = n
        },
        addData: function(t) {
            if (this._saveData) {
                var e = this.data;
                this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                for (var i = 0; i < arguments.length; i++) e[this._len++] = arguments[i];
                this._prevCmd = t
            }
        },
        _expandData: function() {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                this.data = t
            }
        },
        _needsDash: function() {
            return this._lineDash
        },
        _dashedLineTo: function(t, e) {
            var i, n, r = this._dashSum,
                a = this._dashOffset,
                o = this._lineDash,
                s = this._ctx,
                l = this._xi,
                h = this._yi,
                u = t - l,
                c = e - h,
                d = Hr(u * u + c * c),
                f = l,
                p = h,
                g = o.length;
            for (a < 0 && (a = r + a), f -= (a %= r) * (u /= d), p -= a * (c /= d); u > 0 && f <= t || u < 0 && f >= t || 0 == u && (c > 0 && p <= e || c < 0 && p >= e);) f += u * (i = o[n = this._dashIdx]), p += c * i, this._dashIdx = (n + 1) % g, u > 0 && f < l || u < 0 && f > l || c > 0 && p < h || c < 0 && p > h || s[n % 2 ? "moveTo" : "lineTo"](u >= 0 ? Br(f, t) : zr(f, t), c >= 0 ? Br(p, e) : zr(p, e));
            u = f - t, c = p - e, this._dashOffset = -Hr(u * u + c * c)
        },
        _dashedBezierTo: function(t, e, i, n, r, a) {
            var o, s, l, h, u, c = this._dashSum,
                d = this._dashOffset,
                f = this._lineDash,
                p = this._ctx,
                g = this._xi,
                v = this._yi,
                m = ur,
                y = 0,
                x = this._dashIdx,
                _ = f.length,
                w = 0;
            for (d < 0 && (d = c + d), d %= c, o = 0; o < 1; o += .1) s = m(g, t, i, r, o + .1) - m(g, t, i, r, o), l = m(v, e, n, a, o + .1) - m(v, e, n, a, o), y += Hr(s * s + l * l);
            for (; x < _ && !((w += f[x]) > d); x++);
            for (o = (w - d) / y; o <= 1;) h = m(g, t, i, r, o), u = m(v, e, n, a, o), x % 2 ? p.moveTo(h, u) : p.lineTo(h, u), o += f[x] / y, x = (x + 1) % _;
            x % 2 != 0 && p.lineTo(r, a), s = r - h, l = a - u, this._dashOffset = -Hr(s * s + l * l)
        },
        _dashedQuadraticTo: function(t, e, i, n) {
            var r = i,
                a = n;
            i = (i + 2 * t) / 3, n = (n + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, i, n, r, a)
        },
        toStatic: function() {
            var t = this.data;
            t instanceof Array && (t.length = this._len, Gr && (this.data = new Float32Array(t)))
        },
        getBoundingRect: function() {
            Or[0] = Or[1] = Nr[0] = Nr[1] = Number.MAX_VALUE, Er[0] = Er[1] = Rr[0] = Rr[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, i = 0, n = 0, r = 0, a = 0; a < t.length;) {
                var o = t[a++];
                switch (1 == a && (n = e = t[a], r = i = t[a + 1]), o) {
                    case Lr.M:
                        e = n = t[a++], i = r = t[a++], Nr[0] = n, Nr[1] = r, Rr[0] = n, Rr[1] = r;
                        break;
                    case Lr.L:
                        Ir(e, i, t[a], t[a + 1], Nr, Rr), e = t[a++], i = t[a++];
                        break;
                    case Lr.C:
                        Dr(e, i, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], Nr, Rr), e = t[a++], i = t[a++];
                        break;
                    case Lr.Q:
                        kr(e, i, t[a++], t[a++], t[a], t[a + 1], Nr, Rr), e = t[a++], i = t[a++];
                        break;
                    case Lr.A:
                        var s = t[a++],
                            l = t[a++],
                            h = t[a++],
                            u = t[a++],
                            c = t[a++],
                            d = t[a++] + c,
                            f = (t[a++], 1 - t[a++]);
                        1 == a && (n = Fr(c) * h + s, r = Vr(c) * u + l), Pr(s, l, h, u, c, d, f, Nr, Rr), e = Fr(d) * h + s, i = Vr(d) * u + l;
                        break;
                    case Lr.R:
                        Ir(n = e = t[a++], r = i = t[a++], n + t[a++], r + t[a++], Nr, Rr);
                        break;
                    case Lr.Z:
                        e = n, i = r
                }
                st(Or, Or, Nr), lt(Er, Er, Rr)
            }
            return 0 === a && (Or[0] = Or[1] = Er[0] = Er[1] = 0), new Ce(Or[0], Or[1], Er[0] - Or[0], Er[1] - Or[1])
        },
        rebuildPath: function(t) {
            for (var e, i, n, r, a, o, s = this.data, l = this._ux, h = this._uy, u = this._len, c = 0; c < u;) {
                var d = s[c++];
                switch (1 == c && (e = n = s[c], i = r = s[c + 1]), d) {
                    case Lr.M:
                        e = n = s[c++], i = r = s[c++], t.moveTo(n, r);
                        break;
                    case Lr.L:
                        a = s[c++], o = s[c++], (Wr(a - n) > l || Wr(o - r) > h || c === u - 1) && (t.lineTo(a, o), n = a, r = o);
                        break;
                    case Lr.C:
                        t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), n = s[c - 2], r = s[c - 1];
                        break;
                    case Lr.Q:
                        t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), n = s[c - 2], r = s[c - 1];
                        break;
                    case Lr.A:
                        var f = s[c++],
                            p = s[c++],
                            g = s[c++],
                            v = s[c++],
                            m = s[c++],
                            y = s[c++],
                            x = s[c++],
                            _ = s[c++],
                            w = g > v ? g : v,
                            b = g > v ? 1 : g / v,
                            M = g > v ? v / g : 1,
                            S = m + y;
                        Math.abs(g - v) > .001 ? (t.translate(f, p), t.rotate(x), t.scale(b, M), t.arc(0, 0, w, m, S, 1 - _), t.scale(1 / b, 1 / M), t.rotate(-x), t.translate(-f, -p)) : t.arc(f, p, w, m, S, 1 - _), 1 == c && (e = Fr(m) * g + f, i = Vr(m) * v + p), n = Fr(S) * g + f, r = Vr(S) * v + p;
                        break;
                    case Lr.R:
                        e = n = s[c], i = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
                        break;
                    case Lr.Z:
                        t.closePath(), n = e, r = i
                }
            }
        }
    }, qr.CMD = Lr;
    var Zr = 2 * Math.PI;

    function jr(t) {
        return (t %= Zr) < 0 && (t += Zr), t
    }
    var Kr = 2 * Math.PI;

    function $r(t, e, i, n, r, a, o, s, l) {
        if (0 === o) return !1;
        var h = o;
        s -= t, l -= e;
        var u = Math.sqrt(s * s + l * l);
        if (u - h > i || u + h < i) return !1;
        if (Math.abs(n - r) % Kr < 1e-4) return !0;
        if (a) {
            var c = n;
            n = jr(r), r = jr(c)
        } else n = jr(n), r = jr(r);
        n > r && (r += Kr);
        var d = Math.atan2(l, s);
        return d < 0 && (d += Kr), d >= n && d <= r || d + Kr >= n && d + Kr <= r
    }

    function Qr(t, e, i, n, r, a) {
        if (a > e && a > n || a < e && a < n) return 0;
        if (n === e) return 0;
        var o = n < e ? 1 : -1,
            s = (a - e) / (n - e);
        1 !== s && 0 !== s || (o = n < e ? .5 : -.5);
        var l = s * (i - t) + t;
        return l === r ? 1 / 0 : l > r ? o : 0
    }
    var Jr = qr.CMD,
        ta = 2 * Math.PI,
        ea = 1e-4;
    var ia = [-1, -1, -1],
        na = [-1, -1];

    function ra(t, e, i, n, r, a, o, s, l, h) {
        if (h > e && h > n && h > a && h > s || h < e && h < n && h < a && h < s) return 0;
        var u, c = function(t, e, i, n, r, a) {
            var o = n + 3 * (e - i) - t,
                s = 3 * (i - 2 * e + t),
                l = 3 * (e - t),
                h = t - r,
                u = s * s - 3 * o * l,
                c = s * l - 9 * o * h,
                d = l * l - 3 * s * h,
                f = 0;
            if (lr(u) && lr(c)) lr(s) ? a[0] = 0 : (S = -l / s) >= 0 && S <= 1 && (a[f++] = S);
            else {
                var p = c * c - 4 * u * d;
                if (lr(p)) {
                    var g = c / u,
                        v = -g / 2;
                    (S = -s / o + g) >= 0 && S <= 1 && (a[f++] = S), v >= 0 && v <= 1 && (a[f++] = v)
                } else if (p > 0) {
                    var m = tr(p),
                        y = u * s + 1.5 * o * (-c + m),
                        x = u * s + 1.5 * o * (-c - m);
                    (S = (-s - ((y = y < 0 ? -Jn(-y, rr) : Jn(y, rr)) + (x = x < 0 ? -Jn(-x, rr) : Jn(x, rr)))) / (3 * o)) >= 0 && S <= 1 && (a[f++] = S)
                } else {
                    var _ = (2 * u * s - 3 * o * c) / (2 * tr(u * u * u)),
                        w = Math.acos(_) / 3,
                        b = tr(u),
                        M = Math.cos(w),
                        S = (-s - 2 * b * M) / (3 * o),
                        T = (v = (-s + b * (M + nr * Math.sin(w))) / (3 * o), (-s + b * (M - nr * Math.sin(w))) / (3 * o));
                    S >= 0 && S <= 1 && (a[f++] = S), v >= 0 && v <= 1 && (a[f++] = v), T >= 0 && T <= 1 && (a[f++] = T)
                }
            }
            return f
        }(e, n, a, s, h, ia);
        if (0 === c) return 0;
        for (var d, f, p = 0, g = -1, v = 0; v < c; v++) {
            var m = ia[v],
                y = 0 === m || 1 === m ? .5 : 1;
            ur(t, i, r, o, m) < l || (g < 0 && (g = dr(e, n, a, s, na), na[1] < na[0] && g > 1 && (void 0, u = na[0], na[0] = na[1], na[1] = u), d = ur(e, n, a, s, na[0]), g > 1 && (f = ur(e, n, a, s, na[1]))), 2 == g ? m < na[0] ? p += d < e ? y : -y : m < na[1] ? p += f < d ? y : -y : p += s < f ? y : -y : m < na[0] ? p += d < e ? y : -y : p += s < d ? y : -y)
        }
        return p
    }

    function aa(t, e, i, n, r, a, o, s) {
        if (s > e && s > n && s > a || s < e && s < n && s < a) return 0;
        var l = function(t, e, i, n, r) {
            var a = t - 2 * e + i,
                o = 2 * (e - t),
                s = t - n,
                l = 0;
            if (lr(a)) hr(o) && (u = -s / o) >= 0 && u <= 1 && (r[l++] = u);
            else {
                var h = o * o - 4 * a * s;
                if (lr(h))(u = -o / (2 * a)) >= 0 && u <= 1 && (r[l++] = u);
                else if (h > 0) {
                    var u, c = tr(h),
                        d = (-o - c) / (2 * a);
                    (u = (-o + c) / (2 * a)) >= 0 && u <= 1 && (r[l++] = u), d >= 0 && d <= 1 && (r[l++] = d)
                }
            }
            return l
        }(e, n, a, s, ia);
        if (0 === l) return 0;
        var h = vr(e, n, a);
        if (h >= 0 && h <= 1) {
            for (var u = 0, c = pr(e, n, a, h), d = 0; d < l; d++) {
                var f = 0 === ia[d] || 1 === ia[d] ? .5 : 1;
                pr(t, i, r, ia[d]) < o || (ia[d] < h ? u += c < e ? f : -f : u += a < c ? f : -f)
            }
            return u
        }
        f = 0 === ia[0] || 1 === ia[0] ? .5 : 1;
        return pr(t, i, r, ia[0]) < o ? 0 : a < e ? f : -f
    }

    function oa(t, e, i, n, r, a, o, s) {
        if ((s -= e) > i || s < -i) return 0;
        var l = Math.sqrt(i * i - s * s);
        ia[0] = -l, ia[1] = l;
        var h = Math.abs(n - r);
        if (h < 1e-4) return 0;
        if (h % ta < 1e-4) {
            n = 0, r = ta;
            var u = a ? 1 : -1;
            return o >= ia[0] + t && o <= ia[1] + t ? u : 0
        }
        if (a) {
            l = n;
            n = jr(r), r = jr(l)
        } else n = jr(n), r = jr(r);
        n > r && (r += ta);
        for (var c = 0, d = 0; d < 2; d++) {
            var f = ia[d];
            if (f + t > o) {
                var p = Math.atan2(s, f);
                u = a ? 1 : -1;
                p < 0 && (p = ta + p), (p >= n && p <= r || p + ta >= n && p + ta <= r) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (u = -u), c += u)
            }
        }
        return c
    }

    function sa(t, e, i, n, r) {
        for (var a, o, s = 0, l = 0, h = 0, u = 0, c = 0, d = 0; d < t.length;) {
            var f = t[d++];
            switch (f === Jr.M && d > 1 && (i || (s += Qr(l, h, u, c, n, r))), 1 == d && (u = l = t[d], c = h = t[d + 1]), f) {
                case Jr.M:
                    l = u = t[d++], h = c = t[d++];
                    break;
                case Jr.L:
                    if (i) {
                        if (Xr(l, h, t[d], t[d + 1], e, n, r)) return !0
                    } else s += Qr(l, h, t[d], t[d + 1], n, r) || 0;
                    l = t[d++], h = t[d++];
                    break;
                case Jr.C:
                    if (i) {
                        if (Ur(l, h, t[d++], t[d++], t[d++], t[d++], t[d], t[d + 1], e, n, r)) return !0
                    } else s += ra(l, h, t[d++], t[d++], t[d++], t[d++], t[d], t[d + 1], n, r) || 0;
                    l = t[d++], h = t[d++];
                    break;
                case Jr.Q:
                    if (i) {
                        if (Yr(l, h, t[d++], t[d++], t[d], t[d + 1], e, n, r)) return !0
                    } else s += aa(l, h, t[d++], t[d++], t[d], t[d + 1], n, r) || 0;
                    l = t[d++], h = t[d++];
                    break;
                case Jr.A:
                    var p = t[d++],
                        g = t[d++],
                        v = t[d++],
                        m = t[d++],
                        y = t[d++],
                        x = t[d++],
                        _ = (t[d++], 1 - t[d++]),
                        w = Math.cos(y) * v + p,
                        b = Math.sin(y) * m + g;
                    d > 1 ? s += Qr(l, h, w, b, n, r) : (u = w, c = b);
                    var M = (n - p) * m / v + p;
                    if (i) {
                        if ($r(p, g, m, y, y + x, _, e, M, r)) return !0
                    } else s += oa(p, g, m, y, y + x, _, M, r);
                    l = Math.cos(y + x) * v + p, h = Math.sin(y + x) * m + g;
                    break;
                case Jr.R:
                    u = l = t[d++], c = h = t[d++];
                    w = u + t[d++], b = c + t[d++];
                    if (i) {
                        if (Xr(u, c, w, c, e, n, r) || Xr(w, c, w, b, e, n, r) || Xr(w, b, u, b, e, n, r) || Xr(u, b, u, c, e, n, r)) return !0
                    } else s += Qr(w, c, w, b, n, r), s += Qr(u, b, u, c, n, r);
                    break;
                case Jr.Z:
                    if (i) {
                        if (Xr(l, h, u, c, e, n, r)) return !0
                    } else s += Qr(l, h, u, c, n, r);
                    l = u, h = c
            }
        }
        return i || (a = h, o = c, Math.abs(a - o) < ea) || (s += Qr(l, h, u, c, n, r) || 0), 0 !== s
    }
    var la = Ze.prototype.getCanvasPattern,
        ha = Math.abs,
        ua = new qr(!0);

    function ca(t) {
        Gi.call(this, t), this.path = null
    }
    ca.prototype = {
        constructor: ca,
        type: "path",
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        brush: function(t, e) {
            var i, n = this.style,
                r = this.path || ua,
                a = n.hasStroke(),
                o = n.hasFill(),
                s = n.fill,
                l = n.stroke,
                h = o && !!s.colorStops,
                u = a && !!l.colorStops,
                c = o && !!s.image,
                d = a && !!l.image;
            (n.bind(t, this, e), this.setTransform(t), this.__dirty) && (h && (i = i || this.getBoundingRect(), this._fillGradient = n.getGradient(t, s, i)), u && (i = i || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, l, i)));
            h ? t.fillStyle = this._fillGradient : c && (t.fillStyle = la.call(s, t)), u ? t.strokeStyle = this._strokeGradient : d && (t.strokeStyle = la.call(l, t));
            var f = n.lineDash,
                p = n.lineDashOffset,
                g = !!t.setLineDash,
                v = this.getGlobalScale();
            r.setScale(v[0], v[1]), this.__dirtyPath || f && !g && a ? (r.beginPath(t), f && !g && (r.setLineDash(f), r.setLineDashOffset(p)), this.buildPath(r, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), o && r.fill(t), f && g && (t.setLineDash(f), t.lineDashOffset = p), a && r.stroke(t), f && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
        },
        buildPath: function(t, e, i) {},
        createPathProxy: function() {
            this.path = new qr
        },
        getBoundingRect: function() {
            var t = this._rect,
                e = this.style,
                i = !t;
            if (i) {
                var n = this.path;
                n || (n = this.path = new qr), this.__dirtyPath && (n.beginPath(), this.buildPath(n, this.shape, !1)), t = n.getBoundingRect()
            }
            if (this._rect = t, e.hasStroke()) {
                var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
                if (this.__dirty || i) {
                    r.copy(t);
                    var a = e.lineWidth,
                        o = e.strokeNoScale ? this.getLineScale() : 1;
                    e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2)
                }
                return r
            }
            return t
        },
        contain: function(t, e) {
            var i = this.transformCoordToLocal(t, e),
                n = this.getBoundingRect(),
                r = this.style;
            if (t = i[0], e = i[1], n.contain(t, e)) {
                var a = this.path.data;
                if (r.hasStroke()) {
                    var o = r.lineWidth,
                        s = r.strokeNoScale ? this.getLineScale() : 1;
                    if (s > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), function(t, e, i, n) {
                            return sa(t, e, !0, i, n)
                        }(a, o / s, t, e))) return !0
                }
                if (r.hasFill()) return function(t, e, i) {
                    return sa(t, 0, !1, e, i)
                }(a, t, e)
            }
            return !1
        },
        dirty: function(t) {
            null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
        },
        animateShape: function(t) {
            return this.animate("shape", t)
        },
        attrKV: function(t, e) {
            "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : Gi.prototype.attrKV.call(this, t, e)
        },
        setShape: function(t, e) {
            var i = this.shape;
            if (i) {
                if (L(t))
                    for (var n in t) t.hasOwnProperty(n) && (i[n] = t[n]);
                else i[t] = e;
                this.dirty(!0)
            }
            return this
        },
        getLineScale: function() {
            var t = this.transform;
            return t && ha(t[0] - 1) > 1e-10 && ha(t[3] - 1) > 1e-10 ? Math.sqrt(ha(t[0] * t[3] - t[2] * t[1])) : 1
        }
    }, ca.extend = function(t) {
        var e = function(e) {
            ca.call(this, e), t.style && this.style.extendFrom(t.style, !1);
            var i = t.shape;
            if (i) {
                this.shape = this.shape || {};
                var n = this.shape;
                for (var r in i) !n.hasOwnProperty(r) && i.hasOwnProperty(r) && (n[r] = i[r])
            }
            t.init && t.init.call(this, e)
        };
        for (var i in w(e, ca), t) "style" !== i && "shape" !== i && (e.prototype[i] = t[i]);
        return e
    }, w(ca, Gi);
    var da = qr.CMD,
        fa = [
            [],
            [],
            []
        ],
        pa = Math.sqrt,
        ga = Math.atan2,
        va = function(t, e) {
            var i, n, r, a, o, s = t.data,
                l = da.M,
                h = da.C,
                u = da.L,
                c = da.R,
                d = da.A,
                f = da.Q;
            for (r = 0, a = 0; r < s.length;) {
                switch (i = s[r++], a = r, n = 0, i) {
                    case l:
                    case u:
                        n = 1;
                        break;
                    case h:
                        n = 3;
                        break;
                    case f:
                        n = 2;
                        break;
                    case d:
                        var p = e[4],
                            g = e[5],
                            v = pa(e[0] * e[0] + e[1] * e[1]),
                            m = pa(e[2] * e[2] + e[3] * e[3]),
                            y = ga(-e[1] / m, e[0] / v);
                        s[r] *= v, s[r++] += p, s[r] *= m, s[r++] += g, s[r++] *= v, s[r++] *= m, s[r++] += y, s[r++] += y, a = r += 2;
                        break;
                    case c:
                        x[0] = s[r++], x[1] = s[r++], ot(x, x, e), s[a++] = x[0], s[a++] = x[1], x[0] += s[r++], x[1] += s[r++], ot(x, x, e), s[a++] = x[0], s[a++] = x[1]
                }
                for (o = 0; o < n; o++) {
                    var x;
                    (x = fa[o])[0] = s[r++], x[1] = s[r++], ot(x, x, e), s[a++] = x[0], s[a++] = x[1]
                }
            }
        },
        ma = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"],
        ya = Math.sqrt,
        xa = Math.sin,
        _a = Math.cos,
        wa = Math.PI,
        ba = function(t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1])
        },
        Ma = function(t, e) {
            return (t[0] * e[0] + t[1] * e[1]) / (ba(t) * ba(e))
        },
        Sa = function(t, e) {
            return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(Ma(t, e))
        };

    function Ta(t, e, i, n, r, a, o, s, l, h, u) {
        var c = l * (wa / 180),
            d = _a(c) * (t - i) / 2 + xa(c) * (e - n) / 2,
            f = -1 * xa(c) * (t - i) / 2 + _a(c) * (e - n) / 2,
            p = d * d / (o * o) + f * f / (s * s);
        p > 1 && (o *= ya(p), s *= ya(p));
        var g = (r === a ? -1 : 1) * ya((o * o * (s * s) - o * o * (f * f) - s * s * (d * d)) / (o * o * (f * f) + s * s * (d * d))) || 0,
            v = g * o * f / s,
            m = g * -s * d / o,
            y = (t + i) / 2 + _a(c) * v - xa(c) * m,
            x = (e + n) / 2 + xa(c) * v + _a(c) * m,
            _ = Sa([1, 0], [(d - v) / o, (f - m) / s]),
            w = [(d - v) / o, (f - m) / s],
            b = [(-1 * d - v) / o, (-1 * f - m) / s],
            M = Sa(w, b);
        Ma(w, b) <= -1 && (M = wa), Ma(w, b) >= 1 && (M = 0), 0 === a && M > 0 && (M -= 2 * wa), 1 === a && M < 0 && (M += 2 * wa), u.addData(h, y, x, o, s, _, M, c, a)
    }

    function Ia(t, e) {
        var i = function(t) {
            if (!t) return [];
            var e, i = t.replace(/-/g, " -").replace(/  /g, " ").replace(/ /g, ",").replace(/,,/g, ",");
            for (e = 0; e < ma.length; e++) i = i.replace(new RegExp(ma[e], "g"), "|" + ma[e]);
            var n, r = i.split("|"),
                a = 0,
                o = 0,
                s = new qr,
                l = qr.CMD;
            for (e = 1; e < r.length; e++) {
                var h, u = r[e],
                    c = u.charAt(0),
                    d = 0,
                    f = u.slice(1).replace(/e,-/g, "e-").split(",");
                f.length > 0 && "" === f[0] && f.shift();
                for (var p = 0; p < f.length; p++) f[p] = parseFloat(f[p]);
                for (; d < f.length && !isNaN(f[d]) && !isNaN(f[0]);) {
                    var g, v, m, y, x, _, w, b = a,
                        M = o;
                    switch (c) {
                        case "l":
                            a += f[d++], o += f[d++], h = l.L, s.addData(h, a, o);
                            break;
                        case "L":
                            a = f[d++], o = f[d++], h = l.L, s.addData(h, a, o);
                            break;
                        case "m":
                            a += f[d++], o += f[d++], h = l.M, s.addData(h, a, o), c = "l";
                            break;
                        case "M":
                            a = f[d++], o = f[d++], h = l.M, s.addData(h, a, o), c = "L";
                            break;
                        case "h":
                            a += f[d++], h = l.L, s.addData(h, a, o);
                            break;
                        case "H":
                            a = f[d++], h = l.L, s.addData(h, a, o);
                            break;
                        case "v":
                            o += f[d++], h = l.L, s.addData(h, a, o);
                            break;
                        case "V":
                            o = f[d++], h = l.L, s.addData(h, a, o);
                            break;
                        case "C":
                            h = l.C, s.addData(h, f[d++], f[d++], f[d++], f[d++], f[d++], f[d++]), a = f[d - 2], o = f[d - 1];
                            break;
                        case "c":
                            h = l.C, s.addData(h, f[d++] + a, f[d++] + o, f[d++] + a, f[d++] + o, f[d++] + a, f[d++] + o), a += f[d - 2], o += f[d - 1];
                            break;
                        case "S":
                            g = a, v = o;
                            var S = s.len(),
                                T = s.data;
                            n === l.C && (g += a - T[S - 4], v += o - T[S - 3]), h = l.C, b = f[d++], M = f[d++], a = f[d++], o = f[d++], s.addData(h, g, v, b, M, a, o);
                            break;
                        case "s":
                            g = a, v = o, S = s.len(), T = s.data, n === l.C && (g += a - T[S - 4], v += o - T[S - 3]), h = l.C, b = a + f[d++], M = o + f[d++], a += f[d++], o += f[d++], s.addData(h, g, v, b, M, a, o);
                            break;
                        case "Q":
                            b = f[d++], M = f[d++], a = f[d++], o = f[d++], h = l.Q, s.addData(h, b, M, a, o);
                            break;
                        case "q":
                            b = f[d++] + a, M = f[d++] + o, a += f[d++], o += f[d++], h = l.Q, s.addData(h, b, M, a, o);
                            break;
                        case "T":
                            g = a, v = o, S = s.len(), T = s.data, n === l.Q && (g += a - T[S - 4], v += o - T[S - 3]), a = f[d++], o = f[d++], h = l.Q, s.addData(h, g, v, a, o);
                            break;
                        case "t":
                            g = a, v = o, S = s.len(), T = s.data, n === l.Q && (g += a - T[S - 4], v += o - T[S - 3]), a += f[d++], o += f[d++], h = l.Q, s.addData(h, g, v, a, o);
                            break;
                        case "A":
                            m = f[d++], y = f[d++], x = f[d++], _ = f[d++], w = f[d++], Ta(b = a, M = o, a = f[d++], o = f[d++], _, w, m, y, x, h = l.A, s);
                            break;
                        case "a":
                            m = f[d++], y = f[d++], x = f[d++], _ = f[d++], w = f[d++], Ta(b = a, M = o, a += f[d++], o += f[d++], _, w, m, y, x, h = l.A, s)
                    }
                }
                "z" !== c && "Z" !== c || (h = l.Z, s.addData(h)), n = h
            }
            return s.toStatic(), s
        }(t);
        return (e = e || {}).buildPath = function(t) {
            if (t.setData) {
                t.setData(i.data), (e = t.getContext()) && t.rebuildPath(e)
            } else {
                var e = t;
                i.rebuildPath(e)
            }
        }, e.applyTransform = function(t) {
            va(i, t), this.dirty(!0)
        }, e
    }
    var Ca = function(t) {
        Gi.call(this, t)
    };
    Ca.prototype = {
        constructor: Ca,
        type: "text",
        brush: function(t, e) {
            var i = this.style;
            this.__dirty && Ii(i), i.fill = i.stroke = i.shadowBlur = i.shadowColor = i.shadowOffsetX = i.shadowOffsetY = null;
            var n = i.text;
            null != n && (n += ""), i.bind(t, this, e), Vi(n, i) && (this.setTransform(t), Ai(this, t, n, i), this.restoreTransform(t))
        },
        getBoundingRect: function() {
            var t = this.style;
            if (this.__dirty && Ii(t), !this._rect) {
                var e = t.text;
                null != e ? e += "" : e = "";
                var i = ci(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.rich);
                if (i.x += t.x || 0, i.y += t.y || 0, Ri(t.textStroke, t.textStrokeWidth)) {
                    var n = t.textStrokeWidth;
                    i.x -= n / 2, i.y -= n / 2, i.width += n, i.height += n
                }
                this._rect = i
            }
            return this._rect
        }
    }, w(Ca, Gi);
    var Aa = ca.extend({
            type: "circle",
            shape: {
                cx: 0,
                cy: 0,
                r: 0
            },
            buildPath: function(t, e, i) {
                i && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
            }
        }),
        Da = [
            ["shadowBlur", 0],
            ["shadowColor", "#000"],
            ["shadowOffsetX", 0],
            ["shadowOffsetY", 0]
        ],
        ka = function(t) {
            return n.browser.ie && n.browser.version >= 11 ? function() {
                var e, i = this.__clipPaths,
                    n = this.style;
                if (i)
                    for (var r = 0; r < i.length; r++) {
                        var a = i[r],
                            o = a && a.shape,
                            s = a && a.type;
                        if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {
                            for (var l = 0; l < Da.length; l++) Da[l][2] = n[Da[l][0]], n[Da[l][0]] = Da[l][1];
                            e = !0;
                            break
                        }
                    }
                if (t.apply(this, arguments), e)
                    for (l = 0; l < Da.length; l++) n[Da[l][0]] = Da[l][2]
            } : t
        },
        Pa = ca.extend({
            type: "sector",
            shape: {
                cx: 0,
                cy: 0,
                r0: 0,
                r: 0,
                startAngle: 0,
                endAngle: 2 * Math.PI,
                clockwise: !0
            },
            brush: ka(ca.prototype.brush),
            buildPath: function(t, e) {
                var i = e.cx,
                    n = e.cy,
                    r = Math.max(e.r0 || 0, 0),
                    a = Math.max(e.r, 0),
                    o = e.startAngle,
                    s = e.endAngle,
                    l = e.clockwise,
                    h = Math.cos(o),
                    u = Math.sin(o);
                t.moveTo(h * r + i, u * r + n), t.lineTo(h * a + i, u * a + n), t.arc(i, n, a, o, s, !l), t.lineTo(Math.cos(s) * r + i, Math.sin(s) * r + n), 0 !== r && t.arc(i, n, r, s, o, l), t.closePath()
            }
        }),
        La = ca.extend({
            type: "ring",
            shape: {
                cx: 0,
                cy: 0,
                r: 0,
                r0: 0
            },
            buildPath: function(t, e) {
                var i = e.cx,
                    n = e.cy,
                    r = 2 * Math.PI;
                t.moveTo(i + e.r, n), t.arc(i, n, e.r, 0, r, !1), t.moveTo(i + e.r0, n), t.arc(i, n, e.r0, 0, r, !0)
            }
        });

    function Oa(t, e, i, n, r, a, o) {
        var s = .5 * (i - t),
            l = .5 * (n - e);
        return (2 * (e - i) + s + l) * o + (-3 * (e - i) - 2 * s - l) * a + s * r + e
    }
    var Ea = function(t, e) {
            for (var i = t.length, n = [], r = 0, a = 1; a < i; a++) r += nt(t[a - 1], t[a]);
            var o = r / 2;
            o = o < i ? i : o;
            for (a = 0; a < o; a++) {
                var s, l, h, u = a / (o - 1) * (e ? i : i - 1),
                    c = Math.floor(u),
                    d = u - c,
                    f = t[c % i];
                e ? (s = t[(c - 1 + i) % i], l = t[(c + 1) % i], h = t[(c + 2) % i]) : (s = t[0 === c ? c : c - 1], l = t[c > i - 2 ? i - 1 : c + 1], h = t[c > i - 3 ? i - 1 : c + 2]);
                var p = d * d,
                    g = d * p;
                n.push([Oa(s[0], f[0], l[0], h[0], d, p, g), Oa(s[1], f[1], l[1], h[1], d, p, g)])
            }
            return n
        },
        Na = function(t, e, i, n) {
            var r, a, o, s, l = [],
                h = [],
                u = [],
                c = [];
            if (n) {
                o = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];
                for (var d = 0, f = t.length; d < f; d++) st(o, o, t[d]), lt(s, s, t[d]);
                st(o, o, n[0]), lt(s, s, n[1])
            }
            for (d = 0, f = t.length; d < f; d++) {
                var p = t[d];
                if (i) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f];
                else {
                    if (0 === d || d === f - 1) {
                        l.push(Q(t[d]));
                        continue
                    }
                    r = t[d - 1], a = t[d + 1]
                }
                tt(h, a, r), et(h, h, e);
                var g = nt(p, r),
                    v = nt(p, a),
                    m = g + v;
                0 !== m && (g /= m, v /= m), et(u, h, -g), et(c, h, v);
                var y = J([], p, u),
                    x = J([], p, c);
                n && (lt(y, y, o), st(y, y, s), lt(x, x, o), st(x, x, s)), l.push(y), l.push(x)
            }
            return i && l.push(l.shift()), l
        };

    function Ra(t, e, i) {
        var n = e.points,
            r = e.smooth;
        if (n && n.length >= 2) {
            if (r && "spline" !== r) {
                var a = Na(n, r, i, e.smoothConstraint);
                t.moveTo(n[0][0], n[0][1]);
                for (var o = n.length, s = 0; s < (i ? o : o - 1); s++) {
                    var l = a[2 * s],
                        h = a[2 * s + 1],
                        u = n[(s + 1) % o];
                    t.bezierCurveTo(l[0], l[1], h[0], h[1], u[0], u[1])
                }
            } else {
                "spline" === r && (n = Ea(n, i)), t.moveTo(n[0][0], n[0][1]);
                s = 1;
                for (var c = n.length; s < c; s++) t.lineTo(n[s][0], n[s][1])
            }
            i && t.closePath()
        }
    }
    var Ba = ca.extend({
            type: "polygon",
            shape: {
                points: null,
                smooth: !1,
                smoothConstraint: null
            },
            buildPath: function(t, e) {
                Ra(t, e, !0)
            }
        }),
        za = ca.extend({
            type: "polyline",
            shape: {
                points: null,
                smooth: !1,
                smoothConstraint: null
            },
            style: {
                stroke: "#000",
                fill: null
            },
            buildPath: function(t, e) {
                Ra(t, e, !1)
            }
        }),
        Fa = ca.extend({
            type: "rect",
            shape: {
                r: 0,
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            buildPath: function(t, e) {
                var i = e.x,
                    n = e.y,
                    r = e.width,
                    a = e.height;
                e.r ? Mi(t, e) : t.rect(i, n, r, a), t.closePath()
            }
        }),
        Va = ca.extend({
            type: "line",
            shape: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                percent: 1
            },
            style: {
                stroke: "#000",
                fill: null
            },
            buildPath: function(t, e) {
                var i = e.x1,
                    n = e.y1,
                    r = e.x2,
                    a = e.y2,
                    o = e.percent;
                0 !== o && (t.moveTo(i, n), o < 1 && (r = i * (1 - o) + r * o, a = n * (1 - o) + a * o), t.lineTo(r, a))
            },
            pointAt: function(t) {
                var e = this.shape;
                return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
            }
        }),
        Ha = [];

    function Wa(t, e, i) {
        var n = t.cpx2,
            r = t.cpy2;
        return null === n || null === r ? [(i ? cr : ur)(t.x1, t.cpx1, t.cpx2, t.x2, e), (i ? cr : ur)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(i ? gr : pr)(t.x1, t.cpx1, t.x2, e), (i ? gr : pr)(t.y1, t.cpy1, t.y2, e)]
    }
    var Ga = ca.extend({
            type: "bezier-curve",
            shape: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                cpx1: 0,
                cpy1: 0,
                percent: 1
            },
            style: {
                stroke: "#000",
                fill: null
            },
            buildPath: function(t, e) {
                var i = e.x1,
                    n = e.y1,
                    r = e.x2,
                    a = e.y2,
                    o = e.cpx1,
                    s = e.cpy1,
                    l = e.cpx2,
                    h = e.cpy2,
                    u = e.percent;
                0 !== u && (t.moveTo(i, n), null == l || null == h ? (u < 1 && (mr(i, o, r, u, Ha), o = Ha[1], r = Ha[2], mr(n, s, a, u, Ha), s = Ha[1], a = Ha[2]), t.quadraticCurveTo(o, s, r, a)) : (u < 1 && (fr(i, o, l, r, u, Ha), o = Ha[1], l = Ha[2], r = Ha[3], fr(n, s, h, a, u, Ha), s = Ha[1], h = Ha[2], a = Ha[3]), t.bezierCurveTo(o, s, l, h, r, a)))
            },
            pointAt: function(t) {
                return Wa(this.shape, t, !1)
            },
            tangentAt: function(t) {
                var e = Wa(this.shape, t, !0);
                return it(e, e)
            }
        }),
        qa = ca.extend({
            type: "arc",
            shape: {
                cx: 0,
                cy: 0,
                r: 0,
                startAngle: 0,
                endAngle: 2 * Math.PI,
                clockwise: !0
            },
            style: {
                stroke: "#000",
                fill: null
            },
            buildPath: function(t, e) {
                var i = e.cx,
                    n = e.cy,
                    r = Math.max(e.r, 0),
                    a = e.startAngle,
                    o = e.endAngle,
                    s = e.clockwise,
                    l = Math.cos(a),
                    h = Math.sin(a);
                t.moveTo(l * r + i, h * r + n), t.arc(i, n, r, a, o, !s)
            }
        }),
        Xa = ca.extend({
            type: "compound",
            shape: {
                paths: null
            },
            _updatePathDirty: function() {
                for (var t = this.__dirtyPath, e = this.shape.paths, i = 0; i < e.length; i++) t = t || e[i].__dirtyPath;
                this.__dirtyPath = t, this.__dirty = this.__dirty || t
            },
            beforeBrush: function() {
                this._updatePathDirty();
                for (var t = this.shape.paths || [], e = this.getGlobalScale(), i = 0; i < t.length; i++) t[i].path || t[i].createPathProxy(), t[i].path.setScale(e[0], e[1])
            },
            buildPath: function(t, e) {
                for (var i = e.paths || [], n = 0; n < i.length; n++) i[n].buildPath(t, i[n].shape, !0)
            },
            afterBrush: function() {
                for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1
            },
            getBoundingRect: function() {
                return this._updatePathDirty(), ca.prototype.getBoundingRect.call(this)
            }
        }),
        Ua = function(t) {
            this.colorStops = t || []
        };
    Ua.prototype = {
        constructor: Ua,
        addColorStop: function(t, e) {
            this.colorStops.push({
                offset: t,
                color: e
            })
        }
    };
    var Ya = function(t, e, i, n, r, a) {
        this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == i ? 1 : i, this.y2 = null == n ? 0 : n, this.type = "linear", this.global = a || !1, Ua.call(this, r)
    };
    Ya.prototype = {
        constructor: Ya
    }, w(Ya, Ua);
    var Za = function(t, e, i, n, r) {
        this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == i ? .5 : i, this.type = "radial", this.global = r || !1, Ua.call(this, n)
    };

    function ja(t) {
        Gi.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0
    }
    Za.prototype = {
        constructor: Za
    }, w(Za, Ua), ja.prototype.incremental = !0, ja.prototype.clearDisplaybles = function() {
        this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1
    }, ja.prototype.addDisplayable = function(t, e) {
        e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty()
    }, ja.prototype.addDisplayables = function(t, e) {
        e = e || !1;
        for (var i = 0; i < t.length; i++) this.addDisplayable(t[i], e)
    }, ja.prototype.eachPendingDisplayable = function(t) {
        for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
        for (e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e])
    }, ja.prototype.update = function() {
        this.updateTransform();
        for (var t = this._cursor; t < this._displayables.length; t++) {
            (e = this._displayables[t]).parent = this, e.update(), e.parent = null
        }
        for (t = 0; t < this._temporaryDisplayables.length; t++) {
            var e;
            (e = this._temporaryDisplayables[t]).parent = this, e.update(), e.parent = null
        }
    }, ja.prototype.brush = function(t, e) {
        for (var i = this._cursor; i < this._displayables.length; i++) {
            (n = this._displayables[i]).beforeBrush && n.beforeBrush(t), n.brush(t, i === this._cursor ? null : this._displayables[i - 1]), n.afterBrush && n.afterBrush(t)
        }
        this._cursor = i;
        for (i = 0; i < this._temporaryDisplayables.length; i++) {
            var n;
            (n = this._temporaryDisplayables[i]).beforeBrush && n.beforeBrush(t), n.brush(t, 0 === i ? null : this._temporaryDisplayables[i - 1]), n.afterBrush && n.afterBrush(t)
        }
        this._temporaryDisplayables = [], this.notClear = !0
    };
    var Ka = [];
    ja.prototype.getBoundingRect = function() {
        if (!this._rect) {
            for (var t = new Ce(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                var i = this._displayables[e],
                    n = i.getBoundingRect().clone();
                i.needLocalTransform() && n.applyTransform(i.getLocalTransform(Ka)), t.union(n)
            }
            this._rect = t
        }
        return this._rect
    }, ja.prototype.contain = function(t, e) {
        var i = this.transformCoordToLocal(t, e);
        if (this.getBoundingRect().contain(i[0], i[1]))
            for (var n = 0; n < this._displayables.length; n++) {
                if (this._displayables[n].contain(t, e)) return !0
            }
        return !1
    }, w(ja, Gi);
    var $a = Math.round,
        Qa = Math.max,
        Ja = Math.min,
        to = {};

    function eo(t) {
        return ca.extend(t)
    }

    function io(t, e, i, n) {
        var r = function(t, e) {
                return new ca(Ia(t, e))
            }(t, e),
            a = r.getBoundingRect();
        return i && ("center" === n && (i = ro(i, a)), oo(r, i)), r
    }

    function no(t, e, i) {
        var n = new qi({
            style: {
                image: t,
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height
            },
            onload: function(t) {
                if ("center" === i) {
                    var r = {
                        width: t.width,
                        height: t.height
                    };
                    n.setStyle(ro(e, r))
                }
            }
        });
        return n
    }

    function ro(t, e) {
        var i, n = e.width / e.height,
            r = t.height * n;
        return i = r <= t.width ? t.height : (r = t.width) / n, {
            x: t.x + t.width / 2 - r / 2,
            y: t.y + t.height / 2 - i / 2,
            width: r,
            height: i
        }
    }
    var ao = function(t, e) {
        for (var i = [], n = t.length, r = 0; r < n; r++) {
            var a = t[r];
            a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), i.push(a.path)
        }
        var o = new ca(e);
        return o.createPathProxy(), o.buildPath = function(t) {
            t.appendPath(i);
            var e = t.getContext();
            e && t.rebuildPath(e)
        }, o
    };

    function oo(t, e) {
        if (t.applyTransform) {
            var i = t.getBoundingRect().calculateTransform(e);
            t.applyTransform(i)
        }
    }

    function so(t) {
        var e = t.shape,
            i = t.style.lineWidth;
        return $a(2 * e.x1) === $a(2 * e.x2) && (e.x1 = e.x2 = lo(e.x1, i, !0)), $a(2 * e.y1) === $a(2 * e.y2) && (e.y1 = e.y2 = lo(e.y1, i, !0)), t
    }

    function lo(t, e, i) {
        var n = $a(2 * t);
        return (n + $a(e)) % 2 == 0 ? n / 2 : (n + (i ? 1 : -1)) / 2
    }

    function ho(t) {
        return null != t && "none" != t
    }

    function uo(t) {
        return "string" == typeof t ? function(t, e) {
            var i = $t(t);
            if (i) {
                for (var n = 0; n < 3; n++) i[n] = e < 0 ? i[n] * (1 - e) | 0 : (255 - i[n]) * e + i[n] | 0, i[n] > 255 ? i[n] = 255 : t[n] < 0 && (i[n] = 0);
                return Jt(i, 4 === i.length ? "rgba" : "rgb")
            }
        }(t, -.1) : t
    }

    function co(t) {
        if (t.__hoverStlDirty) {
            var e = t.style.stroke,
                i = t.style.fill,
                n = t.__hoverStl;
            n.fill = n.fill || (ho(i) ? uo(i) : null), n.stroke = n.stroke || (ho(e) ? uo(e) : null);
            var r = {};
            for (var a in n) null != n[a] && (r[a] = t.style[a]);
            t.__normalStl = r, t.__hoverStlDirty = !1
        }
    }

    function fo(t) {
        if (!t.__isHover) {
            if (co(t), t.useHoverLayer) t.__zr && t.__zr.addHover(t, t.__hoverStl);
            else {
                var e = t.style,
                    i = e.insideRollbackOpt;
                i && function(t) {
                    var e = t.insideRollback;
                    e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth)
                }(e), e.extendFrom(t.__hoverStl), i && (Ao(e, e.insideOriginalTextPosition, i), null == e.textFill && (e.textFill = i.autoColor)), t.dirty(!1), t.z2 += 1
            }
            t.__isHover = !0
        }
    }

    function po(t) {
        if (t.__isHover) {
            var e = t.__normalStl;
            t.useHoverLayer ? t.__zr && t.__zr.removeHover(t) : (e && t.setStyle(e), t.z2 -= 1), t.__isHover = !1
        }
    }

    function go(t) {
        "group" === t.type ? t.traverse(function(t) {
            "group" !== t.type && fo(t)
        }) : fo(t)
    }

    function vo(t) {
        "group" === t.type ? t.traverse(function(t) {
            "group" !== t.type && po(t)
        }) : po(t)
    }

    function mo(t, e) {
        t.__hoverStl = t.hoverStyle || e || {}, t.__hoverStlDirty = !0, t.__isHover && co(t)
    }

    function yo(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && go(this)
    }

    function xo(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && vo(this)
    }

    function _o() {
        this.__isEmphasis = !0, go(this)
    }

    function wo() {
        this.__isEmphasis = !1, vo(this)
    }

    function bo(t, e, i) {
        t.__hoverSilentOnTouch = i && i.hoverSilentOnTouch, "group" === t.type ? t.traverse(function(t) {
            "group" !== t.type && mo(t, e)
        }) : mo(t, e), t.on("mouseover", yo).on("mouseout", xo), t.on("emphasis", _o).on("normal", wo)
    }

    function Mo(t, e, i, n, r, a, o) {
        var s, l = (r = r || to).labelFetcher,
            h = r.labelDataIndex,
            u = r.labelDimIndex,
            c = i.getShallow("show"),
            d = n.getShallow("show");
        (c || d) && (l && (s = l.getFormattedLabel(h, "normal", null, u)), null == s && (s = k(r.defaultText) ? r.defaultText(h, r) : r.defaultText));
        var f = c ? s : null,
            p = d ? z(l ? l.getFormattedLabel(h, "emphasis", null, u) : null, s) : null;
        null == f && null == p || (So(t, i, a, r), So(e, n, o, r, !0)), t.text = f, e.text = p
    }

    function So(t, e, i, n, r) {
        return To(t, e, n, r), i && v(t, i), t.host && t.host.dirty && t.host.dirty(!1), t
    }

    function To(t, e, i, n) {
        if ((i = i || to).isRectText) {
            var r = e.getShallow("position") || (n ? null : "inside");
            "outside" === r && (r = "top"), t.textPosition = r, t.textOffset = e.getShallow("offset");
            var a = e.getShallow("rotate");
            null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = z(e.getShallow("distance"), n ? null : 5)
        }
        var o, s = e.ecModel,
            l = s && s.option.textStyle,
            h = function(t) {
                var e;
                for (; t && t !== t.ecModel;) {
                    var i = (t.option || to).rich;
                    if (i)
                        for (var n in e = e || {}, i) i.hasOwnProperty(n) && (e[n] = 1);
                    t = t.parentModel
                }
                return e
            }(e);
        if (h)
            for (var u in o = {}, h)
                if (h.hasOwnProperty(u)) {
                    var c = e.getModel(["rich", u]);
                    Io(o[u] = {}, c, l, i, n)
                }
        return t.rich = o, Io(t, e, l, i, n, !0), i.forceRich && !i.textStyle && (i.textStyle = {}), t
    }

    function Io(t, e, i, n, r, a) {
        if (i = !r && i || to, t.textFill = Co(e.getShallow("color"), n) || i.color, t.textStroke = Co(e.getShallow("textBorderColor"), n) || i.textBorderColor, t.textStrokeWidth = z(e.getShallow("textBorderWidth"), i.textBorderWidth), !r) {
            if (a) {
                var o = t.textPosition;
                t.insideRollback = Ao(t, o, n), t.insideOriginalTextPosition = o, t.insideRollbackOpt = n
            }
            null == t.textFill && (t.textFill = n.autoColor)
        }
        t.fontStyle = e.getShallow("fontStyle") || i.fontStyle, t.fontWeight = e.getShallow("fontWeight") || i.fontWeight, t.fontSize = e.getShallow("fontSize") || i.fontSize, t.fontFamily = e.getShallow("fontFamily") || i.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && n.disableBox || (t.textBackgroundColor = Co(e.getShallow("backgroundColor"), n), t.textPadding = e.getShallow("padding"), t.textBorderColor = Co(e.getShallow("borderColor"), n), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || i.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || i.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || i.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || i.textShadowOffsetY
    }

    function Co(t, e) {
        return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null
    }

    function Ao(t, e, i) {
        var n, r = i.useInsideStyle;
        return null == t.textFill && !1 !== r && (!0 === r || i.isRectText && e && "string" == typeof e && e.indexOf("inside") >= 0) && (n = {
            textFill: null,
            textStroke: t.textStroke,
            textStrokeWidth: t.textStrokeWidth
        }, t.textFill = "#fff", null == t.textStroke && (t.textStroke = i.autoColor, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), n
    }

    function Do(t, e) {
        var i = e || e.getModel("textStyle");
        return G([t.fontStyle || i && i.getShallow("fontStyle") || "", t.fontWeight || i && i.getShallow("fontWeight") || "", (t.fontSize || i && i.getShallow("fontSize") || 12) + "px", t.fontFamily || i && i.getShallow("fontFamily") || "sans-serif"].join(" "))
    }

    function ko(t, e, i, n, r, a) {
        if ("function" == typeof r && (a = r, r = null), n && n.isAnimationEnabled()) {
            var o = t ? "Update" : "",
                s = n.getShallow("animationDuration" + o),
                l = n.getShallow("animationEasing" + o),
                h = n.getShallow("animationDelay" + o);
            "function" == typeof h && (h = h(r, n.getAnimationDelayParams ? n.getAnimationDelayParams(e, r) : null)), "function" == typeof s && (s = s(r)), s > 0 ? e.animateTo(i, s, h || 0, l, a, !!a) : (e.stopAnimation(), e.attr(i), a && a())
        } else e.stopAnimation(), e.attr(i), a && a()
    }

    function Po(t, e, i, n, r) {
        ko(!0, t, e, i, n, r)
    }

    function Lo(t, e, i, n, r) {
        ko(!1, t, e, i, n, r)
    }

    function Oo(t, e, i) {
        return e && !M(e) && (e = kt.getLocalTransform(e)), i && (e = It([], e)), ot([], t, e)
    }

    function Eo(t, e, i, n) {
        if (t && e) {
            var r, a = (r = {}, t.traverse(function(t) {
                !t.isGroup && t.anid && (r[t.anid] = t)
            }), r);
            e.traverse(function(t) {
                if (!t.isGroup && t.anid) {
                    var e = a[t.anid];
                    if (e) {
                        var n = o(t);
                        t.attr(o(e)), Po(t, n, i, t.dataIndex)
                    }
                }
            })
        }

        function o(t) {
            var e = {
                position: Q(t.position),
                rotation: t.rotation
            };
            return t.shape && (e.shape = v({}, t.shape)), e
        }
    }

    function No(t, e, i) {
        var n = (e = v({
            rectHover: !0
        }, e)).style = {
            strokeNoScale: !0
        };
        if (i = i || {
                x: -1,
                y: -1,
                width: 2,
                height: 2
            }, t) return 0 === t.indexOf("image://") ? (n.image = t.slice(8), m(n, i), new qi(e)) : io(t.replace("path://", ""), e, i, "center")
    }
    var Ro = (Object.freeze || Object)({
            extendShape: eo,
            extendPath: function(t, e) {
                return function(t, e) {
                    return ca.extend(Ia(t, e))
                }(t, e)
            },
            makePath: io,
            makeImage: no,
            mergePath: ao,
            resizePath: oo,
            subPixelOptimizeLine: so,
            subPixelOptimizeRect: function(t) {
                var e = t.shape,
                    i = t.style.lineWidth,
                    n = e.x,
                    r = e.y,
                    a = e.width,
                    o = e.height;
                return e.x = lo(e.x, i, !0), e.y = lo(e.y, i, !0), e.width = Math.max(lo(n + a, i, !1) - e.x, 0 === a ? 0 : 1), e.height = Math.max(lo(r + o, i, !1) - e.y, 0 === o ? 0 : 1), t
            },
            subPixelOptimize: lo,
            setHoverStyle: bo,
            setLabelStyle: Mo,
            setTextStyle: So,
            setText: function(t, e, i) {
                var n, r = {
                    isRectText: !0
                };
                !1 === i ? n = !0 : r.autoColor = i, To(t, e, r, n), t.host && t.host.dirty && t.host.dirty(!1)
            },
            getFont: Do,
            updateProps: Po,
            initProps: Lo,
            getTransform: function(t, e) {
                for (var i = _t([]); t && t !== e;) bt(i, t.getLocalTransform(), i), t = t.parent;
                return i
            },
            applyTransform: Oo,
            transformDirection: function(t, e, i) {
                var n = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
                    r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
                    a = ["left" === t ? -n : "right" === t ? n : 0, "top" === t ? -r : "bottom" === t ? r : 0];
                return a = Oo(a, e, i), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
            },
            groupTransition: Eo,
            clipPointsByRect: function(t, e) {
                return T(t, function(t) {
                    var i = t[0];
                    i = Qa(i, e.x), i = Ja(i, e.x + e.width);
                    var n = t[1];
                    return n = Qa(n, e.y), [i, n = Ja(n, e.y + e.height)]
                })
            },
            clipRectByRect: function(t, e) {
                var i = Qa(t.x, e.x),
                    n = Ja(t.x + t.width, e.x + e.width),
                    r = Qa(t.y, e.y),
                    a = Ja(t.y + t.height, e.y + e.height);
                if (n >= i && a >= r) return {
                    x: i,
                    y: r,
                    width: n - i,
                    height: a - r
                }
            },
            createIcon: No,
            Group: Ae,
            Image: qi,
            Text: Ca,
            Circle: Aa,
            Sector: Pa,
            Ring: La,
            Polygon: Ba,
            Polyline: za,
            Rect: Fa,
            Line: Va,
            BezierCurve: Ga,
            Arc: qa,
            IncrementalDisplayable: ja,
            CompoundPath: Xa,
            LinearGradient: Ya,
            RadialGradient: Za,
            BoundingRect: Ce
        }),
        Bo = ["textStyle", "color"],
        zo = {
            getTextColor: function(t) {
                var e = this.ecModel;
                return this.getShallow("color") || (!t && e ? e.get(Bo) : null)
            },
            getFont: function() {
                return Do({
                    fontStyle: this.getShallow("fontStyle"),
                    fontWeight: this.getShallow("fontWeight"),
                    fontSize: this.getShallow("fontSize"),
                    fontFamily: this.getShallow("fontFamily")
                }, this.ecModel)
            },
            getTextRect: function(t) {
                return ci(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("rich"), this.getShallow("truncateText"))
            }
        },
        Fo = Zn([
            ["fill", "color"],
            ["stroke", "borderColor"],
            ["lineWidth", "borderWidth"],
            ["opacity"],
            ["shadowBlur"],
            ["shadowOffsetX"],
            ["shadowOffsetY"],
            ["shadowColor"],
            ["textPosition"],
            ["textAlign"]
        ]),
        Vo = {
            getItemStyle: function(t, e) {
                var i = Fo(this, t, e),
                    n = this.getBorderLineDash();
                return n && (i.lineDash = n), i
            },
            getBorderLineDash: function() {
                var t = this.get("borderType");
                return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1]
            }
        },
        Ho = b,
        Wo = En();

    function Go(t, e, i) {
        this.parentModel = e, this.ecModel = i, this.option = t
    }

    function qo(t, e, i) {
        for (var n = 0; n < e.length && (!e[n] || null != (t = t && "object" == typeof t ? t[e[n]] : null)); n++);
        return null == t && i && (t = i.get(e)), t
    }

    function Xo(t, e) {
        var i = Wo(t).getParent;
        return i ? i.call(t, e) : t.parentModel
    }
    Go.prototype = {
        constructor: Go,
        init: null,
        mergeOption: function(t) {
            g(this.option, t, !0)
        },
        get: function(t, e) {
            return null == t ? this.option : qo(this.option, this.parsePath(t), !e && Xo(this, t))
        },
        getShallow: function(t, e) {
            var i = this.option,
                n = null == i ? i : i[t],
                r = !e && Xo(this, t);
            return null == n && r && (n = r.getShallow(t)), n
        },
        getModel: function(t, e) {
            var i;
            return new Go(null == t ? this.option : qo(this.option, t = this.parsePath(t)), e = e || (i = Xo(this, t)) && i.getModel(t), this.ecModel)
        },
        isEmpty: function() {
            return null == this.option
        },
        restoreData: function() {},
        clone: function() {
            return new(0, this.constructor)(p(this.option))
        },
        setReadOnly: function(t) {},
        parsePath: function(t) {
            return "string" == typeof t && (t = t.split(".")), t
        },
        customizeGetParent: function(t) {
            Wo(this).getParent = t
        },
        isAnimationEnabled: function() {
            if (!n.node) {
                if (null != this.option.animation) return !!this.option.animation;
                if (this.parentModel) return this.parentModel.isAnimationEnabled()
            }
        }
    }, Wn(Go), qn(Go), Ho(Go, Kn), Ho(Go, Qn), Ho(Go, zo), Ho(Go, Vo);
    var Uo = 0;

    function Yo(t) {
        return [t || "", Uo++, Math.random().toFixed(5)].join("_")
    }
    var Zo = 1e-4;

    function jo(t, e, i, n) {
        var r = e[1] - e[0],
            a = i[1] - i[0];
        if (0 === r) return 0 === a ? i[0] : (i[0] + i[1]) / 2;
        if (n)
            if (r > 0) {
                if (t <= e[0]) return i[0];
                if (t >= e[1]) return i[1]
            } else {
                if (t >= e[0]) return i[0];
                if (t <= e[1]) return i[1]
            } else {
            if (t === e[0]) return i[0];
            if (t === e[1]) return i[1]
        }
        return (t - e[0]) / r * a + i[0]
    }

    function Ko(t, e) {
        switch (t) {
            case "center":
            case "middle":
                t = "50%";
                break;
            case "left":
            case "top":
                t = "0%";
                break;
            case "right":
            case "bottom":
                t = "100%"
        }
        return "string" == typeof t ? (i = t, i.replace(/^\s+/, "").replace(/\s+$/, "")).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t;
        var i
    }

    function $o(t, e, i) {
        return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), i ? t : +t
    }

    function Qo(t) {
        var e = t.toString(),
            i = e.indexOf("e");
        if (i > 0) {
            var n = +e.slice(i + 1);
            return n < 0 ? -n : 0
        }
        var r = e.indexOf(".");
        return r < 0 ? 0 : e.length - 1 - r
    }

    function Jo(t) {
        var e = 2 * Math.PI;
        return (t % e + e) % e
    }

    function ts(t) {
        return t > -Zo && t < Zo
    }
    var es = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;

    function is(t) {
        if (t instanceof Date) return t;
        if ("string" == typeof t) {
            var e = es.exec(t);
            if (!e) return new Date(NaN);
            if (e[8]) {
                var i = +e[4] || 0;
                return "Z" !== e[8].toUpperCase() && (i -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, i, +(e[5] || 0), +e[6] || 0, +e[7] || 0))
            }
            return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0)
        }
        return null == t ? new Date(NaN) : new Date(Math.round(t))
    }

    function ns(t) {
        return Math.floor(Math.log(t) / Math.LN10)
    }

    function rs(t, e) {
        var i = ns(t),
            n = Math.pow(10, i),
            r = t / n;
        return t = (e ? r < 1.5 ? 1 : r < 2.5 ? 2 : r < 4 ? 3 : r < 7 ? 5 : 10 : r < 1 ? 1 : r < 2 ? 2 : r < 3 ? 3 : r < 5 ? 5 : 10) * n, i >= -20 ? +t.toFixed(i < 0 ? -i : 0) : t
    }

    function as(t) {
        return isNaN(t) ? "-" : (t = (t + "").split("."))[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "")
    }
    var os = H,
        ss = /([&<>"'])/g,
        ls = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

    function hs(t) {
        return null == t ? "" : (t + "").replace(ss, function(t, e) {
            return ls[e]
        })
    }
    var us = ["a", "b", "c", "d", "e", "f", "g"],
        cs = function(t, e) {
            return "{" + t + (null == e ? "" : e) + "}"
        };

    function ds(t, e) {
        var i = (t = P(t) ? {
                color: t,
                extraCssText: e
            } : t || {}).color,
            n = t.type;
        e = t.extraCssText;
        return i ? "subItem" === n ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + hs(i) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + hs(i) + ";" + (e || "") + '"></span>' : ""
    }

    function fs(t, e) {
        return "0000".substr(0, e - (t += "").length) + t
    }

    function ps(t, e, i) {
        "week" !== t && "month" !== t && "quarter" !== t && "half-year" !== t && "year" !== t || (t = "MM-dd\nyyyy");
        var n = is(e),
            r = i ? "UTC" : "",
            a = n["get" + r + "FullYear"](),
            o = n["get" + r + "Month"]() + 1,
            s = n["get" + r + "Date"](),
            l = n["get" + r + "Hours"](),
            h = n["get" + r + "Minutes"](),
            u = n["get" + r + "Seconds"](),
            c = n["get" + r + "Milliseconds"]();
        return t = t.replace("MM", fs(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", fs(s, 2)).replace("d", s).replace("hh", fs(l, 2)).replace("h", l).replace("mm", fs(h, 2)).replace("m", h).replace("ss", fs(u, 2)).replace("s", u).replace("SSS", fs(c, 3))
    }
    var gs = pi,
        vs = S,
        ms = ["left", "right", "top", "bottom", "width", "height"],
        ys = [
            ["width", "left", "right"],
            ["height", "top", "bottom"]
        ];

    function xs(t, e, i, n, r) {
        var a = 0,
            o = 0;
        null == n && (n = 1 / 0), null == r && (r = 1 / 0);
        var s = 0;
        e.eachChild(function(l, h) {
            var u, c, d = l.position,
                f = l.getBoundingRect(),
                p = e.childAt(h + 1),
                g = p && p.getBoundingRect();
            if ("horizontal" === t) {
                var v = f.width + (g ? -g.x + f.x : 0);
                (u = a + v) > n || l.newline ? (a = 0, u = v, o += s + i, s = f.height) : s = Math.max(s, f.height)
            } else {
                var m = f.height + (g ? -g.y + f.y : 0);
                (c = o + m) > r || l.newline ? (a += s + i, o = 0, c = m, s = f.width) : s = Math.max(s, f.width)
            }
            l.newline || (d[0] = a, d[1] = o, "horizontal" === t ? a = u + i : o = c + i)
        })
    }
    A(xs, "vertical"), A(xs, "horizontal");

    function _s(t, e, i) {
        !L(i) && (i = {});
        var n = i.ignoreSize;
        !D(n) && (n = [n, n]);
        var r = o(ys[0], 0),
            a = o(ys[1], 1);

        function o(i, r) {
            var a = {},
                o = 0,
                h = {},
                u = 0;
            if (vs(i, function(e) {
                    h[e] = t[e]
                }), vs(i, function(t) {
                    s(e, t) && (a[t] = h[t] = e[t]), l(a, t) && o++, l(h, t) && u++
                }), n[r]) return l(e, i[1]) ? h[i[2]] = null : l(e, i[2]) && (h[i[1]] = null), h;
            if (2 !== u && o) {
                if (o >= 2) return a;
                for (var c = 0; c < i.length; c++) {
                    var d = i[c];
                    if (!s(a, d) && s(t, d)) {
                        a[d] = t[d];
                        break
                    }
                }
                return a
            }
            return h
        }

        function s(t, e) {
            return t.hasOwnProperty(e)
        }

        function l(t, e) {
            return null != t[e] && "auto" !== t[e]
        }

        function h(t, e, i) {
            vs(t, function(t) {
                e[t] = i[t]
            })
        }
        h(ys[0], t, r), h(ys[1], t, a)
    }

    function ws(t) {
        return function(t, e) {
            return e && t && vs(ms, function(i) {
                e.hasOwnProperty(i) && (t[i] = e[i])
            }), t
        }({}, t)
    }
    var bs, Ms, Ss = En(),
        Ts = Go.extend({
            type: "component",
            id: "",
            name: "",
            mainType: "",
            subType: "",
            componentIndex: 0,
            defaultOption: null,
            ecModel: null,
            dependentModels: [],
            uid: null,
            layoutMode: null,
            $constructor: function(t, e, i, n) {
                Go.call(this, t, e, i, n), this.uid = Yo("ec_cpt_model")
            },
            init: function(t, e, i, n) {
                this.mergeDefaultAndTheme(t, i)
            },
            mergeDefaultAndTheme: function(t, e) {
                var i = this.layoutMode,
                    n = i ? ws(t) : {};
                g(t, e.getTheme().get(this.mainType)), g(t, this.getDefaultOption()), i && _s(t, n, i)
            },
            mergeOption: function(t, e) {
                g(this.option, t, !0);
                var i = this.layoutMode;
                i && _s(this.option, t, i)
            },
            optionUpdated: function(t, e) {},
            getDefaultOption: function() {
                var t = Ss(this);
                if (!t.defaultOption) {
                    for (var e = [], i = this.constructor; i;) {
                        var n = i.prototype.defaultOption;
                        n && e.push(n), i = i.superClass
                    }
                    for (var r = {}, a = e.length - 1; a >= 0; a--) r = g(r, e[a], !0);
                    t.defaultOption = r
                }
                return t.defaultOption
            },
            getReferringComponents: function(t) {
                return this.ecModel.queryComponents({
                    mainType: t,
                    index: this.get(t + "Index", !0),
                    id: this.get(t + "Id", !0)
                })
            }
        });
    Yn(Ts, {
            registerWhenExtend: !0
        }), Ms = {}, (bs = Ts).registerSubTypeDefaulter = function(t, e) {
            t = Hn(t), Ms[t.main] = e
        }, bs.determineSubType = function(t, e) {
            var i = e.type;
            if (!i) {
                var n = Hn(t).main;
                bs.hasSubTypes(t) && Ms[n] && (i = Ms[n](e))
            }
            return i
        },
        function(t, e) {
            function i(t, e) {
                return t[e] || (t[e] = {
                    predecessor: [],
                    successor: []
                }), t[e]
            }
            t.topologicalTravel = function(t, n, r, a) {
                if (t.length) {
                    var o = function(t) {
                            var n = {},
                                r = [];
                            return S(t, function(a) {
                                var o = i(n, a),
                                    s = function(t, e) {
                                        var i = [];
                                        return S(t, function(t) {
                                            _(e, t) >= 0 && i.push(t)
                                        }), i
                                    }(o.originalDeps = e(a), t);
                                o.entryCount = s.length, 0 === o.entryCount && r.push(a), S(s, function(t) {
                                    _(o.predecessor, t) < 0 && o.predecessor.push(t);
                                    var e = i(n, t);
                                    _(e.successor, t) < 0 && e.successor.push(a)
                                })
                            }), {
                                graph: n,
                                noEntryList: r
                            }
                        }(n),
                        s = o.graph,
                        l = o.noEntryList,
                        h = {};
                    for (S(t, function(t) {
                            h[t] = !0
                        }); l.length;) {
                        var u = l.pop(),
                            c = s[u],
                            d = !!h[u];
                        d && (r.call(a, u, c.originalDeps.slice()), delete h[u]), S(c.successor, d ? p : f)
                    }
                    S(h, function() {
                        throw new Error("Circle dependency may exists")
                    })
                }

                function f(t) {
                    s[t].entryCount--, 0 === s[t].entryCount && l.push(t)
                }

                function p(t) {
                    h[t] = !0, f(t)
                }
            }
        }(Ts, function(t) {
            var e = [];
            S(Ts.getClassesByMainType(t), function(t) {
                e = e.concat(t.prototype.dependencies || [])
            }), e = T(e, function(t) {
                return Hn(t).main
            }), "dataset" !== t && _(e, "dataset") <= 0 && e.unshift("dataset");
            return e
        }), b(Ts, {
            getBoxLayoutParams: function() {
                return {
                    left: this.get("left"),
                    top: this.get("top"),
                    right: this.get("right"),
                    bottom: this.get("bottom"),
                    width: this.get("width"),
                    height: this.get("height")
                }
            }
        });
    var Is = "";
    "undefined" != typeof navigator && (Is = navigator.platform || "");
    var Cs = {
            color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
            textStyle: {
                fontFamily: Is.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal"
            },
            blendMode: null,
            animation: "auto",
            animationDuration: 1e3,
            animationDurationUpdate: 300,
            animationEasing: "exponentialOut",
            animationEasingUpdate: "cubicOut",
            animationThreshold: 2e3,
            progressiveThreshold: 3e3,
            progressive: 400,
            hoverLayerThreshold: 3e3,
            useUTC: !1
        },
        As = En();
    var Ds = {
        clearColorPalette: function() {
            As(this).colorIdx = 0, As(this).colorNameMap = {}
        },
        getColorFromPalette: function(t, e, i) {
            var n = As(e = e || this),
                r = n.colorIdx || 0,
                a = n.colorNameMap = n.colorNameMap || {};
            if (a.hasOwnProperty(t)) return a[t];
            var o = In(this.get("color", !0)),
                s = this.get("colorLayer", !0),
                l = null != i && s ? function(t, e) {
                    for (var i = t.length, n = 0; n < i; n++)
                        if (t[n].length > e) return t[n];
                    return t[i - 1]
                }(s, i) : o;
            if ((l = l || o) && l.length) {
                var h = l[r];
                return t && (a[t] = h), n.colorIdx = (r + 1) % l.length, h
            }
        }
    };

    function ks(t) {
        var e = t.get("coordinateSystem"),
            i = {
                coordSysName: e,
                coordSysDims: [],
                axisMap: Z(),
                categoryAxisMap: Z()
            },
            n = Ps[e];
        if (n) return n(t, i, i.axisMap, i.categoryAxisMap), i
    }
    var Ps = {
        cartesian2d: function(t, e, i, n) {
            var r = t.getReferringComponents("xAxis")[0],
                a = t.getReferringComponents("yAxis")[0];
            e.coordSysDims = ["x", "y"], i.set("x", r), i.set("y", a), Ls(r) && (n.set("x", r), e.firstCategoryDimIndex = 0), Ls(a) && (n.set("y", a), e.firstCategoryDimIndex = 1)
        },
        singleAxis: function(t, e, i, n) {
            var r = t.getReferringComponents("singleAxis")[0];
            e.coordSysDims = ["single"], i.set("single", r), Ls(r) && (n.set("single", r), e.firstCategoryDimIndex = 0)
        },
        polar: function(t, e, i, n) {
            var r = t.getReferringComponents("polar")[0],
                a = r.findAxisModel("radiusAxis"),
                o = r.findAxisModel("angleAxis");
            e.coordSysDims = ["radius", "angle"], i.set("radius", a), i.set("angle", o), Ls(a) && (n.set("radius", a), e.firstCategoryDimIndex = 0), Ls(o) && (n.set("angle", o), e.firstCategoryDimIndex = 1)
        },
        geo: function(t, e, i, n) {
            e.coordSysDims = ["lng", "lat"]
        },
        parallel: function(t, e, i, n) {
            var r = t.ecModel,
                a = r.getComponent("parallel", t.get("parallelIndex")),
                o = e.coordSysDims = a.dimensions.slice();
            S(a.parallelAxisIndex, function(t, a) {
                var s = r.getComponent("parallelAxis", t),
                    l = o[a];
                i.set(l, s), Ls(s) && null == e.firstCategoryDimIndex && (n.set(l, s), e.firstCategoryDimIndex = a)
            })
        }
    };

    function Ls(t) {
        return "category" === t.get("type")
    }
    var Os = "original",
        Es = "arrayRows",
        Ns = "objectRows",
        Rs = "keyedColumns",
        Bs = "unknown",
        zs = "typedArray",
        Fs = "column",
        Vs = "row";

    function Hs(t) {
        this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === Rs ? {} : []), this.sourceFormat = t.sourceFormat || Bs, this.seriesLayoutBy = t.seriesLayoutBy || Fs, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && Z(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount
    }
    Hs.seriesDataToSource = function(t) {
        return new Hs({
            data: t,
            sourceFormat: E(t) ? zs : Os,
            fromDataset: !1
        })
    }, qn(Hs);
    var Ws = En();

    function Gs(t) {
        var e = t.option,
            i = e.data,
            n = E(i) ? zs : Os,
            r = !1,
            a = e.seriesLayoutBy,
            o = e.sourceHeader,
            s = e.dimensions,
            l = function(t) {
                var e = t.option;
                if (!e.data) return t.ecModel.getComponent("dataset", e.datasetIndex || 0)
            }(t);
        if (l) {
            var h = l.option;
            i = h.source, n = Ws(l).sourceFormat, r = !0, a = a || h.seriesLayoutBy, null == o && (o = h.sourceHeader), s = s || h.dimensions
        }
        var u = function(t, e, i, n, r) {
                if (!t) return {
                    dimensionsDefine: qs(r)
                };
                var a, o, s, l;
                if (e === Es) "auto" === n || null == n ? Xs(function(t) {
                    null != t && "-" !== t && (P(t) ? null == o && (o = 1) : o = 0)
                }, i, t, 10) : o = n ? 1 : 0, r || 1 !== o || (r = [], Xs(function(t, e) {
                    r[e] = null != t ? t : ""
                }, i, t)), a = r ? r.length : i === Vs ? t.length : t[0] ? t[0].length : null;
                else if (e === Ns) r || (r = function(t) {
                    var e, i = 0;
                    for (; i < t.length && !(e = t[i++]););
                    if (e) {
                        var n = [];
                        return S(e, function(t, e) {
                            n.push(e)
                        }), n
                    }
                }(t), s = !0);
                else if (e === Rs) r || (r = [], s = !0, S(t, function(t, e) {
                    r.push(e)
                }));
                else if (e === Os) {
                    var h = Dn(t[0]);
                    a = D(h) && h.length || 1
                }
                s && S(r, function(t, e) {
                    "name" === (L(t) ? t.name : t) && (l = e)
                });
                return {
                    startIndex: o,
                    dimensionsDefine: qs(r),
                    dimensionsDetectCount: a,
                    potentialNameDimIndex: l
                }
            }(i, n, a, o, s),
            c = e.encode;
        !c && l && (c = function(t, e, i, n, r, a) {
            var o = ks(t),
                s = {},
                l = [],
                h = [],
                u = t.subType,
                c = Z(["pie", "map", "funnel"]),
                d = Z(["line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot"]);
            if (o && null != d.get(u)) {
                var f = t.ecModel,
                    p = Ws(f).datasetMap,
                    g = e.uid + "_" + r,
                    v = p.get(g) || p.set(g, {
                        categoryWayDim: 1,
                        valueWayDim: 0
                    });
                S(o.coordSysDims, function(t) {
                    if (null == o.firstCategoryDimIndex) {
                        var e = v.valueWayDim++;
                        s[t] = e, h.push(e)
                    } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0);
                    else {
                        var e = v.categoryWayDim++;
                        s[t] = e, h.push(e)
                    }
                })
            } else if (null != c.get(u)) {
                for (var m, y = 0; y < 5 && null == m; y++) Ys(i, n, r, a.dimensionsDefine, a.startIndex, y) || (m = y);
                if (null != m) {
                    s.value = m;
                    var x = a.potentialNameDimIndex || Math.max(m - 1, 0);
                    h.push(x), l.push(x)
                }
            }
            return l.length && (s.itemName = l), h.length && (s.seriesName = h), s
        }(t, l, i, n, a, u)), Ws(t).source = new Hs({
            data: i,
            fromDataset: r,
            seriesLayoutBy: a,
            sourceFormat: n,
            dimensionsDefine: u.dimensionsDefine,
            startIndex: u.startIndex,
            dimensionsDetectCount: u.dimensionsDetectCount,
            encodeDefine: c
        })
    }

    function qs(t) {
        if (t) {
            var e = Z();
            return T(t, function(t, i) {
                if (null == (t = v({}, L(t) ? t : {
                        name: t
                    })).name) return t;
                t.name += "", null == t.displayName && (t.displayName = t.name);
                var n = e.get(t.name);
                return n ? t.name += "-" + n.count++ : e.set(t.name, {
                    count: 1
                }), t
            })
        }
    }

    function Xs(t, e, i, n) {
        if (null == n && (n = 1 / 0), e === Vs)
            for (var r = 0; r < i.length && r < n; r++) t(i[r] ? i[r][0] : null, r);
        else {
            var a = i[0] || [];
            for (r = 0; r < a.length && r < n; r++) t(a[r], r)
        }
    }

    function Us(t, e) {
        return Ys(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e)
    }

    function Ys(t, e, i, n, r, a) {
        var o, s;
        if (E(t)) return !1;
        if (n && (s = L(s = n[a]) ? s.name : s), e === Es)
            if (i === Vs) {
                for (var l = t[a], h = 0; h < (l || []).length && h < 5; h++)
                    if (null != (o = f(l[r + h]))) return o
            } else
                for (h = 0; h < t.length && h < 5; h++) {
                    var u = t[r + h];
                    if (u && null != (o = f(u[a]))) return o
                } else if (e === Ns) {
                    if (!s) return;
                    for (h = 0; h < t.length && h < 5; h++) {
                        if ((c = t[h]) && null != (o = f(c[s]))) return o
                    }
                } else if (e === Rs) {
            if (!s) return;
            if (!(l = t[s]) || E(l)) return !1;
            for (h = 0; h < l.length && h < 5; h++)
                if (null != (o = f(l[h]))) return o
        } else if (e === Os)
            for (h = 0; h < t.length && h < 5; h++) {
                var c, d = Dn(c = t[h]);
                if (!D(d)) return !1;
                if (null != (o = f(d[a]))) return o
            }

        function f(t) {
            return (null == t || !isFinite(t) || "" === t) && (!(!P(t) || "-" === t) || void 0)
        }
        return !1
    }
    var Zs = "\0_ec_inner",
        js = Go.extend({
            init: function(t, e, i, n) {
                i = i || {}, this.option = null, this._theme = new Go(i), this._optionManager = n
            },
            setOption: function(t, e) {
                W(!(Zs in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null)
            },
            resetOption: function(t) {
                var e = !1,
                    i = this._optionManager;
                if (!t || "recreate" === t) {
                    var n = i.mountOption("recreate" === t);
                    this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(n)) : function(t) {
                        t = t, this.option = {}, this.option[Zs] = 1, this._componentsMap = Z({
                            series: []
                        }), this._seriesIndices, this._seriesIndicesMap, e = t, i = this._theme.option, n = e.color && !e.colorLayer, S(i, function(t, i) {
                            "colorLayer" === i && n || Ts.hasClass(i) || ("object" == typeof t ? e[i] = e[i] ? g(e[i], t, !1) : p(t) : null == e[i] && (e[i] = t))
                        }), g(t, Cs, !1), this.mergeOption(t);
                        var e, i, n
                    }.call(this, n), e = !0
                }
                if ("timeline" !== t && "media" !== t || this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                    var r = i.getTimelineOption(this);
                    r && (this.mergeOption(r), e = !0)
                }
                if (!t || "recreate" === t || "media" === t) {
                    var a = i.getMediaOption(this, this._api);
                    a.length && S(a, function(t) {
                        this.mergeOption(t, e = !0)
                    }, this)
                }
                return e
            },
            mergeOption: function(t) {
                var e = this.option,
                    i = this._componentsMap,
                    n = [];
                Ws(this).datasetMap = Z(), S(t, function(t, i) {
                    null != t && (Ts.hasClass(i) ? i && n.push(i) : e[i] = null == e[i] ? p(t) : g(e[i], t, !0))
                }), Ts.topologicalTravel(n, Ts.getAllClassMainTypes(), function(n, r) {
                    var a = In(t[n]),
                        o = kn(i.get(n), a);
                    (function(t) {
                        var e = Z();
                        bn(t, function(t, i) {
                            var n = t.exist;
                            n && e.set(n.id, t)
                        }), bn(t, function(t, i) {
                            var n = t.option;
                            W(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {})
                        }), bn(t, function(t, i) {
                            var n = t.exist,
                                r = t.option,
                                a = t.keyInfo;
                            if (Mn(r)) {
                                if (a.name = null != r.name ? r.name + "" : n ? n.name : Tn + i, n) a.id = n.id;
                                else if (null != r.id) a.id = r.id + "";
                                else {
                                    var o = 0;
                                    do {
                                        a.id = "\0" + a.name + "\0" + o++
                                    } while (e.get(a.id))
                                }
                                e.set(a.id, t)
                            }
                        })
                    })(o), S(o, function(t, e) {
                        var i = t.option;
                        L(i) && (t.keyInfo.mainType = n, t.keyInfo.subType = function(t, e, i) {
                            return e.type ? e.type : i ? i.subType : Ts.determineSubType(t, e)
                        }(n, i, t.exist))
                    });
                    var s = function(t, e) {
                        D(e) || (e = e ? [e] : []);
                        var i = {};
                        return S(e, function(e) {
                            i[e] = (t.get(e) || []).slice()
                        }), i
                    }(i, r);
                    e[n] = [], i.set(n, []), S(o, function(t, r) {
                        var a = t.exist,
                            o = t.option;
                        if (W(L(o) || a, "Empty component definition"), o) {
                            var l = Ts.getClass(n, t.keyInfo.subType, !0);
                            if (a && a instanceof l) a.name = t.keyInfo.name, a.mergeOption(o, this), a.optionUpdated(o, !1);
                            else {
                                var h = v({
                                    dependentModels: s,
                                    componentIndex: r
                                }, t.keyInfo);
                                v(a = new l(o, this, this, h), h), a.init(o, this, this, h), a.optionUpdated(null, !0)
                            }
                        } else a.mergeOption({}, this), a.optionUpdated({}, !1);
                        i.get(n)[r] = a, e[n][r] = a.option
                    }, this), "series" === n && Ks(this, i.get("series"))
                }, this), this._seriesIndicesMap = Z(this._seriesIndices = this._seriesIndices || [])
            },
            getOption: function() {
                var t = p(this.option);
                return S(t, function(e, i) {
                    if (Ts.hasClass(i)) {
                        for (var n = (e = In(e)).length - 1; n >= 0; n--) Ln(e[n]) && e.splice(n, 1);
                        t[i] = e
                    }
                }), delete t[Zs], t
            },
            getTheme: function() {
                return this._theme
            },
            getComponent: function(t, e) {
                var i = this._componentsMap.get(t);
                if (i) return i[e || 0]
            },
            queryComponents: function(t) {
                var e = t.mainType;
                if (!e) return [];
                var i, n = t.index,
                    r = t.id,
                    a = t.name,
                    o = this._componentsMap.get(e);
                if (!o || !o.length) return [];
                if (null != n) D(n) || (n = [n]), i = I(T(n, function(t) {
                    return o[t]
                }), function(t) {
                    return !!t
                });
                else if (null != r) {
                    var s = D(r);
                    i = I(o, function(t) {
                        return s && _(r, t.id) >= 0 || !s && t.id === r
                    })
                } else if (null != a) {
                    var l = D(a);
                    i = I(o, function(t) {
                        return l && _(a, t.name) >= 0 || !l && t.name === a
                    })
                } else i = o.slice();
                return $s(i, t)
            },
            findComponents: function(t) {
                var e, i, n, r, a, o = t.query,
                    s = t.mainType,
                    l = (i = s + "Index", n = s + "Id", r = s + "Name", !(e = o) || null == e[i] && null == e[n] && null == e[r] ? null : {
                        mainType: s,
                        index: e[i],
                        id: e[n],
                        name: e[r]
                    }),
                    h = l ? this.queryComponents(l) : this._componentsMap.get(s);
                return a = $s(h, t), t.filter ? I(a, t.filter) : a
            },
            eachComponent: function(t, e, i) {
                var n = this._componentsMap;
                if ("function" == typeof t) i = e, e = t, n.each(function(t, n) {
                    S(t, function(t, r) {
                        e.call(i, n, t, r)
                    })
                });
                else if (P(t)) S(n.get(t), e, i);
                else if (L(t)) {
                    S(this.findComponents(t), e, i)
                }
            },
            getSeriesByName: function(t) {
                return I(this._componentsMap.get("series"), function(e) {
                    return e.name === t
                })
            },
            getSeriesByIndex: function(t) {
                return this._componentsMap.get("series")[t]
            },
            getSeriesByType: function(t) {
                return I(this._componentsMap.get("series"), function(e) {
                    return e.subType === t
                })
            },
            getSeries: function() {
                return this._componentsMap.get("series").slice()
            },
            getSeriesCount: function() {
                return this._componentsMap.get("series").length
            },
            eachSeries: function(t, e) {
                S(this._seriesIndices, function(i) {
                    var n = this._componentsMap.get("series")[i];
                    t.call(e, n, i)
                }, this)
            },
            eachRawSeries: function(t, e) {
                S(this._componentsMap.get("series"), t, e)
            },
            eachSeriesByType: function(t, e, i) {
                S(this._seriesIndices, function(n) {
                    var r = this._componentsMap.get("series")[n];
                    r.subType === t && e.call(i, r, n)
                }, this)
            },
            eachRawSeriesByType: function(t, e, i) {
                return S(this.getSeriesByType(t), e, i)
            },
            isSeriesFiltered: function(t) {
                return null == this._seriesIndicesMap.get(t.componentIndex)
            },
            getCurrentSeriesIndices: function() {
                return (this._seriesIndices || []).slice()
            },
            filterSeries: function(t, e) {
                Ks(this, I(this._componentsMap.get("series"), t, e))
            },
            restoreData: function(t) {
                var e = this._componentsMap;
                Ks(this, e.get("series"));
                var i = [];
                e.each(function(t, e) {
                    i.push(e)
                }), Ts.topologicalTravel(i, Ts.getAllClassMainTypes(), function(i, n) {
                    S(e.get(i), function(e) {
                        ("series" !== i || ! function(t, e) {
                            if (e) {
                                var i = e.seiresIndex,
                                    n = e.seriesId,
                                    r = e.seriesName;
                                return null != i && t.componentIndex !== i || null != n && t.id !== n || null != r && t.name !== r
                            }
                        }(e, t)) && e.restoreData()
                    })
                })
            }
        });

    function Ks(t, e) {
        t._seriesIndicesMap = Z(t._seriesIndices = T(e, function(t) {
            return t.componentIndex
        }) || [])
    }

    function $s(t, e) {
        return e.hasOwnProperty("subType") ? I(t, function(t) {
            return t.subType === e.subType
        }) : t
    }
    b(js, Ds);
    var Qs = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"];

    function Js(t) {
        S(Qs, function(e) {
            this[e] = C(t[e], t)
        }, this)
    }
    var tl = {};

    function el() {
        this._coordinateSystems = []
    }
    el.prototype = {
        constructor: el,
        create: function(t, e) {
            var i = [];
            S(tl, function(n, r) {
                var a = n.create(t, e);
                i = i.concat(a || [])
            }), this._coordinateSystems = i
        },
        update: function(t, e) {
            S(this._coordinateSystems, function(i) {
                i.update && i.update(t, e)
            })
        },
        getCoordinateSystems: function() {
            return this._coordinateSystems.slice()
        }
    }, el.register = function(t, e) {
        tl[t] = e
    }, el.get = function(t) {
        return tl[t]
    };
    var il = S,
        nl = p,
        rl = T,
        al = g,
        ol = /^(min|max)?(.+)$/;

    function sl(t) {
        this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
    }

    function ll(t, e, i) {
        var n = {
                width: e,
                height: i,
                aspectratio: e / i
            },
            r = !0;
        return S(t, function(t, e) {
            var i = e.match(ol);
            if (i && i[1] && i[2]) {
                var a = i[1],
                    o = i[2].toLowerCase();
                (function(t, e, i) {
                    return "min" === i ? t >= e : "max" === i ? t <= e : t === e
                })(n[o], t, a) || (r = !1)
            }
        }), r
    }
    sl.prototype = {
        constructor: sl,
        setOption: function(t, e) {
            t && S(In(t.series), function(t) {
                t && t.data && E(t.data) && X(t.data)
            }), t = nl(t, !0);
            var i, n, r = this._optionBackup,
                a = function(t, e, i) {
                    var n, r, a = [],
                        o = [],
                        s = t.timeline;
                    t.baseOption && (r = t.baseOption);
                    (s || t.options) && (r = r || {}, a = (t.options || []).slice());
                    if (t.media) {
                        r = r || {};
                        var l = t.media;
                        il(l, function(t) {
                            t && t.option && (t.query ? o.push(t) : n || (n = t))
                        })
                    }
                    r || (r = t);
                    r.timeline || (r.timeline = s);
                    return il([r].concat(a).concat(T(o, function(t) {
                        return t.option
                    })), function(t) {
                        il(e, function(e) {
                            e(t, i)
                        })
                    }), {
                        baseOption: r,
                        timelineOptions: a,
                        mediaDefault: n,
                        mediaList: o
                    }
                }.call(this, t, e, !r);
            this._newBaseOption = a.baseOption, r ? (i = r.baseOption, n = a.baseOption, il(n = n || {}, function(t, e) {
                if (null != t) {
                    var n = i[e];
                    if (Ts.hasClass(e)) {
                        t = In(t);
                        var r = kn(n = In(n), t);
                        i[e] = rl(r, function(t) {
                            return t.option && t.exist ? al(t.exist, t.option, !0) : t.exist || t.option
                        })
                    } else i[e] = al(n, t, !0)
                }
            }), a.timelineOptions.length && (r.timelineOptions = a.timelineOptions), a.mediaList.length && (r.mediaList = a.mediaList), a.mediaDefault && (r.mediaDefault = a.mediaDefault)) : this._optionBackup = a
        },
        mountOption: function(t) {
            var e = this._optionBackup;
            return this._timelineOptions = rl(e.timelineOptions, nl), this._mediaList = rl(e.mediaList, nl), this._mediaDefault = nl(e.mediaDefault), this._currentMediaIndices = [], nl(t ? e.baseOption : this._newBaseOption)
        },
        getTimelineOption: function(t) {
            var e, i = this._timelineOptions;
            if (i.length) {
                var n = t.getComponent("timeline");
                n && (e = nl(i[n.getCurrentIndex()], !0))
            }
            return e
        },
        getMediaOption: function(t) {
            var e, i, n = this._api.getWidth(),
                r = this._api.getHeight(),
                a = this._mediaList,
                o = this._mediaDefault,
                s = [],
                l = [];
            if (!a.length && !o) return l;
            for (var h = 0, u = a.length; h < u; h++) ll(a[h].query, n, r) && s.push(h);
            return !s.length && o && (s = [-1]), s.length && (e = s, i = this._currentMediaIndices, e.join(",") !== i.join(",")) && (l = rl(s, function(t) {
                return nl(-1 === t ? o.option : a[t].option)
            })), this._currentMediaIndices = s, l
        }
    };
    var hl = S,
        ul = L,
        cl = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];

    function dl(t) {
        var e = t && t.itemStyle;
        if (e)
            for (var i = 0, n = cl.length; i < n; i++) {
                var r = cl[i],
                    a = e.normal,
                    o = e.emphasis;
                a && a[r] && (t[r] = t[r] || {}, t[r].normal ? g(t[r].normal, a[r]) : t[r].normal = a[r], a[r] = null), o && o[r] && (t[r] = t[r] || {}, t[r].emphasis ? g(t[r].emphasis, o[r]) : t[r].emphasis = o[r], o[r] = null)
            }
    }

    function fl(t, e, i) {
        if (t && t[e] && (t[e].normal || t[e].emphasis)) {
            var n = t[e].normal,
                r = t[e].emphasis;
            n && (i ? (t[e].normal = t[e].emphasis = null, m(t[e], n)) : t[e] = n), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r)
        }
    }

    function pl(t) {
        fl(t, "itemStyle"), fl(t, "lineStyle"), fl(t, "areaStyle"), fl(t, "label"), fl(t, "labelLine"), fl(t, "upperLabel"), fl(t, "edgeLabel")
    }

    function gl(t, e) {
        var i = ul(t) && t[e],
            n = ul(i) && i.textStyle;
        if (n)
            for (var r = 0, a = An.length; r < a; r++) {
                e = An[r];
                n.hasOwnProperty(e) && (i[e] = n[e])
            }
    }

    function vl(t) {
        t && (pl(t), gl(t, "label"), t.emphasis && gl(t.emphasis, "label"))
    }

    function ml(t) {
        return D(t) ? t : t ? [t] : []
    }

    function yl(t) {
        return (D(t) ? t[0] : t) || {}
    }
    var xl = function(t, e) {
        hl(ml(t.series), function(t) {
            ul(t) && function(t) {
                if (ul(t)) {
                    dl(t), pl(t), gl(t, "label"), gl(t, "upperLabel"), gl(t, "edgeLabel"), t.emphasis && (gl(t.emphasis, "label"), gl(t.emphasis, "upperLabel"), gl(t.emphasis, "edgeLabel")), (i = t.markPoint) && (dl(i), vl(i)), (n = t.markLine) && (dl(n), vl(n));
                    var e = t.markArea;
                    e && vl(e);
                    var i, n, r = t.data;
                    if ("graph" === t.type) {
                        r = r || t.nodes;
                        var a = t.links || t.edges;
                        if (a && !E(a))
                            for (var o = 0; o < a.length; o++) vl(a[o]);
                        S(t.categories, function(t) {
                            pl(t)
                        })
                    }
                    if (r && !E(r))
                        for (o = 0; o < r.length; o++) vl(r[o]);
                    if ((i = t.markPoint) && i.data) {
                        var s = i.data;
                        for (o = 0; o < s.length; o++) vl(s[o])
                    }
                    if ((n = t.markLine) && n.data) {
                        var l = n.data;
                        for (o = 0; o < l.length; o++) D(l[o]) ? (vl(l[o][0]), vl(l[o][1])) : vl(l[o])
                    }
                    "gauge" === t.type ? (gl(t, "axisLabel"), gl(t, "title"), gl(t, "detail")) : "treemap" === t.type ? (fl(t.breadcrumb, "itemStyle"), S(t.levels, function(t) {
                        pl(t)
                    })) : "tree" === t.type && pl(t.leaves)
                }
            }(t)
        });
        var i = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
        e && i.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), hl(i, function(e) {
            hl(ml(t[e]), function(t) {
                t && (gl(t, "axisLabel"), gl(t.axisPointer, "label"))
            })
        }), hl(ml(t.parallel), function(t) {
            var e = t && t.parallelAxisDefault;
            gl(e, "axisLabel"), gl(e && e.axisPointer, "label")
        }), hl(ml(t.calendar), function(t) {
            fl(t, "itemStyle"), gl(t, "dayLabel"), gl(t, "monthLabel"), gl(t, "yearLabel")
        }), hl(ml(t.radar), function(t) {
            gl(t, "name")
        }), hl(ml(t.geo), function(t) {
            ul(t) && (vl(t), hl(ml(t.regions), function(t) {
                vl(t)
            }))
        }), hl(ml(t.timeline), function(t) {
            vl(t), fl(t, "label"), fl(t, "itemStyle"), fl(t, "controlStyle", !0);
            var e = t.data;
            D(e) && S(e, function(t) {
                L(t) && (fl(t, "label"), fl(t, "itemStyle"))
            })
        }), hl(ml(t.toolbox), function(t) {
            fl(t, "iconStyle"), hl(t.feature, function(t) {
                fl(t, "iconStyle")
            })
        }), gl(yl(t.axisPointer), "label"), gl(yl(t.tooltip).axisPointer, "label")
    };

    function _l(t) {
        S(wl, function(e) {
            e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]])
        })
    }
    var wl = [
            ["x", "left"],
            ["y", "top"],
            ["x2", "right"],
            ["y2", "bottom"]
        ],
        bl = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
        Ml = function(t, e) {
            xl(t, e), t.series = In(t.series), S(t.series, function(t) {
                if (L(t)) {
                    var e = t.type;
                    if ("pie" !== e && "gauge" !== e || null != t.clockWise && (t.clockwise = t.clockWise), "gauge" === e) {
                        var i = function(t, e) {
                            e = e.split(",");
                            for (var i = t, n = 0; n < e.length && null != (i = i && i[e[n]]); n++);
                            return i
                        }(t, "pointer.color");
                        null != i && function(t, e, i, n) {
                            e = e.split(",");
                            for (var r, a = t, o = 0; o < e.length - 1; o++) null == a[r = e[o]] && (a[r] = {}), a = a[r];
                            (n || null == a[e[o]]) && (a[e[o]] = i)
                        }(t, "itemStyle.normal.color", i)
                    }
                    _l(t)
                }
            }), t.dataRange && (t.visualMap = t.dataRange), S(bl, function(e) {
                var i = t[e];
                i && (D(i) || (i = [i]), S(i, function(t) {
                    _l(t)
                }))
            })
        };

    function Sl(t) {
        S(t, function(e, i) {
            var n = [],
                r = [NaN, NaN],
                a = [e.stackResultDimension, e.stackedOverDimension],
                o = e.data,
                s = e.isStackedByIndex,
                l = o.map(a, function(a, l, h) {
                    var u, c, d = o.get(e.stackedDimension, h);
                    if (isNaN(d)) return r;
                    s ? c = o.getRawIndex(h) : u = o.get(e.stackedByDimension, h);
                    for (var f = NaN, p = i - 1; p >= 0; p--) {
                        var g = t[p];
                        if (s || (c = g.data.rawIndexOf(g.stackedByDimension, u)), c >= 0) {
                            var v = g.data.getByRawIndex(g.stackResultDimension, c);
                            if (d >= 0 && v > 0 || d <= 0 && v < 0) {
                                d += v, f = v;
                                break
                            }
                        }
                    }
                    return n[0] = d, n[1] = f, n
                });
            o.hostModel.setData(l), e.data = l
        })
    }

    function Tl(t, e) {
        Hs.isInstance(t) || (t = Hs.seriesDataToSource(t)), this._source = t;
        var i = this._data = t.data,
            n = t.sourceFormat;
        n === zs && (this._offset = 0, this._dimSize = e, this._data = i), v(this, Cl[n === Es ? n + "_" + t.seriesLayoutBy : n])
    }
    var Il = Tl.prototype;
    Il.pure = !1, Il.persistent = !0, Il.getSource = function() {
        return this._source
    };
    var Cl = {
        arrayRows_column: {
            pure: !0,
            count: function() {
                return Math.max(0, this._data.length - this._source.startIndex)
            },
            getItem: function(t) {
                return this._data[t + this._source.startIndex]
            },
            appendData: kl
        },
        arrayRows_row: {
            pure: !0,
            count: function() {
                var t = this._data[0];
                return t ? Math.max(0, t.length - this._source.startIndex) : 0
            },
            getItem: function(t) {
                t += this._source.startIndex;
                for (var e = [], i = this._data, n = 0; n < i.length; n++) {
                    var r = i[n];
                    e.push(r ? r[t] : null)
                }
                return e
            },
            appendData: function() {
                throw new Error('Do not support appendData when set seriesLayoutBy: "row".')
            }
        },
        objectRows: {
            pure: !0,
            count: Al,
            getItem: Dl,
            appendData: kl
        },
        keyedColumns: {
            pure: !0,
            count: function() {
                var t = this._source.dimensionsDefine[0].name,
                    e = this._data[t];
                return e ? e.length : 0
            },
            getItem: function(t) {
                for (var e = [], i = this._source.dimensionsDefine, n = 0; n < i.length; n++) {
                    var r = this._data[i[n].name];
                    e.push(r ? r[t] : null)
                }
                return e
            },
            appendData: function(t) {
                var e = this._data;
                S(t, function(t, i) {
                    for (var n = e[i] || (e[i] = []), r = 0; r < (t || []).length; r++) n.push(t[r])
                })
            }
        },
        original: {
            count: Al,
            getItem: Dl,
            appendData: kl
        },
        typedArray: {
            persistent: !1,
            pure: !0,
            count: function() {
                return this._data ? this._data.length / this._dimSize : 0
            },
            getItem: function(t, e) {
                t -= this._offset, e = e || [];
                for (var i = this._dimSize * t, n = 0; n < this._dimSize; n++) e[n] = this._data[i + n];
                return e
            },
            appendData: function(t) {
                this._data = t
            },
            clean: function() {
                this._offset += this.count(), this._data = null
            }
        }
    };

    function Al() {
        return this._data.length
    }

    function Dl(t) {
        return this._data[t]
    }

    function kl(t) {
        for (var e = 0; e < t.length; e++) this._data.push(t[e])
    }
    var Pl = {
        arrayRows: Ll,
        objectRows: function(t, e, i, n) {
            return null != i ? t[n] : t
        },
        keyedColumns: Ll,
        original: function(t, e, i, n) {
            var r = Dn(t);
            return null != i && r instanceof Array ? r[i] : r
        },
        typedArray: Ll
    };

    function Ll(t, e, i, n) {
        return null != i ? t[i] : t
    }
    var Ol = {
        arrayRows: El,
        objectRows: function(t, e, i, n) {
            return Nl(t[e], this._dimensionInfos[e])
        },
        keyedColumns: El,
        original: function(t, e, i, n) {
            var r = t && (null == t.value ? t : t.value);
            return !this._rawData.pure && function(t) {
                return Mn(t) && !(t instanceof Array)
            }(t) && (this.hasItemOption = !0), Nl(r instanceof Array ? r[n] : r, this._dimensionInfos[e])
        },
        typedArray: function(t, e, i, n) {
            return t[n]
        }
    };

    function El(t, e, i, n) {
        return Nl(t[n], this._dimensionInfos[e])
    }

    function Nl(t, e) {
        var i = e && e.type;
        if ("ordinal" === i) {
            var n = e && e.ordinalMeta;
            return n ? n.parseAndCollect(t) : t
        }
        return "time" === i && "number" != typeof t && null != t && "-" !== t && (t = +is(t)), null == t || "" === t ? NaN : +t
    }

    function Rl(t, e, i) {
        if (t) {
            var n = t.getRawDataItem(e);
            if (null != n) {
                var r, a, o = t.getProvider().getSource().sourceFormat,
                    s = t.getDimensionInfo(i);
                return s && (r = s.name, a = s.index), Pl[o](n, e, a, r)
            }
        }
    }
    var Bl = /\{@(.+?)\}/g,
        zl = {
            getDataParams: function(t, e) {
                var i = this.getData(e),
                    n = this.getRawValue(t, e),
                    r = i.getRawIndex(t),
                    a = i.getName(t),
                    o = i.getRawDataItem(t),
                    s = i.getItemVisual(t, "color");
                return {
                    componentType: this.mainType,
                    componentSubType: this.subType,
                    seriesType: "series" === this.mainType ? this.subType : null,
                    seriesIndex: this.seriesIndex,
                    seriesId: this.id,
                    seriesName: this.name,
                    name: a,
                    dataIndex: r,
                    data: o,
                    dataType: e,
                    value: n,
                    color: s,
                    marker: ds(s),
                    $vars: ["seriesName", "name", "value"]
                }
            },
            getFormattedLabel: function(t, e, i, n, r) {
                e = e || "normal";
                var a = this.getData(i),
                    o = a.getItemModel(t),
                    s = this.getDataParams(t, i);
                null != n && s.value instanceof Array && (s.value = s.value[n]);
                var l = o.get("normal" === e ? [r || "label", "formatter"] : [e, r || "label", "formatter"]);
                return "function" == typeof l ? (s.status = e, l(s)) : "string" == typeof l ? function(t, e, i) {
                    D(e) || (e = [e]);
                    var n = e.length;
                    if (!n) return "";
                    for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
                        var o = us[a];
                        t = t.replace(cs(o), cs(o, 0))
                    }
                    for (var s = 0; s < n; s++)
                        for (var l = 0; l < r.length; l++) {
                            var h = e[s][r[l]];
                            t = t.replace(cs(us[l], s), i ? hs(h) : h)
                        }
                    return t
                }(l, s).replace(Bl, function(e, i) {
                    var n = i.length;
                    return "[" === i.charAt(0) && "]" === i.charAt(n - 1) && (i = +i.slice(1, n - 1)), Rl(a, t, i)
                }) : void 0
            },
            getRawValue: function(t, e) {
                return Rl(this.getData(e), t)
            },
            formatTooltip: function() {}
        };

    function Fl(t) {
        return new Vl(t)
    }

    function Vl(t) {
        t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context
    }
    var Hl = Vl.prototype;
    Hl.perform = function(t) {
        var e, i = this._upstream,
            n = t && t.skip;
        if (this._dirty && i) {
            var r = this.context;
            r.data = r.outputData = i.context.outputData
        }
        this.__pipeline && (this.__pipeline.currentTask = this), this._plan && !n && (e = this._plan(this.context));
        var a, o = u(this._modBy),
            s = this._modDataCount || 0,
            l = u(t && t.modBy),
            h = t && t.modDataCount || 0;

        function u(t) {
            return !(t >= 1) && (t = 1), t
        }
        o === l && s === h || (e = "reset"), (this._dirty || "reset" === e) && (this._dirty = !1, a = function(t, e) {
            var i, n;
            t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null, !e && t._reset && ((i = t._reset(t.context)) && i.progress && (n = i.forceFirstProgress, i = i.progress), D(i) && !i.length && (i = null));
            t._progress = i, t._modBy = t._modDataCount = null;
            var r = t._downstream;
            return r && r.dirty(), n
        }(this, n)), this._modBy = l, this._modDataCount = h;
        var c = t && t.step;
        if (this._dueEnd = i ? i._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
            var d = this._dueIndex,
                f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
            if (!n && (a || d < f)) {
                var p = this._progress;
                if (D(p))
                    for (var g = 0; g < p.length; g++) Gl(this, p[g], d, f, l, h);
                else Gl(this, p, d, f, l, h)
            }
            this._dueIndex = f;
            var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;
            this._outputDueEnd = v
        } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
        return this.unfinished()
    };
    var Wl = function() {
        var t, e, i, n, r, a = {
            reset: function(l, h, u, c) {
                e = l, t = h, i = u, n = c, r = Math.ceil(n / i), a.next = i > 1 && n > 0 ? s : o
            }
        };
        return a;

        function o() {
            return e < t ? e++ : null
        }

        function s() {
            var a = e % r * i + Math.ceil(e / r),
                o = e >= t ? null : a < n ? a : e;
            return e++, o
        }
    }();

    function Gl(t, e, i, n, r, a) {
        Wl.reset(i, n, r, a), t._callingProgress = e, t._callingProgress({
            start: i,
            end: n,
            count: n - i,
            next: Wl.next
        }, t.context)
    }
    Hl.dirty = function() {
        this._dirty = !0, this._onDirty && this._onDirty(this.context)
    }, Hl.unfinished = function() {
        return this._progress && this._dueIndex < this._dueEnd
    }, Hl.pipe = function(t) {
        (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty())
    }, Hl.dispose = function() {
        this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0)
    }, Hl.getUpstream = function() {
        return this._upstream
    }, Hl.getDownstream = function() {
        return this._downstream
    }, Hl.setOutputEnd = function(t) {
        this._outputDueEnd = this._settedOutputEnd = t
    };
    var ql = En(),
        Xl = Ts.extend({
            type: "series.__base__",
            seriesIndex: 0,
            coordinateSystem: null,
            defaultOption: null,
            legendDataProvider: null,
            visualColorAccessPath: "itemStyle.color",
            layoutMode: null,
            init: function(t, e, i, n) {
                this.seriesIndex = this.componentIndex, this.dataTask = Fl({
                    count: Yl,
                    reset: Zl
                }), this.dataTask.context = {
                    model: this
                }, this.mergeDefaultAndTheme(t, i), Gs(this);
                var r = this.getInitialData(t, i);
                Kl(r, this), this.dataTask.context.data = r, ql(this).dataBeforeProcessed = r, Ul(this)
            },
            mergeDefaultAndTheme: function(t, e) {
                var i = this.layoutMode,
                    n = i ? ws(t) : {},
                    r = this.subType;
                Ts.hasClass(r) && (r += "Series"), g(t, e.getTheme().get(this.subType)), g(t, this.getDefaultOption()), Cn(t, "label", ["show"]), this.fillDataTextStyle(t.data), i && _s(t, n, i)
            },
            mergeOption: function(t, e) {
                t = g(this.option, t, !0), this.fillDataTextStyle(t.data);
                var i = this.layoutMode;
                i && _s(this.option, t, i), Gs(this);
                var n = this.getInitialData(t, e);
                Kl(n, this), this.dataTask.dirty(), this.dataTask.context.data = n, ql(this).dataBeforeProcessed = n, Ul(this)
            },
            fillDataTextStyle: function(t) {
                if (t && !E(t))
                    for (var e = ["show"], i = 0; i < t.length; i++) t[i] && t[i].label && Cn(t[i], "label", e)
            },
            getInitialData: function() {},
            appendData: function(t) {
                this.getRawData().appendData(t.data)
            },
            getData: function(t) {
                var e = Ql(this);
                if (e) {
                    var i = e.context.data;
                    return null == t ? i : i.getLinkedData(t)
                }
                return ql(this).data
            },
            setData: function(t) {
                var e = Ql(this);
                if (e) {
                    var i = e.context;
                    i.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), i.outputData = t, e !== this.dataTask && (i.data = t)
                }
                ql(this).data = t
            },
            getSource: function() {
                return Ws(this).source
            },
            getRawData: function() {
                return ql(this).dataBeforeProcessed
            },
            getBaseAxis: function() {
                var t = this.coordinateSystem;
                return t && t.getBaseAxis && t.getBaseAxis()
            },
            formatTooltip: function(t, e, i) {
                function n(t) {
                    return hs(as(t))
                }
                var r = this.getData(),
                    a = r.mapDimension("defaultedTooltip", !0),
                    o = a.length,
                    s = this.getRawValue(t),
                    l = D(s),
                    h = r.getItemVisual(t, "color");
                L(h) && h.colorStops && (h = (h.colorStops[0] || {}).color), h = h || "transparent";
                var u = o > 1 || l && !o ? function(i) {
                        var n = function(t, e, i, n) {
                                if (t && e) {
                                    if (t.reduce && t.reduce === d) return t.reduce(e, i, n);
                                    for (var r = 0, a = t.length; r < a; r++) i = e.call(n, i, t[r], r, t);
                                    return i
                                }
                            }(i, function(t, e, i) {
                                var n = r.getDimensionInfo(i);
                                return t | (n && !1 !== n.tooltip && null != n.displayName)
                            }, 0),
                            o = [];

                        function s(t, i) {
                            var a = r.getDimensionInfo(i);
                            if (a && !1 !== a.otherDims.tooltip) {
                                var s = a.type,
                                    l = ds({
                                        color: h,
                                        type: "subItem"
                                    }),
                                    u = (n ? l + hs(a.displayName || "-") + ": " : "") + hs("ordinal" === s ? t + "" : "time" === s ? e ? "" : ps("yyyy/MM/dd hh:mm:ss", t) : as(t));
                                u && o.push(u)
                            }
                        }
                        return a.length ? S(a, function(e) {
                            s(Rl(r, t, e), e)
                        }) : S(i, s), (n ? "<br/>" : "") + o.join(n ? "<br/>" : ", ")
                    }(s) : n(o ? Rl(r, t, a[0]) : l ? s[0] : s),
                    c = ds(h),
                    f = r.getName(t),
                    p = this.name;
                return Pn(this) || (p = ""), p = p ? hs(p) + (e ? ": " : "<br/>") : "", e ? c + p + u : p + c + (f ? hs(f) + ": " + u : u)
            },
            isAnimationEnabled: function() {
                if (n.node) return !1;
                var t = this.getShallow("animation");
                return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t
            },
            restoreData: function() {
                this.dataTask.dirty()
            },
            getColorFromPalette: function(t, e, i) {
                var n = this.ecModel,
                    r = Ds.getColorFromPalette.call(this, t, e, i);
                return r || (r = n.getColorFromPalette(t, e, i)), r
            },
            coordDimToDataDim: function(t) {
                return this.getRawData().mapDimension(t, !0)
            },
            getProgressive: function() {
                return this.get("progressive")
            },
            getProgressiveThreshold: function() {
                return this.get("progressiveThreshold")
            },
            getAxisTooltipData: null,
            getTooltipPosition: null,
            pipeTask: null,
            preventIncremental: null,
            pipelineContext: null
        });

    function Ul(t) {
        var e = t.name;
        Pn(t) || (t.name = function(t) {
            var e = t.getRawData(),
                i = e.mapDimension("seriesName", !0),
                n = [];
            return S(i, function(t) {
                var i = e.getDimensionInfo(t);
                i.displayName && n.push(i.displayName)
            }), n.join(" ")
        }(t) || e)
    }

    function Yl(t) {
        return t.model.getRawData().count()
    }

    function Zl(t) {
        var e = t.model;
        return e.setData(e.getRawData().cloneShallow()), jl
    }

    function jl(t, e) {
        t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData)
    }

    function Kl(t, e) {
        S(t.CHANGABLE_METHODS, function(i) {
            t.wrapMethod(i, A($l, e))
        })
    }

    function $l(t) {
        var e = Ql(t);
        e && e.setOutputEnd(this.count())
    }

    function Ql(t) {
        var e = (t.ecModel || {}).scheduler,
            i = e && e.getPipeline(t.uid);
        if (i) {
            var n = i.currentTask;
            if (n) {
                var r = n.agentStubMap;
                r && (n = r.get(t.uid))
            }
            return n
        }
    }
    b(Xl, zl), b(Xl, Ds);
    var Jl = function() {
        this.group = new Ae, this.uid = Yo("viewComponent")
    };
    Jl.prototype = {
        constructor: Jl,
        init: function(t, e) {},
        render: function(t, e, i, n) {},
        dispose: function() {}
    };
    var th = Jl.prototype;
    th.updateView = th.updateLayout = th.updateVisual = function(t, e, i, n) {}, Wn(Jl), Yn(Jl, {
        registerWhenExtend: !0
    });
    var eh = function() {
            var t = En();
            return function(e) {
                var i = t(e),
                    n = e.pipelineContext,
                    r = i.large,
                    a = i.progressiveRender,
                    o = i.large = n.large,
                    s = i.progressiveRender = n.progressiveRender;
                return !!(r ^ o || a ^ s) && "reset"
            }
        },
        ih = En(),
        nh = eh();

    function rh() {
        this.group = new Ae, this.uid = Yo("viewChart"), this.renderTask = Fl({
            plan: lh,
            reset: hh
        }), this.renderTask.context = {
            view: this
        }
    }
    rh.prototype = {
        type: "chart",
        init: function(t, e) {},
        render: function(t, e, i, n) {},
        highlight: function(t, e, i, n) {
            sh(t.getData(), n, "emphasis")
        },
        downplay: function(t, e, i, n) {
            sh(t.getData(), n, "normal")
        },
        remove: function(t, e) {
            this.group.removeAll()
        },
        dispose: function() {},
        incrementalPrepareRender: null,
        incrementalRender: null,
        updateTransform: null
    };
    var ah = rh.prototype;

    function oh(t, e) {
        if (t && (t.trigger(e), "group" === t.type))
            for (var i = 0; i < t.childCount(); i++) oh(t.childAt(i), e)
    }

    function sh(t, e, i) {
        var n = On(t, e);
        null != n ? S(In(n), function(e) {
            oh(t.getItemGraphicEl(e), i)
        }) : t.eachItemGraphicEl(function(t) {
            oh(t, i)
        })
    }

    function lh(t) {
        return nh(t.model)
    }

    function hh(t) {
        var e = t.model,
            i = t.ecModel,
            n = t.api,
            r = t.payload,
            a = e.pipelineContext.progressiveRender,
            o = t.view,
            s = r && ih(r).updateMethod,
            l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
        return "render" !== l && o[l](e, i, n, r), uh[l]
    }
    ah.updateView = ah.updateLayout = ah.updateVisual = function(t, e, i, n) {
        this.render(t, e, i, n)
    }, Wn(rh), Yn(rh, {
        registerWhenExtend: !0
    }), rh.markUpdateMethod = function(t, e) {
        ih(t).updateMethod = e
    };
    var uh = {
            incrementalPrepareRender: {
                progress: function(t, e) {
                    e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload)
                }
            },
            render: {
                forceFirstProgress: !0,
                progress: function(t, e) {
                    e.view.render(e.model, e.ecModel, e.api, e.payload)
                }
            }
        },
        ch = "\0__throttleOriginMethod",
        dh = "\0__throttleRate",
        fh = "\0__throttleType";

    function ph(t, e, i) {
        var n, r, a, o, s, l = 0,
            h = 0,
            u = null;

        function c() {
            h = (new Date).getTime(), u = null, t.apply(a, o || [])
        }
        e = e || 0;
        var d = function() {
            n = (new Date).getTime(), a = this, o = arguments;
            var t = s || e,
                d = s || i;
            s = null, r = n - (d ? l : h) - t, clearTimeout(u), d ? u = setTimeout(c, t) : r >= 0 ? c() : u = setTimeout(c, -r), l = n
        };
        return d.clear = function() {
            u && (clearTimeout(u), u = null)
        }, d.debounceNextCall = function(t) {
            s = t
        }, d
    }
    var gh = {
            createOnAllSeries: !0,
            performRawSeries: !0,
            reset: function(t, e) {
                var i = t.getData(),
                    n = (t.visualColorAccessPath || "itemStyle.color").split("."),
                    r = t.get(n) || t.getColorFromPalette(t.name, null, e.getSeriesCount());
                if (i.setVisual("color", r), !e.isSeriesFiltered(t)) {
                    "function" != typeof r || r instanceof Ua || i.each(function(e) {
                        i.setItemVisual(e, "color", r(t.getDataParams(e)))
                    });
                    return {
                        dataEach: i.hasItemOption ? function(t, e) {
                            var i = t.getItemModel(e).get(n, !0);
                            null != i && t.setItemVisual(e, "color", i)
                        } : null
                    }
                }
            }
        },
        vh = {
            toolbox: {
                brush: {
                    title: {
                        rect: "矩形选择",
                        polygon: "圈选",
                        lineX: "横向选择",
                        lineY: "纵向选择",
                        keep: "保持选择",
                        clear: "清除选择"
                    }
                },
                dataView: {
                    title: "数据视图",
                    lang: ["数据视图", "关闭", "刷新"]
                },
                dataZoom: {
                    title: {
                        zoom: "区域缩放",
                        back: "区域缩放还原"
                    }
                },
                magicType: {
                    title: {
                        line: "切换为折线图",
                        bar: "切换为柱状图",
                        stack: "切换为堆叠",
                        tiled: "切换为平铺"
                    }
                },
                restore: {
                    title: "还原"
                },
                saveAsImage: {
                    title: "保存为图片",
                    lang: ["右键另存为图片"]
                }
            },
            series: {
                typeNames: {
                    pie: "饼图",
                    bar: "柱状图",
                    line: "折线图",
                    scatter: "散点图",
                    effectScatter: "涟漪散点图",
                    radar: "雷达图",
                    tree: "树图",
                    treemap: "矩形树图",
                    boxplot: "箱型图",
                    candlestick: "K线图",
                    k: "K线图",
                    heatmap: "热力图",
                    map: "地图",
                    parallel: "平行坐标图",
                    lines: "线图",
                    graph: "关系图",
                    sankey: "桑基图",
                    funnel: "漏斗图",
                    gauge: "仪表盘图",
                    pictorialBar: "象形柱图",
                    themeRiver: "主题河流图",
                    sunburst: "旭日图"
                }
            },
            aria: {
                general: {
                    withTitle: "这是一个关于“{title}”的图表。",
                    withoutTitle: "这是一个图表，"
                },
                series: {
                    single: {
                        prefix: "",
                        withName: "图表类型是{seriesType}，表示{seriesName}。",
                        withoutName: "图表类型是{seriesType}。"
                    },
                    multiple: {
                        prefix: "它由{seriesCount}个图表系列组成。",
                        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
                        withoutName: "第{seriesId}个系列是一个{seriesType}，",
                        separator: {
                            middle: "；",
                            end: "。"
                        }
                    }
                },
                data: {
                    allData: "其数据是——",
                    partialData: "其中，前{displayCnt}项是——",
                    withName: "{name}的数据是{value}",
                    withoutName: "{value}",
                    separator: {
                        middle: "，",
                        end: ""
                    }
                }
            }
        },
        mh = function(t, e) {
            var i = e.getModel("aria");
            if (i.get("show"))
                if (i.get("description")) t.setAttribute("aria-label", i.get("description"));
                else {
                    var n = 0;
                    e.eachSeries(function(t, e) {
                        ++n
                    }, this);
                    var r, a = i.get("data.maxCount") || 10,
                        o = i.get("series.maxCount") || 10,
                        s = Math.min(n, o);
                    if (!(n < 1)) {
                        var l = function() {
                            var t = e.getModel("title").option;
                            t && t.length && (t = t[0]);
                            return t && t.text
                        }();
                        r = l ? u(c("general.withTitle"), {
                            title: l
                        }) : c("general.withoutTitle");
                        var h = [];
                        r += u(c(n > 1 ? "series.multiple.prefix" : "series.single.prefix"), {
                            seriesCount: n
                        }), e.eachSeries(function(t, e) {
                            if (e < s) {
                                var i, r = t.get("name"),
                                    o = "series." + (n > 1 ? "multiple" : "single") + ".";
                                i = u(i = c(r ? o + "withName" : o + "withoutName"), {
                                    seriesId: t.seriesIndex,
                                    seriesName: t.get("name"),
                                    seriesType: (v = t.subType, vh.series.typeNames[v] || "自定义图")
                                });
                                var l = t.getData();
                                window.data = l, l.count() > a ? i += u(c("data.partialData"), {
                                    displayCnt: a
                                }) : i += c("data.allData");
                                for (var d = [], f = 0; f < l.count(); f++)
                                    if (f < a) {
                                        var p = l.getName(f),
                                            g = Rl(l, f);
                                        d.push(u(c(p ? "data.withName" : "data.withoutName"), {
                                            name: p,
                                            value: g
                                        }))
                                    }
                                i += d.join(c("data.separator.middle")) + c("data.separator.end"), h.push(i)
                            }
                            var v
                        }), r += h.join(c("series.multiple.separator.middle")) + c("series.multiple.separator.end"), t.setAttribute("aria-label", r)
                    }
                }
            function u(t, e) {
                if ("string" != typeof t) return t;
                var i = t;
                return S(e, function(t, e) {
                    i = i.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t)
                }), i
            }

            function c(t) {
                var e = i.get(t);
                if (null == e) {
                    for (var n = t.split("."), r = vh.aria, a = 0; a < n.length; ++a) r = r[n[a]];
                    return r
                }
                return e
            }
        },
        yh = Math.PI;

    function xh(t, e, i, n) {
        this.ecInstance = t, this.api = e, this.unfinished;
        i = this._dataProcessorHandlers = i.slice(), n = this._visualHandlers = n.slice();
        this._allHandlers = i.concat(n), this._stageTaskMap = Z()
    }
    var _h = xh.prototype;

    function wh(t, e, i, n, r) {
        var a;

        function o(t, e) {
            return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id))
        }
        r = r || {}, S(e, function(e, s) {
            if (!r.visualType || r.visualType === e.visualType) {
                var l = t._stageTaskMap.get(e.uid),
                    h = l.seriesTaskMap,
                    u = l.overallTask;
                if (u) {
                    var c, d = u.agentStubMap;
                    d.each(function(t) {
                        o(r, t) && (t.dirty(), c = !0)
                    }), c && u.dirty(), bh(u, n);
                    var f = t.getPerformArgs(u, r.block);
                    d.each(function(t) {
                        t.perform(f)
                    }), a |= u.perform(f)
                } else h && h.each(function(s, l) {
                    o(r, s) && s.dirty();
                    var h = t.getPerformArgs(s, r.block);
                    h.skip = !e.performRawSeries && i.isSeriesFiltered(s.context.model), bh(s, n), a |= s.perform(h)
                })
            }
        }), t.unfinished |= a
    }
    _h.restoreData = function(t, e) {
        t.restoreData(e), this._stageTaskMap.each(function(t) {
            var e = t.overallTask;
            e && e.dirty()
        })
    }, _h.getPerformArgs = function(t, e) {
        if (t.__pipeline) {
            var i = this._pipelineMap.get(t.__pipeline.id),
                n = i.context,
                r = !e && i.progressiveEnabled && (!n || n.progressiveRender) && t.__idxInPipeline > i.blockIndex ? i.step : null,
                a = n && n.modDataCount;
            return {
                step: r,
                modBy: null != a ? Math.ceil(a / r) : null,
                modDataCount: a
            }
        }
    }, _h.getPipeline = function(t) {
        return this._pipelineMap.get(t)
    }, _h.updateStreamModes = function(t, e) {
        var i = this._pipelineMap.get(t.uid),
            n = t.getData().count(),
            r = i.progressiveEnabled && e.incrementalPrepareRender && n >= i.threshold,
            a = t.get("large") && n >= t.get("largeThreshold"),
            o = "mod" === t.get("progressiveChunkMode") ? n : null;
        t.pipelineContext = i.context = {
            progressiveRender: r,
            modDataCount: o,
            large: a
        }
    }, _h.restorePipelines = function(t) {
        var e = this,
            i = e._pipelineMap = Z();
        t.eachSeries(function(t) {
            var n = t.getProgressive(),
                r = t.uid;
            i.set(r, {
                id: r,
                head: null,
                tail: null,
                threshold: t.getProgressiveThreshold(),
                progressiveEnabled: n && !(t.preventIncremental && t.preventIncremental()),
                blockIndex: -1,
                step: Math.round(n || 700),
                count: 0
            }), Lh(e, t, t.dataTask)
        })
    }, _h.prepareStageTasks = function() {
        var t = this._stageTaskMap,
            e = this.ecInstance.getModel(),
            i = this.api;
        S(this._allHandlers, function(n) {
            var r = t.get(n.uid) || t.set(n.uid, []);
            n.reset && function(t, e, i, n, r) {
                var a = i.seriesTaskMap || (i.seriesTaskMap = Z()),
                    o = e.seriesType,
                    s = e.getTargetSeries;
                e.createOnAllSeries ? n.eachRawSeries(l) : o ? n.eachRawSeriesByType(o, l) : s && s(n, r).each(l);

                function l(i) {
                    var o = i.uid,
                        s = a.get(o) || a.set(o, Fl({
                            plan: Ch,
                            reset: Ah,
                            count: Ph
                        }));
                    s.context = {
                        model: i,
                        ecModel: n,
                        api: r,
                        useClearVisual: e.isVisual && !e.isLayout,
                        plan: e.plan,
                        reset: e.reset,
                        scheduler: t
                    }, Lh(t, i, s)
                }
                var h = t._pipelineMap;
                a.each(function(t, e) {
                    h.get(e) || (t.dispose(), a.removeKey(e))
                })
            }(this, n, r, e, i), n.overallReset && function(t, e, i, n, r) {
                var a = i.overallTask = i.overallTask || Fl({
                    reset: Mh
                });
                a.context = {
                    ecModel: n,
                    api: r,
                    overallReset: e.overallReset,
                    scheduler: t
                };
                var o = a.agentStubMap = a.agentStubMap || Z(),
                    s = e.seriesType,
                    l = e.getTargetSeries,
                    h = !0,
                    u = e.modifyOutputEnd;
                s ? n.eachRawSeriesByType(s, c) : l ? l(n, r).each(c) : (h = !1, S(n.getSeries(), c));

                function c(e) {
                    var i = e.uid,
                        n = o.get(i);
                    n || (n = o.set(i, Fl({
                        reset: Sh,
                        onDirty: Ih
                    })), a.dirty()), n.context = {
                        model: e,
                        overallProgress: h,
                        modifyOutputEnd: u
                    }, n.agent = a, n.__block = h, Lh(t, e, n)
                }
                var d = t._pipelineMap;
                o.each(function(t, e) {
                    d.get(e) || (t.dispose(), a.dirty(), o.removeKey(e))
                })
            }(this, n, r, e, i)
        }, this)
    }, _h.prepareView = function(t, e, i, n) {
        var r = t.renderTask,
            a = r.context;
        a.model = e, a.ecModel = i, a.api = n, r.__block = !t.incrementalPrepareRender, Lh(this, e, r)
    }, _h.performDataProcessorTasks = function(t, e) {
        wh(this, this._dataProcessorHandlers, t, e, {
            block: !0
        })
    }, _h.performVisualTasks = function(t, e, i) {
        wh(this, this._visualHandlers, t, e, i)
    }, _h.performSeriesTasks = function(t) {
        var e;
        t.eachSeries(function(t) {
            e |= t.dataTask.perform()
        }), this.unfinished |= e
    }, _h.plan = function() {
        this._pipelineMap.each(function(t) {
            var e = t.tail;
            do {
                if (e.__block) {
                    t.blockIndex = e.__idxInPipeline;
                    break
                }
                e = e.getUpstream()
            } while (e)
        })
    };
    var bh = _h.updatePayload = function(t, e) {
        "remain" !== e && (t.context.payload = e)
    };

    function Mh(t) {
        t.overallReset(t.ecModel, t.api, t.payload)
    }

    function Sh(t, e) {
        return t.overallProgress && Th
    }

    function Th() {
        this.agent.dirty(), this.getDownstream().dirty()
    }

    function Ih() {
        this.agent && this.agent.dirty()
    }

    function Ch(t) {
        return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload)
    }

    function Ah(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = t.resetDefines = In(t.reset(t.model, t.ecModel, t.api, t.payload));
        return e.length > 1 ? T(e, function(t, e) {
            return kh(e)
        }) : Dh
    }
    var Dh = kh(0);

    function kh(t) {
        return function(e, i) {
            var n = i.data,
                r = i.resetDefines[t];
            if (r && r.dataEach)
                for (var a = e.start; a < e.end; a++) r.dataEach(n, a);
            else r && r.progress && r.progress(e, n)
        }
    }

    function Ph(t) {
        return t.data.count()
    }

    function Lh(t, e, i) {
        var n = e.uid,
            r = t._pipelineMap.get(n);
        !r.head && (r.head = i), r.tail && r.tail.pipe(i), r.tail = i, i.__idxInPipeline = r.count++, i.__pipeline = r
    }
    xh.wrapStageHandler = function(t, e) {
        return k(t) && (t = {
            overallReset: t,
            seriesType: function(t) {
                Oh = null;
                try {
                    t(Eh, Nh)
                } catch (t) {}
                return Oh
            }(t)
        }), t.uid = Yo("stageHandler"), e && (t.visualType = e), t
    };
    var Oh, Eh = {},
        Nh = {};

    function Rh(t, e) {
        for (var i in e.prototype) t[i] = j
    }
    Rh(Eh, js), Rh(Nh, Js), Eh.eachSeriesByType = Eh.eachRawSeriesByType = function(t) {
        Oh = t
    }, Eh.eachComponent = function(t) {
        "series" === t.mainType && t.subType && (Oh = t.subType)
    };
    var Bh = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
        zh = {
            color: Bh,
            colorLayer: [
                ["#37A2DA", "#ffd85c", "#fd7b5f"],
                ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"],
                ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Bh
            ]
        },
        Fh = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],
        Vh = {
            color: Fh,
            backgroundColor: "#333",
            tooltip: {
                axisPointer: {
                    lineStyle: {
                        color: "#eee"
                    },
                    crossStyle: {
                        color: "#eee"
                    }
                }
            },
            legend: {
                textStyle: {
                    color: "#eee"
                }
            },
            textStyle: {
                color: "#eee"
            },
            title: {
                textStyle: {
                    color: "#eee"
                }
            },
            toolbox: {
                iconStyle: {
                    normal: {
                        borderColor: "#eee"
                    }
                }
            },
            dataZoom: {
                textStyle: {
                    color: "#eee"
                }
            },
            visualMap: {
                textStyle: {
                    color: "#eee"
                }
            },
            timeline: {
                lineStyle: {
                    color: "#eee"
                },
                itemStyle: {
                    normal: {
                        color: Fh[1]
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            color: "#eee"
                        }
                    }
                },
                controlStyle: {
                    normal: {
                        color: "#eee",
                        borderColor: "#eee"
                    }
                }
            },
            timeAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                        color: "#aaa"
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: "#eee"
                    }
                }
            },
            logAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                        color: "#aaa"
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: "#eee"
                    }
                }
            },
            valueAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                        color: "#aaa"
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: "#eee"
                    }
                }
            },
            categoryAxis: {
                axisLine: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: "#eee"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#eee"
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                        color: "#aaa"
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: "#eee"
                    }
                }
            },
            line: {
                symbol: "circle"
            },
            graph: {
                color: Fh
            },
            gauge: {
                title: {
                    textStyle: {
                        color: "#eee"
                    }
                }
            },
            candlestick: {
                itemStyle: {
                    normal: {
                        color: "#FD1050",
                        color0: "#0CF49B",
                        borderColor: "#FD1050",
                        borderColor0: "#0CF49B"
                    }
                }
            }
        };
    Vh.categoryAxis.splitLine.show = !1, Ts.extend({
        type: "dataset",
        defaultOption: {
            seriesLayoutBy: Fs,
            sourceHeader: null,
            dimensions: null,
            source: null
        },
        optionUpdated: function() {
            ! function(t) {
                var e = t.option.source,
                    i = Bs;
                if (E(e)) i = zs;
                else if (D(e))
                    for (var n = 0, r = e.length; n < r; n++) {
                        var a = e[n];
                        if (null != a) {
                            if (D(a)) {
                                i = Es;
                                break
                            }
                            if (L(a)) {
                                i = Ns;
                                break
                            }
                        }
                    } else if (L(e)) {
                        for (var o in e)
                            if (e.hasOwnProperty(o) && M(e[o])) {
                                i = Rs;
                                break
                            }
                    } else if (null != e) throw new Error("Invalid data");
                Ws(t).sourceFormat = i
            }(this)
        }
    }), Jl.extend({
        type: "dataset"
    });
    var Hh = W,
        Wh = S,
        Gh = k,
        qh = L,
        Xh = Ts.parseClassType,
        Uh = 1e3,
        Yh = 1e3,
        Zh = 3e3,
        jh = {
            PROCESSOR: {
                FILTER: Uh,
                STATISTIC: 5e3
            },
            VISUAL: {
                LAYOUT: Yh,
                GLOBAL: 2e3,
                CHART: Zh,
                COMPONENT: 4e3,
                BRUSH: 5e3
            }
        },
        Kh = "__flagInMainProcess",
        $h = "__optionUpdated",
        Qh = /^[a-zA-Z0-9_]+$/;

    function Jh(t) {
        return function(e, i, n) {
            e = e && e.toLowerCase(), dt.prototype[t].call(this, e, i, n)
        }
    }

    function tu() {
        dt.call(this)
    }

    function eu(t, e, i) {
        i = i || {}, "string" == typeof e && (e = Su[e]), this.id, this.group, this._dom = t;
        var n = this._zr = _n(t, {
            renderer: i.renderer || "canvas",
            devicePixelRatio: i.devicePixelRatio,
            width: i.width,
            height: i.height
        });
        this._throttledZrFlush = ph(C(n.flush, n), 17), (e = p(e)) && Ml(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new el;
        var r, a, o = this._api = (a = (r = this)._coordSysMgr, v(new Js(r), {
            getCoordinateSystems: C(a.getCoordinateSystems, a),
            getComponentByElement: function(t) {
                for (; t;) {
                    var e = t.__ecComponentInfo;
                    if (null != e) return r._model.getComponent(e.mainType, e.index);
                    t = t.parent
                }
            }
        }));

        function s(t, e) {
            return t.__prio - e.__prio
        }
        Re(Mu, s), Re(_u, s), this._scheduler = new xh(this, o, _u, Mu), dt.call(this), this._messageCenter = new tu, this._initEvents(), this.resize = C(this.resize, this), this._pendingActions = [], n.animation.on("frame", this._onframe, this),
            function(t, e) {
                t.on("rendered", function() {
                    e.trigger("rendered"), !t.animation.isFinished() || e[$h] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished")
                })
            }(n, this), X(this)
    }
    tu.prototype.on = Jh("on"), tu.prototype.off = Jh("off"), tu.prototype.one = Jh("one"), b(tu, dt);
    var iu = eu.prototype;

    function nu(t, e, i) {
        var n, r = this._model,
            a = this._coordSysMgr.getCoordinateSystems();
        e = Rn(r, e);
        for (var o = 0; o < a.length; o++) {
            var s = a[o];
            if (s[t] && null != (n = s[t](r, e, i))) return n
        }
    }
    iu._onframe = function() {
        if (!this._disposed) {
            var t = this._scheduler;
            if (this[$h]) {
                var e = this[$h].silent;
                this[Kh] = !0, au(this), ru.update.call(this), this[Kh] = !1, this[$h] = !1, hu.call(this, e), uu.call(this, e)
            } else if (t.unfinished) {
                var i = 1,
                    n = this._model,
                    r = this._api;
                t.unfinished = !1;
                do {
                    var a = +new Date;
                    t.performSeriesTasks(n), t.performDataProcessorTasks(n), su(this, n), t.performVisualTasks(n), pu(this, this._model, r, "remain"), i -= +new Date - a
                } while (i > 0 && t.unfinished);
                t.unfinished || this._zr.flush()
            }
        }
    }, iu.getDom = function() {
        return this._dom
    }, iu.getZr = function() {
        return this._zr
    }, iu.setOption = function(t, e, i) {
        var n;
        if (qh(e) && (i = e.lazyUpdate, n = e.silent, e = e.notMerge), this[Kh] = !0, !this._model || e) {
            var r = new sl(this._api),
                a = this._theme,
                o = this._model = new js(null, null, a, r);
            o.scheduler = this._scheduler, o.init(null, null, a, r)
        }
        this._model.setOption(t, wu), i ? (this[$h] = {
            silent: n
        }, this[Kh] = !1) : (au(this), ru.update.call(this), this._zr.flush(), this[$h] = !1, this[Kh] = !1, hu.call(this, n), uu.call(this, n))
    }, iu.setTheme = function() {
        console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
    }, iu.getModel = function() {
        return this._model
    }, iu.getOption = function() {
        return this._model && this._model.getOption()
    }, iu.getWidth = function() {
        return this._zr.getWidth()
    }, iu.getHeight = function() {
        return this._zr.getHeight()
    }, iu.getDevicePixelRatio = function() {
        return this._zr.painter.dpr || window.devicePixelRatio || 1
    }, iu.getRenderedCanvas = function(t) {
        if (n.canvasSupported) return (t = t || {}).pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor"), this._zr.painter.getRenderedCanvas(t)
    }, iu.getSvgDataUrl = function() {
        if (n.svgSupported) {
            var t = this._zr;
            return S(t.storage.getDisplayList(), function(t) {
                t.stopAnimation(!0)
            }), t.painter.pathToDataUrl()
        }
    }, iu.getDataURL = function(t) {
        var e = (t = t || {}).excludeComponents,
            i = this._model,
            n = [],
            r = this;
        Wh(e, function(t) {
            i.eachComponent({
                mainType: t
            }, function(t) {
                var e = r._componentsMap[t.__viewId];
                e.group.ignore || (n.push(e), e.group.ignore = !0)
            })
        });
        var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
        return Wh(n, function(t) {
            t.group.ignore = !1
        }), a
    }, iu.getConnectedDataURL = function(t) {
        if (n.canvasSupported) {
            var e = this.group,
                i = Math.min,
                r = Math.max;
            if (Cu[e]) {
                var a = 1 / 0,
                    o = 1 / 0,
                    s = -1 / 0,
                    l = -1 / 0,
                    h = [],
                    u = t && t.pixelRatio || 1;
                S(Iu, function(n, u) {
                    if (n.group === e) {
                        var c = n.getRenderedCanvas(p(t)),
                            d = n.getDom().getBoundingClientRect();
                        a = i(d.left, a), o = i(d.top, o), s = r(d.right, s), l = r(d.bottom, l), h.push({
                            dom: c,
                            left: d.left,
                            top: d.top
                        })
                    }
                });
                var c = (s *= u) - (a *= u),
                    d = (l *= u) - (o *= u),
                    f = x();
                f.width = c, f.height = d;
                var g = _n(f);
                return Wh(h, function(t) {
                    var e = new qi({
                        style: {
                            x: t.left * u - a,
                            y: t.top * u - o,
                            image: t.dom
                        }
                    });
                    g.add(e)
                }), g.refreshImmediately(), f.toDataURL("image/" + (t && t.type || "png"))
            }
            return this.getDataURL(t)
        }
    }, iu.convertToPixel = A(nu, "convertToPixel"), iu.convertFromPixel = A(nu, "convertFromPixel"), iu.containPixel = function(t, e) {
        var i;
        return S(t = Rn(this._model, t), function(t, n) {
            n.indexOf("Models") >= 0 && S(t, function(t) {
                var r = t.coordinateSystem;
                if (r && r.containPoint) i |= !!r.containPoint(e);
                else if ("seriesModels" === n) {
                    var a = this._chartsMap[t.__viewId];
                    a && a.containPoint && (i |= a.containPoint(e, t))
                }
            }, this)
        }, this), !!i
    }, iu.getVisual = function(t, e) {
        var i = (t = Rn(this._model, t, {
                defaultMainType: "series"
            })).seriesModel.getData(),
            n = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? i.indexOfRawIndex(t.dataIndex) : null;
        return null != n ? i.getItemVisual(n, e) : i.getVisual(e)
    }, iu.getViewOfComponentModel = function(t) {
        return this._componentsMap[t.__viewId]
    }, iu.getViewOfSeriesModel = function(t) {
        return this._chartsMap[t.__viewId]
    };
    var ru = {
        prepareAndUpdate: function(t) {
            au(this), ru.update.call(this, t)
        },
        update: function(t) {
            var e = this._model,
                i = this._api,
                r = this._zr,
                a = this._coordSysMgr,
                o = this._scheduler;
            if (e) {
                o.restoreData(e, t), o.performSeriesTasks(e), a.create(e, i), o.performDataProcessorTasks(e, t), su(this, e), a.update(e, i), du(e), o.performVisualTasks(e, t), fu(this, e, i, t);
                var s = e.get("backgroundColor") || "transparent";
                if (n.canvasSupported) r.setBackgroundColor(s);
                else {
                    var l = $t(s);
                    s = Jt(l, "rgb"), 0 === l[3] && (s = "transparent")
                }
                gu(e, i)
            }
        },
        updateTransform: function(t) {
            var e = this._model,
                i = this,
                n = this._api;
            if (e) {
                var r = [];
                e.eachComponent(function(a, o) {
                    var s = i.getViewOfComponentModel(o);
                    if (s && s.__alive)
                        if (s.updateTransform) {
                            var l = s.updateTransform(o, e, n, t);
                            l && l.update && r.push(s)
                        } else r.push(s)
                });
                var a = Z();
                e.eachSeries(function(r) {
                    var o = i._chartsMap[r.__viewId];
                    if (o.updateTransform) {
                        var s = o.updateTransform(r, e, n, t);
                        s && s.update && a.set(r.uid, 1)
                    } else a.set(r.uid, 1)
                }), du(e), this._scheduler.performVisualTasks(e, t, {
                    setDirty: !0,
                    dirtyMap: a
                }), pu(i, e, n, t, a), gu(e, this._api)
            }
        },
        updateView: function(t) {
            var e = this._model;
            e && (rh.markUpdateMethod(t, "updateView"), du(e), this._scheduler.performVisualTasks(e, t, {
                setDirty: !0
            }), fu(this, this._model, this._api, t), gu(e, this._api))
        },
        updateVisual: function(t) {
            ru.update.call(this, t)
        },
        updateLayout: function(t) {
            ru.update.call(this, t)
        }
    };

    function au(t) {
        var e = t._model,
            i = t._scheduler;
        i.restorePipelines(e), i.prepareStageTasks(), cu(t, "component", e, i), cu(t, "chart", e, i), i.plan()
    }

    function ou(t, e, i, n, r) {
        var a = t._model;
        if (n) {
            var o = {};
            o[n + "Id"] = i[n + "Id"], o[n + "Index"] = i[n + "Index"], o[n + "Name"] = i[n + "Name"];
            var s = {
                mainType: n,
                query: o
            };
            r && (s.subType = r);
            var l = i.excludeSeriesId;
            null != l && (l = Z(In(l))), a && a.eachComponent(s, function(e) {
                l && null != l.get(e.id) || h(t["series" === n ? "_chartsMap" : "_componentsMap"][e.__viewId])
            }, t)
        } else Wh(t._componentsViews.concat(t._chartsViews), h);

        function h(n) {
            n && n.__alive && n[e] && n[e](n.__model, a, t._api, i)
        }
    }

    function su(t, e) {
        var i = t._chartsMap,
            n = t._scheduler;
        e.eachSeries(function(t) {
            n.updateStreamModes(t, i[t.__viewId])
        })
    }

    function lu(t, e) {
        var i = t.type,
            n = t.escapeConnect,
            r = yu[i],
            a = r.actionInfo,
            o = (a.update || "update").split(":"),
            s = o.pop();
        o = null != o[0] && Xh(o[0]), this[Kh] = !0;
        var l = [t],
            h = !1;
        t.batch && (h = !0, l = T(t.batch, function(e) {
            return (e = m(v({}, e), t)).batch = null, e
        }));
        var u, c = [],
            d = "highlight" === i || "downplay" === i;
        Wh(l, function(t) {
            (u = (u = r.action(t, this._model, this._api)) || v({}, t)).type = a.event || u.type, c.push(u), d ? ou(this, s, t, "series") : o && ou(this, s, t, o.main, o.sub)
        }, this), "none" === s || d || o || (this[$h] ? (au(this), ru.update.call(this, t), this[$h] = !1) : ru[s].call(this, t)), u = h ? {
            type: a.event || i,
            escapeConnect: n,
            batch: c
        } : c[0], this[Kh] = !1, !e && this._messageCenter.trigger(u.type, u)
    }

    function hu(t) {
        for (var e = this._pendingActions; e.length;) {
            var i = e.shift();
            lu.call(this, i, t)
        }
    }

    function uu(t) {
        !t && this.trigger("updated")
    }

    function cu(t, e, i, n) {
        for (var r = "component" === e, a = r ? t._componentsViews : t._chartsViews, o = r ? t._componentsMap : t._chartsMap, s = t._zr, l = t._api, h = 0; h < a.length; h++) a[h].__alive = !1;

        function u(t) {
            var e = "_ec_" + t.id + "_" + t.type,
                h = o[e];
            if (!h) {
                var u = Xh(t.type);
                (h = new(r ? Jl.getClass(u.main, u.sub) : rh.getClass(u.sub))).init(i, l), o[e] = h, a.push(h), s.add(h.group)
            }
            t.__viewId = h.__id = e, h.__alive = !0, h.__model = t, h.group.__ecComponentInfo = {
                mainType: t.mainType,
                index: t.componentIndex
            }, !r && n.prepareView(h, t, i, l)
        }
        r ? i.eachComponent(function(t, e) {
            "series" !== t && u(e)
        }) : i.eachSeries(u);
        for (h = 0; h < a.length;) {
            var c = a[h];
            c.__alive ? h++ : (!r && c.renderTask.dispose(), s.remove(c.group), c.dispose(i, l), a.splice(h, 1), delete o[c.__id], c.__id = c.group.__ecComponentInfo = null)
        }
    }

    function du(t) {
        t.clearColorPalette(), t.eachSeries(function(t) {
            t.clearColorPalette()
        })
    }

    function fu(t, e, i, n) {
        ! function(t, e, i, n, r) {
            Wh(r || t._componentsViews, function(t) {
                var r = t.__model;
                t.render(r, e, i, n), mu(r, t)
            })
        }(t, e, i, n), Wh(t._chartsViews, function(t) {
            t.__alive = !1
        }), pu(t, e, i, n), Wh(t._chartsViews, function(t) {
            t.__alive || t.remove(e, i)
        })
    }

    function pu(t, e, i, r, a) {
        var o, s = t._scheduler;
        e.eachSeries(function(e) {
                var i = t._chartsMap[e.__viewId];
                i.__alive = !0;
                var n = i.renderTask;
                s.updatePayload(n, r), a && a.get(e.uid) && n.dirty(), o |= n.perform(s.getPerformArgs(n)), i.group.silent = !!e.get("silent"), mu(e, i),
                    function(t, e) {
                        var i = t.get("blendMode") || null;
                        e.group.traverse(function(t) {
                            t.isGroup || t.style.blend !== i && t.setStyle("blend", i), t.eachPendingDisplayable && t.eachPendingDisplayable(function(t) {
                                t.setStyle("blend", i)
                            })
                        })
                    }(e, i)
            }), s.unfinished |= o,
            function(t, e) {
                var i = t.storage,
                    r = 0;
                i.traverse(function(t) {
                    t.isGroup || r++
                }), r > e.get("hoverLayerThreshold") && !n.node && i.traverse(function(t) {
                    t.isGroup || (t.useHoverLayer = !0)
                })
            }(t._zr, e), mh(t._zr.dom, e)
    }

    function gu(t, e) {
        Wh(bu, function(i) {
            i(t, e)
        })
    }
    iu.resize = function(t) {
        this._zr.resize(t);
        var e = this._model;
        if (this._loadingFX && this._loadingFX.resize(), e) {
            var i = e.resetOption("media"),
                n = t && t.silent;
            this[Kh] = !0, i && au(this), ru.update.call(this), this[Kh] = !1, hu.call(this, n), uu.call(this, n)
        }
    }, iu.showLoading = function(t, e) {
        if (qh(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), Tu[t]) {
            var i = Tu[t](this._api, e),
                n = this._zr;
            this._loadingFX = i, n.add(i)
        }
    }, iu.hideLoading = function() {
        this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
    }, iu.makeActionFromEvent = function(t) {
        var e = v({}, t);
        return e.type = xu[t.type], e
    }, iu.dispatchAction = function(t, e) {
        qh(e) || (e = {
            silent: !!e
        }), yu[t.type] && this._model && (this[Kh] ? this._pendingActions.push(t) : (lu.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : !1 !== e.flush && n.browser.weChat && this._throttledZrFlush(), hu.call(this, e.silent), uu.call(this, e.silent)))
    }, iu.appendData = function(t) {
        var e = t.seriesIndex;
        this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0
    }, iu.on = Jh("on"), iu.off = Jh("off"), iu.one = Jh("one");
    var vu = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];

    function mu(t, e) {
        var i = t.get("z"),
            n = t.get("zlevel");
        e.group.traverse(function(t) {
            "group" !== t.type && (null != i && (t.z = i), null != n && (t.zlevel = n))
        })
    }
    iu._initEvents = function() {
        Wh(vu, function(t) {
            this._zr.on(t, function(e) {
                var i, n = this.getModel(),
                    r = e.target;
                if ("globalout" === t) i = {};
                else if (r && null != r.dataIndex) {
                    var a = r.dataModel || n.getSeriesByIndex(r.seriesIndex);
                    i = a && a.getDataParams(r.dataIndex, r.dataType) || {}
                } else r && r.eventData && (i = v({}, r.eventData));
                i && (i.event = e, i.type = t, this.trigger(t, i))
            }, this)
        }, this), Wh(xu, function(t, e) {
            this._messageCenter.on(e, function(t) {
                this.trigger(e, t)
            }, this)
        }, this)
    }, iu.isDisposed = function() {
        return this._disposed
    }, iu.clear = function() {
        this.setOption({
            series: []
        }, !0)
    }, iu.dispose = function() {
        if (!this._disposed) {
            this._disposed = !0, zn(this.getDom(), ku, "");
            var t = this._api,
                e = this._model;
            Wh(this._componentsViews, function(i) {
                i.dispose(e, t)
            }), Wh(this._chartsViews, function(i) {
                i.dispose(e, t)
            }), this._zr.dispose(), delete Iu[this.id]
        }
    }, b(eu, dt);
    var yu = {},
        xu = {},
        _u = [],
        wu = [],
        bu = [],
        Mu = [],
        Su = {},
        Tu = {},
        Iu = {},
        Cu = {},
        Au = new Date - 0,
        Du = new Date - 0,
        ku = "_echarts_instance_",
        Pu = {};

    function Lu(t) {
        Cu[t] = !1
    }
    var Ou = Lu;

    function Eu(t) {
        return Iu[function(t, e) {
            return t.getAttribute ? t.getAttribute(e) : t[e]
        }(t, ku)]
    }

    function Nu(t, e) {
        Su[t] = e
    }

    function Ru(t) {
        wu.push(t)
    }

    function Bu(t, e) {
        Hu(_u, t, e, Uh)
    }

    function zu(t, e, i) {
        "function" == typeof e && (i = e, e = "");
        var n = qh(t) ? t.type : [t, t = {
            event: e
        }][0];
        t.event = (t.event || n).toLowerCase(), e = t.event, Hh(Qh.test(n) && Qh.test(e)), yu[n] || (yu[n] = {
            action: i,
            actionInfo: t
        }), xu[e] = n
    }

    function Fu(t, e) {
        Hu(Mu, t, e, Yh, "layout")
    }

    function Vu(t, e) {
        Hu(Mu, t, e, Zh, "visual")
    }

    function Hu(t, e, i, n, r) {
        (Gh(e) || qh(e)) && (i = e, e = n);
        var a = xh.wrapStageHandler(i, r);
        return a.__prio = e, a.__raw = i, t.push(a), a
    }

    function Wu(t, e) {
        Tu[t] = e
    }

    function Gu(t) {
        return Ts.extend(t)
    }

    function qu(t) {
        return Jl.extend(t)
    }

    function Xu(t) {
        return rh.extend(t)
    }
    Vu(2e3, gh), Ru(Ml), Bu(5e3, function(t) {
        var e = Z();
        t.eachSeries(function(t) {
            var i = t.get("stack");
            if (i) {
                var n = e.get(i) || e.set(i, []),
                    r = t.getData(),
                    a = {
                        stackResultDimension: r.getCalculationInfo("stackResultDimension"),
                        stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
                        stackedDimension: r.getCalculationInfo("stackedDimension"),
                        stackedByDimension: r.getCalculationInfo("stackedByDimension"),
                        isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
                        data: r,
                        seriesModel: t
                    };
                if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;
                n.length && r.setCalculationInfo("stackedOnSeries", n[n.length - 1].seriesModel), n.push(a)
            }
        }), e.each(Sl)
    }), Wu("default", function(t, e) {
        m(e = e || {}, {
            text: "loading",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0
        });
        var i = new Fa({
                style: {
                    fill: e.maskColor
                },
                zlevel: e.zlevel,
                z: 1e4
            }),
            n = new qa({
                shape: {
                    startAngle: -yh / 2,
                    endAngle: -yh / 2 + .1,
                    r: 10
                },
                style: {
                    stroke: e.color,
                    lineCap: "round",
                    lineWidth: 5
                },
                zlevel: e.zlevel,
                z: 10001
            }),
            r = new Fa({
                style: {
                    fill: "none",
                    text: e.text,
                    textPosition: "right",
                    textDistance: 10,
                    textFill: e.textColor
                },
                zlevel: e.zlevel,
                z: 10001
            });
        n.animateShape(!0).when(1e3, {
            endAngle: 3 * yh / 2
        }).start("circularInOut"), n.animateShape(!0).when(1e3, {
            startAngle: 3 * yh / 2
        }).delay(300).start("circularInOut");
        var a = new Ae;
        return a.add(n), a.add(r), a.add(i), a.resize = function() {
            var e = t.getWidth() / 2,
                a = t.getHeight() / 2;
            n.setShape({
                cx: e,
                cy: a
            });
            var o = n.shape.r;
            r.setShape({
                x: e - o,
                y: a - o,
                width: 2 * o,
                height: 2 * o
            }), i.setShape({
                x: 0,
                y: 0,
                width: t.getWidth(),
                height: t.getHeight()
            })
        }, a.resize(), a
    }), zu({
        type: "highlight",
        event: "highlight",
        update: "highlight"
    }, j), zu({
        type: "downplay",
        event: "downplay",
        update: "downplay"
    }, j), Nu("light", zh), Nu("dark", Vh);

    function Uu(t) {
        return t
    }

    function Yu(t, e, i, n, r) {
        this._old = t, this._new = e, this._oldKeyGetter = i || Uu, this._newKeyGetter = n || Uu, this.context = r
    }

    function Zu(t, e, i, n, r) {
        for (var a = 0; a < t.length; a++) {
            var o = "_ec_" + r[n](t[a], a),
                s = e[o];
            null == s ? (i.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a))
        }
    }
    Yu.prototype = {
        constructor: Yu,
        add: function(t) {
            return this._add = t, this
        },
        update: function(t) {
            return this._update = t, this
        },
        remove: function(t) {
            return this._remove = t, this
        },
        execute: function() {
            var t = this._old,
                e = this._new,
                i = {},
                n = [],
                r = [];
            for (Zu(t, {}, n, "_oldKeyGetter", this), Zu(e, i, r, "_newKeyGetter", this), a = 0; a < t.length; a++) {
                if (null != (s = i[o = n[a]]))(h = s.length) ? (1 === h && (i[o] = null), s = s.unshift()) : i[o] = null, this._update && this._update(s, a);
                else this._remove && this._remove(a)
            }
            for (var a = 0; a < r.length; a++) {
                var o = r[a];
                if (i.hasOwnProperty(o)) {
                    var s;
                    if (null == (s = i[o])) continue;
                    if (s.length)
                        for (var l = 0, h = s.length; l < h; l++) this._add && this._add(s[l]);
                    else this._add && this._add(s)
                }
            }
        }
    };
    var ju = Z(["tooltip", "label", "itemName", "itemId", "seriesName"]);
    var Ku = L,
        $u = "e\0\0",
        Qu = {
            float: "undefined" == typeof Float64Array ? Array : Float64Array,
            int: "undefined" == typeof Int32Array ? Array : Int32Array,
            ordinal: Array,
            number: Array,
            time: Array
        },
        Ju = "undefined" == typeof Uint32Array ? Array : Uint32Array,
        tc = "undefined" == typeof Uint16Array ? Array : Uint16Array;

    function ec(t) {
        return t._rawCount > 65535 ? Ju : tc
    }
    var ic = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],
        nc = ["_extent", "_approximateExtent", "_rawExtent"];

    function rc(t, e) {
        S(ic.concat(e.__wrappedMethods || []), function(i) {
            e.hasOwnProperty(i) && (t[i] = e[i])
        }), t.__wrappedMethods = e.__wrappedMethods, S(nc, function(i) {
            t[i] = p(e[i])
        }), t._calculationInfo = v(e._calculationInfo)
    }
    var ac = function(t, e) {
            t = t || ["x", "y"];
            for (var i = {}, n = [], r = {}, a = 0; a < t.length; a++) {
                var o = t[a];
                P(o) && (o = {
                    name: o
                });
                var s = o.name;
                o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {}, n.push(s), i[s] = o, o.index = a, o.createInvertedIndices && (r[s] = [])
            }
            this.dimensions = n, this._dimensionInfos = i, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = function(t) {
                var e = {},
                    i = e.encode = {},
                    n = Z(),
                    r = [],
                    a = [];
                S(t.dimensions, function(e) {
                    var o, s = t.getDimensionInfo(e),
                        l = s.coordDim;
                    if (l) {
                        var h = i[l];
                        i.hasOwnProperty(l) || (h = i[l] = []), h[s.coordDimIndex] = e, s.isExtraCoord || (n.set(l, 1), "ordinal" !== (o = s.type) && "time" !== o && (r[0] = e)), s.defaultTooltip && a.push(e)
                    }
                    ju.each(function(t, e) {
                        var n = i[e];
                        i.hasOwnProperty(e) || (n = i[e] = []);
                        var r = s.otherDims[e];
                        null != r && !1 !== r && (n[r] = s.name)
                    })
                });
                var o = [],
                    s = {};
                n.each(function(t, e) {
                    var n = i[e];
                    s[e] = n[0], o = o.concat(n)
                }), e.dataDimsOnCoord = o, e.encodeFirstDimNotExtra = s;
                var l = i.label;
                l && l.length && (r = l.slice());
                var h = i.tooltip;
                return h && h.length ? a = h.slice() : a.length || (a = r.slice()), i.defaultedLabel = r, i.defaultedTooltip = a, e
            }(this), this._invertedIndicesMap = r, this._calculationInfo = {}
        },
        oc = ac.prototype;

    function sc(t, e, i) {
        var n;
        if (null != e) {
            var r = t._chunkSize,
                a = Math.floor(i / r),
                o = i % r,
                s = t.dimensions[e],
                l = t._storage[s][a];
            if (l) {
                n = l[o];
                var h = t._dimensionInfos[s].ordinalMeta;
                h && h.categories.length && (n = h.categories[n])
            }
        }
        return n
    }

    function lc(t) {
        return t
    }

    function hc(t) {
        return t < this._count && t >= 0 ? this._indices[t] : -1
    }

    function uc(t, e) {
        var i = t._idList[e];
        return null == i && (i = sc(t, t._idDimIdx, e)), null == i && (i = $u + e), i
    }

    function cc(t) {
        return D(t) || (t = [t]), t
    }

    function dc(t, e) {
        var i = t.dimensions,
            n = new ac(T(i, t.getDimensionInfo, t), t.hostModel);
        rc(n, t);
        for (var r = n._storage = {}, a = t._storage, o = 0; o < i.length; o++) {
            var s = i[o];
            a[s] && (_(e, s) >= 0 ? (r[s] = fc(a[s]), n._rawExtent[s] = pc(), n._extent[s] = null) : r[s] = a[s])
        }
        return n
    }

    function fc(t) {
        for (var e, i, n = new Array(t.length), r = 0; r < t.length; r++) n[r] = (e = t[r], i = void 0, (i = e.constructor) === Array ? e.slice() : new i(e));
        return n
    }

    function pc() {
        return [1 / 0, -1 / 0]
    }
    oc.type = "list", oc.hasItemOption = !0, oc.getDimension = function(t) {
        return isNaN(t) || (t = this.dimensions[t] || t), t
    }, oc.getDimensionInfo = function(t) {
        return this._dimensionInfos[this.getDimension(t)]
    }, oc.getDimensionsOnCoord = function() {
        return this._dimensionsSummary.dataDimsOnCoord.slice()
    }, oc.mapDimension = function(t, e) {
        var i = this._dimensionsSummary;
        if (null == e) return i.encodeFirstDimNotExtra[t];
        var n = i.encode[t];
        return !0 === e ? (n || []).slice() : n && n[e]
    }, oc.initData = function(t, e, i) {
        (Hs.isInstance(t) || M(t)) && (t = new Tl(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, i || (this.hasItemOption = !1), this.defaultDimValueGetter = Ol[this._rawData.getSource().sourceFormat], this._dimValueGetter = i = i || this.defaultDimValueGetter, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1)
    }, oc.getProvider = function() {
        return this._rawData
    }, oc.appendData = function(t) {
        var e = this._rawData,
            i = this.count();
        e.appendData(t);
        var n = e.count();
        e.persistent || (n += i), this._initDataFromProvider(i, n)
    }, oc._initDataFromProvider = function(t, e) {
        if (!(t >= e)) {
            for (var i, n = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, h = this._nameList, u = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = f - 1, g = 0; g < s; g++) {
                c[D = o[g]] || (c[D] = pc());
                var v = l[D];
                0 === v.otherDims.itemName && (i = this._nameDimIdx = g), 0 === v.otherDims.itemId && (this._idDimIdx = g);
                var m = Qu[v.type];
                a[D] || (a[D] = []);
                var y = a[D][p];
                if (y && y.length < n) {
                    for (var x = new m(Math.min(e - p * n, n)), _ = 0; _ < y.length; _++) x[_] = y[_];
                    a[D][p] = x
                }
                for (var w = f * n; w < e; w += n) a[D].push(new m(Math.min(e - w, n)));
                this._chunkCount = a[D].length
            }
            for (var b, M, T = new Array(s), I = t; I < e; I++) {
                T = r.getItem(I, T);
                var C = Math.floor(I / n),
                    A = I % n;
                for (w = 0; w < s; w++) {
                    var D, k = a[D = o[w]][C],
                        P = this._dimValueGetter(T, D, I, w);
                    k[A] = P;
                    var L = c[D];
                    P < L[0] && (L[0] = P), P > L[1] && (L[1] = P)
                }
                if (!r.pure) {
                    var O = h[I];
                    if (T && null == O)
                        if (null != T.name) h[I] = O = T.name;
                        else if (null != i) {
                        var E = o[i],
                            N = a[E][C];
                        if (N) {
                            O = N[A];
                            var R = l[E].ordinalMeta;
                            R && R.categories.length && (O = R.categories[O])
                        }
                    }
                    var B = null == T ? null : T.id;
                    null == B && null != O && (d[O] = d[O] || 0, B = O, d[O] > 0 && (B += "__ec__" + d[O]), d[O]++), null != B && (u[I] = B)
                }
            }!r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, S(M = (b = this)._invertedIndicesMap, function(t, e) {
                var i = b._dimensionInfos[e],
                    n = i.ordinalMeta;
                if (n) {
                    t = M[e] = new Ju(n.categories.length);
                    for (var r = 0; r < t.length; r++) t[r] = NaN;
                    for (var r = 0; r < b._count; r++) t[b.get(e, r)] = r
                }
            })
        }
    }, oc.count = function() {
        return this._count
    }, oc.getIndices = function() {
        var t = this._indices;
        if (t) {
            var e = t.constructor,
                i = this._count;
            if (e === Array) {
                r = new e(i);
                for (var n = 0; n < i; n++) r[n] = t[n]
            } else r = new e(t.buffer, 0, i)
        } else {
            var r = new(e = ec(this))(this.count());
            for (n = 0; n < r.length; n++) r[n] = n
        }
        return r
    }, oc.get = function(t, e) {
        if (!(e >= 0 && e < this._count)) return NaN;
        var i = this._storage;
        if (!i[t]) return NaN;
        e = this.getRawIndex(e);
        var n = Math.floor(e / this._chunkSize),
            r = e % this._chunkSize;
        return i[t][n][r]
    }, oc.getByRawIndex = function(t, e) {
        if (!(e >= 0 && e < this._rawCount)) return NaN;
        var i = this._storage[t];
        if (!i) return NaN;
        var n = Math.floor(e / this._chunkSize),
            r = e % this._chunkSize;
        return i[n][r]
    }, oc._getFast = function(t, e) {
        var i = Math.floor(e / this._chunkSize),
            n = e % this._chunkSize;
        return this._storage[t][i][n]
    }, oc.getValues = function(t, e) {
        var i = [];
        D(t) || (e = t, t = this.dimensions);
        for (var n = 0, r = t.length; n < r; n++) i.push(this.get(t[n], e));
        return i
    }, oc.hasValue = function(t) {
        for (var e = this._dimensionsSummary.dataDimsOnCoord, i = this._dimensionInfos, n = 0, r = e.length; n < r; n++)
            if ("ordinal" !== i[e[n]].type && isNaN(this.get(e[n], t))) return !1;
        return !0
    }, oc.getDataExtent = function(t) {
        t = this.getDimension(t);
        var e = this._storage[t],
            i = pc();
        if (!e) return i;
        var n, r = this.count();
        if (!this._indices) return this._rawExtent[t].slice();
        if (n = this._extent[t]) return n.slice();
        for (var a = (n = i)[0], o = n[1], s = 0; s < r; s++) {
            var l = this._getFast(t, this.getRawIndex(s));
            l < a && (a = l), l > o && (o = l)
        }
        return n = [a, o], this._extent[t] = n, n
    }, oc.getApproximateExtent = function(t) {
        return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t)
    }, oc.setApproximateExtent = function(t, e) {
        e = this.getDimension(e), this._approximateExtent[e] = t.slice()
    }, oc.getCalculationInfo = function(t) {
        return this._calculationInfo[t]
    }, oc.setCalculationInfo = function(t, e) {
        Ku(t) ? v(this._calculationInfo, t) : this._calculationInfo[t] = e
    }, oc.getSum = function(t) {
        var e = 0;
        if (this._storage[t])
            for (var i = 0, n = this.count(); i < n; i++) {
                var r = this.get(t, i);
                isNaN(r) || (e += r)
            }
        return e
    }, oc.getMedian = function(t) {
        var e = [];
        this.each(t, function(t, i) {
            isNaN(t) || e.push(t)
        });
        var i = [].concat(e).sort(function(t, e) {
                return t - e
            }),
            n = this.count();
        return 0 === n ? 0 : n % 2 == 1 ? i[(n - 1) / 2] : (i[n / 2] + i[n / 2 - 1]) / 2
    }, oc.rawIndexOf = function(t, e) {
        var i = (t && this._invertedIndicesMap[t])[e];
        return null == i || isNaN(i) ? -1 : i
    }, oc.indexOfName = function(t) {
        for (var e = 0, i = this.count(); e < i; e++)
            if (this.getName(e) === t) return e;
        return -1
    }, oc.indexOfRawIndex = function(t) {
        if (!this._indices) return t;
        if (t >= this._rawCount || t < 0) return -1;
        var e = this._indices,
            i = e[t];
        if (null != i && i < this._count && i === t) return t;
        for (var n = 0, r = this._count - 1; n <= r;) {
            var a = (n + r) / 2 | 0;
            if (e[a] < t) n = a + 1;
            else {
                if (!(e[a] > t)) return a;
                r = a - 1
            }
        }
        return -1
    }, oc.indicesOfNearest = function(t, e, i) {
        var n = [];
        if (!this._storage[t]) return n;
        null == i && (i = 1 / 0);
        for (var r = Number.MAX_VALUE, a = -1, o = 0, s = this.count(); o < s; o++) {
            var l = e - this.get(t, o),
                h = Math.abs(l);
            l <= i && h <= r && ((h < r || l >= 0 && a < 0) && (r = h, a = l, n.length = 0), n.push(o))
        }
        return n
    }, oc.getRawIndex = lc, oc.getRawDataItem = function(t) {
        if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
        for (var e = [], i = 0; i < this.dimensions.length; i++) {
            var n = this.dimensions[i];
            e.push(this.get(n, t))
        }
        return e
    }, oc.getName = function(t) {
        var e = this.getRawIndex(t);
        return this._nameList[e] || sc(this, this._nameDimIdx, e) || ""
    }, oc.getId = function(t) {
        return uc(this, this.getRawIndex(t))
    }, oc.each = function(t, e, i, n) {
        if (this._count) {
            "function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this;
            for (var r = (t = T(cc(t), this.getDimension, this)).length, a = 0; a < this.count(); a++) switch (r) {
                case 0:
                    e.call(i, a);
                    break;
                case 1:
                    e.call(i, this.get(t[0], a), a);
                    break;
                case 2:
                    e.call(i, this.get(t[0], a), this.get(t[1], a), a);
                    break;
                default:
                    for (var o = 0, s = []; o < r; o++) s[o] = this.get(t[o], a);
                    s[o] = a, e.apply(i, s)
            }
        }
    }, oc.filterSelf = function(t, e, i, n) {
        if (this._count) {
            "function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this, t = T(cc(t), this.getDimension, this);
            for (var r = this.count(), a = new(ec(this))(r), o = [], s = t.length, l = 0, h = t[0], u = 0; u < r; u++) {
                var c, d = this.getRawIndex(u);
                if (0 === s) c = e.call(i, u);
                else if (1 === s) {
                    var f = this._getFast(h, d);
                    c = e.call(i, f, u)
                } else {
                    for (var p = 0; p < s; p++) o[p] = this._getFast(h, d);
                    o[p] = u, c = e.apply(i, o)
                }
                c && (a[l++] = d)
            }
            return l < r && (this._indices = a), this._count = l, this._extent = {}, this.getRawIndex = this._indices ? hc : lc, this
        }
    }, oc.selectRange = function(t) {
        if (this._count) {
            var e = [];
            for (var i in t) t.hasOwnProperty(i) && e.push(i);
            var n = e.length;
            if (n) {
                var r = this.count(),
                    a = new(ec(this))(r),
                    o = 0,
                    s = e[0],
                    l = t[s][0],
                    h = t[s][1],
                    u = !1;
                if (!this._indices) {
                    var c = 0;
                    if (1 === n) {
                        for (var d = this._storage[e[0]], f = 0; f < this._chunkCount; f++)
                            for (var p = d[f], g = Math.min(this._count - f * this._chunkSize, this._chunkSize), v = 0; v < g; v++) {
                                ((w = p[v]) >= l && w <= h || isNaN(w)) && (a[o++] = c), c++
                            }
                        u = !0
                    } else if (2 === n) {
                        d = this._storage[s];
                        var m = this._storage[e[1]],
                            y = t[e[1]][0],
                            x = t[e[1]][1];
                        for (f = 0; f < this._chunkCount; f++) {
                            p = d[f];
                            var _ = m[f];
                            for (g = Math.min(this._count - f * this._chunkSize, this._chunkSize), v = 0; v < g; v++) {
                                var w = p[v],
                                    b = _[v];
                                (w >= l && w <= h || isNaN(w)) && (b >= y && b <= x || isNaN(b)) && (a[o++] = c), c++
                            }
                        }
                        u = !0
                    }
                }
                if (!u)
                    if (1 === n)
                        for (v = 0; v < r; v++) {
                            var M = this.getRawIndex(v);
                            ((w = this._getFast(s, M)) >= l && w <= h || isNaN(w)) && (a[o++] = M)
                        } else
                            for (v = 0; v < r; v++) {
                                var S = !0;
                                for (M = this.getRawIndex(v), f = 0; f < n; f++) {
                                    var T = e[f];
                                    ((w = this._getFast(i, M)) < t[T][0] || w > t[T][1]) && (S = !1)
                                }
                                S && (a[o++] = this.getRawIndex(v))
                            }
                    return o < r && (this._indices = a), this._count = o, this._extent = {}, this.getRawIndex = this._indices ? hc : lc, this
            }
        }
    }, oc.mapArray = function(t, e, i, n) {
        "function" == typeof t && (n = i, i = e, e = t, t = []), i = i || n || this;
        var r = [];
        return this.each(t, function() {
            r.push(e && e.apply(this, arguments))
        }, i), r
    }, oc.map = function(t, e, i, n) {
        i = i || n || this;
        var r = dc(this, t = T(cc(t), this.getDimension, this));
        r._indices = this._indices, r.getRawIndex = r._indices ? hc : lc;
        for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, h = this.count(), u = [], c = r._rawExtent, d = 0; d < h; d++) {
            for (var f = 0; f < l; f++) u[f] = this.get(t[f], d);
            u[l] = d;
            var p = e && e.apply(i, u);
            if (null != p) {
                "object" != typeof p && (o[0] = p, p = o);
                for (var g = this.getRawIndex(d), v = Math.floor(g / s), m = g % s, y = 0; y < p.length; y++) {
                    var x = t[y],
                        _ = p[y],
                        w = c[x],
                        b = a[x];
                    b && (b[v][m] = _), _ < w[0] && (w[0] = _), _ > w[1] && (w[1] = _)
                }
            }
        }
        return r
    }, oc.downSample = function(t, e, i, n) {
        for (var r = dc(this, [t]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], h = this.count(), u = this._chunkSize, c = r._rawExtent[t], d = new(ec(this))(h), f = 0, p = 0; p < h; p += s) {
            s > h - p && (s = h - p, o.length = s);
            for (var g = 0; g < s; g++) {
                var v = this.getRawIndex(p + g),
                    m = Math.floor(v / u),
                    y = v % u;
                o[g] = l[m][y]
            }
            var x = i(o),
                _ = this.getRawIndex(Math.min(p + n(o, x) || 0, h - 1)),
                w = _ % u;
            l[Math.floor(_ / u)][w] = x, x < c[0] && (c[0] = x), x > c[1] && (c[1] = x), d[f++] = _
        }
        return r._count = f, r._indices = d, r.getRawIndex = hc, r
    }, oc.getItemModel = function(t) {
        var e = this.hostModel;
        return new Go(this.getRawDataItem(t), e, e && e.ecModel)
    }, oc.diff = function(t) {
        var e = this;
        return new Yu(t ? t.getIndices() : [], this.getIndices(), function(e) {
            return uc(t, e)
        }, function(t) {
            return uc(e, t)
        })
    }, oc.getVisual = function(t) {
        var e = this._visual;
        return e && e[t]
    }, oc.setVisual = function(t, e) {
        if (Ku(t))
            for (var i in t) t.hasOwnProperty(i) && this.setVisual(i, t[i]);
        else this._visual = this._visual || {}, this._visual[t] = e
    }, oc.setLayout = function(t, e) {
        if (Ku(t))
            for (var i in t) t.hasOwnProperty(i) && this.setLayout(i, t[i]);
        else this._layout[t] = e
    }, oc.getLayout = function(t) {
        return this._layout[t]
    }, oc.getItemLayout = function(t) {
        return this._itemLayouts[t]
    }, oc.setItemLayout = function(t, e, i) {
        this._itemLayouts[t] = i ? v(this._itemLayouts[t] || {}, e) : e
    }, oc.clearItemLayouts = function() {
        this._itemLayouts.length = 0
    }, oc.getItemVisual = function(t, e, i) {
        var n = this._itemVisuals[t],
            r = n && n[e];
        return null != r || i ? r : this.getVisual(e)
    }, oc.setItemVisual = function(t, e, i) {
        var n = this._itemVisuals[t] || {},
            r = this.hasItemVisual;
        if (this._itemVisuals[t] = n, Ku(e))
            for (var a in e) e.hasOwnProperty(a) && (n[a] = e[a], r[a] = !0);
        else n[e] = i, r[e] = !0
    }, oc.clearAllVisual = function() {
        this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {}
    };
    var gc = function(t) {
        t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType
    };

    function vc(t, e, i) {
        Hs.isInstance(e) || (e = Hs.seriesDataToSource(e)), i = i || {}, t = (t || []).slice();
        for (var n = (i.dimsDef || []).slice(), r = Z(i.encodeDef), a = Z(), o = Z(), s = [], l = function(t, e, i, n) {
                var r = Math.max(t.dimensionsDetectCount || 1, e.length, i.length, n || 0);
                return S(e, function(t) {
                    var e = t.dimsDef;
                    e && (r = Math.max(r, e.length))
                }), r
            }(e, t, n, i.dimCount), h = 0; h < l; h++) {
            var u = n[h] = v({}, L(n[h]) ? n[h] : {
                    name: n[h]
                }),
                c = u.name,
                d = s[h] = {
                    otherDims: {}
                };
            null != c && null == a.get(c) && (d.name = d.displayName = c, a.set(c, h)), null != u.type && (d.type = u.type), null != u.displayName && (d.displayName = u.displayName)
        }
        r.each(function(t, e) {
            t = In(t).slice();
            var i = r.set(e, []);
            S(t, function(t, n) {
                P(t) && (t = a.get(t)), null != t && t < l && (i[n] = t, g(s[t], e, n))
            })
        });
        var f = 0;

        function g(t, e, i) {
            null != ju.get(e) ? t.otherDims[e] = i : (t.coordDim = e, t.coordDimIndex = i, o.set(e, !0))
        }
        S(t, function(t, e) {
            var i, n, a;
            if (P(t)) i = t, t = {};
            else {
                i = t.name;
                var o = t.ordinalMeta;
                t.ordinalMeta = null, (t = p(t)).ordinalMeta = o, n = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null
            }
            var l = In(r.get(i));
            if (!l.length)
                for (var h = 0; h < (n && n.length || 1); h++) {
                    for (; f < s.length && null != s[f].coordDim;) f++;
                    f < s.length && l.push(f++)
                }
            S(l, function(e, r) {
                var o = s[e];
                if (g(m(o, t), i, r), null == o.name && n) {
                    var l = n[r];
                    !L(l) && (l = {
                        name: l
                    }), o.name = o.displayName = l.name, o.defaultTooltip = l.defaultTooltip
                }
                a && m(o.otherDims, a)
            })
        });
        var y = i.generateCoord,
            x = i.generateCoordCount,
            _ = null != x;
        x = y ? x || 1 : 0;
        for (var w = y || "value", b = 0; b < l; b++) {
            null == (d = s[b] = s[b] || {}).coordDim && (d.coordDim = mc(w, o, _), d.coordDimIndex = 0, (!y || x <= 0) && (d.isExtraCoord = !0), x--), null == d.name && (d.name = mc(d.coordDim, a)), null == d.type && Us(e, b, d.name) && (d.type = "ordinal")
        }
        return s
    }

    function mc(t, e, i) {
        if (i || null != e.get(t)) {
            for (var n = 0; null != e.get(t + n);) n++;
            t += n
        }
        return e.set(t, !0), t
    }
    oc.setItemGraphicEl = function(t, e) {
        var i = this.hostModel;
        e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = i && i.seriesIndex, "group" === e.type && e.traverse(gc, e)), this._graphicEls[t] = e
    }, oc.getItemGraphicEl = function(t) {
        return this._graphicEls[t]
    }, oc.eachItemGraphicEl = function(t, e) {
        S(this._graphicEls, function(i, n) {
            i && t && t.call(e, i, n)
        })
    }, oc.cloneShallow = function(t) {
        if (!t) {
            var e = T(this.dimensions, this.getDimensionInfo, this);
            t = new ac(e, this.hostModel)
        }
        if (t._storage = this._storage, rc(t, this), this._indices) {
            var i = this._indices.constructor;
            t._indices = new i(this._indices)
        } else t._indices = null;
        return t.getRawIndex = t._indices ? hc : lc, t
    }, oc.wrapMethod = function(t, e) {
        var i = this[t];
        "function" == typeof i && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
            var t = i.apply(this, arguments);
            return e.apply(this, [t].concat(V(arguments)))
        })
    }, oc.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], oc.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
    var yc = function(t, e) {
        return vc((e = e || {}).coordDimensions || [], t, {
            dimsDef: e.dimensionsDefine || t.dimensionsDefine,
            encodeDef: e.encodeDefine || t.encodeDefine,
            dimCount: e.dimensionsCount,
            generateCoord: e.generateCoord,
            generateCoordCount: e.generateCoordCount
        })
    };

    function xc(t, e) {
        return !!e && e === t.getCalculationInfo("stackedDimension")
    }

    function _c(t, e) {
        return xc(t, e) ? t.getCalculationInfo("stackResultDimension") : e
    }

    function wc(t, e, i) {
        i = i || {}, Hs.isInstance(t) || (t = Hs.seriesDataToSource(t));
        var n, r = e.get("coordinateSystem"),
            a = el.get(r),
            o = ks(e);
        o && (n = T(o.coordSysDims, function(t) {
            var e = {
                    name: t
                },
                i = o.axisMap.get(t);
            if (i) {
                var n = i.get("type");
                e.type = function(t) {
                    return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
                }(n)
            }
            return e
        })), n || (n = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || ["x", "y"]);
        var s, l, h = yc(t, {
            coordDimensions: n,
            generateCoord: i.generateCoord
        });
        o && S(h, function(t, e) {
            var i = t.coordDim,
                n = o.categoryAxisMap.get(i);
            n && (null == s && (s = e), t.ordinalMeta = n.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0)
        }), l || null == s || (h[s].otherDims.itemName = 0);
        var u = function(t, e, i) {
                var n, r, a, o, s = (i = i || {}).byIndex,
                    l = i.stackedCoordDimension,
                    h = !(!t || !t.get("stack"));
                if (S(e, function(t, i) {
                        P(t) && (e[i] = t = {
                            name: t
                        }), h && !t.isExtraCoord && (s || n || !t.ordinalMeta || (n = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t))
                    }), !r || s || n || (s = !0), r) {
                    a = "__\0ecstackresult", o = "__\0ecstackedover", n && (n.createInvertedIndices = !0);
                    var u = r.coordDim,
                        c = r.type,
                        d = 0;
                    S(e, function(t) {
                        t.coordDim === u && d++
                    }), e.push({
                        name: a,
                        coordDim: u,
                        coordDimIndex: d,
                        type: c,
                        isExtraCoord: !0,
                        isCalculationCoord: !0
                    }), d++, e.push({
                        name: o,
                        coordDim: o,
                        coordDimIndex: d,
                        type: c,
                        isExtraCoord: !0,
                        isCalculationCoord: !0
                    })
                }
                return {
                    stackedDimension: r && r.name,
                    stackedByDimension: n && n.name,
                    isStackedByIndex: s,
                    stackedOverDimension: o,
                    stackResultDimension: a
                }
            }(e, h),
            c = new ac(h, e);
        c.setCalculationInfo(u);
        var d = null != s && function(t) {
            if (t.sourceFormat === Os) {
                var e = function(t) {
                    var e = 0;
                    for (; e < t.length && null == t[e];) e++;
                    return t[e]
                }(t.data || []);
                return null != e && !D(Dn(e))
            }
        }(t) ? function(t, e, i, n) {
            return n === s ? i : this.defaultDimValueGetter(t, e, i, n)
        } : null;
        return c.hasItemOption = !1, c.initData(t, null, d), c
    }
    Xl.extend({
        type: "series.line",
        dependencies: ["grid", "polar"],
        getInitialData: function(t, e) {
            return wc(this.getSource(), this)
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            hoverAnimation: !0,
            clipOverflow: !0,
            label: {
                position: "top"
            },
            lineStyle: {
                width: 2,
                type: "solid"
            },
            step: !1,
            smooth: !1,
            smoothMonotone: null,
            symbol: "emptyCircle",
            symbolSize: 4,
            symbolRotate: null,
            showSymbol: !0,
            showAllSymbol: "auto",
            connectNulls: !1,
            sampling: "none",
            animationEasing: "linear",
            progressive: 0,
            hoverLayerThreshold: 1 / 0
        }
    });
    var bc = eo({
            type: "triangle",
            shape: {
                cx: 0,
                cy: 0,
                width: 0,
                height: 0
            },
            buildPath: function(t, e) {
                var i = e.cx,
                    n = e.cy,
                    r = e.width / 2,
                    a = e.height / 2;
                t.moveTo(i, n - a), t.lineTo(i + r, n + a), t.lineTo(i - r, n + a), t.closePath()
            }
        }),
        Mc = eo({
            type: "diamond",
            shape: {
                cx: 0,
                cy: 0,
                width: 0,
                height: 0
            },
            buildPath: function(t, e) {
                var i = e.cx,
                    n = e.cy,
                    r = e.width / 2,
                    a = e.height / 2;
                t.moveTo(i, n - a), t.lineTo(i + r, n), t.lineTo(i, n + a), t.lineTo(i - r, n), t.closePath()
            }
        }),
        Sc = eo({
            type: "pin",
            shape: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            buildPath: function(t, e) {
                var i = e.x,
                    n = e.y,
                    r = e.width / 5 * 3,
                    a = Math.max(r, e.height),
                    o = r / 2,
                    s = o * o / (a - o),
                    l = n - a + o + s,
                    h = Math.asin(s / o),
                    u = Math.cos(h) * o,
                    c = Math.sin(h),
                    d = Math.cos(h),
                    f = .6 * o,
                    p = .7 * o;
                t.moveTo(i - u, l + s), t.arc(i, l, o, Math.PI - h, 2 * Math.PI + h), t.bezierCurveTo(i + u - c * f, l + s + d * f, i, n - p, i, n), t.bezierCurveTo(i, n - p, i - u + c * f, l + s + d * f, i - u, l + s), t.closePath()
            }
        }),
        Tc = eo({
            type: "arrow",
            shape: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            buildPath: function(t, e) {
                var i = e.height,
                    n = e.width,
                    r = e.x,
                    a = e.y,
                    o = n / 3 * 2;
                t.moveTo(r, a), t.lineTo(r + o, a + i), t.lineTo(r, a + i / 4 * 3), t.lineTo(r - o, a + i), t.lineTo(r, a), t.closePath()
            }
        }),
        Ic = {
            line: function(t, e, i, n, r) {
                r.x1 = t, r.y1 = e + n / 2, r.x2 = t + i, r.y2 = e + n / 2
            },
            rect: function(t, e, i, n, r) {
                r.x = t, r.y = e, r.width = i, r.height = n
            },
            roundRect: function(t, e, i, n, r) {
                r.x = t, r.y = e, r.width = i, r.height = n, r.r = Math.min(i, n) / 4
            },
            square: function(t, e, i, n, r) {
                var a = Math.min(i, n);
                r.x = t, r.y = e, r.width = a, r.height = a
            },
            circle: function(t, e, i, n, r) {
                r.cx = t + i / 2, r.cy = e + n / 2, r.r = Math.min(i, n) / 2
            },
            diamond: function(t, e, i, n, r) {
                r.cx = t + i / 2, r.cy = e + n / 2, r.width = i, r.height = n
            },
            pin: function(t, e, i, n, r) {
                r.x = t + i / 2, r.y = e + n / 2, r.width = i, r.height = n
            },
            arrow: function(t, e, i, n, r) {
                r.x = t + i / 2, r.y = e + n / 2, r.width = i, r.height = n
            },
            triangle: function(t, e, i, n, r) {
                r.cx = t + i / 2, r.cy = e + n / 2, r.width = i, r.height = n
            }
        },
        Cc = {};
    S({
        line: Va,
        rect: Fa,
        roundRect: Fa,
        square: Fa,
        circle: Aa,
        diamond: Mc,
        pin: Sc,
        arrow: Tc,
        triangle: bc
    }, function(t, e) {
        Cc[e] = new t
    });
    var Ac = eo({
        type: "symbol",
        shape: {
            symbolType: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        beforeBrush: function() {
            var t = this.style;
            "pin" === this.shape.symbolType && "inside" === t.textPosition && (t.textPosition = ["50%", "40%"], t.textAlign = "center", t.textVerticalAlign = "middle")
        },
        buildPath: function(t, e, i) {
            var n = e.symbolType,
                r = Cc[n];
            "none" !== e.symbolType && (r || (r = Cc[n = "rect"]), Ic[n](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, i))
        }
    });

    function Dc(t, e) {
        if ("image" !== this.type) {
            var i = this.style,
                n = this.shape;
            n && "line" === n.symbolType ? i.stroke = t : this.__isEmptyBrush ? (i.stroke = t, i.fill = e || "#fff") : (i.fill && (i.fill = t), i.stroke && (i.stroke = t)), this.dirty(!1)
        }
    }

    function kc(t, e, i, n, r, a, o) {
        var s, l = 0 === t.indexOf("empty");
        return l && (t = t.substr(5, 1).toLowerCase() + t.substr(6)), (s = 0 === t.indexOf("image://") ? no(t.slice(8), new Ce(e, i, n, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? io(t.slice(7), {}, new Ce(e, i, n, r), o ? "center" : "cover") : new Ac({
            shape: {
                symbolType: t,
                x: e,
                y: i,
                width: n,
                height: r
            }
        })).__isEmptyBrush = l, s.setColor = Dc, s.setColor(a), s
    }

    function Pc(t, e, i) {
        Ae.call(this), this.updateData(t, e, i)
    }
    var Lc = Pc.prototype,
        Oc = Pc.getSymbolSize = function(t, e) {
            var i = t.getItemVisual(e, "symbolSize");
            return i instanceof Array ? i.slice() : [+i, +i]
        };

    function Ec(t) {
        return [t[0] / 2, t[1] / 2]
    }

    function Nc(t, e) {
        this.parent.drift(t, e)
    }
    Lc._createSymbol = function(t, e, i, n, r) {
        this.removeAll();
        var a = kc(t, -1, -1, 2, 2, e.getItemVisual(i, "color"), r);
        a.attr({
            z2: 100,
            culling: !0,
            scale: Ec(n)
        }), a.drift = Nc, this._symbolType = t, this.add(a)
    }, Lc.stopSymbolAnimation = function(t) {
        this.childAt(0).stopAnimation(t)
    }, Lc.getSymbolPath = function() {
        return this.childAt(0)
    }, Lc.getScale = function() {
        return this.childAt(0).scale
    }, Lc.highlight = function() {
        this.childAt(0).trigger("emphasis")
    }, Lc.downplay = function() {
        this.childAt(0).trigger("normal")
    }, Lc.setZ = function(t, e) {
        var i = this.childAt(0);
        i.zlevel = t, i.z = e
    }, Lc.setDraggable = function(t) {
        var e = this.childAt(0);
        e.draggable = t, e.cursor = t ? "move" : "pointer"
    }, Lc.updateData = function(t, e, i) {
        this.silent = !1;
        var n = t.getItemVisual(e, "symbol") || "circle",
            r = t.hostModel,
            a = Oc(t, e),
            o = n !== this._symbolType;
        if (o) {
            var s = t.getItemVisual(e, "symbolKeepAspect");
            this._createSymbol(n, t, e, a, s)
        } else {
            (l = this.childAt(0)).silent = !1, Po(l, {
                scale: Ec(a)
            }, r, e)
        }
        if (this._updateCommon(t, e, a, i), o) {
            var l = this.childAt(0),
                h = i && i.fadeIn,
                u = {
                    scale: l.scale.slice()
                };
            h && (u.style = {
                opacity: l.style.opacity
            }), l.scale = [0, 0], h && (l.style.opacity = 0), Lo(l, u, r, e)
        }
        this._seriesModel = r
    };
    var Rc = ["itemStyle"],
        Bc = ["emphasis", "itemStyle"],
        zc = ["label"],
        Fc = ["emphasis", "label"];

    function Vc(t) {
        this.group = new Ae, this._symbolCtor = t || Pc
    }
    Lc._updateCommon = function(t, e, i, n) {
        var r = this.childAt(0),
            a = t.hostModel,
            o = t.getItemVisual(e, "color");
        "image" !== r.type && r.useStyle({
            strokeNoScale: !0
        });
        var s = n && n.itemStyle,
            l = n && n.hoverItemStyle,
            h = n && n.symbolRotate,
            u = n && n.symbolOffset,
            c = n && n.labelModel,
            d = n && n.hoverLabelModel,
            f = n && n.hoverAnimation,
            p = n && n.cursorStyle;
        if (!n || t.hasItemOption) {
            var g = n && n.itemModel ? n.itemModel : t.getItemModel(e);
            s = g.getModel(Rc).getItemStyle(["color"]), l = g.getModel(Bc).getItemStyle(), h = g.getShallow("symbolRotate"), u = g.getShallow("symbolOffset"), c = g.getModel(zc), d = g.getModel(Fc), f = g.getShallow("hoverAnimation"), p = g.getShallow("cursor")
        } else l = v({}, l);
        var m = r.style;
        r.attr("rotation", (h || 0) * Math.PI / 180 || 0), u && r.attr("position", [Ko(u[0], i[0]), Ko(u[1], i[1])]), p && r.attr("cursor", p), r.setColor(o, n && n.symbolInnerColor), r.setStyle(s);
        var y = t.getItemVisual(e, "opacity");
        null != y && (m.opacity = y);
        var x = t.getItemVisual(e, "liftZ"),
            _ = r.__z2Origin;
        null != x ? null == _ && (r.__z2Origin = r.z2, r.z2 += x) : null != _ && (r.z2 = _, r.__z2Origin = null);
        var w = n && n.useNameLabel;
        Mo(m, l, c, d, {
            labelFetcher: a,
            labelDataIndex: e,
            defaultText: function(e, i) {
                return w ? t.getName(e) : function(t, e) {
                    var i = t.mapDimension("defaultedLabel", !0),
                        n = i.length;
                    if (1 === n) return Rl(t, e, i[0]);
                    if (n) {
                        for (var r = [], a = 0; a < i.length; a++) {
                            var o = Rl(t, e, i[a]);
                            r.push(o)
                        }
                        return r.join(" ")
                    }
                }(t, e)
            },
            isRectText: !0,
            autoColor: o
        }), r.off("mouseover").off("mouseout").off("emphasis").off("normal"), r.hoverStyle = l, bo(r);
        var b = Ec(i);
        if (f && a.isAnimationEnabled()) {
            var M = function() {
                    if (!this.incremental) {
                        var t = b[1] / b[0];
                        this.animateTo({
                            scale: [Math.max(1.1 * b[0], b[0] + 3), Math.max(1.1 * b[1], b[1] + 3 * t)]
                        }, 400, "elasticOut")
                    }
                },
                S = function() {
                    this.incremental || this.animateTo({
                        scale: b
                    }, 400, "elasticOut")
                };
            r.on("mouseover", M).on("mouseout", S).on("emphasis", M).on("normal", S)
        }
    }, Lc.fadeOut = function(t, e) {
        var i = this.childAt(0);
        this.silent = i.silent = !0, (!e || !e.keepLabel) && (i.style.text = null), Po(i, {
            style: {
                opacity: 0
            },
            scale: [0, 0]
        }, this._seriesModel, this.dataIndex, t)
    }, w(Pc, Ae);
    var Hc = Vc.prototype;

    function Wc(t, e, i, n) {
        return e && !isNaN(e[0]) && !isNaN(e[1]) && !(n.isIgnore && n.isIgnore(i)) && !(n.clipShape && !n.clipShape.contain(e[0], e[1])) && "none" !== t.getItemVisual(i, "symbol")
    }

    function Gc(t) {
        return null == t || L(t) || (t = {
            isIgnore: t
        }), t || {}
    }

    function qc(t) {
        var e = t.hostModel;
        return {
            itemStyle: e.getModel("itemStyle").getItemStyle(["color"]),
            hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
            symbolRotate: e.get("symbolRotate"),
            symbolOffset: e.get("symbolOffset"),
            hoverAnimation: e.get("hoverAnimation"),
            labelModel: e.getModel("label"),
            hoverLabelModel: e.getModel("emphasis.label"),
            cursorStyle: e.get("cursor")
        }
    }

    function Xc(t, e, i) {
        var n, r = t.getBaseAxis(),
            a = t.getOtherAxis(r),
            o = function(t, e) {
                var i = 0,
                    n = t.scale.getExtent();
                "start" === e ? i = n[0] : "end" === e ? i = n[1] : n[0] > 0 ? i = n[0] : n[1] < 0 && (i = n[1]);
                return i
            }(a, i),
            s = r.dim,
            l = a.dim,
            h = e.mapDimension(l),
            u = e.mapDimension(s),
            c = "x" === l || "radius" === l ? 1 : 0,
            d = T(t.dimensions, function(t) {
                return e.mapDimension(t)
            }),
            f = e.getCalculationInfo("stackResultDimension");
        return (n |= xc(e, d[0])) && (d[0] = f), (n |= xc(e, d[1])) && (d[1] = f), {
            dataDimsForPoint: d,
            valueStart: o,
            valueAxisDim: l,
            baseAxisDim: s,
            stacked: !!n,
            valueDim: h,
            baseDim: u,
            baseDataOffset: c,
            stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
        }
    }

    function Uc(t, e, i, n) {
        var r = NaN;
        t.stacked && (r = i.get(i.getCalculationInfo("stackedOverDimension"), n)), isNaN(r) && (r = t.valueStart);
        var a = t.baseDataOffset,
            o = [];
        return o[a] = i.get(t.baseDim, n), o[1 - a] = r, e.dataToPoint(o)
    }
    Hc.updateData = function(t, e) {
        e = Gc(e);
        var i = this.group,
            n = t.hostModel,
            r = this._data,
            a = this._symbolCtor,
            o = qc(t);
        r || i.removeAll(), t.diff(r).add(function(n) {
            var r = t.getItemLayout(n);
            if (Wc(t, r, n, e)) {
                var s = new a(t, n, o);
                s.attr("position", r), t.setItemGraphicEl(n, s), i.add(s)
            }
        }).update(function(s, l) {
            var h = r.getItemGraphicEl(l),
                u = t.getItemLayout(s);
            Wc(t, u, s, e) ? (h ? (h.updateData(t, s, o), Po(h, {
                position: u
            }, n)) : (h = new a(t, s)).attr("position", u), i.add(h), t.setItemGraphicEl(s, h)) : i.remove(h)
        }).remove(function(t) {
            var e = r.getItemGraphicEl(t);
            e && e.fadeOut(function() {
                i.remove(e)
            })
        }).execute(), this._data = t
    }, Hc.isPersistent = function() {
        return !0
    }, Hc.updateLayout = function() {
        var t = this._data;
        t && t.eachItemGraphicEl(function(e, i) {
            var n = t.getItemLayout(i);
            e.attr("position", n)
        })
    }, Hc.incrementalPrepareUpdate = function(t) {
        this._seriesScope = qc(t), this._data = null, this.group.removeAll()
    }, Hc.incrementalUpdate = function(t, e, i) {
        function n(t) {
            t.isGroup || (t.incremental = t.useHoverLayer = !0)
        }
        i = Gc(i);
        for (var r = t.start; r < t.end; r++) {
            var a = e.getItemLayout(r);
            if (Wc(e, a, r, i)) {
                var o = new this._symbolCtor(e, r, this._seriesScope);
                o.traverse(n), o.attr("position", a), this.group.add(o), e.setItemGraphicEl(r, o)
            }
        }
    }, Hc.remove = function(t) {
        var e = this.group,
            i = this._data;
        i && t ? i.eachItemGraphicEl(function(t) {
            t.fadeOut(function() {
                e.remove(t)
            })
        }) : e.removeAll()
    };
    var Yc = st,
        Zc = lt,
        jc = function(t, e, i, n) {
            return t[0] = e[0] + i[0] * n, t[1] = e[1] + i[1] * n, t
        },
        Kc = function(t, e) {
            return t[0] = e[0], t[1] = e[1], t
        },
        $c = [],
        Qc = [],
        Jc = [];

    function td(t) {
        return isNaN(t[0]) || isNaN(t[1])
    }

    function ed(t, e, i, n, r, a, o, s, l, h, u) {
        return "none" !== h && h ? function(t, e, i, n, r, a, o, s, l, h, u) {
            for (var c = 0, d = i, f = 0; f < n; f++) {
                var p = e[d];
                if (d >= r || d < 0) break;
                if (td(p)) {
                    if (u) {
                        d += a;
                        continue
                    }
                    break
                }
                if (d === i) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]);
                else if (l > 0) {
                    var g = e[c],
                        v = "y" === h ? 1 : 0,
                        m = (p[v] - g[v]) * l;
                    Kc(Qc, g), Qc[v] = g[v] + m, Kc(Jc, p), Jc[v] = p[v] - m, t.bezierCurveTo(Qc[0], Qc[1], Jc[0], Jc[1], p[0], p[1])
                } else t.lineTo(p[0], p[1]);
                c = d, d += a
            }
            return f
        }.apply(this, arguments) : function(t, e, i, n, r, a, o, s, l, h, u) {
            for (var c = 0, d = i, f = 0; f < n; f++) {
                var p = e[d];
                if (d >= r || d < 0) break;
                if (td(p)) {
                    if (u) {
                        d += a;
                        continue
                    }
                    break
                }
                if (d === i) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]), Kc(Qc, p);
                else if (l > 0) {
                    var g = d + a,
                        v = e[g];
                    if (u)
                        for (; v && td(e[g]);) v = e[g += a];
                    var m = .5,
                        y = e[c],
                        v = e[g];
                    if (!v || td(v)) Kc(Jc, p);
                    else {
                        var x, _;
                        if (td(v) && !u && (v = p), tt($c, v, y), "x" === h || "y" === h) {
                            var w = "x" === h ? 0 : 1;
                            x = Math.abs(p[w] - y[w]), _ = Math.abs(p[w] - v[w])
                        } else x = rt(p, y), _ = rt(p, v);
                        jc(Jc, p, $c, -l * (1 - (m = _ / (_ + x))))
                    }
                    Yc(Qc, Qc, s), Zc(Qc, Qc, o), Yc(Jc, Jc, s), Zc(Jc, Jc, o), t.bezierCurveTo(Qc[0], Qc[1], Jc[0], Jc[1], p[0], p[1]), jc(Qc, p, $c, l * m)
                } else t.lineTo(p[0], p[1]);
                c = d, d += a
            }
            return f
        }.apply(this, arguments)
    }

    function id(t, e) {
        var i = [1 / 0, 1 / 0],
            n = [-1 / 0, -1 / 0];
        if (e)
            for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a[0] < i[0] && (i[0] = a[0]), a[1] < i[1] && (i[1] = a[1]), a[0] > n[0] && (n[0] = a[0]), a[1] > n[1] && (n[1] = a[1])
            }
        return {
            min: e ? i : n,
            max: e ? n : i
        }
    }
    var nd = ca.extend({
            type: "ec-polyline",
            shape: {
                points: [],
                smooth: 0,
                smoothConstraint: !0,
                smoothMonotone: null,
                connectNulls: !1
            },
            style: {
                fill: null,
                stroke: "#000"
            },
            brush: ka(ca.prototype.brush),
            buildPath: function(t, e) {
                var i = e.points,
                    n = 0,
                    r = i.length,
                    a = id(i, e.smoothConstraint);
                if (e.connectNulls) {
                    for (; r > 0 && td(i[r - 1]); r--);
                    for (; n < r && td(i[n]); n++);
                }
                for (; n < r;) n += ed(t, i, n, r, r, 1, a.min, a.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1
            }
        }),
        rd = ca.extend({
            type: "ec-polygon",
            shape: {
                points: [],
                stackedOnPoints: [],
                smooth: 0,
                stackedOnSmooth: 0,
                smoothConstraint: !0,
                smoothMonotone: null,
                connectNulls: !1
            },
            brush: ka(ca.prototype.brush),
            buildPath: function(t, e) {
                var i = e.points,
                    n = e.stackedOnPoints,
                    r = 0,
                    a = i.length,
                    o = e.smoothMonotone,
                    s = id(i, e.smoothConstraint),
                    l = id(n, e.smoothConstraint);
                if (e.connectNulls) {
                    for (; a > 0 && td(i[a - 1]); a--);
                    for (; r < a && td(i[r]); r++);
                }
                for (; r < a;) {
                    var h = ed(t, i, r, a, a, 1, s.min, s.max, e.smooth, o, e.connectNulls);
                    ed(t, n, r + h - 1, h, a, -1, l.min, l.max, e.stackedOnSmooth, o, e.connectNulls), r += h + 1, t.closePath()
                }
            }
        });

    function ad(t, e) {
        if (t.length === e.length) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i],
                    r = e[i];
                if (n[0] !== r[0] || n[1] !== r[1]) return
            }
            return !0
        }
    }

    function od(t) {
        return "number" == typeof t ? t : t ? .5 : 0
    }

    function sd(t) {
        var e = t.getGlobalExtent();
        if (t.onBand) {
            var i = t.getBandWidth() / 2 - 1,
                n = e[1] > e[0] ? 1 : -1;
            e[0] += n * i, e[1] -= n * i
        }
        return e
    }

    function ld(t, e, i, n) {
        return "polar" === t.type ? function(t, e, i, n) {
            var r = t.getAngleAxis(),
                a = t.getRadiusAxis().getExtent().slice();
            a[0] > a[1] && a.reverse();
            var o = r.getExtent(),
                s = Math.PI / 180;
            i && (a[0] -= .5, a[1] += .5);
            var l = new Pa({
                shape: {
                    cx: $o(t.cx, 1),
                    cy: $o(t.cy, 1),
                    r0: $o(a[0], 1),
                    r: $o(a[1], 1),
                    startAngle: -o[0] * s,
                    endAngle: -o[1] * s,
                    clockwise: r.inverse
                }
            });
            return e && (l.shape.endAngle = -o[0] * s, Lo(l, {
                shape: {
                    endAngle: -o[1] * s
                }
            }, n)), l
        }(t, e, i, n) : function(t, e, i, n) {
            var r = sd(t.getAxis("x")),
                a = sd(t.getAxis("y")),
                o = t.getBaseAxis().isHorizontal(),
                s = Math.min(r[0], r[1]),
                l = Math.min(a[0], a[1]),
                h = Math.max(r[0], r[1]) - s,
                u = Math.max(a[0], a[1]) - l;
            if (i) s -= .5, h += .5, l -= .5, u += .5;
            else {
                var c = n.get("lineStyle.width") || 2,
                    d = n.get("clipOverflow") ? c / 2 : Math.max(h, u);
                o ? (l -= d, u += 2 * d) : (s -= d, h += 2 * d)
            }
            var f = new Fa({
                shape: {
                    x: s,
                    y: l,
                    width: h,
                    height: u
                }
            });
            return e && (f.shape[o ? "width" : "height"] = 0, Lo(f, {
                shape: {
                    width: h,
                    height: u
                }
            }, n)), f
        }(t, e, i, n)
    }

    function hd(t, e, i) {
        for (var n = e.getBaseAxis(), r = "x" === n.dim || "radius" === n.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
            var s = t[o + 1],
                l = t[o];
            a.push(l);
            var h = [];
            switch (i) {
                case "end":
                    h[r] = s[r], h[1 - r] = l[1 - r], a.push(h);
                    break;
                case "middle":
                    var u = (l[r] + s[r]) / 2,
                        c = [];
                    h[r] = c[r] = u, h[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(h), a.push(c);
                    break;
                default:
                    h[r] = l[r], h[1 - r] = s[1 - r], a.push(h)
            }
        }
        return t[o] && a.push(t[o]), a
    }

    function ud(t, e, i) {
        var n = t.get("showAllSymbol"),
            r = "auto" === n;
        if (!n || r) {
            var a = i.getAxesByScale("ordinal")[0];
            if (a && (!r || ! function(t, e) {
                    var i = t.getExtent(),
                        n = Math.abs(i[1] - i[0]) / t.scale.count();
                    isNaN(n) && (n = 0);
                    for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; o < r; o += a)
                        if (1.5 * Pc.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > n) return !1;
                    return !0
                }(a, e))) {
                var o = e.mapDimension(a.dim),
                    s = {};
                return S(a.getViewLabels(), function(t) {
                        s[t.tickValue] = 1
                    }),
                    function(t) {
                        return !s.hasOwnProperty(e.get(o, t))
                    }
            }
        }
    }
    rh.extend({
        type: "line",
        init: function() {
            var t = new Ae,
                e = new Vc;
            this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t
        },
        render: function(t, e, i) {
            var n = t.coordinateSystem,
                r = this.group,
                a = t.getData(),
                o = t.getModel("lineStyle"),
                s = t.getModel("areaStyle"),
                l = a.mapArray(a.getItemLayout),
                h = "polar" === n.type,
                u = this._coordSys,
                c = this._symbolDraw,
                d = this._polyline,
                f = this._polygon,
                p = this._lineGroup,
                g = t.get("animation"),
                v = !s.isEmpty(),
                y = s.get("origin"),
                x = function(t, e, i) {
                    if (!i.valueDim) return [];
                    for (var n = [], r = 0, a = e.count(); r < a; r++) n.push(Uc(i, t, e, r));
                    return n
                }(n, a, Xc(n, a, y)),
                _ = t.get("showSymbol"),
                w = _ && !h && ud(t, a, n),
                b = this._data;
            b && b.eachItemGraphicEl(function(t, e) {
                t.__temp && (r.remove(t), b.setItemGraphicEl(e, null))
            }), _ || c.remove(), r.add(p);
            var M = !h && t.get("step");
            d && u.type === n.type && M === this._step ? (v && !f ? f = this._newPolygon(l, x, n, g) : f && !v && (p.remove(f), f = this._polygon = null), p.setClipPath(ld(n, !1, !1, t)), _ && c.updateData(a, {
                isIgnore: w,
                clipShape: ld(n, !1, !0, t)
            }), a.eachItemGraphicEl(function(t) {
                t.stopAnimation(!0)
            }), ad(this._stackedOnPoints, x) && ad(this._points, l) || (g ? this._updateAnimation(a, x, n, i, M, y) : (M && (l = hd(l, n, M), x = hd(x, n, M)), d.setShape({
                points: l
            }), f && f.setShape({
                points: l,
                stackedOnPoints: x
            })))) : (_ && c.updateData(a, {
                isIgnore: w,
                clipShape: ld(n, !1, !0, t)
            }), M && (l = hd(l, n, M), x = hd(x, n, M)), d = this._newPolyline(l, n, g), v && (f = this._newPolygon(l, x, n, g)), p.setClipPath(ld(n, !0, !1, t)));
            var I = function(t, e) {
                var i = t.getVisual("visualMeta");
                if (i && i.length && t.count() && "cartesian2d" === e.type) {
                    for (var n, r, a = i.length - 1; a >= 0; a--) {
                        var o = i[a].dimension,
                            s = t.dimensions[o],
                            l = t.getDimensionInfo(s);
                        if ("x" === (n = l && l.coordDim) || "y" === n) {
                            r = i[a];
                            break
                        }
                    }
                    if (r) {
                        var h = e.getAxis(n),
                            u = T(r.stops, function(t) {
                                return {
                                    coord: h.toGlobalCoord(h.dataToCoord(t.value)),
                                    color: t.color
                                }
                            }),
                            c = u.length,
                            d = r.outerColors.slice();
                        c && u[0].coord > u[c - 1].coord && (u.reverse(), d.reverse());
                        var f = u[0].coord - 10,
                            p = u[c - 1].coord + 10,
                            g = p - f;
                        if (g < .001) return "transparent";
                        S(u, function(t) {
                            t.offset = (t.coord - f) / g
                        }), u.push({
                            offset: c ? u[c - 1].offset : .5,
                            color: d[1] || "transparent"
                        }), u.unshift({
                            offset: c ? u[0].offset : .5,
                            color: d[0] || "transparent"
                        });
                        var v = new Ya(0, 0, 0, 0, u, !0);
                        return v[n] = f, v[n + "2"] = p, v
                    }
                }
            }(a, n) || a.getVisual("color");
            d.useStyle(m(o.getLineStyle(), {
                fill: "none",
                stroke: I,
                lineJoin: "bevel"
            }));
            var C = t.get("smooth");
            if (C = od(t.get("smooth")), d.setShape({
                    smooth: C,
                    smoothMonotone: t.get("smoothMonotone"),
                    connectNulls: t.get("connectNulls")
                }), f) {
                var A = a.getCalculationInfo("stackedOnSeries"),
                    D = 0;
                f.useStyle(m(s.getAreaStyle(), {
                    fill: I,
                    opacity: .7,
                    lineJoin: "bevel"
                })), A && (D = od(A.get("smooth"))), f.setShape({
                    smooth: C,
                    stackedOnSmooth: D,
                    smoothMonotone: t.get("smoothMonotone"),
                    connectNulls: t.get("connectNulls")
                })
            }
            this._data = a, this._coordSys = n, this._stackedOnPoints = x, this._points = l, this._step = M, this._valueOrigin = y
        },
        dispose: function() {},
        highlight: function(t, e, i, n) {
            var r = t.getData(),
                a = On(r, n);
            if (!(a instanceof Array) && null != a && a >= 0) {
                var o = r.getItemGraphicEl(a);
                if (!o) {
                    var s = r.getItemLayout(a);
                    if (!s) return;
                    (o = new Pc(r, a)).position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o)
                }
                o.highlight()
            } else rh.prototype.highlight.call(this, t, e, i, n)
        },
        downplay: function(t, e, i, n) {
            var r = t.getData(),
                a = On(r, n);
            if (null != a && a >= 0) {
                var o = r.getItemGraphicEl(a);
                o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay())
            } else rh.prototype.downplay.call(this, t, e, i, n)
        },
        _newPolyline: function(t) {
            var e = this._polyline;
            return e && this._lineGroup.remove(e), e = new nd({
                shape: {
                    points: t
                },
                silent: !0,
                z2: 10
            }), this._lineGroup.add(e), this._polyline = e, e
        },
        _newPolygon: function(t, e) {
            var i = this._polygon;
            return i && this._lineGroup.remove(i), i = new rd({
                shape: {
                    points: t,
                    stackedOnPoints: e
                },
                silent: !0
            }), this._lineGroup.add(i), this._polygon = i, i
        },
        _updateAnimation: function(t, e, i, n, r, a) {
            var o = this._polyline,
                s = this._polygon,
                l = t.hostModel,
                h = function(t, e, i, n, r, a, o, s) {
                    for (var l = function(t, e) {
                            var i = [];
                            return e.diff(t).add(function(t) {
                                i.push({
                                    cmd: "+",
                                    idx: t
                                })
                            }).update(function(t, e) {
                                i.push({
                                    cmd: "=",
                                    idx: e,
                                    idx1: t
                                })
                            }).remove(function(t) {
                                i.push({
                                    cmd: "-",
                                    idx: t
                                })
                            }).execute(), i
                        }(t, e), h = [], u = [], c = [], d = [], f = [], p = [], g = [], v = Xc(r, e, o), m = Xc(a, t, s), y = 0; y < l.length; y++) {
                        var x = l[y],
                            _ = !0;
                        switch (x.cmd) {
                            case "=":
                                var w = t.getItemLayout(x.idx),
                                    b = e.getItemLayout(x.idx1);
                                (isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), h.push(w), u.push(b), c.push(i[x.idx]), d.push(n[x.idx1]), g.push(e.getRawIndex(x.idx1));
                                break;
                            case "+":
                                var M = x.idx;
                                h.push(r.dataToPoint([e.get(v.dataDimsForPoint[0], M), e.get(v.dataDimsForPoint[1], M)])), u.push(e.getItemLayout(M).slice()), c.push(Uc(v, r, e, M)), d.push(n[M]), g.push(e.getRawIndex(M));
                                break;
                            case "-":
                                M = x.idx;
                                var S = t.getRawIndex(M);
                                S !== M ? (h.push(t.getItemLayout(M)), u.push(a.dataToPoint([t.get(m.dataDimsForPoint[0], M), t.get(m.dataDimsForPoint[1], M)])), c.push(i[M]), d.push(Uc(m, a, t, M)), g.push(S)) : _ = !1
                        }
                        _ && (f.push(x), p.push(p.length))
                    }
                    p.sort(function(t, e) {
                        return g[t] - g[e]
                    });
                    var T = [],
                        I = [],
                        C = [],
                        A = [],
                        D = [];
                    for (y = 0; y < p.length; y++) M = p[y], T[y] = h[M], I[y] = u[M], C[y] = c[M], A[y] = d[M], D[y] = f[M];
                    return {
                        current: T,
                        next: I,
                        stackedOnCurrent: C,
                        stackedOnNext: A,
                        status: D
                    }
                }(this._data, t, this._stackedOnPoints, e, this._coordSys, i, this._valueOrigin, a),
                u = h.current,
                c = h.stackedOnCurrent,
                d = h.next,
                f = h.stackedOnNext;
            r && (u = hd(h.current, i, r), c = hd(h.stackedOnCurrent, i, r), d = hd(h.next, i, r), f = hd(h.stackedOnNext, i, r)), o.shape.__points = h.current, o.shape.points = u, Po(o, {
                shape: {
                    points: d
                }
            }, l), s && (s.setShape({
                points: u,
                stackedOnPoints: c
            }), Po(s, {
                shape: {
                    points: d,
                    stackedOnPoints: f
                }
            }, l));
            for (var p = [], g = h.status, v = 0; v < g.length; v++) {
                if ("=" === g[v].cmd) {
                    var m = t.getItemGraphicEl(g[v].idx1);
                    m && p.push({
                        el: m,
                        ptIdx: v
                    })
                }
            }
            o.animators && o.animators.length && o.animators[0].during(function() {
                for (var t = 0; t < p.length; t++) {
                    p[t].el.attr("position", o.shape.__points[p[t].ptIdx])
                }
            })
        },
        remove: function(t) {
            var e = this.group,
                i = this._data;
            this._lineGroup.removeAll(), this._symbolDraw.remove(!0), i && i.eachItemGraphicEl(function(t, n) {
                t.__temp && (e.remove(t), i.setItemGraphicEl(n, null))
            }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
        }
    });
    var cd = function(t, e, i) {
            return {
                seriesType: t,
                performRawSeries: !0,
                reset: function(t, n, r) {
                    var a = t.getData(),
                        o = t.get("symbol") || e,
                        s = t.get("symbolSize"),
                        l = t.get("symbolKeepAspect");
                    if (a.setVisual({
                            legendSymbol: i || o,
                            symbol: o,
                            symbolSize: s,
                            symbolKeepAspect: l
                        }), !n.isSeriesFiltered(t)) {
                        var h = "function" == typeof s;
                        return {
                            dataEach: a.hasItemOption || h ? function(e, i) {
                                if ("function" == typeof s) {
                                    var n = t.getRawValue(i),
                                        r = t.getDataParams(i);
                                    e.setItemVisual(i, "symbolSize", s(n, r))
                                }
                                if (e.hasItemOption) {
                                    var a = e.getItemModel(i),
                                        o = a.getShallow("symbol", !0),
                                        l = a.getShallow("symbolSize", !0),
                                        h = a.getShallow("symbolKeepAspect", !0);
                                    null != o && e.setItemVisual(i, "symbol", o), null != l && e.setItemVisual(i, "symbolSize", l), null != h && e.setItemVisual(i, "symbolKeepAspect", h)
                                }
                            } : null
                        }
                    }
                }
            }
        },
        dd = function(t) {
            return {
                seriesType: t,
                plan: eh(),
                reset: function(t) {
                    var e = t.getData(),
                        i = t.coordinateSystem,
                        n = t.pipelineContext.large;
                    if (i) {
                        var r = T(i.dimensions, function(t) {
                                return e.mapDimension(t)
                            }).slice(0, 2),
                            a = r.length,
                            o = e.getCalculationInfo("stackResultDimension");
                        return xc(e, r[0]) && (r[0] = o), xc(e, r[1]) && (r[1] = o), a && {
                            progress: function(t, e) {
                                for (var o = t.end - t.start, s = n && new Float32Array(o * a), l = t.start, h = 0, u = [], c = []; l < t.end; l++) {
                                    var d;
                                    if (1 === a) {
                                        var f = e.get(r[0], l);
                                        d = !isNaN(f) && i.dataToPoint(f, null, c)
                                    } else {
                                        f = u[0] = e.get(r[0], l);
                                        var p = u[1] = e.get(r[1], l);
                                        d = !isNaN(f) && !isNaN(p) && i.dataToPoint(u, null, c)
                                    }
                                    n ? (s[h++] = d ? d[0] : NaN, s[h++] = d ? d[1] : NaN) : e.setItemLayout(l, d && d.slice() || [NaN, NaN])
                                }
                                n && e.setLayout("symbolPoints", s)
                            }
                        }
                    }
                }
            }
        },
        fd = {
            average: function(t) {
                for (var e = 0, i = 0, n = 0; n < t.length; n++) isNaN(t[n]) || (e += t[n], i++);
                return 0 === i ? NaN : e / i
            },
            sum: function(t) {
                for (var e = 0, i = 0; i < t.length; i++) e += t[i] || 0;
                return e
            },
            max: function(t) {
                for (var e = -1 / 0, i = 0; i < t.length; i++) t[i] > e && (e = t[i]);
                return isFinite(e) ? e : NaN
            },
            min: function(t) {
                for (var e = 1 / 0, i = 0; i < t.length; i++) t[i] < e && (e = t[i]);
                return isFinite(e) ? e : NaN
            },
            nearest: function(t) {
                return t[0]
            }
        },
        pd = function(t, e) {
            return Math.round(t.length / 2)
        };

    function gd(t) {
        this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments)
    }

    function vd(t) {
        this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this._map
    }
    gd.prototype.parse = function(t) {
        return t
    }, gd.prototype.getSetting = function(t) {
        return this._setting[t]
    }, gd.prototype.contain = function(t) {
        var e = this._extent;
        return t >= e[0] && t <= e[1]
    }, gd.prototype.normalize = function(t) {
        var e = this._extent;
        return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
    }, gd.prototype.scale = function(t) {
        var e = this._extent;
        return t * (e[1] - e[0]) + e[0]
    }, gd.prototype.unionExtent = function(t) {
        var e = this._extent;
        t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1])
    }, gd.prototype.unionExtentFromData = function(t, e) {
        this.unionExtent(t.getApproximateExtent(e))
    }, gd.prototype.getExtent = function() {
        return this._extent.slice()
    }, gd.prototype.setExtent = function(t, e) {
        var i = this._extent;
        isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e)
    }, gd.prototype.isBlank = function() {
        return this._isBlank
    }, gd.prototype.setBlank = function(t) {
        this._isBlank = t
    }, gd.prototype.getLabel = null, Wn(gd), Yn(gd, {
        registerWhenExtend: !0
    }), vd.createByAxisModel = function(t) {
        var e = t.option,
            i = e.data,
            n = i && T(i, xd);
        return new vd({
            categories: n,
            needCollect: !n,
            deduplication: !1 !== e.dedplication
        })
    };
    var md = vd.prototype;

    function yd(t) {
        return t._map || (t._map = Z(t.categories))
    }

    function xd(t) {
        return L(t) && null != t.value ? t.value : t + ""
    }
    md.getOrdinal = function(t) {
        return yd(this).get(t)
    }, md.parseAndCollect = function(t) {
        var e, i = this._needCollect;
        if ("string" != typeof t && !i) return t;
        if (i && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;
        var n = yd(this);
        return null == (e = n.get(t)) && (i ? (e = this.categories.length, this.categories[e] = t, n.set(t, e)) : e = NaN), e
    };
    var _d = gd.prototype,
        wd = gd.extend({
            type: "ordinal",
            init: function(t, e) {
                t && !D(t) || (t = new vd({
                    categories: t
                })), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1]
            },
            parse: function(t) {
                return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t)
            },
            contain: function(t) {
                return t = this.parse(t), _d.contain.call(this, t) && null != this._ordinalMeta.categories[t]
            },
            normalize: function(t) {
                return _d.normalize.call(this, this.parse(t))
            },
            scale: function(t) {
                return Math.round(_d.scale.call(this, t))
            },
            getTicks: function() {
                for (var t = [], e = this._extent, i = e[0]; i <= e[1];) t.push(i), i++;
                return t
            },
            getLabel: function(t) {
                if (!this.isBlank()) return this._ordinalMeta.categories[t]
            },
            count: function() {
                return this._extent[1] - this._extent[0] + 1
            },
            unionExtentFromData: function(t, e) {
                this.unionExtent(t.getApproximateExtent(e))
            },
            getOrdinalMeta: function() {
                return this._ordinalMeta
            },
            niceTicks: j,
            niceExtent: j
        });
    wd.create = function() {
        return new wd
    };
    var bd = $o;

    function Md(t) {
        return Qo(t) + 2
    }

    function Sd(t, e, i) {
        t[e] = Math.max(Math.min(t[e], i[1]), i[0])
    }

    function Td(t, e) {
        !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), Sd(t, 0, e), Sd(t, 1, e), t[0] > t[1] && (t[0] = t[1])
    }
    var Id = $o,
        Cd = gd.extend({
            type: "interval",
            _interval: 0,
            _intervalPrecision: 2,
            setExtent: function(t, e) {
                var i = this._extent;
                isNaN(t) || (i[0] = parseFloat(t)), isNaN(e) || (i[1] = parseFloat(e))
            },
            unionExtent: function(t) {
                var e = this._extent;
                t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), Cd.prototype.setExtent.call(this, e[0], e[1])
            },
            getInterval: function() {
                return this._interval
            },
            setInterval: function(t) {
                this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Md(t)
            },
            getTicks: function() {
                return function(t, e, i, n) {
                    var r = [];
                    if (!t) return r;
                    e[0] < i[0] && r.push(e[0]);
                    for (var a = i[0]; a <= i[1] && (r.push(a), (a = bd(a + t, n)) !== r[r.length - 1]);)
                        if (r.length > 1e4) return [];
                    return e[1] > (r.length ? r[r.length - 1] : i[1]) && r.push(e[1]), r
                }(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
            },
            getLabel: function(t, e) {
                if (null == t) return "";
                var i = e && e.precision;
                return null == i ? i = Qo(t) || 0 : "auto" === i && (i = this._intervalPrecision), as(t = Id(t, i, !0))
            },
            niceTicks: function(t, e, i) {
                t = t || 5;
                var n = this._extent,
                    r = n[1] - n[0];
                if (isFinite(r)) {
                    r < 0 && (r = -r, n.reverse());
                    var a = function(t, e, i, n) {
                        var r = {},
                            a = t[1] - t[0],
                            o = r.interval = rs(a / e, !0);
                        null != i && o < i && (o = r.interval = i), null != n && o > n && (o = r.interval = n);
                        var s = r.intervalPrecision = Md(o);
                        return Td(r.niceTickExtent = [bd(Math.ceil(t[0] / o) * o, s), bd(Math.floor(t[1] / o) * o, s)], t), r
                    }(n, t, e, i);
                    this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent
                }
            },
            niceExtent: function(t) {
                var e = this._extent;
                if (e[0] === e[1])
                    if (0 !== e[0]) {
                        var i = e[0];
                        t.fixMax ? e[0] -= i / 2 : (e[1] += i / 2, e[0] -= i / 2)
                    } else e[1] = 1;
                var n = e[1] - e[0];
                isFinite(n) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
                var r = this._interval;
                t.fixMin || (e[0] = Id(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = Id(Math.ceil(e[1] / r) * r))
            }
        });
    Cd.create = function() {
        return new Cd
    };
    var Ad = "__ec_stack_";
    "undefined" != typeof Float32Array ? Float32Array : Array;

    function Dd(t) {
        return t.get("stack") || Ad + t.seriesIndex
    }

    function kd(t) {
        return t.dim + t.index
    }

    function Pd(t) {
        var e = [];
        return S(t, function(t) {
                var i = t.getData(),
                    n = t.coordinateSystem.getBaseAxis(),
                    r = n.getExtent(),
                    a = "category" === n.type ? n.getBandWidth() : Math.abs(r[1] - r[0]) / i.count(),
                    o = Ko(t.get("barWidth"), a),
                    s = Ko(t.get("barMaxWidth"), a),
                    l = t.get("barGap"),
                    h = t.get("barCategoryGap");
                e.push({
                    bandWidth: a,
                    barWidth: o,
                    barMaxWidth: s,
                    barGap: l,
                    barCategoryGap: h,
                    axisKey: kd(n),
                    stackId: Dd(t)
                })
            }),
            function(t) {
                var e = {};
                S(t, function(t, i) {
                    var n = t.axisKey,
                        r = t.bandWidth,
                        a = e[n] || {
                            bandWidth: r,
                            remainedWidth: r,
                            autoWidthCount: 0,
                            categoryGap: "20%",
                            gap: "30%",
                            stacks: {}
                        },
                        o = a.stacks;
                    e[n] = a;
                    var s = t.stackId;
                    o[s] || a.autoWidthCount++, o[s] = o[s] || {
                        width: 0,
                        maxWidth: 0
                    };
                    var l = t.barWidth;
                    l && !o[s].width && (o[s].width = l, l = Math.min(a.remainedWidth, l), a.remainedWidth -= l);
                    var h = t.barMaxWidth;
                    h && (o[s].maxWidth = h);
                    var u = t.barGap;
                    null != u && (a.gap = u);
                    var c = t.barCategoryGap;
                    null != c && (a.categoryGap = c)
                });
                var i = {};
                return S(e, function(t, e) {
                    i[e] = {};
                    var n = t.stacks,
                        r = t.bandWidth,
                        a = Ko(t.categoryGap, r),
                        o = Ko(t.gap, 1),
                        s = t.remainedWidth,
                        l = t.autoWidthCount,
                        h = (s - a) / (l + (l - 1) * o);
                    h = Math.max(h, 0), S(n, function(t, e) {
                        var i = t.maxWidth;
                        i && i < h && (i = Math.min(i, s), t.width && (i = Math.min(i, t.width)), s -= i, t.width = i, l--)
                    }), h = (s - a) / (l + (l - 1) * o), h = Math.max(h, 0);
                    var u, c = 0;
                    S(n, function(t, e) {
                        t.width || (t.width = h), u = t, c += t.width * (1 + o)
                    }), u && (c -= u.width * o);
                    var d = -c / 2;
                    S(n, function(t, n) {
                        i[e][n] = i[e][n] || {
                            offset: d,
                            width: t.width
                        }, d += t.width * (1 + o)
                    })
                }), i
            }(e)
    }

    function Ld(t, e, i) {
        if (t && e) {
            var n = t[kd(e)];
            return null != n && null != i && (n = n[Dd(i)]), n
        }
    }
    eh();

    function Od(t) {
        return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type
    }

    function Ed(t) {
        return t.pipelineContext && t.pipelineContext.large
    }
    var Nd = Cd.prototype,
        Rd = Math.ceil,
        Bd = Math.floor,
        zd = Cd.extend({
            type: "time",
            getLabel: function(t) {
                var e = this._stepLvl,
                    i = new Date(t);
                return ps(e[0], i, this.getSetting("useUTC"))
            },
            niceExtent: function(t) {
                var e = this._extent;
                if (e[0] === e[1] && (e[0] -= 864e5, e[1] += 864e5), e[1] === -1 / 0 && e[0] === 1 / 0) {
                    var i = new Date;
                    e[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - 864e5
                }
                this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
                var n = this._interval;
                t.fixMin || (e[0] = $o(Bd(e[0] / n) * n)), t.fixMax || (e[1] = $o(Rd(e[1] / n) * n))
            },
            niceTicks: function(t, e, i) {
                t = t || 10;
                var n = this._extent,
                    r = n[1] - n[0],
                    a = r / t;
                null != e && a < e && (a = e), null != i && a > i && (a = i);
                var o = Fd.length,
                    s = function(t, e, i, n) {
                        for (; i < n;) {
                            var r = i + n >>> 1;
                            t[r][1] < e ? i = r + 1 : n = r
                        }
                        return i
                    }(Fd, a, 0, o),
                    l = Fd[Math.min(s, o - 1)],
                    h = l[1];
                "year" === l[0] && (h *= rs(r / h / t, !0));
                var u = this.getSetting("useUTC") ? 0 : 60 * new Date(+n[0] || +n[1]).getTimezoneOffset() * 1e3,
                    c = [Math.round(Rd((n[0] - u) / h) * h + u), Math.round(Bd((n[1] - u) / h) * h + u)];
                Td(c, n), this._stepLvl = l, this._interval = h, this._niceExtent = c
            },
            parse: function(t) {
                return +is(t)
            }
        });
    S(["contain", "normalize"], function(t) {
        zd.prototype[t] = function(e) {
            return Nd[t].call(this, this.parse(e))
        }
    });
    var Fd = [
        ["hh:mm:ss", 1e3],
        ["hh:mm:ss", 5e3],
        ["hh:mm:ss", 1e4],
        ["hh:mm:ss", 15e3],
        ["hh:mm:ss", 3e4],
        ["hh:mm\nMM-dd", 6e4],
        ["hh:mm\nMM-dd", 3e5],
        ["hh:mm\nMM-dd", 6e5],
        ["hh:mm\nMM-dd", 9e5],
        ["hh:mm\nMM-dd", 18e5],
        ["hh:mm\nMM-dd", 36e5],
        ["hh:mm\nMM-dd", 72e5],
        ["hh:mm\nMM-dd", 216e5],
        ["hh:mm\nMM-dd", 432e5],
        ["MM-dd\nyyyy", 864e5],
        ["MM-dd\nyyyy", 1728e5],
        ["MM-dd\nyyyy", 2592e5],
        ["MM-dd\nyyyy", 3456e5],
        ["MM-dd\nyyyy", 432e6],
        ["MM-dd\nyyyy", 5184e5],
        ["week", 6048e5],
        ["MM-dd\nyyyy", 864e6],
        ["week", 12096e5],
        ["week", 18144e5],
        ["month", 26784e5],
        ["week", 36288e5],
        ["month", 53568e5],
        ["week", 36288e5],
        ["quarter", 8208e6],
        ["month", 107136e5],
        ["month", 13392e6],
        ["half-year", 16416e6],
        ["month", 214272e5],
        ["month", 26784e6],
        ["year", 32832e6]
    ];
    zd.create = function(t) {
        return new zd({
            useUTC: t.ecModel.get("useUTC")
        })
    };
    var Vd = gd.prototype,
        Hd = Cd.prototype,
        Wd = Qo,
        Gd = $o,
        qd = Math.floor,
        Xd = Math.ceil,
        Ud = Math.pow,
        Yd = Math.log,
        Zd = gd.extend({
            type: "log",
            base: 10,
            $constructor: function() {
                gd.apply(this, arguments), this._originalScale = new Cd
            },
            getTicks: function() {
                var t = this._originalScale,
                    e = this._extent,
                    i = t.getExtent();
                return T(Hd.getTicks.call(this), function(n) {
                    var r = $o(Ud(this.base, n));
                    return r = n === e[0] && t.__fixMin ? jd(r, i[0]) : r, r = n === e[1] && t.__fixMax ? jd(r, i[1]) : r
                }, this)
            },
            getLabel: Hd.getLabel,
            scale: function(t) {
                return t = Vd.scale.call(this, t), Ud(this.base, t)
            },
            setExtent: function(t, e) {
                var i = this.base;
                t = Yd(t) / Yd(i), e = Yd(e) / Yd(i), Hd.setExtent.call(this, t, e)
            },
            getExtent: function() {
                var t = this.base,
                    e = Vd.getExtent.call(this);
                e[0] = Ud(t, e[0]), e[1] = Ud(t, e[1]);
                var i = this._originalScale,
                    n = i.getExtent();
                return i.__fixMin && (e[0] = jd(e[0], n[0])), i.__fixMax && (e[1] = jd(e[1], n[1])), e
            },
            unionExtent: function(t) {
                this._originalScale.unionExtent(t);
                var e = this.base;
                t[0] = Yd(t[0]) / Yd(e), t[1] = Yd(t[1]) / Yd(e), Vd.unionExtent.call(this, t)
            },
            unionExtentFromData: function(t, e) {
                this.unionExtent(t.getApproximateExtent(e))
            },
            niceTicks: function(t) {
                t = t || 10;
                var e = this._extent,
                    i = e[1] - e[0];
                if (!(i === 1 / 0 || i <= 0)) {
                    var n, r = (n = i, Math.pow(10, ns(n)));
                    for (t / i * r <= .5 && (r *= 10); !isNaN(r) && Math.abs(r) < 1 && Math.abs(r) > 0;) r *= 10;
                    var a = [$o(Xd(e[0] / r) * r), $o(qd(e[1] / r) * r)];
                    this._interval = r, this._niceExtent = a
                }
            },
            niceExtent: function(t) {
                Hd.niceExtent.call(this, t);
                var e = this._originalScale;
                e.__fixMin = t.fixMin, e.__fixMax = t.fixMax
            }
        });

    function jd(t, e) {
        return Gd(t, Wd(e))
    }

    function Kd(t, e) {
        var i, n, r, a = t.type,
            o = e.getMin(),
            s = e.getMax(),
            l = null != o,
            h = null != s,
            u = t.getExtent();
        "ordinal" === a ? i = e.getCategories().length : (D(n = e.get("boundaryGap")) || (n = [n || 0, n || 0]), "boolean" == typeof n[0] && (n = [0, 0]), n[0] = Ko(n[0], 1), n[1] = Ko(n[1], 1), r = u[1] - u[0] || Math.abs(u[0])), null == o && (o = "ordinal" === a ? i ? 0 : NaN : u[0] - n[0] * r), null == s && (s = "ordinal" === a ? i ? i - 1 : NaN : u[1] + n[1] * r), "dataMin" === o ? o = u[0] : "function" == typeof o && (o = o({
            min: u[0],
            max: u[1]
        })), "dataMax" === s ? s = u[1] : "function" == typeof s && (s = s({
            min: u[0],
            max: u[1]
        })), (null == o || !isFinite(o)) && (o = NaN), (null == s || !isFinite(s)) && (s = NaN), t.setBlank(R(o) || R(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (o > 0 && s > 0 && !l && (o = 0), o < 0 && s < 0 && !h && (s = 0));
        var c = e.ecModel;
        if (c && "time" === a) {
            var d, f = function(t, e) {
                var i = [];
                return e.eachSeriesByType(t, function(t) {
                    Od(t) && !Ed(t) && i.push(t)
                }), i
            }("bar", c);
            if (S(f, function(t) {
                    d |= t.getBaseAxis() === e.axis
                }), d) {
                var p = Pd(f),
                    g = function(t, e, i, n) {
                        var r = i.axis.getExtent(),
                            a = r[1] - r[0],
                            o = Ld(n, i.axis);
                        if (void 0 === o) return {
                            min: t,
                            max: e
                        };
                        var s = 1 / 0;
                        S(o, function(t) {
                            s = Math.min(t.offset, s)
                        });
                        var l = -1 / 0;
                        S(o, function(t) {
                            l = Math.max(t.offset + t.width, l)
                        }), s = Math.abs(s), l = Math.abs(l);
                        var h = s + l,
                            u = e - t,
                            c = u / (1 - (s + l) / a) - u;
                        return {
                            min: t -= c * (s / h),
                            max: e += c * (l / h)
                        }
                    }(o, s, e, p);
                o = g.min, s = g.max
            }
        }
        return [o, s]
    }

    function $d(t, e) {
        var i = Kd(t, e),
            n = null != e.getMin(),
            r = null != e.getMax(),
            a = e.get("splitNumber");
        "log" === t.type && (t.base = e.get("logBase"));
        var o = t.type;
        t.setExtent(i[0], i[1]), t.niceExtent({
            splitNumber: a,
            fixMin: n,
            fixMax: r,
            minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null,
            maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null
        });
        var s = e.get("interval");
        null != s && t.setInterval && t.setInterval(s)
    }

    function Qd(t, e) {
        if (e = e || t.get("type")) switch (e) {
            case "category":
                return new wd(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);
            case "value":
                return new Cd;
            default:
                return (gd.getClass(e) || Cd).create(t)
        }
    }

    function Jd(t) {
        var e, i = t.getLabelModel().get("formatter"),
            n = "category" === t.type ? t.scale.getExtent()[0] : null;
        return "string" == typeof i ? (e = i, i = function(t) {
            return e.replace("{value}", null != t ? t : "")
        }) : "function" == typeof i ? function(e, r) {
            return null != n && (r = e - n), i(tf(t, e), r)
        } : function(e) {
            return t.scale.getLabel(e)
        }
    }

    function tf(t, e) {
        return "category" === t.type ? t.scale.getLabel(e) : e
    }

    function ef(t) {
        return this._axes[t]
    }
    S(["contain", "normalize"], function(t) {
        Zd.prototype[t] = function(e) {
            return e = Yd(e) / Yd(this.base), Vd[t].call(this, e)
        }
    }), Zd.create = function() {
        return new Zd
    };
    var nf = function(t) {
        this._axes = {}, this._dimList = [], this.name = t || ""
    };

    function rf(t) {
        nf.call(this, t)
    }
    nf.prototype = {
        constructor: nf,
        type: "cartesian",
        getAxis: function(t) {
            return this._axes[t]
        },
        getAxes: function() {
            return T(this._dimList, ef, this)
        },
        getAxesByScale: function(t) {
            return t = t.toLowerCase(), I(this.getAxes(), function(e) {
                return e.scale.type === t
            })
        },
        addAxis: function(t) {
            var e = t.dim;
            this._axes[e] = t, this._dimList.push(e)
        },
        dataToCoord: function(t) {
            return this._dataCoordConvert(t, "dataToCoord")
        },
        coordToData: function(t) {
            return this._dataCoordConvert(t, "coordToData")
        },
        _dataCoordConvert: function(t, e) {
            for (var i = this._dimList, n = t instanceof Array ? [] : {}, r = 0; r < i.length; r++) {
                var a = i[r],
                    o = this._axes[a];
                n[a] = o[e](t[a])
            }
            return n
        }
    }, rf.prototype = {
        constructor: rf,
        type: "cartesian2d",
        dimensions: ["x", "y"],
        getBaseAxis: function() {
            return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
        },
        containPoint: function(t) {
            var e = this.getAxis("x"),
                i = this.getAxis("y");
            return e.contain(e.toLocalCoord(t[0])) && i.contain(i.toLocalCoord(t[1]))
        },
        containData: function(t) {
            return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1])
        },
        dataToPoint: function(t, e, i) {
            var n = this.getAxis("x"),
                r = this.getAxis("y");
            return (i = i || [])[0] = n.toGlobalCoord(n.dataToCoord(t[0])), i[1] = r.toGlobalCoord(r.dataToCoord(t[1])), i
        },
        clampData: function(t, e) {
            var i = this.getAxis("x").scale,
                n = this.getAxis("y").scale,
                r = i.getExtent(),
                a = n.getExtent(),
                o = i.parse(t[0]),
                s = n.parse(t[1]);
            return (e = e || [])[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), e[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e
        },
        pointToData: function(t, e) {
            var i = this.getAxis("x"),
                n = this.getAxis("y");
            return (e = e || [])[0] = i.coordToData(i.toLocalCoord(t[0])), e[1] = n.coordToData(n.toLocalCoord(t[1])), e
        },
        getOtherAxis: function(t) {
            return this.getAxis("x" === t.dim ? "y" : "x")
        }
    }, w(rf, nf);
    var af = En();

    function of(t) {
        return "category" === t.type ? function(t) {
            var e = t.getLabelModel(),
                i = lf(t, e);
            return !e.get("show") || t.scale.isBlank() ? {
                labels: [],
                labelCategoryInterval: i.labelCategoryInterval
            } : i
        }(t) : function(t) {
            var e = t.scale.getTicks(),
                i = Jd(t);
            return {
                labels: T(e, function(e, n) {
                    return {
                        formattedLabel: i(e, n),
                        rawLabel: t.scale.getLabel(e),
                        tickValue: e
                    }
                })
            }
        }(t)
    }

    function sf(t, e) {
        return "category" === t.type ? function(t, e) {
            var i, n, r = hf(t, "ticks"),
                a = pf(e),
                o = uf(r, a);
            if (o) return o;
            e.get("show") && !t.scale.isBlank() || (i = []);
            if (k(a)) i = ff(t, a, !0);
            else if ("auto" === a) {
                var s = lf(t, t.getLabelModel());
                n = s.labelCategoryInterval, i = T(s.labels, function(t) {
                    return t.tickValue
                })
            } else i = df(t, n = a, !0);
            return cf(r, a, {
                ticks: i,
                tickCategoryInterval: n
            })
        }(t, e) : {
            ticks: t.scale.getTicks()
        }
    }

    function lf(t, e) {
        var i, n, r = hf(t, "labels"),
            a = pf(e),
            o = uf(r, a);
        return o || (k(a) ? i = ff(t, a) : (n = "auto" === a ? function(t) {
            var e = af(t).autoInterval;
            return null != e ? e : af(t).autoInterval = t.calculateCategoryInterval()
        }(t) : a, i = df(t, n)), cf(r, a, {
            labels: i,
            labelCategoryInterval: n
        }))
    }

    function hf(t, e) {
        return af(t)[e] || (af(t)[e] = [])
    }

    function uf(t, e) {
        for (var i = 0; i < t.length; i++)
            if (t[i].key === e) return t[i].value
    }

    function cf(t, e, i) {
        return t.push({
            key: e,
            value: i
        }), i
    }

    function df(t, e, i) {
        var n = Jd(t),
            r = t.scale,
            a = r.getExtent(),
            o = t.getLabelModel(),
            s = [],
            l = Math.max((e || 0) + 1, 1),
            h = a[0],
            u = r.count();
        0 !== h && l > 1 && u / l > 2 && (h = Math.round(Math.ceil(h / l) * l));
        var c = o.get("showMinLabel"),
            d = o.get("showMaxLabel");
        c && h !== a[0] && p(a[0]);
        for (var f = h; f <= a[1]; f += l) p(f);

        function p(t) {
            s.push(i ? t : {
                formattedLabel: n(t),
                rawLabel: r.getLabel(t),
                tickValue: t
            })
        }
        return d && f !== a[1] && p(a[1]), s
    }

    function ff(t, e, i) {
        var n = t.scale,
            r = Jd(t),
            a = [];
        return S(n.getTicks(), function(t) {
            var o = n.getLabel(t);
            e(t, o) && a.push(i ? t : {
                formattedLabel: r(t),
                rawLabel: o,
                tickValue: t
            })
        }), a
    }

    function pf(t) {
        var e = t.get("interval");
        return null == e ? "auto" : e
    }
    var gf = [0, 1],
        vf = function(t, e, i) {
            this.dim = t, this.scale = e, this._extent = i || [0, 0], this.inverse = !1, this.onBand = !1
        };

    function mf(t, e) {
        var i = (t[1] - t[0]) / e / 2;
        t[0] += i, t[1] -= i
    }
    vf.prototype = {
        constructor: vf,
        contain: function(t) {
            var e = this._extent,
                i = Math.min(e[0], e[1]),
                n = Math.max(e[0], e[1]);
            return t >= i && t <= n
        },
        containData: function(t) {
            return this.contain(this.dataToCoord(t))
        },
        getExtent: function() {
            return this._extent.slice()
        },
        getPixelPrecision: function(t) {
            return function(t, e) {
                var i = Math.log,
                    n = Math.LN10,
                    r = Math.floor(i(t[1] - t[0]) / n),
                    a = Math.round(i(Math.abs(e[1] - e[0])) / n),
                    o = Math.min(Math.max(-r + a, 0), 20);
                return isFinite(o) ? o : 20
            }(t || this.scale.getExtent(), this._extent)
        },
        setExtent: function(t, e) {
            var i = this._extent;
            i[0] = t, i[1] = e
        },
        dataToCoord: function(t, e) {
            var i = this._extent,
                n = this.scale;
            return t = n.normalize(t), this.onBand && "ordinal" === n.type && mf(i = i.slice(), n.count()), jo(t, gf, i, e)
        },
        coordToData: function(t, e) {
            var i = this._extent,
                n = this.scale;
            this.onBand && "ordinal" === n.type && mf(i = i.slice(), n.count());
            var r = jo(t, i, gf, e);
            return this.scale.scale(r)
        },
        pointToData: function(t, e) {},
        getTicksCoords: function(t) {
            var e = (t = t || {}).tickModel || this.getTickModel(),
                i = sf(this, e),
                n = T(i.ticks, function(t) {
                    return {
                        coord: this.dataToCoord(t),
                        tickValue: t
                    }
                }, this),
                r = e.get("alignWithLabel");
            return function(t, e, i, n, r) {
                var a = e.length;
                if (!t.onBand || n || !a) return;
                var o, s = t.getExtent();
                if (1 === a) e[0].coord = s[0], o = e[1] = {
                    coord: s[0]
                };
                else {
                    var l = e[1].coord - e[0].coord;
                    S(e, function(t) {
                        t.coord -= l / 2;
                        var e = e || 0;
                        e % 2 > 0 && (t.coord -= l / (2 * (e + 1)))
                    }), o = {
                        coord: e[a - 1].coord + l
                    }, e.push(o)
                }
                var h = s[0] > s[1];
                u(e[0].coord, s[0]) && (r ? e[0].coord = s[0] : e.shift());
                r && u(s[0], e[0].coord) && e.unshift({
                    coord: s[0]
                });
                u(s[1], o.coord) && (r ? o.coord = s[1] : e.pop());
                r && u(o.coord, s[1]) && e.push({
                    coord: s[1]
                });

                function u(t, e) {
                    return h ? t > e : t < e
                }
            }(this, n, i.tickCategoryInterval, r, t.clamp), n
        },
        getViewLabels: function() {
            return of(this).labels
        },
        getLabelModel: function() {
            return this.model.getModel("axisLabel")
        },
        getTickModel: function() {
            return this.model.getModel("axisTick")
        },
        getBandWidth: function() {
            var t = this._extent,
                e = this.scale.getExtent(),
                i = e[1] - e[0] + (this.onBand ? 1 : 0);
            0 === i && (i = 1);
            var n = Math.abs(t[1] - t[0]);
            return Math.abs(n) / i
        },
        isHorizontal: null,
        getRotate: null,
        calculateCategoryInterval: function() {
            return function(t) {
                var e = function(t) {
                        var e = t.getLabelModel();
                        return {
                            axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
                            labelRotate: e.get("rotate") || 0,
                            font: e.getFont()
                        }
                    }(t),
                    i = Jd(t),
                    n = (e.axisRotate - e.labelRotate) / 180 * Math.PI,
                    r = t.scale,
                    a = r.getExtent(),
                    o = r.count();
                if (a[1] - a[0] < 1) return 0;
                var s = 1;
                o > 40 && (s = Math.max(1, Math.floor(o / 40)));
                for (var l = a[0], h = t.dataToCoord(l + 1) - t.dataToCoord(l), u = Math.abs(h * Math.cos(n)), c = Math.abs(h * Math.sin(n)), d = 0, f = 0; l <= a[1]; l += s) {
                    var p, g, v = ci(i(l), e.font, "center", "top");
                    p = 1.3 * v.width, g = 1.3 * v.height, d = Math.max(d, p, 7), f = Math.max(f, g, 7)
                }
                var m = d / u,
                    y = f / c;
                isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);
                var x = Math.max(0, Math.floor(Math.min(m, y))),
                    _ = af(t.model),
                    w = _.lastAutoInterval,
                    b = _.lastTickCount;
                return null != w && null != b && Math.abs(w - x) <= 1 && Math.abs(b - o) <= 1 && w > x ? x = w : (_.lastTickCount = o, _.lastAutoInterval = x), x
            }(this)
        }
    };
    var yf = function(t, e, i, n, r) {
        vf.call(this, t, e, i), this.type = n || "value", this.position = r || "bottom"
    };
    yf.prototype = {
        constructor: yf,
        index: 0,
        getAxesOnZeroOf: null,
        model: null,
        isHorizontal: function() {
            var t = this.position;
            return "top" === t || "bottom" === t
        },
        getGlobalExtent: function(t) {
            var e = this.getExtent();
            return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), e
        },
        getOtherAxis: function() {
            this.grid.getOtherAxis()
        },
        pointToData: function(t, e) {
            return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e)
        },
        toLocalCoord: null,
        toGlobalCoord: null
    }, w(yf, vf);
    var xf = {
            show: !0,
            zlevel: 0,
            z: 0,
            inverse: !1,
            name: "",
            nameLocation: "end",
            nameRotate: null,
            nameTruncate: {
                maxWidth: null,
                ellipsis: "...",
                placeholder: "."
            },
            nameTextStyle: {},
            nameGap: 15,
            silent: !1,
            triggerEvent: !1,
            tooltip: {
                show: !1
            },
            axisPointer: {},
            axisLine: {
                show: !0,
                onZero: !0,
                onZeroAxisIndex: null,
                lineStyle: {
                    color: "#333",
                    width: 1,
                    type: "solid"
                },
                symbol: ["none", "none"],
                symbolSize: [10, 15]
            },
            axisTick: {
                show: !0,
                inside: !1,
                length: 5,
                lineStyle: {
                    width: 1
                }
            },
            axisLabel: {
                show: !0,
                inside: !1,
                rotate: 0,
                showMinLabel: null,
                showMaxLabel: null,
                margin: 8,
                fontSize: 12
            },
            splitLine: {
                show: !0,
                lineStyle: {
                    color: ["#ccc"],
                    width: 1,
                    type: "solid"
                }
            },
            splitArea: {
                show: !1,
                areaStyle: {
                    color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
                }
            }
        },
        _f = {};
    _f.categoryAxis = g({
        boundaryGap: !0,
        deduplication: null,
        splitLine: {
            show: !1
        },
        axisTick: {
            alignWithLabel: !1,
            interval: "auto"
        },
        axisLabel: {
            interval: "auto"
        }
    }, xf), _f.valueAxis = g({
        boundaryGap: [0, 0],
        splitNumber: 5
    }, xf), _f.timeAxis = m({
        scale: !0,
        min: "dataMin",
        max: "dataMax"
    }, _f.valueAxis), _f.logAxis = m({
        scale: !0,
        logBase: 10
    }, _f.valueAxis);
    var wf = ["value", "category", "time", "log"],
        bf = function(t, e, i, n) {
            S(wf, function(r) {
                e.extend({
                    type: t + "Axis." + r,
                    mergeDefaultAndTheme: function(e, n) {
                        var a = this.layoutMode,
                            o = a ? ws(e) : {};
                        g(e, n.getTheme().get(r + "Axis")), g(e, this.getDefaultOption()), e.type = i(t, e), a && _s(e, o, a)
                    },
                    optionUpdated: function() {
                        "category" === this.option.type && (this.__ordinalMeta = vd.createByAxisModel(this))
                    },
                    getCategories: function(t) {
                        var e = this.option;
                        if ("category" === e.type) return t ? e.data : this.__ordinalMeta.categories
                    },
                    getOrdinalMeta: function() {
                        return this.__ordinalMeta
                    },
                    defaultOption: function(t, e) {
                        for (var i = t[0], n = 1, r = t.length; n < r; n++) i = g(i, t[n], e);
                        return i
                    }([{}, _f[r + "Axis"], n], !0)
                })
            }), Ts.registerSubTypeDefaulter(t + "Axis", A(i, t))
        },
        Mf = {
            getMin: function(t) {
                var e = this.option,
                    i = t || null == e.rangeStart ? e.min : e.rangeStart;
                return this.axis && null != i && "dataMin" !== i && "function" != typeof i && !R(i) && (i = this.axis.scale.parse(i)), i
            },
            getMax: function(t) {
                var e = this.option,
                    i = t || null == e.rangeEnd ? e.max : e.rangeEnd;
                return this.axis && null != i && "dataMax" !== i && "function" != typeof i && !R(i) && (i = this.axis.scale.parse(i)), i
            },
            getNeedCrossZero: function() {
                var t = this.option;
                return null == t.rangeStart && null == t.rangeEnd && !t.scale
            },
            getCoordSysModel: j,
            setRange: function(t, e) {
                this.option.rangeStart = t, this.option.rangeEnd = e
            },
            resetRange: function() {
                this.option.rangeStart = this.option.rangeEnd = null
            }
        },
        Sf = Ts.extend({
            type: "cartesian2dAxis",
            axis: null,
            init: function() {
                Sf.superApply(this, "init", arguments), this.resetRange()
            },
            mergeOption: function() {
                Sf.superApply(this, "mergeOption", arguments), this.resetRange()
            },
            restoreData: function() {
                Sf.superApply(this, "restoreData", arguments), this.resetRange()
            },
            getCoordSysModel: function() {
                return this.ecModel.queryComponents({
                    mainType: "grid",
                    index: this.option.gridIndex,
                    id: this.option.gridId
                })[0]
            }
        });

    function Tf(t, e) {
        return e.type || (e.data ? "category" : "value")
    }
    g(Sf.prototype, Mf);
    var If = {
        offset: 0
    };

    function Cf(t, e, i) {
        return t.getCoordSysModel() === e
    }

    function Af(t, e, i) {
        this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, i), this.model = t
    }
    bf("x", Sf, Tf, If), bf("y", Sf, Tf, If), Ts.extend({
        type: "grid",
        dependencies: ["xAxis", "yAxis"],
        layoutMode: "box",
        coordinateSystem: null,
        defaultOption: {
            show: !1,
            zlevel: 0,
            z: 0,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 60,
            containLabel: !1,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 1,
            borderColor: "#ccc"
        }
    });
    var Df = Af.prototype;

    function kf(t, e, i) {
        i.getAxesOnZeroOf = function() {
            return n ? [n] : []
        };
        var n, r = t[e],
            a = i.model,
            o = a.get("axisLine.onZero"),
            s = a.get("axisLine.onZeroAxisIndex");
        if (o)
            if (null == s) {
                for (var l in r)
                    if (r.hasOwnProperty(l) && Pf(r[l])) {
                        n = r[l];
                        break
                    }
            } else Pf(r[s]) && (n = r[s])
    }

    function Pf(t) {
        return t && "category" !== t.type && "time" !== t.type && function(t) {
            var e = t.scale.getExtent(),
                i = e[0],
                n = e[1];
            return !(i > 0 && n > 0 || i < 0 && n < 0)
        }(t)
    }
    Df.type = "grid", Df.axisPointerEnabled = !0, Df.getRect = function() {
        return this._rect
    }, Df.update = function(t, e) {
        var i = this._axesMap;
        this._updateScale(t, this.model), S(i.x, function(t) {
            $d(t.scale, t.model)
        }), S(i.y, function(t) {
            $d(t.scale, t.model)
        }), S(i.x, function(t) {
            kf(i, "y", t)
        }), S(i.y, function(t) {
            kf(i, "x", t)
        }), this.resize(this.model, e)
    }, Df.resize = function(t, e, i) {
        var n = function(t, e, i) {
            i = os(i || 0);
            var n = e.width,
                r = e.height,
                a = Ko(t.left, n),
                o = Ko(t.top, r),
                s = Ko(t.right, n),
                l = Ko(t.bottom, r),
                h = Ko(t.width, n),
                u = Ko(t.height, r),
                c = i[2] + i[0],
                d = i[1] + i[3],
                f = t.aspect;
            switch (isNaN(h) && (h = n - s - d - a), isNaN(u) && (u = r - l - c - o), null != f && (isNaN(h) && isNaN(u) && (f > n / r ? h = .8 * n : u = .8 * r), isNaN(h) && (h = f * u), isNaN(u) && (u = h / f)), isNaN(a) && (a = n - s - h - d), isNaN(o) && (o = r - l - u - c), t.left || t.right) {
                case "center":
                    a = n / 2 - h / 2 - i[3];
                    break;
                case "right":
                    a = n - h - d
            }
            switch (t.top || t.bottom) {
                case "middle":
                case "center":
                    o = r / 2 - u / 2 - i[0];
                    break;
                case "bottom":
                    o = r - u - c
            }
            a = a || 0, o = o || 0, isNaN(h) && (h = n - d - a - (s || 0)), isNaN(u) && (u = r - c - o - (l || 0));
            var p = new Ce(a + i[3], o + i[0], h, u);
            return p.margin = i, p
        }(t.getBoxLayoutParams(), {
            width: e.getWidth(),
            height: e.getHeight()
        });
        this._rect = n;
        var r = this._axesList;

        function a() {
            S(r, function(t) {
                var e = t.isHorizontal(),
                    i = e ? [0, n.width] : [0, n.height],
                    r = t.inverse ? 1 : 0;
                t.setExtent(i[r], i[1 - r]),
                    function(t, e) {
                        var i = t.getExtent(),
                            n = i[0] + i[1];
                        t.toGlobalCoord = "x" === t.dim ? function(t) {
                            return t + e
                        } : function(t) {
                            return n - t + e
                        }, t.toLocalCoord = "x" === t.dim ? function(t) {
                            return t - e
                        } : function(t) {
                            return n - t + e
                        }
                    }(t, e ? n.x : n.y)
            })
        }
        a(), !i && t.get("containLabel") && (S(r, function(t) {
            if (!t.model.get("axisLabel.inside")) {
                var e = function(t) {
                    var e = t.model,
                        i = t.scale;
                    if (e.get("axisLabel.show") && !i.isBlank()) {
                        var n, r, a = "category" === t.type,
                            o = i.getExtent();
                        r = a ? i.count() : (n = i.getTicks()).length;
                        var s, l, h, u, c, d, f, p, g, v = t.getLabelModel(),
                            m = Jd(t),
                            y = 1;
                        r > 40 && (y = Math.ceil(r / 40));
                        for (var x = 0; x < r; x += y) {
                            var _ = m(n ? n[x] : o[0] + x),
                                w = v.getTextRect(_),
                                b = (l = w, h = v.get("rotate") || 0, u = h * Math.PI / 180, c = l.plain(), d = c.width, f = c.height, p = d * Math.cos(u) + f * Math.sin(u), g = d * Math.sin(u) + f * Math.cos(u), new Ce(c.x, c.y, p, g));
                            s ? s.union(b) : s = b
                        }
                        return s
                    }
                }(t);
                if (e) {
                    var i = t.isHorizontal() ? "height" : "width",
                        r = t.model.get("axisLabel.margin");
                    n[i] -= e[i] + r, "top" === t.position ? n.y += e.height + r : "left" === t.position && (n.x += e.width + r)
                }
            }
        }), a())
    }, Df.getAxis = function(t, e) {
        var i = this._axesMap[t];
        if (null != i) {
            if (null == e)
                for (var n in i)
                    if (i.hasOwnProperty(n)) return i[n];
            return i[e]
        }
    }, Df.getAxes = function() {
        return this._axesList.slice()
    }, Df.getCartesian = function(t, e) {
        if (null != t && null != e) {
            var i = "x" + t + "y" + e;
            return this._coordsMap[i]
        }
        L(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
        for (var n = 0, r = this._coordsList; n < r.length; n++)
            if (r[n].getAxis("x").index === t || r[n].getAxis("y").index === e) return r[n]
    }, Df.getCartesians = function() {
        return this._coordsList.slice()
    }, Df.convertToPixel = function(t, e, i) {
        var n = this._findConvertTarget(t, e);
        return n.cartesian ? n.cartesian.dataToPoint(i) : n.axis ? n.axis.toGlobalCoord(n.axis.dataToCoord(i)) : null
    }, Df.convertFromPixel = function(t, e, i) {
        var n = this._findConvertTarget(t, e);
        return n.cartesian ? n.cartesian.pointToData(i) : n.axis ? n.axis.coordToData(n.axis.toLocalCoord(i)) : null
    }, Df._findConvertTarget = function(t, e) {
        var i, n, r = e.seriesModel,
            a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],
            o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0],
            s = e.gridModel,
            l = this._coordsList;
        if (r) _(l, i = r.coordinateSystem) < 0 && (i = null);
        else if (a && o) i = this.getCartesian(a.componentIndex, o.componentIndex);
        else if (a) n = this.getAxis("x", a.componentIndex);
        else if (o) n = this.getAxis("y", o.componentIndex);
        else if (s) {
            s.coordinateSystem === this && (i = this._coordsList[0])
        }
        return {
            cartesian: i,
            axis: n
        }
    }, Df.containPoint = function(t) {
        var e = this._coordsList[0];
        if (e) return e.containPoint(t)
    }, Df._initCartesian = function(t, e, i) {
        var n = {
                left: !1,
                right: !1,
                top: !1,
                bottom: !1
            },
            r = {
                x: {},
                y: {}
            },
            a = {
                x: 0,
                y: 0
            };
        if (e.eachComponent("xAxis", o("x"), this), e.eachComponent("yAxis", o("y"), this), !a.x || !a.y) return this._axesMap = {}, void(this._axesList = []);

        function o(e) {
            return function(i, o) {
                if (Cf(i, t)) {
                    var s = i.get("position");
                    "x" === e ? "top" !== s && "bottom" !== s && n[s = "bottom"] && (s = "top" === s ? "bottom" : "top") : "left" !== s && "right" !== s && n[s = "left"] && (s = "left" === s ? "right" : "left"), n[s] = !0;
                    var l = new yf(e, Qd(i), [0, 0], i.get("type"), s),
                        h = "category" === l.type;
                    l.onBand = h && i.get("boundaryGap"), l.inverse = i.get("inverse"), i.axis = l, l.model = i, l.grid = this, l.index = o, this._axesList.push(l), r[e][o] = l, a[e]++
                }
            }
        }
        this._axesMap = r, S(r.x, function(e, i) {
            S(r.y, function(n, r) {
                var a = "x" + i + "y" + r,
                    o = new rf(a);
                o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), o.addAxis(n)
            }, this)
        }, this)
    }, Df._updateScale = function(t, e) {
        function i(t, e, i) {
            S(t.mapDimension(e.dim, !0), function(i) {
                e.scale.unionExtentFromData(t, _c(t, i))
            })
        }
        S(this._axesList, function(t) {
            t.scale.setExtent(1 / 0, -1 / 0)
        }), t.eachSeries(function(n) {
            if (Ef(n)) {
                var r = Of(n, t),
                    a = r[0],
                    o = r[1];
                if (!Cf(a, e) || !Cf(o, e)) return;
                var s = this.getCartesian(a.componentIndex, o.componentIndex),
                    l = n.getData(),
                    h = s.getAxis("x"),
                    u = s.getAxis("y");
                "list" === l.type && (i(l, h, n), i(l, u, n))
            }
        }, this)
    }, Df.getTooltipAxes = function(t) {
        var e = [],
            i = [];
        return S(this.getCartesians(), function(n) {
            var r = null != t && "auto" !== t ? n.getAxis(t) : n.getBaseAxis(),
                a = n.getOtherAxis(r);
            _(e, r) < 0 && e.push(r), _(i, a) < 0 && i.push(a)
        }), {
            baseAxes: e,
            otherAxes: i
        }
    };
    var Lf = ["xAxis", "yAxis"];

    function Of(t, e) {
        return T(Lf, function(e) {
            return t.getReferringComponents(e)[0]
        })
    }

    function Ef(t) {
        return "cartesian2d" === t.get("coordinateSystem")
    }
    Af.create = function(t, e) {
        var i = [];
        return t.eachComponent("grid", function(n, r) {
            var a = new Af(n, t, e);
            a.name = "grid_" + r, a.resize(n, e, !0), n.coordinateSystem = a, i.push(a)
        }), t.eachSeries(function(t) {
            if (Ef(t)) {
                var e = Of(t),
                    i = e[0],
                    n = e[1],
                    r = i.getCoordSysModel().coordinateSystem;
                t.coordinateSystem = r.getCartesian(i.componentIndex, n.componentIndex)
            }
        }), i
    }, Af.dimensions = Af.prototype.dimensions = rf.prototype.dimensions, el.register("cartesian2d", Af);
    var Nf = Math.PI;

    function Rf(t) {
        var e = {
            componentType: t.mainType
        };
        return e[t.mainType + "Index"] = t.componentIndex, e
    }
    var Bf = function(t, e) {
        this.opt = e, this.axisModel = t, m(e, {
            labelOffset: 0,
            nameDirection: 1,
            tickDirection: 1,
            labelDirection: 1,
            silent: !0
        }), this.group = new Ae;
        var i = new Ae({
            position: e.position.slice(),
            rotation: e.rotation
        });
        i.updateTransform(), this._transform = i.transform, this._dumbGroup = i
    };
    Bf.prototype = {
        constructor: Bf,
        hasBuilder: function(t) {
            return !!zf[t]
        },
        add: function(t) {
            zf[t].call(this)
        },
        getGroup: function() {
            return this.group
        }
    };
    var zf = {
            axisLine: function() {
                var t = this.opt,
                    e = this.axisModel;
                if (e.get("axisLine.show")) {
                    var i = this.axisModel.axis.getExtent(),
                        n = this._transform,
                        r = [i[0], 0],
                        a = [i[1], 0];
                    n && (ot(r, r, n), ot(a, a, n));
                    var o = v({
                        lineCap: "round"
                    }, e.getModel("axisLine.lineStyle").getLineStyle());
                    this.group.add(new Va(so({
                        anid: "line",
                        shape: {
                            x1: r[0],
                            y1: r[1],
                            x2: a[0],
                            y2: a[1]
                        },
                        style: o,
                        strokeContainThreshold: t.strokeContainThreshold || 5,
                        silent: !0,
                        z2: 1
                    })));
                    var s = e.get("axisLine.symbol"),
                        l = e.get("axisLine.symbolSize"),
                        h = e.get("axisLine.symbolOffset") || 0;
                    if ("number" == typeof h && (h = [h, h]), null != s) {
                        "string" == typeof s && (s = [s, s]), "string" != typeof l && "number" != typeof l || (l = [l, l]);
                        var u = l[0],
                            c = l[1];
                        S([{
                            rotate: t.rotation + Math.PI / 2,
                            offset: h[0],
                            r: 0
                        }, {
                            rotate: t.rotation - Math.PI / 2,
                            offset: h[1],
                            r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1]))
                        }], function(e, i) {
                            if ("none" !== s[i] && null != s[i]) {
                                var n = kc(s[i], -u / 2, -c / 2, u, c, o.stroke, !0),
                                    a = e.r + e.offset,
                                    l = [r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation)];
                                n.attr({
                                    rotation: e.rotate,
                                    position: l,
                                    silent: !0
                                }), this.group.add(n)
                            }
                        }, this)
                    }
                }
            },
            axisTickLabel: function() {
                var t = this.axisModel,
                    e = this.opt,
                    i = function(t, e, i) {
                        var n = e.axis;
                        if (!e.get("axisTick.show") || n.scale.isBlank()) return;
                        for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), s = n.getTicksCoords(), l = [], h = [], u = t._transform, c = [], d = 0; d < s.length; d++) {
                            var f = s[d].coord;
                            l[0] = f, l[1] = 0, h[0] = f, h[1] = i.tickDirection * o, u && (ot(l, l, u), ot(h, h, u));
                            var p = new Va(so({
                                anid: "tick_" + s[d].tickValue,
                                shape: {
                                    x1: l[0],
                                    y1: l[1],
                                    x2: h[0],
                                    y2: h[1]
                                },
                                style: m(a.getLineStyle(), {
                                    stroke: e.get("axisLine.lineStyle.color")
                                }),
                                z2: 2,
                                silent: !0
                            }));
                            t.group.add(p), c.push(p)
                        }
                        return c
                    }(this, t, e),
                    n = function(t, e, i) {
                        var n = e.axis;
                        if (!B(i.axisLabelShow, e.get("axisLabel.show")) || n.scale.isBlank()) return;
                        var r = e.getModel("axisLabel"),
                            a = r.get("margin"),
                            o = n.getViewLabels(),
                            s = (B(i.labelRotate, r.get("rotate")) || 0) * Nf / 180,
                            l = Ff(i.rotation, s, i.labelDirection),
                            h = e.getCategories(!0),
                            u = [],
                            c = Vf(e),
                            d = e.get("triggerEvent");
                        return S(o, function(o, s) {
                            var f = o.tickValue,
                                p = o.formattedLabel,
                                g = o.rawLabel,
                                v = r;
                            h && h[f] && h[f].textStyle && (v = new Go(h[f].textStyle, r, e.ecModel));
                            var m = v.getTextColor() || e.get("axisLine.lineStyle.color"),
                                y = [n.dataToCoord(f), i.labelOffset + i.labelDirection * a],
                                x = new Ca({
                                    anid: "label_" + f,
                                    position: y,
                                    rotation: l.rotation,
                                    silent: c,
                                    z2: 10
                                });
                            So(x.style, v, {
                                text: p,
                                textAlign: v.getShallow("align", !0) || l.textAlign,
                                textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || l.textVerticalAlign,
                                textFill: "function" == typeof m ? m("category" === n.type ? g : "value" === n.type ? f + "" : f, s) : m
                            }), d && (x.eventData = Rf(e), x.eventData.targetType = "axisLabel", x.eventData.value = g), t._dumbGroup.add(x), x.updateTransform(), u.push(x), t.group.add(x), x.decomposeTransform()
                        }), u
                    }(this, t, e);
                ! function(t, e, i) {
                    var n = t.get("axisLabel.showMinLabel"),
                        r = t.get("axisLabel.showMaxLabel");
                    i = i || [];
                    var a = (e = e || [])[0],
                        o = e[1],
                        s = e[e.length - 1],
                        l = e[e.length - 2],
                        h = i[0],
                        u = i[1],
                        c = i[i.length - 1],
                        d = i[i.length - 2];
                    !1 === n ? (Hf(a), Hf(h)) : Wf(a, o) && (n ? (Hf(o), Hf(u)) : (Hf(a), Hf(h)));
                    !1 === r ? (Hf(s), Hf(c)) : Wf(l, s) && (r ? (Hf(l), Hf(d)) : (Hf(s), Hf(c)))
                }(t, n, i)
            },
            axisName: function() {
                var t = this.opt,
                    e = this.axisModel,
                    i = B(t.axisName, e.get("name"));
                if (i) {
                    var n, r, a = e.get("nameLocation"),
                        o = t.nameDirection,
                        s = e.getModel("nameTextStyle"),
                        l = e.get("nameGap") || 0,
                        h = this.axisModel.axis.getExtent(),
                        u = h[0] > h[1] ? -1 : 1,
                        c = ["start" === a ? h[0] - u * l : "end" === a ? h[1] + u * l : (h[0] + h[1]) / 2, Gf(a) ? t.labelOffset + o * l : 0],
                        d = e.get("nameRotate");
                    null != d && (d = d * Nf / 180), Gf(a) ? n = Ff(t.rotation, null != d ? d : t.rotation, o) : (n = function(t, e, i, n) {
                        var r, a, o = Jo(i - t.rotation),
                            s = n[0] > n[1],
                            l = "start" === e && !s || "start" !== e && s;
                        ts(o - Nf / 2) ? (a = l ? "bottom" : "top", r = "center") : ts(o - 1.5 * Nf) ? (a = l ? "top" : "bottom", r = "center") : (a = "middle", r = o < 1.5 * Nf && o > Nf / 2 ? l ? "left" : "right" : l ? "right" : "left");
                        return {
                            rotation: o,
                            textAlign: r,
                            textVerticalAlign: a
                        }
                    }(t, a, d || 0, h), null != (r = t.axisNameAvailableWidth) && (r = Math.abs(r / Math.sin(n.rotation)), !isFinite(r) && (r = null)));
                    var f = s.getFont(),
                        p = e.get("nameTruncate", !0) || {},
                        g = p.ellipsis,
                        m = B(t.nameTruncateMaxWidth, p.maxWidth, r),
                        y = null != g && null != m ? gs(i, m, f, g, {
                            minChar: 2,
                            placeholder: p.placeholder
                        }) : i,
                        x = e.get("tooltip", !0),
                        _ = e.mainType,
                        w = {
                            componentType: _,
                            name: i,
                            $vars: ["name"]
                        };
                    w[_ + "Index"] = e.componentIndex;
                    var b = new Ca({
                        anid: "name",
                        __fullText: i,
                        __truncatedText: y,
                        position: c,
                        rotation: n.rotation,
                        silent: Vf(e),
                        z2: 1,
                        tooltip: x && x.show ? v({
                            content: i,
                            formatter: function() {
                                return i
                            },
                            formatterParams: w
                        }, x) : null
                    });
                    So(b.style, s, {
                        text: y,
                        textFont: f,
                        textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"),
                        textAlign: n.textAlign,
                        textVerticalAlign: n.textVerticalAlign
                    }), e.get("triggerEvent") && (b.eventData = Rf(e), b.eventData.targetType = "axisName", b.eventData.name = i), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), b.decomposeTransform()
                }
            }
        },
        Ff = Bf.innerTextLayout = function(t, e, i) {
            var n, r, a = Jo(e - t);
            return ts(a) ? (r = i > 0 ? "top" : "bottom", n = "center") : ts(a - Nf) ? (r = i > 0 ? "bottom" : "top", n = "center") : (r = "middle", n = a > 0 && a < Nf ? i > 0 ? "right" : "left" : i > 0 ? "left" : "right"), {
                rotation: a,
                textAlign: n,
                textVerticalAlign: r
            }
        };

    function Vf(t) {
        var e = t.get("tooltip");
        return t.get("silent") || !(t.get("triggerEvent") || e && e.show)
    }

    function Hf(t) {
        t && (t.ignore = !0)
    }

    function Wf(t, e, i) {
        var n = t && t.getBoundingRect().clone(),
            r = e && e.getBoundingRect().clone();
        if (n && r) {
            var a = _t([]);
            return St(a, a, -t.rotation), n.applyTransform(bt([], a, t.getLocalTransform())), r.applyTransform(bt([], a, e.getLocalTransform())), n.intersect(r)
        }
    }

    function Gf(t) {
        return "middle" === t || "center" === t
    }
    var qf = S,
        Xf = A;

    function Uf(t, e) {
        var i = {
            axesInfo: {},
            seriesInvolved: !1,
            coordSysAxesInfo: {},
            coordSysMap: {}
        };
        return function(t, e, i) {
            var n = e.getComponent("tooltip"),
                r = e.getComponent("axisPointer"),
                a = r.get("link", !0) || [],
                o = [];
            qf(i.getCoordinateSystems(), function(i) {
                if (i.axisPointerEnabled) {
                    var s = Kf(i.model),
                        l = t.coordSysAxesInfo[s] = {};
                    t.coordSysMap[s] = i;
                    var h = i.model,
                        u = h.getModel("tooltip", n);
                    if (qf(i.getAxes(), Xf(g, !1, null)), i.getTooltipAxes && n && u.get("show")) {
                        var c = "axis" === u.get("trigger"),
                            d = "cross" === u.get("axisPointer.type"),
                            f = i.getTooltipAxes(u.get("axisPointer.axis"));
                        (c || d) && qf(f.baseAxes, Xf(g, !d || "cross", c)), d && qf(f.otherAxes, Xf(g, "cross", !1))
                    }
                }

                function g(n, s, h) {
                    var c = h.model.getModel("axisPointer", r),
                        d = c.get("show");
                    if (d && ("auto" !== d || n || jf(c))) {
                        null == s && (s = c.get("triggerTooltip"));
                        var f = (c = n ? function(t, e, i, n, r, a) {
                                var o = e.getModel("axisPointer"),
                                    s = {};
                                qf(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function(t) {
                                    s[t] = p(o.get(t))
                                }), s.snap = "category" !== t.type && !!a, "cross" === o.get("type") && (s.type = "line");
                                var l = s.label || (s.label = {});
                                if (null == l.show && (l.show = !1), "cross" === r) {
                                    var h = o.get("label.show");
                                    if (l.show = null == h || h, !a) {
                                        var u = s.lineStyle = o.get("crossStyle");
                                        u && m(l, u.textStyle)
                                    }
                                }
                                return t.model.getModel("axisPointer", new Go(s, i, n))
                            }(h, u, r, e, n, s) : c).get("snap"),
                            g = Kf(h.model),
                            v = s || f || "category" === h.type,
                            y = t.axesInfo[g] = {
                                key: g,
                                axis: h,
                                coordSys: i,
                                axisPointerModel: c,
                                triggerTooltip: s,
                                involveSeries: v,
                                snap: f,
                                useHandle: jf(c),
                                seriesModels: []
                            };
                        l[g] = y, t.seriesInvolved |= v;
                        var x = function(t, e) {
                            for (var i = e.model, n = e.dim, r = 0; r < t.length; r++) {
                                var a = t[r] || {};
                                if (Yf(a[n + "AxisId"], i.id) || Yf(a[n + "AxisIndex"], i.componentIndex) || Yf(a[n + "AxisName"], i.name)) return r
                            }
                        }(a, h);
                        if (null != x) {
                            var _ = o[x] || (o[x] = {
                                axesInfo: {}
                            });
                            _.axesInfo[g] = y, _.mapper = a[x].mapper, y.linkGroup = _
                        }
                    }
                }
            })
        }(i, t, e), i.seriesInvolved && function(t, e) {
            e.eachSeries(function(e) {
                var i = e.coordinateSystem,
                    n = e.get("tooltip.trigger", !0),
                    r = e.get("tooltip.show", !0);
                i && "none" !== n && !1 !== n && "item" !== n && !1 !== r && !1 !== e.get("axisPointer.show", !0) && qf(t.coordSysAxesInfo[Kf(i.model)], function(t) {
                    var n = t.axis;
                    i.getAxis(n.dim) === n && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount += e.getData().count())
                })
            }, this)
        }(i, t), i
    }

    function Yf(t, e) {
        return "all" === t || D(t) && _(t, e) >= 0 || t === e
    }

    function Zf(t) {
        var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return e && e.axesInfo[Kf(t)]
    }

    function jf(t) {
        return !!t.get("handle.show")
    }

    function Kf(t) {
        return t.type + "||" + t.id
    }
    var $f = qu({
        type: "axis",
        _axisPointer: null,
        axisPointerClass: null,
        render: function(t, e, i, n) {
            this.axisPointerClass && function(t) {
                var e = Zf(t);
                if (e) {
                    var i = e.axisPointerModel,
                        n = e.axis.scale,
                        r = i.option,
                        a = i.get("status"),
                        o = i.get("value");
                    null != o && (o = n.parse(o));
                    var s = jf(i);
                    null == a && (r.status = s ? "show" : "hide");
                    var l = n.getExtent().slice();
                    l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show")
                }
            }(t), $f.superApply(this, "render", arguments), Qf(this, t, e, i, n, !0)
        },
        updateAxisPointer: function(t, e, i, n, r) {
            Qf(this, t, e, i, n, !1)
        },
        remove: function(t, e) {
            var i = this._axisPointer;
            i && i.remove(e), $f.superApply(this, "remove", arguments)
        },
        dispose: function(t, e) {
            Jf(this, e), $f.superApply(this, "dispose", arguments)
        }
    });

    function Qf(t, e, i, n, r, a) {
        var o = $f.getAxisPointerClass(t.axisPointerClass);
        if (o) {
            var s = function(t) {
                var e = Zf(t);
                return e && e.axisPointerModel
            }(e);
            s ? (t._axisPointer || (t._axisPointer = new o)).render(e, s, n, a) : Jf(t, n)
        }
    }

    function Jf(t, e, i) {
        var n = t._axisPointer;
        n && n.dispose(e, i), t._axisPointer = null
    }
    var tp = [];

    function ep(t, e, i) {
        i = i || {};
        var n = t.coordinateSystem,
            r = e.axis,
            a = {},
            o = r.getAxesOnZeroOf()[0],
            s = r.position,
            l = o ? "onZero" : s,
            h = r.dim,
            u = n.getRect(),
            c = [u.x, u.x + u.width, u.y, u.y + u.height],
            d = {
                left: 0,
                right: 1,
                top: 0,
                bottom: 1,
                onZero: 2
            },
            f = e.get("offset") || 0,
            p = "x" === h ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];
        if (o) {
            var g = o.toGlobalCoord(o.dataToCoord(0));
            p[d.onZero] = Math.max(Math.min(g, p[1]), p[0])
        }
        a.position = ["y" === h ? p[d[l]] : c[0], "x" === h ? p[d[l]] : c[3]], a.rotation = Math.PI / 2 * ("x" === h ? 0 : 1);
        a.labelDirection = a.tickDirection = a.nameDirection = {
            top: -1,
            bottom: 1,
            left: -1,
            right: 1
        }[s], a.labelOffset = o ? p[d[s]] - p[d.onZero] : 0, e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), B(i.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
        var v = e.get("axisLabel.rotate");
        return a.labelRotate = "top" === l ? -v : v, a.z2 = 1, a
    }
    $f.registerAxisPointerClass = function(t, e) {
        tp[t] = e
    }, $f.getAxisPointerClass = function(t) {
        return t && tp[t]
    };
    var ip = ["axisLine", "axisTickLabel", "axisName"],
        np = ["splitArea", "splitLine"],
        rp = $f.extend({
            type: "cartesianAxis",
            axisPointerClass: "CartesianAxisPointer",
            render: function(t, e, i, n) {
                this.group.removeAll();
                var r = this._axisGroup;
                if (this._axisGroup = new Ae, this.group.add(this._axisGroup), t.get("show")) {
                    var a = t.getCoordSysModel(),
                        o = ep(a, t),
                        s = new Bf(t, o);
                    S(ip, s.add, s), this._axisGroup.add(s.getGroup()), S(np, function(e) {
                        t.get(e + ".show") && this["_" + e](t, a)
                    }, this), Eo(r, this._axisGroup, t), rp.superCall(this, "render", t, e, i, n)
                }
            },
            remove: function() {
                this._splitAreaColors = null
            },
            _splitLine: function(t, e) {
                var i = t.axis;
                if (!i.scale.isBlank()) {
                    var n = t.getModel("splitLine"),
                        r = n.getModel("lineStyle"),
                        a = r.get("color");
                    a = D(a) ? a : [a];
                    for (var o = e.coordinateSystem.getRect(), s = i.isHorizontal(), l = 0, h = i.getTicksCoords({
                            tickModel: n
                        }), u = [], c = [], d = r.getLineStyle(), f = 0; f < h.length; f++) {
                        var p = i.toGlobalCoord(h[f].coord);
                        s ? (u[0] = p, u[1] = o.y, c[0] = p, c[1] = o.y + o.height) : (u[0] = o.x, u[1] = p, c[0] = o.x + o.width, c[1] = p);
                        var g = l++ % a.length,
                            v = h[f].tickValue;
                        this._axisGroup.add(new Va(so({
                            anid: null != v ? "line_" + h[f].tickValue : null,
                            shape: {
                                x1: u[0],
                                y1: u[1],
                                x2: c[0],
                                y2: c[1]
                            },
                            style: m({
                                stroke: a[g]
                            }, d),
                            silent: !0
                        })))
                    }
                }
            },
            _splitArea: function(t, e) {
                var i = t.axis;
                if (!i.scale.isBlank()) {
                    var n = t.getModel("splitArea"),
                        r = n.getModel("areaStyle"),
                        a = r.get("color"),
                        o = e.coordinateSystem.getRect(),
                        s = i.getTicksCoords({
                            tickModel: n,
                            clamp: !0
                        });
                    if (s.length) {
                        var l = a.length,
                            h = this._splitAreaColors,
                            u = Z(),
                            c = 0;
                        if (h)
                            for (var d = 0; d < s.length; d++) {
                                var f = h.get(s[d].tickValue);
                                if (null != f) {
                                    c = (f + (l - 1) * d) % l;
                                    break
                                }
                            }
                        var p = i.toGlobalCoord(s[0].coord),
                            g = r.getAreaStyle();
                        a = D(a) ? a : [a];
                        for (d = 1; d < s.length; d++) {
                            var v, y, x, _, w = i.toGlobalCoord(s[d].coord);
                            i.isHorizontal() ? (v = p, y = o.y, x = w - v, _ = o.height, p = v + x) : (v = o.x, y = p, x = o.width, p = y + (_ = w - y));
                            var b = s[d - 1].tickValue;
                            null != b && u.set(b, c), this._axisGroup.add(new Fa({
                                anid: null != b ? "area_" + b : null,
                                shape: {
                                    x: v,
                                    y: y,
                                    width: x,
                                    height: _
                                },
                                style: m({
                                    fill: a[c]
                                }, g),
                                silent: !0
                            })), c = (c + 1) % l
                        }
                        this._splitAreaColors = u
                    }
                }
            }
        });
    rp.extend({
        type: "xAxis"
    }), rp.extend({
        type: "yAxis"
    }), qu({
        type: "grid",
        render: function(t, e) {
            this.group.removeAll(), t.get("show") && this.group.add(new Fa({
                shape: t.coordinateSystem.getRect(),
                style: m({
                    fill: t.get("backgroundColor")
                }, t.getItemStyle()),
                silent: !0,
                z2: -1
            }))
        }
    }), Ru(function(t) {
        t.xAxis && t.yAxis && !t.grid && (t.grid = {})
    }), Vu(cd("line", "circle", "line")), Fu(dd("line")), Bu(jh.PROCESSOR.STATISTIC, function(t) {
        return {
            seriesType: t,
            modifyOutputEnd: !0,
            reset: function(t, e, i) {
                var n = t.getData(),
                    r = t.get("sampling"),
                    a = t.coordinateSystem;
                if ("cartesian2d" === a.type && r) {
                    var o, s = a.getBaseAxis(),
                        l = a.getOtherAxis(s),
                        h = s.getExtent(),
                        u = h[1] - h[0],
                        c = Math.round(n.count() / u);
                    c > 1 && ("string" == typeof r ? o = fd[r] : "function" == typeof r && (o = r), o && t.setData(n.downSample(n.mapDimension(l.dim), 1 / c, o, pd)))
                }
            }
        }
    }("line")), Xl.extend({
        type: "series.effectScatter",
        dependencies: ["grid", "polar"],
        getInitialData: function(t, e) {
            return wc(this.getSource(), this)
        },
        brushSelector: "point",
        defaultOption: {
            coordinateSystem: "cartesian2d",
            zlevel: 0,
            z: 2,
            legendHoverLink: !0,
            effectType: "ripple",
            progressive: 0,
            showEffectOn: "render",
            rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: "fill"
            },
            symbolSize: 10
        }
    });

    function ap(t, e) {
        t.eachChild(function(t) {
            t.attr({
                z: e.z,
                zlevel: e.zlevel,
                style: {
                    stroke: "stroke" === e.brushType ? e.color : null,
                    fill: "fill" === e.brushType ? e.color : null
                }
            })
        })
    }

    function op(t, e) {
        Ae.call(this);
        var i = new Pc(t, e),
            n = new Ae;
        this.add(i), this.add(n), n.beforeUpdate = function() {
            this.attr(i.getScale())
        }, this.updateData(t, e)
    }
    var sp = op.prototype;
    sp.stopEffectAnimation = function() {
        this.childAt(1).removeAll()
    }, sp.startEffectAnimation = function(t) {
        for (var e = t.symbolType, i = t.color, n = this.childAt(1), r = 0; r < 3; r++) {
            var a = kc(e, -1, -1, 2, 2, i);
            a.attr({
                style: {
                    strokeNoScale: !0
                },
                z2: 99,
                silent: !0,
                scale: [.5, .5]
            });
            var o = -r / 3 * t.period + t.effectOffset;
            a.animate("", !0).when(t.period, {
                scale: [t.rippleScale / 2, t.rippleScale / 2]
            }).delay(o).start(), a.animateStyle(!0).when(t.period, {
                opacity: 0
            }).delay(o).start(), n.add(a)
        }
        ap(n, t)
    }, sp.updateEffectAnimation = function(t) {
        for (var e = this._effectCfg, i = this.childAt(1), n = ["symbolType", "period", "rippleScale"], r = 0; r < n.length; r++) {
            var a = n[r];
            if (e[a] !== t[a]) return this.stopEffectAnimation(), void this.startEffectAnimation(t)
        }
        ap(i, t)
    }, sp.highlight = function() {
        this.trigger("emphasis")
    }, sp.downplay = function() {
        this.trigger("normal")
    }, sp.updateData = function(t, e) {
        var i = t.hostModel;
        this.childAt(0).updateData(t, e);
        var n = this.childAt(1),
            r = t.getItemModel(e),
            a = t.getItemVisual(e, "symbol"),
            o = function(t) {
                return D(t) || (t = [+t, +t]), t
            }(t.getItemVisual(e, "symbolSize")),
            s = t.getItemVisual(e, "color");
        n.attr("scale", o), n.traverse(function(t) {
            t.attr({
                fill: s
            })
        });
        var l = r.getShallow("symbolOffset");
        if (l) {
            var h = n.position;
            h[0] = Ko(l[0], o[0]), h[1] = Ko(l[1], o[1])
        }
        n.rotation = (r.getShallow("symbolRotate") || 0) * Math.PI / 180 || 0;
        var u = {};
        if (u.showEffectOn = i.get("showEffectOn"), u.rippleScale = r.get("rippleEffect.scale"), u.brushType = r.get("rippleEffect.brushType"), u.period = 1e3 * r.get("rippleEffect.period"), u.effectOffset = e / t.count(), u.z = r.getShallow("z") || 0, u.zlevel = r.getShallow("zlevel") || 0, u.symbolType = a, u.color = s, this.off("mouseover").off("mouseout").off("emphasis").off("normal"), "render" === u.showEffectOn) this._effectCfg ? this.updateEffectAnimation(u) : this.startEffectAnimation(u), this._effectCfg = u;
        else {
            this._effectCfg = null, this.stopEffectAnimation();
            var c = this.childAt(0),
                d = function() {
                    c.highlight(), "render" !== u.showEffectOn && this.startEffectAnimation(u)
                },
                f = function() {
                    c.downplay(), "render" !== u.showEffectOn && this.stopEffectAnimation()
                };
            this.on("mouseover", d, this).on("mouseout", f, this).on("emphasis", d, this).on("normal", f, this)
        }
        this._effectCfg = u
    }, sp.fadeOut = function(t) {
        this.off("mouseover").off("mouseout").off("emphasis").off("normal"), t && t()
    }, w(op, Ae), Xu({
        type: "effectScatter",
        init: function() {
            this._symbolDraw = new Vc(op)
        },
        render: function(t, e, i) {
            var n = t.getData(),
                r = this._symbolDraw;
            r.updateData(n), this.group.add(r.group)
        },
        updateTransform: function(t, e, i) {
            var n = t.getData();
            this.group.dirty();
            var r = dd().reset(t);
            r.progress && r.progress({
                start: 0,
                end: n.count()
            }, n), this._symbolDraw.updateLayout(n)
        },
        _updateGroupTransform: function(t) {
            var e, i, n = t.coordinateSystem;
            n && n.getRoamTransform && (this.group.transform = (e = n.getRoamTransform(), wt(i = xt(), e), i), this.group.decomposeTransform())
        },
        remove: function(t, e) {
            this._symbolDraw && this._symbolDraw.remove(e)
        },
        dispose: function() {}
    }), Vu(cd("effectScatter", "circle")), Fu(dd("effectScatter"));
    var lp = S,
        hp = "\0__link_datas",
        up = "\0__link_mainData";

    function cp(t, e) {
        if ((n = this)[up] === n) {
            var i = v({}, this[hp]);
            i[this.dataType] = e, gp(e, i, t)
        } else vp(e, this.dataType, this[up], t);
        var n;
        return e
    }

    function dp(t, e) {
        return t.struct && t.struct.update(this), e
    }

    function fp(t, e) {
        return lp(e[hp], function(i, n) {
            i !== e && vp(i.cloneShallow(), n, e, t)
        }), e
    }

    function pp(t) {
        var e = this[up];
        return null == t || null == e ? e : e[hp][t]
    }

    function gp(t, e, i) {
        t[hp] = {}, lp(e, function(e, n) {
            vp(e, n, t, i)
        })
    }

    function vp(t, e, i, n) {
        i[hp][e] = t, t[up] = i, t.dataType = e, n.struct && (t[n.structAttr] = n.struct, n.struct[n.datasAttr[e]] = t), t.getLinkedData = pp
    }
    var mp = function(t, e) {
        this.name = t || "", this.depth = 0, this.height = 0, this.parentNode = null, this.dataIndex = -1, this.children = [], this.viewChildren = [], this.hostTree = e
    };

    function yp(t, e, i) {
        this.root, this.data, this._nodes = [], this.hostModel = t, this.levelModels = T(e || [], function(e) {
            return new Go(e, t, t.ecModel)
        }), this.leavesModel = new Go(i || {}, t, t.ecModel)
    }

    function xp(t, e, i) {
        if (t && _(e, t.type) >= 0) {
            var n = i.getData().tree.root,
                r = t.targetNode;
            if (r && n.contains(r)) return {
                node: r
            };
            var a = t.targetNodeId;
            if (null != a && (r = n.getNodeById(a))) return {
                node: r
            }
        }
    }
    mp.prototype = {
        constructor: mp,
        isRemoved: function() {
            return this.dataIndex < 0
        },
        eachNode: function(t, e, i) {
            "function" == typeof t && (i = e, e = t, t = null), P(t = t || {}) && (t = {
                order: t
            });
            var n, r = t.order || "preorder",
                a = this[t.attr || "children"];
            "preorder" === r && (n = e.call(i, this));
            for (var o = 0; !n && o < a.length; o++) a[o].eachNode(t, e, i);
            "postorder" === r && e.call(i, this)
        },
        updateDepthAndHeight: function(t) {
            var e = 0;
            this.depth = t;
            for (var i = 0; i < this.children.length; i++) {
                var n = this.children[i];
                n.updateDepthAndHeight(t + 1), n.height > e && (e = n.height)
            }
            this.height = e + 1
        },
        getNodeById: function(t) {
            if (this.getId() === t) return this;
            for (var e = 0, i = this.children, n = i.length; e < n; e++) {
                var r = i[e].getNodeById(t);
                if (r) return r
            }
        },
        contains: function(t) {
            if (t === this) return !0;
            for (var e = 0, i = this.children, n = i.length; e < n; e++) {
                var r = i[e].contains(t);
                if (r) return r
            }
        },
        getAncestors: function(t) {
            for (var e = [], i = t ? this : this.parentNode; i;) e.push(i), i = i.parentNode;
            return e.reverse(), e
        },
        getValue: function(t) {
            var e = this.hostTree.data;
            return e.get(e.getDimension(t || "value"), this.dataIndex)
        },
        setLayout: function(t, e) {
            this.dataIndex >= 0 && this.hostTree.data.setItemLayout(this.dataIndex, t, e)
        },
        getLayout: function() {
            return this.hostTree.data.getItemLayout(this.dataIndex)
        },
        getModel: function(t) {
            if (!(this.dataIndex < 0)) {
                var e, i = this.hostTree,
                    n = i.data.getItemModel(this.dataIndex),
                    r = this.getLevelModel();
                return r || 0 !== this.children.length && (0 === this.children.length || !1 !== this.isExpand) || (e = this.getLeavesModel()), n.getModel(t, (r || e || i.hostModel).getModel(t))
            }
        },
        getLevelModel: function() {
            return (this.hostTree.levelModels || [])[this.depth]
        },
        getLeavesModel: function() {
            return this.hostTree.leavesModel
        },
        setVisual: function(t, e) {
            this.dataIndex >= 0 && this.hostTree.data.setItemVisual(this.dataIndex, t, e)
        },
        getVisual: function(t, e) {
            return this.hostTree.data.getItemVisual(this.dataIndex, t, e)
        },
        getRawIndex: function() {
            return this.hostTree.data.getRawIndex(this.dataIndex)
        },
        getId: function() {
            return this.hostTree.data.getId(this.dataIndex)
        },
        isAncestorOf: function(t) {
            for (var e = t.parentNode; e;) {
                if (e === this) return !0;
                e = e.parentNode
            }
            return !1
        },
        isDescendantOf: function(t) {
            return t !== this && t.isAncestorOf(this)
        }
    }, yp.prototype = {
        constructor: yp,
        type: "tree",
        eachNode: function(t, e, i) {
            this.root.eachNode(t, e, i)
        },
        getNodeByDataIndex: function(t) {
            var e = this.data.getRawIndex(t);
            return this._nodes[e]
        },
        getNodeByName: function(t) {
            return this.root.getNodeByName(t)
        },
        update: function() {
            for (var t = this.data, e = this._nodes, i = 0, n = e.length; i < n; i++) e[i].dataIndex = -1;
            for (i = 0, n = t.count(); i < n; i++) e[t.getRawIndex(i)].dataIndex = i
        },
        clearLayouts: function() {
            this.data.clearItemLayouts()
        }
    }, yp.createTree = function(t, e, i) {
        var n = new yp(e, i.levels, i.leaves),
            r = [],
            a = 1;
        ! function t(e, i) {
            var o = e.value;
            a = Math.max(a, D(o) ? o.length : 1);
            r.push(e);
            var s = new mp(e.name, n);
            i ? function(t, e) {
                var i = e.children;
                if (t.parentNode === e) return;
                i.push(t), t.parentNode = e
            }(s, i) : n.root = s;
            n._nodes.push(s);
            var l = e.children;
            if (l)
                for (var h = 0; h < l.length; h++) t(l[h], s)
        }(t), n.root.updateDepthAndHeight(0);
        var o, s, l, h = yc(r, {
                coordDimensions: ["value"],
                dimensionsCount: a
            }),
            u = new ac(h, e);
        return u.initData(r), s = (o = {
            mainData: u,
            struct: n,
            structAttr: "tree"
        }).mainData, (l = o.datas) || (l = {
            main: s
        }, o.datasAttr = {
            main: "data"
        }), o.datas = o.mainData = null, gp(s, l, o), lp(l, function(t) {
            lp(s.TRANSFERABLE_METHODS, function(e) {
                t.wrapMethod(e, A(cp, o))
            })
        }), s.wrapMethod("cloneShallow", A(fp, o)), lp(s.CHANGABLE_METHODS, function(t) {
            s.wrapMethod(t, A(dp, o))
        }), W(l[s.dataType] === s), n.update(), n
    }, Xl.extend({
        type: "series.sunburst",
        _viewRoot: null,
        getInitialData: function(t, e) {
            var i = {
                name: t.name,
                children: t.data
            };
            ! function t(e) {
                var i = 0;
                S(e.children, function(e) {
                    t(e);
                    var n = e.value;
                    D(n) && (n = n[0]), i += n
                });
                var n = e.value;
                D(n) && (n = n[0]);
                (null == n || isNaN(n)) && (n = i);
                n < 0 && (n = 0);
                D(e.value) ? e.value[0] = n : e.value = n
            }(i);
            var n = t.levels || [],
                r = {};
            return r.levels = n, yp.createTree(i, this, r).data
        },
        optionUpdated: function() {
            this.resetViewRoot()
        },
        getDataParams: function(t) {
            var e = Xl.prototype.getDataParams.apply(this, arguments),
                i = this.getData().tree.getNodeByDataIndex(t);
            return e.treePathInfo = function(t, e) {
                for (var i = []; t;) {
                    var n = t.dataIndex;
                    i.push({
                        name: t.name,
                        dataIndex: n,
                        value: e.getRawValue(n)
                    }), t = t.parentNode
                }
                return i.reverse(), i
            }(i, this), e
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockwise: !0,
            startAngle: 90,
            minAngle: 0,
            percentPrecision: 2,
            stillShowZeroSum: !0,
            highlightPolicy: "descendant",
            nodeClick: "rootToNode",
            renderLabelForZeroData: !1,
            label: {
                rotate: "radial",
                show: !0,
                opacity: 1,
                align: "center",
                position: "inside",
                distance: 5,
                silent: !0,
                emphasis: {}
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: "white",
                opacity: 1,
                emphasis: {},
                highlight: {
                    opacity: 1
                },
                downplay: {
                    opacity: .9
                }
            },
            animationType: "expansion",
            animationDuration: 1e3,
            animationDurationUpdate: 500,
            animationEasing: "cubicOut",
            data: [],
            levels: [],
            sort: "desc"
        },
        getViewRoot: function() {
            return this._viewRoot
        },
        resetViewRoot: function(t) {
            t ? this._viewRoot = t : t = this._viewRoot;
            var e = this.getRawData().tree.root;
            t && (t === e || e.contains(t)) || (this._viewRoot = e)
        }
    });
    var _p = {
            NONE: "none",
            DESCENDANT: "descendant",
            ANCESTOR: "ancestor",
            SELF: "self"
        },
        wp = 2,
        bp = 4;

    function Mp(t, e, i) {
        Ae.call(this);
        var n = new Pa({
            z2: wp
        });
        n.seriesIndex = e.seriesIndex;
        var r = new Ca({
            z2: bp,
            silent: t.getModel("label").get("silent")
        });

        function a() {
            r.ignore = r.hoverIgnore
        }

        function o() {
            r.ignore = r.normalIgnore
        }
        this.add(n), this.add(r), this.updateData(!0, t, "normal", e, i), this.on("emphasis", a).on("normal", o).on("mouseover", a).on("mouseout", o)
    }
    var Sp = Mp.prototype;
    Sp.updateData = function(t, e, i, n, r) {
        this.node = e, e.piece = this, n = n || this._seriesModel, r = r || this._ecModel;
        var a = this.childAt(0);
        a.dataIndex = e.dataIndex;
        var o = e.getModel(),
            s = e.getLayout();
        s || console.log(e.getLayout());
        var l = v({}, s);
        l.label = null;
        var h, u = function(t, e, i) {
                var n = t.getVisual("color"),
                    r = t.getVisual("visualMeta");
                r && 0 !== r.length || (n = null);
                var a = t.getModel("itemStyle").get("color");
                if (a) return a;
                if (n) return n;
                if (0 === t.depth) return i.option.color[0];
                var o = i.option.color.length;
                a = i.option.color[function(t) {
                    var e = t;
                    for (; e.depth > 1;) e = e.parentNode;
                    return _(t.getAncestors()[0].children, e)
                }(t) % o];
                return a
            }(e, 0, r),
            c = o.getModel("itemStyle").getItemStyle();
        "normal" === i ? h = c : h = g(o.getModel(i + ".itemStyle").getItemStyle(), c);
        h = m({
            lineJoin: "bevel",
            fill: h.fill || u
        }, h), t ? (a.setShape(l), a.shape.r = s.r0, Po(a, {
            shape: {
                r: s.r
            }
        }, n, e.dataIndex), a.useStyle(h)) : "object" == typeof h.fill && h.fill.type || "object" == typeof a.style.fill && a.style.fill.type ? (Po(a, {
            shape: l
        }, n), a.useStyle(h)) : Po(a, {
            shape: l,
            style: h
        }, n), this._updateLabel(n, u, i);
        var d = o.getShallow("cursor");
        if (d && a.attr("cursor", d), t) {
            var f = n.getShallow("highlightPolicy");
            this._initEvents(a, e, n, f)
        }
        this._seriesModel = n || this._seriesModel, this._ecModel = r || this._ecModel
    }, Sp.onEmphasis = function(t) {
        var e = this;
        this.node.hostTree.root.eachNode(function(i) {
            var n, r, a;
            i.piece && (e.node === i ? i.piece.updateData(!1, i, "emphasis") : (n = i, r = e.node, (a = t) !== _p.NONE && (a === _p.SELF ? n === r : a === _p.ANCESTOR ? n === r || n.isAncestorOf(r) : n === r || n.isDescendantOf(r)) ? i.piece.childAt(0).trigger("highlight") : t !== _p.NONE && i.piece.childAt(0).trigger("downplay")))
        })
    }, Sp.onNormal = function() {
        this.node.hostTree.root.eachNode(function(t) {
            t.piece && t.piece.updateData(!1, t, "normal")
        })
    }, Sp.onHighlight = function() {
        this.updateData(!1, this.node, "highlight")
    }, Sp.onDownplay = function() {
        this.updateData(!1, this.node, "downplay")
    }, Sp._updateLabel = function(t, e, i) {
        var n = this.node.getModel(),
            r = n.getModel("label"),
            a = "normal" === i || "emphasis" === i ? r : n.getModel(i + ".label"),
            o = n.getModel("emphasis.label"),
            s = B(t.getFormattedLabel(this.node.dataIndex, "normal", null, null, "label"), this.node.name);
        !1 === M("show") && (s = "");
        var l = this.node.getLayout(),
            h = a.get("minAngle");
        null == h && (h = r.get("minAngle")), h = h / 180 * Math.PI;
        var u = l.endAngle - l.startAngle;
        null != h && Math.abs(u) < h && (s = "");
        var c = this.childAt(1);
        Mo(c.style, c.hoverStyle || {}, r, o, {
            defaultText: a.getShallow("show") ? s : null,
            autoColor: e,
            useInsideStyle: !0
        });
        var d, f = (l.startAngle + l.endAngle) / 2,
            p = Math.cos(f),
            g = Math.sin(f),
            v = M("position"),
            m = M("distance") || 0,
            y = M("align");
        "outside" === v ? (d = l.r + m, y = f > Math.PI / 2 ? "right" : "left") : y && "center" !== y ? "left" === y ? (d = l.r0 + m, f > Math.PI / 2 && (y = "right")) : "right" === y && (d = l.r - m, f > Math.PI / 2 && (y = "left")) : (d = (l.r + l.r0) / 2, y = "center"), c.attr("style", {
            text: s,
            textAlign: y,
            textVerticalAlign: M("verticalAlign") || "middle",
            opacity: M("opacity")
        });
        var x = d * p + l.cx,
            _ = d * g + l.cy;
        c.attr("position", [x, _]);
        var w = M("rotate"),
            b = 0;

        function M(t) {
            var e = a.get(t);
            return null == e ? r.get(t) : e
        }
        "radial" === w ? (b = -f) < -Math.PI / 2 && (b += Math.PI) : "tangential" === w ? (b = Math.PI / 2 - f) > Math.PI / 2 ? b -= Math.PI : b < -Math.PI / 2 && (b += Math.PI) : "number" == typeof w && (b = w * Math.PI / 180), c.attr("rotation", b)
    }, Sp._initEvents = function(t, e, i, n) {
        t.off("mouseover").off("mouseout").off("emphasis").off("normal");
        var r = this,
            a = function() {
                r.onEmphasis(n)
            },
            o = function() {
                r.onNormal()
            };
        i.isAnimationEnabled() && t.on("mouseover", a).on("mouseout", o).on("emphasis", a).on("normal", o).on("downplay", function() {
            r.onDownplay()
        }).on("highlight", function() {
            r.onHighlight()
        })
    }, w(Mp, Ae);
    rh.extend({
        type: "sunburst",
        init: function() {},
        render: function(t, e, i, n) {
            var r = this;
            this.seriesModel = t, this.api = i, this.ecModel = e;
            var a = t.getData(),
                o = a.tree.root,
                s = t.getViewRoot(),
                l = this.group,
                h = t.get("renderLabelForZeroData"),
                u = [];
            s.eachNode(function(t) {
                u.push(t)
            });
            var c = this._oldChildren || [];
            if (function(i, n) {
                    if (0 === i.length && 0 === n.length) return;

                    function r(t) {
                        return t.getId()
                    }

                    function s(r, s) {
                        var u = null == r ? null : i[r],
                            c = null == s ? null : n[s];
                        ! function(i, n) {
                            h || !i || i.getValue() || (i = null);
                            if (i !== o && n !== o)
                                if (n && n.piece) i ? (n.piece.updateData(!1, i, "normal", t, e), a.setItemGraphicEl(i.dataIndex, n.piece)) : function(t) {
                                    if (!t) return;
                                    t.piece && (l.remove(t.piece), t.piece = null)
                                }(n);
                                else if (i) {
                                var r = new Mp(i, t, e);
                                l.add(r), a.setItemGraphicEl(i.dataIndex, r)
                            }
                        }(u, c)
                    }
                    new Yu(n, i, r, r).add(s).update(s).remove(A(s, null)).execute()
                }(u, c), function(i, n) {
                    if (n.depth > 0) {
                        r.virtualPiece ? r.virtualPiece.updateData(!1, i, "normal", t, e) : (r.virtualPiece = new Mp(i, t, e), l.add(r.virtualPiece)), n.piece._onclickEvent && n.piece.off("click", n.piece._onclickEvent);
                        var a = function(t) {
                            r._rootToNode(n.parentNode)
                        };
                        n.piece._onclickEvent = a, r.virtualPiece.on("click", a)
                    } else r.virtualPiece && (l.remove(r.virtualPiece), r.virtualPiece = null)
                }(o, s), n && n.highlight && n.highlight.piece) {
                var d = t.getShallow("highlightPolicy");
                n.highlight.piece.onEmphasis(d)
            } else if (n && n.unhighlight) {
                var f = this.virtualPiece;
                !f && o.children.length && (f = o.children[0].piece), f && f.onNormal()
            }
            this._initEvents(), this._oldChildren = u
        },
        dispose: function() {},
        _initEvents: function() {
            var t = this,
                e = function(e) {
                    var i = !1;
                    t.seriesModel.getViewRoot().eachNode(function(n) {
                        if (!i && n.piece && n.piece.childAt(0) === e.target) {
                            var r = n.getModel().get("nodeClick");
                            if ("rootToNode" === r) t._rootToNode(n);
                            else if ("link" === r) {
                                var a = n.getModel(),
                                    o = a.get("link");
                                if (o) {
                                    var s = a.get("target", !0) || "_blank";
                                    window.open(o, s)
                                }
                            }
                            i = !0
                        }
                    })
                };
            this.group._onclickEvent && this.group.off("click", this.group._onclickEvent), this.group.on("click", e), this.group._onclickEvent = e
        },
        _rootToNode: function(t) {
            t !== this.seriesModel.getViewRoot() && this.api.dispatchAction({
                type: "sunburstRootToNode",
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: t
            })
        },
        containPoint: function(t, e) {
            var i = e.getData().getItemLayout(0);
            if (i) {
                var n = t[0] - i.cx,
                    r = t[1] - i.cy,
                    a = Math.sqrt(n * n + r * r);
                return a <= i.r && a >= i.r0
            }
        }
    });
    var Tp = "sunburstRootToNode";
    zu({
        type: Tp,
        update: "updateView"
    }, function(t, e) {
        e.eachComponent({
            mainType: "series",
            subType: "sunburst",
            query: t
        }, function(e, i) {
            var n = xp(t, [Tp], e);
            if (n) {
                var r = e.getViewRoot();
                r && (t.direction = (a = r, o = n.node, _(function(t) {
                    for (var e = []; t;)(t = t.parentNode) && e.push(t);
                    return e.reverse()
                }(a), o) >= 0 ? "rollUp" : "drillDown")), e.resetViewRoot(n.node)
            }
            var a, o
        })
    });
    var Ip = "sunburstHighlight";
    zu({
        type: Ip,
        update: "updateView"
    }, function(t, e) {
        e.eachComponent({
            mainType: "series",
            subType: "sunburst",
            query: t
        }, function(e, i) {
            var n = xp(t, [Ip], e);
            n && (t.highlight = n.node)
        })
    });
    zu({
        type: "sunburstUnhighlight",
        update: "updateView"
    }, function(t, e) {
        e.eachComponent({
            mainType: "series",
            subType: "sunburst",
            query: t
        }, function(e, i) {
            t.unhighlight = !0
        })
    });
    var Cp = Math.PI / 180;

    function Ap(t) {
        return t.get("stack") || "__ec_stack_" + t.seriesIndex
    }

    function Dp(t) {
        return t.dim
    }

    function kp(t, e) {
        vf.call(this, "radius", t, e), this.type = "category"
    }

    function Pp(t, e) {
        e = e || [0, 360], vf.call(this, "angle", t, e), this.type = "category"
    }
    Vu(A(function(t) {
        return {
            getTargetSeries: function(e) {
                var i = {},
                    n = Z();
                return e.eachSeriesByType(t, function(t) {
                    t.__paletteScope = i, n.set(t.uid, t)
                }), n
            },
            reset: function(t, e) {
                var i = t.getRawData(),
                    n = {},
                    r = t.getData();
                r.each(function(t) {
                    var e = r.getRawIndex(t);
                    n[e] = t
                }), i.each(function(e) {
                    var a = n[e],
                        o = null != a && r.getItemVisual(a, "color", !0);
                    if (o) i.setItemVisual(e, "color", o);
                    else {
                        var s = i.getItemModel(e).get("itemStyle.color") || t.getColorFromPalette(i.getName(e) || e + "", t.__paletteScope, i.count());
                        i.setItemVisual(e, "color", s), null != a && r.setItemVisual(a, "color", s)
                    }
                })
            }
        }
    }, "sunburst")), Fu(A(function(t, e, i, n) {
        e.eachSeriesByType(t, function(t) {
            var e = t.get("center"),
                n = t.get("radius");
            D(n) || (n = [0, n]), D(e) || (e = [e, e]);
            var r = i.getWidth(),
                a = i.getHeight(),
                o = Math.min(r, a),
                s = Ko(e[0], r),
                l = Ko(e[1], a),
                h = Ko(n[0], o / 2),
                u = Ko(n[1], o / 2),
                c = -t.get("startAngle") * Cp,
                d = t.get("minAngle") * Cp,
                f = t.getData().tree.root,
                p = t.getViewRoot(),
                g = p.depth,
                v = t.get("sort");
            null != v && function t(e, i) {
                var n = e.children || [];
                e.children = function(t, e) {
                    if ("function" == typeof e) return t.sort(e);
                    var i = "asc" === e;
                    return t.sort(function(t, e) {
                        var n = (t.getValue() - e.getValue()) * (i ? 1 : -1);
                        return 0 === n ? (t.dataIndex - e.dataIndex) * (i ? -1 : 1) : n
                    })
                }(n, i), n.length && S(e.children, function(e) {
                    t(e, i)
                })
            }(p, v);
            var m = 0;
            S(p.children, function(t) {
                !isNaN(t.getValue()) && m++
            });
            var y = p.getValue(),
                x = Math.PI / (y || m) * 2,
                _ = p.depth > 0,
                w = p.height - (_ ? -1 : 1),
                b = (u - h) / (w || 1),
                M = t.get("clockwise"),
                T = t.get("stillShowZeroSum"),
                I = M ? 1 : -1,
                C = function(t, e) {
                    if (t) {
                        var i = e;
                        if (t !== f) {
                            var n = t.getValue(),
                                r = 0 === y && T ? x : n * x;
                            r < d && (r = d), i = e + I * r;
                            var a = t.depth - g - (_ ? -1 : 1),
                                u = h + b * a,
                                c = h + b * (a + 1),
                                p = t.getModel();
                            null != p.get("r0") && (u = Ko(p.get("r0"), o / 2)), null != p.get("r") && (c = Ko(p.get("r"), o / 2)), t.setLayout({
                                angle: r,
                                startAngle: e,
                                endAngle: i,
                                clockwise: M,
                                cx: s,
                                cy: l,
                                r0: u,
                                r: c
                            })
                        }
                        if (t.children && t.children.length) {
                            var v = 0;
                            S(t.children, function(t) {
                                v += C(t, e + v)
                            })
                        }
                        return i - e
                    }
                };
            if (_) {
                var A = h,
                    k = h + b,
                    P = 2 * Math.PI;
                f.setLayout({
                    angle: P,
                    startAngle: c,
                    endAngle: c + P,
                    clockwise: M,
                    cx: s,
                    cy: l,
                    r0: A,
                    r: k
                })
            }
            C(p, c)
        })
    }, "sunburst")), Bu(A(function(t) {
        return {
            seriesType: t,
            reset: function(t, e) {
                var i = e.findComponents({
                    mainType: "legend"
                });
                if (i && i.length) {
                    var n = t.getData();
                    n.filterSelf(function(t) {
                        for (var e = n.getName(t), r = 0; r < i.length; r++)
                            if (!i[r].isSelected(e)) return !1;
                        return !0
                    })
                }
            }
        }
    }, "sunburst")), kp.prototype = {
        constructor: kp,
        pointToData: function(t, e) {
            return this.polar.pointToData(t, e)["radius" === this.dim ? 0 : 1]
        },
        dataToRadius: vf.prototype.dataToCoord,
        radiusToData: vf.prototype.coordToData
    }, w(kp, vf), Pp.prototype = {
        constructor: Pp,
        pointToData: function(t, e) {
            return this.polar.pointToData(t, e)["radius" === this.dim ? 0 : 1]
        },
        dataToAngle: vf.prototype.dataToCoord,
        angleToData: vf.prototype.coordToData
    }, w(Pp, vf);
    var Lp = function(t) {
        this.name = t || "", this.cx = 0, this.cy = 0, this._radiusAxis = new kp, this._angleAxis = new Pp, this._radiusAxis.polar = this._angleAxis.polar = this
    };
    Lp.prototype = {
        type: "polar",
        axisPointerEnabled: !0,
        constructor: Lp,
        dimensions: ["radius", "angle"],
        model: null,
        containPoint: function(t) {
            var e = this.pointToCoord(t);
            return this._radiusAxis.contain(e[0]) && this._angleAxis.contain(e[1])
        },
        containData: function(t) {
            return this._radiusAxis.containData(t[0]) && this._angleAxis.containData(t[1])
        },
        getAxis: function(t) {
            return this["_" + t + "Axis"]
        },
        getAxes: function() {
            return [this._radiusAxis, this._angleAxis]
        },
        getAxesByScale: function(t) {
            var e = [],
                i = this._angleAxis,
                n = this._radiusAxis;
            return i.scale.type === t && e.push(i), n.scale.type === t && e.push(n), e
        },
        getAngleAxis: function() {
            return this._angleAxis
        },
        getRadiusAxis: function() {
            return this._radiusAxis
        },
        getOtherAxis: function(t) {
            var e = this._angleAxis;
            return t === e ? this._radiusAxis : e
        },
        getBaseAxis: function() {
            return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAngleAxis()
        },
        getTooltipAxes: function(t) {
            var e = null != t && "auto" !== t ? this.getAxis(t) : this.getBaseAxis();
            return {
                baseAxes: [e],
                otherAxes: [this.getOtherAxis(e)]
            }
        },
        dataToPoint: function(t, e) {
            return this.coordToPoint([this._radiusAxis.dataToRadius(t[0], e), this._angleAxis.dataToAngle(t[1], e)])
        },
        pointToData: function(t, e) {
            var i = this.pointToCoord(t);
            return [this._radiusAxis.radiusToData(i[0], e), this._angleAxis.angleToData(i[1], e)]
        },
        pointToCoord: function(t) {
            var e = t[0] - this.cx,
                i = t[1] - this.cy,
                n = this.getAngleAxis(),
                r = n.getExtent(),
                a = Math.min(r[0], r[1]),
                o = Math.max(r[0], r[1]);
            n.inverse ? a = o - 360 : o = a + 360;
            var s = Math.sqrt(e * e + i * i);
            e /= s, i /= s;
            for (var l = Math.atan2(-i, e) / Math.PI * 180, h = l < a ? 1 : -1; l < a || l > o;) l += 360 * h;
            return [s, l]
        },
        coordToPoint: function(t) {
            var e = t[0],
                i = t[1] / 180 * Math.PI;
            return [Math.cos(i) * e + this.cx, -Math.sin(i) * e + this.cy]
        }
    };
    var Op = Ts.extend({
        type: "polarAxis",
        axis: null,
        getCoordSysModel: function() {
            return this.ecModel.queryComponents({
                mainType: "polar",
                index: this.option.polarIndex,
                id: this.option.polarId
            })[0]
        }
    });
    g(Op.prototype, Mf);
    var Ep = {
        splitNumber: 5
    };

    function Np(t, e) {
        return e.type || (e.data ? "category" : "value")
    }

    function Rp(t, e) {
        var i = this,
            n = i.getAngleAxis(),
            r = i.getRadiusAxis();
        if (n.scale.setExtent(1 / 0, -1 / 0), r.scale.setExtent(1 / 0, -1 / 0), t.eachSeries(function(t) {
                if (t.coordinateSystem === i) {
                    var e = t.getData();
                    S(e.mapDimension("radius", !0), function(t) {
                        r.scale.unionExtentFromData(e, _c(e, t))
                    }), S(e.mapDimension("angle", !0), function(t) {
                        n.scale.unionExtentFromData(e, _c(e, t))
                    })
                }
            }), $d(n.scale, n.model), $d(r.scale, r.model), "category" === n.type && !n.onBand) {
            var a = n.getExtent(),
                o = 360 / n.scale.count();
            n.inverse ? a[1] += o : a[1] -= o, n.setExtent(a[0], a[1])
        }
    }

    function Bp(t, e) {
        if (t.type = e.get("type"), t.scale = Qd(e), t.onBand = e.get("boundaryGap") && "category" === t.type, t.inverse = e.get("inverse"), "angleAxis" === e.mainType) {
            t.inverse ^= e.get("clockwise");
            var i = e.get("startAngle");
            t.setExtent(i, i + (t.inverse ? -360 : 360))
        }
        e.axis = t, t.model = e
    }
    bf("angle", Op, Np, {
        startAngle: 90,
        clockwise: !0,
        splitNumber: 12,
        axisLabel: {
            rotate: !1
        }
    }), bf("radius", Op, Np, Ep), Gu({
        type: "polar",
        dependencies: ["polarAxis", "angleAxis"],
        coordinateSystem: null,
        findAxisModel: function(t) {
            var e;
            return this.ecModel.eachComponent(t, function(t) {
                t.getCoordSysModel() === this && (e = t)
            }, this), e
        },
        defaultOption: {
            zlevel: 0,
            z: 0,
            center: ["50%", "50%"],
            radius: "80%"
        }
    });
    var zp = {
        dimensions: Lp.prototype.dimensions,
        create: function(t, e) {
            var i = [];
            return t.eachComponent("polar", function(t, n) {
                var r = new Lp(n);
                r.update = Rp;
                var a = r.getRadiusAxis(),
                    o = r.getAngleAxis(),
                    s = t.findAxisModel("radiusAxis"),
                    l = t.findAxisModel("angleAxis");
                Bp(a, s), Bp(o, l),
                    function(t, e, i) {
                        var n = e.get("center"),
                            r = i.getWidth(),
                            a = i.getHeight();
                        t.cx = Ko(n[0], r), t.cy = Ko(n[1], a);
                        var o = t.getRadiusAxis(),
                            s = Math.min(r, a) / 2,
                            l = Ko(e.get("radius"), s);
                        o.inverse ? o.setExtent(l, 0) : o.setExtent(0, l)
                    }(r, t, e), i.push(r), t.coordinateSystem = r, r.model = t
            }), t.eachSeries(function(e) {
                if ("polar" === e.get("coordinateSystem")) {
                    var i = t.queryComponents({
                        mainType: "polar",
                        index: e.get("polarIndex"),
                        id: e.get("polarId")
                    })[0];
                    e.coordinateSystem = i.coordinateSystem
                }
            }), i
        }
    };
    el.register("polar", zp);
    var Fp = ["axisLine", "axisLabel", "axisTick", "splitLine", "splitArea"];

    function Vp(t, e, i) {
        e[1] > e[0] && (e = e.slice().reverse());
        var n = t.coordToPoint([e[0], i]),
            r = t.coordToPoint([e[1], i]);
        return {
            x1: n[0],
            y1: n[1],
            x2: r[0],
            y2: r[1]
        }
    }

    function Hp(t) {
        return t.getRadiusAxis().inverse ? 0 : 1
    }

    function Wp(t) {
        var e = t[0],
            i = t[t.length - 1];
        e && i && Math.abs(Math.abs(e.coord - i.coord) - 360) < 1e-4 && t.pop()
    }
    $f.extend({
        type: "angleAxis",
        axisPointerClass: "PolarAxisPointer",
        render: function(t, e) {
            if (this.group.removeAll(), t.get("show")) {
                var i = t.axis,
                    n = i.polar,
                    r = n.getRadiusAxis().getExtent(),
                    a = i.getTicksCoords(),
                    o = T(i.getViewLabels(), function(t) {
                        return (t = p(t)).coord = i.dataToCoord(t.tickValue), t
                    });
                Wp(o), Wp(a), S(Fp, function(e) {
                    !t.get(e + ".show") || i.scale.isBlank() && "axisLine" !== e || this["_" + e](t, n, a, r, o)
                }, this)
            }
        },
        _axisLine: function(t, e, i, n) {
            var r = t.getModel("axisLine.lineStyle"),
                a = new Aa({
                    shape: {
                        cx: e.cx,
                        cy: e.cy,
                        r: n[Hp(e)]
                    },
                    style: r.getLineStyle(),
                    z2: 1,
                    silent: !0
                });
            a.style.fill = null, this.group.add(a)
        },
        _axisTick: function(t, e, i, n) {
            var r = t.getModel("axisTick"),
                a = (r.get("inside") ? -1 : 1) * r.get("length"),
                o = n[Hp(e)],
                s = T(i, function(t) {
                    return new Va({
                        shape: Vp(e, [o, o + a], t.coord)
                    })
                });
            this.group.add(ao(s, {
                style: m(r.getModel("lineStyle").getLineStyle(), {
                    stroke: t.get("axisLine.lineStyle.color")
                })
            }))
        },
        _axisLabel: function(t, e, i, n, r) {
            var a = t.getCategories(!0),
                o = t.getModel("axisLabel"),
                s = o.get("margin");
            S(r, function(i, r) {
                var l = o,
                    h = i.tickValue,
                    u = n[Hp(e)],
                    c = e.coordToPoint([u + s, i.coord]),
                    d = e.cx,
                    f = e.cy,
                    p = Math.abs(c[0] - d) / u < .3 ? "center" : c[0] > d ? "left" : "right",
                    g = Math.abs(c[1] - f) / u < .3 ? "middle" : c[1] > f ? "top" : "bottom";
                a && a[h] && a[h].textStyle && (l = new Go(a[h].textStyle, o, o.ecModel));
                var v = new Ca({
                    silent: !0
                });
                this.group.add(v), So(v.style, l, {
                    x: c[0],
                    y: c[1],
                    textFill: l.getTextColor() || t.get("axisLine.lineStyle.color"),
                    text: i.formattedLabel,
                    textAlign: p,
                    textVerticalAlign: g
                })
            }, this)
        },
        _splitLine: function(t, e, i, n) {
            var r = t.getModel("splitLine").getModel("lineStyle"),
                a = r.get("color"),
                o = 0;
            a = a instanceof Array ? a : [a];
            for (var s = [], l = 0; l < i.length; l++) {
                var h = o++ % a.length;
                s[h] = s[h] || [], s[h].push(new Va({
                    shape: Vp(e, n, i[l].coord)
                }))
            }
            for (l = 0; l < s.length; l++) this.group.add(ao(s[l], {
                style: m({
                    stroke: a[l % a.length]
                }, r.getLineStyle()),
                silent: !0,
                z: t.get("z")
            }))
        },
        _splitArea: function(t, e, i, n) {
            if (i.length) {
                var r = t.getModel("splitArea").getModel("areaStyle"),
                    a = r.get("color"),
                    o = 0;
                a = a instanceof Array ? a : [a];
                for (var s = [], l = Math.PI / 180, h = -i[0].coord * l, u = Math.min(n[0], n[1]), c = Math.max(n[0], n[1]), d = t.get("clockwise"), f = 1; f < i.length; f++) {
                    var p = o++ % a.length;
                    s[p] = s[p] || [], s[p].push(new Pa({
                        shape: {
                            cx: e.cx,
                            cy: e.cy,
                            r0: u,
                            r: c,
                            startAngle: h,
                            endAngle: -i[f].coord * l,
                            clockwise: d
                        },
                        silent: !0
                    })), h = -i[f].coord * l
                }
                for (f = 0; f < s.length; f++) this.group.add(ao(s[f], {
                    style: m({
                        fill: a[f % a.length]
                    }, r.getAreaStyle()),
                    silent: !0
                }))
            }
        }
    });
    var Gp = ["axisLine", "axisTickLabel", "axisName"],
        qp = ["splitLine", "splitArea"];
    $f.extend({
        type: "radiusAxis",
        axisPointerClass: "PolarAxisPointer",
        render: function(t, e) {
            if (this.group.removeAll(), t.get("show")) {
                var i = t.axis,
                    n = i.polar,
                    r = n.getAngleAxis(),
                    a = i.getTicksCoords(),
                    o = r.getExtent()[0],
                    s = i.getExtent(),
                    l = function(t, e, i) {
                        return {
                            position: [t.cx, t.cy],
                            rotation: i / 180 * Math.PI,
                            labelDirection: -1,
                            tickDirection: -1,
                            nameDirection: 1,
                            labelRotate: e.getModel("axisLabel").get("rotate"),
                            z2: 1
                        }
                    }(n, t, o),
                    h = new Bf(t, l);
                S(Gp, h.add, h), this.group.add(h.getGroup()), S(qp, function(e) {
                    t.get(e + ".show") && !i.scale.isBlank() && this["_" + e](t, n, o, s, a)
                }, this)
            }
        },
        _splitLine: function(t, e, i, n, r) {
            var a = t.getModel("splitLine").getModel("lineStyle"),
                o = a.get("color"),
                s = 0;
            o = o instanceof Array ? o : [o];
            for (var l = [], h = 0; h < r.length; h++) {
                var u = s++ % o.length;
                l[u] = l[u] || [], l[u].push(new Aa({
                    shape: {
                        cx: e.cx,
                        cy: e.cy,
                        r: r[h].coord
                    },
                    silent: !0
                }))
            }
            for (h = 0; h < l.length; h++) this.group.add(ao(l[h], {
                style: m({
                    stroke: o[h % o.length],
                    fill: null
                }, a.getLineStyle()),
                silent: !0
            }))
        },
        _splitArea: function(t, e, i, n, r) {
            if (r.length) {
                var a = t.getModel("splitArea").getModel("areaStyle"),
                    o = a.get("color"),
                    s = 0;
                o = o instanceof Array ? o : [o];
                for (var l = [], h = r[0].coord, u = 1; u < r.length; u++) {
                    var c = s++ % o.length;
                    l[c] = l[c] || [], l[c].push(new Pa({
                        shape: {
                            cx: e.cx,
                            cy: e.cy,
                            r0: h,
                            r: r[u].coord,
                            startAngle: 0,
                            endAngle: 2 * Math.PI
                        },
                        silent: !0
                    })), h = r[u].coord
                }
                for (u = 0; u < l.length; u++) this.group.add(ao(l[u], {
                    style: m({
                        fill: o[u % o.length]
                    }, a.getAreaStyle()),
                    silent: !0
                }))
            }
        }
    });
    var Xp = S,
        Up = A,
        Yp = En();

    function Zp(t, e, i, n, r) {
        var a = t.axis;
        if (!a.scale.isBlank() && a.containData(e))
            if (t.involveSeries) {
                var o = function(t, e) {
                        var i = e.axis,
                            n = i.dim,
                            r = t,
                            a = [],
                            o = Number.MAX_VALUE,
                            s = -1;
                        return Xp(e.seriesModels, function(e, l) {
                            var h, u, c = e.getData().mapDimension(n, !0);
                            if (e.getAxisTooltipData) {
                                var d = e.getAxisTooltipData(c, t, i);
                                u = d.dataIndices, h = d.nestestValue
                            } else {
                                if (!(u = e.getData().indicesOfNearest(c[0], t, "category" === i.type ? .5 : null)).length) return;
                                h = e.getData().get(c[0], u[0])
                            }
                            if (null != h && isFinite(h)) {
                                var f = t - h,
                                    p = Math.abs(f);
                                p <= o && ((p < o || f >= 0 && s < 0) && (o = p, s = f, r = h, a.length = 0), Xp(u, function(t) {
                                    a.push({
                                        seriesIndex: e.seriesIndex,
                                        dataIndexInside: t,
                                        dataIndex: e.getData().getRawIndex(t)
                                    })
                                }))
                            }
                        }), {
                            payloadBatch: a,
                            snapToValue: r
                        }
                    }(e, t),
                    s = o.payloadBatch,
                    l = o.snapToValue;
                s[0] && null == r.seriesIndex && v(r, s[0]), !n && t.snap && a.containData(l) && null != l && (e = l), i.showPointer(t, e, s, r), i.showTooltip(t, o, l)
            } else i.showPointer(t, e)
    }

    function jp(t, e, i, n) {
        t[e.key] = {
            value: i,
            payloadBatch: n
        }
    }

    function Kp(t, e, i, n) {
        var r = i.payloadBatch,
            a = e.axis,
            o = a.model,
            s = e.axisPointerModel;
        if (e.triggerTooltip && r.length) {
            var l = e.coordSys.model,
                h = Kf(l),
                u = t.map[h];
            u || (u = t.map[h] = {
                coordSysId: l.id,
                coordSysIndex: l.componentIndex,
                coordSysType: l.type,
                coordSysMainType: l.mainType,
                dataByAxis: []
            }, t.list.push(u)), u.dataByAxis.push({
                axisDim: a.dim,
                axisIndex: o.componentIndex,
                axisType: o.type,
                axisId: o.id,
                value: n,
                valueLabelOpt: {
                    precision: s.get("label.precision"),
                    formatter: s.get("label.formatter")
                },
                seriesDataIndices: r.slice()
            })
        }
    }

    function $p(t) {
        var e = t.axis.model,
            i = {},
            n = i.axisDim = t.axis.dim;
        return i.axisIndex = i[n + "AxisIndex"] = e.componentIndex, i.axisName = i[n + "AxisName"] = e.name, i.axisId = i[n + "AxisId"] = e.id, i
    }

    function Qp(t) {
        return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1])
    }
    Gu({
        type: "axisPointer",
        coordSysAxesInfo: null,
        defaultOption: {
            show: "auto",
            triggerOn: null,
            zlevel: 0,
            z: 50,
            type: "line",
            snap: !1,
            triggerTooltip: !0,
            value: null,
            status: null,
            link: [],
            animation: null,
            animationDurationUpdate: 200,
            lineStyle: {
                color: "#aaa",
                width: 1,
                type: "solid"
            },
            shadowStyle: {
                color: "rgba(150,150,150,0.3)"
            },
            label: {
                show: !0,
                formatter: null,
                precision: "auto",
                margin: 3,
                color: "#fff",
                padding: [5, 7, 5, 7],
                backgroundColor: "auto",
                borderColor: null,
                borderWidth: 0,
                shadowBlur: 3,
                shadowColor: "#aaa"
            },
            handle: {
                show: !1,
                icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
                size: 45,
                margin: 50,
                color: "#333",
                shadowBlur: 3,
                shadowColor: "#aaa",
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                throttle: 40
            }
        }
    });
    var Jp = En(),
        tg = S;

    function eg(t, e, i) {
        if (!n.node) {
            var r = e.getZr();
            Jp(r).records || (Jp(r).records = {}),
                function(t, e) {
                    if (Jp(t).initialized) return;

                    function i(i, n) {
                        t.on(i, function(i) {
                            var r = function(t) {
                                var e = {
                                        showTip: [],
                                        hideTip: []
                                    },
                                    i = function(n) {
                                        var r = e[n.type];
                                        r ? r.push(n) : (n.dispatchAction = i, t.dispatchAction(n))
                                    };
                                return {
                                    dispatchAction: i,
                                    pendings: e
                                }
                            }(e);
                            tg(Jp(t).records, function(t) {
                                    t && n(t, i, r.dispatchAction)
                                }),
                                function(t, e) {
                                    var i, n = t.showTip.length,
                                        r = t.hideTip.length;
                                    n ? i = t.showTip[n - 1] : r && (i = t.hideTip[r - 1]);
                                    i && (i.dispatchAction = null, e.dispatchAction(i))
                                }(r.pendings, e)
                        })
                    }
                    Jp(t).initialized = !0, i("click", A(ng, "click")), i("mousemove", A(ng, "mousemove")), i("globalout", ig)
                }(r, e), (Jp(r).records[t] || (Jp(r).records[t] = {})).handler = i
        }
    }

    function ig(t, e, i) {
        t.handler("leave", null, i)
    }

    function ng(t, e, i, n) {
        e.handler(t, i, n)
    }

    function rg(t, e) {
        if (!n.node) {
            var i = e.getZr();
            (Jp(i).records || {})[t] && (Jp(i).records[t] = null)
        }
    }
    var ag = qu({
            type: "axisPointer",
            render: function(t, e, i) {
                var n = e.getComponent("tooltip"),
                    r = t.get("triggerOn") || n && n.get("triggerOn") || "mousemove|click";
                eg("axisPointer", i, function(t, e, i) {
                    "none" !== r && ("leave" === t || r.indexOf(t) >= 0) && i({
                        type: "updateAxisPointer",
                        currTrigger: t,
                        x: e && e.offsetX,
                        y: e && e.offsetY
                    })
                })
            },
            remove: function(t, e) {
                rg(e.getZr(), "axisPointer"), ag.superApply(this._model, "remove", arguments)
            },
            dispose: function(t, e) {
                rg("axisPointer", e), ag.superApply(this._model, "dispose", arguments)
            }
        }),
        og = En(),
        sg = p,
        lg = C;

    function hg() {}

    function ug(t, e, i, n) {
        (function t(e, i) {
            if (L(e) && L(i)) {
                var n = !0;
                return S(i, function(i, r) {
                    n = n && t(e[r], i)
                }), !!n
            }
            return e === i
        })(og(i).lastProp, n) || (og(i).lastProp = n, e ? Po(i, n, t) : (i.stopAnimation(), i.attr(n)))
    }

    function cg(t, e) {
        t[e.get("label.show") ? "show" : "hide"]()
    }

    function dg(t) {
        return {
            position: t.position.slice(),
            rotation: t.rotation || 0
        }
    }

    function fg(t, e, i) {
        var n = e.get("z"),
            r = e.get("zlevel");
        t && t.traverse(function(t) {
            "group" !== t.type && (null != n && (t.z = n), null != r && (t.zlevel = r), t.silent = i)
        })
    }

    function pg(t) {
        var e, i = t.get("type"),
            n = t.getModel(i + "Style");
        return "line" === i ? (e = n.getLineStyle()).fill = null : "shadow" === i && ((e = n.getAreaStyle()).stroke = null), e
    }

    function gg(t, e, i, n, r) {
        var a = function(t, e, i, n, r) {
                t = e.scale.parse(t);
                var a = e.scale.getLabel(t, {
                        precision: r.precision
                    }),
                    o = r.formatter;
                if (o) {
                    var s = {
                        value: tf(e, t),
                        seriesData: []
                    };
                    S(n, function(t) {
                        var e = i.getSeriesByIndex(t.seriesIndex),
                            n = t.dataIndexInside,
                            r = e && e.getDataParams(n);
                        r && s.seriesData.push(r)
                    }), P(o) ? a = o.replace("{value}", a) : k(o) && (a = o(s))
                }
                return a
            }(i.get("value"), e.axis, e.ecModel, i.get("seriesDataIndices"), {
                precision: i.get("label.precision"),
                formatter: i.get("label.formatter")
            }),
            o = i.getModel("label"),
            s = os(o.get("padding") || 0),
            l = o.getFont(),
            h = ci(a, l),
            u = r.position,
            c = h.width + s[1] + s[3],
            d = h.height + s[0] + s[2],
            f = r.align;
        "right" === f && (u[0] -= c), "center" === f && (u[0] -= c / 2);
        var p = r.verticalAlign;
        "bottom" === p && (u[1] -= d), "middle" === p && (u[1] -= d / 2),
            function(t, e, i, n) {
                var r = n.getWidth(),
                    a = n.getHeight();
                t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + i, a) - i, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0)
            }(u, c, d, n);
        var g = o.get("backgroundColor");
        g && "auto" !== g || (g = e.get("axisLine.lineStyle.color")), t.label = {
            shape: {
                x: 0,
                y: 0,
                width: c,
                height: d,
                r: o.get("borderRadius")
            },
            position: u.slice(),
            style: {
                text: a,
                textFont: l,
                textFill: o.getTextColor(),
                textPosition: "inside",
                fill: g,
                stroke: o.get("borderColor") || "transparent",
                lineWidth: o.get("borderWidth") || 0,
                shadowBlur: o.get("shadowBlur"),
                shadowColor: o.get("shadowColor"),
                shadowOffsetX: o.get("shadowOffsetX"),
                shadowOffsetY: o.get("shadowOffsetY")
            },
            z2: 10
        }
    }

    function vg(t, e, i) {
        var n = xt();
        return St(n, n, i.rotation), Mt(n, n, i.position), Oo([t.dataToCoord(e), (i.labelOffset || 0) + (i.labelDirection || 1) * (i.labelMargin || 0)], n)
    }

    function mg(t, e, i) {
        return {
            x1: t[i = i || 0],
            y1: t[1 - i],
            x2: e[i],
            y2: e[1 - i]
        }
    }

    function yg(t, e, i, n, r, a) {
        return {
            cx: t,
            cy: e,
            r0: i,
            r: n,
            startAngle: r,
            endAngle: a,
            clockwise: !0
        }
    }
    hg.prototype = {
        _group: null,
        _lastGraphicKey: null,
        _handle: null,
        _dragging: !1,
        _lastValue: null,
        _lastStatus: null,
        _payloadInfo: null,
        animationThreshold: 15,
        render: function(t, e, i, n) {
            var r = e.get("value"),
                a = e.get("status");
            if (this._axisModel = t, this._axisPointerModel = e, this._api = i, n || this._lastValue !== r || this._lastStatus !== a) {
                this._lastValue = r, this._lastStatus = a;
                var o = this._group,
                    s = this._handle;
                if (!a || "hide" === a) return o && o.hide(), void(s && s.hide());
                o && o.show(), s && s.show();
                var l = {};
                this.makeElOption(l, r, t, e, i);
                var h = l.graphicKey;
                h !== this._lastGraphicKey && this.clear(i), this._lastGraphicKey = h;
                var u = this._moveAnimation = this.determineAnimation(t, e);
                if (o) {
                    var c = A(ug, e, u);
                    this.updatePointerEl(o, l, c, e), this.updateLabelEl(o, l, c, e)
                } else o = this._group = new Ae, this.createPointerEl(o, l, t, e), this.createLabelEl(o, l, t, e), i.getZr().add(o);
                fg(o, e, !0), this._renderHandle(r)
            }
        },
        remove: function(t) {
            this.clear(t)
        },
        dispose: function(t) {
            this.clear(t)
        },
        determineAnimation: function(t, e) {
            var i = e.get("animation"),
                n = t.axis,
                r = "category" === n.type,
                a = e.get("snap");
            if (!a && !r) return !1;
            if ("auto" === i || null == i) {
                var o = this.animationThreshold;
                if (r && n.getBandWidth() > o) return !0;
                if (a) {
                    var s = Zf(t).seriesDataCount,
                        l = n.getExtent();
                    return Math.abs(l[0] - l[1]) / s > o
                }
                return !1
            }
            return !0 === i
        },
        makeElOption: function(t, e, i, n, r) {},
        createPointerEl: function(t, e, i, n) {
            var r = e.pointer;
            if (r) {
                var a = og(t).pointerEl = new Ro[r.type](sg(e.pointer));
                t.add(a)
            }
        },
        createLabelEl: function(t, e, i, n) {
            if (e.label) {
                var r = og(t).labelEl = new Fa(sg(e.label));
                t.add(r), cg(r, n)
            }
        },
        updatePointerEl: function(t, e, i) {
            var n = og(t).pointerEl;
            n && (n.setStyle(e.pointer.style), i(n, {
                shape: e.pointer.shape
            }))
        },
        updateLabelEl: function(t, e, i, n) {
            var r = og(t).labelEl;
            r && (r.setStyle(e.label.style), i(r, {
                shape: e.label.shape,
                position: e.label.position
            }), cg(r, n))
        },
        _renderHandle: function(t) {
            if (!this._dragging && this.updateHandleTransform) {
                var e, i = this._axisPointerModel,
                    n = this._api.getZr(),
                    r = this._handle,
                    a = i.getModel("handle"),
                    o = i.get("status");
                if (!a.get("show") || !o || "hide" === o) return r && n.remove(r), void(this._handle = null);
                this._handle || (e = !0, r = this._handle = No(a.get("icon"), {
                    cursor: "move",
                    draggable: !0,
                    onmousemove: function(t) {
                        en(t.event)
                    },
                    onmousedown: lg(this._onHandleDragMove, this, 0, 0),
                    drift: lg(this._onHandleDragMove, this),
                    ondragend: lg(this._onHandleDragEnd, this)
                }), n.add(r)), fg(r, i, !1);
                r.setStyle(a.getItemStyle(null, ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"]));
                var s = a.get("size");
                D(s) || (s = [s, s]), r.attr("scale", [s[0] / 2, s[1] / 2]),
                    function(t, e, i, n) {
                        var r = t[e];
                        if (r) {
                            var a = r[ch] || r,
                                o = r[fh];
                            if (r[dh] !== i || o !== n) {
                                if (null == i || !n) return t[e] = a;
                                (r = t[e] = ph(a, i, "debounce" === n))[ch] = a, r[fh] = n, r[dh] = i
                            }
                        }
                    }(this, "_doDispatchAxisPointer", a.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, e)
            }
        },
        _moveHandleToValue: function(t, e) {
            ug(this._axisPointerModel, !e && this._moveAnimation, this._handle, dg(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)))
        },
        _onHandleDragMove: function(t, e) {
            var i = this._handle;
            if (i) {
                this._dragging = !0;
                var n = this.updateHandleTransform(dg(i), [t, e], this._axisModel, this._axisPointerModel);
                this._payloadInfo = n, i.stopAnimation(), i.attr(dg(n)), og(i).lastProp = null, this._doDispatchAxisPointer()
            }
        },
        _doDispatchAxisPointer: function() {
            if (this._handle) {
                var t = this._payloadInfo,
                    e = this._axisModel;
                this._api.dispatchAction({
                    type: "updateAxisPointer",
                    x: t.cursorPoint[0],
                    y: t.cursorPoint[1],
                    tooltipOption: t.tooltipOption,
                    axesInfo: [{
                        axisDim: e.axis.dim,
                        axisIndex: e.componentIndex
                    }]
                })
            }
        },
        _onHandleDragEnd: function(t) {
            if (this._dragging = !1, this._handle) {
                var e = this._axisPointerModel.get("value");
                this._moveHandleToValue(e), this._api.dispatchAction({
                    type: "hideTip"
                })
            }
        },
        getHandleTransform: null,
        updateHandleTransform: null,
        clear: function(t) {
            this._lastValue = null, this._lastStatus = null;
            var e = t.getZr(),
                i = this._group,
                n = this._handle;
            e && i && (this._lastGraphicKey = null, i && e.remove(i), n && e.remove(n), this._group = null, this._handle = null, this._payloadInfo = null)
        },
        doClear: function() {},
        buildLabel: function(t, e, i) {
            return {
                x: t[i = i || 0],
                y: t[1 - i],
                width: e[i],
                height: e[1 - i]
            }
        }
    }, hg.prototype.constructor = hg, Wn(hg);
    var xg = hg.extend({
        makeElOption: function(t, e, i, n, r) {
            var a = i.axis,
                o = a.grid,
                s = n.get("type"),
                l = _g(o, a).getOtherAxis(a).getGlobalExtent(),
                h = a.toGlobalCoord(a.dataToCoord(e, !0));
            if (s && "none" !== s) {
                var u = pg(n),
                    c = wg[s](a, h, l, u);
                c.style = u, t.graphicKey = c.type, t.pointer = c
            }! function(t, e, i, n, r, a) {
                var o = Bf.innerTextLayout(i.rotation, 0, i.labelDirection);
                i.labelMargin = r.get("label.margin"), gg(e, n, r, a, {
                    position: vg(n.axis, t, i),
                    align: o.textAlign,
                    verticalAlign: o.textVerticalAlign
                })
            }(e, t, ep(o.model, i), i, n, r)
        },
        getHandleTransform: function(t, e, i) {
            var n = ep(e.axis.grid.model, e, {
                labelInside: !1
            });
            return n.labelMargin = i.get("handle.margin"), {
                position: vg(e.axis, t, n),
                rotation: n.rotation + (n.labelDirection < 0 ? Math.PI : 0)
            }
        },
        updateHandleTransform: function(t, e, i, n) {
            var r = i.axis,
                a = r.grid,
                o = r.getGlobalExtent(!0),
                s = _g(a, r).getOtherAxis(r).getGlobalExtent(),
                l = "x" === r.dim ? 0 : 1,
                h = t.position;
            h[l] += e[l], h[l] = Math.min(o[1], h[l]), h[l] = Math.max(o[0], h[l]);
            var u = (s[1] + s[0]) / 2,
                c = [u, u];
            c[l] = h[l];
            return {
                position: h,
                rotation: t.rotation,
                cursorPoint: c,
                tooltipOption: [{
                    verticalAlign: "middle"
                }, {
                    align: "center"
                }][l]
            }
        }
    });

    function _g(t, e) {
        var i = {};
        return i[e.dim + "AxisIndex"] = e.index, t.getCartesian(i)
    }
    var wg = {
        line: function(t, e, i, n) {
            var r = mg([e, i[0]], [e, i[1]], bg(t));
            return so({
                shape: r,
                style: n
            }), {
                type: "Line",
                shape: r
            }
        },
        shadow: function(t, e, i, n) {
            var r, a, o, s = Math.max(1, t.getBandWidth()),
                l = i[1] - i[0];
            return {
                type: "Rect",
                shape: (r = [e - s / 2, i[0]], a = [s, l], o = bg(t), {
                    x: r[o = o || 0],
                    y: r[1 - o],
                    width: a[o],
                    height: a[1 - o]
                })
            }
        }
    };

    function bg(t) {
        return "x" === t.dim ? 0 : 1
    }
    $f.registerAxisPointerClass("CartesianAxisPointer", xg), Ru(function(t) {
        if (t) {
            (!t.axisPointer || 0 === t.axisPointer.length) && (t.axisPointer = {});
            var e = t.axisPointer.link;
            e && !D(e) && (t.axisPointer.link = [e])
        }
    }), Bu(jh.PROCESSOR.STATISTIC, function(t, e) {
        t.getComponent("axisPointer").coordSysAxesInfo = Uf(t, e)
    }), zu({
        type: "updateAxisPointer",
        event: "updateAxisPointer",
        update: ":updateAxisPointer"
    }, function(t, e, i) {
        var n = t.currTrigger,
            r = [t.x, t.y],
            a = t,
            o = t.dispatchAction || C(i.dispatchAction, i),
            s = e.getComponent("axisPointer").coordSysAxesInfo;
        if (s) {
            Qp(r) && (r = function(t, e) {
                var i, n = [],
                    r = t.seriesIndex;
                if (null == r || !(i = e.getSeriesByIndex(r))) return {
                    point: []
                };
                var a = i.getData(),
                    o = On(a, t);
                if (null == o || o < 0 || D(o)) return {
                    point: []
                };
                var s = a.getItemGraphicEl(o),
                    l = i.coordinateSystem;
                if (i.getTooltipPosition) n = i.getTooltipPosition(o) || [];
                else if (l && l.dataToPoint) n = l.dataToPoint(a.getValues(T(l.dimensions, function(t) {
                    return a.mapDimension(t)
                }), o, !0)) || [];
                else if (s) {
                    var h = s.getBoundingRect().clone();
                    h.applyTransform(s.transform), n = [h.x + h.width / 2, h.y + h.height / 2]
                }
                return {
                    point: n,
                    el: s
                }
            }({
                seriesIndex: a.seriesIndex,
                dataIndex: a.dataIndex
            }, e).point);
            var l = Qp(r),
                h = a.axesInfo,
                u = s.axesInfo,
                c = "leave" === n || Qp(r),
                d = {},
                f = {},
                p = {
                    list: [],
                    map: {}
                },
                g = {
                    showPointer: Up(jp, f),
                    showTooltip: Up(Kp, p)
                };
            Xp(s.coordSysMap, function(t, e) {
                var i = l || t.containPoint(r);
                Xp(s.coordSysAxesInfo[e], function(t, e) {
                    var n = t.axis,
                        a = function(t, e) {
                            for (var i = 0; i < (t || []).length; i++) {
                                var n = t[i];
                                if (e.axis.dim === n.axisDim && e.axis.model.componentIndex === n.axisIndex) return n
                            }
                        }(h, t);
                    if (!c && i && (!h || a)) {
                        var o = a && a.value;
                        null != o || l || (o = n.pointToData(r)), null != o && Zp(t, o, g, !1, d)
                    }
                })
            });
            var v = {};
            return Xp(u, function(t, e) {
                    var i = t.linkGroup;
                    i && !f[e] && Xp(i.axesInfo, function(e, n) {
                        var r = f[n];
                        if (e !== t && r) {
                            var a = r.value;
                            i.mapper && (a = t.axis.scale.parse(i.mapper(a, $p(e), $p(t)))), v[t.key] = a
                        }
                    })
                }), Xp(v, function(t, e) {
                    Zp(u[e], t, g, !0, d)
                }),
                function(t, e, i) {
                    var n = i.axesInfo = [];
                    Xp(e, function(e, i) {
                        var r = e.axisPointerModel.option,
                            a = t[i];
                        a ? (!e.useHandle && (r.status = "show"), r.value = a.value, r.seriesDataIndices = (a.payloadBatch || []).slice()) : !e.useHandle && (r.status = "hide"), "show" === r.status && n.push({
                            axisDim: e.axis.dim,
                            axisIndex: e.axis.model.componentIndex,
                            value: r.value
                        })
                    })
                }(f, u, d),
                function(t, e, i, n) {
                    if (!Qp(e) && t.list.length) {
                        var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
                        n({
                            type: "showTip",
                            escapeConnect: !0,
                            x: e[0],
                            y: e[1],
                            tooltipOption: i.tooltipOption,
                            position: i.position,
                            dataIndexInside: r.dataIndexInside,
                            dataIndex: r.dataIndex,
                            seriesIndex: r.seriesIndex,
                            dataByCoordSys: t.list
                        })
                    } else n({
                        type: "hideTip"
                    })
                }(p, r, t, o),
                function(t, e, i) {
                    var n = i.getZr(),
                        r = Yp(n).axisPointerLastHighlights || {},
                        a = Yp(n).axisPointerLastHighlights = {};
                    Xp(t, function(t, e) {
                        var i = t.axisPointerModel.option;
                        "show" === i.status && Xp(i.seriesDataIndices, function(t) {
                            var e = t.seriesIndex + " | " + t.dataIndex;
                            a[e] = t
                        })
                    });
                    var o = [],
                        s = [];
                    S(r, function(t, e) {
                        !a[e] && s.push(t)
                    }), S(a, function(t, e) {
                        !r[e] && o.push(t)
                    }), s.length && i.dispatchAction({
                        type: "downplay",
                        escapeConnect: !0,
                        batch: s
                    }), o.length && i.dispatchAction({
                        type: "highlight",
                        escapeConnect: !0,
                        batch: o
                    })
                }(u, 0, i), d
        }
    });
    var Mg = hg.extend({
        makeElOption: function(t, e, i, n, r) {
            var a = i.axis;
            "angle" === a.dim && (this.animationThreshold = Math.PI / 18);
            var o, s, l = a.polar,
                h = l.getOtherAxis(a).getExtent();
            o = a["dataTo" + (s = a.dim, s ? s.charAt(0).toUpperCase() + s.substr(1) : s)](e);
            var u = n.get("type");
            if (u && "none" !== u) {
                var c = pg(n),
                    d = Sg[u](a, l, o, h, c);
                d.style = c, t.graphicKey = d.type, t.pointer = d
            }
            var f = function(t, e, i, n, r) {
                var a = e.axis,
                    o = a.dataToCoord(t),
                    s = n.getAngleAxis().getExtent()[0];
                s = s / 180 * Math.PI;
                var l, h, u, c = n.getRadiusAxis().getExtent();
                if ("radius" === a.dim) {
                    var d = xt();
                    St(d, d, s), Mt(d, d, [n.cx, n.cy]), l = Oo([o, -r], d);
                    var f = e.getModel("axisLabel").get("rotate") || 0,
                        p = Bf.innerTextLayout(s, f * Math.PI / 180, -1);
                    h = p.textAlign, u = p.textVerticalAlign
                } else {
                    var g = c[1];
                    l = n.coordToPoint([g + r, o]);
                    var v = n.cx,
                        m = n.cy;
                    h = Math.abs(l[0] - v) / g < .3 ? "center" : l[0] > v ? "left" : "right", u = Math.abs(l[1] - m) / g < .3 ? "middle" : l[1] > m ? "top" : "bottom"
                }
                return {
                    position: l,
                    align: h,
                    verticalAlign: u
                }
            }(e, i, 0, l, n.get("label.margin"));
            gg(t, i, n, r, f)
        }
    });
    var Sg = {
        line: function(t, e, i, n, r) {
            return "angle" === t.dim ? {
                type: "Line",
                shape: mg(e.coordToPoint([n[0], i]), e.coordToPoint([n[1], i]))
            } : {
                type: "Circle",
                shape: {
                    cx: e.cx,
                    cy: e.cy,
                    r: i
                }
            }
        },
        shadow: function(t, e, i, n, r) {
            var a = Math.max(1, t.getBandWidth()),
                o = Math.PI / 180;
            return "angle" === t.dim ? {
                type: "Sector",
                shape: yg(e.cx, e.cy, n[0], n[1], (-i - a / 2) * o, (a / 2 - i) * o)
            } : {
                type: "Sector",
                shape: yg(e.cx, e.cy, i - a / 2, i + a / 2, 0, 2 * Math.PI)
            }
        }
    };
    $f.registerAxisPointerClass("PolarAxisPointer", Mg), Fu(A(function(t, e, i) {
        var n = i.getWidth(),
            r = i.getHeight(),
            a = {},
            o = function(t, e) {
                var i = {};
                S(t, function(t, e) {
                    var n = t.getData(),
                        r = t.coordinateSystem,
                        a = r.getBaseAxis(),
                        o = a.getExtent(),
                        s = "category" === a.type ? a.getBandWidth() : Math.abs(o[1] - o[0]) / n.count(),
                        l = i[Dp(a)] || {
                            bandWidth: s,
                            remainedWidth: s,
                            autoWidthCount: 0,
                            categoryGap: "20%",
                            gap: "30%",
                            stacks: {}
                        },
                        h = l.stacks;
                    i[Dp(a)] = l;
                    var u = Ap(t);
                    h[u] || l.autoWidthCount++, h[u] = h[u] || {
                        width: 0,
                        maxWidth: 0
                    };
                    var c = Ko(t.get("barWidth"), s),
                        d = Ko(t.get("barMaxWidth"), s),
                        f = t.get("barGap"),
                        p = t.get("barCategoryGap");
                    c && !h[u].width && (c = Math.min(l.remainedWidth, c), h[u].width = c, l.remainedWidth -= c), d && (h[u].maxWidth = d), null != f && (l.gap = f), null != p && (l.categoryGap = p)
                });
                var n = {};
                return S(i, function(t, e) {
                    n[e] = {};
                    var i = t.stacks,
                        r = t.bandWidth,
                        a = Ko(t.categoryGap, r),
                        o = Ko(t.gap, 1),
                        s = t.remainedWidth,
                        l = t.autoWidthCount,
                        h = (s - a) / (l + (l - 1) * o);
                    h = Math.max(h, 0), S(i, function(t, e) {
                        var i = t.maxWidth;
                        i && i < h && (i = Math.min(i, s), t.width && (i = Math.min(i, t.width)), s -= i, t.width = i, l--)
                    }), h = (s - a) / (l + (l - 1) * o), h = Math.max(h, 0);
                    var u, c = 0;
                    S(i, function(t, e) {
                        t.width || (t.width = h), u = t, c += t.width * (1 + o)
                    }), u && (c -= u.width * o);
                    var d = -c / 2;
                    S(i, function(t, i) {
                        n[e][i] = n[e][i] || {
                            offset: d,
                            width: t.width
                        }, d += t.width * (1 + o)
                    })
                }), n
            }(I(e.getSeriesByType(t), function(t) {
                return !e.isSeriesFiltered(t) && t.coordinateSystem && "polar" === t.coordinateSystem.type
            }));
        e.eachSeriesByType(t, function(t) {
            if ("polar" === t.coordinateSystem.type) {
                var e = t.getData(),
                    i = t.coordinateSystem,
                    s = i.getBaseAxis(),
                    l = Ap(t),
                    h = o[Dp(s)][l],
                    u = h.offset,
                    c = h.width,
                    d = i.getOtherAxis(s),
                    f = t.get("center") || ["50%", "50%"],
                    p = Ko(f[0], n),
                    g = Ko(f[1], r),
                    v = t.get("barMinHeight") || 0,
                    m = t.get("barMinAngle") || 0;
                a[l] = a[l] || [];
                for (var y = e.mapDimension(d.dim), x = e.mapDimension(s.dim), _ = xc(e, y), w = d.getExtent()[0], b = 0, M = e.count(); b < M; b++) {
                    var S = e.get(y, b),
                        T = e.get(x, b);
                    if (!isNaN(S)) {
                        var I, C, A, D, k = S >= 0 ? "p" : "n",
                            P = w;
                        if (_ && (a[l][T] || (a[l][T] = {
                                p: w,
                                n: w
                            }), P = a[l][T][k]), "radius" === d.dim) {
                            var L = d.dataToRadius(S) - w,
                                O = s.dataToAngle(T);
                            Math.abs(L) < v && (L = (L < 0 ? -1 : 1) * v), I = P, C = P + L, D = (A = O - u) - c, _ && (a[l][T][k] = C)
                        } else {
                            var E = d.dataToAngle(S, !0) - w,
                                N = s.dataToRadius(T);
                            Math.abs(E) < m && (E = (E < 0 ? -1 : 1) * m), C = (I = N + u) + c, A = P, D = P + E, _ && (a[l][T][k] = D)
                        }
                        e.setItemLayout(b, {
                            cx: p,
                            cy: g,
                            r0: I,
                            r: C,
                            startAngle: -A * Math.PI / 180,
                            endAngle: -D * Math.PI / 180
                        })
                    }
                }
            }
        }, this)
    }, "bar")), qu({
        type: "polar"
    }), t.version = "4.1.0", t.dependencies = {
        zrender: "4.0.4"
    }, t.PRIORITY = jh, t.init = function(t, e, i) {
        var n = Eu(t);
        if (n) return n;
        var r = new eu(t, e, i);
        return r.id = "ec_" + Au++, Iu[r.id] = r, zn(t, ku, r.id),
            function(t) {
                var e = "__connectUpdateStatus";

                function i(t, i) {
                    for (var n = 0; n < t.length; n++) t[n][e] = i
                }
                Wh(xu, function(n, r) {
                    t._messageCenter.on(r, function(n) {
                        if (Cu[t.group] && 0 !== t[e]) {
                            if (n && n.escapeConnect) return;
                            var r = t.makeActionFromEvent(n),
                                a = [];
                            Wh(Iu, function(e) {
                                e !== t && e.group === t.group && a.push(e)
                            }), i(a, 0), Wh(a, function(t) {
                                1 !== t[e] && t.dispatchAction(r)
                            }), i(a, 2)
                        }
                    })
                })
            }(r), r
    }, t.connect = function(t) {
        if (D(t)) {
            var e = t;
            t = null, Wh(e, function(e) {
                null != e.group && (t = e.group)
            }), t = t || "g_" + Du++, Wh(e, function(e) {
                e.group = t
            })
        }
        return Cu[t] = !0, t
    }, t.disConnect = Lu, t.disconnect = Ou, t.dispose = function(t) {
        "string" == typeof t ? t = Iu[t] : t instanceof eu || (t = Eu(t)), t instanceof eu && !t.isDisposed() && t.dispose()
    }, t.getInstanceByDom = Eu, t.getInstanceById = function(t) {
        return Iu[t]
    }, t.registerTheme = Nu, t.registerPreprocessor = Ru, t.registerProcessor = Bu, t.registerPostUpdate = function(t) {
        bu.push(t)
    }, t.registerAction = zu, t.registerCoordinateSystem = function(t, e) {
        el.register(t, e)
    }, t.getCoordinateSystemDimensions = function(t) {
        var e = el.get(t);
        if (e) return e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice()
    }, t.registerLayout = Fu, t.registerVisual = Vu, t.registerLoading = Wu, t.extendComponentModel = Gu, t.extendComponentView = qu, t.extendSeriesModel = function(t) {
        return Xl.extend(t)
    }, t.extendChartView = Xu, t.setCanvasCreator = function(t) {
        var e, i;
        i = t, "createCanvas" == (e = "createCanvas") && (y = null), f[e] = i
    }, t.registerMap = function(t, e, i) {
        e.geoJson && !e.features && (i = e.specialAreas, e = e.geoJson), "string" == typeof e && (e = "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")()), Pu[t] = {
            geoJson: e,
            specialAreas: i
        }
    }, t.getMap = function(t) {
        return Pu[t]
    }, t.dataTool = {}
});
class CircularAudioWave {
    constructor(t, e = {}) {
        this.opts = e, this.lastMaxR = 0, this.maxChartValue = 240, this.minChartValue = 100, this.chart = echarts.init(t), this.playing = !1, this.lineColorOffset = 0, this.tick = 0;
        if (this.defaultChartOption = {
                angleAxis: {
                    type: "value",
                    clockwise: !1,
                    axisLine: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    axisLabel: {
                        show: !1
                    },
                    splitLine: {
                        show: !1
                    }
                },
                radiusAxis: {
                    min: 0,
                    max: this.maxChartValue + 50,
                    axisLine: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    axisLabel: {
                        show: !1
                    },
                    splitLine: {
                        show: !1
                    }
                },
                polar: {
                    radius: "100%"
                },
                series: [{
                    coordinateSystem: "polar",
                    name: "line",
                    type: "line",
                    showSymbol: !1,
                    lineStyle: {
                        color: {
                            colorStops: [{
                                offset: .7,
                                color: "#e91e63"
                            }, {
                                offset: .3,
                                color: "#3f51b5"
                            }]
                        },
                        shadowColor: "blue",
                        shadowBlur: 10
                    },
                    zlevel: 2,
                    data: Array.apply(null, {
                        length: 361
                    }).map(Function.call, t => [this.minChartValue, t]),
                    silent: !0,
                    hoverAnimation: !1
                }, {
                    coordinateSystem: "polar",
                    name: "maxbar",
                    type: "line",
                    showSymbol: !1,
                    lineStyle: {
                        color: "#87b9ca",
                        shadowColor: "#87b9ca",
                        shadowBlur: 10
                    },
                    data: Array.apply(null, {
                        length: 361
                    }).map(Function.call, t => [this.minChartValue, t]),
                    silent: !0,
                    hoverAnimation: !1
                }, {
                    coordinateSystem: "polar",
                    name: "interior",
                    type: "effectScatter",
                    showSymbol: !1,
                    data: [0],
                    symbolSize: 100,
                    rippleEffect: {
                        period: 3.5,
                        scale: 3
                    },
                    itemStyle: {
                        color: {
                            type: "radial",
                            colorStops: [{
                                offset: 0,
                                color: "#87b9ca"
                            }, {
                                offset: 1,
                                color: "white"
                            }]
                        }
                    },
                    silent: !0,
                    hoverAnimation: !1,
                    animation: !1
                }]
            }, window.AudioContext = window.AudioContext || window.webkitAudioContext, window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext, window.AudioContext ? (this.context = new AudioContext, this.offlineContext = new OfflineAudioContext(2, 1323e3, 44100), this.sourceNode = this.context.createBufferSource(), this.offlineSource = this.offlineContext.createBufferSource(), this.sourceNode.loop = !!this.opts.loop, this.analyser = this.context.createAnalyser()) : alert("Your browser does not support Web Audio API"), "sunburst" === this.opts.mode) {
            let t = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"],
                e = [{
                    children: [{
                        children: []
                    }]
                }, {
                    children: [{
                        children: []
                    }]
                }];
            for (let t = 0; t < 5; t++) e[0].children[0].children.push({
                name: "-",
                children: [{
                    name: ""
                }]
            }), e[1].children[0].children.push({
                name: "-",
                children: [{
                    name: ""
                }]
            });
            e.forEach(t => {
                t.children.forEach(t => {
                    t.children.forEach(t => {
                        t.children[0].value = 1
                    })
                })
            }), this.defaultChartOption = {
                backgroundColor: "#2E2733",
                color: t,
                series: [{
                    type: "sunburst",
                    center: ["50%", "48%"],
                    data: e,
                    nodeClick: !1,
                    sort: function(t, e) {
                        return 1 === t.depth ? e.getValue() - t.getValue() : t.dataIndex - e.dataIndex
                    },
                    itemStyle: {
                        borderColor: "#2E2733",
                        borderWidth: 2
                    },
                    levels: [{}, {
                        r0: 0,
                        r: 40
                    }, {
                        r0: 40,
                        r: 105
                    }, {
                        r0: 115,
                        r: 140,
                        itemStyle: {
                            shadowBlur: 2,
                            shadowColor: t[2],
                            color: "transparent"
                        },
                        label: {
                            rotate: "tangential",
                            fontSize: 10,
                            color: t[0]
                        }
                    }, {
                        r0: 140,
                        r: 145,
                        itemStyle: {
                            shadowBlur: 80,
                            shadowColor: t[0],
                            color: t[0]
                        },
                        label: {
                            position: "outside",
                            textShadowBlur: 5,
                            textShadowColor: "#333",
                            backgroundColor: t[0]
                        }
                    }]
                }]
            }
        }
        this.chartOption = JSON.parse(JSON.stringify(this.defaultChartOption))
    }
    loadAudio(t) {
        console.log(t), this.filePath = t, this._setupAudioNodes(), this._setupOfflineContext();
        var e = new XMLHttpRequest;
        return e.open("GET", t, !0), e.responseType = "arraybuffer", e.send(), new Promise((t, i) => {
            e.onload = (() => {
                this.offlineContext.decodeAudioData(e.response, t => {
                    this.sourceNode.buffer = t, this.offlineSource.buffer = t, this.offlineSource.start(0), this.offlineContext.startRendering()
                }), this.offlineContext.oncomplete = (e => {
                    let i = e.renderedBuffer;
                    this.bpm = this._getBPM([i.getChannelData(0), i.getChannelData(1)]), this._init(), t()
                })
            })
        })
    }
    _init() {
        this.chart.setOption(this.chartOption, !0), this._debouncedDraw = this._debounce(this._drawAnimation.bind(this), 25)
    }
    presetOption() {
        "sunburst" !== this.opts.mode && (this.chartOption.series[0].animation = !1, this.chartOption.series[2].rippleEffect.period = 150 / this.bpm)
    }

    play() {
      if (this.sourceNode && this.sourceNode.buffer && not window.status) {
        this.playing = true;
        this.presetOption();
        this.sourceNode.start(0);
        this._debouncedDraw();
        var status = "playing";
      } else if (status === "playing") {
        this.context.suspend();
        this.playing = false;
        status = 'suspended';
        this.reset();

      } else if (status === "suspended") {
        this.context.resume();
        this.playing = true;
        status = 'playing';
      }
    }
    pause() {
    }
    destroy() {
        this.chart.dispose()
    }
    reset() {
        this.tick = 0, this.chartOption = JSON.parse(JSON.stringify(this.defaultChartOption)), this._init()
    }
    onended() {
        this.opts.loop || (this.playing = !1, this.context.close(), this.sourceNode.buffer = null, this.offlineSource.buffer = null, this.reset(), this.context = new AudioContext, this.offlineContext = new OfflineAudioContext(2, 1323e3, 44100), this.sourceNode = this.context.createBufferSource(), this.offlineSource = this.offlineContext.createBufferSource(), this.analyser = this.context.createAnalyser(), this.loadAudio(this.filePath))
    }
    _setupAudioNodes() {
        this.analyser.smoothingTimeConstant = .3, this.analyser.fftSize = 2048, this.sourceNode.connect(this.analyser), this.sourceNode.connect(this.context.destination), this.sourceNode.onended = this.onended.bind(this)
    }
    _setupOfflineContext() {
        let t = this.offlineContext.createBiquadFilter();
        t.type = "lowpass", t.settar, t.frequency.setValueAtTime(150, 0), t.Q.setValueAtTime(1, 0), this.offlineSource.connect(t);
        let e = this.offlineContext.createBiquadFilter();
        e.type = "highpass", e.frequency.setValueAtTime(100, 0), e.Q.setValueAtTime(1, 0), t.connect(e), e.connect(this.offlineContext.destination)
    }
    _drawAnimation() {
        let t = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(t), this._draw(t), requestAnimationFrame(this._debouncedDraw.bind(this))
    }
    _draw(t) {
        if (this.playing) {
            let e = this._generateWaveData(t);
            this.chartOption.series[0].data = e.data, e.maxR > this.lastMaxR ? this.lastMaxR = e.maxR + 4 : this.playing ? this.lastMaxR -= 2 : this.lastMaxR = this.minChartValue, "sunburst" !== this.opts.mode && (this.chartOption.series[1].data = Array.apply(null, {
                length: 361
            }).map(Function.call, t => [this.lastMaxR, t])), this.chart.setOption(this.chartOption, !0), this.tick++
        }
    }
    _generateWaveData(t) {
        let e = [],
            i = 0;
        if ("sunburst" !== this.opts.mode) {
            for (let r = 0; r <= 360; r++) {
                var n = (t[r] - 0) * (this.maxChartValue - this.minChartValue) / 255 + this.minChartValue;
                n > i && (i = n), e.push([n, r])
            }
            e.push([e[0][0], 360])
        } else {
            e = JSON.parse(JSON.stringify(this.chartOption.series[0].data));
            let i = 0;
            e.forEach(e => {
                e.children.forEach(e => {
                    e.children.forEach(e => {
                        var n = 40 * (t[i] - 0) / 255 + 0;
                        e.children[0].name = Array.apply(null, {
                            length: n
                        }).map(Function.call, t => "").join(" "), i++
                    })
                })
            })
        }
        return {
            maxR: i,
            data: e
        }
    }
    _getBPM(t) {
        let e = t[0].length / 22050,
            i = [];
        for (let n = 0; n < e; n++) {
            let e = 0;
            for (let i = 22050 * n; i < 22050 * (n + 1); i++) {
                let n = Math.max(Math.abs(t[0][i]), Math.abs(t[1][i]));
                (!e || n > e.volume) && (e = {
                    position: i,
                    volume: n
                })
            }
            i.push(e)
        }
        i.sort((t, e) => e.volume - t.volume), (i = i.splice(0, .5 * i.length)).sort((t, e) => t.position - e.position);
        let n = [];
        i.forEach((t, e) => {
            for (let r = 1; e + r < i.length && r < 10; r++) {
                let a = {
                    bpm: 2646e3 / (i[e + r].position - t.position),
                    count: 1
                };
                for (; a.bpm < 90;) a.bpm *= 2;
                for (; a.bpm > 180;) a.bpm /= 2;
                a.bpm = Math.round(a.bpm), n.some(t => t.bpm === a.bpm ? t.count++ : 0) || n.push(a)
            }
        });
        let r = n.sort((t, e) => e.count - t.count)[0].bpm;
        return console.log("bpm:", r), r
    }
    _debounce(t, e, i) {
        var n;
        return function() {
            var r = this,
                a = arguments,
                o = i && !n;
            clearTimeout(n), n = setTimeout(function() {
                n = null, i || t.apply(r, a)
            }, e), o && t.apply(r, a)
        }
    }
}
