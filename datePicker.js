(function () {

    var datePicker = {};
    datePicker.getMonthData = function (d) {


        if(d){
            var now = new Date(d);
            var currentYear = now.getFullYear();//获取当前年
            var currentMonth = now.getMonth() + 1;//获取当前月
            var nextMonth = now.getMonth() + 2;//获取下一月
            var firstDay = new Date(currentYear, currentMonth - 1, 1);//获取本月第一天
            var lastDay = new Date(now.getFullYear(), nextMonth - 1, 0);//获取本月最后一天

        }else{
            var now = new Date();
            var currentYear = now.getFullYear();//获取当前年
            var currentMonth = now.getMonth() + 1;//获取当前月
            var nextMonth = now.getMonth() + 2;//获取下一月
            var firstDay = new Date(currentYear, currentMonth - 1, 1);//获取本月第一天
            var lastDay = new Date(now.getFullYear(), nextMonth - 1, 0);//获取本月最后一天

        }

        var res = [];
        for (var i = 0; i < lastDay.getDate(); i++) {
            var date = i + 1;
            res.push({
                date: date
            })
        }


        return {
            year: currentYear,
            month: currentMonth,
            days: res
        }
    };

    var buildUI = {};
    buildUI.render = function (d) {

        var monthData = datePicker.getMonthData(d);

        var html = "<tr/>"

        var first = new Date(monthData.year, monthData.month - 1, 1);


        // console.log(first.getDay());//获取本月第一天是星期几
        for (var i = 0; i < first.getDay(); i++) {
            html += "<td></td>"
        }
        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i].date;
            // console.log(date)

            var dateObj = new Date(monthData.year, monthData.month - 1, date);

            html += "<td>" + date + "</td>"
            if (dateObj.getDay() === 0) {
                html = '<tr>' + html
            }
            if (dateObj.getDay() === 6) {
                html += '</tr>'
            }


        }

        var table = document.querySelector(".crazyming-component-date-picker-table")
        // var tbody = document.querySelector(".crazyming-component-date-picker-tbody")
        var dom = document.createElement("tbody");

        dom.innerHTML = html + "</tr>"
        // console.log(dom);
        dom.classList.add("crazyming-component-date-picker-tbody");
        table.appendChild(dom);
        // console.log(html);

        return monthData
    };
    buildUI.init=function(d){
        if(d){
            var monthData = this.render(d);
        }else {
            var monthData = this.render();
        };
        var wrapper = document.querySelector(".crazyming-component-date-picker-wrapper");

        var _this=this;

        function clickFn (e) {
            var classList=e.target.classList;
            if (classList.contains("previous-month")) {

                console.log("上一个月");
                // console.log(new Date(monthData.year,monthData.month-2,1));
                var table=document.querySelector(".crazyming-component-date-picker-table");
                var tbody=document.querySelector(".crazyming-component-date-picker-tbody");
                table.removeChild(tbody);

                _this.init(new Date(monthData.year,monthData.month-2,1));


            }

            if (classList.contains("next-month")) {
                console.log("下一个月")
                // console.log(new Date(monthData.year,monthData.month,1));
                var table=document.querySelector(".crazyming-component-date-picker-table");
                var tbody=document.querySelector(".crazyming-component-date-picker-tbody");
                table.removeChild(tbody);
                _this.init(new Date(monthData.year,monthData.month,1));
            }


        }

        if(d){
            console.log("移除")
            wrapper.removeEventListener("click",clickFn,false);
        }
            wrapper.addEventListener("click",clickFn,false);



    };


    window.buildUI = buildUI;


})();




buildUI.init();