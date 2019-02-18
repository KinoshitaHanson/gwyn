/* eslint-disable */
import Mock from 'mockjs';

new Mock.mock('http://g.cn', {
    'analysisList|1-20': [
        {
            avgEuroDraw: '2.5',
            avgEuroLoss: '3.8',
            avgEuroWin: '2.2',
            caloricDraw: '23',
            caloricLoss: '56',
            caloricWin: '15',
            euroDraw: '40%',
            euroLoss: '40%',
            euroWin: '40%',
            issueName: '101111',
            matchName: '101111002',
            matchNo: '002',
            spTradeDraw: '40%',
            spTradeLoss: '40%',
            spTradeWin: '40%',
            tradeStatus: '1',
            homeTeam: '切尔西',
            eventName: '英超',
            visitingTeam: '曼联',
            starTime: '2017-10-10 02:00',
            week: '周一'
        }
    ],
    'recordList|1-20': [
        {
            recordDXQ: {
                'recent|1-20': [
                    {
                        bigsmallAwayContinues: '6',
                        bigsmallAwayContinuesType: '1',
                        bigsmallHomeContinues: '4',
                        bigsmallHomeContinuesRecord: '主队历史最高值',
                        bigsmallHomeContinuesType: '2',
                        homeTeam: '切尔西',
                        eventName: '英超',
                        visitingTeam: '曼联',
                        starTime: '2017-10-10 02:00',
                        week: '周一'
                    }
                ],
                history: []
            },
            recordSPF: {
                'recent|1-20': [
                    {
                        awayContinues: '3',
                        awayContinuesType: '6',
                        homeContinues: '5',
                        homeContinuesRecord: '主队历史最高值',
                        homeContinuesType: '2',
                        homeTeam: '切尔西',
                        eventName: '英超',
                        visitingTeam: '曼联',
                        starTime: '2017-10-10 02:00',
                        week: '周一'
                    }
                ],
                'history|1-20': [
                    {
                        homeAwayRecentHistory: '8',
                        homeAwayRecentHistoryType: '1',
                        homeTeam: '切尔西',
                        eventName: '英超',
                        visitingTeam: '曼联',
                        starTime: '2017-10-10 02:00',
                        week: '周一'
                    }
                ]
            },
            recordYP: {
                'recent|1-20': [
                    {
                        asianAwayContinues: '3',
                        asianAwayContinuesType: '8',
                        asianHomeContinues: '6',
                        asianHomeContinuesRecord: '主队历史最高值',
                        asianHomeContinuesType: '4',
                        homeTeam: '切尔西',
                        eventName: '英超',
                        visitingTeam: '曼联',
                        starTime: '2017-10-10 02:00',
                        week: '周一'
                    }
                ],
                'history|1-20': [
                    {
                        homeAwayRecentHistory: '1',
                        homeAwayRecentHistoryType: '5',
                        homeTeam: '切尔西',
                        eventName: '英超',
                        visitingTeam: '曼联',
                        starTime: '2017-10-10 02:00',
                        week: '周一'
                    }
                ]
            }
        }
    ]
});

