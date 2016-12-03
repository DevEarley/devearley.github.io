angular.module('DEVE').service('ValidationService', function ($http,$rootScope) {
    var IsEmpty = function (str) {
        return (str == null) || (str.length == 0);
    }
    var IsNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return {
       
        ValidateEmail: function (email) {
      
            email.Attempted = true;
            var re = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
            if (IsEmpty(email.Value) || !re.test(email.Value)) {
                email.Valid = false;
                email.Verifying = false;
                return false;
            }

            email.Valid = true;
            return true;
            
        },
        ValidateField: function (field) {
            field.Attempted = true;
            if (IsEmpty(field.Value)) {
                field.Valid = false;
                return;                
            }
          
            field.Valid = true;
            return;
        },
        ValidateNonNumeric: function (field) {
            field.Attempted = true;
            if (IsEmpty(field.Value)) {
                field.Valid = false;
                return;
            }
            var re = /^([^0-9])+$/i
            var valid = re.test(field.Value);
            field.Valid = valid;
            return;
        },
        ValidateNumeric: function (field) {
            field.Attempted = true;
            if (IsEmpty(field.Value) || !IsNumeric(field.Value)) {
                field.Valid = false;
                return;
            }
            field.Valid = true;
            return;
        },
        ValidatePhone: function (field) {
            field.Attempted = true;
            if (IsEmpty(field.Value) || !IsNumeric(field.Value) || field.Value.length != 10) {
                field.Valid = false;
                return;
            }
            field.Valid = true;
            return;
        },
        ValidateZip: function (field) {
        field.Attempted = true;
        if (IsEmpty(field.Value) ||!IsNumeric(field.Value)|| field.Value.length != 5) {
            field.Valid = false;
            return;                
        }
        field.Valid = true;
        return;
    }
    };
});

