// (function() {

  let state = {
    idx: 0,
    days: [{
        hotels: [1, 2],
        restaurants: [1],
        activities: [1]
      }, {
        hotels: [1],
        restaurants: [2],
        activities: [3]
      }
    ],
    markers: [],
    setMarkers() {
      let day = state.days[state.idx];
      Object.keys(day).forEach(type => {
        day[type].forEach(item => {
          switch (type) {
            case 'hotels': {
              state.markers.push({type, location: hotels[item].place.location});
            }
            case 'restaurants': {
              state.markers.push({type, location: restaurants[item].place.location});
            }
            case 'activities': {
              state.markers.push({type, location: activities[item].place.location});
            }
          }
        })
      });
    }
  };

  function dayPicker(mainContainerId, titleContainerId, days, dayIndex, dayClick) {
    $(mainContainerId).empty();
    let $div = $('<div style="display: inline-block">');
    days = days.map((day, index) => {
      if (index === dayIndex) {
        return `<button class="btn btn-circle day-btn current-day">${index + 1}</button>`;
      }
      return `<button class="btn btn-circle day-btn">${index + 1}</button>`;
  }).join(' ');
    $(titleContainerId).html(`Day ${dayIndex + 1} <button class="btn btn-xs btn-danger remove btn-circle">x</button>`);
    $div.append(days);
    $(mainContainerId).append($div);

    $addDiv = $('<div style="display: inline-block; float: right;"><button data-action="add" class="btn btn-primary btn-circle pull-right">+</button></div>');
    $(mainContainerId).append($addDiv);

    $div.on('click', 'button', dayClick);
    $addDiv.on('click', 'button', addDay);
  }

  function onDayClick() {
    state.idx = $(this).index();
    renderDayPicker();
    renderDayView();
    clearMarkers();
    state.setMarkers();
    setMapOnAll();
  }

  function addDay() {
    state.days.push({ hotels: [], restaurants: [], activities: []});
    renderDayPicker();
    renderDayView();
  }

  function dayView(containerId, day) {
    $(containerId).empty();
    let hotelTitle = $('<div><h4>My Hotels</h4></div>');
    let _hotels = day.hotels.map(hotelIndex => {
          return `<div class="itinerary-item"><span class="title">${hotels[hotelIndex - 1].name}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`;
        }).join('');
    let restaurantTitle = $('<div><h4>My Restaurants</h4></div>');
    let _restaurants = day.restaurants.map(restaurantIndex => {
          return `<div class="itinerary-item"><span class="title">${restaurants[restaurantIndex - 1].name}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`;
        }).join('');
    let activityTitle = $('<div><h4>My Activities</h4></div>');
    let _activities = day.activities.map(activityIndex => {
          return `<div class="itinerary-item"><span class="title">${activities[activityIndex - 1].name}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`;
        }).join('');

    $(containerId).append(hotelTitle);
    hotelTitle.append(_hotels);
    $(containerId).append(restaurantTitle);
    restaurantTitle.append(_restaurants);
    $(containerId).append(activityTitle);
    activityTitle.append(_activities);
  }

  function renderDayView() {
    dayView('#itinerary', state.days[state.idx]);
  }

  function renderDayPicker() {
    dayPicker('#dayPicker', '#day-title', state.days, state.idx, onDayClick);
  }

  renderDayPicker();
  renderDayView();

  $('#day-title').on('click', 'button', function() {
    state.days.splice(state.idx, 1);
    if (state.idx >= state.days.length) state.idx = state.days.length - 1;
    renderDayPicker();
    renderDayView();
  });

  $('#options-panel').on('click', 'button', function() {
    let $button = $(this);
    let index = $(this).parent().index();

    let $select = $button.prev();

    switch (index) {
      case 0: {
        state.days[state.idx].hotels.push($select.val() * 1);
        break;
      }
      case 1: {
        state.days[state.idx].restaurants.push($select.val() * 1);
        break;
      }
      case 2: {
        state.days[state.idx].activities.push($select.val() * 1);
        break;
      }
    }
    renderDayView();
  });

  $('#itinerary').on('click', 'button', function() {
    let $button = $(this);
    let parentIndex = $button.parent().parent().index();
    let param;
    switch (parentIndex) {
      case 0: {
        param = 'hotels';
        break;
      }
      case 1: {
        param = 'restaurants';
        break;
      }
      case 2: {
        param = 'activities';
        break;
      }
    }

    let buttonIndex = $button.parent().index() - 1;

    state.days[state.idx][param].splice(buttonIndex, 1);
    renderDayView();
  });

  function setMapOnAll() {
    state.markers = state.markers.map(mark => {
      mark = window.drawMarker(mark.type, mark.location);
      return mark;
    });
  }

  function clearMarkers() {
    state.markers.forEach(mark => {
      console.log(mark);
      mark.setMap(null);
    });
    state.markers = [];
  }
// })();
