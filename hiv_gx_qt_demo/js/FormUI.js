/**
 * Created by Administrator on 2017/9/20.
 */
// 初始化控件
$(function () {
// 绑定焦点事件
    _focus();
    var fuiRad = $(".FUI_radioself"), fuiChk = $(".FUI_chkself"), fuiSel = $(".FUI_selself"),
        selDate = $(".FUI_selself").data("obj"), radTrue, chkTrue, selTrue, downTrue;
    // 单选控件初始化
    for (var a = 0; a < fuiRad.length; a++) {
        if (fuiRad.eq(a).siblings('i').length == 0) {
            _addsiblings(fuiRad.eq(a), 'rad_icon', 'radF');
        }
        // 单选选中事件
        radTrue = $._data(fuiRad[a], 'events').hasOwnProperty("click");
        // console.log(radTrue);
        if (!radTrue) {
            fuiRad.eq(a).bind("click", _radEvent());
        }
    }
    // 复选控件初始化
    for (var b = 0; b < fuiChk.length; b++) {
        if (fuiChk.eq(b).siblings('i').length == 0) {
            _addsiblings(fuiChk.eq(b), 'chk_icon', 'chkF');
        }
        // 复选选中事件
        chkTrue = $._data(fuiChk[a], 'events').hasOwnProperty("change");
        console.log($._data(fuiChk[a], 'events'));
        if (!radTrue) {
            fuiChk.eq(b).bind("change", _chkEvent());
        }
    }

    // 下拉框控件初始化
    for (var c = 0; c < fuiSel.length; c++) {
        if (fuiSel.eq(c).siblings('.itemBox').length == 0) {
            _selRander(fuiSel.eq(c), selDate);
        }
        // 下拉事件
        downTrue = $._data(fuiSel.eq(c).siblings('.selIcon')[0], 'events')/*.hasOwnProperty("click")*/;
        if (downTrue) {
            if (!downTrue.hasOwnProperty("click")) {
                fuiSel.eq(c).siblings('.selIcon').bind('click', _selDownEvent());
            }
        } else {
            fuiSel.eq(c).siblings('.selIcon').bind('click', _selDownEvent());
        }
    }
    var  fuiSelItem = $(".item");
    // 下框控件初始化
    for (var d = 0; d < fuiSelItem.length; d++){
        selTrue = $._data(fuiSelItem[d], 'events')/*.hasOwnProperty("click")*/;
        if(selTrue){
            if(!selTrue.hasOwnProperty('click')){
                fuiSelItem.eq(d).bind("click", _selEvent());
            }
        }else{
            fuiSelItem.eq(d).bind("click", _selEvent());
        }
    }
});

// 被获取焦点的时候
function _focus() {
    var focus = $("[type='radio'],[type='checkbox']");
    focus.focus(function () {
        $(this).parent().css({border: "1px solid #77C0F1", background: "#f7f7f7"});
    });
    focus.blur(function () {
        $(this).parent().css({border: "", background: ""});
    });
}

// 渲染单复选插件
function _addsiblings($this, sibl, parClass) {
    $this.before("<i class='" + sibl + "'></i>").parent("label").addClass(parClass)/*.wrap("<div class='radio_box'></div>")*/;
}
// 单选选中事件
function _radEvent(options) {
    return function () {
        if ($(this)[0].checked && $(this).parent('.radF').hasClass('checked')) {
            $(this).parent('.radF').removeClass('checked');
            $(this).attr("checked", false);
        } else {
            $(this).parent('.radF').addClass('checked').siblings('.radF').removeClass('checked');
            if (typeof options == "object") {
                if (options._onChanged) {
                    return options._onChanged.call($(this));
                }
            }
        }
    }
}
/**
 * 单选插件
 */
$.fn._radioself = function (options, val) {
    var $this = $(this), settings = $.extend({}, options, "");
    if (!$this.hasClass('FUI_radioself')) {
        $this.addClass("FUI_radioself");
        _addsiblings($this, 'rad_icon', 'radF');
        for (var i = 0; i < $this.length; i++) {
            $this.eq(i).bind("click", _radEvent(options));
        }
    } else {
        $(this).unbind('click');
        for (var i = 0; i < $this.length; i++) {
            $this.eq(i).bind("click", _radEvent(options));
        }
    }
    if (typeof options == "string") {
        if (options == "select") {
            for (var j = 0; j < $this.length; j++) {
                if ($this.eq(j).val() == val) {
                    $this.eq(j).attr("checked", "checked");
                    $this.eq(j).trigger('click');
                }
            }
        } else if (options == "getValue") {
            for (var j = 0; j < $this.length; j++) {
                if ($this[j].checked) {
                    return $this.eq(j).val();
                }
            }
        }
    } else if (typeof options == "object") {
        if (options.row) {
            $(this).parent().css({display: "inline-block"});
        }
        if (options.width) {
            $(this).parent().css({width: options.width});
        }
    }
};


