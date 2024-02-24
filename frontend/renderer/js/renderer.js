// const outputPath = document.querySelector('#output-path');
// const filename = document.querySelector('#filename');

// function loadFile(e) {
//     const file = e.target.files[0];
// }

// img.addEventListener('change', loadFile);

document.getElementById("filepicker").addEventListener(
    "change",
    (event) => {
      let output = document.getElementById("listing");
      for (const file of event.target.files) {
        let item = document.createElement("li");
        item.textContent = file.webkitRelativePath;
        output.appendChild(item);
      }
    },
    false,
  );