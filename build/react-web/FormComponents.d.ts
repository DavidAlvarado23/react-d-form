import { FormComponent } from '../index';
interface Iinput extends FormComponent {
    onBlur: (value: any) => any;
}
declare const Components: {
    Input: (props: Iinput) => any;
};
export default Components;
