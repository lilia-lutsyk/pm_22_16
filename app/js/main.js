document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".circle").forEach(e => {
    var t = parseInt(e.getAttribute("data-percent"), 10);
    var s = e.querySelector(".fg").r.baseVal.value;
    let n = 2 * Math.PI * s;
    let a = -t / 100 * n;
    let d = e.querySelector(".fg");

    d.style.strokeDasharray = n + " " + n;
    d.style.strokeDashoffset = n;

    setTimeout(() => {
      d.style.transition = "stroke-dashoffset 2s ease";
      d.style.strokeDashoffset = n - a;
    }, 0);
  });





  document.querySelectorAll(".drop-box").forEach(function (t) {
    t.addEventListener("click", function () {
      let e = t.nextElementSibling;

      if (e.classList.contains("hidden")) {
        e.classList.remove("hidden");
        e.classList.add("slide-in");

        e.addEventListener("animationend", () => {
          e.classList.remove("slide-in");
          e.classList.remove("hidden");
        });

      } else {
        e.classList.add("slide-out");

        e.addEventListener("animationend", () => {
          e.classList.add("hidden");
          e.classList.remove("slide-out");
        });
      }
    });
  });



    function renderEducation(education) {
        const section = document.getElementById("education-section");

        // Очищаємо існуючий вміст
        section.innerHTML = "";
        education.forEach((item) => {
            section.innerHTML += `
                <div class="education_card">
                    <h4 class="education_card__title">${item.major}</h4>
                    <p class="education_card__text">${item.university}</p>
                    <p class="education_card__text">${item.years}</p>
                </div>
            `;
        });

        console.log(section.innerHTML);
    }

    // Дані для прикладу
    const educationData = [
        {
            major: "Computer Science",
            university: "University of Example",
            years: "2005–2009"
        },
        {
            major: "Software Engineering",
            university: "Example University",
            years: "2009–2011"
        },
        {
            major: "Web Development",
            university: "Another Example University",
            years: "2011–2013"
        }
    ];

    // Викликаємо функцію після завантаження сторінки
    renderEducation(educationData);

      

// --- Функція для отримання даних через XMLHttpRequest ---
function loadDataWithXHR() {
    const xmlhttp = new XMLHttpRequest();
    const url = "http://127.0.0.1:8080/data/data.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                const data = JSON.parse(this.responseText);
                const section = document.getElementById("education-section");
    section.innerHTML = "";
    data.education.forEach((item) => {
        section.innerHTML += `
            <div class="education-item">
                <p> <strong>${item.major}</strong></p>
                <p> ${item.university}</p>
                <p> ${item.years}</p>
            </div>`;
    });
    console.log(data);
    console.log(section.innerHTML);
            } else {
                console.error("Помилка під час завантаження даних через XMLHttpRequest");
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// --- Функція для отримання даних через Fetch API ---
async function loadDataWithFetch() {
    try {
        const response = await fetch("./data/data.json");
        if (!response.ok) throw new Error("Помилка при завантаженні даних через Fetch API");
        const data = await response.json();
        console.log(data);
        const section = document.getElementById("education-section");
    section.innerHTML = "";
    data.education.forEach((item) => {
        section.innerHTML += `
            <div class="education-item">
                <p> <strong>${item.major}</strong></p>
                <p> ${item.university}</p>
                <p> ${item.years}</p>
            </div>`;
    });
    } catch (error) {
        console.error("Помилка під час отримання даних:", error);
    }
}
// loadDataWithFetch();
});
