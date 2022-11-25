import { AutoComplete as SelectAutoComplete } from 'antd';
import { useField } from 'formik';

export function AutoComplete({
    name,
    placeholder,
    options,
    onValueChange,
    setFieldValue,
    callFunction,
    disabled,
    ...props
}){
    const [field] = useField(props)
    return (
        <SelectAutoComplete
            style={{width:"100%"}}
            options={options}
            value={field?.value[name]}
            onSelect={(value, option) => {
                setFieldValue(name, value, false);
                if(onValueChange){
                    callFunction(option.id);
                    onValueChange();
                }
            }}
            onClear={() => {setFieldValue(name, null, false);}}
            disabled={disabled}
            allowClear={false}
            filterOption={true}
            notFoundContent={`${placeholder} tidak ditemukan`}
        >
            <input placeholder={placeholder} style={{ width: "100%", borderRadius: 5, padding: "10px" }}></input>
        </SelectAutoComplete>
    )
}