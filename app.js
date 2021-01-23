const getElementFromString = (string) => {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
};

let addedParamCount = 0;
// initally hide the parameter box
document.getElementById("parameterBox").style.display = "none";

const jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("jsonBox").style.display = "block";
});

const paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "block";
  document.getElementById("jsonBox").style.display = "none";
});

// Add paramter on clicking on the + button

const addParam = document.getElementById("addParam");

addParam.addEventListener("click", () => {
  const params = document.getElementById("params");
  let string = `
  <div class="form-row my-2">
  <label for="inputPassword" class="col-sm-2 col-form-label"
    >Paramter ${addedParamCount + 2}</label
  >

  <div class="col-md-4">
    <input
      type="text"
      class="form-control"
      id="parameterKey${addedParamCount + 2}"
      placeholder="Enter Parameter ${addedParamCount + 2} Key"
    />
  </div>
  <div class="col-md-4">
    <input
      type="text"
      class="form-control"
      id="paramterValue${addedParamCount + 2}"
      placeholder="Enter Parameter ${addedParamCount + 2} Value"
    />
  </div>
  <button class="btn btn-primary deleteParam">-</button>
</div>
  `;
  console.log(`paramterValue${addedParamCount + 2}`);

  let addToParam = getElementFromString(string);
  params.appendChild(addToParam);

  //   delete the param
  let deleteParams = document.querySelectorAll(".deleteParam");
  for (item of deleteParams) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

// fetch api on submit button

const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  // write please wait in the resbox text
  document.getElementById("responseText").innerHTML = "Please wait....";

  let url = document.getElementById("url").value;
  let requestType = document.querySelector('input[name="requestType"]:checked')
    .value;
  let contentType = document.querySelector('input[name="contentType"]:checked')
    .value;

  if (contentType == "params") {
    data = {};

    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("paramterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonText").value;
  }

  if (requestType == "get") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseText").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseText").innerHTML = text;
        Prism.highlightAll();
      });
  }

  //   log all the values on the console for debugging
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);
});
