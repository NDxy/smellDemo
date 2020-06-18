/**
 * Created by Administrator on 2018/1/30.
 */
$(".nav_item1").hover(function () {
    console.log($(this));
    $(this).children(".nav2").show();
}, function () {
    $(this).children(".nav2").hide();
});