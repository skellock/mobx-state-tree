export declare type ISerializedActionCall = {
    name: string
    path?: string
    args?: any[]
}
export declare type IRawActionCall = {
    name: string
    object: any & IStateTreeNode
    args: any[]
}
export declare type IMiddleWareHandler = (
    actionCall: IRawActionCall,
    next: (actionCall: IRawActionCall) => any
) => any
export declare function createActionInvoker(
    name: string,
    fn: Function
): (this: IStateTreeNode) => any
export declare function applyAction(target: IStateTreeNode, action: ISerializedActionCall): any
export declare function onAction(
    target: IStateTreeNode,
    listener: (call: ISerializedActionCall) => void
): IDisposer
import { IStateTreeNode } from "./node"
import { IDisposer } from "../utils"
