const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// SIGNUP
var yearSelect = $(".signup-born-year-select");
var monthSelect = $(".signup-born-month-select");
var daySelect = $(".signup-born-day-select");
    
//year
    for (var i = 2014; i >= 1900; i--) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;
        yearSelect.add(option);
    }
// month
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.text = (i < 10 ? "0" : "") + i;
        option.value = (i < 10 ? "0" : "") + i;
        monthSelect.add(option);
    }
// day
    for (var i = 1; i <= 31; i++) {
        var option = document.createElement("option");
        option.text = (i < 10 ? "0" : "") + i;
        option.value = (i < 10 ? "0" : "") + i;
        daySelect.add(option);
    }

var input_password = $$('.signup-input-pass')
input_password.forEach(element => {
    element.parentElement.querySelector('.pass-hide').onclick = function () {
        if(this.classList.contains('hidden')){
            element.type='text'
            this.classList.remove('hidden');
            this.classList.add('visible');
            this.innerHTML = '非表示';
        }else{
            element.type='password'
            this.classList.remove('visible');
            this.classList.add('hidden');
            this.innerHTML = '表示';
    
        }
    
    }
});


// Agrrement input----------------------------
var Agreement_input = $('.signup-agreement-content-input')
var Agreement_input_box = $('.signup-agreement-content-input-box')
var Agreement_input_check = $('.signup-agreement-content-input i')
var Agreement_input_error = $('.signup-agreement-errorcontent')


Agreement_input_box.onclick = function(){
    Agreement_input_box.classList.toggle('checked')
    if(Agreement_input_box.classList.contains('checked')){
                
        Agreement_input_error.style.opacity = "0";

    }
}


// Agrrement

var agreement_btn = $('.agreement');
var agreement_btn_close = $('.agreement-container-close')
var privacy_btn = $('.privacy')
var privacy_btn_close = $('.privacy-container-close')

agreement_btn.onclick = function(){
    var overlay = $(".agreement-container");
    var body = document.body;

    
    body.classList.toggle("overlay-open_agreement");

    if (body.classList.contains("overlay-open")) {
        body.style.position = "fixed";
    } else {
        body.style.position = "";
    }
}

agreement_btn_close.onclick = function(){
    var body = document.body;
    if (body.classList.contains("overlay-open_agreement")){
        body.classList.remove("overlay-open_agreement");
    }
}

//privacy
privacy_btn.onclick = function(){
    var overlay = $(".privacy-container");
    var body = document.body;

    
    body.classList.toggle("overlay-open_privacy");

    if (body.classList.contains("overlay-open")) {
        body.style.position = "fixed";
    } else {
        body.style.position = "";
    }
}

privacy_btn_close.onclick = function(){
    var body = document.body;
    if (body.classList.contains("overlay-open_privacy")){
        body.classList.remove("overlay-open_privacy");
    }
}

//Form-group--------------------------------------




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
        var errorMessage;
        var errorElement = getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
        
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

            if(!Agreement_input_box.classList.contains('checked')){
                
                Agreement_input_error.style.opacity = "1";

            }else{
                Agreement_input_error.style.opacity = "0";
            }


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
                    console.log(Array.from(enableInputs))
                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        
                        switch(input.type){
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                    
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    },{});
                    
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

            Array.from(inputElements).forEach(function (inputElement){

                inputElement.onblur = function(){
                    validate(inputElement,rule);
                }

                inputElement.oninput = function () {
                    var errorElement =  getParent(inputElement,options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement,options.formGroupSelector).classList.remove('invalid')
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

Validator.minLength = function (selector,min,max){
    return{
        selector:selector,
        test: function (value){
            return value.length >=min &&value.length <=max ? undefined : `パスワードは${min}〜${max}文字の間で入力してください`;
        }
    }

}

Validator.isConfirmed = function (selector,getCofirmValue,message) {
    return{
        selector: selector,
        test:function (value){
            return value === getCofirmValue() ? undefined : message ||'確認パスワードが一致しません。'
        }
    }
}