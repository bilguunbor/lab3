class DatePicker {
  constructor(id, func) {
    this.calendarContainer = document.querySelector(`.${id}__calendar`);
    this.id = id;
    this.inputCalendar = document.getElementById(`input__${id}`);
    this.weekdays = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };
    this.months = {
      1: "January",
      2: "Febuary",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    this.selectedDate = func;

    this.data = {
      year: "0",
      month: "0",
      weekday: "",
      day: "0",
      days: [],
      alldays: 31,
    };

    this.calendarInit();
    this.clear(this.id);
    this.render();
    this.toggleCalendar(this.id);
  }

  calendarInit() {
    this.data.year = new Date().getFullYear();
    this.data.month = new Date().getMonth() + 1; // 0 - 11 0 = 1 сар
    this.data.day = new Date().getDate(); // new Date().getDay() = 0 - 6 0 = sun
    this.data.weekday = this.weekdays[new Date().getDay()]; // weekdays.0, weekdays[0],

    this.calcDays();
  }

  toggleCalendar(id) {
    const picker = document.getElementById(`input__${id}`);

    if (picker) {
      picker.addEventListener("click", () => {
        const cal = document.querySelector(`.${id}__calendar`);
        if (cal) cal.classList.add("open");
      });

      const calendarExit = document.querySelector(
        `.calendar__header-exit__${this.id}`
      );

      if (calendarExit) {
        calendarExit.addEventListener("click", () => {
          document.querySelector(`.${id}__calendar`).classList.remove("open");
        });
      }
    }
  }

  event = (id) => {
    const next = document.getElementById("next_" + id);
    const prev = document.getElementById("prev_" + id);
    const day = document.querySelector(".calendar__days_" + id);
    if (day) {
      day.addEventListener("click", (e) => {
        const chosenDay = e.target.closest(".calendar__day_" + id).innerHTML;

        this.data.day = chosenDay;
        this.clear(id);
        this.render();
      });
    }
    if (prev && next) {
      prev.addEventListener("click", () => {
        this.data.month -= 1;
        if (this.data.month < 1) {
          this.data.month = 12;
          this.data.year -= 1;
        }
        this.calcDays();
        this.clear(id);
        this.render();
      });
      next.addEventListener("click", () => {
        this.data.month += 1;
        if (this.data.month > 12) {
          this.data.month = 1;
          this.data.year += 1;
        }
        this.calcDays();
        this.clear(id);
        this.render();
      });
    }
  };

  //    Каледарын сар өдрүүдийг тооцоолох
  calcDays = () => {
    this.data.days = [];
    this.data.alldays = new Date(this.data.year, this.data.month, 0).getDate();
    const startDay = new Date(
      `${this.data.year}/${this.data.month}/1`
    ).getDay();
    for (let i = 1; i <= this.data.alldays; i++) {
      this.data.days.push(i);
    }
    for (let i = 0; i < startDay; i++) {
      this.data.days.unshift("");
    }
  };

  //    calenderContainar  - г цэвэрлэх
  clear = (id) => {
    const cal = document.querySelector(`.${id}__calendar`);

    if (cal) {
      cal.innerHTML = "";
    }
  };
  render() {
    //  Calender Html
    const html = `
    
    <div class="calendar__header">
      <p class="calendar__header-exit calendar__header-exit__${this.id}">
        x
      </p>
      <span id="prev_${this.id}">prev</span>
      <h1>
        <p>${this.data.year}</p>
        ${this.months[this.data.month]}
      </h1>
      <span id="next_${this.id}">next</span>
    </div>
    <div class="calendar__weekends">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
    <div class="calendar__days calendar__days_${this.id}">
   ${this.data.days
     .map((el) => {
       return `<div class="calendar__day_${this.id}">${el}</div>`;
     })
     .join("")}
    </div>
 `;
    //  Dom луу html ээ  нэмн

    this.selectedDate(this.id, this.data);
    this.calendarContainer.insertAdjacentHTML("beforeend", html);
    this.event(this.id);
    this.toggleCalendar(this.id);
  }
}

// datepickers
const datePicker1 = new DatePicker("datepicker1", function (id, fixedDate) {
  console.log(
    "DatePicker with id",
    id,
    "selected date:"
    // fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year
  );
  //   value луу нь fixed Date ын утгыг оруулж өгнө.
  document.getElementById(
    "input__" + id
  ).value = `${fixedDate.year}/${fixedDate.month}/${fixedDate.day}`;
});

const datePicker2 = new DatePicker("datepicker2", function (id, fixedDate) {
  console.log(
    "DatePicker with id",
    id,
    "selected date:",
    fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year
  );
  document.getElementById(
    "input__" + id
  ).value = `${fixedDate.year}/${fixedDate.month}/${fixedDate.day}`;
});
