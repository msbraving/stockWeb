/**
 * Created with IntelliJ IDEA.
 * User: jiangzaide
 * Date: 13-9-25
 * Time: 下午2:02
 * To change this template use File | Settings | File Templates.
 */
;
(function ($) {
    /**
     * Namespace
     */
    $.extend({
        namespace: function () {
            var a = arguments, o = null, i, j, d, rt;
            for (i = 0; i < a.length; ++i) {
                d = a[i].split(".");
                rt = d[0];
                eval("if (typeof " + rt + " == \"undefined\"){" + rt
                    + " = {};} o = " + rt + ";");
                for (j = 1; j < d.length; ++j) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]]
                }
            }
            return this;
        }
    });

})(jQuery);

