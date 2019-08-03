/**
 * Code challenge colution
 * @author bingzheyuan@gmail.com
 */

/**
 * show events in calender day container
 * @param {{start: number, end: number}[]} events the array of events to show
 */
function layoutDay(events) {
    var container = document.getElementById("calender-day");
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    if (!events || !Array.isArray(events)) return;
    var sorted = events.sort(function (a, b) {
        return a.start - b.start;
    }).map(function (e) {
        return {
            start: e.start,
            end: e.end,
            duration: e.end - e.start
        }
    });
    // console.info(sorted);

    // where in which colum we can place the event, try to use less column as possible
    var culumnsInfo = {
        columns: [],
        columnsEnd: []
    }
    sorted.reduce(function (accumulated, currentEvent, currentIndex) {
        var column = 0;
        for (var i = 0; i < currentIndex; i++) {
            if (currentEvent.start > accumulated.columnsEnd[accumulated.columns[i]]) {
                column = accumulated.columns[i];
                break;
            }
            if (i === currentIndex - 1) {
                column = accumulated.columnsEnd.length;
            }
        }
        accumulated.columns.push(column);
        accumulated.columnsEnd[column] = currentEvent.end;
        return accumulated;
    }, culumnsInfo);
    // find max collision and detemin event width
    // 1. generate collisiton matrix, it's a matric indicating whether 2 events overlaps
    var collisionMatrix = sorted.map(function (e) {
        return [];
    });
    sorted.reduce(function (groups, currentEvent, currentIndex, sortedEvents) {
        for (var i = 0; i < sortedEvents.length; i++) {
            if (i === currentIndex) {
                groups[currentIndex][i] = 1;
            } else {
                var refEvent = sortedEvents[i];
                if (currentEvent.end < refEvent.start || currentEvent.start > refEvent.end) {
                    groups[currentIndex][i] = 0;
                } else {
                    groups[currentIndex][i] = 1;
                }
            }

        }
        return groups;
    }, collisionMatrix);
    console.info(collisionMatrix)
    // 2. conclude collision groups, [eventIndex: event index of collided events]
    var collistionGroups = collisionMatrix.map(function (g, i) {
        return g.map(function (n, j) {
            return i === j ? i : n !== 0 ? j : undefined;
        })
            .filter(function (n) {
                return n !== undefined;
            })
    })
    console.info(collistionGroups)
    // 3. involve column info with conllision group, [eventIndex: colum index of each collided events]
    var collisionInfoWithColums = collistionGroups.map(function (g) {
        return g.map(function (n) {
            return culumnsInfo.columns[n];
        })
    });
    console.info(collisionInfoWithColums)
    // 4. find for each event, find local maximum width
    var distict = function (value, index, array) {
        return array.indexOf(value) === index;
    }
    var widthFactor = collisionInfoWithColums.map(function (g) {
        return g.filter(distict).length
    })
    console.info(widthFactor);
    // 5. for each collision group, include local max width for each collided event
    var collistionGroupsWithWidthFactor = collistionGroups.map(function (g) {
        return g.map(function (n) {
            return widthFactor[n];
        })
    })
    console.info(collistionGroupsWithWidthFactor)
    // 6. conclude universal max width for each event
    var normalizedWidthFactor = collistionGroupsWithWidthFactor.map(function (g) {
        return Math.max.apply(null, g);
    });
    console.info(normalizedWidthFactor)
    sorted.forEach(function (event, i) {
        addEventElement(container, event, culumnsInfo.columns[i], normalizedWidthFactor[i]);
    })
}

function spawnEvents(n) {
    var events = [];
    for (var i = 0; i < n; i++) {
        var start = Math.floor(Math.random() * 720);
        var duration = Math.floor(Math.random() * 460) + 10;
        if (start + duration > 720) {
            i--
        } else {
            events.push({
                start: start,
                end: start + duration
            })
        }
    }
    return events;
}

function addEventElement(container, event, column, widthFactor) {
    var eventDiv = document.createElement('div');
    eventDiv.classList.add("event");
    eventDiv.style.top = event.start + "px";
    eventDiv.style.height = event.duration + "px";
    var w = Math.floor(600 / widthFactor);
    eventDiv.style.width = w + "px";
    eventDiv.style.left = column * w + 10 + "px";

    var title = document.createElement("p");
    title.classList.add("event-title");
    title.innerText = "sample title";
    eventDiv.appendChild(title);
    var content = document.createElement("p");
    content.classList.add("event-content");
    content.innerText = "sample content";
    eventDiv.appendChild(content);

    container.appendChild(eventDiv);
}

function prepareLabels() {
    var timeLabelContainer = document.getElementById("time-labels");
    var c = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    c.forEach(function (t, i) {
        var time = document.createElement("div");
        time.classList.add("label");
        var timeBig = document.createElement("span");
        timeBig.classList.add("label-em");
        timeBig.innerText = t + ":00 ";
        time.appendChild(timeBig);
        time.innerHTML += i > 2 ? "PM" : "AM";
        time.style.top = Math.floor(720 / 12 * i - 8) + "px"
        timeLabelContainer.appendChild(time);
        if (i != c.length - 1) {
            var timehalf = document.createElement("div");
            timehalf.classList.add("label");
            timehalf.innerText = t + ":30 " + (i > 2 ? "PM" : "AM");
            timehalf.style.top = Math.floor(720 / 12 * (i + 0.5) - 8) + "px";
            timeLabelContainer.appendChild(timehalf);
        }
    })
}

//init
prepareLabels();

// input is the 
var test = spawnEvents(10); // for test data
var input = [{ start: 30, end: 150 }, { start: 540, end: 600 }, { start: 560, end: 620 }, { start: 610, end: 670 }]; // for default data in challenge sheet
layoutDay(input);