// 复选选中事件
function _chkEvent(options) {
    return function () {
        if ($(this)[0].checked) {
            $(this).parent('.chkF').addClass('checked');
            if (typeof options == "object") {
                if (options._onChanged) {
                    return options._onChanged.call($(this));
                }
            }
        } else {
            $(this).parent('.chkF').removeClass('checked');
        }
    }
}
/**
 *复选插件
 */
$.fn._chkself = function (options, val) {
    var $this = $(this), settings = $.extend({}, options), vals = [];
    if (!$this.hasClass('FUI_chkself')) {
        $this.addClass("FUI_chkself");
        _addsiblings($this, 'chk_icon', 'chkF');
        for (var i = 0; i < $this.length; i++) {
            $(this).unbind('change');
            $this.eq(i).bind("change", _chkEvent(options));
        }
    } else {
        for (var i = 0; i < $this.length; i++) {
            $(this).unbind('change');
            $this.eq(i).bind("change", _chkEvent(options));
        }
    }
    if (typeof options == "string") {
        if (options == "select") {
            vals = val.split(",");
            for (var j = 0; j < $this.length; j++) {
                for (var k = 0; k < vals.length; k++) {
                    if ($this.eq(j).val() == vals[k]) {
                        $this.eq(j).attr("checked", "checked");
                        $this.eq(j).trigger('change');
                    }
                }
            }
        } else if (options == "getValue") {
            for (var j = 0; j < $this.length; j++) {
                if ($this[j].checked) {
                    vals.push(($this.eq(j).val()));
                }
            }
            return vals;
        }
    } else if (typeof options == "object") {
        if (options.row) {
            $(this).parent().css({display: "inline-block"});
        }
        if (options.width) {
            $(this).parent().css({width: options.width});
        }
    }

};


// 绑定下拉选项选择事件
function _selEvent(options) {
    return function () {
        var text = $(this).html();
        var val = $(this).data("id");
        $(this).parent().parent().siblings('.FUI_selself').val(text).attr("data-id", val);
        $(this).parent().parent().slideUp(100);
        $(this).parent().parent().siblings('.selIcon').removeClass('selDown');
        if(typeof options == "object"){
            if(options._onSelect){
                return options._onSelect.call($(this));
            }
        }
    }
}
// 下拉组件渲染页面
function _selRander(fuiSel, selDate) {
    var heightO = fuiSel.outerHeight(), widthO = fuiSel.outerWidth(), items = "<ul>",
        icon = fuiSel.siblings('.selIcon');
    // console.log(selDate);
    fuiSel.attr("placeholder", "请选择");
    // 生成按钮
    fuiSel.after("<i class='selIcon'></i>").parent("label").addClass("selF");
    // 渲染按钮
    fuiSel.siblings(".selIcon").css({lineHeight: heightO + "px", width: heightO, height: heightO});

    // 生成下拉框
    fuiSel.before("<div class='itemBox'></div>");
    // 生成下拉框选择项
    for (var i = 0; i < selDate.length; i++) {
        items += "<li data-id='" + selDate[i].id + "' class='item'>" + selDate[i].text + "</li>";
    }
    items += "</ul>";
    // 渲染下拉框

    fuiSel.siblings('.itemBox').css({top: heightO - 1, width: widthO}).html(items);
    // 按钮点击事件按鈕


    // $(".selIcon").bind('click', _selDownEvent());
}
// 点击下拉事件
function _selDownEvent() {
    return function () {
        if ($(this).hasClass('selDown')) {
            $(this).removeClass('selDown');
        } else {
            $(this).addClass('selDown');
        }
        $(this).siblings(".itemBox").slideToggle(100);
    };
}
/**
 *下拉选择框插件
 */
$.fn._selself = function (options, val) {
    var $this = $(this), settings = $.extend({}, options), selVal, selText, getValue, getText;
    // 初始化渲染控件
    if (!$this.hasClass('FUI_selself')) {
        $this.addClass('FUI_selself');
        _selRander($this, options.data);
    }
    $this.siblings(".itemBox").children().children('.item').bind("click", _selEvent(options));
    $this.siblings('.selIcon').unbind('click');
    $this.siblings('.selIcon').bind('click', _selDownEvent());
    if (typeof options == "string") {
        if (options == "select") {
            $(function () {
                selText = $this.siblings('.itemBox').children().children(".item[data-id='" + val + "']").text();
                selVal = $this.siblings('.itemBox').children().children(".item[data-id='" + val + "']").attr("data-id");
                $this.val(selText).attr('data-id', selVal);
            });
        } else if (options == "getValue") {
            getValue = $this.attr('data-id');
            return getValue;
        } else if (options == "getText") {
            getText = $this.val();
            return getText;
        }
    } else if (typeof options == "object") {
        if(options.panelHeight){
            $(function(){
                $this.siblings(".itemBox").css({"maxHeight":options.panelHeight,"height":options.panelHeight});
            });

        }
    }

};
