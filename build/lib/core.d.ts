import React, { PureComponent } from 'react';
import { Props, Field } from '../types';
export type Tvalidation = {
    isValid: boolean;
    errorMessage: string;
};
export type IValidation<T extends Record<string, any>> = {
    [K in keyof T]: Tvalidation;
};
export interface IfieldState<T> {
    validation: IFieldsStateValidation;
    data: T;
}
export interface IFieldsStateValidation {
    isFormValid: boolean;
}
export interface IState<T> {
    fieldsState: IfieldState<T>;
    validationForm: IValidation<T>;
    usedFields: string[];
    oldState: IfieldState<T>;
}
export interface RowChild<T> {
    rowKey: number;
    rowFields: Field<T>[];
}
type RowChildFn<T> = (params: RowChild<T>) => React.ReactElement;
/**
 *  TODO Send only the required props
 * @param FormComponentes
 * @param props
 */
export declare const GetComponent: (FormComponentes: any, props: any) => any;
export default class Core<T> extends PureComponent<Props<T>, IState<T>> {
    static defaultProps: Partial<Props<any>>;
    propsHasChange: any;
    constructor(props: Props<T>);
    componentDidUpdate(): void;
    getSnapshotBeforeUpdate(prevProps: Props<any>): null;
    componentDidMount(): void;
    generateValues(_?: Props<any>): void;
    private getISFORMVALID;
    private parseValue;
    private validateField;
    onFieldsChange(field: Field<any>, val: any, doOnChange: boolean): void;
    getDataDependsOn(field: Field<any>): any;
    getValue(field: Field<any>): any;
    rows(rowChild: RowChildFn<T>): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>[];
    fieldFn(rows: {
        rowFields: Field<T>[];
    }, cb: Function): any[];
    render(): React.JSX.Element;
}
export {};
