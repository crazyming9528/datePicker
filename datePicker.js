(function () {

    var datePicker = {};
    datePicker.getMonthData = function () {
        var now = new Date();
        var currentYear = now.getFullYear();//获取当前年
        var currentMonth = now.getMonth() + 1;//获取当前月
        var nextMonth = now.getMonth() + 2;//获取下一月
        var firstDay = new Date(currentYear, currentMonth - 1, 1);//获取本月第一天
        var lastDay = new Date(now.getFullYear(), nextMonth - 1, 0);//获取本月最后一天
        // console.log(firstDay);
        // console.log(lastDay);
        var res = [];
        for (var i = 0; i < lastDay.getDate(); i++) {
            var date = i + 1;
            res.push({
                date: date
            })
        }

        console.log(now.getDate());
        console.log({day: res});
        return {
            year: currentYear,
            month: currentMonth,
            days: res
        }
    };

    window.datePicker = datePicker;

})();

(function () {

    var monthData = window.datePicker.getMonthData();
    var buildUI = {};
    buildUI.render = function () {

        var html = "<tr/>"
        console.log(monthData);

        console.log(monthData.year, monthData.month, 1);
        var first = new Date(monthData.year, monthData.month - 1, 1);


        console.log(first.getDay());//获取本月第一天是星期几
        for (var i = 0; i < first.getDay(); i++) {
            html += "<td></td>"
        }
        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i].date;
            console.log(date)

            var dateObj = new Date(monthData.year, monthData.month - 1, date);

            html += "<td>" + date + "</td>"
            if (dateObj.getDay() === 0) {
                html = '<tr>' + html
            }
            if (dateObj.getDay() === 6) {

                html += '</tr>'
            }


        }
        console.log(html + "</tr>");
        var table = document.querySelector(".crazyming-component-date-picker-table")
        var tbody = document.querySelector(".crazyming-component-date-picker-tbody")
        var dom = document.createElement("tbody");

        dom.innerHTML = html + "</tr>"
        console.log(dom);
        table.appendChild(dom);
        console.log(html);
    };
    buildUI.init=function(){
        this.render();

        var wrapper = document.querySelector(".crazyming-component-date-picker-wrapper");

        wrapper.addEventListener("click",function (e) {

         var classList=e.target.classList;
            console.log(typeof classList);
         console.log($event.indexOf("next"));


        })

    }

    window.buildUI = buildUI;


})();


// buildUI.render();

buildUI.init();