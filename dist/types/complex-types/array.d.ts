import {
    IObservableArray,
    IArrayWillChange,
    IArrayWillSplice,
    IArrayChange,
    IArraySplice
} from "mobx"
import { IJsonPatch, Node, IStateTreeNode } from "../../core"
import { ComplexType, IComplexType, IType } from "../type"
import { TypeFlags } from "../type-flags"
import { IContext, IValidationResult } from "../type-checker"
export declare function arrayToString(this: IObservableArray<any> & IStateTreeNode): string
export declare class ArrayType<S, T> extends ComplexType<S[], IObservableArray<T>> {
    shouldAttachNode: boolean
    subType: IType<any, any>
    readonly flags: TypeFlags
    constructor(name: string, subType: IType<any, any>)
    describe(): string
    createNewInstance: () => IObservableArray<{}>
    finalizeNewInstance: (node: Node, snapshot: any) => void
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: S): Node
    getChildren(node: Node): Node[]
    getChildNode(node: Node, key: string): Node
    willChange(change: IArrayWillChange<any> | IArrayWillSplice<any>): Object | null
    getValue(node: Node): any
    getSnapshot(node: Node): any
    didChange(this: {}, change: IArrayChange<any> | IArraySplice<any>): void
    applyPatchLocally(node: Node, subpath: string, patch: IJsonPatch): void
    applySnapshot(node: Node, snapshot: any[]): void
    getChildType(key: string): IType<any, any>
    isValidSnapshot(value: any, context: IContext): IValidationResult
    getDefaultSnapshot(): never[]
    removeChild(node: Node, subpath: string): void
}
export declare function array<S, T>(subtype: IType<S, T>): IComplexType<S[], IObservableArray<T>>
