var Post = Post || {};


Post.Create = (function () {
    var content = "#Content";
    var previewButton = "#previewButton";
    var createPostForm = "#createPostForm";
    var saveButton = "#saveButton";

    $(function () {
        init();
    });

    function init() {

        $(content)
            .summernote({
                height: 300, // set editor height
                minHeight: null, // set minimum height of editor
                maxHeight: null, // set maximum height of editor
                focus: true
            });
        $(saveButton).click(saveButtonHandler);
    }

    function saveButtonHandler() {
        var formValues = FormHelper.getFormValues(createPostForm);
        formValues.Content = $(content).code();
        AjaxHelper.post("/Post/Create/", { post: formValues });
    }

})();