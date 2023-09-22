const textArea = document.querySelector(".form__textarea");
const counterVal = document.querySelector(".counter");
const feedbackList = document.querySelector(".feedbacks");
const wordLimt = 150;
// word counter
textArea.addEventListener("input", () => {
  const maxChar = wordLimt;
  const charTyped = textArea.value.length;
  const charLeft = maxChar - charTyped;
  counterVal.textContent = charLeft;
});

// Form component
const form = document.querySelector(".form");

function showVisualIndicator(textCheck) {
  const className = textCheck === "valid" ? "form--valid" : "form--invalid";

  form.classList.add(className);
  // remove  border after 2 sec
  setTimeout(() => {
    form.classList.remove(className);
  }, 2000);
}

const handleSubmit = (e) => {
  e.preventDefault();
  const text = textArea.value;

  // To validate if a given input text contains a hashtag (#)

  if (text.length > 4 && text.includes("#")) {
    //make textarea border green in #hashtag present
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");

    //focus textarea again
    textArea.focus();
    return;
  }

  //we have the txt we need other info, hashtag will give you the company

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  //removes the hashtag
  const company = hashtag.substring(1);

  //first letter of the company is the badge letter
  const badgeLetter = company.substring(0, 1).toUpperCase();
  const upvotesCounts = 0;
  const daysAgo = 0;

  //new feedback item html
  const feedbackItemHTML = `
    <li class="feedback">
        <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon">  </i>
        <span class="upvote__count">${upvotesCounts}</span>
        </button>
        <section class="feedback__badge">
        <p class="feedback__letter"> ${badgeLetter} </p>
        </section>
        <div class="feedback__content">
        <p class="feedback__company"> ${company} </p>
        <p class="feedback__text"> ${text} </p>
        </div>
        <p class="feedback__date">  ${
          daysAgo === 0 ? "new" : daysAgo + " d"
        } </p>
    </li>
    `;

  //insert new feedback item in list, in the end
  feedbackList.insertAdjacentHTML("beforeend", feedbackItemHTML);

  //clear text area
  textArea.value = "";

  //reset the word counter in text area
  document.querySelector(".counter").textContent = wordLimt;
};

form.addEventListener("submit", handleSubmit);
