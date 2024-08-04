
function Validator(options){

    function getParent(element,selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectedRules = {};

    function validate(inputElement,rule){
        var errorElement = getParent(inputElement,
            options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        
        //ルールを取り出し、チェック
        var rules = selectedRules[rule.selector];

        for (var i =0; i < rules.length; ++i){
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if(errorMessage) break;
            
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement,options.formGroupSelector).classList.add('invalid')
        }else{
            errorElement.innerText = '';
            getParent(inputElement,options.formGroupSelector).classList.remove('invalid')
        }

            return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    
    if(formElement){

        formElement.onsubmit = function(e){

            e.preventDefault();
            var isFormValid = true;
        
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement,rule);
                if (!isValid){
                    isFormValid = false;
                }
            });
            

            if (isFormValid){
                if (typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        switch(input.type){
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        
                        }
                        return values;
                    },{});
                    console.log(formValues)
                    options.onSubmit(formValues);
                }
            }
            // else{
            //     formElement.submit()
            // }
        }
        options.rules.forEach(function(rule){
            // ルールの保存
            if(Array.isArray(selectedRules[rule.selector])){
                selectedRules[rule.selector].push(rule.test);
            }
            else{
                selectedRules[rule.selector] = [rule.test];
            }

            
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý trường hợp blur khỏi input
                 inputElement.onblur = function () {
                     validate(inputElement, rule);
                 }
 
                 // Xử lý mỗi khi người dùng nhập vào input
                 inputElement.oninput = function () {
                     var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                     errorElement.innerText = '';
                     getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                 } 
             });

        });
    }
}

Validator.isRequired = function(selector,message){
  return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'ユーザー名を入力してください。'
        }

    };
}
Validator.isEmail = function(selector,message){
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || '正しいメールアドレスを入力してください。';
        }

    };
}
Validator.isPhoneNumber = function(selector,message){
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[0-9-]{10,13}$/i;
            return regex.test(value) ? undefined :  message || '正しい電話番号を入力してください。';
        }

    };
}

Validator.minLength = function (selector,min,max){
    return{
        selector:selector,
        test: function (value){
            return value.length >=min &&value.length <=max ? undefined : `パスワードは${min}〜${max}文字の間で入力してください`;
        }
    }

}

Validator.isConfirmed = function (selector,getConfirmValue,message) {
    return{
        selector: selector,
        test:function (value){
            return value === getConfirmValue() ? undefined : message ||'確認パスワードが一致しません。'
        }
    }
}