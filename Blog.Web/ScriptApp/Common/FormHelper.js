var FormHelper = (function () {
    var handleOperationResult = function (result, div) {
        if (!result || !result.ErrorMessages)
            return;

        var msg = '';
        for (var i = 0; i < result.ErrorMessages.length; i++) {
            msg += '<div>' + result.ErrorMessages[i] + '</div>';
        }

        if (msg) {
            if (div)
                div.html(msg);
            else
                FormHelper.alertError(msg);
        }
    };

    var buttonReset = function (btn) {
        $(btn).button('reset');
    };

    var buttonLoading = function (btn) {
        $(btn).button('loading');
    };

    var isNullOrWhitespace = function (input) {
        if (typeof input === 'undefined' || input == null) return true;

        return input.replace(/\s/g, '').length < 1;
    };

    var isElementVisible = function (el) {
        return $(el).is(':visible');
    };

    var isElementDisabled = function (el) {
        return $(el).is(':disabled');
    };

    var setElementVisible = function (el, visible) {
        if (visible) {
            $(el).show();
        } else {
            $(el).hide();
        }
    }

    var setElementDisabled = function (el, disabled) {
        if (disabled) {
            $(el).attr('disabled', 'disabled');
        } else {
            $(el).removeAttr('disabled');
        }
    };

    var clearForm = function (form) {
        $(form).find('input[type="text"],select,textarea').val('');
    };

    var setFormDisabled = function (form, disabled) {
        $(form).find('input[type!="hidden"],select,textarea').each(function (index, element) {
            FormHelper.setElementDisabled(element, disabled);
        });
    };

    var setElementEnabled = function (el, enabled) {
        setElementDisabled(el, !enabled);
    };

    var showModal = function (modalId, data, options) {
        var opts = options || {};

        var modalDiv = $('#' + modalId);
        modalDiv.remove();
        $('body').append("<div id='" + modalId + "' class='modal fade' tabindex='-1' role='dialog'></div>");
        modalDiv = $('#' + modalId);
        modalDiv.html(data).modal(opts, 'show');
        modalDiv.on('hidden.bs.modal', function () {
            modalDiv.remove();
        });
    };

    var attachEnterPressedHandler = function (element, handler) {
        $(element).on('keypress', function (e) {
            if (e.keyCode === 13) {
                handler.call(element);
            }
        });
    };

    var getFormValues = function (form) {
        var formObj = {};
        var inputs = $(form).serializeArray();

        $.each(inputs, function (i, input) {
            formObj[input.name] = input.value;
        });

        //add checkboxes
        $(form).find('input:checkbox').each(function () {
            formObj[this.name] = this.checked;
        });

        return formObj;
    };

    var fitVideos = function () {
        $(document).fitVids();
    };

    //dateText - date in format DD.MM.YYYY
    var convertDateForAjaxGet = function (dateText) {
        var momentDate = momentDateFromStringDate(dateText);
        if (!momentDate)
            return null;
        return momentDate.toJSON();
    };
    // dateText - date text in our special format
    // returns date suitable for url
    var convertDateForHttpGet = function (dateText) {
        var momentDate = momentDateFromStringDate(dateText);
        if (!momentDate)
            return null;
        return momentDate.format('YYYY-MM-DD');
    };
    //dateText - date in format DD.MM.YYYY
    var momentDateFromStringDate = function (dateText) {
        if (!dateText)
            return null;
        return moment(dateText, 'DD.MM.YYYY').utc(true);
    }
    //dateText - date in format DD.MM.YYYY HH:mm:ss
    var momentDateFromStringDateTime = function (dateText) {
        if (!dateText)
            return null;
        return moment(dateText, 'DD.MM.YYYY HH:mm:ss').utc(true);
    }
    // momentDate - moment object with date
    var formatMomentDate = function (momentDate) {
        if (!momentDate)
            return null;
        return momentDate.format('DD.MM.YYYY');
    }

    var alertInfo = function (message, title) {
        $.SmartMessageBox({
            title: title,
            content: message,
            buttons: '[ok]'
        });
    };

    var alertError = function (message) {
        $.SmartMessageBox({
            title: Resources.Common.Error,
            content: message,
            buttons: '[ok]'
        });

        e.preventDefault();
    };

    var stopEventPropagation = function (e) {
        if (!e)
            e = window.event;

        //IE9 & Other Browsers
        if (e.stopPropagation) {
            e.stopPropagation();
        }
            //IE8 and Lower
        else {
            e.cancelBubble = true;
        }
    };

    function preventDefault(e) {
        // old IE
        if (window.event) {
            if (window.event.preventDefault) {
                window.event.preventDefault();
            } else {
                window.event.returnValue = false;
            }
        }
        // other
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }

    function populateDropDownWithSelectOptions(response, controlId, addEmptyElement, emptyElementDisplayName, emptyElementDisplayValue) {
        $(controlId).html();
        if (addEmptyElement) {
            $(controlId).append($("<option></option>").val(emptyElementDisplayValue).html(emptyElementDisplayName));
        }

        for (var i = 0; i < response.length; i++) {
            var value;
            if (response[i].Id != undefined) {
                value = response[i].Id;
            } else {
                value = response[i].Code;
            }
            $(controlId).append($("<option></option>").val(value).html(response[i].Name));
        }
    };

    function digtsOnly(e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    // Email obfuscator script by http://www.jottings.com/obfuscator/
    // Visit above page to generate 'coded' and 'key' parameters
    var deobfuscateEmail = function (coded, key) {

        var shift = coded.length
        var link = ""
        for (i = 0; i < coded.length; i++) {
            if (key.indexOf(coded.charAt(i)) == -1) {
                var ltr = coded.charAt(i)
                link += (ltr)
            }
            else {
                var ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length
                link += (key.charAt(ltr))
            }
        }
        return link;
    };

    // Generated at http://www.jottings.com/obfuscator/
    var emailObfuscations = {
        infoCoded: 'n453@n-RG3fa.Gt',
        infoKey: 'krcDZotJR8TzOSn9fKjY3aWF70UpM4y5P6X1dBIqLgGeQNC2bmxvHlVshwAuEi',
        marketingCoded: 'TL2WH3XVe@X-oru23.rv',
        marketingKey: 'w15tCbp8NAGkFuHVc9PhxJd3amrlZqIWOSzsgKiU0QEMLT2vD7YRBj4oenXy6f',
    };

    var getDisciplineTextById = function (disciplineId) {
        var result = '';
        $.each(TPEnums.Discipline, function (prop, val) {
            if (val == disciplineId) {
                result = prop;
                return;
            }
        });

        return result;
    }

    return {
        handleOperationResult: handleOperationResult,
        buttonReset: buttonReset,
        buttonLoading: buttonLoading,
        isNullOrWhitespace: isNullOrWhitespace,
        isElementVisible: isElementVisible,
        isElementDisabled: isElementDisabled,
        setElementVisible: setElementVisible,
        setElementDisabled: setElementDisabled,
        setElementEnabled: setElementEnabled,
        showModal: showModal,
        attachEnterPressedHandler: attachEnterPressedHandler,
        getFormValues: getFormValues,
        fitVideos: fitVideos,
        clearForm: clearForm,
        setFormDisabled: setFormDisabled,
        momentDateFromStringDate: momentDateFromStringDate,
        momentDateFromStringDateTime: momentDateFromStringDateTime,
        formatMomentDate: formatMomentDate,
        convertDateForHttpGet: convertDateForHttpGet,
        convertDateForAjaxGet: convertDateForAjaxGet,
        alertInfo: alertInfo,
        alertError: alertError,
        stopEventPropagation: stopEventPropagation,
        populateDropDownWithSelectOptions: populateDropDownWithSelectOptions,
        digtsOnly: digtsOnly,
        preventDefault: preventDefault,
        deobfuscateEmail: deobfuscateEmail,
        emailObfuscations: emailObfuscations,
        getDisciplineTextById: getDisciplineTextById
    }
})();