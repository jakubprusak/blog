var Post = Post || {};

Post.PostList = (function() {
    var getOlderPostsButton = "#getOlderPostsButton";
    var postPreview = ".post-preview";
    var posts = "#posts";
    $(function () {
        init();
    });

    function init() {

        $(getOlderPostsButton).click(getOlderPostsButtonHandler);
    }


    function getOlderPostsButtonHandler() {

        var lastId = $(postPreview).last().data("id");


        AjaxHelper.get("/Post/PostList",
            { id: lastId },
            function(responseHtml) {
                $(posts).append(responseHtml);
            },
            null,
            AjaxHelper.jQueryDataTypes.Html);
    }
})();