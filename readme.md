# Code Challenge: Event Arrangement
**Request:**  
1. pure js, no frameworks
2. no events may visually overlay
3. if two events collide in time, they must have same width `W`
4. `W` must be maximum possible
5. each event will be given as a javascrpt object with a start and end attribute. The value of attribute is a number of minutes since 9 am. So `{start:30,end 30}` represents an event from 9:30 to 10:30.
8. implement a gloabl function `layOutDay(events)` to render events in a container that is `620px` wide ( 600px + 10px * 2 padding) and `720px` long ( the day will end at 9 pm ).
-----------------------
# SAP面试题目：排列日历事件
**要求：**
1. 原生js,不能用vue等框架的
2. 所有事件不能重叠
3. 如果2个事件时间上冲突，他们必须等宽，设宽为`W`,`W`必须为所能达到的最大值。
4. 每个事件又一个js对象表示，其包含`start`和`end` 两个属性，该属性表示到早上9点的分子数，例如`{start:30,end 30}` 表示早上 9:30 to 10:30 的事件.
5. 请设计一个全局函数`layOutDay(events)`, 它能在 `620px` 宽 ( 600px + 10px * 2 padding) 、 `720px` 高 ( 改日晚上9点结束 )的 容器中显示出日历事件.
