import VueFormGenerator from 'vue-form-generator'

export default [
    {
        model: 'id',
        value: 1,
        type: 'input',
        inputType: 'text',
        label: 'ID (disabled text field)',
        readonly: true,
        disabled: true
    },
    {
        model: 'name',
        value: 'John Doe',
        type: 'input',
        inputType: 'text',
        label: 'Name',
        placeholder: 'Your name',
        featured: true,
        required: true
    },
    {
        model: 'password',
        value: 'J0hnD03!x4',
        type: 'input',
        inputType: 'password',
        label: 'Password',
        min: 6,
        required: true,
        hint: 'Minimum 6 characters',
        validator: VueFormGenerator.validators.string
    },
    {
        model: 'skills',
        value: 'Javascript',
        type: 'select',
        label: 'Skills',
        values: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
    },
    {
        model: 'email',
        value: 'john.doe@gmail.com',
        type: 'input',
        inputType: 'email',
        label: 'E-mail',
        placeholder: "User's e-mail address",
        shouldEnter: values => values['skills'] === 'VueJS'
    },
    {
        model: 'status',
        value: true,
        type: 'checkbox',
        label: 'Status',
        default: true
    }
]
