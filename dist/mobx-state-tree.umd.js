!(function(t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? e(exports, require("mobx"))
        : "function" == typeof define && define.amd
          ? define(["exports", "mobx"], e)
          : e((t.mobxStateTree = t.mobxStateTree || {}), t.mobx)
})(this, function(t, e) {
    "use strict"
    function n(t, e) {
        function n() {
            this.constructor = t
        }
        jt(
            t,
            e
        ), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()))
    }
    function r(t, e, n, r) {
        var i,
            o = arguments.length,
            a = o < 3 ? e : null === r ? (r = Object.getOwnPropertyDescriptor(e, n)) : r
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            a = Reflect.decorate(t, e, n, r)
        else
            for (var s = t.length - 1; s >= 0; s--)
                (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a)
        return o > 3 && a && Object.defineProperty(e, n, a), a
    }
    function i(t) {
        return t.replace(/~/g, "~1").replace(/\//g, "~0")
    }
    function o(t) {
        return t.replace(/~0/g, "\\").replace(/~1/g, "~")
    }
    function a(t) {
        return 0 === t.length ? "" : "/" + t.map(i).join("/")
    }
    function s(t) {
        var e = t.split("/").map(o)
        return "" === e[0] ? e.slice(1) : e
    }
    function u(t) {
        throw (void 0 === t && (t = "Illegal state"), new Error("[mobx-state-tree] " + t))
    }
    function p(t) {
        return t
    }
    function c() {}
    function l(t) {
        return t ? (Array.isArray(t) ? t : [t]) : Pt
    }
    function h(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        for (var r = 0; r < e.length; r++) {
            var i = e[r]
            for (var o in i) t[o] = i[o]
        }
        return t
    }
    function f(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        for (var r = 0; r < e.length; r++) {
            var i = e[r]
            for (var o in i) {
                var a = Object.getOwnPropertyDescriptor(i, o)
                "get" in a
                    ? Object.defineProperty(t, o, At({}, a, { configurable: !0 }))
                    : (t[o] = i[o])
            }
        }
        return t
    }
    function d(t) {
        if (null === t || "object" != typeof t) return !1
        var e = Object.getPrototypeOf(t)
        return e === Object.prototype || null === e
    }
    function y(t) {
        return !(null === t || "object" != typeof t || t instanceof Date || t instanceof RegExp)
    }
    function v(t) {
        return (
            null === t ||
            void 0 === t ||
            ("string" == typeof t ||
                "number" == typeof t ||
                "boolean" == typeof t ||
                t instanceof Date)
        )
    }
    function b(t) {
        return v(t) ? t : Object.freeze(t)
    }
    function g(t) {
        return b(t), d(t) &&
            Object.keys(t).forEach(function(e) {
                v(t[e]) || Object.isFrozen(t[e]) || g(t[e])
            }), t
    }
    function m(t) {
        return "function" != typeof t
    }
    function w(t, e, n) {
        Object.defineProperty(t, e, { enumerable: !1, writable: !1, configurable: !0, value: n })
    }
    function j(t, e, n) {
        Object.defineProperty(t, e, { enumerable: !0, writable: !1, configurable: !0, value: n })
    }
    function A(t, e) {
        return t.push(e), function() {
            var n = t.indexOf(e)
            ;-1 !== n && t.splice(n, 1)
        }
    }
    function P(t, e) {
        return Vt.call(t, e)
    }
    function V(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = t[n]
        return e
    }
    function C(t) {
        return t.object[t.name].apply(t.object, t.args)
    }
    function S(t) {
        for (var e = t.middlewares.slice(), n = t; n.parent; )
            (n = n.parent), (e = e.concat(n.middlewares))
        return e
    }
    function T(t, e) {
        function n(t) {
            var e = r.shift()
            return e ? e(t, n) : C(t)
        }
        var r = S(t)
        return r.length ? n(e) : C(e)
    }
    function O(t, n) {
        var r = e.action(t, n)
        return function() {
            var e = K(this)
            if ((e.assertAlive(), e.isRunningAction())) return r.apply(this, arguments)
            var n = { name: t, object: e.storedValue, args: V(arguments) },
                i = e.root
            i._isRunningAction = !0
            try {
                return T(e, n)
            } finally {
                i._isRunningAction = !1
            }
        }
    }
    function x(t, n, r, i) {
        if (v(i)) return i
        if (G(i)) {
            var o = K(i)
            if (t.root !== o.root)
                throw new Error(
                    "Argument " +
                        r +
                        " that was passed to action '" +
                        n +
                        "' is a model that is not part of the same state tree. Consider passing a snapshot or some representative ID instead"
                )
            return { $ref: t.getRelativePathTo(K(i)) }
        }
        if ("function" == typeof i)
            throw new Error(
                "Argument " +
                    r +
                    " that was passed to action '" +
                    n +
                    "' should be a primitive, model object or plain object, received a function"
            )
        if ("object" == typeof i && !d(i) && !Array.isArray(i))
            throw new Error(
                "Argument " +
                    r +
                    " that was passed to action '" +
                    n +
                    "' should be a primitive, model object or plain object, received a " +
                    (i && i.constructor ? i.constructor.name : "Complex Object")
            )
        if (e.isObservable(i))
            throw new Error(
                "Argument " +
                    r +
                    " that was passed to action '" +
                    n +
                    "' should be a primitive, model object or plain object, received an mobx observable."
            )
        try {
            return JSON.stringify(i), i
        } catch (t) {
            throw new Error(
                "Argument " + r + " that was passed to action '" + n + "' is not serializable."
            )
        }
    }
    function _(t, e) {
        if ("object" == typeof e) {
            var n = Object.keys(e)
            if (1 === n.length && "$ref" === n[0]) return W(t.storedValue, e.$ref)
        }
        return e
    }
    function N(t, e) {
        var n = B(t, e.path || "")
        if (!n) return u("Invalid action path: " + (e.path || ""))
        var r = K(n)
        return "function" != typeof n[e.name] &&
            u("Action '" + e.name + "' does not exist in '" + r.path + "'"), n[e.name].apply(
            n,
            e.args
                ? e.args.map(function(t) {
                      return _(r, t)
                  })
                : []
        )
    }
    function I(t, e) {
        return F(t, function(n, r) {
            var i = K(n.object)
            return e({
                name: n.name,
                path: K(t).getRelativePathTo(i),
                args: n.args.map(function(t, e) {
                    return x(i, n.name, e, t)
                })
            }), r(n)
        })
    }
    function R(t) {
        return "object" == typeof t && t && !0 === t.isType
    }
    function D(t) {
        return R(t) && (t.flags & (wt.String | wt.Number | wt.Boolean | wt.Date)) > 0
    }
    function z(t) {
        return R(t) && (t.flags & wt.Object) > 0
    }
    function E(t) {
        return (t.flags & wt.Reference) > 0
    }
    function k(t) {
        return K(t).type
    }
    function F(t, e) {
        var n = K(t)
        return n.isProtectionEnabled ||
            console.warn(
                "It is recommended to protect the state tree before attaching action middleware, as otherwise it cannot be guaranteed that all changes are passed through middleware. See `protect`"
            ), n.addMiddleWare(e)
    }
    function M(t, e) {
        return K(t).onPatch(e)
    }
    function L(t, e) {
        return K(t).onSnapshot(e)
    }
    function U(t, n) {
        var r = K(t)
        e.runInAction(function() {
            l(n).forEach(function(t) {
                return r.applyPatch(t)
            })
        })
    }
    function H(t, n) {
        e.runInAction(function() {
            l(n).forEach(function(e) {
                return N(t, e)
            })
        })
    }
    function $(t, e) {
        return K(t).applySnapshot(e)
    }
    function J(t) {
        return K(t).snapshot
    }
    function W(t, e) {
        var n = K(t).resolve(e)
        return n ? n.value : void 0
    }
    function B(t, e) {
        var n = K(t).resolve(e, !1)
        if (void 0 !== n) return n ? n.value : void 0
    }
    function q(t, e) {
        var n = K(t)
        n.getChildren().forEach(function(t) {
            G(t.storedValue) && q(t.storedValue, e)
        }), e(n.storedValue)
    }
    function G(t) {
        return !(!t || !t.$treenode)
    }
    function K(t) {
        return G(t) ? t.$treenode : u("element has no Node")
    }
    function Q(t) {
        return t && "object" == typeof t && !G(t) && !Object.isFrozen(t)
    }
    function X() {
        return K(this).snapshot
    }
    function Y(t, e, n, r, i, o, a) {
        if ((void 0 === o && (o = p), void 0 === a && (a = c), G(i))) {
            var s = K(i)
            return s.isRoot ||
                u(
                    "Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" +
                        (e ? e.path : "") +
                        "/" +
                        n +
                        "', but it lives already at '" +
                        s.path +
                        "'"
                ), s.setParent(e, n), s
        }
        var l = o(i),
            h = Q(l),
            f = new Tt(t, e, n, r, l)
        e || (f.identifierCache = new Ct()), h && w(l, "$treenode", f)
        var d = !0
        try {
            return h && j(l, "toJSON", X), f.pseudoAction(function() {
                a(f, i)
            }), e
                ? e.root.identifierCache.addNodeToCache(f)
                : f.identifierCache.addNodeToCache(
                      f
                  ), f.fireHook("afterCreate"), e && f.fireHook("afterAttach"), (d = !1), f
        } finally {
            d && (f._isAlive = !1)
        }
    }
    function Z(t) {
        return "function" == typeof t
            ? "<function" + (t.name ? " " + t.name : "") + ">"
            : G(t) ? "<" + t + ">" : "`" + JSON.stringify(t) + "`"
    }
    function tt(t) {
        var e = t.value,
            n = t.context[t.context.length - 1].type,
            r = t.context
                .map(function(t) {
                    return t.path
                })
                .filter(function(t) {
                    return t.length > 0
                })
                .join("/"),
            i = r.length > 0 ? 'at path "/' + r + '" ' : "",
            o = G(e) ? "value of type " + K(e).type.name + ":" : v(e) ? "value" : "snapshot",
            a = n && G(e) && n.is(K(e).snapshot)
        return (
            "" +
            i +
            o +
            " " +
            Z(e) +
            " is not assignable " +
            (n ? "to type: `" + n.name + "`" : "") +
            (t.message ? " (" + t.message + ")" : "") +
            (n
                ? D(n)
                  ? "."
                  : ", expected an instance of `" +
                        n.name +
                        "` or a snapshot like `" +
                        n.describe() +
                        "` instead." +
                        (a
                            ? " (Note that a snapshot of the provided value is compatible with the targeted type)"
                            : "")
                : ".")
        )
    }
    function et(t, e, n) {
        return t.concat([{ path: e, type: n }])
    }
    function nt() {
        return Pt
    }
    function rt(t, e, n) {
        return [{ context: t, value: e, message: n }]
    }
    function it(t) {
        return t.reduce(function(t, e) {
            return t.concat(e)
        }, [])
    }
    function ot(t, e) {
        var n = t.validate(e, [{ path: "", type: t }])
        n.length > 0 &&
            u("Error while converting " + Z(e) + " to `" + t.name + "`:\n" + n.map(tt).join("\n"))
    }
    function at() {
        return K(this) + "(" + this.size + " items)"
    }
    function st(t) {
        t || u("Map.put cannot be used to set empty values")
        var e
        if (G(t)) e = K(t)
        else {
            if (!y(t)) return u("Map.put can only be used to store complex values")
            e = K(K(this).type.subType.create(t))
        }
        return e.identifierAttribute ||
            u(
                "Map.put can only be used to store complex values that have an identifier type attribute"
            ), this.set(e.identifier, e.value), this
    }
    function ut() {
        return K(this) + "(" + this.length + " items)"
    }
    function pt(t, e, n, r, i) {
        function o(t) {
            for (var e in p) {
                var n = t[e]
                if (("string" == typeof n || "number" == typeof n) && p[e][n]) return p[e][n]
            }
            return null
        }
        var a = new Array(r.length),
            s = {},
            p = {}
        n.forEach(function(t) {
            t.identifierAttribute &&
                ((p[t.identifierAttribute] || (p[t.identifierAttribute] = {}))[
                    t.identifier
                ] = t), (s[t.nodeId] = t)
        }), r.forEach(function(n, r) {
            var p = "" + i[r]
            if (G(n))
                (l = K(n)).assertAlive(), l.parent === t
                    ? (
                          s[l.nodeId] ||
                              u(
                                  "Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" +
                                      t.path +
                                      "/" +
                                      p +
                                      "', but it lives already at '" +
                                      l.path +
                                      "'"
                              ),
                          (s[l.nodeId] = void 0),
                          l.setParent(t, p),
                          (a[r] = l)
                      )
                    : (a[r] = e.instantiate(t, p, void 0, n))
            else if (y(n)) {
                var c = o(n)
                if (c) {
                    var l = e.reconcile(c, n)
                    ;(s[c.nodeId] = void 0), l.setParent(t, p), (a[r] = l)
                } else a[r] = e.instantiate(t, p, void 0, n)
            } else a[r] = e.instantiate(t, p, void 0, n)
        })
        for (var c in s) void 0 !== s[c] && s[c].die()
        return a
    }
    function ct(t) {
        switch (typeof t) {
            case "string":
                return Rt
            case "number":
                return Dt
            case "boolean":
                return zt
            case "object":
                if (t instanceof Date) return Et
        }
        return u("Cannot determine primtive type from value " + t)
    }
    function lt(t, e) {
        var n = "function" == typeof e ? e() : e
        return ot(t, G(n) ? K(n).snapshot : n), new Ft(t, e)
    }
    function ht(t) {
        return v(t) || u("Literal types can be built only on top of primitives"), new Ut(t)
    }
    function ft(t, n) {
        return function() {
            var t = this,
                r = arguments
            return K(this).assertAlive(), e.extras.allowStateChanges(!1, function() {
                return n.apply(t, r)
            })
        }
    }
    function dt() {
        return K(this).toString()
    }
    function yt() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
        var n = "string" == typeof t[0] ? t.shift() : "AnonymousModel",
            r = t.shift() || u("types.model must specify properties"),
            i = (t.length > 1 && t.shift()) || {},
            o = t.shift() || {}
        return new Gt(n, r, i, o)
    }
    function vt() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e]
        var n = "string" == typeof t[0] ? t.shift() : "AnonymousModel"
        if (
            t.every(function(t) {
                return R(t)
            })
        )
            return t.reduce(function(t, e) {
                return vt(n, t, e.properties, e.state, e.actions)
            })
        var r = t.shift(),
            i = t.shift() || u("types.compose must specify properties or `{}`"),
            o = (t.length > 1 && t.shift()) || {},
            a = t.shift() || {}
        return z(r)
            ? yt(n, f({}, r.properties, i), f({}, r.state, o), f({}, r.actions, a))
            : u("Only model types can be composed")
    }
    function bt(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        var r = R(t) ? null : t,
            i = R(t) ? e.concat(t) : e,
            o = i
                .map(function(t) {
                    return t.name
                })
                .join(" | ")
        return new Xt(o, i, r)
    }
    function gt(t) {
        var e = h({}, t)
        return delete e.type, { name: t.type, args: [e] }
    }
    function mt(t, e, n) {
        function r(t) {
            var i = e.shift()
            i ? i(r)(t) : n(t)
        }
        r(t)
    }
    var wt,
        jt =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function(t, e) {
                    t.__proto__ = e
                }) ||
            function(t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
            },
        At =
            Object.assign ||
            function(t) {
                for (var e, n = 1, r = arguments.length; n < r; n++) {
                    e = arguments[n]
                    for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                }
                return t
            },
        Pt = Object.freeze([]),
        Vt = Object.prototype.hasOwnProperty
    !(function(t) {
        ;(t[(t.String = 1)] =
            "String"), (t[(t.Number = 2)] = "Number"), (t[(t.Boolean = 4)] = "Boolean"), (t[(t.Date = 8)] = "Date"), (t[(t.Literal = 16)] = "Literal"), (t[(t.Array = 32)] = "Array"), (t[(t.Map = 64)] = "Map"), (t[(t.Object = 128)] = "Object"), (t[(t.Frozen = 256)] = "Frozen"), (t[(t.Optional = 512)] = "Optional"), (t[(t.Reference = 1024)] = "Reference"), (t[(t.Identifier = 2048)] = "Identifier"), (t[(t.Late = 4096)] = "Late"), (t[(t.Refinement = 8192)] = "Refinement"), (t[(t.Union = 16384)] = "Union")
    })(wt || (wt = {}))
    var Ct = (function() {
        function t() {
            this.cache = e.observable.map()
        }
        return (t.prototype.addNodeToCache = function(t) {
            if (t.identifierAttribute) {
                var n = t.identifier
                this.cache.has(n) || this.cache.set(n, e.observable.shallowArray())
                var r = this.cache.get(n)
                ;-1 !== r.indexOf(t) && u("Already registered"), r.push(t)
            }
            return this
        }), (t.prototype.mergeCache = function(t) {
            var e = this
            t.identifierCache.cache.values().forEach(function(t) {
                return t.forEach(function(t) {
                    e.addNodeToCache(t)
                })
            })
        }), (t.prototype.notifyDied = function(t) {
            if (t.identifierAttribute) {
                var e = this.cache.get(t.identifier)
                e && e.remove(t)
            }
        }), (t.prototype.splitCache = function(e) {
            var n = new t(),
                r = e.path
            return this.cache.values().forEach(function(t) {
                for (var e = t.length - 1; e >= 0; e--)
                    0 === t[e].path.indexOf(r) && (n.addNodeToCache(t[e]), t.splice(e, 1))
            }), n
        }), (t.prototype.resolve = function(t, e) {
            var n = this.cache.get(e)
            if (!n) return null
            var r = n.filter(function(e) {
                return t.isAssignableFrom(e.type)
            })
            switch (r.length) {
                case 0:
                    return null
                case 1:
                    return r[0]
                default:
                    return u(
                        "Cannot resolve a reference to type '" +
                            t.name +
                            "' with id: '" +
                            e +
                            "' unambigously, there are multiple candidates: " +
                            r
                                .map(function(t) {
                                    return t.path
                                })
                                .join(", ")
                    )
            }
        }), t
    })(),
        St = 1,
        Tt = (function() {
            function t(t, n, r, i, o) {
                var a = this
                ;(this.nodeId = ++St), (this._parent = null), (this.subpath =
                    ""), (this.isProtectionEnabled = !0), (this.identifierAttribute = void 0), (this._environment = void 0), (this._isRunningAction = !1), (this._autoUnbox = !0), (this._isAlive = !0), (this._isDetaching = !1), (this.middlewares = []), (this.snapshotSubscribers = []), (this.patchSubscribers = []), (this.disposers = []), (this.type = t), (this._parent = n), (this.subpath = r), (this.storedValue = o), (this._environment = i), (this.unbox = this.unbox.bind(
                    this
                ))
                var s = e.reaction(
                    function() {
                        return a.snapshot
                    },
                    function(t) {
                        a.emitSnapshot(t)
                    }
                )
                s.onError(function(t) {
                    throw t
                }), this.addDisposer(s)
            }
            return Object.defineProperty(t.prototype, "identifier", {
                get: function() {
                    return this.identifierAttribute
                        ? this.storedValue[this.identifierAttribute]
                        : null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "path", {
                get: function() {
                    return this.parent ? this.parent.path + "/" + i(this.subpath) : ""
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isRoot", {
                get: function() {
                    return null === this.parent
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "parent", {
                get: function() {
                    return this._parent
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "root", {
                get: function() {
                    for (var t, e = this; (t = e.parent); ) e = t
                    return e
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.getRelativePathTo = function(t) {
                this.root !== t.root &&
                    u(
                        "Cannot calculate relative path: objects '" +
                            this +
                            "' and '" +
                            t +
                            "' are not part of the same object tree"
                    )
                for (
                    var e = s(this.path), n = s(t.path), r = 0;
                    r < e.length && e[r] === n[r];
                    r++
                );
                return (
                    e
                        .slice(r)
                        .map(function(t) {
                            return ".."
                        })
                        .join("/") + a(n.slice(r))
                )
            }), (t.prototype.resolve = function(t, e) {
                return void 0 === e && (e = !0), this.resolvePath(s(t), e)
            }), (t.prototype.resolvePath = function(t, e) {
                void 0 === e && (e = !0)
                for (var n = this, r = 0; r < t.length; r++) {
                    if ("" === t[r]) n = n.root
                    else if (".." === t[r]) n = n.parent
                    else {
                        if ("." === t[r] || "" === t[r]) continue
                        if (n) {
                            n = n.getChildNode(t[r])
                            continue
                        }
                    }
                    if (!n)
                        return e
                            ? u(
                                  "Could not resolve '" +
                                      t[r] +
                                      "' in '" +
                                      a(t.slice(0, r - 1)) +
                                      "', path of the patch does not resolve"
                              )
                            : void 0
                }
                return n
            }), Object.defineProperty(t.prototype, "value", {
                get: function() {
                    if (this._isAlive) return this.type.getValue(this)
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "isAlive", {
                get: function() {
                    return this._isAlive
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.die = function() {
                this._isDetaching ||
                    (G(this.storedValue) &&
                        (
                            q(this.storedValue, function(t) {
                                return K(t).aboutToDie()
                            }),
                            q(this.storedValue, function(t) {
                                return K(t).finalizeDeath()
                            })
                        ))
            }), (t.prototype.aboutToDie = function() {
                this.disposers.splice(0).forEach(function(t) {
                    return t()
                }), this.fireHook("beforeDestroy")
            }), (t.prototype.finalizeDeath = function() {
                this.root.identifierCache.notifyDied(this)
                var t = this,
                    e = this.path
                j(this, "snapshot", this.snapshot), this.patchSubscribers.splice(
                    0
                ), this.snapshotSubscribers.splice(0), this.patchSubscribers.splice(
                    0
                ), (this._isAlive = !1), (this._parent = null), (this.subpath =
                    ""), Object.defineProperty(this.storedValue, "$mobx", {
                    get: function() {
                        u(
                            "This object has died and is no longer part of a state tree. It cannot be used anymore. The object (of type '" +
                                t.type.name +
                                "') used to live at '" +
                                e +
                                "'. It is possible to access the last snapshot of this object using 'getSnapshot', or to create a fresh copy using 'clone'. If you want to remove an object from the tree without killing it, use 'detach' instead."
                        )
                    }
                })
            }), (t.prototype.assertAlive = function() {
                this._isAlive ||
                    u(
                        this +
                            " cannot be used anymore as it has died; it has been removed from a state tree. If you want to remove an element from a tree and let it live on, use 'detach' or 'clone' the value"
                    )
            }), Object.defineProperty(t.prototype, "snapshot", {
                get: function() {
                    if (this._isAlive) return b(this.type.getSnapshot(this))
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.onSnapshot = function(t) {
                return A(this.snapshotSubscribers, t)
            }), (t.prototype.applySnapshot = function(t) {
                return this.type.applySnapshot(this, t)
            }), (t.prototype.emitSnapshot = function(t) {
                this.snapshotSubscribers.forEach(function(e) {
                    return e(t)
                })
            }), (t.prototype.applyPatch = function(t) {
                var e = s(t.path),
                    n = this.resolvePath(e.slice(0, -1))
                n.pseudoAction(function() {
                    n.applyPatchLocally(e[e.length - 1], t)
                })
            }), (t.prototype.applyPatchLocally = function(t, e) {
                this.assertWritable(), this.type.applyPatchLocally(this, t, e)
            }), (t.prototype.onPatch = function(t) {
                return A(this.patchSubscribers, t)
            }), (t.prototype.emitPatch = function(t, e) {
                if (this.patchSubscribers.length) {
                    var n = h({}, t, { path: e.path.substr(this.path.length) + "/" + t.path })
                    this.patchSubscribers.forEach(function(t) {
                        return t(n)
                    })
                }
                this.parent && this.parent.emitPatch(t, e)
            }), (t.prototype.setParent = function(t, e) {
                void 0 === e && (e = null), (this.parent === t && this.subpath === e) ||
                    (
                        this._parent &&
                            t &&
                            t !== this._parent &&
                            u(
                                "A node cannot exists twice in the state tree. Failed to add " +
                                    this +
                                    " to path '" +
                                    t.path +
                                    "/" +
                                    e +
                                    "'."
                            ),
                        !this._parent &&
                            t &&
                            t.root === this &&
                            u(
                                "A state tree is not allowed to contain itself. Cannot assign " +
                                    this +
                                    " to path '" +
                                    t.path +
                                    "/" +
                                    e +
                                    "'"
                            ),
                        !this._parent &&
                            this._environment &&
                            u(
                                "A state tree that has been initialized with an environment cannot be made part of another state tree."
                            ),
                        this.parent && !t
                            ? this.die()
                            : (
                                  (this.subpath = e || ""),
                                  t &&
                                      t !== this._parent &&
                                      (
                                          t.root.identifierCache.mergeCache(this),
                                          (this._parent = t),
                                          this.fireHook("afterAttach")
                                      )
                              )
                    )
            }), (t.prototype.addDisposer = function(t) {
                this.disposers.unshift(t)
            }), (t.prototype.isRunningAction = function() {
                return !!this._isRunningAction || (!this.isRoot && this.parent.isRunningAction())
            }), (t.prototype.addMiddleWare = function(t) {
                return A(this.middlewares, t)
            }), (t.prototype.getChildNode = function(t) {
                this.assertAlive(), (this._autoUnbox = !1)
                var e = this.type.getChildNode(this, t)
                return (this._autoUnbox = !0), e
            }), (t.prototype.getChildren = function() {
                this.assertAlive(), (this._autoUnbox = !1)
                var t = this.type.getChildren(this)
                return (this._autoUnbox = !0), t
            }), (t.prototype.getChildType = function(t) {
                return this.type.getChildType(t)
            }), Object.defineProperty(t.prototype, "isProtected", {
                get: function() {
                    return this.root.isProtectionEnabled
                },
                enumerable: !0,
                configurable: !0
            }), (t.prototype.pseudoAction = function(t) {
                var e = this._isRunningAction
                ;(this._isRunningAction = !0), t(), (this._isRunningAction = e)
            }), (t.prototype.assertWritable = function() {
                this.assertAlive(), !this.isRunningAction() &&
                    this.isProtected &&
                    u(
                        "Cannot modify '" +
                            this +
                            "', the object is protected and can only be modified by using an action."
                    )
            }), (t.prototype.removeChild = function(t) {
                this.type.removeChild(this, t)
            }), (t.prototype.detach = function() {
                this._isAlive || u("Error while detaching, node is not alive."), this.isRoot ||
                    (
                        this.fireHook("beforeDetach"),
                        (this._environment = this.root._environment),
                        (this._isDetaching = !0),
                        (this.identifierCache = this.root.identifierCache.splitCache(this)),
                        this.parent.removeChild(this.subpath),
                        (this._parent = null),
                        (this.subpath = ""),
                        (this._isDetaching = !1)
                    )
            }), (t.prototype.unbox = function(t) {
                return t && !0 === this._autoUnbox ? t.value : t
            }), (t.prototype.fireHook = function(t) {
                var e =
                    this.storedValue && "object" == typeof this.storedValue && this.storedValue[t]
                "function" == typeof e && e.apply(this.storedValue)
            }), (t.prototype.toString = function() {
                var t = this.identifier ? "(id: " + this.identifier + ")" : ""
                return (
                    this.type.name +
                    "@" +
                    (this.path || "<root>") +
                    t +
                    (this.isAlive ? "" : "[dead]")
                )
            }), r([e.observable], t.prototype, "_parent", void 0), r(
                [e.observable],
                t.prototype,
                "subpath",
                void 0
            ), r([e.computed], t.prototype, "path", null), r(
                [e.computed],
                t.prototype,
                "value",
                null
            ), r([e.computed], t.prototype, "snapshot", null), r(
                [e.action],
                t.prototype,
                "applyPatch",
                null
            ), t
        })(),
        Ot = (function() {
            function t(t) {
                ;(this.isType = !0), (this.name = t)
            }
            return (t.prototype.create = function(t, e) {
                return void 0 === t && (t = this.getDefaultSnapshot()), ot(
                    this,
                    t
                ), this.instantiate(null, "", e, t).value
            }), (t.prototype.isAssignableFrom = function(t) {
                return t === this
            }), (t.prototype.validate = function(t, e) {
                return G(t)
                    ? k(t) === this || this.isAssignableFrom(k(t)) ? nt() : rt(e, t)
                    : this.isValidSnapshot(t, e)
            }), (t.prototype.is = function(t) {
                return 0 === this.validate(t, [{ path: "", type: this }]).length
            }), (t.prototype.reconcile = function(t, e) {
                var n = t.parent,
                    r = t.subpath
                if (G(e) && K(e) === t) return t
                if (
                    t.type === this &&
                    y(e) &&
                    !G(e) &&
                    (!t.identifierAttribute || t.identifier === e[t.identifierAttribute])
                )
                    return t.applySnapshot(e), t
                if ((t.die(), G(e) && this.isAssignableFrom(k(e)))) {
                    var i = K(e)
                    return i.setParent(n, r), i
                }
                return this.instantiate(n, r, t._environment, e)
            }), Object.defineProperty(t.prototype, "Type", {
                get: function() {
                    return u(
                        "Factory.Type should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.Type`"
                    )
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "SnapshotType", {
                get: function() {
                    return u(
                        "Factory.SnapshotType should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.SnapshotType`"
                    )
                },
                enumerable: !0,
                configurable: !0
            }), r([e.action], t.prototype, "create", null), t
        })(),
        xt = (function(t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return n(e, t), (e.prototype.getValue = function(t) {
                return t.storedValue
            }), (e.prototype.getSnapshot = function(t) {
                return t.storedValue
            }), (e.prototype.getDefaultSnapshot = function() {}), (e.prototype.applySnapshot = function(
                t,
                e
            ) {
                u("Immutable types do not support applying snapshots")
            }), (e.prototype.applyPatchLocally = function(t, e, n) {
                u("Immutable types do not support applying patches")
            }), (e.prototype.getChildren = function(t) {
                return Pt
            }), (e.prototype.getChildNode = function(t, e) {
                return u("No child '" + e + "' available in type: " + this.name)
            }), (e.prototype.getChildType = function(t) {
                return u("No child '" + t + "' available in type: " + this.name)
            }), (e.prototype.reconcile = function(t, e) {
                if (t.type === this && t.storedValue === e) return t
                var n = this.instantiate(t.parent, t.subpath, t._environment, e)
                return t.die(), n
            }), (e.prototype.removeChild = function(t, e) {
                return u("No child '" + e + "' available in type: " + this.name)
            }), e
        })(Ot),
        _t = (function(t) {
            function o(n, r) {
                var i = t.call(this, n) || this
                return (i.shouldAttachNode = !0), (i.flags =
                    wt.Map), (i.createNewInstance = function() {
                    var t = e.observable.shallowMap()
                    return w(t, "put", st), w(t, "toString", at), t
                }), (i.finalizeNewInstance = function(t, n) {
                    var r = t.storedValue
                    e.extras.interceptReads(r, t.unbox), e.intercept(r, function(t) {
                        return i.willChange(t)
                    }), t.applySnapshot(n), e.observe(r, i.didChange)
                }), (i.subType = r), i
            }
            return n(o, t), (o.prototype.instantiate = function(t, e, n, r) {
                return Y(this, t, e, n, r, this.createNewInstance, this.finalizeNewInstance)
            }), (o.prototype.describe = function() {
                return "Map<string, " + this.subType.describe() + ">"
            }), (o.prototype.getChildren = function(t) {
                return t.storedValue.values()
            }), (o.prototype.getChildNode = function(t, e) {
                var n = t.storedValue.get(e)
                return n || u("Not a child " + e), n
            }), (o.prototype.willChange = function(t) {
                var e = K(t.object)
                switch ((e.assertWritable(), t.type)) {
                    case "update":
                        var n = t.newValue
                        if (n === t.object.get(t.name)) return null
                        ot(this.subType, n), (t.newValue = this.subType.reconcile(
                            e.getChildNode(t.name),
                            t.newValue
                        )), this.verifyIdentifier(t.name, t.newValue)
                        break
                    case "add":
                        ot(this.subType, t.newValue), (t.newValue = this.subType.instantiate(
                            e,
                            t.name,
                            void 0,
                            t.newValue
                        )), this.verifyIdentifier(t.name, t.newValue)
                        break
                    case "delete":
                        e.getChildNode(t.name).die()
                }
                return t
            }), (o.prototype.verifyIdentifier = function(t, e) {
                var n = e.identifier
                null !== n &&
                    "" + n != "" + t &&
                    u(
                        "A map of objects containing an identifier should always store the object under their own identifier. Trying to store key '" +
                            n +
                            "', but expected: '" +
                            t +
                            "'"
                    )
            }), (o.prototype.getValue = function(t) {
                return t.storedValue
            }), (o.prototype.getSnapshot = function(t) {
                var e = {}
                return t.getChildren().forEach(function(t) {
                    e[t.subpath] = t.snapshot
                }), e
            }), (o.prototype.didChange = function(t) {
                var e = K(t.object)
                switch (t.type) {
                    case "update":
                    case "add":
                        return void e.emitPatch(
                            {
                                op: "add" === t.type ? "add" : "replace",
                                path: i(t.name),
                                value: e.getChildNode(t.name).snapshot
                            },
                            e
                        )
                    case "delete":
                        return void e.emitPatch({ op: "remove", path: i(t.name) }, e)
                }
            }), (o.prototype.applyPatchLocally = function(t, e, n) {
                var r = t.storedValue
                switch (n.op) {
                    case "add":
                    case "replace":
                        r.set(e, n.value)
                        break
                    case "remove":
                        r.delete(e)
                }
            }), (o.prototype.applySnapshot = function(t, e) {
                ot(this, e), t.pseudoAction(function() {
                    var n = t.storedValue,
                        r = {}
                    n.keys().forEach(function(t) {
                        r[t] = !1
                    }), Object.keys(e).forEach(function(t) {
                        n.set(t, e[t]), (r[t] = !0)
                    }), Object.keys(r).forEach(function(t) {
                        !1 === r[t] && n.delete(t)
                    })
                })
            }), (o.prototype.getChildType = function(t) {
                return this.subType
            }), (o.prototype.isValidSnapshot = function(t, e) {
                var n = this
                return d(t)
                    ? it(
                          Object.keys(t).map(function(r) {
                              return n.subType.validate(t[r], et(e, r, n.subType))
                          })
                      )
                    : rt(e, t)
            }), (o.prototype.getDefaultSnapshot = function() {
                return {}
            }), (o.prototype.removeChild = function(t, e) {
                t.storedValue.delete(e)
            }), r([e.action], o.prototype, "applySnapshot", null), o
        })(Ot),
        Nt = (function(t) {
            function i(n, r) {
                var i = t.call(this, n) || this
                return (i.shouldAttachNode = !0), (i.flags =
                    wt.Array), (i.createNewInstance = function() {
                    var t = e.observable.shallowArray()
                    return w(t, "toString", ut), t
                }), (i.finalizeNewInstance = function(t, n) {
                    var r = t.storedValue
                    ;(e.extras.getAdministration(r).dehancer = t.unbox), e.intercept(r, function(
                        t
                    ) {
                        return i.willChange(t)
                    }), t.applySnapshot(n), e.observe(r, i.didChange)
                }), (i.subType = r), i
            }
            return n(i, t), (i.prototype.describe = function() {
                return this.subType.describe() + "[]"
            }), (i.prototype.instantiate = function(t, e, n, r) {
                return Y(this, t, e, n, r, this.createNewInstance, this.finalizeNewInstance)
            }), (i.prototype.getChildren = function(t) {
                return t.storedValue.peek()
            }), (i.prototype.getChildNode = function(t, e) {
                var n = parseInt(e, 10)
                return n < t.storedValue.length ? t.storedValue[n] : u("Not a child: " + e)
            }), (i.prototype.willChange = function(t) {
                var e = K(t.object)
                e.assertWritable()
                var n = e.getChildren()
                switch (t.type) {
                    case "update":
                        if (t.newValue === t.object[t.index]) return null
                        t.newValue = pt(e, this.subType, [n[t.index]], [t.newValue], [t.index])[0]
                        break
                    case "splice":
                        var r = t.index,
                            i = t.removedCount,
                            o = t.added
                        t.added = pt(
                            e,
                            this.subType,
                            n.slice(r, r + i),
                            o,
                            o.map(function(t, e) {
                                return r + e
                            })
                        )
                        for (var a = r + i; a < n.length; a++)
                            n[a].setParent(e, "" + (a + o.length - i))
                }
                return t
            }), (i.prototype.getValue = function(t) {
                return t.storedValue
            }), (i.prototype.getSnapshot = function(t) {
                return t.getChildren().map(function(t) {
                    return t.snapshot
                })
            }), (i.prototype.didChange = function(t) {
                var e = K(t.object)
                switch (t.type) {
                    case "update":
                        return void e.emitPatch(
                            {
                                op: "replace",
                                path: "" + t.index,
                                value: e.getChildNode("" + t.index).snapshot
                            },
                            e
                        )
                    case "splice":
                        for (n = t.index + t.removedCount - 1; n >= t.index; n--)
                            e.emitPatch({ op: "remove", path: "" + n }, e)
                        for (var n = 0; n < t.addedCount; n++)
                            e.emitPatch(
                                {
                                    op: "add",
                                    path: "" + (t.index + n),
                                    value: e.getChildNode("" + (t.index + n)).snapshot
                                },
                                e
                            )
                        return
                }
            }), (i.prototype.applyPatchLocally = function(t, e, n) {
                var r = t.storedValue,
                    i = "-" === e ? r.length : parseInt(e)
                switch (n.op) {
                    case "replace":
                        r[i] = n.value
                        break
                    case "add":
                        r.splice(i, 0, n.value)
                        break
                    case "remove":
                        r.splice(i, 1)
                }
            }), (i.prototype.applySnapshot = function(t, e) {
                ot(this, e), t.pseudoAction(function() {
                    t.storedValue.replace(e)
                })
            }), (i.prototype.getChildType = function(t) {
                return this.subType
            }), (i.prototype.isValidSnapshot = function(t, e) {
                var n = this
                return Array.isArray(t)
                    ? it(
                          t.map(function(t, r) {
                              return n.subType.validate(t, et(e, "" + r, n.subType))
                          })
                      )
                    : rt(e, t)
            }), (i.prototype.getDefaultSnapshot = function() {
                return []
            }), (i.prototype.removeChild = function(t, e) {
                t.storedValue.splice(parseInt(e, 10), 1)
            }), r([e.action], i.prototype, "applySnapshot", null), i
        })(Ot),
        It = (function(t) {
            function e(e, n, r) {
                var i = t.call(this, e) || this
                return (i.flags = n), (i.checker = r), i
            }
            return n(e, t), (e.prototype.describe = function() {
                return this.name
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return Y(this, t, e, n, r)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return v(t) && this.checker(t) ? nt() : rt(e, t)
            }), e
        })(xt),
        Rt = new It("string", wt.String, function(t) {
            return "string" == typeof t
        }),
        Dt = new It("number", wt.Number, function(t) {
            return "number" == typeof t
        }),
        zt = new It("boolean", wt.Boolean, function(t) {
            return "boolean" == typeof t
        }),
        Et = new It("Date", wt.Date, function(t) {
            return t instanceof Date
        })
    Et.getSnapshot = function(t) {
        return t.storedValue.getTime()
    }
    var kt = (function(t) {
        function e(e) {
            var n = t.call(this, "identifier(" + e.name + ")") || this
            return (n.identifierType = e), (n.flags = wt.Identifier), n
        }
        return n(e, t), (e.prototype.instantiate = function(t, e, n, r) {
            return t && G(t.storedValue)
                ? (
                      t.identifierAttribute &&
                          u(
                              "Cannot define property '" +
                                  e +
                                  "' as object identifier, property '" +
                                  t.identifierAttribute +
                                  "' is already defined as identifier property"
                          ),
                      (t.identifierAttribute = e),
                      Y(this, t, e, n, r)
                  )
                : u("Identifier types can only be instantiated as direct child of a model type")
        }), (e.prototype.reconcile = function(t, e) {
            return t.storedValue !== e
                ? u(
                      "Tried to change identifier from '" +
                          t.storedValue +
                          "' to '" +
                          e +
                          "'. Changing identifiers is not allowed."
                  )
                : t
        }), (e.prototype.describe = function() {
            return "identifier(" + this.identifierType.describe() + ")"
        }), (e.prototype.isValidSnapshot = function(t, e) {
            return void 0 === t || null === t || "string" == typeof t || "number" == typeof t
                ? this.identifierType.validate(t, e)
                : rt(e, t, "References should be a primitive value")
        }), e
    })(xt),
        Ft = (function(t) {
            function e(e, n) {
                var r = t.call(this, e.name) || this
                return (r.type = e), (r.defaultValue = n), r
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    return this.type.flags | wt.Optional
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.describe = function() {
                return this.type.describe() + "?"
            }), (e.prototype.instantiate = function(t, e, n, r) {
                if (void 0 === r) {
                    var i = this.getDefaultValue(),
                        o = G(i) ? K(i).snapshot : i
                    return this.type.instantiate(t, e, n, o)
                }
                return this.type.instantiate(t, e, n, r)
            }), (e.prototype.reconcile = function(t, e) {
                return this.type.reconcile(t, this.type.is(e) ? e : this.getDefaultValue())
            }), (e.prototype.getDefaultValue = function() {
                var t = "function" == typeof this.defaultValue
                    ? this.defaultValue()
                    : this.defaultValue
                return "function" == typeof this.defaultValue && ot(this, t), t
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return void 0 === t ? nt() : this.type.validate(t, e)
            }), e
        })(xt),
        Mt = (function() {
            function t(t) {
                this.name = t
            }
            return (t.prototype.initializePrototype = function(
                t
            ) {}), (t.prototype.initialize = function(t, e) {}), (t.prototype.willChange = function(
                t
            ) {
                return null
            }), (t.prototype.didChange = function(t) {}), (t.prototype.serialize = function(
                t,
                e
            ) {}), (t.prototype.deserialize = function(t, e) {}), t
        })(),
        Lt = (function(t) {
            function r(e, n, r) {
                var i = t.call(this, e) || this
                return (i.getter = n), (i.setter = r), i
            }
            return n(r, t), (r.prototype.initializePrototype = function(t) {
                Object.defineProperty(
                    t,
                    this.name,
                    e.computed(t, this.name, {
                        get: this.getter,
                        set: this.setter,
                        configurable: !0,
                        enumerable: !1
                    })
                )
            }), (r.prototype.validate = function(t, e) {
                return this.name in t
                    ? rt(
                          et(e, this.name),
                          t[this.name],
                          "Computed properties should not be provided in the snapshot"
                      )
                    : nt()
            }), r
        })(Mt),
        Ut = (function(t) {
            function e(e) {
                var n = t.call(this, "" + e) || this
                return (n.flags = wt.Literal), (n.value = e), n
            }
            return n(e, t), (e.prototype.instantiate = function(t, e, n, r) {
                return Y(this, t, e, n, r)
            }), (e.prototype.describe = function() {
                return JSON.stringify(this.value)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return v(t) && t === this.value ? nt() : rt(e, t)
            }), e
        })(xt),
        Ht = ht(void 0),
        $t = (function(t) {
            function r(e, n) {
                var r = t.call(this, e) || this
                return (r.type = n), r
            }
            return n(r, t), (r.prototype.initializePrototype = function(t) {
                e.observable.ref(t, this.name, { value: Ht.instantiate(null, "", null, void 0) })
            }), (r.prototype.initialize = function(t, n) {
                var r = K(t)
                ;(t[this.name] = this.type.instantiate(
                    r,
                    this.name,
                    r._environment,
                    n[this.name]
                )), e.extras.interceptReads(t, this.name, r.unbox)
            }), (r.prototype.getValueNode = function(t) {
                var e = t.$mobx.values[this.name].value
                return e || u("Node not available for property " + this.name)
            }), (r.prototype.willChange = function(t) {
                var e = K(t.object)
                return ot(this.type, t.newValue), (t.newValue = this.type.reconcile(
                    e.getChildNode(t.name),
                    t.newValue
                )), t
            }), (r.prototype.didChange = function(t) {
                var e = K(t.object)
                e.emitPatch(
                    {
                        op: "replace",
                        path: i(this.name),
                        value: this.getValueNode(t.object).snapshot
                    },
                    e
                )
            }), (r.prototype.serialize = function(t, n) {
                e.extras.getAtom(t, this.name).reportObserved(), (n[this.name] = this.getValueNode(
                    t
                ).snapshot)
            }), (r.prototype.deserialize = function(t, e) {
                t[this.name] = e[this.name]
            }), (r.prototype.validate = function(t, e) {
                return this.type.validate(t[this.name], et(e, this.name, this.type))
            }), r
        })(Mt),
        Jt = (function(t) {
            function e(e, n) {
                var r = t.call(this, e) || this
                return (r.invokeAction = O(e, n)), r
            }
            return n(e, t), (e.prototype.initialize = function(t) {
                w(t, this.name, this.invokeAction.bind(t))
            }), (e.prototype.validate = function(t, e) {
                return this.name in t
                    ? rt(
                          et(e, this.name),
                          t[this.name],
                          "Action properties should not be provided in the snapshot"
                      )
                    : nt()
            }), e
        })(Mt),
        Wt = (function(t) {
            function e(e, n) {
                var r = t.call(this, e) || this
                return (r.invokeView = ft(e, n)), r
            }
            return n(e, t), (e.prototype.initialize = function(t) {
                w(t, this.name, this.invokeView.bind(t))
            }), (e.prototype.validate = function(t, e) {
                return this.name in t
                    ? rt(
                          et(e, this.name),
                          t[this.name],
                          "View properties should not be provided in the snapshot"
                      )
                    : nt()
            }), e
        })(Mt),
        Bt = (function(t) {
            function r(e, n) {
                var r = t.call(this, e) || this
                return (r.initialValue = n), null !== n && "object" == typeof n
                    ? u(
                          "Trying to declare property " +
                              e +
                              " with a non-primitive value. Please provide an initializer function to avoid accidental sharing of local state, like `" +
                              e +
                              ": () => initialValue`"
                      )
                    : r
            }
            return n(r, t), (r.prototype.initialize = function(t, n) {
                var r = "function" == typeof this.initialValue
                    ? this.initialValue.call(t, t)
                    : this.initialValue
                e.extendObservable(t, ((i = {}), (i[this.name] = r), i))
                var i
            }), (r.prototype.willChange = function(t) {
                return t
            }), (r.prototype.validate = function(t, e) {
                return this.name in t
                    ? rt(
                          et(e, this.name),
                          t[this.name],
                          "volatile state should not be provided in the snapshot"
                      )
                    : nt()
            }), r
        })(Mt),
        qt = [
            "preProcessSnapshot",
            "afterCreate",
            "afterAttach",
            "postProcessSnapshot",
            "beforeDetach",
            "beforeDestroy"
        ],
        Gt = (function(t) {
            function i(n, r, i, o) {
                var a = t.call(this, n) || this
                return (a.shouldAttachNode = !0), (a.flags =
                    wt.Object), (a.props = {}), (a.createNewInstance = function() {
                    var t = new a.modelConstructor()
                    return e.extendShallowObservable(t, {}), t
                }), (a.finalizeNewInstance = function(t, n) {
                    var r = t.storedValue
                    a.forAllProps(function(t) {
                        return t.initialize(r, n)
                    }), e.intercept(r, function(t) {
                        return a.willChange(t)
                    }), e.observe(r, a.didChange)
                }), (a.didChange = function(t) {
                    a.props[t.name].didChange(t)
                }), Object.freeze(r), Object.freeze(
                    o
                ), (a.properties = r), (a.state = i), (a.actions = o), /^\w[\w\d_]*$/.test(n) ||
                    u(
                        "Typename should be a valid identifier: " + n
                    ), (a.modelConstructor = new Function(
                    "return function " + n + " (){}"
                )()), (a.modelConstructor.prototype.toString = dt), a.parseModelProps(), a.forAllProps(
                    function(t) {
                        return t.initializePrototype(a.modelConstructor.prototype)
                    }
                ), a
            }
            return n(i, t), (i.prototype.instantiate = function(t, e, n, r) {
                return Y(
                    this,
                    t,
                    e,
                    n,
                    this.preProcessSnapshot(r),
                    this.createNewInstance,
                    this.finalizeNewInstance
                )
            }), (i.prototype.willChange = function(t) {
                return K(t.object).assertWritable(), this.props[t.name].willChange(t)
            }), (i.prototype.parseModelProps = function() {
                var t = this,
                    e = t.properties,
                    n = t.state,
                    r = t.actions
                for (var i in e)
                    if (P(e, i)) {
                        ;-1 !== qt.indexOf(i) &&
                            console.warn(
                                "Hook '" +
                                    i +
                                    "' was defined as property. Hooks should be defined as part of the actions"
                            )
                        var o = Object.getOwnPropertyDescriptor(e, i)
                        if ("get" in o) {
                            this.props[i] = new Lt(i, o.get, o.set)
                            continue
                        }
                        if (null === (s = o.value))
                            u(
                                "The default value of an attribute cannot be null or undefined as the type cannot be inferred. Did you mean `types.maybe(someType)`?"
                            )
                        else if (v(s)) {
                            var a = ct(s)
                            this.props[i] = new $t(i, lt(a, s))
                        } else
                            R(s)
                                ? (this.props[i] = new $t(i, s))
                                : "function" == typeof s
                                  ? (this.props[i] = new Wt(i, s))
                                  : u(
                                        "object" == typeof s
                                            ? "In property '" +
                                                  i +
                                                  "': base model's should not contain complex values: '" +
                                                  s +
                                                  "'"
                                            : "Unexpected value for property '" + i + "'"
                                    )
                    }
                for (var i in n)
                    if (P(n, i)) {
                        ;-1 !== qt.indexOf(i) &&
                            console.warn(
                                "Hook '" +
                                    i +
                                    "' was defined as local state. Hooks should be defined as part of the actions"
                            )
                        s = n[i]
                        i in this.properties &&
                            u(
                                "Property '" +
                                    i +
                                    "' was also defined as local state. Local state fields and properties should not collide"
                            ), (this.props[i] = new Bt(i, s))
                    }
                for (var i in r)
                    if (P(r, i)) {
                        var s = r[i]
                        i in this.properties &&
                            u(
                                "Property '" +
                                    i +
                                    "' was also defined as action. Actions and properties should not collide"
                            ), i in this.state &&
                            u(
                                "Property '" +
                                    i +
                                    "' was also defined as local state. Actions and state should not collide"
                            ), "function" == typeof s
                            ? (this.props[i] = new Jt(i, s))
                            : u(
                                  "Unexpected value for action '" +
                                      i +
                                      "'. Expected function, got " +
                                      typeof s
                              )
                    }
            }), (i.prototype.getChildren = function(t) {
                var e = []
                return this.forAllProps(function(n) {
                    n instanceof $t && e.push(n.getValueNode(t.storedValue))
                }), e
            }), (i.prototype.getChildNode = function(t, e) {
                return this.props[e] instanceof $t
                    ? this.props[e].getValueNode(t.storedValue)
                    : u("Not a value property: " + e)
            }), (i.prototype.getValue = function(t) {
                return t.storedValue
            }), (i.prototype.getSnapshot = function(t) {
                var e = {}
                return this.forAllProps(function(n) {
                    return n.serialize(t.storedValue, e)
                }), this.postProcessSnapshot(e)
            }), (i.prototype.applyPatchLocally = function(t, e, n) {
                "replace" !== n.op &&
                    "add" !== n.op &&
                    u("object does not support operation " + n.op), (t.storedValue[e] = n.value)
            }), (i.prototype.applySnapshot = function(t, e) {
                var n = this,
                    r = this.preProcessSnapshot(e)
                ot(this, r), t.pseudoAction(function() {
                    for (var e in n.props) n.props[e].deserialize(t.storedValue, r)
                })
            }), (i.prototype.preProcessSnapshot = function(t) {
                return "function" == typeof this.actions.preProcessSnapshot
                    ? this.actions.preProcessSnapshot.call(null, t)
                    : t
            }), (i.prototype.postProcessSnapshot = function(t) {
                return "function" == typeof this.actions.postProcessSnapshot
                    ? this.actions.postProcessSnapshot.call(null, t)
                    : t
            }), (i.prototype.getChildType = function(t) {
                return this.props[t].type
            }), (i.prototype.isValidSnapshot = function(t, e) {
                var n = this,
                    r = this.preProcessSnapshot(t)
                return d(r)
                    ? it(
                          Object.keys(this.props).map(function(t) {
                              return n.props[t].validate(r, e)
                          })
                      )
                    : rt(e, r)
            }), (i.prototype.forAllProps = function(t) {
                var e = this
                Object.keys(this.props).forEach(function(n) {
                    return t(e.props[n])
                })
            }), (i.prototype.describe = function() {
                var t = this
                return (
                    "{ " +
                    Object.keys(this.props)
                        .map(function(e) {
                            var n = t.props[e]
                            return n instanceof $t ? e + ": " + n.type.describe() : ""
                        })
                        .filter(Boolean)
                        .join("; ") +
                    " }"
                )
            }), (i.prototype.getDefaultSnapshot = function() {
                return {}
            }), (i.prototype.removeChild = function(t, e) {
                t.storedValue[e] = null
            }), r([e.action], i.prototype, "applySnapshot", null), i
        })(Ot),
        Kt = (function() {
            return function(t, e) {
                if (((this.mode = t), (this.value = e), "object" === t)) {
                    if (!G(e)) return u("Can only store references to tree nodes, got: '" + e + "'")
                    if (!K(e).identifierAttribute)
                        return u("Can only store references with a defined identifier attribute.")
                }
            }
        })(),
        Qt = (function(t) {
            function e(e) {
                var n = t.call(this, "reference(" + e.name + ")") || this
                return (n.targetType = e), (n.flags = wt.Reference), n
            }
            return n(e, t), (e.prototype.describe = function() {
                return this.name
            }), (e.prototype.getValue = function(t) {
                var e = t.storedValue
                if ("object" === e.mode) return e.value
                if (t.isAlive) {
                    var n = t.root.identifierCache.resolve(this.targetType, e.value)
                    return n
                        ? n.value
                        : u(
                              "Failed to resolve reference of type " +
                                  this.targetType.name +
                                  ": '" +
                                  e.value +
                                  "' (in: " +
                                  t.path +
                                  ")"
                          )
                }
            }), (e.prototype.getSnapshot = function(t) {
                var e = t.storedValue
                switch (e.mode) {
                    case "identifier":
                        return e.value
                    case "object":
                        return K(e.value).identifier
                }
            }), (e.prototype.instantiate = function(t, e, n, r) {
                var i = G(r)
                return Y(this, t, e, n, new Kt(i ? "object" : "identifier", r))
            }), (e.prototype.reconcile = function(t, e) {
                var n = G(e) ? "object" : "identifier"
                if (E(t.type)) {
                    var r = t.storedValue
                    if (n === r.mode && r.value === e) return t
                }
                var i = this.instantiate(t.parent, t.subpath, t._environment, e)
                return t.die(), i
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.targetType.isAssignableFrom(t)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return "string" == typeof t || "number" == typeof t
                    ? nt()
                    : rt(
                          e,
                          t,
                          "Value '" +
                              Z(t) +
                              "' is not a valid reference. Expected a string or number."
                      )
            }), e
        })(xt),
        Xt = (function(t) {
            function e(e, n, r) {
                var i = t.call(this, e) || this
                return (i.dispatcher = null), (i.dispatcher = r), (i.types = n), i
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    var t = wt.Union
                    return this.types.forEach(function(e) {
                        t |= e.flags
                    }), t
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.types.some(function(e) {
                    return e.isAssignableFrom(t)
                })
            }), (e.prototype.describe = function() {
                return (
                    "(" +
                    this.types
                        .map(function(t) {
                            return t.describe()
                        })
                        .join(" | ") +
                    ")"
                )
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return this.determineType(r).instantiate(t, e, n, r)
            }), (e.prototype.reconcile = function(t, e) {
                return this.determineType(e).reconcile(t, e)
            }), (e.prototype.determineType = function(t) {
                if (null !== this.dispatcher) return this.dispatcher(t)
                var e = this.types.filter(function(e) {
                    return e.is(t)
                })
                return e.length > 1
                    ? u(
                          "Ambiguos snapshot " +
                              JSON.stringify(t) +
                              " for union " +
                              this.name +
                              ". Please provide a dispatch in the union declaration."
                      )
                    : e[0]
            }), (e.prototype.isValidSnapshot = function(t, e) {
                if (null !== this.dispatcher) return this.dispatcher(t).validate(t, e)
                var n = this.types.map(function(n) {
                    return n.validate(t, e)
                }),
                    r = n.filter(function(t) {
                        return 0 === t.length
                    })
                return r.length > 1
                    ? rt(
                          e,
                          t,
                          "Multiple types are applicable and no dispatch method is defined for the union"
                      )
                    : r.length < 1
                      ? rt(
                            e,
                            t,
                            "No type is applicable and no dispatch method is defined for the union"
                        ).concat(it(n))
                      : nt()
            }), e
        })(xt),
        Yt = lt(ht(null), null),
        Zt = (function(t) {
            function e(e, n, r) {
                var i = t.call(this, e) || this
                return (i.type = n), (i.predicate = r), i
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    return this.type.flags | wt.Refinement
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.describe = function() {
                return this.name
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return this.type.instantiate(t, e, n, r)
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.type.isAssignableFrom(t)
            }), (e.prototype.isValidSnapshot = function(t, e) {
                if (this.type.is(t)) {
                    var n = G(t) ? K(t).snapshot : t
                    if (this.predicate(n)) return nt()
                }
                return rt(e, t)
            }), e
        })(xt),
        te = new ((function(t) {
            function e() {
                var e = t.call(this, "frozen") || this
                return (e.flags = wt.Frozen), e
            }
            return n(e, t), (e.prototype.describe = function() {
                return "<any immutable value>"
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return Y(this, t, e, n, g(r))
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return m(t) ? nt() : rt(e, t)
            }), e
        })(xt))(),
        ee = (function(t) {
            function e(e, n) {
                var r = t.call(this, e) || this
                return (r._subType = null), ("function" == typeof n && 0 === n.length) ||
                    u(
                        "Invalid late type, expected a function with zero arguments that returns a type, got: " +
                            n
                    ), (r.definition = n), r
            }
            return n(e, t), Object.defineProperty(e.prototype, "flags", {
                get: function() {
                    return this.subType.flags | wt.Late
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "subType", {
                get: function() {
                    return null === this._subType && (this._subType = this.definition()), this
                        ._subType
                },
                enumerable: !0,
                configurable: !0
            }), (e.prototype.instantiate = function(t, e, n, r) {
                return this.subType.instantiate(t, e, n, r)
            }), (e.prototype.reconcile = function(t, e) {
                return this.subType.reconcile(t, e)
            }), (e.prototype.describe = function() {
                return this.subType.name
            }), (e.prototype.isValidSnapshot = function(t, e) {
                return this.subType.validate(t, e)
            }), (e.prototype.isAssignableFrom = function(t) {
                return this.subType.isAssignableFrom(t)
            }), e
        })(xt),
        ne = {
            model: yt,
            compose: vt,
            reference: function(t) {
                return 2 === arguments.length &&
                    "string" == typeof arguments[1] &&
                    u(
                        "References with base path are no longer supported. Please remove the base path."
                    ), new Qt(t)
            },
            union: bt,
            optional: lt,
            literal: ht,
            maybe: function(t) {
                return bt(Yt, t)
            },
            refinement: function(t, e, n) {
                return new Zt(t, e, n)
            },
            string: Rt,
            boolean: zt,
            number: Dt,
            Date: Et,
            map: function(t) {
                return new _t("map<string, " + t.name + ">", t)
            },
            array: function(t) {
                return new Nt(t.name + "[]", t)
            },
            frozen: te,
            identifier: function(t) {
                return void 0 === t && (t = Rt), new kt(t)
            },
            late: function(t, e) {
                var n = "string" == typeof t ? t : "late(" + t.toString() + ")"
                return new ee(n, "string" == typeof t ? e : t)
            }
        }
    ;(t.types = ne), (t.escapeJsonPath = i), (t.unescapeJsonPath = o), (t.onAction = I), (t.isStateTreeNode = G), (t.asReduxStore = function(
        t
    ) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n]
        G(t) || u("Expected model object")
        var r = {
            getState: function() {
                return J(t)
            },
            dispatch: function(e) {
                mt(e, i.slice(), function(e) {
                    return N(t, gt(e))
                })
            },
            subscribe: function(e) {
                return L(t, e)
            }
        },
            i = e.map(function(t) {
                return t(r)
            })
        return r
    }), (t.connectReduxDevtools = function(t, e) {
        var n = t.connectViaExtension(),
            r = !1
        n.subscribe(function(n) {
            var i = t.extractState(n)
            i && ((r = !0), $(e, i), (r = !1))
        }), I(e, function(t) {
            if (!r) {
                var i = {}
                ;(i.type = t.name), t.args &&
                    t.args.forEach(function(t, e) {
                        return (i[e] = t)
                    }), n.send(i, J(e))
            }
        })
    }), (t.getType = k), (t.getChildType = function(t, e) {
        return K(t).getChildType(e)
    }), (t.addMiddleware = F), (t.onPatch = M), (t.onSnapshot = L), (t.applyPatch = U), (t.recordPatches = function(
        t
    ) {
        var e = {
            patches: [],
            stop: function() {
                return n()
            },
            replay: function(t) {
                U(t, e.patches)
            }
        },
            n = M(t, function(t) {
                e.patches.push(t)
            })
        return e
    }), (t.applyAction = H), (t.recordActions = function(t) {
        var e = {
            actions: [],
            stop: function() {
                return n()
            },
            replay: function(t) {
                H(t, e.actions)
            }
        },
            n = I(t, e.actions.push.bind(e.actions))
        return e
    }), (t.protect = function(t) {
        var e = K(t)
        e.isRoot || u("`protect` can only be invoked on root nodes"), (e.isProtectionEnabled = !0)
    }), (t.unprotect = function(t) {
        var e = K(t)
        e.isRoot || u("`unprotect` can only be invoked on root nodes"), (e.isProtectionEnabled = !1)
    }), (t.isProtected = function(t) {
        return K(t).isProtected
    }), (t.applySnapshot = $), (t.getSnapshot = J), (t.hasParent = function(t, e) {
        void 0 === e && (e = 1), e < 0 && u("Invalid depth: " + e + ", should be >= 1")
        for (var n = K(t).parent; n; ) {
            if (0 == --e) return !0
            n = n.parent
        }
        return !1
    }), (t.getParent = function(t, e) {
        void 0 === e && (e = 1), e < 0 && u("Invalid depth: " + e + ", should be >= 1")
        for (var n = e, r = K(t).parent; r; ) {
            if (0 == --n) return r.storedValue
            r = r.parent
        }
        return u("Failed to find the parent of " + K(t) + " at depth " + e)
    }), (t.getRoot = function(t) {
        return K(t).root.storedValue
    }), (t.getPath = function(t) {
        return K(t).path
    }), (t.getPathParts = function(t) {
        return s(K(t).path)
    }), (t.isRoot = function(t) {
        return K(t).isRoot
    }), (t.resolvePath = W), (t.resolveIdentifier = function(t, e, n) {
        R(t) || u("Expected a type as first argument")
        var r = K(e).root.identifierCache.resolve(t, "" + n)
        return r ? r.value : void 0
    }), (t.tryResolve = B), (t.getRelativePath = function(t, e) {
        return K(t).getRelativePathTo(K(e))
    }), (t.clone = function(t, e) {
        void 0 === e && (e = !0)
        var n = K(t)
        return n.type.create(n.snapshot, !0 === e ? n.root._environment : !1 === e ? void 0 : e)
    }), (t.detach = function(t) {
        return K(t).detach(), t
    }), (t.destroy = function(t) {
        var e = K(t)
        e.isRoot ? e.die() : e.parent.removeChild(e.subpath)
    }), (t.isAlive = function(t) {
        return K(t).isAlive
    }), (t.addDisposer = function(t, e) {
        K(t).addDisposer(e)
    }), (t.getEnv = function(t) {
        var e = K(t),
            n = e.root._environment
        return n ||
            u(
                "Node '" +
                    e +
                    "' is not part of state tree that was initialized with an environment. Environment can be passed as second argumentt to .create()"
            ), n
    }), (t.walk = q), Object.defineProperty(t, "__esModule", { value: !0 })
})
