import { Type, IType } from "../type"
import { TypeFlags } from "../type-flags"
import { IContext, IValidationResult } from "../type-checker"
import { Node } from "../../core"
export declare class IdentifierType<T> extends Type<T, T> {
    readonly identifierType: IType<T, T>
    readonly flags: TypeFlags
    constructor(identifierType: IType<T, T>)
    instantiate(parent: Node | null, subpath: string, environment: any, snapshot: T): Node
    reconcile(current: Node, newValue: any): Node
    describe(): string
    isValidSnapshot(value: any, context: IContext): IValidationResult
}
export declare function identifier<T>(baseType: IType<T, T>): IType<T, T>
export declare function identifier<T>(): T
