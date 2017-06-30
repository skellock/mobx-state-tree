/**
 * Returns the _actual_ type of the given tree node. (Or throws)
 *
 * @export
 * @param {IStateTreeNode} object
 * @returns {IType<S, T>}
 */
export declare function getType<S, T>(object: IStateTreeNode): IType<S, T>
/**
 * Returns the _declared_ type of the given sub property of an object, array or map.
 *
 * @example
 * ```typescript
 * const Box = types.model({ x: 0, y: 0 })
 * const box = Box.create()
 *
 * console.log(getChildType(box, "x").name) // 'number'
 * ```
 *
 * @export
 * @param {IStateTreeNode} object
 * @param {string} child
 * @returns {IType<any, any>}
 */
export declare function getChildType(object: IStateTreeNode, child: string): IType<any, any>
/**
 * Middleware can be used to intercept any action is invoked on the subtree where it is attached.
 * If a tree is protected (by default), this means that any mutation of the tree will pass through your middleware.
 *
 * It is allowed to attach multiple middlewares. The order in which middleware is invoked is inside-out:
 * local middleware is invoked before parent middleware. On the same object, earlier attached middleware is run before later attached middleware.
 *
 * A middleware receives two arguments: 1. the description of the the call, 2: a function to invoke the next middleware in the chain.
 * If `next()` is not invoked by your middleware, the action will be aborted and not actually executed.
 *
 * A call description looks like:
 *
 * ```
 * {
 *      name: string // name of the action
 *      object: any & IStateTreeNode // the object on which the action was original invoked
 *      args: any[] // the arguments of the action
 * }
 * ```
 *
 * An example of a build in middleware is the `onAction` method.
 *
 * @example
 * ```typescript
 * const store = SomeStore.create()
 * const disposer = addMiddleWare(store, (call, next) => {
 *   console.log(`action ${call.name} was invoked`)
 *   next() // runs the next middleware (or the inteneded action if there is no middleware to run left)
 * })
 * ```
 *
 * @export
 * @param {IStateTreeNode} target
 * @param {(action: IRawActionCall, next: (call: IRawActionCall) => any) => any} middleware
 * @returns {IDisposer}
 */
export declare function addMiddleware(
    target: IStateTreeNode,
    middleware: (action: IRawActionCall, next: (call: IRawActionCall) => any) => any
): IDisposer
/**
 * Registers a function that will be invoked for each mutation that is applied to the provided model instance, or to any of its children.
 * See [patches](https://github.com/mobxjs/mobx-state-tree#patches) for more details. onPatch events are emitted immediately and will not await the end of a transaction.
 * Patches can be used to deep observe a model tree.
 *
 * @export
 * @param {Object} target the model instance from which to receive patches
 * @param {(patch: IJsonPatch) => void} callback the callback that is invoked for each patch
 * @returns {IDisposer} function to remove the listener
 */
export declare function onPatch(
    target: IStateTreeNode,
    callback: (patch: IJsonPatch) => void
): IDisposer
/**
 * Registeres a function that is invoked whenever a new snapshot for the given model instance is available.
 * The listener will only be fire at the and of the current MobX (trans)action.
 * See [snapshots](https://github.com/mobxjs/mobx-state-tree#snapshots) for more details.
 *
 * @export
 * @param {Object} target
 * @param {(snapshot: any) => void} callback
 * @returns {IDisposer}
 */
export declare function onSnapshot<S>(
    target: ObservableMap<S>,
    callback: (
        snapshot: {
            [key: string]: S
        }
    ) => void
): IDisposer
export declare function onSnapshot<S>(
    target: IObservableArray<S>,
    callback: (snapshot: S[]) => void
): IDisposer
export declare function onSnapshot<S>(
    target: ISnapshottable<S>,
    callback: (snapshot: S) => void
): IDisposer
/**
 * Applies a JSON-patch to the given model instance or bails out if the patch couldn't be applied
 * See [patches](https://github.com/mobxjs/mobx-state-tree#patches) for more details.
 *
 * Can apply a single past, or an array of patches.
 *
 * @export
 * @param {Object} target
 * @param {IJsonPatch} patch
 * @returns
 */
export declare function applyPatch(target: IStateTreeNode, patch: IJsonPatch | IJsonPatch[]): void
export interface IPatchRecorder {
    patches: IJsonPatch[]
    stop(): any
    replay(target: IStateTreeNode): any
}
/**
 * Small abstraction around `onPatch` and `applyPatch`, attaches a patch listener to a tree and records all the patches.
 * Returns an recorder object with the following signature:
 *
 * ```typescript
 * export interface IPatchRecorder {
 *      // the recorded patches
 *      patches: IJsonPatch[]
 *      // stop recording patches
 *      stop(): any
 *      // apply all the recorded patches on the given object
 *      replay(target: IStateTreeNode): any
 * }
 * ```
 *
 * @export
 * @param {IStateTreeNode} subject
 * @returns {IPatchRecorder}
 */
export declare function recordPatches(subject: IStateTreeNode): IPatchRecorder
/**
 * Applies an action or a series of actions in a single MobX transaction.
 * Does not return any value
 * Takes an action description as produced by the `onAction` middleware.
 *
 * @export
 * @param {Object} target
 * @param {IActionCall[]} actions
 * @param {IActionCallOptions} [options]
 */
export declare function applyAction(
    target: IStateTreeNode,
    actions: ISerializedActionCall | ISerializedActionCall[]
): void
export interface IActionRecorder {
    actions: ISerializedActionCall[]
    stop(): any
    replay(target: IStateTreeNode): any
}
/**
 * Small abstraction around `onAction` and `applyAction`, attaches an action listener to a tree and records all the actions emitted.
 * Returns an recorder object with the following signature:
 *
 * ```typescript
 * export interface IActionRecorder {
 *      // the recorded actions
 *      actions: IJsonPatch[]
 *      // stop recording actions
 *      stop(): any
 *      // apply all the recorded actions on the given object
 *      replay(target: IStateTreeNode): any
 * }
 * ```
 *
 * @export
 * @param {IStateTreeNode} subject
 * @returns {IPatchRecorder}
 */
