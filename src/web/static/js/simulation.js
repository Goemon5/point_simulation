const ctx = document.getElementById("lineChart")
const currentPointInput = document.getElementById("current-point")
const monthlyGetPointInput = document.getElementById("monthly-get-point")
const goalPointInput = document.getElementById("goal-point")



const getAdjustedMonth = (month) => {
    return ((month - 1) % 12) + 1;
}

// 月の取得
const today = new Date()
const thisMonth = today.getMonth() + 1

// 初期状態のグラフ
const initPoint = 0
const initPointChart = Array(6).fill(initPoint)
const initGoalPoint = 0

// 今、1、3、半年、1年後

let myLineChart = new Chart(ctx, {
    type: 'bar', // 最初のデフォルトのタイプを設定
    data: {
        labels: [
            "今",
            "1ヶ月後",
            "3ヶ月後",
            "半年後",
            "1年後",
            // getAdjustedMonth(thisMonth + 5)
        ],
        datasets: [
        {
            label: '獲得予定ポイント',
            type: 'bar',
            data: initPointChart,
            borderColor: [
                "rgba(255, 219, 32, 1)", // thisMonth
                "rgba(245, 124, 28, 1)", // thisMonth + 1
                "rgba(245, 124, 28, 1)", // thisMonth + 2 (特定の色)
                "rgba(245, 124, 28, 1)", // thisMonth + 3
                "rgba(245, 124, 28, 1)", // thisMonth + 4
                "rgba(245, 124, 28, 1)", // thisMonth + 5
            ],
            backgroundColor: [
                "rgba(255, 219, 32, 1)", // thisMonth
                "rgba(245, 124, 28, 1)", // thisMonth + 1
                "rgba(245, 124, 28, 1)", // thisMonth + 2 (特定の色)
                "rgba(245, 124, 28, 1)", // thisMonth + 3
                "rgba(245, 124, 28, 1)", // thisMonth + 4
                "rgba(245, 124, 28, 1)", // thisMonth + 5
            ],
            borderWidth: 2
        }
        ],
    },
    options: {
        responsive: true, 
        title: {
            display: false,
            text: 'ポイント獲得予定'
        },
        scales: {
            yAxes: [{
            id: 'goal',
            ticks: {
            suggestedMax: 5000,
            suggestedMin: 0,
            callback: function(value, index, values){
                return  value +  ''
            }
        }
        }]    
        },
        legend: {
            display: false // ラベルを非表示にする
        },
        annotation: {
            annotations: [
            {
                type: 'line', // 線分を指定
                drawTime: 'afterDatasetsDraw',
                mode: 'horizontal', // 水平を指定
                scaleID: 'goal', // 基準とする軸のid名
                value: initGoalPoint, // 引きたい線の数値（始点）
                endValue: initGoalPoint, // 引きたい線の数値（終点）
                borderColor: 'red', // 線の色
                borderWidth: 3, // 線の幅（太さ）
                label: { // ラベルの設定
                    backgroundColor: 'rgba(255,255,255,1)',
                    bordercolor: 'rgba(200,60,60,0.8)',
                    borderwidth: 2,
                    fontStyle: 'normal',
                    fontColor: 'rgba(0,0,0,1)',
                    xPadding: 10,
                    yPadding: 10,
                    cornerRadius: 3,
                    position: 'right',
                    xAdjust: -10,
                    yAdjust: -20,
                    enabled: true,
                    content: '目標ポイント'
                }
            }]
        }
    }
})

// inputタグの値が変更されたときに値を表示
currentPointInput.addEventListener("input", () => {
    const currentPoint = currentPointInput.value;
    const monthlyPoint = monthlyGetPointInput.value;

    // myLineChart.data.datasets[1].data = [0, 600, 1200, 1800, 2400, 3000, 3600].map((val, idx) => Number(monthlyPoint)* idx + Number(currentPoint));
    myLineChart.data.datasets[0].data = [0, 0, 0, 0, 0].map((val, idx) => {
        let updateVal = 0;
        switch (idx) {
        case 0:
            updateVal = Number(currentPoint)
            break
        case 1:
            updateVal = Number(monthlyPoint) * 1 + Number(currentPoint)
            break    
        case 2:
            updateVal = Number(monthlyPoint) * 3 + Number(currentPoint)
            break
        case 3:
            updateVal = Number(monthlyPoint) * 6 + Number(currentPoint)
            break
        default:
            updateVal = Number(monthlyPoint) * 12 + Number(currentPoint)
            break   
        }
        return updateVal
    })
    myLineChart.update()
})

monthlyGetPointInput.addEventListener("input", () => { 
    const monthlyPoint = monthlyGetPointInput.value;
    const currentPoint = currentPointInput.value;

    // myLineChart.data.datasets[1].data = [0, 600, 1200, 1800, 2400, 3000, 3600].map((val, idx) => Number(monthlyPoint)* idx + Number(currentPoint));
    myLineChart.data.datasets[0].data = [0, 0, 0, 0, 0].map((val, idx) => {
        let updateVal = 0;
        switch (idx) {
        case 0:
            updateVal = Number(currentPoint)
            break
        case 1:
            updateVal = Number(monthlyPoint) * 1 + Number(currentPoint)
            break    
        case 2:
            updateVal = Number(monthlyPoint) * 3 + Number(currentPoint)
            break
        case 3:
            updateVal = Number(monthlyPoint) * 6 + Number(currentPoint)
            break
        default:
            updateVal = Number(monthlyPoint) * 12 + Number(currentPoint)
            break   
        }
        return updateVal
    })
    myLineChart.update()

})
goalPointInput.addEventListener("input", () => { 
    const goalPoint = goalPointInput.value;
    
    myLineChart.options.annotation.annotations[0].value  =  Number(goalPoint);
    myLineChart.options.annotation.annotations[0].endValue  =  Number(goalPoint);
    myLineChart.update()

})