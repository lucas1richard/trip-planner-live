(function() {

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
    ]
  };

  function dayPicker(mainContainerId, titleContainerId, days, dayIndex, dayClick) {
    days = days.map((day, index) => {
      if (index === dayIndex) {
        return `<button class="btn btn-circle day-btn current-day">${index + 1}</button>`;
      }
      return `<button class="btn btn-circle day-btn">${index + 1}</button>`;
  }).join(' ');
    $(mainContainerId).html(days);
    $(titleContainerId).html(`Day ${dayIndex + 1} <button class="btn btn-xs btn-danger remove btn-circle">x</button>`);
    $(mainContainerId).on('click', 'button', dayClick);
  }

  function onDayClick() {
    console.log($(this).index());
    state.idx = $(this).index();
    renderDayPicker();
    renderDayView();
  }

  function dayView(containerId, day) {
    $(containerId).empty();
    let hotelTitle = '<h4>My Hotels</h4>';
    let _hotels = day.hotels.map(hotelIndex => {
          return `<div class="itinerary-item"><span class="title">${hotels[hotelIndex - 1].name}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`;
        }).join('');
    let restaurantTitle = '<h4>My Restaurants</h4>'
    let _restaurants = day.restaurants.map(restaurantIndex => {
          return `<div class="itinerary-item"><span class="title">${restaurants[restaurantIndex - 1].name}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`;
        }).join('');
    let activityTitle = '<h4>My Activities</h4>'
    let _activities = day.activities.map(activityIndex => {
          return `<div class="itinerary-item"><span class="title">${activities[activityIndex - 1].name}</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`;
        }).join('');

    $(containerId).append(hotelTitle);
    $(containerId).append(_hotels);
    $(containerId).append(restaurantTitle);
    $(containerId).append(_restaurants);
    $(containerId).append(activityTitle);
    $(containerId).append(_activities);
  }

  function renderDayView() {
    dayView('#itinerary', state.days[state.idx]);
  }

  function renderDayPicker() {
    dayPicker('#dayPicker', '#day-title', state.days, state.idx, onDayClick);
  }

  renderDayPicker();
  renderDayView();

})();
