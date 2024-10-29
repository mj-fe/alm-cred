$(() => {
    $('.code-mask').mask('0')
    $('.ddd-mask').mask("00")
    $('.date-mask').mask("00/00/0000")
    $('.phone-mask').mask("00000-0000")
    $('.zipcode-mask').mask('00000-000')
    $('.phone-with-ddd-mask').mask("(00) 00000-0000'")
    $('.money-mask').mask("#.##0,00", { reverse: true })
    $('.cpf-mask').mask("000.000.000-00", { reverse: true })
    $('.cnpj-mask').mask('00.000.000/0000-00', { reverse: true })
    $('.state-mask').mask('AA', {
        translation: {
            'A': {
                pattern: /[A-Za-z]/,
                optional: false
            },
        },
        onKeyPress: function(value, e, field, options) {
            field.val(value.toUpperCase());
        }
    });
})
