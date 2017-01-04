var AjaxHelper = (function () {
    // in request
    var jQueryContentTypes = {
        FormData: 'application/x-www-form-urlencoded; charset=UTF-8',
        Json: 'application/json; charset=UTF-8'
    };
    // in response
    var jQueryDataTypes = {
        Html: 'html',
        Json: 'json'
    };

    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
        handleAjaxError(jqxhr);
    });

    var handleAjaxError = function (jqxhr) {
        if (jqxhr != null) {
            if (window.location.href.indexOf('http://localhost') == 0) {
                document.write(jqxhr.responseText);
            } else {
                FormHelper.alertError(resources.Common.Messages.UnhandledException);
            }
        }
    };


    var post = function (url, data, success, error, contentType, dataType) {
        var globalHandling = !error;
        var stringifiedData = null;
        if (typeof data == 'string') {
            stringifiedData = data;
        } else {
            stringifiedData = JSON.stringify(data);
        }

        var ajaxOptions = {
            url: url,
            data: stringifiedData,
            method: 'POST',
            dataType: dataType || jQueryDataTypes.Json,
            contentType: AjaxHelper.jQueryContentTypes.Json,
            global: globalHandling,
            success: success,
            error: error,
            headers: {
            }
        }
        if (contentType) {
            ajaxOptions.contentType = contentType;
        }
        var csrfToken = $('input[name=__RequestVerificationToken]').val();

        if (csrfToken) {
            ajaxOptions.headers.RequestVerificationToken = csrfToken;
        }
        $.ajax(ajaxOptions);
    };

    var get = function (url, data, success, error, dataType) {
        var globalHandling = !error;

        $.ajax({
            type: "GET",
            url: url,
            dataType: dataType || jQueryDataTypes.Json,
            traditional: true,
            data: data,
            global: globalHandling,
            success: success,
            error: error
        });
    };

    var getAndHandleErrors = function (url, data, actionButton, success) {
        if (actionButton) {
            FormHelper.buttonLoading(actionButton);
        }
        get(url, data,
            function (response) {
                if (actionButton) {
                    FormHelper.buttonReset(actionButton);
                }
                if (response.Error) {
                    FormHelper.handleOperationResult(response);
                }
                if (success) {
                    success(response);
                }
            },
            function (jqxhr) {
                if (actionButton) {
                    FormHelper.buttonReset(actionButton);
                }
                handleAjaxError(jqxhr);
            });
    };

    var postAndHandleErrors = function (url, data, actionButton, success, divToAppendOperationResult, contentType, dataType) {
        if (actionButton) {
            FormHelper.buttonLoading(actionButton);
        }
        if (divToAppendOperationResult)
            divToAppendOperationResult.html("");

        post(url, data,
            function (response) {
                if (actionButton) {
                    FormHelper.buttonReset(actionButton);
                }

                var jsonResponse = response;
                if (dataType == jQueryDataTypes.Html) {
                    try {
                        jsonResponse = JSON.parse(response);
                    } catch (e) {

                    }
                };

                if (jsonResponse && jsonResponse.Error) {
                    FormHelper.handleOperationResult(jsonResponse, divToAppendOperationResult);
                    return;
                }
                if (success) {
                    success(response);
                }
            },
            function (jqxhr) {
                if (actionButton) {
                    FormHelper.buttonReset(actionButton);
                }
                handleAjaxError(jqxhr);
            }, contentType, dataType);
    };

    return {
        post: post,
        get: get,
        postAndHandleErrors: postAndHandleErrors,
        getAndHandleErrors: getAndHandleErrors,
        jQueryContentTypes: jQueryContentTypes,
        jQueryDataTypes: jQueryDataTypes
    };


})();