export declare function recordActions(subject: IStateTreeNode): IActionRecorder
/**
 * The inverse of `unprotect`
 *
 * @export
 * @param {IStateTreeNode} target

 *
 */
export declare function protect(target: IStateTreeNode): void
/**
 * By default it is not allowed to directly modify a model. Models can only be modified through actions.
 * However, in some cases you don't care about the advantages (like replayability, tracability, etc) this yields.
 * For example because you are building a PoC or don't have any middleware attached to your tree.
 *
 * In that case you can disable this protection by calling `unprotect` on the root of your tree.
 *
 * @example
 * const Todo = types.model({
 *     done: false,
 *     toggle() {
 *         this.done = !this.done
 *     }
 * })
 *
 * const todo = new Todo()
 * todo.done = true // OK
 * protect(todo)
 * todo.done = false // throws!
 * todo.toggle() // OK
 */
export declare function unprotect(target: IStateTreeNode): void
/**
 * Returns true if the object is in protected mode, @see protect
 */
export declare function isProtected(target: IStateTreeNode): boolean
/**
 * Applies a snapshot to a given model instances. Patch and snapshot listeners will be invoked as usual.
 *
 * @export
 * @param {Object} target
 * @param {Object} snapshot
 * @returns
 */
export declare function applySnapshot<S, T>(target: IStateTreeNode, snapshot: S): void
/**
 * Calculates a snapshot from the given model instance. The snapshot will always reflect the latest state but use
 * structural sharing where possible. Doesn't require MobX transactions to be completed.
 *
 * @export
 * @param {Object} target
 * @returns {*}
 */
export declare function getSnapshot<S>(
    target: ObservableMap<S>
): {
    [key: string]: S
}
export declare function getSnapshot<S>(target: IObservableArray<S>): S[]
export declare function getSnapshot<S>(target: ISnapshottable<S>): S
/**
 * Given a model instance, returns `true` if the object has a parent, that is, is part of another object, map or array
 *
 * @export
 * @param {Object} target
 * @param {number} depth = 1, how far should we look upward?
 * @returns {boolean}
 */
export declare function hasParent(target: IStateTreeNode, depth?: number): boolean
/**
 * Returns the immediate parent of this object, or null.
 *
 * Note that the immediate parent can be either an object, map or array, and
 * doesn't necessarily refer to the parent model
 *
 * @export
 * @param {Object} target
 * @param {number} depth = 1, how far should we look upward?
 * @returns {*}
 */
export declare function getParent(target: IStateTreeNode, depth?: number): (any & IStateTreeNode)
export declare function getParent<T>(target: IStateTreeNode, depth?: number): (T & IStateTreeNode)
/**
 * Given an object in a model tree, returns the root object of that tree
 *
 * @export
 * @param {Object} target
 * @returns {*}
 */
export declare function getRoot(target: IStateTreeNode): any & IStateTreeNode
export declare function getRoot<T>(target: IStateTreeNode): T & IStateTreeNode
/**
 * Returns the path of the given object in the model tree
 *
 * @export
 * @param {Object} target
 * @returns {string}
 */
export declare function getPath(target: IStateTreeNode): string
/**
 * Returns the path of the given object as unescaped string array
 *
 * @export
 * @param {Object} target
 * @returns {string[]}
 */
export declare function getPathParts(target: IStateTreeNode): string[]
/**
 * Returns true if the given object is the root of a model tree
 *
 * @export
 * @param {Object} target
 * @returns {boolean}
 */
export declare function isRoot(target: IStateTreeNode): boolean
/**
 * Resolves a path relatively to a given object.
 *
 * @export
 * @param {Object} target
 * @param {string} path - escaped json path
 * @returns {*}
 */
export declare function resolvePath(target: IStateTreeNode, path: string): IStateTreeNode | any
export declare function resolveIdentifier(
    type: IType<any, any>,
    target: IStateTreeNode,
    identifier: string | number
): any
/**
 *
 *
 * @export
 * @param {Object} target
 * @param {string} path
 * @returns {*}
 */
export declare function tryResolve(target: IStateTreeNode, path: string): IStateTreeNode | any
export declare function getRelativePath(base: IStateTreeNode, target: IStateTreeNode): string
/**
 *
 *
 * @export
 * @template T
 * @param {T} source
 * @returns {T}
 */
export declare function clone<T extends IStateTreeNode>(
    source: T,
    keepEnvironment?: boolean | any
): T
/**
 * Removes a model element from the state tree, and let it live on as a new state tree
 */
export declare function detach<T extends IStateTreeNode>(thing: T): T
/**
 * Removes a model element from the state tree, and mark it as end-of-life; the element should not be used anymore
 */
export declare function destroy(thing: IStateTreeNode): void
export declare function isAlive(thing: IStateTreeNode): boolean
export declare function addDisposer(thing: IStateTreeNode, disposer: () => void): void
export declare function getEnv(thing: IStateTreeNode): any
/**
 * Performs a depth first walk through a tree
 */
export declare function walk(thing: IStateTreeNode, processor: (item: IStateTreeNode) => void): void
import { IRawActionCall, ISerializedActionCall } from "./action"
import { IObservableArray, ObservableMap } from "mobx"
import { IStateTreeNode } from "./node"
import { IJsonPatch } from "./json-patch"
import { IDisposer } from "../utils"
import { ISnapshottable, IType } from "../types/type"
