const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;
const emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

export default {
  isRequired: { rule: v => !!v, msg: '%s er et krævet felt.' },
  isPhone: { rule: v => !!v.match(phoneRegex), msg: "ikke gyldigt %s format"},
  isEmail: { rule: v => !!v.match(emailRegex), msg: "ikke gyldigt %s format"}
}
